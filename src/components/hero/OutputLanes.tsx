import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export function OutputLanes() {
  const lanesRef = useRef<THREE.Group>(null);

  // Lane configuration
  const lanes = useMemo(
    () => [
      {
        position: new THREE.Vector3(-1.2, -1.5, 0),
        color: new THREE.Color('#00d4ff'), // Blue
        label: 'AI Agents',
        labelPosition: new THREE.Vector3(-1.2, -1.8, 0),
      },
      {
        position: new THREE.Vector3(0, -1.5, 0),
        color: new THREE.Color('#a78bfa'), // Purple
        label: 'Automation',
        labelPosition: new THREE.Vector3(0, -1.8, 0),
      },
      {
        position: new THREE.Vector3(1.2, -1.5, 0),
        color: new THREE.Color('#00ffff'), // Cyan
        label: 'ERP/CRM',
        labelPosition: new THREE.Vector3(1.2, -1.8, 0),
      },
    ],
    []
  );

  // Animate glow intensity
  useFrame((state) => {
    if (lanesRef.current) {
      lanesRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          const pulse = Math.sin(state.clock.getElapsedTime() * 2 + index * 0.5) * 0.3 + 0.7;
          child.material.opacity = pulse * 0.6;
        }
      });
    }
  });

  return (
    <group ref={lanesRef}>
      {lanes.map((lane, index) => (
        <group key={index}>
          {/* Lane path - thin rectangle with gradient effect */}
          <mesh position={lane.position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 2]} />
            <meshBasicMaterial
              color={lane.color}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Glow line effect */}
          <mesh position={lane.position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.15, 2]} />
            <meshBasicMaterial
              color={lane.color}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Lane particles - small flowing dots */}
          <LaneParticles position={lane.position} color={lane.color} laneIndex={index} />

          {/* 3D Text Label */}
          <Text
            position={lane.labelPosition}
            fontSize={0.12}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {lane.label}
          </Text>
        </group>
      ))}
    </group>
  );
}

// Small particles flowing along each lane
function LaneParticles({
  position,
  color,
  laneIndex,
}: {
  position: THREE.Vector3;
  color: THREE.Color;
  laneIndex: number;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 20;

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      sizes[i] = Math.random() * 3 + 1;
      offsets[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('offset', new THREE.BufferAttribute(offsets, 1));

    const mat = new THREE.PointsMaterial({
      color,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, [color]);

  // Animate particles flowing along the lane
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const offsets = particlesRef.current.geometry.attributes.offset.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const offset = offsets[i];
        const speed = 0.5 + laneIndex * 0.1;
        const z = ((state.clock.getElapsedTime() * speed + offset * 10) % 2) - 1;

        positions[i * 3 + 2] = z;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={particlesRef} position={position} geometry={geometry} material={material} />;
}
