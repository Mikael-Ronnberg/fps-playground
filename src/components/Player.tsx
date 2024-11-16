import usePersonControls from "@/hooks/usePersonControls";
import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { MutableRefObject, useRef } from "react";

const MOVE_SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function Player() {
  const playerRef = useRef<RAPIER.RigidBody>(null);
  const { forward, backward, left, right, jump } = usePersonControls();

  const rapier = useRapier();

  useFrame((state) => {
    if (!playerRef.current) return;

    const velocity = playerRef.current.linvel();

    // Räkna ut riktningar baserade på tangenttryckningar
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyEuler(state.camera.rotation);

    playerRef.current.wakeUp();
    playerRef.current.setLinvel(
      {
        x: direction.x,
        y: velocity.y,
        z: direction.z
      },
      true
    );

    const world = rapier.world;
    const ray = world.castRay(
      new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 })
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.5;

    if (jump && grounded) doJump();

    // Uppdatera kamerans position efter spelarens position
    const { x, z, y } = playerRef.current.translation();
    state.camera.position.set(x, y, z);
  });

  const doJump = () => {
    if (playerRef.current) {
      playerRef.current.setLinvel({ x: 0, y: 5, z: 0 });
    }
  };

  return (
    <RigidBody
      position={[0, 1, -2]}
      mass={1}
      lockRotations
      ref={playerRef}
      colliders="hull">
      <mesh>
        <capsuleGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}
