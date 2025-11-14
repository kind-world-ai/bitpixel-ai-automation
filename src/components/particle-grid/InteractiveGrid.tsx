import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractiveGridProps {
  mouse: THREE.Vector2;
  mouseInfluence: number;
}

const gridPlaneVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridPlaneFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform vec2 mouse;
  uniform float mouseInfluence;
  uniform vec2 resolution;

  const float gridDensity = 50.0;
  const float lineThickness = 0.008;
  const float waveSpeed = 8.0;
  const float waveFrequency = 25.0;
  const float highlightRadius = 0.2;

  vec3 backgroundColor = vec3(0.0, 0.0, 0.0);
  vec3 baseLineColor = vec3(0.08, 0.18, 0.5);
  vec3 highlightLineColor = vec3(0.9, 0.95, 1.0);
  vec3 waveColor = vec3(0.3, 0.8, 1.0);
  vec3 waveHighlightColor = vec3(0.8, 0.4, 1.0);
  vec3 energyColor = vec3(0.5, 1.0, 1.0);
  vec3 accentColor = vec3(1.0, 0.4, 0.8);

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float drawGrid(vec2 uv, float density, float thickness) {
    vec2 gridUv = uv * density;
    vec2 gridDeriv = fwidth(gridUv) * 0.5;
    vec2 gridLines = abs(fract(gridUv) - 0.5);
    vec2 gridLineAA = smoothstep(gridDeriv, gridDeriv * 2.0, gridLines);
    return 1.0 - min(gridLineAA.x, gridLineAA.y);
  }

  void main() {
    vec2 uv = vUv;
    float elapsedTime = time;
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float screenAspect = resolution.x / resolution.y;
    vec2 aspectCorrectedUv = vec2(uv.x * screenAspect, uv.y);
    vec2 aspectCorrectedMouseUv = vec2(mouseUv.x * screenAspect, mouseUv.y);
    float distToMouse = length(aspectCorrectedUv - aspectCorrectedMouseUv);

    float intensity = smoothstep(highlightRadius * 1.5, 0.0, distToMouse);
    intensity = pow(intensity, 1.5) * mouseInfluence;

    float wave1 = sin(distToMouse * waveFrequency - elapsedTime * waveSpeed) * 0.5 + 0.5;
    wave1 = pow(wave1, 2.0) * smoothstep(highlightRadius * 3.0, 0.0, distToMouse);

    float wave2 = cos(distToMouse * waveFrequency * 1.5 - elapsedTime * waveSpeed * 0.7 + 1.0) * 0.5 + 0.5;
    wave2 = pow(wave2, 3.0) * smoothstep(highlightRadius * 2.5, 0.0, distToMouse);

    float combinedWave = (wave1 + wave2 * 0.6) * mouseInfluence * 1.2;

    vec2 dirToMouse = normalize(uv - mouseUv + 0.0001);
    float distortionStrength = 0.08;
    vec2 distortedUv = uv + dirToMouse * intensity * distortionStrength;

    float flowNoise = noise(uv * 5.0 + elapsedTime * 0.2);
    distortedUv += vec2(sin(elapsedTime * 0.4 + flowNoise * 2.0), cos(elapsedTime * 0.35 + flowNoise * 1.5)) * 0.015;

    float gridValue = drawGrid(distortedUv, gridDensity, lineThickness);

    float visibilityNoise1 = noise(uv * 2.5 + elapsedTime * 0.15);
    float visibilityNoise2 = noise(uv * 5.0 - elapsedTime * 0.1);
    float visibilityMask = smoothstep(0.15, 0.4, visibilityNoise1) * smoothstep(0.25, 0.55, visibilityNoise2);
    visibilityMask = max(0.2, visibilityMask);

    float energyFlow1 = sin(uv.x * 30.0 - elapsedTime * 12.0 + noise(uv * 3.0) * 10.0) * 0.5 + 0.5;
    float energyFlow2 = cos(uv.y * 35.0 + elapsedTime * 10.0 + noise(uv * 2.5) * 8.0) * 0.5 + 0.5;
    float energyValue = pow(energyFlow1 * energyFlow2, 3.5);
    energyValue = smoothstep(0.05, 0.6, energyValue);

    float accentPulse = sin(elapsedTime * 2.0 + uv.x * 20.0) * sin(elapsedTime * 1.5 + uv.y * 15.0);
    accentPulse = smoothstep(0.7, 0.9, accentPulse) * 0.5;

    vec3 baseColor = baseLineColor;
    vec3 energyPulseColor = mix(baseColor, energyColor * 1.5, energyValue);
    energyPulseColor = mix(energyPulseColor, accentColor, accentPulse);

    vec3 interactionHighlight = mix(energyPulseColor, highlightLineColor, pow(intensity, 0.4));

    vec3 waveMixColor = mix(waveColor * 1.4, waveHighlightColor * 1.6, pow(wave1, 3.0));
    waveMixColor = mix(waveMixColor, accentColor * 1.3, wave2 * 0.5);

    vec3 interactionColor = mix(interactionHighlight, waveMixColor, combinedWave * 0.8);

    vec3 finalLineColor = mix(energyPulseColor, interactionColor, smoothstep(0.01, 0.4, intensity + combinedWave * 0.6));

    float bgGlow = smoothstep(highlightRadius * 4.0, 0.0, distToMouse) * mouseInfluence * 0.2;
    vec3 bgGlowColor = mix(waveColor, waveHighlightColor, wave1);

    float bgNoise = noise(uv * 12.0 + elapsedTime * 0.1) * 0.04;

    vec3 gridCombined = finalLineColor * gridValue * visibilityMask;
    vec3 finalColor = backgroundColor + gridCombined + bgGlowColor * bgGlow + bgNoise * baseLineColor;
    finalColor = max(finalColor, baseLineColor * gridValue * 0.08 * visibilityMask);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function InteractiveGrid({ mouse, mouseInfluence }: InteractiveGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, size } = useThree();

  const { geometry, material } = useMemo(() => {
    const aspect = size.width / size.height;
    const vFov = ((camera as THREE.PerspectiveCamera).fov || 75) * Math.PI / 180;
    const planeHeightAtDistance = 2 * Math.tan(vFov / 2) * 35;
    const planeWidthAtDistance = planeHeightAtDistance * aspect;

    const geo = new THREE.PlaneGeometry(
      Math.max(1, planeWidthAtDistance * 1.5),
      Math.max(1, planeHeightAtDistance * 1.5),
      1,
      1
    );

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        mouseInfluence: { value: 0.0 },
        resolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      vertexShader: gridPlaneVertexShader,
      fragmentShader: gridPlaneFragmentShader,
      transparent: false,
      depthTest: true,
      side: THREE.DoubleSide,
    });

    return { geometry: geo, material: mat };
  }, [camera, size]);

  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.mouse.value.copy(mouse);
      material.uniforms.mouseInfluence.value = mouseInfluence;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, -35]} />;
}
