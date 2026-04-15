import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  PerspectiveCamera, 
  MeshTransmissionMaterial,
  TorusKnot,
  ContactShadows,
  Sparkles
} from "@react-three/drei";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

function CloudMist() {
  return (
    <Sparkles 
      count={400} 
      scale={20} 
      size={6} 
      speed={0.4} 
      opacity={0.2} 
      color="#0ea5e9" 
    />
  );
}

function GlowingSpiral() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      {/* The main refractive glass tube */}
      <TorusKnot 
        ref={meshRef}
        args={[4, 1.2, 256, 64, 2, 3]} 
        castShadow 
      >
        <MeshTransmissionMaterial 
          backside 
          samples={8} 
          thickness={2} 
          chromaticAberration={0.05} 
          anisotropy={0.3} 
          distortion={0.5} 
          distortionScale={0.5} 
          temporalDistortion={0.1} 
          color="#ffffff"
          attenuationDistance={5}
          attenuationColor="#ffffff"
          roughness={0}
          transmission={1}
          ior={1.5}
        />
      </TorusKnot>

      {/* Internal "Energy Core" Lights */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#0ea5e9" />
      <pointLight position={[2, 2, 2]} intensity={1} color="#f472b6" />
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation based on time and scroll
      groupRef.current.rotation.x = scrollY * 0.0005;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <GlowingSpiral />
      <CloudMist />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[20, 20, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#0ea5e9"
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#f472b6" />
      <pointLight position={[15, 0, 5]} intensity={1.5} color="#0ea5e9" />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <ContactShadows 
          position={[0, -10, 0]} 
          opacity={0.4} 
          scale={40} 
          blur={2.5} 
          far={20} 
        />
      </Suspense>
    </group>
  );
}

export function GlassSpiral() {
  return (
    <div className="w-full h-[600px] md:h-full relative pointer-events-none">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
        <Scene />
      </Canvas>
    </div>
  );
}
