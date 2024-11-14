interface BoxProps {
  width?: number;
  height?: number;
  depth?: number;
  color?: string | number;
  position?: [number, number, number];
}

export default function Box({
  width = 1,
  height = 1,
  depth = 1,
  color = "42e6f5",
  position = [1, 1, 1],
  ...props
}: BoxProps) {
  return (
    <mesh {...props} position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
