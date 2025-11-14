import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DigitalDataFlowShaderProps {
  mouse: THREE.Vector2;
  scrollY?: number;
}

// Shader that visualizes flowing binary/hex data streams
const dataFlowVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const dataFlowFragmentShader = `
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float scrollY;

  varying vec2 vUv;
  varying vec3 vPosition;

  // BitPixel brand colors
  const vec3 colorBitBlue = vec3(0.0, 0.83, 1.0);      // #00D4FF
  const vec3 colorPixelCyan = vec3(0.0, 1.0, 1.0);     // #00FFFF
  const vec3 colorPurple = vec3(0.66, 0.55, 0.98);     // #A78BFA
  const vec3 colorMagenta = vec3(0.93, 0.19, 0.44);    // #EC4899
  const vec3 colorDeepBlue = vec3(0.02, 0.05, 0.11);   // #050711
  const vec3 colorDarkBlue = vec3(0.04, 0.09, 0.16);   // #0A0E1A

  // Hash function for pseudo-random values
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for(int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  // Generate binary/hex character effect
  float binaryStream(vec2 uv, float offset) {
    vec2 gridUv = uv * vec2(60.0, 40.0);
    vec2 cellId = floor(gridUv);
    vec2 cellUv = fract(gridUv);

    float randomVal = hash(cellId + offset);
    float flowSpeed = time * (0.8 + randomVal * 0.4) + scrollY * 0.5;
    float streamPos = fract(cellId.y * 0.1 - flowSpeed);

    // Create vertical streams
    float stream = smoothstep(0.9, 1.0, streamPos);
    stream += smoothstep(0.0, 0.1, streamPos) * 0.3;

    // Add character-like blocks
    float charBlock = step(0.3, cellUv.x) * step(cellUv.x, 0.7) *
                      step(0.2, cellUv.y) * step(cellUv.y, 0.8);

    return stream * charBlock * randomVal;
  }

  // Create hexagonal grid pattern
  float hexPattern(vec2 uv) {
    vec2 p = uv * 20.0;
    vec2 h = vec2(1.0, 1.732);
    vec2 a = mod(p, h) - h * 0.5;
    vec2 b = mod(p - h * 0.5, h) - h * 0.5;

    float d = min(dot(a, a), dot(b, b));
    return smoothstep(0.08, 0.05, d);
  }

  // Flowing data streams
  vec3 dataStreams(vec2 uv) {
    vec3 color = vec3(0.0);

    // Multiple layers of binary streams
    for(float i = 0.0; i < 3.0; i++) {
      float stream = binaryStream(uv + vec2(i * 0.1, 0.0), i * 100.0);

      // Color variation per stream
      vec3 streamColor = mix(
        mix(colorBitBlue, colorPixelCyan, i / 3.0),
        mix(colorPurple, colorMagenta, i / 3.0),
        sin(time * 0.5 + i) * 0.5 + 0.5
      );

      color += stream * streamColor * (0.4 + i * 0.2);
    }

    return color;
  }

  // Pixel bit pattern
  vec3 pixelBits(vec2 uv) {
    // Create animated pixel grid
    vec2 pixelUv = uv * 100.0;
    vec2 pixelId = floor(pixelUv);

    float pixelHash = hash(pixelId);
    float pixelActive = step(0.7, fract(pixelHash * 100.0 + time * 0.3));

    // Pulsing pixels
    float pulse = sin(time * 2.0 + pixelHash * 10.0) * 0.5 + 0.5;

    vec3 pixelColor = mix(colorBitBlue, colorPurple, pixelHash);
    return pixelColor * pixelActive * pulse * 0.2;
  }

  // Mouse interaction glow
  vec3 mouseGlow(vec2 uv) {
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float aspect = resolution.x / resolution.y;

    vec2 correctedUv = vec2(uv.x * aspect, uv.y);
    vec2 correctedMouse = vec2(mouseUv.x * aspect, mouseUv.y);

    float dist = length(correctedUv - correctedMouse);

    // Ripple effect
    float ripple = sin(dist * 20.0 - time * 5.0) * 0.5 + 0.5;
    ripple *= smoothstep(0.6, 0.0, dist);

    // Radial glow
    float glow = smoothstep(0.5, 0.0, dist);

    vec3 glowColor = mix(colorPixelCyan, colorMagenta, sin(time * 0.5) * 0.5 + 0.5);

    return glowColor * (glow * 0.3 + ripple * 0.5);
  }

  // Neural network nodes
  vec3 neuralNodes(vec2 uv) {
    vec3 color = vec3(0.0);

    for(float i = 0.0; i < 8.0; i++) {
      vec2 nodePos = vec2(
        0.5 + sin(time * 0.3 + i * 0.8) * 0.4,
        0.5 + cos(time * 0.4 + i * 0.6) * 0.4
      );

      float dist = length(uv - nodePos);

      // Node glow
      float node = smoothstep(0.05, 0.0, dist);
      float halo = smoothstep(0.15, 0.05, dist) * 0.3;

      vec3 nodeColor = mix(colorBitBlue, colorPurple, i / 8.0);
      color += (node + halo) * nodeColor;

      // Connecting lines
      for(float j = i + 1.0; j < 8.0; j++) {
        vec2 otherPos = vec2(
          0.5 + sin(time * 0.3 + j * 0.8) * 0.4,
          0.5 + cos(time * 0.4 + j * 0.6) * 0.4
        );

        vec2 lineDir = normalize(otherPos - nodePos);
        vec2 toPoint = uv - nodePos;
        float proj = clamp(dot(toPoint, lineDir) / length(otherPos - nodePos), 0.0, 1.0);
        vec2 closest = nodePos + lineDir * proj * length(otherPos - nodePos);

        float lineDist = length(uv - closest);
        float line = smoothstep(0.002, 0.0, lineDist);

        // Data packets flowing along lines
        float packetPos = fract(time * 0.5 + i * 0.1);
        float packet = smoothstep(0.05, 0.0, abs(proj - packetPos));

        color += (line * 0.1 + packet * 0.5) * mix(colorPixelCyan, colorMagenta, proj);
      }
    }

    return color;
  }

  void main() {
    vec2 uv = vUv;

    // Base gradient background
    vec3 bgGradient = mix(colorDeepBlue, colorDarkBlue, uv.y);

    // Add subtle noise to background
    float bgNoise = fbm(uv * 3.0 + time * 0.05) * 0.05;
    bgGradient += bgNoise;

    // Layer 1: Data streams (binary/hex flowing)
    vec3 streams = dataStreams(uv);

    // Layer 2: Pixel bits
    vec3 pixels = pixelBits(uv);

    // Layer 3: Hexagonal pattern overlay
    float hexGrid = hexPattern(uv + vec2(time * 0.02, 0.0));
    vec3 hexColor = colorBitBlue * hexGrid * 0.15;

    // Layer 4: Neural network
    vec3 neural = neuralNodes(uv);

    // Layer 5: Mouse interaction
    vec3 mouseEffect = mouseGlow(uv);

    // Combine all layers
    vec3 finalColor = bgGradient;
    finalColor += streams;
    finalColor += pixels;
    finalColor += hexColor;
    finalColor += neural * 0.4;
    finalColor += mouseEffect;

    // Add subtle vignette
    float vignette = smoothstep(1.2, 0.3, length(uv - 0.5));
    finalColor *= vignette * 0.7 + 0.3;

    // Add glow in areas of high intensity
    float intensity = dot(finalColor, vec3(0.299, 0.587, 0.114));
    finalColor += finalColor * pow(intensity, 3.0) * 0.5;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function DigitalDataFlowShader({ mouse, scrollY = 0 }: DigitalDataFlowShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        scrollY: { value: 0 },
      },
      vertexShader: dataFlowVertexShader,
      fragmentShader: dataFlowFragmentShader,
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
