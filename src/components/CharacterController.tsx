import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Character from "@/components/Character";
import { useEffect, useRef } from "react";
import { Vector3, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useKeyboardControls } from "@react-three/drei";
import { degToRad, MathUtils } from "three/src/math/MathUtils.js";

const normalizeAngle = (angle: number) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle -= 2 * Math.PI;
  return angle;
};

const lerpAngle = (start: number, end: number, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return MathUtils.lerp(start, end, t);
};

export default function CharacterController() {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 2.8, min: 0.1, max: 4, step: 0.1 },
      RUN_SPEED: { value: 4.6, min: 0.2, max: 12, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(5),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1)
      }
    }
  );
  const rb = useRef<React.ComponentRef<typeof RigidBody>>(null);
  const container = useRef<Group>(null);
  const character = useRef<Group>(null);

  const rotationTarget = useRef(0);
  const characterRotationTarget = useRef(0);

  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);
  const { FOV } = useControls("Camera", {
    FOV: { value: 75, min: 30, max: 120, step: 1 }
  });

  useEffect(() => {
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
    camera.fov = FOV;
    camera.far = 1000;
    camera.updateProjectionMatrix();

    if (rb.current) {
      const vel = rb.current.linvel();
      const movement = {
        x: 0,
        z: 0
      };
      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }
      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (isClicking.current) {
      }

      if (get().left) {
        movement.x = 1;
      }
      if (get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
      }

      if (character.current) {
        character.current.rotation.y = lerpAngle(
          character.current.rotation.y,
          characterRotationTarget.current,
          0.1
        );
      }

      rb.current.setLinvel(vel, true);
    }

    //CAMERA

    if (container.current) {
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );
    }

    if (cameraPosition.current) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.3);
    }

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.4);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody colliders={false} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={5} />
        <group ref={cameraPosition} position-y={1} position-z={-2} />
        <group ref={character} />
        <Character
          scale={1}
          position-y={-3.5}
          position-z={0.5}
          animation={"WEP_Idle"}
        />
      </group>
      <CapsuleCollider args={[1, 1]} />
    </RigidBody>
  );
}
