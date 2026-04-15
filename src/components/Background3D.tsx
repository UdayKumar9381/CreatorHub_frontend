import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Sphere, Float, Environment, ContactShadows, Sparkles, Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function GlassBubble({ position, speed, distort, radius, samples = 10 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
        <MeshTransmissionMaterial
          backside
          samples={samples}
          thickness={0.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={distort}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#e0f2fe"
        />
      </Sphere>
    </Float>
  );
}

function MovingBubbles() {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth parallax follow
      const targetX = (mouse.x * viewport.width) / 15;
      const targetY = (mouse.y * viewport.height) / 15;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      
      // Subtle rotation based on mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.1, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <GlassBubble position={[-4, 2, -2]} speed={1} distort={0.2} radius={1.5} samples={8} />
      <GlassBubble position={[3, -2, -1]} speed={1.2} distort={0.3} radius={2} samples={8} />
      <GlassBubble position={[-1, -3, 2]} speed={0.8} distort={0.1} radius={1.2} samples={8} />
      <GlassBubble position={[5, 3, -4]} speed={1.5} distort={0.4} radius={2.5} samples={6} />
      <GlassBubble position={[-6, -1, -3]} speed={0.5} distort={0.2} radius={1.8} samples={6} />
      
      {/* Decorative colored blobs for light refraction */}
      <Float speed={2} floatIntensity={4}>
        <Sphere args={[0.8, 32, 32]} position={[2, 2, -2]}>
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} toneMapped={false} />
        </Sphere>
      </Float>
      <Float speed={3} floatIntensity={5}>
        <Sphere args={[0.5, 32, 32]} position={[-3, -2, -1]}>
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={2} toneMapped={false} />
        </Sphere>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#f8fafc']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#sky-blue" />
      
      <Suspense fallback={null}>
        <MovingBubbles />
        
        {/* Magical Elements */}
        <Sparkles count={50} scale={15} size={2} speed={0.3} opacity={0.5} color="#0ea5e9" />
        <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        <Environment preset="night" />
        <ContactShadows 
          position={[0, -5, 0]}
          resolution={1024} 
          scale={30} 
          blur={3} 
          opacity={0.1} 
          far={10} 
          color="#000000" 
        />
      </Suspense>
    </>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      {/* Soft overlay for content readability */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
    </div>
  );
}
