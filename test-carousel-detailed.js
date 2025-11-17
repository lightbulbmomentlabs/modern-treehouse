import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('http://localhost:5173');

  // Wait for carousel to load
  await page.waitForSelector('#backyardCarousel', { timeout: 5000 });

  // Get carousel container dimensions
  const carouselDimensions = await page.$eval('#backyardCarousel', el => ({
    width: el.offsetWidth,
    height: el.offsetHeight,
    display: getComputedStyle(el).display,
    overflow: getComputedStyle(el).overflow
  }));
  console.log('Carousel container:', carouselDimensions);

  // Get track dimensions and transform
  const trackInfo = await page.$eval('#carouselTrack', el => ({
    width: el.offsetWidth,
    height: el.offsetHeight,
    display: getComputedStyle(el).display,
    transform: getComputedStyle(el).transform
  }));
  console.log('Track info:', trackInfo);

  // Get first slide info
  const firstSlideInfo = await page.$eval('.carousel-slide', el => ({
    width: el.offsetWidth,
    height: el.offsetHeight,
    display: getComputedStyle(el).display,
    flex: getComputedStyle(el).flex
  }));
  console.log('First slide:', firstSlideInfo);

  // Get first image info
  const firstImageInfo = await page.$eval('.carousel-slide img', el => ({
    src: el.src,
    width: el.offsetWidth,
    height: el.offsetHeight,
    naturalWidth: el.naturalWidth,
    naturalHeight: el.naturalHeight,
    complete: el.complete,
    display: getComputedStyle(el).display,
    objectFit: getComputedStyle(el).objectFit
  }));
  console.log('First image:', firstImageInfo);

  // Check if images are loaded
  const allImagesLoaded = await page.$$eval('.carousel-slide img', imgs =>
    imgs.every(img => img.complete && img.naturalWidth > 0)
  );
  console.log('All images loaded:', allImagesLoaded);

  // Scroll to carousel
  await page.$eval('#backyardCarousel', el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  await page.waitForTimeout(1000);

  // Take screenshot of just the carousel
  const carouselElement = await page.$('#backyardCarousel');
  await carouselElement.screenshot({ path: '/tmp/carousel-only.png' });
  console.log('Carousel screenshot saved to /tmp/carousel-only.png');

  await page.waitForTimeout(5000);

  await browser.close();
})();
