import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PixelWaveShaderProps {
  mouse: THREE.Vector2;
  scrollY?: number;
}

// Animated pixel grid with wave deformations
const pixelWaveVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const pixelWaveFragmentShader = `
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float scrollY;

  varying vec2 vUv;

  const vec3 colorBitBlue = vec3(0.0, 0.83, 1.0);
  const vec3 colorPixelCyan = vec3(0.0, 1.0, 1.0);
  const vec3 colorPurple = vec3(0.66, 0.55, 0.98);
  const vec3 colorMagenta = vec3(0.93, 0.19, 0.44);
  const vec3 colorDark = vec3(0.02, 0.05, 0.11);

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

  // Animated pixel grid
  vec3 pixelGrid(vec2 uv) {
    vec3 color = vec3(0.0);

    // Large pixels
    vec2 pixelSize = vec2(40.0, 30.0);
    vec2 pixelUv = uv * pixelSize;
    vec2 pixelId = floor(pixelUv);
    vec2 pixelFract = fract(pixelUv);

    // Wave deformation
    float wave1 = sin(pixelId.x * 0.5 + time * 1.5 + scrollY * 0.5) * 0.5 + 0.5;
    float wave2 = cos(pixelId.y * 0.4 + time * 1.2) * 0.5 + 0.5;
    float wave = wave1 * wave2;

    // Pixel activation based on wave
    float pixelActive = smoothstep(0.3, 0.7, wave);

    // Mouse proximity
    vec2 mouseUv = mouse * 0.5 + 0.5;
    vec2 mousePixelId = floor(mouseUv * pixelSize);
    float distToMouse = length(pixelId - mousePixelId);
    float mouseProximity = smoothstep(15.0, 3.0, distToMouse);

    // Combine activation
    pixelActive = max(pixelActive, mouseProximity);

    // Color based on position
    float colorSeed = random(pixelId);
    vec3 pixelColor = mix(
      mix(colorBitBlue, colorPixelCyan, colorSeed),
      mix(colorPurple, colorMagenta, 1.0 - colorSeed),
      wave
    );

    // RGB sub-pixels
    vec2 center = pixelFract - 0.5;
    float subPixelSize = 0.25;

    // R channel
    float rDist = length(center - vec2(-subPixelSize, 0.0));
    float r = smoothstep(0.15, 0.1, rDist);

    // G channel
    float gDist = length(center);
    float g = smoothstep(0.15, 0.1, gDist);

    // B channel
    float bDist = length(center - vec2(subPixelSize, 0.0));
    float b = smoothstep(0.15, 0.1, bDist);

    vec3 rgbPattern = vec3(r, g, b);
    color = pixelColor * pixelActive * (0.3 + length(rgbPattern) * 0.7);

    // Add RGB separation
    color.r += r * pixelActive * 0.3;
    color.g += g * pixelActive * 0.3;
    color.b += b * pixelActive * 0.3;

    return color;
  }

  // Flowing waves
  vec3 flowingWaves(vec2 uv) {
    vec3 color = vec3(0.0);

    for(float i = 0.0; i < 3.0; i++) {
      float freq = 5.0 + i * 3.0;
      float wave = sin(uv.x * freq + time * (1.0 + i * 0.3) + scrollY) *
                   cos(uv.y * freq * 0.8 - time * (0.8 + i * 0.2)) *
                   0.5 + 0.5;

      vec3 waveColor = mix(
        colorBitBlue,
        mix(colorPixelCyan, colorPurple, i / 3.0),
        wave
      );

      color += waveColor * wave * (0.1 / (i + 1.0));
    }

    return color;
  }

  // Circuit board pattern
  vec3 circuitPattern(vec2 uv) {
    vec3 color = vec3(0.0);

    vec2 circuitUv = uv * 20.0;
    vec2 circuitId = floor(circuitUv);

    // Horizontal lines
    float hLine = step(0.9, fract(circuitUv.y));

    // Vertical lines
    float vLine = step(0.9, fract(circuitUv.x));

    // Connection nodes
    vec2 nodeFract = fract(circuitUv);
    float node = smoothstep(0.2, 0.1, length(nodeFract - 0.5));

    // Flowing energy
    float flow = sin(circuitId.x - time * 2.0) * cos(circuitId.y + time * 1.5) * 0.5 + 0.5;

    vec3 circuitColor = mix(colorBitBlue, colorMagenta, flow);

    color = circuitColor * ((hLine + vLine) * 0.1 + node * 0.3) * flow;

    return color;
  }

  // Data packets
  vec3 dataPackets(vec2 uv) {
    vec3 color = vec3(0.0);

    for(float i = 0.0; i < 5.0; i++) {
      float angle = time * 0.5 + i * 1.256;
      float radius = 0.3 + sin(time * 0.7 + i) * 0.1;

      vec2 packetPos = vec2(
        0.5 + cos(angle) * radius,
        0.5 + sin(angle) * radius
      );

      float dist = length(uv - packetPos);

      // Packet with trail
      float packet = smoothstep(0.02, 0.0, dist);
      float trail = smoothstep(0.08, 0.02, dist) * 0.5;

      vec3 packetColor = mix(colorPixelCyan, colorMagenta, i / 5.0);

      color += (packet + trail) * packetColor;
    }

    return color;
  }

  // Glitch effect
  vec3 glitchEffect(vec2 uv, vec3 inputColor) {
    // Random glitch occurrence
    float glitchLine = floor(uv.y * 20.0);
    float glitchSeed = random(vec2(glitchLine, floor(time * 2.0)));

    if(glitchSeed > 0.95) {
      // Horizontal offset
      float offset = (random(vec2(glitchLine, time)) - 0.5) * 0.1;
      uv.x += offset;

      // Color separation
      float r = inputColor.r;
      float g = inputColor.g;
      float b = inputColor.b;

      return vec3(r, g * 0.5, b * 0.8);
    }

    return inputColor;
  }

  void main() {
    vec2 uv = vUv;

    // Dark background with gradient
    vec3 bg = mix(colorDark, colorDark * 1.5, uv.y);

    // Layer 1: Flowing waves
    vec3 waves = flowingWaves(uv);

    // Layer 2: Pixel grid
    vec3 pixels = pixelGrid(uv);

    // Layer 3: Circuit pattern
    vec3 circuit = circuitPattern(uv);

    // Layer 4: Data packets
    vec3 packets = dataPackets(uv);

    // Combine all layers
    vec3 finalColor = bg;
    finalColor += waves;
    finalColor += pixels * 0.8;
    finalColor += circuit;
    finalColor += packets * 0.6;

    // Apply glitch effect
    finalColor = glitchEffect(uv, finalColor);

    // Mouse glow
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float mouseDist = length(uv - mouseUv);
    float mouseGlow = smoothstep(0.5, 0.0, mouseDist);
    vec3 mouseColor = mix(colorPixelCyan, colorMagenta, sin(time) * 0.5 + 0.5);
    finalColor += mouseColor * mouseGlow * 0.4;

    // Vignette
    float vignette = smoothstep(1.2, 0.4, length(uv - 0.5));
    finalColor *= vignette * 0.7 + 0.3;

    // Bloom bright areas
    float brightness = dot(finalColor, vec3(0.299, 0.587, 0.114));
    finalColor += finalColor * pow(brightness, 3.0) * 0.6;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function PixelWaveShader({ mouse, scrollY = 0 }: PixelWaveShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        scrollY: { value: 0 },
      },
      vertexShader: pixelWaveVertexShader,
      fragmentShader: pixelWaveFragmentShader,
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
