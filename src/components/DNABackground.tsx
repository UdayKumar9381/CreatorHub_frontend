import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  PerspectiveCamera, 
  Sparkles,
  Float,
  Stars
} from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate DNA data
  const { points1, points2, rungs } = useMemo(() => {
    const p1 = [];
    const p2 = [];
    const r = [];
    const count = 100; // Increased density
    const radius = 4; // Slightly wider
    const height = 40; // Much taller to cover screen
    const twist = 4; // More twists for complexity

    for (let i = 0; i < count; i++) {
        const y = (i / count) * height - height / 2;
        const angle = (i / count) * Math.PI * 2 * twist;
        
        // Strand 1
        p1.push(new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
        ));
        
        // Strand 2 (180 degrees offset)
        p2.push(new THREE.Vector3(
            Math.cos(angle + Math.PI) * radius,
            y,
            Math.sin(angle + Math.PI) * radius
        ));

        // Rungs every few points
        if (i % 3 === 0) {
            r.push([p1[i], p2[i]]);
        }
    }
    return { points1: p1, points2: p2, rungs: r };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.5;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 3]}> {/* Increased Diagonal Tilt to 45° */}
      {/* Strand 1 Points */}
      {points1.map((p, i) => (
        <mesh key={`p1-${i}`} position={p}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial 
                color="#0ea5e9" 
                emissive="#0ea5e9" 
                emissiveIntensity={4} 
                toneMapped={false} 
            />
        </mesh>
      ))}

      {/* Strand 2 Points */}
      {points2.map((p, i) => (
        <mesh key={`p2-${i}`} position={p}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial 
                color="#f472b6" 
                emissive="#f472b6" 
                emissiveIntensity={4} 
                toneMapped={false} 
            />
        </mesh>
      ))}

      {/* Connecting Rungs */}
      {rungs.map((pair, i) => (
        <mesh key={`rung-${i}`} position={new THREE.Vector3().addVectors(pair[0], pair[1]).multiplyScalar(0.5)}>
            <boxGeometry args={[0.08, 0.08, 8]} />
            <meshStandardMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.1} 
                emissive="#ffffff"
                emissiveIntensity={1}
            />
            {/* Rotate box to align with points */}
            <primitive object={new THREE.Group()} onUpdate={(self: THREE.Group) => self.lookAt(pair[0])} />
        </mesh>
      ))}

      <Sparkles 
        count={150} 
        scale={30} 
        size={3} 
        speed={0.4} 
        opacity={0.8} 
        color="#0ea5e9" 
      />
      <Sparkles 
        count={150} 
        scale={30} 
        size={3} 
        speed={0.4} 
        opacity={0.8} 
        color="#f472b6" 
      />
    </group>
  );
}

export default function DNABackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden pointer-events-none">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={50} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#0ea5e9" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#f472b6" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <DNAHelix />
          </Float>
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="night" />
        </Suspense>

        <color attach="background" args={["#000000"]} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[#050505] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-40" />
    </div>
  );
}
