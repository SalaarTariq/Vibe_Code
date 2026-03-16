import { test, expect } from "@playwright/test";

test.describe("PIA Website Visual Regression — Desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
  });

  test("full page screenshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage-full-desktop.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("announcement ticker", async ({ page }) => {
    const ticker = page.locator(".bg-pia-navy").first();
    await expect(ticker).toHaveScreenshot("ticker-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("navbar", async ({ page }) => {
    const navbar = page.locator("nav").first();
    await expect(navbar).toHaveScreenshot("navbar-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("hero carousel", async ({ page }) => {
    const hero = page.locator("section").filter({ hasText: /Previous slide|Next slide/ }).first();
    if (await hero.count()) {
      await expect(hero).toHaveScreenshot("hero-carousel-desktop.png", {
        maxDiffPixelRatio: 0.02,
      });
    }
  });

  test("booking widget — Flight tab", async ({ page }) => {
    const widget = page.locator("[class*='rounded-xl'][class*='shadow']").filter({ hasText: "Search Flights" }).first();
    if (await widget.count()) {
      await expect(widget).toHaveScreenshot("booking-widget-flight-desktop.png", {
        maxDiffPixelRatio: 0.01,
      });
    }
  });

  test("booking widget — Web Check-In tab", async ({ page }) => {
    await page.getByText("Web Check-In").first().click();
    await page.waitForTimeout(400);
    const widget = page.locator("[class*='rounded-xl'][class*='shadow']").filter({ hasText: "Check-In" }).first();
    if (await widget.count()) {
      await expect(widget).toHaveScreenshot("booking-widget-checkin-desktop.png", {
        maxDiffPixelRatio: 0.01,
      });
    }
  });

  test("booking widget — Flight Status tab", async ({ page }) => {
    await page.getByText("Flight Status").first().click();
    await page.waitForTimeout(400);
    const widget = page.locator("[class*='rounded-xl'][class*='shadow']").filter({ hasText: "Flight Status" }).first();
    if (await widget.count()) {
      await expect(widget).toHaveScreenshot("booking-widget-status-desktop.png", {
        maxDiffPixelRatio: 0.01,
      });
    }
  });

  test("our services section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Our Services" });
    const section = heading.locator("xpath=ancestor::section");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("our-services-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("best offers section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Best Offers" });
    const section = heading.locator("xpath=ancestor::section");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("best-offers-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("corporate program section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /Corporate Program|Executive/ });
    const section = heading.locator("xpath=ancestor::section");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("corporate-program-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("our news section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Our News" });
    const section = heading.locator("xpath=ancestor::section");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("our-news-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("newsletter bar", async ({ page }) => {
    const section = page.locator("section.bg-pia-navy");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("newsletter-bar-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("footer", async ({ page }) => {
    const footer = page.locator("footer").first();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(footer).toHaveScreenshot("footer-desktop.png", {
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe("PIA Website Visual Regression — Mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
  });

  test("full page screenshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage-full-mobile.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("navbar + mobile menu", async ({ page }) => {
    const navbar = page.locator("nav").first();
    await expect(navbar).toHaveScreenshot("navbar-mobile-closed.png", {
      maxDiffPixelRatio: 0.01,
    });

    // Open mobile menu
    const menuButton = page.locator("nav button").filter({ has: page.locator("svg") }).last();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
      await expect(navbar).toHaveScreenshot("navbar-mobile-open.png", {
        maxDiffPixelRatio: 0.01,
      });
    }
  });

  test("booking widget stacks vertically", async ({ page }) => {
    const widget = page.locator("[class*='rounded-xl'][class*='shadow']").filter({ hasText: "Search Flights" }).first();
    if (await widget.count()) {
      await widget.scrollIntoViewIfNeeded();
      await expect(widget).toHaveScreenshot("booking-widget-mobile.png", {
        maxDiffPixelRatio: 0.02,
      });
    }
  });

  test("our services section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Our Services" });
    const section = heading.locator("xpath=ancestor::section");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("our-services-mobile.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("best offers section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Best Offers" });
    const section = heading.locator("xpath=ancestor::section");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("best-offers-mobile.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("our news section", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Our News" });
    const section = heading.locator("xpath=ancestor::section");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(section).toHaveScreenshot("our-news-mobile.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("newsletter + footer stacked", async ({ page }) => {
    const footer = page.locator("footer").first();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(footer).toHaveScreenshot("footer-mobile.png", {
      maxDiffPixelRatio: 0.02,
    });
  });
});
