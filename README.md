# The Modern Treehouse - Home Listing Website

A beautiful, performant one-page website for showcasing your home listing. Built with modern web technologies including HTML5, CSS3, and vanilla JavaScript, featuring video backgrounds, YouTube embeds, and an interactive photo gallery.

## ⚡ Static Site Deployment

**This repository is configured for static hosting (no Node.js runtime required).**

- The `/dist` folder contains pre-built, production-ready static files
- Deploy directly to Digital Ocean App Platform, Netlify, Vercel, or any static host
- **No build process needed** = No App Platform charges
- Node.js config files (`package.json`, `vite.config.js`) are kept locally only for development

### Quick Deploy to Digital Ocean

1. Create new App in Digital Ocean App Platform
2. Connect to this GitHub repository
3. Select **Static Site** (not Web Service)
4. Set output directory: `dist`
5. Deploy! (FREE tier eligible)

The `.do/app.yaml` configuration ensures Digital Ocean deploys as a static site.

## Features

- 🎥 **Video Background** - Eye-catching hero section with video background and smart fallbacks
- 📸 **Photo Gallery** - Interactive lightbox gallery powered by PhotoSwipe
- 🎬 **YouTube Integration** - Responsive embedded virtual tour video
- 📱 **Mobile-First Design** - Fully responsive across all devices
- ⚡ **High Performance** - Optimized for fast loading and smooth animations
- 🎨 **Modern CSS** - CSS custom properties, Grid, Flexbox
- 🔧 **Easy Customization** - Well-organized code structure
- ♿ **Accessible** - Semantic HTML and ARIA support

## Tech Stack

- **Build Tool**: Vite
- **CSS**: Modern native CSS with custom properties
- **JavaScript**: Vanilla ES6+ modules
- **Image Gallery**: PhotoSwipe
- **CSS Reset**: modern-normalize

## Project Structure

```
modern-treehouse/
├── public/                 # Static assets
│   └── favicon.svg        # Site favicon
├── src/
│   ├── css/
│   │   ├── main.css       # Main CSS entry point
│   │   ├── variables.css  # CSS custom properties
│   │   ├── base.css       # Base styles and reset
│   │   └── components.css # Component styles
│   ├── js/
│   │   ├── main.js        # Main JavaScript entry point
│   │   ├── gallery.js     # PhotoSwipe gallery
│   │   └── video-background.js # Video handling
│   └── assets/
│       ├── images/        # Gallery photos
│       ├── videos/        # Background video files
│       └── icons/         # Icon files
├── index.html             # Main HTML file
├── vite.config.js         # Vite configuration
├── package.json
└── README.md

```

## Getting Started

### For Local Development Only

**Note:** Node.js is only needed for local development. The GitHub repository contains pre-built static files in `/dist`.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

If you want to make changes and rebuild the site locally:

1. **Clone and navigate to the project directory**
   ```bash
   cd modern-treehouse
   ```

