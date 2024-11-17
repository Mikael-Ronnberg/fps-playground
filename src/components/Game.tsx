import { useGLTF } from "@react-three/drei";
import useOctree from "./useOctree";
import Player from "./Player";
import useOctreeHelper from "./useOctreeHelper";
import { useRef } from "react";
import SphereCollider from "./SphereCollider";
import Ball from "./Ball";
import * as Constants from "./Constants";

export default function Physics() {
  const { nodes, scene } = useGLTF("/scene-transformed.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  const colliders = useRef([]);

  return (
    <>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne007.geometry}
          material={nodes.Suzanne007.material}
          position={[1.74, 1.04, 24.97]}
        />
      </group>

      <Player
        ballCount={Constants.ballCount}
        octree={octree}
        colliders={colliders.current}
      />
    </>
  );
}
