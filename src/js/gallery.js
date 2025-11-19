/**
 * Photo Gallery Module
 * Initializes PhotoSwipe lightbox for the image gallery
 */

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

// Import all gallery images so Vite includes them in the build
import img0004 from '../assets/images/gallery/501_Heron_Drive_0004.jpg';
import img0006 from '../assets/images/gallery/501_Heron_Drive_0006.jpg';
import img0007 from '../assets/images/gallery/501_Heron_Drive_0007.jpeg';
import img0008 from '../assets/images/gallery/501_Heron_Drive_0008.jpeg';
import img0009 from '../assets/images/gallery/501_Heron_Drive_0009.jpeg';
import img0010 from '../assets/images/gallery/501_Heron_Drive_0010.jpeg';
import img0011 from '../assets/images/gallery/501_Heron_Drive_0011.jpeg';
import img0012 from '../assets/images/gallery/501_Heron_Drive_0012.jpg';
import img0013 from '../assets/images/gallery/501_Heron_Drive_0013.jpeg';
import img0014 from '../assets/images/gallery/501_Heron_Drive_0014.jpeg';
import img0015 from '../assets/images/gallery/501_Heron_Drive_0015.jpeg';
import img0016 from '../assets/images/gallery/501_Heron_Drive_0016.jpeg';
import img0017 from '../assets/images/gallery/501_Heron_Drive_0017.jpeg';
import img0018 from '../assets/images/gallery/501_Heron_Drive_0018.jpeg';
import img0019 from '../assets/images/gallery/501_Heron_Drive_0019.jpeg';
import img0022 from '../assets/images/gallery/501_Heron_Drive_0022.jpeg';
import img0023 from '../assets/images/gallery/501_Heron_Drive_0023.jpeg';
import img0024 from '../assets/images/gallery/501_Heron_Drive_0024.jpeg';
import img0026 from '../assets/images/gallery/501_Heron_Drive_0026.jpeg';
import img0027 from '../assets/images/gallery/501_Heron_Drive_0027.jpeg';
import img0028 from '../assets/images/gallery/501_Heron_Drive_0028.jpeg';
import img0029 from '../assets/images/gallery/501_Heron_Drive_0029.jpeg';
import img0030 from '../assets/images/gallery/501_Heron_Drive_0030.jpeg';
import img0046 from '../assets/images/gallery/501_Heron_Drive_0046.jpg';

// Import backyard carousel images
import backyard1 from '../assets/images/backyard/backyard-concept-1.jpg';
import backyard2 from '../assets/images/backyard/backyard-concept-2.jpg';
import backyard3 from '../assets/images/backyard/backyard-concept-3.jpg';
import backyard4 from '../assets/images/backyard/backyard-concept-4.jpg';
import backyard5 from '../assets/images/backyard/backyard-concept-5.jpg';
import backyard6 from '../assets/images/backyard/backyard-concept-6.jpg';

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
      src: img0004,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Exterior view'
    },
    {
      src: img0006,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Property exterior'
    },
    {
      src: img0007,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Modern architecture'
    },
    {
      src: img0008,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Living space'
    },
    {
      src: img0009,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Interior view'
    },
    {
      src: img0010,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Kitchen area'
    },
    {
      src: img0011,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Dining space'
    },
    {
      src: img0012,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Open floor plan'
    },
    {
      src: img0013,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Modern kitchen'
    },
    {
      src: img0014,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Living room'
    },
    {
      src: img0015,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Interior detail'
    },
    {
      src: img0016,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bedroom'
    },
    {
      src: img0017,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Master bedroom'
    },
    {
      src: img0018,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bedroom space'
    },
    {
      src: img0019,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bathroom'
    },
    {
      src: img0022,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Bathroom detail'
    },
    {
      src: img0023,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Vanity'
    },
    {
      src: img0024,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Spa bathroom'
    },
    {
      src: img0026,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Additional bedroom'
    },
    {
      src: img0027,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Guest room'
    },
    {
      src: img0028,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Office space'
    },
    {
      src: img0029,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Hallway'
    },
    {
      src: img0030,
      width: 1920,
      height: 1280,
      alt: '501 Heron Drive - Entry'
    },
    {
      src: img0046,
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
      src: backyard1,
      alt: 'Multi-level deck system with circular entertaining platform and Hill Country preserve views'
    },
    {
      src: backyard2,
      alt: 'Elevated deck with modern railing system overlooking Balcones preserve and terraced pathways'
    },
    {
      src: backyard3,
      alt: 'Close-up view of cable railing system and stone pathway integration on sloped terrain'
    },
    {
      src: backyard4,
      alt: 'Upper deck level with dining area connected to main house and preserve access'
    },
    {
      src: backyard5,
      alt: 'Fire pit area and native plantings showing landscape architecture plan for slope'
    },
    {
      src: backyard6,
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
