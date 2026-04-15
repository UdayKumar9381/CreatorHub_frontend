import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function LowPolyTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  // Geometry configuration
  const { geometry, positions } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 30, 20, 15);
    const pos = geo.attributes.position.array as Float32Array;
    
    // Randomize initial vertex heights for the "Low Poly" look
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 2] = (Math.random() - 0.5) * 2;
    }
    
    return { geometry: geo, positions: pos };
  }, []);

  if (!initialPositions.current) {
    initialPositions.current = new Float32Array(positions);
  }

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttribute = meshRef.current.geometry.attributes.position;
    const currentPos = posAttribute.array as Float32Array;
    const initialPos = initialPositions.current!;

    for (let i = 0; i < currentPos.length; i += 3) {
      // Create a "breathing" wave effect using sin/cos
      const x = initialPos[i];
      const y = initialPos[i + 1];
      const offset = Math.sin(time * 0.5 + x * 0.2 + y * 0.3) * 0.4;
      currentPos[i + 2] = initialPos[i + 2] + offset;
    }
    
    posAttribute.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      rotation={[-Math.PI / 3, 0, Math.PI / 8]}
      position={[0, 2, -5]}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial 
        color="#ffffff" 
        flatShading={true} 
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      
      {/* Dynamic Lighting for faceted depth */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#ffffff"
      />
      <pointLight 
        position={[-10, 5, 10]} 
        intensity={5} 
        color="#0ea5e9" // Intense Sky Blue accent highlight
      />
      <pointLight 
        position={[5, -5, 5]} 
        intensity={3} 
        color="#f472b6" // Vibrant pink accent
      />

      <Suspense fallback={null}>
        <LowPolyTerrain />
        <Environment preset="night" />
      </Suspense>
    </>
  );
}

export function LowPolyBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#000000] overflow-hidden pointer-events-none">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <Scene />
      </Canvas>
      {/* Very faint overlay to keep text readable without hiding the animation */}
      <div className="absolute inset-0 bg-[#000000]/20" />
    </div>
  );
}
