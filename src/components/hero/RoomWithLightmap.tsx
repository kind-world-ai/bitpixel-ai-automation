import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RoomWithLightmap() {
  const roomRef = useRef<THREE.Group>(null);

  // Create gradient texture for GI effect
  const floorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Radial gradient simulating GI light bounce
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#1a2744'); // Center - lighter
    gradient.addColorStop(0.5, '#0f1829'); // Mid
    gradient.addColorStop(1, '#050711'); // Edge - darker

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Create wall gradient texture
  const wallTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Vertical gradient for walls
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0a1220');
    gradient.addColorStop(0.5, '#0f1829');
    gradient.addColorStop(1, '#1a2744');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Subtle animation
  useFrame((state) => {
    if (roomRef.current) {
      // Very subtle ambient movement
      roomRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.01;
    }
  });

  return (
    <group ref={roomRef}>
      {/* Floor with GI-like gradient */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.8}
          metalness={0.2}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Floor grid for depth perception */}
      <gridHelper
        args={[15, 30, '#00d4ff', '#1a2744']}
        position={[0, -1.99, 0]}
        material-opacity={0.15}
        material-transparent
      />

      {/* Back wall with gradient */}
      <mesh position={[0, 3, -7]} receiveShadow>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial
          map={wallTexture}
          roughness={0.9}
          metalness={0.1}
          side={THREE.DoubleSide}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Accent light panels (simulating bounce light sources) */}
      <group>
        {/* Left accent panel */}
        <mesh position={[-4, 0, -3]} rotation={[0, Math.PI / 6, 0]}>
          <planeGeometry args={[1, 3]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Right accent panel */}
        <mesh position={[4, 0, -3]} rotation={[0, -Math.PI / 6, 0]}>
          <planeGeometry args={[1, 3]} />
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Top accent panel */}
        <mesh position={[0, 4, 0]} rotation={[-Math.PI / 3, 0, 0]}>
          <planeGeometry args={[6, 2]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.03}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Volumetric atmosphere particles */}
      <AtmosphereParticles />
    </group>
  );
}

// Floating ambient particles for atmosphere
function AtmosphereParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const brandColors = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#00ffff'),
      new THREE.Color('#ec4899'),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 8 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      sizes[i] = Math.random() * 2 + 0.5;

      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.03,
      transparent: true,
      opacity: 0.3,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  // Gentle floating animation
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.getElapsedTime() + i) * 0.0005;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={particlesRef} geometry={geometry} material={material} />;
}
