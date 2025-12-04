import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Stylized FUSO Truck
function FusoTruck() {
  const truckRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (truckRef.current) {
      truckRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      truckRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={truckRef} scale={0.55} position={[0, -0.3, 0]} rotation={[0.1, -0.4, 0]}>
        {/* Cabin */}
        <mesh position={[-1.2, 0.6, 0]}>
          <boxGeometry args={[1.4, 1.4, 1.6]} />
          <meshStandardMaterial color="#E60012" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Cabin roof */}
        <mesh position={[-1.2, 1.4, 0]}>
          <boxGeometry args={[1.3, 0.15, 1.5]} />
          <meshStandardMaterial color="#CC0010" metalness={0.85} roughness={0.2} />
        </mesh>
        
        {/* Windshield */}
        <mesh position={[-0.45, 0.7, 0]}>
          <boxGeometry args={[0.08, 0.9, 1.3]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.1} transparent opacity={0.8} />
        </mesh>
        
        {/* Side windows */}
        <mesh position={[-1.2, 0.7, 0.82]}>
          <boxGeometry args={[1, 0.7, 0.05]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.1} transparent opacity={0.7} />
        </mesh>
        <mesh position={[-1.2, 0.7, -0.82]}>
          <boxGeometry args={[1, 0.7, 0.05]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.1} transparent opacity={0.7} />
        </mesh>
        
        {/* Grille */}
        <mesh position={[-0.42, 0.1, 0]}>
          <boxGeometry args={[0.1, 0.6, 1.4]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Headlights */}
        <mesh position={[-0.42, 0.2, 0.5]}>
          <boxGeometry args={[0.12, 0.25, 0.3]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-0.42, 0.2, -0.5]}>
          <boxGeometry args={[0.12, 0.25, 0.3]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        
        {/* Cargo bed frame */}
        <mesh position={[1.3, 0.3, 0]}>
          <boxGeometry args={[3.2, 0.15, 1.7]} />
          <meshStandardMaterial color="#444444" metalness={0.85} roughness={0.2} />
        </mesh>
        
        {/* Cargo container */}
        <mesh position={[1.3, 1.1, 0]}>
          <boxGeometry args={[3, 1.4, 1.6]} />
          <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Cargo container accent stripe */}
        <mesh position={[1.3, 1.1, 0.81]}>
          <boxGeometry args={[2.8, 0.2, 0.02]} />
          <meshStandardMaterial color="#E60012" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1.3, 1.1, -0.81]}>
          <boxGeometry args={[2.8, 0.2, 0.02]} />
          <meshStandardMaterial color="#E60012" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Chassis */}
        <mesh position={[0.5, -0.25, 0]}>
          <boxGeometry args={[4.5, 0.2, 0.8]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Front wheels */}
        <group position={[-1, -0.5, 0.9]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 24]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.7} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.32, 16]} />
            <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        <group position={[-1, -0.5, -0.9]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 24]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.7} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.32, 16]} />
            <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        
        {/* Rear wheels (dual) */}
        <group position={[1.8, -0.5, 1]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.4, 24]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.7} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.42, 16]} />
            <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        <group position={[1.8, -0.5, -1]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.4, 24]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.7} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.42, 16]} />
            <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
        
        {/* Exhaust pipe */}
        <mesh position={[-1.8, 0.8, 0.7]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 12]} />
          <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Side mirrors */}
        <mesh position={[-0.6, 0.8, 1]}>
          <boxGeometry args={[0.15, 0.2, 0.25]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.6, 0.8, -1]}>
          <boxGeometry args={[0.15, 0.2, 0.25]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating gears around the truck
function FloatingGear({ position, scale = 1, speed = 0.5 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const gearRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gearRef.current) {
      gearRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.6}>
      <group ref={gearRef} position={position} scale={scale}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.15, 24]} />
          <meshStandardMaterial color="#E60012" metalness={0.85} roughness={0.2} transparent opacity={0.8} />
        </mesh>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.6]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.15, 0.15, 0.2]} />
              <meshStandardMaterial color="#E60012" metalness={0.85} roughness={0.2} transparent opacity={0.8} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// Floating bolts
function FloatingBolts() {
  const boltsRef = useRef<THREE.Group>(null);

  const bolts = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 6; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 6,
        z: -2 - Math.random() * 3,
        scale: 0.08 + Math.random() * 0.1,
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (boltsRef.current) {
      boltsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={boltsRef}>
      {bolts.map((bolt, i) => (
        <Float key={i} speed={1.5 + i * 0.2} floatIntensity={0.5}>
          <mesh position={[bolt.x, bolt.y, bolt.z]} scale={bolt.scale}>
            <cylinderGeometry args={[1, 1, 0.6, 6]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#E60012" : "#666666"}
              metalness={0.9}
              roughness={0.15}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Road lines beneath the truck
function RoadLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.position.x = ((state.clock.elapsedTime * 2) % 4) - 2;
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshStandardMaterial color="#E60012" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#E60012" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
        
        {/* Main FUSO Truck */}
        <FusoTruck />
        
        {/* Floating gears */}
        <FloatingGear position={[-3.5, 1.5, -2]} scale={0.5} speed={0.4} />
        <FloatingGear position={[3.8, -1, -1.5]} scale={0.35} speed={-0.6} />
        <FloatingGear position={[-4, -1.5, -1]} scale={0.3} speed={0.5} />
        
        {/* Floating bolts */}
        <FloatingBolts />
        
        {/* Road lines */}
        <RoadLines />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
