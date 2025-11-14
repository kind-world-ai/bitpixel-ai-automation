import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RoomWithLightmap } from './RoomWithLightmap';
import { BitPixelCore } from './BitPixelCore';
import { CascadeEmitter } from './CascadeEmitter';
import { OutputLanes } from './OutputLanes';

export function BitPixelScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 1.2, 4], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Background color */}
        <color attach="background" args={['#020308']} />

        {/* Global illumination lighting setup */}
        <ambientLight intensity={0.3} color="#4a90e2" />
        <hemisphereLight intensity={0.5} color="#4a90e2" groundColor="#1a1a2e" />

        {/* Key light with soft shadows */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#00d4ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Fill lights for GI effect */}
        <pointLight position={[-5, 3, -3]} intensity={0.8} color="#a78bfa" distance={15} />
        <pointLight position={[5, 2, -5]} intensity={0.6} color="#ec4899" distance={12} />

        {/* Rim light */}
        <spotLight
          position={[0, 10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#00ffff"
        />

        {/* Fog for depth */}
        <fog attach="fog" args={['#020308', 8, 20]} />

        {/* Scene components */}
        <RoomWithLightmap />
        <BitPixelCore mousePosition={mousePosition} />
        <CascadeEmitter side="left" />
        <CascadeEmitter side="right" />
        <OutputLanes />

        {/* Camera controls with damping for smooth movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
