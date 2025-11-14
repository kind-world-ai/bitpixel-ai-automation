import React, { useState, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ParticleSystem } from './ParticleSystem';
import { InteractiveGrid } from './InteractiveGrid';
import { RotatingRings } from './RotatingRings';
import { BackgroundStars } from './BackgroundStars';

// Mouse tracker component
function MouseTracker({ onMouseUpdate }: { onMouseUpdate: (mouse: THREE.Vector2, influence: number) => void }) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const lastMouseRef = useRef(new THREE.Vector2(0, 0));
  const mouseSpeedRef = useRef(0);

  useFrame((state, delta) => {
    const dx = mouseRef.current.x - lastMouseRef.current.x;
    const dy = mouseRef.current.y - lastMouseRef.current.y;
    mouseSpeedRef.current = THREE.MathUtils.lerp(
      mouseSpeedRef.current,
      Math.sqrt(dx * dx + dy * dy) * 10,
      0.15
    );

    lastMouseRef.current.copy(mouseRef.current);

    // Calculate mouse influence
    let influence = mouseSpeedRef.current * 2.5;
    influence = THREE.MathUtils.lerp(influence, 0, delta * 2.0);
    const currentInfluence = Math.min(influence, 1.8);

    onMouseUpdate(mouseRef.current, currentInfluence);

    // Decay mouse speed
    mouseSpeedRef.current = THREE.MathUtils.lerp(mouseSpeedRef.current, 0, delta * 5.0);
  });

  const handlePointerMove = useCallback((event: PointerEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  React.useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  return null;
}

// Camera controller
function CameraController() {
  const { camera } = useThree();
  const cameraDistanceRef = useRef(7);

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    cameraDistanceRef.current += event.deltaY * 0.005;
    cameraDistanceRef.current = THREE.MathUtils.clamp(cameraDistanceRef.current, 4, 12);
  }, []);

  React.useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  useFrame(() => {
    camera.position.z += (cameraDistanceRef.current - camera.position.z) * 0.05;
  });

  return null;
}

export function ParticleGridScene() {
  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));
  const [mouseInfluence, setMouseInfluence] = useState(0);

  const handleMouseUpdate = useCallback((newMouse: THREE.Vector2, influence: number) => {
    setMouse(newMouse.clone());
    setMouseInfluence(influence);
  }, []);

  return (
    <div className="w-full h-screen relative bg-black">
      {/* Info overlay */}
      <div className="absolute top-5 left-5 z-10 text-white/50 text-sm bg-[rgba(0,10,30,0.4)] px-4 py-2 rounded-lg backdrop-blur-md border border-blue-500/20">
        Move mouse to interact • Scroll to zoom
      </div>

      <Canvas
        camera={{ position: [0, 0, 7], fov: 75, near: 0.1, far: 150 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        {/* Background */}
        <color attach="background" args={['#000000']} />

        {/* Fog */}
        <fog attach="fog" args={['#000000', 0, 150]} color="#000000" near={0} far={150} />

        {/* Scene components */}
        <BackgroundStars mouse={mouse} />
        <InteractiveGrid mouse={mouse} mouseInfluence={mouseInfluence} />
        <ParticleSystem mouse={mouse} mouseInfluence={mouseInfluence} />
        <RotatingRings mouseInfluence={mouseInfluence} />

        {/* Controllers */}
        <MouseTracker onMouseUpdate={handleMouseUpdate} />
        <CameraController />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={0.2}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.95}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
