import { useThree } from "@react-three/fiber";
import { ReactNode, useEffect } from "react";

interface HandAndWeaponOverlayProps {
  children: ReactNode;
}

export default function HandAndWeaponOverlay({
  children
}: HandAndWeaponOverlayProps) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    camera.layers.enable(1);
    return () => {
      camera.layers.disable(1);
    };
  }, [camera]);

  useEffect(() => {
    const render = () => {
      gl.autoClear = false;
      gl.clearDepth();
      gl.render(scene, camera);
    };

    gl.setAnimationLoop(render);

    return () => gl.setAnimationLoop(null);
  }, [gl, scene, camera]);

  return <group layers={2}>{children}</group>;
}
