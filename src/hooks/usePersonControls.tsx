import { useEffect, useState } from "react";

export default function usePersonControls() {
  type Movement = {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    jump: boolean;
  };

  const keys: Record<string, keyof Movement> = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump"
  };

  const moveFieldByKey = (key: string): keyof Movement | undefined => keys[key];

  const [movement, setMovement] = useState<Movement>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  });

  const setMovementStatus = (
    key: keyof Movement | undefined,
    status: boolean
  ) => {
    if (!key) return;
    setMovement((m) => ({ ...m, [key]: status }));
  };

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      setMovementStatus(moveFieldByKey(ev.code), true);
    };
    const handleKeyUp = (ev: KeyboardEvent) => {
      setMovementStatus(moveFieldByKey(ev.code), false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
}
