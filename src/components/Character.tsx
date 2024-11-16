import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";

interface CharacterProps {
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
  position?: [number, number, number];
  animation?: string;
}

export default function Character({ animation, ...props }: CharacterProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("./../p9_manny_fps_animations.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions[animation as string]) {
      actions[animation as string]?.reset().fadeIn(0.24).play();
    }
    return () => actions?.[animation as string]?.fadeOut(0.24);
  }, [animation, actions]);

  console.log(animations);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.029}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Armature_277">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <group name="SK_Manny_Arms_276_correction">
                    <group name="SK_Manny_Arms_276" />
                  </group>
                  <group name="P9_278_correction">
                    <group name="P9_278" />
                  </group>
                  <skinnedMesh
                    name="Object_284"
                    geometry={nodes.Object_284.geometry}
                    material={materials.MI_Manny_01}
                    skeleton={nodes.Object_284.skeleton}
                  />
                  <skinnedMesh
                    name="Object_285"
                    geometry={nodes.Object_285.geometry}
                    material={materials.MI_Manny_02}
                    skeleton={nodes.Object_285.skeleton}
                  />
                  <skinnedMesh
                    name="Object_288"
                    geometry={nodes.Object_288.geometry}
                    material={materials.p220}
                    skeleton={nodes.Object_288.skeleton}
                    layers={1}
                  />
                  <skinnedMesh
                    name="Object_289"
                    geometry={nodes.Object_289.geometry}
                    material={materials.p220_mag}
                    skeleton={nodes.Object_289.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./../p9_manny_fps_animations.glb");
