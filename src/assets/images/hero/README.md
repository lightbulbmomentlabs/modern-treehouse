# Hero Images

Place your key hero/featured images here. These are used at the top of the page.

## What to Put Here

### 1. Video Fallback Image ✨ IMPORTANT
- **Filename**: `fallback.jpg` (or `.webp`, `.avif`)
- **Dimensions**: 1920x1080 or larger (landscape)
- **Purpose**: Shown when video can't play (mobile, reduced motion, errors)
- **Recommendation**: Use a compelling exterior shot or the best still frame from your video

This image is referenced in `src/css/components.css` and will automatically display when:
- Video background fails to load
- User has reduced motion enabled
- Mobile devices in low-power mode
- Browsers that don't support video

### 2. Additional Featured Images (Optional)
You can also store other key images here:
- Property exterior shots
- Main entrance photos
- Aerial/drone photography
- Neighborhood highlights
- Seasonal variations

## Image Specifications

### Fallback Image Requirements
- **Dimensions**: At least 1920x1080 (Full HD)
  - For 4K displays: 3840x2160
  - For ultra-wide: 2560x1080
- **Aspect Ratio**: 16:9 (landscape)
- **Format**:
  - WebP (recommended) - Best compression
  - AVIF (best) - Smallest file size
  - JPEG (fallback) - Universal support
- **Quality**: High (85-90%)
- **File Size**: Target under 500KB (max 1MB)
- **Composition**:
  - Horizontal orientation
  - Main subject in center (safe for all screen sizes)
  - Consider text overlay area (center/lower third)

## Optimization Tips

1. **Match the video mood**: If possible, use a still frame from your video background or a photo with similar lighting/composition

2. **Test responsiveness**: Ensure the image looks good at all screen sizes (mobile to 4K)

3. **Compress properly**: Use tools to reduce file size without sacrificing quality:
   - [Squoosh](https://squoosh.app/)
   - [TinyPNG](https://tinypng.com/)
   - [ImageOptim](https://imageoptim.com/)

4. **Consider multiple formats**: Provide WebP + JPEG for best browser support

## Example Structure

```
hero/
├── fallback.jpg           # Main fallback image (required)
├── fallback.webp          # WebP version (recommended)
├── exterior-day.jpg       # Optional additional shots
├── exterior-sunset.jpg
└── aerial-view.jpg
```

## Updating the Fallback Image

The fallback image is already configured in **`src/css/components.css`** at line 48:

```css
background-image: url('/src/assets/images/hero/fallback.jpg');
```

Simply add your image as `fallback.jpg` (or update the path if using a different name/format).

## Quick Start

1. Choose your best exterior or video still frame
2. Resize to 1920x1080 (minimum)
3. Compress to under 500KB
4. Save as `fallback.jpg` in this folder
5. Done! It will automatically be used as the video fallback
