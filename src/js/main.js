/**
 * Main JavaScript Entry Point
 * 501 Heron Drive - Luxury Listing Website
 */

// Import styles
import '../css/main.css';

// Import modules
import { initGallery, loadPropertyImages, loadBackyardCarousel } from './gallery.js';

/**
 * Initialize all components when DOM is ready
 */
function init() {
  console.log('🏡 501 Heron Drive - Initializing...');

  // Initialize photo gallery
  initGallery();

  // Load property images (24 photos)
  loadPropertyImages();

  // Load and setup backyard carousel (6 concepts)
  const slideCount = loadBackyardCarousel();
  if (slideCount) {
    setupBackyardCarousel(slideCount);
  }

  // Setup parallax effect for hero
  setupParallaxHero();

  // Setup smooth scrolling for anchor links
  setupSmoothScrolling();

  // Setup scroll animations
  setupScrollAnimations();

  // Setup contact notification
  setupContactNotification();

  // Setup video player
  setupVideoPlayer();

  console.log('✅ All components initialized');
}

/**
 * Setup parallax effect for hero section
 */
function setupParallaxHero() {
  const heroImage = document.querySelector('.hero-image');

  if (!heroImage) {
    console.warn('Hero image not found');
    return;
  }

  // Throttle scroll events for performance
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        // Only apply parallax while hero is visible
        if (scrolled < heroHeight) {
          const parallaxAmount = scrolled * 0.5;
          heroImage.style.transform = `translateY(${parallaxAmount}px)`;
        }

        ticking = false;
      });

      ticking = true;
    }
  });

  console.log('Parallax effect enabled');
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 0;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  console.log('Smooth scrolling enabled');
}

/**
 * Setup scroll animations using Intersection Observer
 */
function setupScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported - scroll animations disabled');
    return;
  }

  // Observe all sections for fade-in animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll(
    '.introduction, .features, .gallery-section, .location, .contact'
  );

  sections.forEach((section) => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Observe individual feature cards for stagger effect
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.setProperty('--stagger-delay', index);
    card.classList.add('fade-in');
    observer.observe(card);
  });

  console.log('Scroll animations initialized');
}

/**
 * Setup contact notification popup
 * Shows after 10 seconds, dismissable for the session
 */
function setupContactNotification() {
  const notification = document.getElementById('contactNotification');
  const closeButton = document.getElementById('notificationClose');

  if (!notification || !closeButton) {
    console.warn('Contact notification elements not found');
    return;
  }

  // Check if notification was already dismissed this session
  const isDismissed = sessionStorage.getItem('notificationDismissed');

  if (isDismissed === 'true') {
    console.log('Contact notification already dismissed this session');
    return;
  }

  // Show notification after 10 seconds
  setTimeout(() => {
    notification.classList.add('show');
    console.log('Contact notification displayed');
  }, 10000);

  // Handle close button click
  closeButton.addEventListener('click', () => {
    notification.classList.remove('show');
    sessionStorage.setItem('notificationDismissed', 'true');
    console.log('Contact notification dismissed');
  });

  console.log('Contact notification initialized');
}

/**
 * Setup video player with custom thumbnail
 * Loads YouTube video on play button click
 */
function setupVideoPlayer() {
  const playButton = document.getElementById('videoPlayButton');
  const thumbnail = document.getElementById('videoThumbnail');
  const iframe = document.getElementById('videoIframe');

  if (!playButton || !thumbnail || !iframe) {
    console.warn('Video player elements not found');
    return;
  }

  // Handle play button click
  playButton.addEventListener('click', () => {
    // Hide thumbnail
    thumbnail.classList.add('hidden');

    // Load YouTube video with optimized parameters
    // autoplay=1: Start playing immediately
    // controls=1: Show player controls
    // playsinline=1: Better mobile behavior
    // rel=0: Don't show related videos at end
    iframe.src = 'https://www.youtube.com/embed/5oXL1kO6jOg?si=er9t6eCKKnmmcW_S&autoplay=1&controls=1&playsinline=1&rel=0';
    iframe.style.display = 'block';

    console.log('Video started playing');
  });

  // Also allow clicking anywhere on thumbnail
  thumbnail.addEventListener('click', (e) => {
    if (e.target === thumbnail) {
      playButton.click();
    }
  });

  console.log('Video player initialized');
}

/**
 * Setup backyard carousel with auto-rotate
 * @param {number} slideCount - Total number of slides
 */
