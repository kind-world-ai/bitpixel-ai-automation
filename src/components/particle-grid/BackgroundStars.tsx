import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BackgroundStarsProps {
  mouse: THREE.Vector2;
}

const backgroundStarVertexShader = `
  attribute float size;
  attribute float randomVal;
  varying float vOpacity;
  uniform float time;
  uniform vec2 mouse;

  void main() {
    vec3 pos = position;

    pos.x += sin(time * 0.05 + randomVal * 10.0) * 0.5;
    pos.y += cos(time * 0.07 + randomVal * 8.0) * 0.4;
    pos.z += sin(time * 0.03 + randomVal * 12.0) * 0.3;

    vec3 mouseProjectedPos = vec3(mouse.x * 10.0, mouse.y * 10.0, 0.0);
    float distToMouse = length(pos - mouseProjectedPos);
    float mouseRepel = smoothstep(30.0, 5.0, distToMouse);
    pos += normalize(pos - mouseProjectedPos + 0.0001) * mouseRepel * 0.5 * sin(time * 2.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = size * (300.0 / -mvPosition.z);

    vOpacity = (1.0 - smoothstep(50.0, 2.0, length(position))) * (0.5 + randomVal * 0.5);
    vOpacity *= (sin(time * 1.5 + randomVal * 15.0) * 0.2 + 0.8);
  }
`;

const backgroundStarFragmentShader = `
  varying float vOpacity;
  uniform float time;

  void main() {
    vec2 coords = gl_PointCoord - vec2(0.5);
    float dist = length(coords);
    float alpha = smoothstep(0.5, 0.1, dist);

    vec3 color = vec3(0.5, 0.8, 1.0) * (0.8 + sin(time * 0.3) * 0.2);

    gl_FragColor = vec4(color, alpha * vOpacity);
  }
`;

export function BackgroundStars({ mouse }: BackgroundStarsProps) {
  const starsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const numStars = 15000;

    const starPositions = new Float32Array(numStars * 3);
    const starSizes = new Float32Array(numStars);
    const starRandomVals = new Float32Array(numStars);

    for (let i = 0; i < numStars; i++) {
      starPositions[i * 3] = Math.random() * 200 - 100;
      starPositions[i * 3 + 1] = Math.random() * 200 - 100;
      starPositions[i * 3 + 2] = Math.random() * 200 - 100;
      starSizes[i] = Math.random() * 0.8 + 0.2;
      starRandomVals[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    geo.setAttribute('randomVal', new THREE.BufferAttribute(starRandomVals, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: backgroundStarVertexShader,
      fragmentShader: backgroundStarFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.mouse.value.copy(mouse);
    }
  });

  return <points ref={starsRef} geometry={geometry} material={material} />;
}
