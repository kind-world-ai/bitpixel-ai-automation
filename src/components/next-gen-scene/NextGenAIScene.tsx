import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NextGenAISceneProps {
  mouse: THREE.Vector2;
  scrollY?: number;
}

// Natural global illumination with AI agents - inspired by radiance cascades
const nextGenVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nextGenFragmentShader = `
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float scrollY;

  varying vec2 vUv;

  // Natural lighting colors
  const vec3 skyColor = vec3(0.53, 0.81, 0.92);         // Soft sky blue
  const vec3 lightColor = vec3(1.0, 0.95, 0.8);         // Warm sunlight
  const vec3 shadowColor = vec3(0.1, 0.15, 0.25);       // Cool shadows
  const vec3 ambientLight = vec3(0.4, 0.5, 0.6);        // Ambient bounce
  const vec3 aiAgentColor = vec3(0.2, 0.7, 1.0);        // AI blue
  const vec3 dataFlowColor = vec3(0.4, 0.9, 0.6);       // Success green
  const vec3 backgroundDark = vec3(0.08, 0.1, 0.15);    // Dark background

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

  // Soft distance field circle
  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  // Global illumination simulation - soft shadows and light bounces
  float globalIllumination(vec2 uv, vec2 lightPos, float radius) {
    vec2 toLight = lightPos - uv;
    float dist = length(toLight);

    // Inverse square falloff (natural light)
    float attenuation = 1.0 / (1.0 + dist * dist * 2.0);

    // Soft penumbra
    float penumbra = smoothstep(radius * 2.0, radius * 0.5, dist);

    return attenuation * penumbra;
  }

  // Radiance cascade simulation - multiple light bounces
  vec3 radianceCascade(vec2 uv) {
    vec3 radiance = vec3(0.0);

    // Primary light source (sun/key light)
    vec2 primaryLight = vec2(0.7, 0.8);
    float primaryGI = globalIllumination(uv, primaryLight, 0.3);
    radiance += lightColor * primaryGI * 0.8;

    // Secondary bounce (ambient occlusion)
    float ao = 1.0 - smoothstep(0.0, 0.5, length(uv - 0.5)) * 0.3;
    radiance += ambientLight * ao * 0.4;

    // Skylight (top-down ambient)
    float skyLight = smoothstep(0.3, 1.0, uv.y);
    radiance += skyColor * skyLight * 0.3;

    return radiance;
  }

  // AI Agent with soft shadows and GI
  vec3 aiAgent(vec2 uv, vec2 center, float size, float seed) {
    vec3 color = vec3(0.0);

    float dist = length(uv - center);

    // Core agent
    float agent = smoothstep(size + 0.01, size, dist);

    // Soft shadow (GI)
    vec2 shadowOffset = vec2(0.02, -0.02);
    float shadowDist = length(uv - (center + shadowOffset));
    float shadow = smoothstep(size * 1.5, size, shadowDist) * 0.3;

    // Glow from processing
    float glow = smoothstep(size * 1.8, size, dist);
    float pulse = sin(time * 2.0 + seed * 10.0) * 0.5 + 0.5;

    // Natural lighting on agent
    vec2 lightDir = normalize(vec2(0.7, 0.8) - center);
    vec2 toPixel = normalize(uv - center);
    float lighting = dot(lightDir, toPixel) * 0.5 + 0.5;

    // Combine
    vec3 agentColor = mix(aiAgentColor, lightColor, lighting * 0.3);
    color = agentColor * agent;
    color -= shadowColor * shadow;
    color += aiAgentColor * glow * pulse * 0.2;

    return color;
  }

  // Data flow between agents with natural light trails
  vec3 dataFlow(vec2 uv, vec2 start, vec2 end, float offset) {
    vec3 color = vec3(0.0);

    vec2 dir = end - start;
    float pathLength = length(dir);
    vec2 pathDir = normalize(dir);

    // Flowing particles
    for(float i = 0.0; i < 3.0; i++) {
      float t = fract(time * 0.4 + offset + i * 0.33 + scrollY * 0.1);
      vec2 particlePos = start + pathDir * t * pathLength;

      // Curve the path naturally
      float curve = sin(t * 3.14159) * 0.05;
      particlePos += vec2(-pathDir.y, pathDir.x) * curve;

      float dist = length(uv - particlePos);
      float particle = smoothstep(0.015, 0.0, dist);

      // Natural glow with GI
      float glow = smoothstep(0.04, 0.01, dist) * 0.4;

      // Light trail
      float trail = smoothstep(0.02, 0.0, dist) * (1.0 - t) * 0.2;

      vec3 particleColor = mix(dataFlowColor, lightColor, 0.3);
      color += particleColor * (particle + glow + trail);
    }

    // Connection line with soft glow
    vec2 toPoint = uv - start;
    float proj = clamp(dot(toPoint, dir) / dot(dir, dir), 0.0, 1.0);
    vec2 closest = start + dir * proj;
    float lineDist = length(uv - closest);
    float line = smoothstep(0.003, 0.0, lineDist) * 0.15;

    color += dataFlowColor * line;

    return color;
  }

  // AI agent network with natural lighting
  vec3 aiNetwork(vec2 uv) {
    vec3 color = vec3(0.0);

    // Agent positions (forming a network)
    vec2 agents[6];
    agents[0] = vec2(0.25, 0.35);
    agents[1] = vec2(0.5, 0.25);
    agents[2] = vec2(0.75, 0.35);
    agents[3] = vec2(0.3, 0.65);
    agents[4] = vec2(0.5, 0.75);
    agents[5] = vec2(0.7, 0.65);

    // Draw connections first (behind agents)
    for(int i = 0; i < 6; i++) {
      for(int j = i + 1; j < 6; j++) {
        if(length(agents[i] - agents[j]) < 0.4) {
          color += dataFlow(uv, agents[i], agents[j], float(i) * 0.2);
        }
      }
    }

    // Draw agents with natural lighting
    for(int i = 0; i < 6; i++) {
      // Animate positions slightly
      vec2 animPos = agents[i];
      animPos.x += sin(time * 0.3 + float(i)) * 0.02;
      animPos.y += cos(time * 0.4 + float(i) * 0.7) * 0.02;

      color += aiAgent(uv, animPos, 0.04, float(i));
    }

    return color;
  }

  // Processing status indicators with natural glow
  vec3 statusIndicators(vec2 uv) {
    vec3 color = vec3(0.0);

    // Small status dots at bottom
    for(float i = 0.0; i < 5.0; i++) {
      vec2 dotPos = vec2(0.3 + i * 0.1, 0.12);
      float dist = length(uv - dotPos);

      float activity = step(fract(time * 0.5 - i * 0.1), 0.5);
      float dot = smoothstep(0.008, 0.005, dist);

      // Natural glow
      float glow = smoothstep(0.02, 0.005, dist) * activity * 0.3;

      vec3 dotColor = mix(aiAgentColor, dataFlowColor, activity);
      color += (dot + glow) * dotColor;
    }

    return color;
  }

  // Natural light rays (like god rays)
  vec3 lightRays(vec2 uv) {
    vec3 color = vec3(0.0);

    vec2 lightSource = vec2(0.7, 0.8);
    vec2 toLight = lightSource - uv;
    float angle = atan(toLight.y, toLight.x);

    // Radial rays
    float rays = sin(angle * 12.0 + time * 0.5) * 0.5 + 0.5;
    float rayStrength = smoothstep(1.0, 0.3, length(toLight));

    color = lightColor * rays * rayStrength * 0.08;

    return color;
  }

  // Mouse interaction - adds interactive light source
  vec3 mouseLight(vec2 uv) {
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float aspect = resolution.x / resolution.y;
    vec2 correctedUv = vec2(uv.x * aspect, uv.y);
    vec2 correctedMouse = vec2(mouseUv.x * aspect, mouseUv.y);

    float dist = length(correctedUv - correctedMouse);

    // Soft interactive light
    float light = smoothstep(0.3, 0.0, dist);

    // Ripples
    float ripple = sin(dist * 15.0 - time * 4.0) * 0.5 + 0.5;
    ripple *= smoothstep(0.3, 0.0, dist) * 0.2;

    vec3 interactColor = mix(lightColor, aiAgentColor, 0.5);
    return interactColor * (light * 0.4 + ripple);
  }

  // Subtle grid with GI
  float naturalGrid(vec2 uv) {
    vec2 grid = abs(fract(uv * 30.0) - 0.5);
    float line = min(grid.x, grid.y);
    float gridLine = smoothstep(0.02, 0.0, line);

    // Apply GI to grid
    vec3 radiance = radianceCascade(uv);
    float avgRadiance = (radiance.r + radiance.g + radiance.b) / 3.0;

    return gridLine * avgRadiance * 0.1;
  }

  void main() {
    vec2 uv = vUv;

    // Base radiance (global illumination)
    vec3 radiance = radianceCascade(uv);
    vec3 finalColor = radiance * 0.3 + backgroundDark;

    // Add natural grid
    finalColor += naturalGrid(uv);

    // Add light rays
    finalColor += lightRays(uv);

    // Add AI network
    finalColor += aiNetwork(uv);

    // Add status indicators
    finalColor += statusIndicators(uv);

    // Mouse interaction
    finalColor += mouseLight(uv);

    // Subtle atmospheric perspective
    float depth = uv.y;
    finalColor = mix(finalColor, skyColor * 0.2, depth * 0.1);

    // Natural vignette
    float vignette = smoothstep(1.0, 0.5, length(uv - 0.5));
    finalColor *= vignette * 0.85 + 0.15;

    // Subtle film grain for naturalness
    float grain = noise(uv * 500.0 + time) * 0.02;
    finalColor += grain;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function NextGenAIScene({ mouse, scrollY = 0 }: NextGenAISceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        scrollY: { value: 0 },
      },
      vertexShader: nextGenVertexShader,
      fragmentShader: nextGenFragmentShader,
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
