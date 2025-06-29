"use client";
import { Canvas } from "@react-three/fiber";
import { Computer} from "./Computer";
import { OrbitControls } from "@react-three/drei";

export default function ComputerCanvas(props: any) {
  return (
    <Canvas style={{ width: "100%", height: "100vh", background: "#222" }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Computer {...props} />
      
    </Canvas>
  );
} 