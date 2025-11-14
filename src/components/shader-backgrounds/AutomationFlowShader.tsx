import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AutomationFlowShaderProps {
  mouse: THREE.Vector2;
  scrollY?: number;
}

// Meaningful visualization of automation and data processing
const automationFlowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const automationFlowFragmentShader = `
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float scrollY;

  varying vec2 vUv;

  // BitPixel brand colors
  const vec3 colorInput = vec3(0.5, 0.5, 0.8);          // Input data - blue
  const vec3 colorProcessing = vec3(0.4, 0.6, 0.9);     // Processing - cyan
  const vec3 colorOutput = vec3(0.2, 0.8, 0.5);         // Output - green
  const vec3 colorSuccess = vec3(0.3, 0.9, 0.6);        // Success - bright green
  const vec3 colorWarning = vec3(0.9, 0.7, 0.2);        // Warning - yellow
  const vec3 colorBackground = vec3(0.02, 0.03, 0.06);  // Dark bg

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

  // Processing stage visualization
  vec3 processingStage(vec2 uv, vec2 center, float progress, vec3 color) {
    float dist = length(uv - center);

    // Stage circle
    float stage = smoothstep(0.08, 0.07, dist);
    stage -= smoothstep(0.07, 0.06, dist);

    // Progress indicator
    float angle = atan(uv.y - center.y, uv.x - center.x);
    float progressAngle = progress * 6.28318;
    float progressArc = step(angle, progressAngle) * smoothstep(0.075, 0.065, dist);
    progressArc -= smoothstep(0.07, 0.06, dist);

    // Inner glow when processing
    float innerGlow = smoothstep(0.06, 0.0, dist) * progress * 0.3;

    vec3 result = color * (stage * 0.4 + progressArc * 0.8 + innerGlow);

    return result;
  }

  // Data flow particles
  vec3 dataParticles(vec2 uv, vec2 start, vec2 end, float offset) {
    vec3 color = vec3(0.0);

    vec2 direction = end - start;
    float pathLength = length(direction);
    vec2 pathDir = normalize(direction);

    // Multiple particles along path
    for(float i = 0.0; i < 5.0; i++) {
      float t = fract(time * 0.3 + offset + i * 0.2 + scrollY * 0.1);
      vec2 particlePos = start + pathDir * t * pathLength;

      // Add curve to path
      float curve = sin(t * 3.14159) * 0.1;
      particlePos += vec2(-pathDir.y, pathDir.x) * curve;

      float dist = length(uv - particlePos);
      float particle = smoothstep(0.012, 0.0, dist);

      // Trail
      float trail = smoothstep(0.03, 0.01, dist) * (1.0 - t) * 0.3;

      // Color transition
      vec3 particleColor = mix(colorInput, colorOutput, t);

      color += (particle + trail) * particleColor;
    }

    return color;
  }

  // Connecting lines between stages
  float connectionLine(vec2 uv, vec2 start, vec2 end, float thickness) {
    vec2 dir = end - start;
    vec2 toPoint = uv - start;
    float proj = clamp(dot(toPoint, dir) / dot(dir, dir), 0.0, 1.0);
    vec2 closest = start + dir * proj;
    float dist = length(uv - closest);

    return smoothstep(thickness, thickness * 0.5, dist);
  }

  // Input nodes (left side)
  vec3 inputNodes(vec2 uv) {
    vec3 color = vec3(0.0);

    for(float i = 0.0; i < 3.0; i++) {
      vec2 nodePos = vec2(0.15, 0.3 + i * 0.2);
      float dist = length(uv - nodePos);

      // Pulsing input
      float pulse = sin(time * 2.0 + i * 0.5) * 0.3 + 0.7;
      float node = smoothstep(0.025, 0.02, dist) * pulse;

      // Data emission
      float emission = smoothstep(0.05, 0.02, dist) * 0.2 * pulse;

      color += (node + emission) * colorInput;
    }

    return color;
  }

  // Output nodes (right side)
  vec3 outputNodes(vec2 uv) {
    vec3 color = vec3(0.0);

    for(float i = 0.0; i < 3.0; i++) {
      vec2 nodePos = vec2(0.85, 0.3 + i * 0.2);
      float dist = length(uv - nodePos);

      // Success indicator
      float completionPulse = sin(time * 1.5 + i * 0.7) * 0.5 + 0.5;
      float node = smoothstep(0.025, 0.02, dist);

      // Checkmark effect
      float checkGlow = smoothstep(0.04, 0.02, dist) * completionPulse * 0.3;

      color += (node + checkGlow) * mix(colorOutput, colorSuccess, completionPulse);
    }

    return color;
  }

  // Processing stages (center)
  vec3 processingStages(vec2 uv) {
    vec3 color = vec3(0.0);

    // Stage 1: Data validation
    float progress1 = fract(time * 0.4);
    color += processingStage(uv, vec2(0.35, 0.5), progress1, colorProcessing);

    // Stage 2: AI processing
    float progress2 = fract(time * 0.4 + 0.33);
    color += processingStage(uv, vec2(0.5, 0.5), progress2, mix(colorProcessing, colorWarning, 0.3));

    // Stage 3: Output generation
    float progress3 = fract(time * 0.4 + 0.66);
    color += processingStage(uv, vec2(0.65, 0.5), progress3, mix(colorProcessing, colorOutput, 0.5));

    return color;
  }

  // Pipeline connections
  vec3 pipelineConnections(vec2 uv) {
    vec3 color = vec3(0.0);

    // Input to stage 1
    for(float i = 0.0; i < 3.0; i++) {
      vec2 start = vec2(0.15, 0.3 + i * 0.2);
      vec2 end = vec2(0.35, 0.5);
      float line = connectionLine(uv, start, end, 0.002);
      color += line * colorInput * 0.15;
      color += dataParticles(uv, start, end, i * 0.3);
    }

    // Stage 1 to Stage 2
    float line12 = connectionLine(uv, vec2(0.35, 0.5), vec2(0.5, 0.5), 0.003);
    color += line12 * colorProcessing * 0.2;
    color += dataParticles(uv, vec2(0.35, 0.5), vec2(0.5, 0.5), 0.5);

    // Stage 2 to Stage 3
    float line23 = connectionLine(uv, vec2(0.5, 0.5), vec2(0.65, 0.5), 0.003);
    color += line23 * colorProcessing * 0.2;
    color += dataParticles(uv, vec2(0.5, 0.5), vec2(0.65, 0.5), 0.7);

    // Stage 3 to outputs
    for(float i = 0.0; i < 3.0; i++) {
      vec2 start = vec2(0.65, 0.5);
      vec2 end = vec2(0.85, 0.3 + i * 0.2);
      float line = connectionLine(uv, start, end, 0.002);
      color += line * colorOutput * 0.15;
      color += dataParticles(uv, start, end, 0.9 + i * 0.3);
    }

    return color;
  }

  // Stage labels/indicators
  vec3 stageIndicators(vec2 uv) {
    vec3 color = vec3(0.0);

    // Small indicator dots below each stage
    vec3 positions[3];
    positions[0] = vec3(0.35, 0.38, 0.0);
    positions[1] = vec3(0.5, 0.38, 0.0);
    positions[2] = vec3(0.65, 0.38, 0.0);

    for(int i = 0; i < 3; i++) {
      float dist = length(uv - positions[i].xy);
      float dot = smoothstep(0.008, 0.005, dist);

      float activity = sin(time * 3.0 + float(i) * 2.0) * 0.5 + 0.5;
      vec3 dotColor = mix(colorProcessing, colorSuccess, activity);

      color += dot * dotColor * 0.6;
    }

    return color;
  }

  // Mouse interaction - highlight flow
  vec3 mouseHighlight(vec2 uv) {
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float aspect = resolution.x / resolution.y;
    vec2 correctedUv = vec2(uv.x * aspect, uv.y);
    vec2 correctedMouse = vec2(mouseUv.x * aspect, mouseUv.y);

    float dist = length(correctedUv - correctedMouse);
    float highlight = smoothstep(0.3, 0.0, dist);

    // Ripple effect
    float ripple = sin(dist * 20.0 - time * 4.0) * 0.5 + 0.5;
    ripple *= smoothstep(0.3, 0.0, dist) * 0.2;

    vec3 highlightColor = mix(colorProcessing, colorSuccess, 0.5);
    return highlightColor * (highlight * 0.15 + ripple);
  }

  // Background grid
  float backgroundGrid(vec2 uv) {
    vec2 grid = abs(fract(uv * 40.0 - 0.5) - 0.5) / fwidth(uv * 40.0);
    float line = min(grid.x, grid.y);
    return 1.0 - min(line, 1.0);
  }

  void main() {
    vec2 uv = vUv;

    // Dark background
    vec3 bg = colorBackground;

    // Subtle animated grid
    float grid = backgroundGrid(uv + vec2(time * 0.01, 0.0));
    bg += colorInput * grid * 0.02;

    // Build the automation pipeline
    vec3 finalColor = bg;

    // Add all layers
    finalColor += inputNodes(uv);
    finalColor += outputNodes(uv);
    finalColor += processingStages(uv);
    finalColor += pipelineConnections(uv);
    finalColor += stageIndicators(uv);
    finalColor += mouseHighlight(uv);

    // Subtle noise
    float noiseVal = noise(uv * 50.0 + time * 0.5) * 0.02;
    finalColor += noiseVal;

    // Vignette
    float vignette = smoothstep(1.0, 0.3, length(uv - 0.5));
    finalColor *= vignette * 0.85 + 0.15;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function AutomationFlowShader({ mouse, scrollY = 0 }: AutomationFlowShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        scrollY: { value: 0 },
      },
      vertexShader: automationFlowVertexShader,
      fragmentShader: automationFlowFragmentShader,
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
