import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RotatingRingsProps {
  mouseInfluence: number;
}

const ringVertexShader = `
  varying vec2 vUv;
  varying float vDistance;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDistance = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const ringFragmentShader = `
  varying vec2 vUv;
  varying float vDistance;
  uniform float time;
  uniform vec3 color;
  uniform float mouseInfluence;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    float angle = vUv.x * 6.28318;
    float pulse = sin(angle * 8.0 - time * 3.0) * 0.5 + 0.5;
    float trail = sin(angle * 4.0 + time * 2.0) * 0.5 + 0.5;

    float flicker = random(vec2(angle * 10.0, time * 5.0)) * 0.5 + 0.5;

    float intensity = pulse * 0.6 + trail * 0.4;
    intensity *= flicker * (1.0 + mouseInfluence * 0.5);

    float alpha = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    alpha *= intensity * 0.7;
    alpha *= smoothstep(45.0, 15.0, vDistance);

    vec3 finalColor = color * (0.8 + pulse * 0.5 + sin(time * 0.8) * 0.2);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function RotatingRings({ mouseInfluence }: RotatingRingsProps) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = elapsedTime * 0.2;
      ring1Ref.current.rotation.z = Math.sin(elapsedTime * 0.3) * 0.2;

      const mat = ring1Ref.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        mat.uniforms.time.value = elapsedTime;
        mat.uniforms.mouseInfluence.value = mouseInfluence;
      }
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -elapsedTime * 0.15;
      ring2Ref.current.rotation.x = -Math.PI / 3 + Math.cos(elapsedTime * 0.25) * 0.15;

      const mat = ring2Ref.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        mat.uniforms.time.value = elapsedTime;
        mat.uniforms.mouseInfluence.value = mouseInfluence;
      }
    }
  });

  const ring1Material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0.3, 0.8, 1.0) },
      mouseInfluence: { value: 0.0 },
    },
    vertexShader: ringVertexShader,
    fragmentShader: ringFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const ring2Material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0.8, 0.3, 1.0) },
      mouseInfluence: { value: 0.0 },
    },
    vertexShader: ringVertexShader,
    fragmentShader: ringFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  return (
    <>
      {/* Ring 1 */}
      <mesh ref={ring1Ref} material={ring1Material} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[4, 0.015, 8, 100]} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} material={ring2Material} rotation={[-Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[5, 0.012, 8, 100]} />
      </mesh>
    </>
  );
}
