# Interactive Page Setup Instructions

## Image Setup

To use your custom AI agent images on the interactive page (`/interactive`), save your images to the `public` folder with these exact names:

### Required Images:

1. **Primary Background Image**
   - Filename: `ai-agent-primary.jpg`
   - Location: `/public/ai-agent-primary.jpg`
   - Recommended: Professional photo with purple tech overlay (like the one you showed)
   - Dimensions: 1920x1080 or higher
   - Format: JPG or PNG

2. **Reveal Image** (shown when blob cursor hovers)
   - Filename: `ai-agent-reveal.jpg`
   - Location: `/public/ai-agent-reveal.jpg`
   - Recommended: Wireframe/holographic AI face visualization
   - Dimensions: 1920x1080 or higher
   - Format: JPG or PNG

3. **Company Logo** (already in place)
   - Filename: `logo.png`
   - Location: `/public/logo.png`
   - Status: ✅ Already configured

## How to Add Images:

1. Save your AI agent images with the exact filenames above
2. Place them in the `/public` folder
3. The page will automatically use them

## Current Features:

✅ BitPixel Coders logo with glow effect on hover
✅ Navy blue (#001F3F) and purple (#7C3AED) color scheme
✅ Blob cursor with trailing effect
✅ Dual image reveal on mouse movement
✅ Parallax effects
✅ Animated wave lines
✅ Dynamic text inversion with purple glow
✅ Interactive hint that fades after 4 seconds
✅ Social media icons (Instagram, X, YouTube, LinkedIn)
✅ "AI Automation Experts" tagline

## Customization:

To change social media links, edit `/src/pages/InteractiveHomePage.tsx` around line 350.

To change the tagline, edit the "AI Automation Experts" text in the logo section.

## Test the Page:

Visit: `http://localhost:3000/interactive` (local development)
Or: `https://your-domain.com/interactive` (production)
