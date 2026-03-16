import { chromium } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

async function takeScreenshots() {
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const path = `tests/screenshot-${vp.name}.png`;
    await page.screenshot({ path, fullPage: true });
    console.log(`${vp.name} (${vp.width}x${vp.height}) → ${path}`);
    await page.close();
  }

  await browser.close();
}

takeScreenshots();
