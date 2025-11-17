import { chromium } from 'playwright';

const devices = [
  { name: 'iPhone-SE', width: 375, height: 667 },
  { name: 'iPhone-12', width: 390, height: 844 },
  { name: 'iPhone-14-Pro-Max', width: 428, height: 926 },
  { name: 'Small-Android', width: 360, height: 640 }
];

const sections = [
  { name: 'hero', selector: '.hero' },
  { name: 'introduction', selector: '.introduction' },
  { name: 'features', selector: '.features' },
  { name: 'gallery', selector: '.gallery-section' },
  { name: 'carousel', selector: '.backyard-carousel-section' },
  { name: 'video', selector: '.video-tour' },
  { name: 'location', selector: '.location' },
  { name: 'details', selector: '.property-details' },
  { name: 'faq', selector: '.faq-section' },
  { name: 'contact', selector: '.contact' },
  { name: 'footer', selector: '.footer' }
];

async function checkOverflow(page, deviceName, viewportWidth) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Testing ${deviceName} (${viewportWidth}px wide)`);
  console.log('='.repeat(80));

  // Check document and body dimensions
  const dimensions = await page.evaluate(() => {
    return {
      documentWidth: document.documentElement.scrollWidth,
      documentClientWidth: document.documentElement.clientWidth,
      bodyWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
      windowWidth: window.innerWidth
    };
  });

  console.log(`\n📊 Page Dimensions:`);
  console.log(`  Viewport width: ${viewportWidth}px`);
  console.log(`  Window inner width: ${dimensions.windowWidth}px`);
  console.log(`  Document scroll width: ${dimensions.documentWidth}px`);
  console.log(`  Document client width: ${dimensions.documentClientWidth}px`);
  console.log(`  Body scroll width: ${dimensions.bodyWidth}px`);
  console.log(`  Body client width: ${dimensions.bodyClientWidth}px`);

  if (dimensions.documentWidth > viewportWidth || dimensions.bodyWidth > viewportWidth) {
    console.log(`\n⚠️  OVERFLOW DETECTED! Page is wider than viewport`);
    console.log(`  Overflow amount: ${Math.max(dimensions.documentWidth, dimensions.bodyWidth) - viewportWidth}px`);
  }

  // Find all elements that are wider than the viewport
  const overflowingElements = await page.evaluate((vpWidth) => {
    const elements = document.querySelectorAll('*');
    const overflowing = [];

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(el);
      const scrollWidth = el.scrollWidth;

      // Check if element extends beyond viewport
      if (rect.right > vpWidth || scrollWidth > vpWidth) {
        const tagName = el.tagName.toLowerCase();
        const className = el.className;
        const id = el.id;

        let selector = tagName;
        if (id) selector += `#${id}`;
        if (className && typeof className === 'string') {
          const classes = className.split(' ').filter(c => c.trim()).slice(0, 3).join('.');
          if (classes) selector += `.${classes}`;
        }

        overflowing.push({
          selector,
          width: Math.round(rect.width),
          right: Math.round(rect.right),
          scrollWidth: scrollWidth,
          exceedsBy: Math.round(Math.max(rect.right - vpWidth, scrollWidth - vpWidth)),
          computedWidth: computedStyle.width,
          computedMinWidth: computedStyle.minWidth,
          computedMaxWidth: computedStyle.maxWidth,
          paddingLeft: computedStyle.paddingLeft,
          paddingRight: computedStyle.paddingRight,
          marginLeft: computedStyle.marginLeft,
          marginRight: computedStyle.marginRight
        });
      }
    });

    return overflowing;
  }, viewportWidth);

  if (overflowingElements.length > 0) {
    console.log(`\n🔍 Found ${overflowingElements.length} elements exceeding viewport:`);

    // Sort by how much they exceed
    overflowingElements.sort((a, b) => b.exceedsBy - a.exceedsBy);

    // Show top 20 worst offenders
    overflowingElements.slice(0, 20).forEach((el, idx) => {
      console.log(`\n  ${idx + 1}. ${el.selector}`);
      console.log(`     Width: ${el.width}px, Right edge: ${el.right}px (exceeds by ${el.exceedsBy}px)`);
      console.log(`     Computed width: ${el.computedWidth}`);
      if (el.computedMinWidth !== '0px') console.log(`     Min-width: ${el.computedMinWidth}`);
      if (el.computedMaxWidth !== 'none') console.log(`     Max-width: ${el.computedMaxWidth}`);
      console.log(`     Padding: ${el.paddingLeft} / ${el.paddingRight}`);
      console.log(`     Margin: ${el.marginLeft} / ${el.marginRight}`);
    });
  } else {
    console.log(`\n✅ No horizontal overflow detected!`);
  }

  // Check specific problematic areas
  console.log(`\n🎯 Checking Specific Elements:`);

  const specificChecks = await page.evaluate((vpWidth) => {
    const checks = {};

    // Contact grid
    const contactGrid = document.querySelector('.contact-grid');
    if (contactGrid) {
      const rect = contactGrid.getBoundingClientRect();
      checks.contactGrid = {
        width: Math.round(rect.width),
        exceeds: rect.width > vpWidth,
        exceedsBy: Math.max(0, Math.round(rect.width - vpWidth))
      };
    }

    // Calendly widget
    const calendly = document.querySelector('.calendly-inline-widget');
    if (calendly) {
      const rect = calendly.getBoundingClientRect();
      const style = window.getComputedStyle(calendly);
      checks.calendly = {
        width: Math.round(rect.width),
        minWidth: calendly.style.minWidth || style.minWidth,
        exceeds: rect.width > vpWidth,
        exceedsBy: Math.max(0, Math.round(rect.width - vpWidth))
      };
    }

    // Gallery
    const gallery = document.querySelector('.gallery');
    if (gallery) {
      const rect = gallery.getBoundingClientRect();
      checks.gallery = {
        width: Math.round(rect.width),
        exceeds: rect.width > vpWidth,
        exceedsBy: Math.max(0, Math.round(rect.width - vpWidth))
      };
    }

    // Container
    const containers = document.querySelectorAll('.container');
    checks.containers = [];
    containers.forEach((container, idx) => {
      const rect = container.getBoundingClientRect();
      checks.containers.push({
        index: idx,
        width: Math.round(rect.width),
        exceeds: rect.width > vpWidth,
        exceedsBy: Math.max(0, Math.round(rect.width - vpWidth))
      });
    });

    return checks;
  }, viewportWidth);

  Object.entries(specificChecks).forEach(([key, value]) => {
    if (key === 'containers') {
      value.forEach(container => {
        const status = container.exceeds ? '❌' : '✅';
        console.log(`  ${status} .container[${container.index}]: ${container.width}px ${container.exceeds ? `(exceeds by ${container.exceedsBy}px)` : ''}`);
      });
    } else {
      const status = value.exceeds ? '❌' : '✅';
      console.log(`  ${status} .${key}: ${value.width}px ${value.exceeds ? `(exceeds by ${value.exceedsBy}px)` : ''}`);
      if (key === 'calendly' && value.minWidth) {
        console.log(`       Min-width: ${value.minWidth}`);
      }
    }
  });

  return { dimensions, overflowingElements: overflowingElements.length };
}

