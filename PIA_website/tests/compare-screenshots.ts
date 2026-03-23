import { chromium } from '@playwright/test';
import path from 'path';

const SCREENSHOT_DIR = path.join(__dirname, 'comparison');

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });

  // === OUR SITE ===
  console.log('📸 Capturing OUR site screenshots...');
  const ourPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ourPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await ourPage.waitForTimeout(3000); // Wait for animations/images

  await ourPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'our-full-page.png'), fullPage: true });
  console.log('  ✅ Full page captured');

  // Section screenshots
  const sections = [
    { name: 'navbar', selector: 'nav, header, [class*="navbar"], [class*="Navbar"]' },
    { name: 'hero', selector: '[class*="carousel"], [class*="hero"], [class*="Hero"]' },
    { name: 'booking-widget', selector: '[class*="booking"], [class*="Booking"], [class*="widget"]' },
    { name: 'services', selector: '[class*="service"], [class*="Service"]' },
    { name: 'offers', selector: '[class*="offer"], [class*="Offer"]' },
    { name: 'corporate', selector: '[class*="corporate"], [class*="Corporate"]' },
    { name: 'news', selector: '[class*="news"], [class*="News"]' },
    { name: 'newsletter', selector: '[class*="newsletter"], [class*="Newsletter"]' },
    { name: 'footer', selector: 'footer, [class*="footer"], [class*="Footer"]' },
  ];

  for (const section of sections) {
    try {
      const el = await ourPage.$(section.selector);
      if (el) {
        await el.screenshot({ path: path.join(SCREENSHOT_DIR, `our-${section.name}.png`) });
        console.log(`  ✅ ${section.name} captured`);
      } else {
        console.log(`  ⚠️  ${section.name} not found`);
      }
    } catch (e) {
      console.log(`  ❌ ${section.name} failed: ${e}`);
    }
  }

  await ourPage.close();

  // === LIVE PIA SITE ===
  console.log('\n📸 Capturing LIVE PIA site screenshots...');
  const piaPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await piaPage.goto('https://www.piac.com.pk', { waitUntil: 'networkidle', timeout: 60000 });
    await piaPage.waitForTimeout(5000); // Wait for all content to load

    await piaPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'pia-full-page.png'), fullPage: true });
    console.log('  ✅ Full page captured');

    // PIA section screenshots
    const piaSections = [
      { name: 'navbar', selector: '.navbar, nav, header, #header' },
      { name: 'hero', selector: '.carousel, #heroCarousel, .hero-section, #carouselExampleIndicators' },
      { name: 'booking-widget', selector: '.booking-widget, .search-widget, #bookingWidget, .tab-content, .booking-section' },
      { name: 'services', selector: '.services, #services, .our-services, [class*="service"]' },
      { name: 'offers', selector: '.offers, #offers, .best-offers, [class*="offer"]' },
      { name: 'corporate', selector: '.corporate, #corporate, [class*="corporate"]' },
      { name: 'news', selector: '.news, #news, .our-news, [class*="news-section"]' },
      { name: 'newsletter', selector: '.newsletter, #newsletter, [class*="newsletter"]' },
      { name: 'footer', selector: 'footer, .footer, #footer' },
    ];

    for (const section of piaSections) {
      try {
        const el = await piaPage.$(section.selector);
        if (el) {
          await el.screenshot({ path: path.join(SCREENSHOT_DIR, `pia-${section.name}.png`) });
          console.log(`  ✅ ${section.name} captured`);
        } else {
          console.log(`  ⚠️  ${section.name} not found`);
        }
      } catch (e) {
        console.log(`  ❌ ${section.name} failed: ${e}`);
      }
    }
  } catch (e) {
    console.log(`  ❌ Failed to load PIA site: ${e}`);
  }

  await piaPage.close();
  await browser.close();
  console.log('\n🎉 All screenshots saved to tests/comparison/');
}

captureScreenshots().catch(console.error);
