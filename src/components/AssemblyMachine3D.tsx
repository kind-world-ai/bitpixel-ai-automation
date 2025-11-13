import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, MeshTransmissionMaterial, Float } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Conveyor Belt Component
function ConveyorBelt() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Animate UV offset to create moving belt effect
      materialRef.current.map!.offset.x = (clock.getElapsedTime() * 0.1) % 1;
    }
  });

  const beltTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Create belt pattern
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);

    return texture;
  }, []);

  return (
    <group position={[0, -1, 0]}>
      {/* Main conveyor belt */}
      <mesh ref={meshRef} receiveShadow>
        <boxGeometry args={[12, 0.3, 2]} />
        <meshStandardMaterial
          ref={materialRef}
          map={beltTexture}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Belt supports */}
      {[-4, 0, 4].map((x, i) => (
        <mesh key={i} position={[x, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.7, 8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Rollers */}
      {[-5, -2.5, 0, 2.5, 5].map((x, i) => (
        <group key={i} position={[x, -0.85, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
            <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// CNC Machine Frame
function CNCFrame() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main frame structure */}
      <group position={[0, 1, 0]}>
        {/* Vertical posts */}
        {[[-3, 0, 1], [-3, 0, -1], [3, 0, 1], [3, 0, -1]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.2, 3, 0.2]} />
            <meshStandardMaterial color="#1a4d7a" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Top horizontal beams */}
        <mesh position={[0, 1.5, 1]} castShadow>
          <boxGeometry args={[6.4, 0.2, 0.2]} />
          <meshStandardMaterial color="#1a4d7a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.5, -1]} castShadow>
          <boxGeometry args={[6.4, 0.2, 0.2]} />
          <meshStandardMaterial color="#1a4d7a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Processing chamber glass */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[4, 2, 1.8]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={0.5}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            transmission={0.95}
            opacity={0.8}
            color="#4080ff"
          />
        </mesh>
      </group>

      {/* Laser/Tool Head Assembly */}
      <LaserHead />
    </group>
  );
}

// Animated Laser/Tool Head
function LaserHead() {
  const groupRef = useRef<THREE.Group>(null);
  const laserRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>>(null);
  const [isActive, setIsActive] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Move laser head back and forth
      groupRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) * 2;

      // Activate laser at certain positions
      const shouldBeActive = Math.abs(groupRef.current.position.x) < 0.5;
      setIsActive(shouldBeActive);
    }

    if (laserRef.current && isActive && laserRef.current.material) {
      (laserRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2 + Math.sin(clock.getElapsedTime() * 10) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Tool head housing */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.6, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Laser beam */}
      {isActive && (
        <mesh ref={laserRef} position={[0, -0.8, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.05, 1.2, 8]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Focusing lens */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial
          color="#88ccff"
          metalness={1}
          roughness={0}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Mounting bracket */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.4]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Point light for laser */}
      {isActive && (
        <pointLight
          position={[0, -1, 0]}
          color="#00ffff"
          intensity={2}
          distance={3}
          decay={2}
        />
      )}
    </group>
  );
}

// Input Item (raw material)
function InputItem({ position, color, id }: { position: [number, number, number]; color: string; id: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 2;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} castShadow>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Output Card (finished product)
function OutputCard({ position, rotation, color, title }: { position: [number, number, number]; rotation: [number, number, number]; color: string; title: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Card base */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Colored header bar */}
      <mesh position={[0, 0.5, 0.03]} castShadow>
        <boxGeometry args={[0.8, 0.15, 0.02]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Content lines */}
      {[-0.2, -0.35, -0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0.03]}>
          <boxGeometry args={[0.6, 0.03, 0.01]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
      ))}

      {/* Glow effect */}
      <pointLight position={[0, 0, 0.2]} color={color} intensity={0.5} distance={1} />
    </group>
  );
}

// Particle System for processing effects
function ProcessingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current && particlesRef.current.geometry) {
      const positionAttr = particlesRef.current.geometry.getAttribute('position');
      if (positionAttr) {
        const positions = positionAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3 + 1] += Math.sin(clock.getElapsedTime() * 2 + i) * 0.01;
          positions[i3] += Math.cos(clock.getElapsedTime() + i) * 0.005;

          // Reset particles that go too far
          if (positions[i3 + 1] > 1) positions[i3 + 1] = -1;
          if (positions[i3] > 2) positions[i3] = -2;
        }

        positionAttr.needsUpdate = true;
      }
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(particles.positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(particles.colors, 3));
    return geo;
  }, [particles]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main 3D Scene Component
function Scene() {
  const [items, setItems] = useState<Array<{ id: number; position: [number, number, number]; color: string }>>([]);
  const [outputs, setOutputs] = useState<Array<{ id: number; position: [number, number, number]; rotation: [number, number, number]; color: string; title: string }>>([]);
  const itemIdRef = useRef(0);

  const inputColors = ['#ff4444', '#9b59b6', '#ff8800', '#3498db', '#2ecc71', '#00d4ff'];
  const outputColors = ['#3b82f6', '#a855f7', '#ef4444'];

  useEffect(() => {
    // Add input items periodically
    const inputInterval = setInterval(() => {
      const newItem = {
        id: itemIdRef.current++,
        position: [-6, 0, 0] as [number, number, number],
        color: inputColors[Math.floor(Math.random() * inputColors.length)]
      };
      setItems(prev => [...prev, newItem]);

      // Remove old items
      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));

        // Add output card
        const output = {
          id: itemIdRef.current++,
          position: [5, 0.5, Math.random() * 0.5 - 0.25] as [number, number, number],
          rotation: [0, Math.PI / 4, 0] as [number, number, number],
          color: outputColors[Math.floor(Math.random() * outputColors.length)],
          title: 'UI Card'
        };
        setOutputs(prev => [...prev, output]);

        // Remove output after some time
        setTimeout(() => {
          setOutputs(prev => prev.filter(o => o.id !== output.id));
        }, 5000);
      }, 3000);
    }, 2000);

    return () => clearInterval(inputInterval);
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#ff8800" />
      <pointLight position={[5, 3, 0]} intensity={0.5} color="#00ffff" />

      {/* Environment */}
      <Environment preset="city" />

      {/* 3D Objects */}
      <ConveyorBelt />
      <CNCFrame />
      <ProcessingParticles />

      {/* Dynamic Items */}
      {items.map(item => (
        <InputItem key={item.id} position={item.position} color={item.color} id={item.id} />
      ))}

      {outputs.map(output => (
        <OutputCard
          key={output.id}
          position={output.position}
          rotation={output.rotation}
          color={output.color}
          title={output.title}
        />
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.2} />
      </mesh>
    </>
  );
}

// Main Export Component
export default function AssemblyMachine3D() {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900">
      <Canvas shadows camera={{ position: [8, 4, 8], fov: 50 }}>
        <Scene />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <EffectComposer>
          <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} intensity={1.5} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
