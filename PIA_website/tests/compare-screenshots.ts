/**
 * Dual-site capture + pixel diff for the PIA replica.
 *
 * Captures matching section screenshots from our local replica (localhost:3000)
 * and live piac.com.pk at desktop + mobile viewports, then runs pixelmatch
 * per section and writes:
 *
 *   tests/comparison/<viewport>/our-<section>.png
 *   tests/comparison/<viewport>/pia-<section>.png
 *   tests/comparison/<viewport>/diff-<section>.png
 *   tests/comparison/report.json
 *   tests/comparison/report.md
 */

import { chromium, Browser, Page } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";
import path from "node:path";

type Viewport = { name: "desktop" | "mobile"; width: number; height: number };

const VIEWPORTS: Viewport[] = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const SECTIONS = [
  "navbar",
  "hero",
  "booking-widget",
  "services",
  "offers",
  "corporate",
  "news",
  "mobile-app",
  "newsletter",
  "footer",
] as const;
type Section = (typeof SECTIONS)[number];

// PIA's live site (Joomla + custom modules); selectors verified against piac.com.pk HTML.
const PIA_SELECTORS: Record<Section, string> = {
  navbar: "header, .navbar, nav",
  hero: "#heroCarousel, .carousel, .hero-section, .slider-banner",
  "booking-widget": "#ibe-include, .container.ibe-responsive",
  services: ".moduletable.services",
  offers: ".moduletable.offers",
  corporate: ".moduletable.subbanner",
  news: ".moduletable.ournews",
  "mobile-app": ".container.mod-mobile-banner, .mod-mobile-banner",
  newsletter: ".newsletter-container, .newsletter-form",
  footer: "footer, .footer, #footer",
};

const ROOT = path.join(__dirname, "comparison");

async function captureSection(
  page: Page,
  selector: string,
  destPath: string
): Promise<{ width: number; height: number } | null> {
  // Try selectors in order; the field can be comma-separated CSS.
  for (const sel of selector.split(",").map((s) => s.trim())) {
    const el = await page.$(sel);
    if (!el) continue;
    const box = await el.boundingBox();
    if (!box || box.width < 10 || box.height < 10) continue;
    await el.screenshot({ path: destPath });
    return { width: Math.round(box.width), height: Math.round(box.height) };
  }
  return null;
}

function loadPng(filePath: string): PNG {
  return PNG.sync.read(fs.readFileSync(filePath));
}

function resizeCanvas(png: PNG, width: number, height: number): PNG {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  // Fill white background so diff regions are obvious.
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = 255;
    out.data[i + 1] = 255;
    out.data[i + 2] = 255;
    out.data[i + 3] = 255;
  }
  const copyW = Math.min(png.width, width);
  const copyH = Math.min(png.height, height);
  for (let y = 0; y < copyH; y++) {
    for (let x = 0; x < copyW; x++) {
      const srcIdx = (y * png.width + x) * 4;
      const dstIdx = (y * width + x) * 4;
      out.data[dstIdx] = png.data[srcIdx];
      out.data[dstIdx + 1] = png.data[srcIdx + 1];
      out.data[dstIdx + 2] = png.data[srcIdx + 2];
      out.data[dstIdx + 3] = png.data[srcIdx + 3];
    }
  }
  return out;
}

function diffImages(
  ourPath: string,
  piaPath: string,
  diffPath: string
): { diffPixels: number; totalPixels: number; ratio: number; width: number; height: number } {
  const our = loadPng(ourPath);
  const pia = loadPng(piaPath);
  const width = Math.max(our.width, pia.width);
  const height = Math.max(our.height, pia.height);
  const a = resizeCanvas(our, width, height);
  const b = resizeCanvas(pia, width, height);
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(a.data, b.data, diff.data, width, height, {
    threshold: 0.15,
    alpha: 0.4,
    diffColor: [255, 0, 0],
  });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  const totalPixels = width * height;
  return { diffPixels, totalPixels, ratio: diffPixels / totalPixels, width, height };
}

interface SectionResult {
  section: Section;
  viewport: string;
  status: "ok" | "missing-our" | "missing-pia" | "error";
  ourSize?: { width: number; height: number };
  piaSize?: { width: number; height: number };
  diff?: { diffPixels: number; totalPixels: number; ratio: number };
  error?: string;
}

