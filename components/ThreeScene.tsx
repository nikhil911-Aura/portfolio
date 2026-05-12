"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// New palette: violet #a855f7 · orange #f97316 · cyan #22d3ee · indigo #6366f1

// ─── Galaxy particle system ───────────────────────────────────────────────
function GalaxyParticles() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 7000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color("#a855f7"), // violet
      new THREE.Color("#a855f7"), // violet (weighted)
      new THREE.Color("#f97316"), // orange
      new THREE.Color("#22d3ee"), // cyan
      new THREE.Color("#6366f1"), // indigo
      new THREE.Color("#c084fc"), // light violet
    ];

    for (let i = 0; i < COUNT; i++) {
      const arm = i % 3;
      const armAngle = (arm * Math.PI * 2) / 3;
      const r = Math.pow(Math.random(), 0.55) * 9;
      const spin = r * 0.55;
      const scatter = (Math.random() - 0.5) * (0.4 + r * 0.08);

      pos[i * 3]     = Math.cos(armAngle + spin) * r + scatter;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      pos[i * 3 + 2] = Math.sin(armAngle + spin) * r + scatter - 2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.035 + pointer.x * 0.07;
    ref.current.rotation.x = pointer.y * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.88}
      />
    </Points>
  );
}

// ─── Central torus knot ───────────────────────────────────────────────────
function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.11 + pointer.y * 0.12;
    ref.current.rotation.y = t * 0.16 + pointer.x * 0.12;
    // Subtle breathing scale
    const s = 1 + Math.sin(t * 0.7) * 0.04;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <torusKnotGeometry args={[1.05, 0.32, 160, 16, 2, 3]} />
      <meshStandardMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.5}
        emissive="#a855f7"
        emissiveIntensity={0.9}
      />
    </mesh>
  );
}

// ─── Floating geometric shape ─────────────────────────────────────────────
type ShapeType = "icosa" | "octa" | "dodeca" | "tetra";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  scale: number;
  rotSpeed: [number, number, number];
  type: ShapeType;
  bobOffset: number;
}

function FloatingShape({ position, color, scale, rotSpeed, type, bobOffset }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.55 + bobOffset) * 0.4;
    ref.current.rotation.x += rotSpeed[0] * 0.008;
    ref.current.rotation.y += rotSpeed[1] * 0.008;
    ref.current.rotation.z += rotSpeed[2] * 0.006;
  });

  return (
    <mesh ref={ref} position={position}>
      {type === "icosa"  && <icosahedronGeometry  args={[scale, 1]} />}
      {type === "octa"   && <octahedronGeometry   args={[scale, 0]} />}
      {type === "dodeca" && <dodecahedronGeometry args={[scale, 0]} />}
      {type === "tetra"  && <tetrahedronGeometry  args={[scale, 0]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.45}
        emissive={color}
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

// ─── Animated perspective grid ────────────────────────────────────────────
function PerspectiveGrid() {
  const ref = useRef<THREE.Mesh>(null);
  const mat  = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.opacity = 0.038 + Math.sin(clock.getElapsedTime() * 0.35) * 0.012;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[50, 50, 45, 45]} />
      <meshBasicMaterial ref={mat} color="#a855f7" wireframe transparent opacity={0.038} />
    </mesh>
  );
}

// ─── Ring orbiting the torus knot ─────────────────────────────────────────
function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.25;
    ref.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.18) * 0.2;
  });

  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <torusGeometry args={[2.2, 0.012, 8, 120]} />
      <meshStandardMaterial
        color="#f97316"
        transparent
        opacity={0.55}
        emissive="#f97316"
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

// ─── Reactive camera rig ──────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const lx = useRef(0);
  const ly = useRef(0);

  useFrame(({ pointer }) => {
    lx.current += (pointer.x * 0.6  - lx.current) * 0.04;
    ly.current += (pointer.y * 0.25 - ly.current) * 0.04;
    camera.position.x = lx.current;
    camera.position.y = ly.current;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Scene ────────────────────────────────────────────────────────────────
export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 9], fov: 58 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 8, 6]}   intensity={3}   color="#a855f7" />
      <pointLight position={[-8, -6, -8]} intensity={2.5} color="#f97316" />
      <pointLight position={[0,  12, 0]}  intensity={1.5} color="#22d3ee" />
      <pointLight position={[4, -4, 4]}   intensity={1}   color="#6366f1" />

      {/* Main 3D objects */}
      <GalaxyParticles />
      <TorusKnot />
      <OrbitRing />
      <PerspectiveGrid />

      {/* Satellite floating shapes */}
      <FloatingShape position={[ 3.8,  1.8, -3.5]} color="#f97316" scale={0.52} rotSpeed={[0.8, 1.3, 0.4]} type="icosa"  bobOffset={0}   />
      <FloatingShape position={[-3.2,  1.2, -2.5]} color="#22d3ee" scale={0.42} rotSpeed={[1.1, 0.7, 1.0]} type="octa"   bobOffset={1.5} />
      <FloatingShape position={[ 2.8, -2.2, -4.5]} color="#6366f1" scale={0.58} rotSpeed={[0.6, 1.1, 0.7]} type="dodeca" bobOffset={3.0} />
      <FloatingShape position={[-2.2, -1.8, -2.0]} color="#a855f7" scale={0.38} rotSpeed={[1.3, 0.6, 0.9]} type="icosa"  bobOffset={2.0} />
      <FloatingShape position={[ 0.8,  3.2, -5.0]} color="#f97316" scale={0.48} rotSpeed={[0.7, 0.9, 0.5]} type="tetra"  bobOffset={4.5} />
      <FloatingShape position={[-4.2, -0.8, -5.5]} color="#22d3ee" scale={0.65} rotSpeed={[0.5, 0.8, 0.8]} type="dodeca" bobOffset={1.0} />
      <FloatingShape position={[ 4.5, -2.5, -2.0]} color="#c084fc" scale={0.35} rotSpeed={[1.0, 1.2, 0.6]} type="octa"   bobOffset={5.5} />

      <CameraRig />
    </Canvas>
  );
}
