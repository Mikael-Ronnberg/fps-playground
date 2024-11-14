"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, KeyboardControls } from "@react-three/drei";
import Map from "@/components/Map";
import { Physics } from "@react-three/rapier";
import CharacterController from "@/components/CharacterController";
import { Leva } from "leva";

const keyboardMap = [
  { name: "forward", keys: ["w", "ArrowUp"] },
  { name: "backward", keys: ["s", "ArrowDown"] },
  { name: "left", keys: ["a", "ArrowLeft"] },
  { name: "right", keys: ["d", "ArrowRight"] },
  { name: "run", keys: ["Shift"] },
  { name: "jump", keys: [" "] }
];

export default function Scene() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Leva />
      <Canvas camera={{ position: [0, 0, 2] }} style={{ background: "black" }}>
        {/* <OrbitControls /> */}

        <Environment preset="sunset" />
        <directionalLight
          intensity={0.65}
          castShadow
          position={[-15, 10, 15]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00005}></directionalLight>
        <Physics debug>
          <Map />
          <CharacterController />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