async function captureForViewport(
  browser: Browser,
  viewport: Viewport
): Promise<SectionResult[]> {
  const outDir = path.join(ROOT, viewport.name);
  fs.mkdirSync(outDir, { recursive: true });

  const results: SectionResult[] = [];

  // OUR site — use stable data-section selectors.
  console.log(`\n📸 [${viewport.name}] Capturing OUR site...`);
  const ourCtx = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const ourPage = await ourCtx.newPage();
  const ourUrl = process.env.OUR_URL || "http://localhost:3000";
  await ourPage.goto(ourUrl, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await ourPage.waitForTimeout(2500);

  await ourPage.screenshot({
    path: path.join(outDir, "our-full-page.png"),
    fullPage: true,
  });

  const ourSizes: Partial<Record<Section, { width: number; height: number } | null>> = {};
  for (const section of SECTIONS) {
    const dest = path.join(outDir, `our-${section}.png`);
    try {
      const size = await captureSection(ourPage, `[data-section="${section}"]`, dest);
      ourSizes[section] = size;
      console.log(`  ${size ? "✅" : "⚠️ "} our-${section}`);
    } catch (e) {
      ourSizes[section] = null;
      console.log(`  ❌ our-${section}: ${(e as Error).message}`);
    }
  }
  await ourCtx.close();

  // LIVE PIA — heuristic selectors, with graceful degradation.
  console.log(`\n📸 [${viewport.name}] Capturing LIVE PIA site...`);
  const piaCtx = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  });
  const piaPage = await piaCtx.newPage();

  const piaSizes: Partial<Record<Section, { width: number; height: number } | null>> = {};
  try {
    await piaPage.goto("https://www.piac.com.pk", {
      waitUntil: "networkidle",
      timeout: 90000,
    });
    await piaPage.waitForTimeout(5000);

    await piaPage.screenshot({
      path: path.join(outDir, "pia-full-page.png"),
      fullPage: true,
    });

    for (const section of SECTIONS) {
      const dest = path.join(outDir, `pia-${section}.png`);
      try {
        const size = await captureSection(piaPage, PIA_SELECTORS[section], dest);
        piaSizes[section] = size;
        console.log(`  ${size ? "✅" : "⚠️ "} pia-${section}`);
      } catch (e) {
        piaSizes[section] = null;
        console.log(`  ❌ pia-${section}: ${(e as Error).message}`);
      }
    }
  } catch (e) {
    console.log(`  ❌ Failed to load PIA: ${(e as Error).message}`);
  }
  await piaCtx.close();

  // Diff per section.
  console.log(`\n🔍 [${viewport.name}] Diffing sections...`);
  for (const section of SECTIONS) {
    const ourPath = path.join(outDir, `our-${section}.png`);
    const piaPath = path.join(outDir, `pia-${section}.png`);
    const diffPath = path.join(outDir, `diff-${section}.png`);

    if (!fs.existsSync(ourPath)) {
      results.push({
        section,
        viewport: viewport.name,
        status: "missing-our",
        ourSize: ourSizes[section] ?? undefined,
        piaSize: piaSizes[section] ?? undefined,
      });
      continue;
    }
    if (!fs.existsSync(piaPath)) {
      results.push({
        section,
        viewport: viewport.name,
        status: "missing-pia",
        ourSize: ourSizes[section] ?? undefined,
        piaSize: piaSizes[section] ?? undefined,
      });
      continue;
    }
    try {
      const d = diffImages(ourPath, piaPath, diffPath);
      results.push({
        section,
        viewport: viewport.name,
        status: "ok",
        ourSize: ourSizes[section] ?? undefined,
        piaSize: piaSizes[section] ?? undefined,
        diff: { diffPixels: d.diffPixels, totalPixels: d.totalPixels, ratio: d.ratio },
      });
      console.log(
        `  ${section}: ${(d.ratio * 100).toFixed(2)}% diff (${d.diffPixels.toLocaleString()} / ${d.totalPixels.toLocaleString()} px)`
      );
    } catch (e) {
      results.push({
        section,
        viewport: viewport.name,
        status: "error",
        error: (e as Error).message,
      });
      console.log(`  ❌ ${section}: ${(e as Error).message}`);
    }
  }

  return results;
}

function writeReport(allResults: SectionResult[]) {
  const reportJsonPath = path.join(ROOT, "report.json");
  const reportMdPath = path.join(ROOT, "report.md");

  fs.writeFileSync(reportJsonPath, JSON.stringify(allResults, null, 2));

  const byViewport = new Map<string, SectionResult[]>();
  for (const r of allResults) {
    if (!byViewport.has(r.viewport)) byViewport.set(r.viewport, []);
    byViewport.get(r.viewport)!.push(r);
  }

  const lines: string[] = [];
  lines.push("# Visual Comparison Report\n");
  lines.push(`_Generated ${new Date().toISOString()}_\n`);

  for (const [viewport, results] of byViewport) {
    lines.push(`## ${viewport}\n`);
    lines.push("| Section | Status | Our size | PIA size | Diff % | Diff px |");
    lines.push("|---------|--------|----------|----------|--------|---------|");
    for (const r of results) {
      const our = r.ourSize ? `${r.ourSize.width}×${r.ourSize.height}` : "—";
      const pia = r.piaSize ? `${r.piaSize.width}×${r.piaSize.height}` : "—";
      const ratio = r.diff ? `${(r.diff.ratio * 100).toFixed(2)}%` : "—";
      const px = r.diff ? r.diff.diffPixels.toLocaleString() : "—";
      lines.push(`| ${r.section} | ${r.status} | ${our} | ${pia} | ${ratio} | ${px} |`);
    }
    lines.push("");
  }

  fs.writeFileSync(reportMdPath, lines.join("\n"));
  console.log(`\n📝 Report written to ${reportMdPath}`);
}

async function main() {
  fs.mkdirSync(ROOT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const allResults: SectionResult[] = [];

  for (const vp of VIEWPORTS) {
    const r = await captureForViewport(browser, vp);
    allResults.push(...r);
  }

  await browser.close();
  writeReport(allResults);
  console.log("\n🎉 Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
