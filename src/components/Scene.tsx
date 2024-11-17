"use client";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  KeyboardControls,
  OrbitControls,
  PointerLockControls,
  Sky
} from "@react-three/drei";
import Map from "@/components/Map";
import { Physics } from "@react-three/rapier";
import CharacterController from "@/components/CharacterController";
import { Leva } from "leva";
import Ground from "@/components/Ground";
import Player from "./Player";

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
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas
          camera={{ position: [0, 5, 0] }}
          style={{ background: "black" }}>
          {/* <OrbitControls /> */}
          <PointerLockControls />
          <Environment preset="sunset" />
          <Sky />
          <directionalLight
            intensity={1}
            castShadow={true}
            shadow-bias={-0.00015}
            shadow-radius={4}
            shadow-blur={10}
            shadow-mapSize={[2048, 2048]}
            position={[85.0, 80.0, 70.0]}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
          />
          <Physics debug>
            <Map />
            <Ground />
            <CharacterController />
          </Physics>
        </Canvas>
      </KeyboardControls>
      <Leva />
    </>
  );
}
