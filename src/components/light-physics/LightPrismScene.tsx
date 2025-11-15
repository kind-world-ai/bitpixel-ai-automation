import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightPrismSceneProps {
  mouse: THREE.Vector2;
  showLabels?: boolean;
}

// Educational light physics shader - showing dispersion and wavelengths
const lightPrismVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lightPrismFragmentShader = `
  uniform float time;
  uniform vec2 mouse;
  uniform vec2 resolution;
  uniform float showLabels;

  varying vec2 vUv;

  // Light mode colors (bright and natural)
  const vec3 backgroundColor = vec3(0.95, 0.96, 0.98);  // Soft white
  const vec3 whiteLight = vec3(1.0, 1.0, 1.0);          // Pure white
  const vec3 paperColor = vec3(0.98, 0.98, 0.96);       // Warm paper

  // Convert wavelength (nm) to RGB color
  // Based on actual physics: 380nm (violet) to 780nm (red)
  vec3 wavelengthToRGB(float wavelength) {
    float red = 0.0;
    float green = 0.0;
    float blue = 0.0;

    if (wavelength >= 380.0 && wavelength < 440.0) {
      // Violet to Blue
      red = (440.0 - wavelength) / (440.0 - 380.0) * 0.8;
      blue = 1.0;
    } else if (wavelength >= 440.0 && wavelength < 490.0) {
      // Blue to Cyan
      green = (wavelength - 440.0) / (490.0 - 440.0);
      blue = 1.0;
    } else if (wavelength >= 490.0 && wavelength < 510.0) {
      // Cyan to Green
      green = 1.0;
      blue = (510.0 - wavelength) / (510.0 - 490.0);
    } else if (wavelength >= 510.0 && wavelength < 580.0) {
      // Green to Yellow
      red = (wavelength - 510.0) / (580.0 - 510.0);
      green = 1.0;
    } else if (wavelength >= 580.0 && wavelength < 645.0) {
      // Yellow to Orange to Red
      red = 1.0;
      green = (645.0 - wavelength) / (645.0 - 580.0);
    } else if (wavelength >= 645.0 && wavelength <= 780.0) {
      // Deep Red
      red = 1.0;
    }

    // Intensity falloff at edges of visible spectrum
    float intensity = 1.0;
    if (wavelength >= 380.0 && wavelength < 420.0) {
      intensity = 0.3 + 0.7 * (wavelength - 380.0) / (420.0 - 380.0);
    } else if (wavelength > 700.0 && wavelength <= 780.0) {
      intensity = 0.3 + 0.7 * (780.0 - wavelength) / (780.0 - 700.0);
    }

    return vec3(red, green, blue) * intensity;
  }

  // Draw prism shape
  float sdTriangle(vec2 p, vec2 p0, vec2 p1, vec2 p2) {
    vec2 e0 = p1 - p0;
    vec2 e1 = p2 - p1;
    vec2 e2 = p0 - p2;
    vec2 v0 = p - p0;
    vec2 v1 = p - p1;
    vec2 v2 = p - p2;

    vec2 pq0 = v0 - e0 * clamp(dot(v0, e0) / dot(e0, e0), 0.0, 1.0);
    vec2 pq1 = v1 - e1 * clamp(dot(v1, e1) / dot(e1, e1), 0.0, 1.0);
    vec2 pq2 = v2 - e2 * clamp(dot(v2, e2) / dot(e2, e2), 0.0, 1.0);

    float s = sign(e0.x * e2.y - e0.y * e2.x);
    vec2 d = min(min(
      vec2(dot(pq0, pq0), s * (v0.x * e0.y - v0.y * e0.x)),
      vec2(dot(pq1, pq1), s * (v1.x * e1.y - v1.y * e1.x))),
      vec2(dot(pq2, pq2), s * (v2.x * e2.y - v2.y * e2.x)));

    return -sqrt(d.x) * sign(d.y);
  }

  // White light ray entering prism
  vec3 whiteLightRay(vec2 uv) {
    vec3 color = vec3(0.0);

    // Light ray from left
    vec2 rayStart = vec2(0.15, 0.5);
    vec2 rayEnd = vec2(0.4, 0.5);

    // Distance to ray
    vec2 toPoint = uv - rayStart;
    vec2 rayDir = normalize(rayEnd - rayStart);
    float proj = dot(toPoint, rayDir);
    proj = clamp(proj, 0.0, length(rayEnd - rayStart));
    vec2 closest = rayStart + rayDir * proj;
    float dist = length(uv - closest);

    // Ray beam
    float beam = smoothstep(0.008, 0.0, dist);
    beam *= smoothstep(0.0, 0.05, proj);

    // Glow
    float glow = smoothstep(0.03, 0.0, dist) * 0.4;

    color = whiteLight * (beam + glow);

    // Add some sparkle
    float sparkle = sin(proj * 100.0 - time * 5.0) * 0.5 + 0.5;
    color += whiteLight * sparkle * beam * 0.3;

    return color;
  }

  // Dispersed rainbow rays from prism
  vec3 dispersedRays(vec2 uv) {
    vec3 color = vec3(0.0);

    // Prism exit point
    vec2 exitPoint = vec2(0.55, 0.5);

    // Number of wavelengths to simulate
    for(float i = 0.0; i < 30.0; i++) {
      float t = i / 29.0;

      // Wavelength from 380nm (violet) to 780nm (red)
      float wavelength = 380.0 + t * 400.0;

      // Dispersion angle - different wavelengths refract differently
      // Violet bends more than red (this is physics!)
      float dispersionAngle = (1.0 - t) * 0.15 - 0.075;

      // Ray direction
      vec2 rayDir = normalize(vec2(1.0, dispersionAngle));
      vec2 rayEnd = exitPoint + rayDir * 0.6;

      // Distance to this wavelength's ray
      vec2 toPoint = uv - exitPoint;
      float proj = dot(toPoint, rayDir);
      proj = clamp(proj, 0.0, length(rayEnd - exitPoint));
      vec2 closest = exitPoint + rayDir * proj;
      float dist = length(uv - closest);

      // Ray intensity
      float beam = smoothstep(0.003, 0.0, dist);
      beam *= smoothstep(0.0, 0.05, proj);

      // Glow for each wavelength
      float glow = smoothstep(0.015, 0.0, dist) * 0.3;

      // Get color for this wavelength
      vec3 wavelengthColor = wavelengthToRGB(wavelength);

      color += wavelengthColor * (beam * 0.8 + glow);
    }

    return color;
  }

  // Prism glass
  vec3 prismGlass(vec2 uv) {
    vec3 color = vec3(0.0);

    // Prism vertices (equilateral triangle)
    vec2 v0 = vec2(0.45, 0.35);
    vec2 v1 = vec2(0.45, 0.65);
    vec2 v2 = vec2(0.58, 0.5);

    float prismDist = sdTriangle(uv, v0, v1, v2);

    // Glass body
    float prism = smoothstep(0.002, 0.0, prismDist);

    // Glass color (slight cyan tint)
    vec3 glassColor = vec3(0.9, 0.95, 0.98);

    // Edge highlight
    float edge = smoothstep(0.006, 0.0, abs(prismDist)) * (1.0 - prism);

    color = glassColor * prism * 0.3;
    color += vec3(1.0) * edge * 0.5;

    // Internal reflections
    float refraction = sin(uv.x * 80.0) * sin(uv.y * 80.0) * 0.5 + 0.5;
    color += refraction * prism * 0.1;

    return color;
  }

  // Spectrum bar showing wavelengths
  vec3 spectrumBar(vec2 uv) {
    vec3 color = vec3(0.0);

    // Spectrum bar at bottom
    float barY = 0.12;
    float barHeight = 0.03;

    if (uv.y > barY && uv.y < barY + barHeight && uv.x > 0.2 && uv.x < 0.8) {
      float t = (uv.x - 0.2) / 0.6;
      float wavelength = 380.0 + t * 400.0;
      color = wavelengthToRGB(wavelength);

      // Add wavelength labels
      float labelSpacing = 0.12;
      for(float w = 400.0; w <= 700.0; w += 100.0) {
        float labelT = (w - 380.0) / 400.0;
        float labelX = 0.2 + labelT * 0.6;
        if (abs(uv.x - labelX) < 0.001) {
          color = vec3(0.3);
        }
      }
    }

    // Border
    if ((abs(uv.y - barY) < 0.001 || abs(uv.y - (barY + barHeight)) < 0.001) &&
        uv.x > 0.2 && uv.x < 0.8) {
      color = vec3(0.3);
    }
    if ((abs(uv.x - 0.2) < 0.001 || abs(uv.x - 0.8) < 0.001) &&
        uv.y > barY && uv.y < barY + barHeight) {
      color = vec3(0.3);
    }

    return color;
  }

  // Educational labels
  vec3 labelAreas(vec2 uv) {
    vec3 color = vec3(0.0);

    if (showLabels < 0.5) return color;

    // Label boxes (subtle)
    // "White Light" label
    if (uv.x > 0.05 && uv.x < 0.25 && uv.y > 0.55 && uv.y < 0.62) {
      color = vec3(0.98, 0.99, 1.0) * 0.5;
      if (abs(uv.x - 0.05) < 0.001 || abs(uv.x - 0.25) < 0.001 ||
          abs(uv.y - 0.55) < 0.001 || abs(uv.y - 0.62) < 0.001) {
        color = vec3(0.5, 0.7, 1.0);
      }
    }

    // "Prism" label
    if (uv.x > 0.42 && uv.x < 0.62 && uv.y > 0.68 && uv.y < 0.75) {
      color = vec3(0.95, 0.98, 1.0) * 0.5;
      if (abs(uv.x - 0.42) < 0.001 || abs(uv.x - 0.62) < 0.001 ||
          abs(uv.y - 0.68) < 0.001 || abs(uv.y - 0.75) < 0.001) {
        color = vec3(0.5, 0.7, 1.0);
      }
    }

    // "Rainbow Spectrum" label
    if (uv.x > 0.75 && uv.x < 0.95 && uv.y > 0.48 && uv.y < 0.55) {
      color = vec3(1.0, 0.98, 0.95) * 0.5;
      if (abs(uv.x - 0.75) < 0.001 || abs(uv.x - 0.95) < 0.001 ||
          abs(uv.y - 0.48) < 0.001 || abs(uv.y - 0.55) < 0.001) {
        color = vec3(1.0, 0.7, 0.5);
      }
    }

    return color;
  }

  // Interactive highlight with mouse
  vec3 mouseInteraction(vec2 uv) {
    vec2 mouseUv = mouse * 0.5 + 0.5;
    float aspect = resolution.x / resolution.y;
    vec2 correctedUv = vec2(uv.x * aspect, uv.y);
    vec2 correctedMouse = vec2(mouseUv.x * aspect, mouseUv.y);

    float dist = length(correctedUv - correctedMouse);

    // Gentle highlight
    float highlight = smoothstep(0.15, 0.0, dist) * 0.1;

    return vec3(1.0, 1.0, 0.9) * highlight;
  }

  // Soft shadow beneath prism for depth
  float prismShadow(vec2 uv) {
    vec2 shadowCenter = vec2(0.51, 0.48);
    float shadowDist = length(uv - shadowCenter);

    float shadow = smoothstep(0.15, 0.05, shadowDist);
    return shadow * 0.15;
  }

  void main() {
    vec2 uv = vUv;

    // Light mode background
    vec3 finalColor = backgroundColor;

    // Add subtle paper texture
    float noise = fract(sin(dot(uv * 500.0, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += (noise - 0.5) * 0.01;

    // Add subtle vignette (darker edges)
    float vignette = smoothstep(1.2, 0.5, length(uv - 0.5));
    finalColor *= vignette * 0.05 + 0.95;

    // Shadow beneath prism
    finalColor -= prismShadow(uv);

    // White light entering
    finalColor += whiteLightRay(uv) * 0.6;

    // Dispersed rainbow rays exiting
    finalColor += dispersedRays(uv) * 0.9;

    // Prism glass (draw on top)
    vec3 prism = prismGlass(uv);
    finalColor = mix(finalColor, finalColor + prism, clamp(length(prism), 0.0, 1.0));

    // Spectrum bar
    finalColor += spectrumBar(uv);

    // Labels
    finalColor += labelAreas(uv);

    // Mouse interaction
    finalColor += mouseInteraction(uv);

    // Ensure we stay in valid range
    finalColor = clamp(finalColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function LightPrismScene({ mouse, showLabels = true }: LightPrismSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        showLabels: { value: showLabels ? 1.0 : 0.0 },
      },
      vertexShader: lightPrismVertexShader,
      fragmentShader: lightPrismFragmentShader,
      transparent: false,
      depthWrite: false,
    });
  }, [showLabels]);

  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.mouse.value.copy(mouse);
      material.uniforms.showLabels.value = showLabels ? 1.0 : 0.0;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