function setupBackyardCarousel(slideCount) {
  const track = document.getElementById('carouselTrack');
  const prevButton = document.getElementById('carouselPrev');
  const nextButton = document.getElementById('carouselNext');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const carousel = document.getElementById('backyardCarousel');

  if (!track || !prevButton || !nextButton || !carousel) {
    console.warn('Carousel elements not found');
    return;
  }

  // Carousel state
  let currentSlide = 0;
  let autoRotateInterval = null;
  let isHovered = false;
  let isVisible = true;
  const autoRotateDelay = 6000; // 6 seconds per slide

  /**
   * Update carousel position and indicators
   */
  function goToSlide(index) {
    // Ensure index is within bounds
    if (index < 0) {
      currentSlide = slideCount - 1;
    } else if (index >= slideCount) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    console.log(`Moving to slide ${currentSlide + 1} of ${slideCount}`);

    // Move the track
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    indicators.forEach((indicator, i) => {
      if (i === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  /**
   * Go to next slide
   */
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  /**
   * Go to previous slide
   */
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  /**
   * Start auto-rotation (only if visible and not hovered)
   */
  function startAutoRotate() {
    // Always clear existing interval first to prevent stacking
    stopAutoRotate();

    // Only start if carousel is visible and not being interacted with
    if (isVisible && !isHovered) {
      autoRotateInterval = setInterval(nextSlide, autoRotateDelay);
      console.log('Auto-rotation started');
    }
  }

  /**
   * Stop auto-rotation
   */
  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
      console.log('Auto-rotation stopped');
    }
  }

  /**
   * Handle user interaction (restarts auto-rotate after manual control)
   */
  function handleUserInteraction() {
    stopAutoRotate();
    // Use setTimeout to restart after user finishes interaction
    setTimeout(() => {
      startAutoRotate();
    }, autoRotateDelay);
  }

  // Button event listeners
  prevButton.addEventListener('click', () => {
    prevSlide();
    handleUserInteraction();
  });

  nextButton.addEventListener('click', () => {
    nextSlide();
    handleUserInteraction();
  });

  // Indicator event listeners
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const slideIndex = parseInt(indicator.getAttribute('data-slide'));
      goToSlide(slideIndex);
      handleUserInteraction();
    });
  });

  // Pause on hover, resume on leave
  carousel.addEventListener('mouseenter', () => {
    isHovered = true;
    stopAutoRotate();
  });

  carousel.addEventListener('mouseleave', () => {
    isHovered = false;
    startAutoRotate();
  });

  // Keyboard navigation (only when carousel is in focus/hovered)
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      handleUserInteraction();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      handleUserInteraction();
    }
  });

  // Make carousel focusable for keyboard navigation
  carousel.setAttribute('tabindex', '0');

  // Intersection Observer to pause when carousel is off-screen
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        console.log('Carousel visible - resuming auto-rotation');
        startAutoRotate();
      } else {
        console.log('Carousel off-screen - pausing auto-rotation');
        stopAutoRotate();
      }
    });
  }, observerOptions);

  observer.observe(carousel);

  // Start auto-rotation
  startAutoRotate();

  console.log(`Backyard carousel initialized with ${slideCount} slides`);
}

/**
 * Respect user's reduced motion preference
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  console.log('Reduced motion preference detected - disabling animations');

  // Disable parallax
  document.body.classList.add('reduced-motion');

  // Add CSS to disable animations
  const style = document.createElement('style');
  style.textContent = `
    .reduced-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Handle page visibility changes (performance optimization)
 */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden - pausing effects');
  } else {
    console.log('Page visible - resuming effects');
  }
});

/**
 * Log page performance metrics (optional - for development)
 */
window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

    console.log(`⚡ Performance Metrics:
      - Page Load Time: ${pageLoadTime}ms
      - DOM Ready Time: ${domReadyTime}ms
    `);

    // Log if performance is concerning
    if (pageLoadTime > 3000) {
      console.warn('⚠️  Page load time exceeds 3 seconds - consider optimization');
    }
  }
});

/**
 * Force Calendly widget to respect container width
 */
function fixCalendlyWidth() {
  const calendlyWidget = document.querySelector('.calendly-inline-widget');
  if (!calendlyWidget) return;

  const resizeCalendly = () => {
    const container = calendlyWidget.parentElement;
    if (container) {
      const containerWidth = container.offsetWidth;
      calendlyWidget.style.width = containerWidth + 'px';
      calendlyWidget.style.maxWidth = containerWidth + 'px';
      calendlyWidget.style.minWidth = containerWidth + 'px';

      // Also fix the iframe inside
      const iframe = calendlyWidget.querySelector('iframe');
      if (iframe) {
        iframe.style.width = containerWidth + 'px';
        iframe.style.maxWidth = containerWidth + 'px';
      }
    }
  };

  // Wait for Calendly to load, then fix width
  setTimeout(resizeCalendly, 1000);
  setTimeout(resizeCalendly, 2000);
  setTimeout(resizeCalendly, 3000);

  // Also resize on window resize
  window.addEventListener('resize', resizeCalendly);

  // Use MutationObserver to detect when Calendly iframe is added
  const observer = new MutationObserver(() => {
    resizeCalendly();
  });

  observer.observe(calendlyWidget, {
    childList: true,
    subtree: true
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    fixCalendlyWidth();
  });
} else {
  // DOM is already ready
  init();
  fixCalendlyWidth();
}

// Export for potential external use
export { init };
