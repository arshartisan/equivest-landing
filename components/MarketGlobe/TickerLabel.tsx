"use client";

import { useRef } from "react";
import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Stock } from "./types";
import { sentimentOf } from "./types";

type Props = {
  stock: Stock;
  position: THREE.Vector3;
};

const tmpWorld = new THREE.Vector3();
const tmpCam = new THREE.Vector3();

export default function TickerLabel({ stock, position }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const tickerMatRef = useRef<THREE.Material | null>(null);
  const priceMatRef = useRef<THREE.Material | null>(null);

  const sentiment = sentimentOf(stock);
  const color = sentiment === "up" ? "#3ddc84" : sentiment === "down" ? "#ff4d4d" : "#A0AEC0";

  // Push the label slightly outward from the vertex so it floats off the surface.
  const offset = position.clone().normalize().multiplyScalar(0.35);
  const labelPos = position.clone().add(offset);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    groupRef.current.getWorldPosition(tmpWorld);
    // Dot of label's world-space outward direction vs vector from origin to camera.
    // Higher = label is on the side facing the camera → more visible.
    // Wide range keeps side-of-globe labels readable (matches the reference look).
    tmpCam.copy(camera.position).normalize();
    const dot = tmpWorld.clone().normalize().dot(tmpCam);
    const opacity = THREE.MathUtils.smoothstep(dot, -0.25, 0.35);

    if (tickerMatRef.current) {
      tickerMatRef.current.opacity = opacity;
      tickerMatRef.current.transparent = true;
      tickerMatRef.current.depthWrite = false;
    }
    if (priceMatRef.current) {
      priceMatRef.current.opacity = opacity * 0.85;
      priceMatRef.current.transparent = true;
      priceMatRef.current.depthWrite = false;
    }
    groupRef.current.visible = opacity > 0.02;
  });

  return (
    <group ref={groupRef} position={labelPos}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 0.07, 0]}
          fontSize={0.11}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.006}
          outlineColor="#05080C"
          outlineOpacity={0.9}
          fontWeight={700}
        >
          {stock.ticker}
          <meshBasicMaterial
            ref={(m) => {
              tickerMatRef.current = m;
            }}
            attach="material"
            color={color}
            transparent
          />
        </Text>
        <Text
          position={[0, -0.075, 0]}
          fontSize={0.085}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#05080C"
          outlineOpacity={0.9}
        >
          {stock.price.toFixed(2)}
          <meshBasicMaterial
            ref={(m) => {
              priceMatRef.current = m;
            }}
            attach="material"
            color="#FFFFFF"
            transparent
          />
        </Text>
      </Billboard>
    </group>
  );
}
