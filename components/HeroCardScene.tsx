"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

function CardMesh() {
  return (
    <group>
      <RoundedBox args={[5.6, 3.5, 0.22]} radius={0.24} smoothness={8}>
        <meshPhysicalMaterial
          color="#0D120F"
          roughness={0.3}
          metalness={0.32}
          clearcoat={0.86}
          clearcoatRoughness={0.12}
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
          opacity={0.22}
          side={THREE.BackSide}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.118]}>
        <planeGeometry args={[5.25, 3.15]} />
        <meshBasicMaterial color="#080D0A" transparent opacity={0.34} />
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
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 6]} intensity={2.8} color="#E7FFD0" />
      <pointLight position={[-3, -2, 3]} intensity={3.8} color="#B5F23C" />
      <Suspense fallback={null}>
        <CardMesh />
      </Suspense>
    </Canvas>
  );
}
