import Box from "@/components/Box";
import { RigidBody } from "@react-three/rapier";

export default function Map() {
  return (
    <>
      <RigidBody type="fixed" colliders="trimesh">
        <Box height={5} width={0.5} depth={10} position={[1, 1, 4]} />
        <Box height={5} width={0.5} depth={10} position={[-10, 1, 4]} />
        <Box height={5} width={11} depth={0.5} position={[-4.5, 1, -1]} />
        <Box height={5} width={0.5} depth={10} position={[-10, 1, 4]} />
        <Box height={0.5} width={11} depth={11} position={[-4.5, -1.5, 4]} />
      </RigidBody>
    </>
  );
}
