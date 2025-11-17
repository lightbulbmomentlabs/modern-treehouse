# Gallery Images

Place your main property gallery photos here.

## Recommended Setup

For best performance and user experience, provide **two versions** of each image:

### 1. Full-Size Images (for lightbox)
- **Filename pattern**: `photo-name-large.jpg`
- **Dimensions**: 1920x1080 or larger (maintain aspect ratio)
- **Format**: WebP or AVIF preferred, JPEG fallback
- **Quality**: High quality (80-90%)
- **Use**: Displayed when users click to enlarge photos

### 2. Thumbnail Images (for gallery grid)
- **Filename pattern**: `photo-name-thumb.jpg`
- **Dimensions**: 400x300 or 600x400
- **Format**: WebP or AVIF preferred, JPEG fallback
- **Quality**: Medium-high (70-80%)
- **Use**: Displayed in the main gallery grid

## Example Structure

```
gallery/
├── living-room-large.jpg    (1920x1080)
├── living-room-thumb.jpg    (400x300)
├── kitchen-large.jpg        (1920x1080)
├── kitchen-thumb.jpg        (400x300)
├── bedroom-large.jpg        (1920x1080)
├── bedroom-thumb.jpg        (400x300)
└── ...
```

## Image Optimization Tips

1. **Compress images** before uploading using tools like:
   - [Squoosh](https://squoosh.app/) - Web-based, supports all formats
   - [TinyPNG](https://tinypng.com/) - Easy compression
   - [ImageOptim](https://imageoptim.com/) - Mac app

2. **Use modern formats**:
   - AVIF: Best compression (50% smaller than JPEG)
   - WebP: Great compression (25-35% smaller than JPEG)
   - JPEG: Fallback for older browsers

3. **Aim for file sizes**:
   - Thumbnails: Under 100KB each
   - Full-size: 200-500KB each (max 1MB)

## Updating the Gallery

After adding your images here, edit **`src/js/gallery.js`** and update the `loadSampleImages()` function with your image paths:

```javascript
const images = [
  {
    src: '/src/assets/images/gallery/living-room-large.jpg',
    thumbnail: '/src/assets/images/gallery/living-room-thumb.jpg',
    width: 1920,
    height: 1080,
    alt: 'Beautiful living room with modern furnishings'
  },
  // Add more images...
];
```
