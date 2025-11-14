import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DigitalDataFlowShader } from './DigitalDataFlowShader';
import { BinaryRainShader } from './BinaryRainShader';
import { PixelWaveShader } from './PixelWaveShader';

export type ShaderType = 'dataflow' | 'binaryrain' | 'pixelwave';

interface BitPixelShaderBackgroundProps {
  shaderType?: ShaderType;
  className?: string;
  enableMouseTracking?: boolean;
  enableScrollTracking?: boolean;
  opacity?: number;
  zIndex?: number;
}

// Mouse and scroll tracker
function SceneController({
  onUpdate,
  enableScroll,
}: {
  onUpdate: (mouse: THREE.Vector2, scroll: number) => void;
  enableScroll: boolean;
}) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleScroll = useCallback(() => {
    scrollRef.current = window.scrollY / 1000;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    if (enableScroll) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (enableScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleMouseMove, handleScroll, enableScroll]);

  useFrame(() => {
    onUpdate(mouseRef.current, scrollRef.current);
  });

  return null;
}

export function BitPixelShaderBackground({
  shaderType = 'dataflow',
  className = '',
  enableMouseTracking = true,
  enableScrollTracking = true,
  opacity = 1,
  zIndex = -1,
}: BitPixelShaderBackgroundProps) {
  const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));
  const [scrollY, setScrollY] = useState(0);

  const handleUpdate = useCallback(
    (newMouse: THREE.Vector2, newScroll: number) => {
      if (enableMouseTracking) {
        setMouse(newMouse.clone());
      }
      if (enableScrollTracking) {
        setScrollY(newScroll);
      }
    },
    [enableMouseTracking, enableScrollTracking]
  );

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex, opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 10 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#000000']} />

        {/* Render selected shader */}
        {shaderType === 'dataflow' && (
          <DigitalDataFlowShader mouse={mouse} scrollY={scrollY} />
        )}
        {shaderType === 'binaryrain' && (
          <BinaryRainShader mouse={mouse} scrollY={scrollY} />
        )}
        {shaderType === 'pixelwave' && (
          <PixelWaveShader mouse={mouse} scrollY={scrollY} />
        )}

        {/* Controller */}
        <SceneController onUpdate={handleUpdate} enableScroll={enableScrollTracking} />
      </Canvas>
    </div>
  );
}
