import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173');

  // Wait for carousel to load
  await page.waitForSelector('#backyardCarousel', { timeout: 5000 });

  // Count slides
  const slideCount = await page.$$eval('.carousel-slide', slides => slides.length);
  console.log(`Found ${slideCount} slides in carousel`);

  // Get all image sources
  const imageSrcs = await page.$$eval('.carousel-slide img', imgs => imgs.map(img => img.src));
  console.log('Image sources:', imageSrcs);

  // Check if slides are unique
  const uniqueSrcs = new Set(imageSrcs);
  console.log(`Unique images: ${uniqueSrcs.size} of ${slideCount}`);

  // Take a screenshot
  await page.screenshot({ path: '/tmp/carousel-test.png', fullPage: true });
  console.log('Screenshot saved to /tmp/carousel-test.png');

  await browser.close();
})();
