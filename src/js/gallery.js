/**
 * Photo Gallery Module
 * Initializes PhotoSwipe lightbox for the image gallery
 */

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

/**
 * Initialize the photo gallery with PhotoSwipe
 */
export function initGallery() {
  // Check if gallery container exists
  const galleryElement = document.getElementById('photo-gallery');
  if (!galleryElement) {
    console.warn('Gallery element not found');
    return;
  }

  // PhotoSwipe lightbox options
  const lightbox = new PhotoSwipeLightbox({
    gallery: '#photo-gallery',
    children: 'a',
    pswpModule: PhotoSwipe,

    // UI options
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    bgOpacity: 0.9,
    loop: true,

    // Enable zoom
    showHideAnimationType: 'zoom',

    // Show counter
    counter: true,

    // Show zoom button
    zoom: true,

    // Enable closing on vertical drag
    closeOnVerticalDrag: true,

    // Pinch to close
    pinchToClose: true,

    // Keyboard navigation
    arrowKeys: true,

    // Return focus to trigger element
    returnFocus: true,

    // Preload nearby images
    preload: [1, 2],
  });

  // Initialize the lightbox
  lightbox.init();

  console.log('Photo gallery initialized with PhotoSwipe');
}

/**
 * Add images to the gallery dynamically
 * Example usage:
 * addImagesToGallery([
 *   { src: '/path/to/image.jpg', width: 1920, height: 1080, alt: 'Description' },
 *   ...
 * ]);
 */
export function addImagesToGallery(images) {
  const galleryElement = document.getElementById('photo-gallery');
  if (!galleryElement) {
    console.error('Gallery element not found');
    return;
  }

  images.forEach((image, index) => {
    const link = document.createElement('a');
    link.href = image.src;
    link.setAttribute('data-pswp-width', image.width);
    link.setAttribute('data-pswp-height', image.height);
    link.setAttribute('target', '_blank');
    link.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = image.thumbnail || image.src;
    img.alt = image.alt || `Property photo ${index + 1}`;
    img.loading = 'lazy';

    // Add loaded class when image loads
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });

    // Handle images that may already be cached
    if (img.complete) {
      img.classList.add('loaded');
    }

    link.appendChild(img);
    galleryElement.appendChild(link);
  });

  console.log(`Added ${images.length} images to gallery`);
}

/**
 * Load 501 Heron Drive Property Images
 * Professional photography of the property
 */
export function loadPropertyImages() {
  const propertyImages = [
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0004.jpg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Exterior view'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0006.jpg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Property exterior'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0007.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Modern architecture'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0008.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Living space'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0009.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Interior view'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0010.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Kitchen area'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0011.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Dining space'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0012.jpg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Open floor plan'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0013.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Modern kitchen'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0014.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Living room'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0015.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Interior detail'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0016.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bedroom'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0017.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Master bedroom'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0018.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bedroom space'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0019.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bathroom'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0022.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bathroom detail'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0023.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Vanity'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0024.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Spa bathroom'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0026.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Additional bedroom'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0027.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Guest room'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0028.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Office space'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0029.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Hallway'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0030.jpeg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Entry'
    },
    {
      src: '/src/assets/images/gallery/501_Heron_Drive_0046.jpg',
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Preserve views'
    }
  ];

  addImagesToGallery(propertyImages);
}

/**
 * Load Backyard Deck Renderings into Carousel
 * Professional landscape architecture concept renderings
 */
export function loadBackyardCarousel() {
  console.log('🎠 Loading backyard carousel...');

  const backyardImages = [
    {
      src: '/src/assets/images/backyard/backyard-concept-1.jpg',
      alt: 'Multi-level deck system with circular entertaining platform and Hill Country preserve views'
    },
    {
      src: '/src/assets/images/backyard/backyard-concept-2.jpg',
      alt: 'Elevated deck with modern railing system overlooking Balcones preserve and terraced pathways'
    },
    {
      src: '/src/assets/images/backyard/backyard-concept-3.jpg',
      alt: 'Close-up view of cable railing system and stone pathway integration on sloped terrain'
    },
    {
      src: '/src/assets/images/backyard/backyard-concept-4.jpg',
      alt: 'Upper deck level with dining area connected to main house and preserve access'
    },
    {
      src: '/src/assets/images/backyard/backyard-concept-5.jpg',
      alt: 'Fire pit area and native plantings showing landscape architecture plan for slope'
    },
    {
      src: '/src/assets/images/backyard/backyard-concept-6.jpg',
      alt: 'Complete backyard transformation rendering with multiple outdoor living zones and preserve integration'
    }
  ];

  const carouselTrack = document.getElementById('carouselTrack');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  console.log('Carousel track element:', carouselTrack);
  console.log('Indicators container element:', indicatorsContainer);

  if (!carouselTrack || !indicatorsContainer) {
    console.error('Carousel elements not found!');
    console.error('carouselTrack:', carouselTrack);
    console.error('indicatorsContainer:', indicatorsContainer);
    return;
  }

  // Add slides to carousel
  backyardImages.forEach((image, index) => {
    console.log(`Adding slide ${index + 1}:`, image.src);

    // Create slide
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    slide.setAttribute('data-slide-index', `${index + 1} of ${backyardImages.length}`);

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'eager'; // Load all carousel images immediately

    slide.appendChild(img);
    carouselTrack.appendChild(slide);

    // Create indicator dot
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    indicator.setAttribute('data-slide', index);
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);

    if (index === 0) {
      indicator.classList.add('active');
    }

    indicatorsContainer.appendChild(indicator);
  });

  console.log(`Loaded ${backyardImages.length} backyard renderings into carousel`);
  return backyardImages.length;
}

// Maintain backward compatibility
export function loadSampleImages() {
  loadPropertyImages();
}
