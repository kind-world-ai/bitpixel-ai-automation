import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BinaryRainShaderProps {
  mouse: THREE.Vector2;
  scrollY?: number;
}

// Matrix-style binary rain with BitPixel aesthetics
const binaryRainVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const binaryRainFragmentShader = `
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float scrollY;

  varying vec2 vUv;

  // Brand colors
  const vec3 colorBitBlue = vec3(0.0, 0.83, 1.0);
  const vec3 colorPixelCyan = vec3(0.0, 1.0, 1.0);
  const vec3 colorPurple = vec3(0.66, 0.55, 0.98);
  const vec3 colorMagenta = vec3(0.93, 0.19, 0.44);
  const vec3 colorBlack = vec3(0.01, 0.02, 0.04);

  float random(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Create binary character
  float binaryChar(vec2 uv, float seed) {
    vec2 charUv = fract(uv * vec2(1.0, 1.5)) - 0.5;

    // Create 0 or 1 shape
    float isOne = step(0.5, random(vec2(seed)));

    float shape;
    if (isOne > 0.5) {
      // Shape for "1"
      shape = step(abs(charUv.x), 0.15) * step(abs(charUv.y), 0.4);
    } else {
      // Shape for "0"
      float outer = length(charUv);
      float inner = length(charUv);
      shape = smoothstep(0.35, 0.3, outer) - smoothstep(0.25, 0.2, inner);
    }

    return shape;
  }

  // Create hex character
  float hexChar(vec2 uv, float seed) {
    vec2 charUv = fract(uv * 1.2) - 0.5;

    // Random hex digit pattern
    float pattern = 0.0;
    float hexVal = floor(random(vec2(seed)) * 16.0);

    // Simple geometric representation
    pattern = step(abs(charUv.x), 0.2) * step(abs(charUv.y), 0.35);
    pattern += step(abs(charUv.y), 0.15) * step(abs(charUv.x), 0.35);

    return pattern * (0.5 + random(vec2(hexVal)) * 0.5);
  }

  // Falling rain columns
  vec3 matrixRain(vec2 uv) {
    vec3 color = vec3(0.0);

    // Number of columns
    float columns = 80.0;
    vec2 columnUv = uv * vec2(columns, 40.0);
    float columnId = floor(columnUv.x);

    // Each column has different speed
    float columnSeed = random(vec2(columnId, 0.0));
    float speed = 0.3 + columnSeed * 0.7;
    float offset = random(vec2(columnId, 1.0)) * 100.0;

    // Rain position
    float rainY = fract((time * speed + offset) * 0.5 + scrollY * 0.3);
    float cellY = fract(columnUv.y);

    // Distance from rain head
    float distFromHead = rainY - cellY;
    if (distFromHead < 0.0) distFromHead += 1.0;

    // Trail effect
    float trail = smoothstep(0.7, 0.0, distFromHead);
    trail = pow(trail, 2.0);

    // Leading character is brighter
    float isHead = smoothstep(0.05, 0.0, abs(rainY - cellY));

    // Character type alternates
    float charType = step(0.5, random(vec2(columnId, floor(columnUv.y))));
    float character;
    if (charType > 0.5) {
      character = binaryChar(columnUv, columnId + floor(columnUv.y));
    } else {
      character = hexChar(columnUv, columnId + floor(columnUv.y));
    }

    // Color variation per column
    vec3 columnColor = mix(
      mix(colorBitBlue, colorPixelCyan, columnSeed),
      mix(colorPurple, colorMagenta, 1.0 - columnSeed),
      sin(time * 0.5 + columnSeed * 6.28) * 0.5 + 0.5
    );

    // Bright head, dimmer trail
    float intensity = trail * 0.4 + isHead * 1.2;

    color = columnColor * character * intensity;

    return color;
  }

  // Bit particles
  vec3 bitParticles(vec2 uv) {
    vec3 color = vec3(0.0);

    vec2 particleUv = uv * 150.0;
    vec2 particleId = floor(particleUv);
    vec2 particleFract = fract(particleUv);

    float particleSeed = random(particleId);

    // Falling particles
    float fallSpeed = 0.2 + particleSeed * 0.3;
    float particleY = fract(time * fallSpeed + particleSeed);

    // Distance to particle
    vec2 particlePos = vec2(particleFract.x, particleY);
    float dist = length(particleFract - particlePos);

    // Small glowing bits
    float particle = smoothstep(0.08, 0.0, dist);

    // Random color
    vec3 particleColor = mix(colorBitBlue, colorMagenta, particleSeed);

    // Twinkling
    float twinkle = sin(time * 3.0 + particleSeed * 10.0) * 0.5 + 0.5;

    color = particleColor * particle * twinkle * 0.3;

    return color;
  }

  // Mouse interaction
  vec3 mouseInteraction(vec2 uv) {
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float aspect = resolution.x / resolution.y;

    vec2 correctedUv = vec2(uv.x * aspect, uv.y);
    vec2 correctedMouse = vec2(mouseUv.x * aspect, mouseUv.y);

    float dist = length(correctedUv - correctedMouse);

    // Disruption effect
    float disruption = smoothstep(0.4, 0.0, dist);

    // Spiral effect
    float angle = atan(correctedUv.y - correctedMouse.y, correctedUv.x - correctedMouse.x);
    float spiral = sin(angle * 8.0 + dist * 20.0 - time * 4.0) * 0.5 + 0.5;

    vec3 disruptColor = mix(colorPixelCyan, colorMagenta, spiral);

    return disruptColor * disruption * spiral * 0.6;
  }

  // Scanlines
  float scanlines(vec2 uv) {
    float line = sin(uv.y * 800.0 + time * 2.0) * 0.5 + 0.5;
    return line * 0.03;
  }

  // Pixelate effect
  vec3 pixelate(vec2 uv) {
    vec2 pixelSize = vec2(200.0, 150.0);
    vec2 pixelUv = floor(uv * pixelSize) / pixelSize;

    float pixelNoise = noise(pixelUv * 10.0 + time * 0.5);

    vec3 pixelColor = mix(colorBitBlue, colorPurple, pixelNoise);

    return pixelColor * pixelNoise * 0.02;
  }

  void main() {
    vec2 uv = vUv;

    // Dark background
    vec3 bg = colorBlack;

    // Add gradient
    bg += mix(colorBitBlue, colorPurple, uv.y) * 0.05;

    // Matrix rain
    vec3 rain = matrixRain(uv);

    // Bit particles
    vec3 particles = bitParticles(uv);

    // Mouse effect
    vec3 mouseEffect = mouseInteraction(uv);

    // Scanlines
    float scan = scanlines(uv);

    // Pixelation
    vec3 pixels = pixelate(uv);

    // Combine
    vec3 finalColor = bg;
    finalColor += rain;
    finalColor += particles;
    finalColor += mouseEffect;
    finalColor += scan;
    finalColor += pixels;

    // Vignette
    float vignette = smoothstep(1.0, 0.3, length(uv - 0.5));
    finalColor *= vignette * 0.8 + 0.2;

    // Add bloom to bright areas
    float brightness = dot(finalColor, vec3(0.299, 0.587, 0.114));
    finalColor += finalColor * pow(brightness, 4.0) * 0.8;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function BinaryRainShader({ mouse, scrollY = 0 }: BinaryRainShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        scrollY: { value: 0 },
      },
      vertexShader: binaryRainVertexShader,
      fragmentShader: binaryRainFragmentShader,
      transparent: false,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.mouse.value.copy(mouse);
      material.uniforms.scrollY.value = scrollY;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
