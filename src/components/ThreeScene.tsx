import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Main gear/wheel - represents automotive industry
function GearWheel() {
  const gearRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gearRef.current) {
      gearRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  const teeth = useMemo(() => {
    const toothCount = 12;
    const toothPositions = [];
    for (let i = 0; i < toothCount; i++) {
      const angle = (i / toothCount) * Math.PI * 2;
      toothPositions.push({
        x: Math.cos(angle) * 1.3,
        y: Math.sin(angle) * 1.3,
        rotation: angle,
      });
    }
    return toothPositions;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={gearRef}>
        {/* Main gear body */}
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
          <meshStandardMaterial
            color="#E60012"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Center hub */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Gear teeth */}
        {teeth.map((tooth, i) => (
          <mesh
            key={i}
            position={[tooth.x, 0, tooth.y]}
            rotation={[0, -tooth.rotation, 0]}
          >
            <boxGeometry args={[0.25, 0.3, 0.35]} />
            <meshStandardMaterial
              color="#E60012"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
        {/* Spokes */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={`spoke-${i}`}
            rotation={[Math.PI / 2, 0, (i / 6) * Math.PI * 2]}
            position={[0, 0, 0]}
          >
            <boxGeometry args={[0.15, 1.8, 0.15]} />
            <meshStandardMaterial
              color="#444444"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Secondary smaller gear
function SmallGear({ position, speed = 0.5 }: { position: [number, number, number]; speed?: number }) {
  const gearRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gearRef.current) {
      gearRef.current.rotation.z = -state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={gearRef} position={position} scale={0.4}>
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 0.2, 24]} />
        <meshStandardMaterial
          color="#666666"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.9, 0, Math.sin(angle) * 0.9]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.2, 0.2, 0.25]} />
            <meshStandardMaterial
              color="#666666"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating bolts/nuts
function FloatingBolts() {
  const boltsRef = useRef<THREE.Group>(null);

  const bolts = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 8; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 4,
        scale: 0.1 + Math.random() * 0.15,
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (boltsRef.current) {
      boltsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={boltsRef}>
      {bolts.map((bolt, i) => (
        <Float key={i} speed={2 + i * 0.3} floatIntensity={0.8}>
          <mesh position={[bolt.x, bolt.y, bolt.z]} scale={bolt.scale}>
            <cylinderGeometry args={[1, 1, 0.8, 6]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#E60012" : "#888888"}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Piston-like elements
function PistonElement({ position }: { position: [number, number, number] }) {
  const pistonRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pistonRef.current) {
      pistonRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group ref={pistonRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 16]} />
        <meshStandardMaterial
          color="#555555"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
        <meshStandardMaterial
          color="#E60012"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Circular track/ring representing wheels
function WheelRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.08, 16, 64]} />
      <meshStandardMaterial
        color="#333333"
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#E60012" />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
        
        {/* Main gear */}
        <GearWheel />
        
        {/* Secondary gears */}
        <SmallGear position={[2.5, 1.2, -1]} speed={0.8} />
        <SmallGear position={[-2.3, -1.5, -0.5]} speed={0.6} />
        
        {/* Wheel ring */}
        <WheelRing />
        
        {/* Pistons */}
        <PistonElement position={[-3, 0, -2]} />
        <PistonElement position={[3.2, -0.5, -1.5]} />
        
        {/* Floating bolts */}
        <FloatingBolts />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
