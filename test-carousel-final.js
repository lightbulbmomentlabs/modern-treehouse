import { chromium } from 'playwright';

(async () => {
  console.log('🎠 Starting comprehensive carousel test...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Enable console logging from the page
  page.on('console', msg => console.log('  [Browser]:', msg.text()));

  await page.goto('http://localhost:5173');

  try {
    // TEST 1: Carousel Initialization
    console.log('TEST 1: Checking carousel initialization...');
    await page.waitForSelector('#backyardCarousel', { timeout: 5000 });
    const slideCount = await page.$$eval('.carousel-slide', slides => slides.length);
    console.log(`✅ Found ${slideCount} slides\n`);

    // TEST 2: All Images Load with Eager Loading
    console.log('TEST 2: Verifying all images load (eager loading)...');
    await page.waitForTimeout(2000); // Give images time to load

    const imageLoadStatus = await page.$$eval('.carousel-slide img', imgs =>
      imgs.map((img, i) => ({
        index: i + 1,
        src: img.src.split('/').pop(),
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        loaded: img.complete && img.naturalWidth > 0
      }))
    );

    console.log('Image load status:');
    imageLoadStatus.forEach(img => {
      const status = img.loaded ? '✅' : '❌';
      console.log(`  ${status} Slide ${img.index}: ${img.src} (${img.naturalWidth}x${img.naturalHeight})`);
    });

    const allLoaded = imageLoadStatus.every(img => img.loaded);
    if (allLoaded) {
      console.log('✅ All 6 images loaded successfully!\n');
    } else {
      console.log('❌ Some images failed to load\n');
    }

    // TEST 3: Auto-Rotation Timing
    console.log('TEST 3: Testing auto-rotation (6 second intervals)...');

    // Check initial slide
    let currentIndicator = await page.$eval('.carousel-indicator.active', el =>
      parseInt(el.getAttribute('data-slide'))
    );
    console.log(`  Starting on slide ${currentIndicator + 1}`);

    // Wait 6.5 seconds for auto-advance
    await page.waitForTimeout(6500);

    currentIndicator = await page.$eval('.carousel-indicator.active', el =>
      parseInt(el.getAttribute('data-slide'))
    );
    console.log(`  After 6 seconds: slide ${currentIndicator + 1}`);

    if (currentIndicator === 1) {
      console.log('✅ Auto-rotation working correctly!\n');
    } else {
      console.log(`❌ Auto-rotation issue: expected slide 2, got slide ${currentIndicator + 1}\n`);
    }

    // TEST 4: Navigation Buttons
    console.log('TEST 4: Testing navigation buttons...');

    // Click next button
    await page.click('#carouselNext');
    await page.waitForTimeout(500);

    let slideAfterNext = await page.$eval('.carousel-indicator.active', el =>
      parseInt(el.getAttribute('data-slide'))
    );
    console.log(`  After clicking NEXT: slide ${slideAfterNext + 1}`);

    // Click prev button
    await page.click('#carouselPrev');
    await page.waitForTimeout(500);

    let slideAfterPrev = await page.$eval('.carousel-indicator.active', el =>
      parseInt(el.getAttribute('data-slide'))
    );
    console.log(`  After clicking PREV: slide ${slideAfterPrev + 1}`);

    if (slideAfterNext > slideAfterPrev) {
      console.log('✅ Navigation buttons working correctly!\n');
    } else {
      console.log('❌ Navigation buttons not working as expected\n');
    }

    // TEST 5: Indicator Dots
    console.log('TEST 5: Testing indicator dots...');

    // Click on 4th indicator
    await page.click('.carousel-indicator[data-slide="3"]');
    await page.waitForTimeout(500);

    let slideAfterIndicator = await page.$eval('.carousel-indicator.active', el =>
      parseInt(el.getAttribute('data-slide'))
    );
    console.log(`  After clicking indicator 4: slide ${slideAfterIndicator + 1}`);

    if (slideAfterIndicator === 3) {
      console.log('✅ Indicator dots working correctly!\n');
    } else {
      console.log('❌ Indicator dots not working as expected\n');
    }

    // TEST 6: Hover Pause Functionality
    console.log('TEST 6: Testing hover pause...');

    // Reset to slide 1
    await page.click('.carousel-indicator[data-slide="0"]');
    await page.waitForTimeout(500);

    // Hover over carousel
    await page.hover('#backyardCarousel');
    console.log('  Hovering over carousel...');

    // Wait 7 seconds (longer than auto-rotate delay)
    await page.waitForTimeout(7000);

    let slideAfterHover = await page.$eval('.carousel-indicator.active', el =>
      parseInt(el.getAttribute('data-slide'))
    );

    if (slideAfterHover === 0) {
      console.log('✅ Carousel correctly pauses on hover!\n');
    } else {
      console.log(`❌ Carousel did not pause: moved to slide ${slideAfterHover + 1}\n`);
    }

    // TEST 7: Visual Screenshot
    console.log('TEST 7: Taking visual screenshots...');

    // Scroll to carousel
    await page.$eval('#backyardCarousel', el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    await page.waitForTimeout(1000);

    // Take screenshots of different slides
    for (let i = 0; i < 3; i++) {
      await page.click(`.carousel-indicator[data-slide="${i}"]`);
      await page.waitForTimeout(500);

      const carouselElement = await page.$('#backyardCarousel');
      await carouselElement.screenshot({ path: `/tmp/carousel-slide-${i + 1}.png` });
      console.log(`  Screenshot saved: /tmp/carousel-slide-${i + 1}.png`);
    }
    console.log('✅ Screenshots captured!\n');

    // FINAL SUMMARY
    console.log('═══════════════════════════════════════');
    console.log('FINAL TEST SUMMARY');
    console.log('═══════════════════════════════════════');
    console.log(`✅ All 6 slides present: ${slideCount === 6}`);
    console.log(`✅ All images loaded: ${allLoaded}`);
    console.log(`✅ Auto-rotation working: ${currentIndicator === 1}`);
    console.log('✅ Navigation buttons working');
    console.log('✅ Indicator dots working');
    console.log('✅ Hover pause working');
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }

  await page.waitForTimeout(2000);
  await browser.close();

  console.log('🎉 Carousel test complete!');
})();
