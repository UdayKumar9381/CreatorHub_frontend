import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Environment, 
  ContactShadows, 
  PerspectiveCamera, 
  RoundedBox,
  Points,
  PointMaterial,
  Text,
  Sphere
} from "@react-three/drei";
import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

// Floating Node Particles for background depth
function Particles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Individual Dashboard Element (Card/Widget)
function FloatingCard({ position, size, color, floatIntensity = 1, speed = 1, children }: any) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={floatIntensity} position={position}>
      <RoundedBox args={size} radius={0.3} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} transparent opacity={color === '#ffffff' ? 0.9 : 1} />
      </RoundedBox>
      {children}
    </Float>
  );
}

// Sidebar widget with icons
function SidebarWidget() {
  return (
    <FloatingCard position={[-4, 0, 0]} size={[2.2, 7, 0.4]} color="#0ea5e9" speed={1.2} floatIntensity={0.5}>
       {/* Sidebar Icon Nuggets */}
       {[1, 0, -1].map((y, i) => (
         <mesh key={i} position={[0, y * 1.5 + 1.5, 0.3]}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
         </mesh>
       ))}
       <mesh position={[0, -2, 0.3]}>
          <boxGeometry args={[1, 0.4, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
       </mesh>
    </FloatingCard>
  );
}

// Cloud/Mist effect at the bottom
function CloudMist() {
  return (
    <group position={[0, -6, -5]}>
      {[...Array(10)].map((_, i) => (
        <Sphere key={i} args={[3, 32, 32]} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 10]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.1} roughness={1} />
        </Sphere>
      ))}
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
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 + scrollY * 0.0005;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, -Math.PI / 6, 0]}>
      <Particles />
      <CloudMist />

      {/* Main Glass Workspace Card */}
      <FloatingCard position={[0, 0, -1]} size={[8, 5, 0.2]} color="#ffffff" speed={0.8}>
         {/* Internal Content (Sky Blue Widget) */}
         <RoundedBox args={[3, 2, 0.1]} radius={0.1} smoothness={4} position={[-1.5, 0.5, 0.2]}>
            <meshStandardMaterial color="#0ea5e9" />
         </RoundedBox>
         {/* Pink Status Dot */}
         <mesh position={[0.5, 0.5, 0.2]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.5} />
         </mesh>
      </FloatingCard>

      {/* Sidebar Component */}
      <SidebarWidget />

      {/* Floating Action Button (Pink) */}
      <FloatingCard position={[-2, -3.5, 1]} size={[2.5, 0.8, 0.3]} color="#f472b6" speed={1.5}>
         <Text position={[0, 0, 0.2]} fontSize={0.2} color="white" font="https://fonts.gstatic.com/s/robotomonospace/v9/L0pkDF64PPuqiAgxSreMAtM6KyeS.woff" anchorX="center" anchorY="middle">
            Generate
         </Text>
      </FloatingCard>

      {/* Decorative Spheres (like the sample image) */}
      <Float speed={4} rotationIntensity={2} position={[5, 4, 2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0} metalness={0.1} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1} position={[6.5, 3.5, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0} metalness={0.1} />
        </mesh>
      </Float>

      {/* Extra Pink Widget Card */}
      <FloatingCard position={[3, -2.5, 2]} size={[3.5, 2.2, 0.3]} color="#f472b6" speed={2} floatIntensity={1.5}>
          <mesh position={[-0.8, 0.5, 0.2]}>
            <boxGeometry args={[1.5, 0.1, 0.05]} />
            <meshStandardMaterial color="white" />
          </mesh>
      </FloatingCard>

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <pointLight position={[-10, 5, 10]} intensity={1.5} color="#0ea5e9" />
      <pointLight position={[5, -10, -5]} intensity={1} color="#f472b6" />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <ContactShadows position={[0, -6, 0]} opacity={0.15} scale={40} blur={3} far={10} />
      </Suspense>
    </group>
  );
}

export function IsometricWorkspace() {
  return (
    <div className="w-full h-[600px] md:h-[900px] relative pointer-events-none">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={30} />
        <Scene />
      </Canvas>
    </div>
  );
}
