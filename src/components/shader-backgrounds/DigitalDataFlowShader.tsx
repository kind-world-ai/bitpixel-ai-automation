import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DigitalDataFlowShaderProps {
  mouse: THREE.Vector2;
  scrollY?: number;
}

// IMPROVED: More subtle, natural lighting with reduced brightness
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

  // BitPixel brand colors - toned down
  const vec3 colorBitBlue = vec3(0.0, 0.5, 0.6);        // Darker blue
  const vec3 colorPixelCyan = vec3(0.0, 0.6, 0.7);      // Darker cyan
  const vec3 colorPurple = vec3(0.4, 0.3, 0.6);         // Darker purple
  const vec3 colorMagenta = vec3(0.5, 0.1, 0.3);        // Darker magenta
  const vec3 colorDeepBlue = vec3(0.01, 0.02, 0.04);    // Very dark
  const vec3 colorDarkBlue = vec3(0.02, 0.04, 0.08);    // Dark

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Subtle data streams
  float dataStream(vec2 uv, float offset) {
    vec2 gridUv = uv * vec2(40.0, 30.0);
    vec2 cellId = floor(gridUv);
    vec2 cellUv = fract(gridUv);

    float randomVal = hash(cellId + offset);
    float flowSpeed = time * 0.4 + scrollY * 0.3;
    float streamPos = fract(cellId.y * 0.15 - flowSpeed + randomVal);

    // Sparse streams
    if(randomVal < 0.85) return 0.0;

    float stream = smoothstep(0.95, 1.0, streamPos);
    stream += smoothstep(0.0, 0.05, streamPos) * 0.2;

    float charBlock = step(0.4, cellUv.x) * step(cellUv.x, 0.6) *
                      step(0.3, cellUv.y) * step(cellUv.y, 0.7);

    return stream * charBlock * 0.3;
  }

  // Very subtle grid
  float subtleGrid(vec2 uv) {
    vec2 grid = abs(fract(uv * 30.0) - 0.5);
    float line = min(grid.x, grid.y);
    return smoothstep(0.02, 0.0, line) * 0.05;
  }

  // Minimal neural network
  vec3 subtleNeural(vec2 uv) {
    vec3 color = vec3(0.0);

    // Only 4 nodes instead of 8
    for(float i = 0.0; i < 4.0; i++) {
      vec2 nodePos = vec2(
        0.5 + sin(time * 0.2 + i * 1.5) * 0.35,
        0.5 + cos(time * 0.25 + i * 1.2) * 0.35
      );

      float dist = length(uv - nodePos);

      // Very small, subtle nodes
      float node = smoothstep(0.015, 0.0, dist);
      float halo = smoothstep(0.06, 0.015, dist) * 0.1;

      vec3 nodeColor = mix(colorBitBlue, colorPurple, i / 4.0);
      color += (node + halo) * nodeColor * 0.4;

      // Minimal connecting lines
      for(float j = i + 1.0; j < 4.0; j++) {
        vec2 otherPos = vec2(
          0.5 + sin(time * 0.2 + j * 1.5) * 0.35,
          0.5 + cos(time * 0.25 + j * 1.2) * 0.35
        );

        vec2 lineDir = normalize(otherPos - nodePos);
        vec2 toPoint = uv - nodePos;
        float proj = clamp(dot(toPoint, lineDir) / length(otherPos - nodePos), 0.0, 1.0);
        vec2 closest = nodePos + lineDir * proj * length(otherPos - nodePos);

        float lineDist = length(uv - closest);
        float line = smoothstep(0.001, 0.0, lineDist);

        // Subtle data packet
        float packetPos = fract(time * 0.3 + i * 0.2);
        float packet = smoothstep(0.03, 0.0, abs(proj - packetPos));

        color += (line * 0.03 + packet * 0.15) * mix(colorBitBlue, colorPurple, proj);
      }
    }

    return color;
  }

  // Gentle mouse interaction
  vec3 gentleMouseEffect(vec2 uv) {
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float aspect = resolution.x / resolution.y;
    vec2 correctedUv = vec2(uv.x * aspect, uv.y);
    vec2 correctedMouse = vec2(mouseUv.x * aspect, mouseUv.y);
    float dist = length(correctedUv - correctedMouse);

    // Very subtle ripple
    float ripple = sin(dist * 15.0 - time * 3.0) * 0.5 + 0.5;
    ripple *= smoothstep(0.4, 0.0, dist) * 0.15;

    // Soft glow
    float glow = smoothstep(0.3, 0.0, dist) * 0.1;

    vec3 glowColor = mix(colorBitBlue, colorPurple, 0.5);
    return glowColor * (glow + ripple);
  }

  // Floating particles
  vec3 floatingParticles(vec2 uv) {
    vec3 color = vec3(0.0);

    for(float i = 0.0; i < 15.0; i++) {
      vec2 particlePos = vec2(
        fract(i * 0.618 + time * 0.05),
        fract(i * 0.314 + time * 0.08 + sin(i))
      );

      float dist = length(uv - particlePos);
      float particle = smoothstep(0.008, 0.0, dist);

      vec3 particleColor = mix(colorBitBlue, colorPixelCyan, fract(i * 0.5));
      float twinkle = sin(time * 2.0 + i * 3.0) * 0.5 + 0.5;

      color += particle * particleColor * twinkle * 0.2;
    }

    return color;
  }

  void main() {
    vec2 uv = vUv;

    // Darker background with subtle gradient
    vec3 bg = mix(colorDeepBlue, colorDarkBlue, uv.y * 0.5);

    // Very subtle noise
    float bgNoise = fbm(uv * 2.0 + time * 0.03) * 0.02;
    bg += bgNoise;

    // Subtle data streams
    vec3 streams = vec3(0.0);
    for(float i = 0.0; i < 2.0; i++) {
      float stream = dataStream(uv + vec2(i * 0.2, 0.0), i * 50.0);
      vec3 streamColor = mix(colorBitBlue, colorPixelCyan, i / 2.0);
      streams += stream * streamColor * 0.3;
    }

    // Minimal grid
    float grid = subtleGrid(uv);
    vec3 gridColor = colorBitBlue * grid;

    // Subtle neural network
    vec3 neural = subtleNeural(uv);

    // Floating particles
    vec3 particles = floatingParticles(uv);

    // Gentle mouse effect
    vec3 mouseEffect = gentleMouseEffect(uv);

    // Combine all layers with reduced intensity
    vec3 finalColor = bg;
    finalColor += streams * 0.6;
    finalColor += gridColor;
    finalColor += neural * 0.5;
    finalColor += particles;
    finalColor += mouseEffect;

    // Subtle vignette
    float vignette = smoothstep(1.0, 0.4, length(uv - 0.5));
    finalColor *= vignette * 0.8 + 0.2;

    // NO BLOOM - removed the bright glow effect

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