async function testDevice(browser, device) {
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    // Wait for page to fully render
    await page.waitForTimeout(2000);

    // Check for overflow
    const results = await checkOverflow(page, device.name, device.width);

    // Take full page screenshot
    await page.screenshot({
      path: `/tmp/mobile-${device.name}-fullpage.png`,
      fullPage: true
    });
    console.log(`\n📸 Full page screenshot saved: /tmp/mobile-${device.name}-fullpage.png`);

    // Screenshot each section
    console.log(`\n📸 Section Screenshots:`);
    for (const section of sections) {
      try {
        const element = await page.$(section.selector);
        if (element) {
          await element.screenshot({
            path: `/tmp/mobile-${device.name}-${section.name}.png`
          });
          console.log(`  ✓ ${section.name}: /tmp/mobile-${device.name}-${section.name}.png`);
        }
      } catch (e) {
        console.log(`  ✗ ${section.name}: Not found or error`);
      }
    }

    return results;

  } finally {
    await context.close();
  }
}

async function main() {
  console.log('🚀 Starting Mobile Responsive Testing\n');

  const browser = await chromium.launch();

  try {
    const allResults = [];

    for (const device of devices) {
      const results = await testDevice(browser, device);
      allResults.push({ device: device.name, ...results });
    }

    console.log(`\n${'='.repeat(80)}`);
    console.log('📋 SUMMARY');
    console.log('='.repeat(80));

    allResults.forEach(result => {
      const hasOverflow = result.overflowingElements > 0 ||
                         result.dimensions.documentWidth > result.dimensions.windowWidth;
      const status = hasOverflow ? '❌ FAIL' : '✅ PASS';
      console.log(`${status} ${result.device}: ${result.overflowingElements} overflowing elements`);
    });

    console.log(`\n✅ Testing complete! Check /tmp/ for screenshots.`);

  } finally {
    await browser.close();
  }
}

main().catch(console.error);