2. **Create these files locally** (they're not in the repo):

   `package.json`:
   ```json
   {
     "name": "modern-treehouse",
     "version": "1.0.0",
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
     "devDependencies": {
       "vite": "^7.2.2",
       "terser": "^5.36.0"
     },
     "dependencies": {
       "photoswipe": "^5.4.4"
     }
   }
   ```

   `vite.config.js`:
   ```javascript
   import { defineConfig } from 'vite';

   export default defineConfig({
     build: {
       outDir: 'dist',
       assetsDir: 'assets',
       minify: 'terser',
       rollupOptions: {
         output: {
           assetFileNames: 'assets/[name]-[hash][extname]',
           chunkFileNames: 'assets/[name]-[hash].js',
           entryFileNames: 'assets/[name]-[hash].js'
         }
       }
     },
     server: {
       port: 5173,
       open: true
     }
   });
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The site will open automatically at `http://localhost:5173`

5. **Rebuild production files**
   ```bash
   npm run build
   git add dist
   git commit -m "Rebuild production files"
   git push
   ```

### Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization Guide

### 1. Update Property Information

Edit `index.html` to update:
- Property details (bedrooms, bathrooms, square feet, etc.)
- Contact information
- Property description

### 2. Add Your Images

Replace the placeholder images in the gallery:

**In `src/js/gallery.js`**, replace the `loadSampleImages()` function with your actual images:

```javascript
export function loadYourImages() {
  const images = [
    {
      src: '/src/assets/images/photo-1-large.jpg',
      thumbnail: '/src/assets/images/photo-1-thumb.jpg',
      width: 1920,
      height: 1080,
      alt: 'Living room description'
    },
    // Add more images...
  ];

  addImagesToGallery(images);
}
```

Then update `src/js/main.js` to use your function instead of `loadSampleImages()`.

### 3. Add Video Background

1. **Prepare your video**:
   - Keep it short (10-15 seconds, looped)
   - Resolution: 720p (1280×720) recommended
   - Format: MP4 (H.264) for compatibility, WebM for better compression
   - **Target file size: Under 5MB** (critical for performance!)

2. **Optimize your video** using tools like:
   - [HandBrake](https://handbrake.fr/) (free)
   - [FFmpeg](https://ffmpeg.org/) (command-line)
   - Online tools like [CloudConvert](https://cloudconvert.com/)

3. **Add your video files**:
   ```
   src/assets/videos/background.mp4
   src/assets/videos/background.webm (optional, for better compression)
   ```

4. **Add a fallback image** for mobile devices:
   ```
   src/assets/images/hero-fallback.jpg
   ```

### 4. Update YouTube Video

In `index.html`, replace `VIDEO_ID` with your YouTube video ID:

```html
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  ...
</iframe>
```

### 5. Customize Colors and Styling

Edit `src/css/variables.css` to change:
- Colors (primary, secondary, accent)
- Typography (fonts, sizes)
- Spacing
- Border radius
- Shadows
- Transitions

Example:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
}
```

### 6. Update Contact Form

The contact form currently shows an alert. To make it functional:

**Option A: Use a Form Service**
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [EmailJS](https://www.emailjs.com/)

**Option B: Custom Backend**
Update `src/js/main.js` in the `setupContactForm()` function to POST to your API:

```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

## Performance Optimization

### Video Optimization Tips

1. **Keep it short**: 10-15 seconds max
2. **Lower resolution**: 720p is usually sufficient
3. **Compress aggressively**: Target under 5MB
4. **Remove audio**: Audio is muted anyway
5. **Test on mobile**: Consider disabling on slower connections

### Image Optimization

1. **Use modern formats**:
   - AVIF (best compression)
   - WebP (great compression, wide support)
   - JPEG (fallback)

2. **Responsive images**: Provide multiple sizes using `srcset`

3. **Compress images**: Use tools like:
   - [Squoosh](https://squoosh.app/)
   - [TinyPNG](https://tinypng.com/)
   - [ImageOptim](https://imageoptim.com/)

4. **Lazy loading**: Already implemented via `loading="lazy"`

### General Performance

- Keep total page size under 3MB
- Minimize JavaScript
- Use the production build (`npm run build`)
- Enable GZIP/Brotli compression on your server
- Use a CDN for assets

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Popular Services

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

#### Traditional Hosting
Upload the contents of the `dist/` folder to your web server via FTP/SFTP.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility

This project includes:
- Semantic HTML5 elements
- ARIA attributes where needed
- Keyboard navigation support
- Proper heading hierarchy
- Alt text for images
- Reduced motion support

## Performance Metrics

Target metrics (measured with Lighthouse):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## Troubleshooting

### Video not playing
- Check video file paths in `index.html`
- Ensure video files are in `src/assets/videos/`
- Check browser console for errors
- Try a different browser (some block autoplay)

### Gallery images not showing
- Check image paths in `gallery.js`
- Ensure images are in `src/assets/images/`
- Check browser console for errors

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (use v18+)

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [PhotoSwipe Documentation](https://photoswipe.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev Performance](https://web.dev/performance/)

## License

This project is licensed for personal and commercial use.

## Support

For issues or questions, please check the documentation or create an issue in the repository.

---

**Made with ❤️ for showcasing your beautiful home**
