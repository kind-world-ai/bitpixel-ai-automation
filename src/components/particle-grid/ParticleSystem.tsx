import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  mouse: THREE.Vector2;
  mouseInfluence: number;
}

const particleVertexShader = `
  attribute float size;
  attribute float randomVal;
  attribute float phase;
  varying vec3 vPosition;
  varying float vIntensity;
  varying float vRandom;
  varying float vPhase;
  uniform float time;
  uniform vec2 mouse;
  uniform float mouseInfluence;

  // Simplex noise function
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
    vRandom = randomVal;
    vPhase = phase;
    vec3 pos = position;

    // Rotation animations
    float angle1 = time * 0.12 + randomVal * 3.14;
    float angle2 = time * 0.08 - randomVal * 2.0;

    mat2 rotationMatrix1 = mat2(cos(angle1), -sin(angle1), sin(angle1), cos(angle1));
    mat2 rotationMatrix2 = mat2(cos(angle2), -sin(angle2), sin(angle2), cos(angle2));

    pos.xz = rotationMatrix1 * pos.xz;
    pos.xy = rotationMatrix2 * pos.xy;

    // Wave deformations
    float wave1 = sin(pos.x * 1.8 + time * 0.9 + phase) * cos(pos.y * 1.6 + time * 0.7 + phase) * sin(pos.z * 1.7 + time * 0.8 + phase) * 0.4;
    float wave2 = sin(pos.x * 3.2 - time * 1.2) * cos(pos.y * 3.0 - time * 1.0) * sin(pos.z * 3.1 - time * 1.1) * 0.2;
    float wave3 = sin(length(pos) * 2.5 - time * 1.5 + phase * 2.0) * 0.15;
    float wave4 = cos(pos.x * 4.0 + time * 0.8 + randomVal * 5.0) * sin(pos.z * 3.5 - time * 0.9) * 0.1;

    // Mouse interaction
    vec3 mouseProjectedPos = vec3(mouse.x * 5.0, mouse.y * 5.0, 0.0);
    float dist = length(pos - mouseProjectedPos);

    float ripple = sin(dist * 3.5 - time * 6.5) * 1.0;
    ripple *= smoothstep(4.5, 0.2, dist);
    ripple += cos(dist * 2.2 - time * 4.0) * 0.4 * smoothstep(3.0, 0.5, dist);

    vec3 pullDir = normalize(mouseProjectedPos - pos + 0.0001);
    float pullStrengthBase = smoothstep(4.0, 0.0, dist) * 0.8;
    float oscillation = sin(time * 2.0 + dist * 2.0) * 0.5 + 0.5;
    float pullStrength = mix(pullStrengthBase * 0.6, -pullStrengthBase * 1.0, smoothstep(0.3, 1.0, oscillation));

    float breathe = sin(time * 0.5 + randomVal * 6.28) * 0.08 + 1.0;
    pos *= breathe;

    pos += normal * (wave1 + wave2 + wave3 + wave4) * 0.2;
    pos += normal * ripple * 0.8;
    pos += pullDir * pullStrength;

    vPosition = pos;

    float waveIntensity = abs(wave1) * 1.5 + abs(wave2) * 1.0 + abs(wave3) * 2.0 + abs(wave4) * 1.8;
    float rippleIntensity = abs(ripple) * 1.2;
    float distanceIntensity = (1.0 - smoothstep(0.0, 4.0, length(position))) * 0.6;

    vIntensity = clamp(waveIntensity + rippleIntensity + distanceIntensity, 0.0, 1.0);

    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;

    float sizeFactor = (180.0 / -modelViewPosition.z);
    gl_PointSize = size * sizeFactor * (0.3 + vIntensity * 0.7);
    gl_PointSize += 2.0 + mouseInfluence * 3.5;
    gl_PointSize *= (0.7 + randomVal * 0.6);
    gl_PointSize *= (1.0 + sin(time * 1.5 + phase * 6.28) * 0.2);
    gl_PointSize = max(0.5, gl_PointSize);
  }
`;

const particleFragmentShader = `
  varying vec3 vPosition;
  varying float vIntensity;
  varying float vRandom;
  varying float vPhase;
  uniform float time;
  uniform vec2 mouse;

  vec3 colorDeepBlue = vec3(0.02, 0.08, 0.25);
  vec3 colorElectricBlue = vec3(0.15, 0.45, 0.9);
  vec3 colorCyan = vec3(0.3, 0.9, 1.0);
  vec3 colorPurple = vec3(0.6, 0.2, 0.9);
  vec3 colorMagenta = vec3(1.0, 0.3, 0.7);
  vec3 colorWhite = vec3(1.0, 1.0, 1.0);

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    float circleSoftness = smoothstep(0.5, 0.2, dist);

    float timeFactor = sin(time * 0.4 + vPhase * 6.28) * 0.5 + 0.5;
    float timeFactor2 = cos(time * 0.3 - vRandom * 3.14) * 0.5 + 0.5;

    vec3 layer1 = mix(colorDeepBlue, colorElectricBlue, vIntensity * 1.3);
    vec3 layer2 = mix(colorElectricBlue, colorCyan, timeFactor);
    vec3 layer3 = mix(colorPurple, colorMagenta, timeFactor2);

    vec3 baseColor = mix(layer1, layer2, smoothstep(0.2, 0.6, vIntensity));
    baseColor = mix(baseColor, layer3, smoothstep(0.5, 0.9, vIntensity) * 0.6);

    vec3 mouseProjectedPos = vec3(mouse.x * 5.0, mouse.y * 5.0, 0.0);
    float distToMouse = length(vPosition - mouseProjectedPos);
    float proximityInfluence = smoothstep(4.0, 0.5, distToMouse);

    float highlightFactor = smoothstep(0.5, 1.0, vIntensity * (1.0 + proximityInfluence * 0.1));
    vec3 highlightColor = mix(baseColor, colorWhite, highlightFactor * 0.8);

    float glow = pow(vIntensity * (0.3 + proximityInfluence * 0.1), 2.5);
    vec3 glowColor = mix(colorCyan, colorMagenta, sin(time * 0.5 + vPhase) * 0.5 + 0.5);
    vec3 finalColor = highlightColor + glowColor * glow * 0.2;

    float core = smoothstep(0.5, 0.1, dist) * (0.4 + vIntensity * 0.4);
    finalColor += colorWhite * core * 0.1;

    float distToCenter = length(vPosition);
    float alpha = smoothstep(3.5, 1.0, distToCenter);
    alpha *= circleSoftness;
    alpha *= smoothstep(0.02, 0.4, vIntensity + proximityInfluence * 0.2) * 0.9 + 0.1;

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function ParticleSystem({ mouse, mouseInfluence }: ParticleSystemProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.5, 8);
    const numParticles = geo.attributes.position.count;

    const sizes = new Float32Array(numParticles);
    const randomVals = new Float32Array(numParticles);
    const phases = new Float32Array(numParticles);

    for (let i = 0; i < numParticles; i++) {
      sizes[i] = Math.random() * 0.7 + 0.3;
      randomVals[i] = Math.random();
      phases[i] = Math.random();
    }

    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('randomVal', new THREE.BufferAttribute(randomVals, 1));
    geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        mouseInfluence: { value: 0.0 },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime;
      material.uniforms.mouse.value.copy(mouse);
      material.uniforms.mouseInfluence.value = mouseInfluence;
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 + Math.cos(state.clock.elapsedTime * 0.2) * 0.08;
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={particlesRef} geometry={geometry} material={material} />
    </group>
  );
}
