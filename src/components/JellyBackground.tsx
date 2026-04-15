import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Environment, ContactShadows, SpotLight } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function JellyBubble({ position, speed, distort, radius, color }: { position: [number, number, number], speed: number, distort: number, radius: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={meshRef} args={[radius, 128, 128]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed * 1.5}
          distort={distort}
          radius={radius}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

function MovingJelly() {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Very smooth and slightly "bouncy" parallax
      const targetX = (mouse.x * viewport.width) / 10;
      const targetY = (mouse.y * viewport.height) / 10;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.03);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.03);
      
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * 0.2, 0.03);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Pink family */}
      <JellyBubble position={[-3, 2, 1]} color="#f472b6" speed={1.8} distort={0.6} radius={0.8} />
      <JellyBubble position={[-4, -1, -1]} color="#ec4899" speed={1.2} distort={0.5} radius={1.1} />
      <JellyBubble position={[-2, -3.5, 2]} color="#db2777" speed={2} distort={0.4} radius={0.7} />
      
      {/* Blue/Indigo family */}
      <JellyBubble position={[3.5, -1.5, -2]} color="#818cf8" speed={1.4} distort={0.5} radius={1.2} />
      <JellyBubble position={[2.5, 3.5, -1]} color="#6366f1" speed={1.6} distort={0.6} radius={0.9} />
      <JellyBubble position={[5, 1, -4]} color="#4f46e5" speed={2.2} distort={0.5} radius={1.0} />
      
      {/* Cyan/Teal family */}
      <JellyBubble position={[-0.5, -3.5, 2.5]} color="#2dd4bf" speed={2.5} distort={0.4} radius={0.6} />
      <JellyBubble position={[-5.5, 2.5, -2]} color="#0d9488" speed={1.1} distort={0.6} radius={0.9} />
      
      {/* Yellow/Amber family */}
      <JellyBubble position={[4, 3, -3]} color="#fbbf24" speed={1.2} distort={0.7} radius={1.3} />
      <JellyBubble position={[1, -4, -1]} color="#f59e0b" speed={2.1} distort={0.8} radius={0.8} />
      
      {/* Background accents */}
      <JellyBubble position={[7, -2, -6]} color="#818cf8" speed={0.8} distort={0.3} radius={1.5} />
      <JellyBubble position={[-8, 4, -8]} color="#f472b6" speed={0.7} distort={0.4} radius={2.0} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <SpotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        castShadow
        color="#ffffff"
      />
      
      <Suspense fallback={null}>
        <MovingJelly />
        <Environment preset="studio" />
        <ContactShadows 
          position={[0, -6, 0]} 
          resolution={1024} 
          scale={40} 
          blur={2.5} 
          opacity={0.15} 
          far={10} 
          color="#000000" 
        />
      </Suspense>
    </>
  );
}

export function JellyBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-white overflow-hidden pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
