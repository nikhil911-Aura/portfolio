"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const c = new Float32Array(count * 3);
    const colorA = new THREE.Color("#9333ea");
    const colorB = new THREE.Color("#06b6d4");
    const colorC = new THREE.Color("#3b82f6");
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      let color: THREE.Color;
      if (t < 0.4) color = colorA;
      else if (t < 0.7) color = colorB;
      else color = colorC;
      c[i * 3] = color.r;
      c[i * 3 + 1] = color.g;
      c[i * 3 + 2] = color.b;
    }
    return c;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.04 + pointer.y * 0.1;
    ref.current.rotation.y = t * 0.06 + pointer.x * 0.1;
    mouse.current = { x: pointer.x, y: pointer.y };
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function GridPlane() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.05 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial
        color="#9333ea"
        wireframe
        transparent
        opacity={0.05}
      />
    </mesh>
  );
}

function FloatingOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.3;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[scale, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#9333ea" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <ParticleField />
      <GridPlane />
      <FloatingOrb position={[2, 1, -2]} color="#9333ea" scale={0.6} />
      <FloatingOrb position={[-2.5, -1, -1]} color="#06b6d4" scale={0.4} />
      <FloatingOrb position={[1.5, -2, -3]} color="#3b82f6" scale={0.5} />
    </Canvas>
  );
}
