import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CascadeEmitterProps {
  side: 'left' | 'right';
}

// Custom vertex shader for particle motion
const vertexShader = `
  attribute float aSize;
  attribute float aSeed;
  attribute float aLifetime;
  attribute vec3 aVelocity;

  varying float vLifetime;
  varying vec3 vColor;

  uniform float uTime;
  uniform vec3 uAttractor;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;

  // Simplex noise function for turbulence
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vLifetime = aLifetime;

    // Calculate particle age
    float age = mod(uTime * 0.5 + aSeed * 10.0, 1.0);

    // Initial position based on lifetime
    vec3 pos = position + aVelocity * age * 3.0;

    // Add turbulence using noise
    vec3 noisePos = pos * 0.5 + uTime * 0.2;
    vec3 turbulence = vec3(
      snoise(noisePos),
      snoise(noisePos + vec3(100.0)),
      snoise(noisePos + vec3(200.0))
    ) * 0.3;

    pos += turbulence;

    // Attraction to core
    vec3 toAttractor = uAttractor - pos;
    float dist = length(toAttractor);

    if (dist > 0.5) {
      vec3 attraction = normalize(toAttractor) * (1.0 - age) * 0.5;
      pos += attraction * age;
    }

    // Color interpolation
    vColor = mix(uColorStart, uColorEnd, age);

    // Size based on lifetime
    float size = aSize * (1.0 - age * 0.5) * (sin(age * 3.14159) + 0.5);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Custom fragment shader for particle appearance
const fragmentShader = `
  varying float vLifetime;
  varying vec3 vColor;

  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    if (dist > 0.5) discard;

    // Soft edge falloff
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    // Fade based on lifetime
    alpha *= vLifetime;

    // Glow effect
    float glow = 1.0 - dist * 2.0;
    vec3 finalColor = vColor + glow * 0.3;

    gl_FragColor = vec4(finalColor, alpha * 0.8);
  }
`;

export function CascadeEmitter({ side }: CascadeEmitterProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  // Setup particle system
  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    // Positions
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const seeds = new Float32Array(particleCount);
    const lifetimes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Starting position based on side
    const startX = side === 'left' ? -2 : 2;
    const startY = 2;
    const startZ = -1;

    for (let i = 0; i < particleCount; i++) {
      // Starting positions with some spread
      positions[i * 3] = startX + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = startY + Math.random() * 1;
      positions[i * 3 + 2] = startZ + (Math.random() - 0.5) * 0.5;

      // Random sizes
      sizes[i] = Math.random() * 8 + 2;

      // Random seed for timing offset
      seeds[i] = Math.random();

      // Lifetime (opacity control)
      lifetimes[i] = 1.0;

      // Initial velocity towards center and down
      velocities[i * 3] = (Math.random() - 0.5) * 0.2 - (side === 'left' ? -0.3 : 0.3);
      velocities[i * 3 + 1] = -0.5 - Math.random() * 0.3;
      velocities[i * 3 + 2] = Math.random() * 0.2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aLifetime', new THREE.BufferAttribute(lifetimes, 1));
    geo.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));

    // Custom shader material
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAttractor: { value: new THREE.Vector3(0, 0, 0) },
        uColorStart: { value: new THREE.Color(side === 'left' ? '#00d4ff' : '#ec4899') },
        uColorEnd: { value: new THREE.Color(side === 'left' ? '#a78bfa' : '#00ffff') },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [side]);

  // Animation
  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return <points ref={particlesRef} geometry={geometry} material={material} />;
}
