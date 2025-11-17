# Background Video

Place your hero section background video here.

## Required Files

### Primary Video (Required)
- **Filename**: `background.mp4`
- **Format**: MP4 (H.264 codec)
- **Purpose**: Main video background, works on all browsers

### Optional WebM Version (Recommended)
- **Filename**: `background.webm`
- **Format**: WebM (VP8 or VP9 codec)
- **Purpose**: Better compression, smaller file size for modern browsers

## Critical Video Specifications ⚠️

### File Size - MOST IMPORTANT!
- **Target**: Under 5MB (absolute maximum 10MB)
- **Why**: Large videos kill page performance and mobile experience
- **Test**: Upload to [PageSpeed Insights](https://pagespeed.web.dev/) after adding

### Duration
- **Recommended**: 10-15 seconds (looped)
- **Maximum**: 20-30 seconds
- **Tip**: Short, seamless loops work best

### Resolution
- **Recommended**: 1280x720 (720p)
- **Alternative**: 1920x1080 (1080p) - only if file size permits
- **Avoid**: 4K - way too large for background video

### Frame Rate
- **Recommended**: 24-30 fps
- **Avoid**: 60 fps - doubles file size with minimal benefit

### Bitrate
- **Target**: 700-1200 kb/s
- **Balance**: Quality vs. file size

### Orientation
- **Required**: Landscape (16:9 aspect ratio)
- **Avoid**: Portrait or square videos

### Audio
- **Remove completely!** Audio is muted anyway, removing saves file size

## Video Optimization Guide

### Step 1: Trim & Edit
1. Cut to 10-15 seconds
2. Find a natural loop point (start/end match)
3. Remove all audio tracks
4. Export at 720p, 24-30fps

### Step 2: Compress

**Using HandBrake (Free, Recommended):**
1. Download [HandBrake](https://handbrake.fr/)
2. Load your video
3. Settings:
   - Preset: "Web" → "Gmail Small 25 MB 5 Minutes 480p30"
   - Video: H.264, Constant Quality RF 23-25
   - Dimensions: 1280x720
   - Framerate: 24 or 30 fps
   - Audio: Remove all tracks
4. Start encode
5. Check file size (must be under 5MB!)

**Using FFmpeg (Command Line):**
```bash
ffmpeg -i input.mp4 \
  -vf scale=1280:720 \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -an \
  -movflags +faststart \
  background.mp4
```

**For WebM version:**
```bash
ffmpeg -i input.mp4 \
  -vf scale=1280:720 \
  -c:v libvpx-vp9 \
  -b:v 700k \
  -an \
  background.webm
```

**Online Tools:**
- [CloudConvert](https://cloudconvert.com/) - Easy online converter
- [Clideo](https://clideo.com/compress-video) - Simple compression
- [FreeConvert](https://www.freeconvert.com/video-compressor) - Multiple formats

### Step 3: Test
1. Check file size: `ls -lh background.mp4`
2. Play locally to verify quality
3. Test on slow connection (Chrome DevTools → Network → Slow 3G)

## Example Structure

```
videos/
├── background.mp4     # Required - H.264 MP4
├── background.webm    # Optional - Better compression
└── README.md          # This file
```

## Common Issues & Solutions

### ❌ Video too large (>5MB)
- ✅ Increase CRF value (lower quality): 28-32
- ✅ Reduce resolution to 720p
- ✅ Shorten duration to 10 seconds
- ✅ Lower bitrate to 500-700 kb/s

### ❌ Video looks pixelated
- ✅ Decrease CRF value (higher quality): 20-24
- ✅ Increase bitrate slightly
- ✅ Use 2-pass encoding

### ❌ Video won't loop smoothly
- ✅ Match first and last frames
- ✅ Use cross-dissolve transition
- ✅ Find natural motion loop point

### ❌ Page loads slowly
- ✅ Video is probably too large - compress more!
- ✅ Consider disabling video on mobile (already built-in)
- ✅ Test with PageSpeed Insights

## Best Practices

✅ **Do:**
- Keep under 5MB
- Use 720p resolution
- Remove audio completely
- Test on mobile devices
- Create seamless loops
- Show property highlights
- Use stable, slow camera movements

❌ **Don't:**
- Use 4K or 1080p (file too large)
- Include audio (wastes space)
- Make it longer than 30 seconds
- Use jerky camera movements
- Rely solely on video (always have fallback image)

## Already Configured

The video is already set up in **`index.html`** at lines 17-20:

```html
<video autoplay muted loop playsinline id="bg-video" class="bg-video">
  <source src="/src/assets/videos/background.webm" type="video/webm">
  <source src="/src/assets/videos/background.mp4" type="video/mp4">
</video>
```

Just add your optimized videos to this folder and they'll work automatically!

## Quick Checklist

Before adding your video, verify:
- [ ] File size under 5MB
- [ ] Duration 10-15 seconds
- [ ] Resolution 1280x720 (720p)
- [ ] Audio removed
- [ ] Loops seamlessly
- [ ] MP4 format (H.264)
- [ ] Filename is `background.mp4`
- [ ] Tested on mobile

## Performance Targets

After adding your video, test with [PageSpeed Insights](https://pagespeed.web.dev/):
- **Goal**: 90+ Performance score
- **LCP (Largest Contentful Paint)**: Under 2.5 seconds
- **Total Page Size**: Under 3MB

Good luck! 🎥
