# BitPixel Shader Backgrounds

Custom GLSL shader backgrounds designed for **BitPixel Coders** - embodying the essence of "Bit + Pixel" through interactive, beautiful WebGL experiences.

## 🎨 Available Shaders

### 1. **Digital Data Flow** (`dataflow`)
Neural networks, binary streams, and flowing hexadecimal data visualization.

**Perfect for:**
- AI/ML websites
- Tech startups
- Data analytics platforms
- Automation services

**Features:**
- Flowing binary/hex streams
- Animated neural network nodes with connecting lines
- Hexagonal grid patterns
- Pixel bit effects
- Mouse interaction ripples
- Global illumination aesthetics

### 2. **Binary Rain** (`binaryrain`)
Matrix-style falling binary and hex code with BitPixel brand colors.

**Perfect for:**
- Developer tools
- Cybersecurity platforms
- Code platforms
- Tech blogs

**Features:**
- Falling binary (0/1) and hex characters
- Trailing glow effects
- Floating bit particles
- Mouse disruption field
- Scanline overlays
- Pixelation effects

### 3. **Pixel Wave** (`pixelwave`)
Animated pixel grid with wave deformations and circuit patterns.

**Perfect for:**
- Creative agencies
- Digital art portfolios
- Gaming websites
- Interactive experiences

**Features:**
- RGB sub-pixel rendering
- Wave-based pixel activation
- Circuit board patterns
- Flowing data packets
- Glitch effects
- Dynamic color gradients

## 🚀 Usage

### Basic Implementation

```tsx
import { BitPixelShaderBackground } from './components/shader-backgrounds/BitPixelShaderBackground';

function MyPage() {
  return (
    <div className="relative">
      {/* Shader Background */}
      <BitPixelShaderBackground
        shaderType="dataflow"
        enableMouseTracking={true}
        enableScrollTracking={true}
        opacity={1}
        zIndex={-1}
      />

      {/* Your content */}
      <div className="relative z-10">
        <h1>Your Content Here</h1>
      </div>
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shaderType` | `'dataflow' \| 'binaryrain' \| 'pixelwave'` | `'dataflow'` | Which shader to display |
| `enableMouseTracking` | `boolean` | `true` | Enable mouse interaction effects |
| `enableScrollTracking` | `boolean` | `true` | Enable scroll-based animations |
| `opacity` | `number` | `1` | Background opacity (0-1) |
| `zIndex` | `number` | `-1` | CSS z-index for layering |
| `className` | `string` | `''` | Additional CSS classes |

### Examples

#### As Page Background (Full Opacity)
```tsx
<BitPixelShaderBackground
  shaderType="dataflow"
  opacity={1}
  zIndex={-1}
/>
```

#### As Subtle Overlay (Reduced Opacity)
```tsx
<BitPixelShaderBackground
  shaderType="binaryrain"
  opacity={0.3}
  zIndex={0}
/>
```

#### Static Background (No Interactions)
```tsx
<BitPixelShaderBackground
  shaderType="pixelwave"
  enableMouseTracking={false}
  enableScrollTracking={false}
/>
```

## 🎯 Use Cases

### Homepage Hero
Use **Digital Data Flow** for a high-tech, AI-focused landing page that showcases automation and intelligence.

### Developer Documentation
Use **Binary Rain** for documentation sites, code editors, or developer tools to create an immersive coding atmosphere.

### Portfolio/Creative Pages
Use **Pixel Wave** for creative portfolios, art galleries, or interactive experiences with dynamic, glitchy aesthetics.

### Product Pages
Mix and match based on your product:
- **AI/Automation**: Data Flow
- **Code/Security**: Binary Rain
- **Design/Creative**: Pixel Wave

## 🎨 Brand Colors

All shaders use the BitPixel brand color palette:

```css
--color-bit-blue: #00D4FF;
--color-pixel-cyan: #00FFFF;
--color-purple: #A78BFA;
--color-magenta: #EC4899;
--color-deep-blue: #050711;
--color-dark-blue: #0A0E1A;
```

## ⚡ Performance

- **WebGL-based** for GPU acceleration
- **Optimized shaders** with minimal overdraw
- **Responsive** to window resize
- **60 FPS** target on modern devices
- **Low CPU usage** - all calculations on GPU

## 🛠️ Customization

Each shader component exports its shader material, allowing you to:

1. Modify colors in the fragment shader
2. Adjust animation speeds
3. Change interaction intensities
4. Add custom uniforms

## 📱 Responsiveness

All shaders automatically handle:
- Window resize
- Aspect ratio corrections
- Mobile touch events (converted to mouse position)
- High DPI displays

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any browser with WebGL 2.0 support

## Demo

Visit `/shader-backgrounds` to see all three shaders in action with interactive controls.
