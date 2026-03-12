import { chromium, devices } from 'playwright';
import fs from 'fs/promises';

const url = process.argv[2] || 'https://costaricadentalimplantexperts.com/';
const outDir = process.argv[3] || 'artifacts/early-signal';
await fs.mkdir(outDir, { recursive: true });

async function runVariant(name, contextOptions, pageOptions = {}) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...contextOptions,
    viewport: contextOptions?.viewport,
    userAgent: contextOptions?.userAgent,
    deviceScaleFactor: contextOptions?.deviceScaleFactor,
    isMobile: contextOptions?.isMobile,
    hasTouch: contextOptions?.hasTouch,
    locale: 'en-US'
  });

  const page = await context.newPage(pageOptions);

  const started = Date.now();
  const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  const status = resp?.status();
  const finalUrl = page.url();

  // Basic timings
  const nav = await page.evaluate(() => {
    const [n] = performance.getEntriesByType('navigation');
    if (!n) return null;
    return {
      domContentLoaded: n.domContentLoadedEventEnd,
      loadEventEnd: n.loadEventEnd,
      ttfb: n.responseStart,
      transferSize: n.transferSize,
      encodedBodySize: n.encodedBodySize,
      decodedBodySize: n.decodedBodySize
    };
  });

  // Heuristics: find form + whatsapp link
  const formCount = await page.locator('form').count();
  const whatsappLinks = await page.locator('a[href*="wa.me"], a[href*="whatsapp"], a[href*="api.whatsapp.com"]').all();
  const whatsappHrefs = [];
  for (const l of whatsappLinks.slice(0, 10)) whatsappHrefs.push(await l.getAttribute('href'));

  // Screenshot full page
  await page.waitForTimeout(1500);
  const shotPath = `${outDir}/${name}-full.png`;
  await page.screenshot({ path: shotPath, fullPage: true });

  // Try to capture "video" section area if it exists
  const videoLocator = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"], section:has-text("Video"), div:has-text("Video")').first();
  let videoShotPath = null;
  if (await videoLocator.count()) {
    try {
      await videoLocator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      videoShotPath = `${outDir}/${name}-video.png`;
      await videoLocator.screenshot({ path: videoShotPath });
    } catch {}
  }

  // CTA / submit button presence
  const submitButtons = await page.locator('button[type="submit"], input[type="submit"]').count();
  const phoneLinks = await page.locator('a[href^="tel:"]').count();

  const result = {
    name,
    requestedUrl: url,
    finalUrl,
    httpStatus: status,
    wallTimeMs: Date.now() - started,
    navigation: nav,
    dom: {
      forms: formCount,
      submitButtons,
      phoneLinks,
      whatsappLinks: whatsappHrefs.length,
      whatsappHrefs
    },
    screenshots: {
      full: shotPath,
      video: videoShotPath
    }
  };

  await fs.writeFile(`${outDir}/${name}-report.json`, JSON.stringify(result, null, 2));
  await context.close();
  await browser.close();
  return result;
}

const iPhone = devices['iPhone 13'];
const desktop = { viewport: { width: 1440, height: 900 } };

const results = [];
results.push(await runVariant('mobile-iphone13', iPhone));
results.push(await runVariant('desktop-1440', desktop));

await fs.writeFile(`${outDir}/summary.json`, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
console.log(`Wrote artifacts to ${outDir}`);
