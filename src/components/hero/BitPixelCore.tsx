import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BitPixelCoreProps {
  mousePosition?: { x: number; y: number };
}

export function BitPixelCore({ mousePosition = { x: 0, y: 0 } }: BitPixelCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cubesRef = useRef<THREE.InstancedMesh>(null);

  // Create cube cluster configuration
  const cubeData = useMemo(() => {
    const data: { position: THREE.Vector3; scale: number; colorIndex: number }[] = [];
    const gridSize = 3;
    const spacing = 0.35;
    const offset = ((gridSize - 1) * spacing) / 2;

    // BitPixel brand colors
    const colors = [
      new THREE.Color('#00d4ff'), // Electric blue
      new THREE.Color('#00ffff'), // Cyan
      new THREE.Color('#a78bfa'), // Purple
      new THREE.Color('#ec4899'), // Magenta
    ];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // Skip some cubes for a more interesting shape
          if (Math.random() > 0.7) continue;

          data.push({
            position: new THREE.Vector3(
              x * spacing - offset,
              y * spacing - offset,
              z * spacing - offset
            ),
            scale: 0.8 + Math.random() * 0.4,
            colorIndex: Math.floor(Math.random() * colors.length),
          });
        }
      }
    }

    return { data, colors };
  }, []);

  // Set up instanced mesh
  React.useEffect(() => {
    if (!cubesRef.current) return;

    const tempObject = new THREE.Object3D();
    const tempColor = new THREE.Color();

    cubeData.data.forEach((cube, i) => {
      tempObject.position.copy(cube.position);
      tempObject.scale.setScalar(cube.scale * 0.25);
      tempObject.updateMatrix();
      cubesRef.current!.setMatrixAt(i, tempObject.matrix);

      // Set color for each instance
      tempColor.copy(cubeData.colors[cube.colorIndex]);
      cubesRef.current!.setColorAt(i, tempColor);
    });

    cubesRef.current.instanceMatrix.needsUpdate = true;
    if (cubesRef.current.instanceColor) {
      cubesRef.current.instanceColor.needsUpdate = true;
    }
  }, [cubeData]);

  // Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;

      // Mouse parallax
      if (mousePosition) {
        groupRef.current.rotation.y += mousePosition.x * 0.1;
        groupRef.current.rotation.x += mousePosition.y * 0.1;
      }
    }

    // Animate individual cubes with slight pulsing
    if (cubesRef.current) {
      const tempObject = new THREE.Object3D();

      cubeData.data.forEach((cube, i) => {
        tempObject.position.copy(cube.position);

        // Pulsing effect
        const pulse = Math.sin(state.clock.getElapsedTime() * 2 + i * 0.1) * 0.05 + 1;
        tempObject.scale.setScalar(cube.scale * 0.25 * pulse);

        tempObject.updateMatrix();
        cubesRef.current!.setMatrixAt(i, tempObject.matrix);
      });

      cubesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Instanced cubes */}
      <instancedMesh
        ref={cubesRef}
        args={[undefined, undefined, cubeData.data.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          metalness={0.9}
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Central glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
