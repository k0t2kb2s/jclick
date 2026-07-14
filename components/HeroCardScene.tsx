"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function CardMesh() {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    elapsed.current += delta;
    group.current.rotation.z =
      -0.045 + Math.sin(elapsed.current * 0.55) * 0.01;
    group.current.position.y = Math.sin(elapsed.current * 0.7) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.05, -0.07, -0.045]}>
      <RoundedBox args={[5.6, 3.5, 0.22]} radius={0.24} smoothness={8}>
        <meshPhysicalMaterial
          color="#111814"
          roughness={0.36}
          metalness={0.28}
          clearcoat={0.7}
          clearcoatRoughness={0.18}
        />
      </RoundedBox>
      <RoundedBox
        args={[5.64, 3.54, 0.225]}
        radius={0.25}
        smoothness={8}
        position={[0, 0, -0.01]}
      >
        <meshBasicMaterial
          color="#B5F23C"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.118]}>
        <planeGeometry args={[5.25, 3.15]} />
        <meshBasicMaterial color="#0D120F" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export default function HeroCardScene() {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 6.5], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 6]} intensity={2.4} color="#E7FFD0" />
      <pointLight position={[-3, -2, 3]} intensity={3.5} color="#B5F23C" />
      <Suspense fallback={null}>
        <CardMesh />
      </Suspense>
    </Canvas>
  );
}
