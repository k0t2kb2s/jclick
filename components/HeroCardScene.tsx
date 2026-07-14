"use client";

import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

function CardMesh() {
  return (
    <group>
      <RoundedBox args={[5.6, 3.5, 0.22]} radius={0.24} smoothness={8}>
        <meshPhysicalMaterial
          color="#0D120F"
          roughness={0.26}
          metalness={0.55}
          clearcoat={1}
          clearcoatRoughness={0.14}
          envMapIntensity={1.15}
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

/* Процедурное окружение из световых панелей — «студийные» блики на
   клиркоте карты без загрузки внешних HDR-файлов. */
function StudioLights() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer
        intensity={3}
        position={[0, 4, 6]}
        rotation-x={Math.PI / 6}
        scale={[12, 3, 1]}
        color="#EAFFD0"
      />
      <Lightformer
        intensity={1.3}
        position={[-6, -2, 4]}
        scale={[6, 2, 1]}
        color="#B5F23C"
      />
      <Lightformer
        intensity={0.9}
        position={[7, 1, 2]}
        rotation-y={-Math.PI / 3}
        scale={[4, 8, 1]}
        color="#FFFFFF"
      />
    </Environment>
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
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 6]} intensity={2.2} color="#E7FFD0" />
      <pointLight position={[-3, -2, 3]} intensity={3} color="#B5F23C" />
      <Suspense fallback={null}>
        <CardMesh />
        <StudioLights />
      </Suspense>
    </Canvas>
  );
}
