import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUserStore } from '../../stores/useUserStore';

export default function CompanionModel() {
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { streak } = useUserStore();

  const isMotivated = streak >= 7;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.15;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    }

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      headRef.current.position.y = 2.3 + Math.sin(t * 1.2) * 0.1;
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeScale = isMotivated ? 1 + Math.sin(t * 3) * 0.1 : 1;
      leftEyeRef.current.scale.setScalar(eyeScale);
      rightEyeRef.current.scale.setScalar(eyeScale);
    }

    if (bodyRef.current) {
      bodyRef.current.position.y = 1.1 + Math.sin(t * 1.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body - sci-fi suit */}
      <mesh ref={bodyRef} position={[0, 1.1, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#1a1a3e"
          roughness={0.3}
          metalness={0.8}
          emissive="#6c5ce7"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Chest armor detail */}
      <mesh position={[0, 1.4, 0.3]}>
        <boxGeometry args={[0.5, 0.35, 0.1]} />
        <meshStandardMaterial
          color="#0d0d26"
          roughness={0.2}
          metalness={0.9}
          emissive="#a855f7"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Shoulder pads */}
      <mesh position={[0.4, 1.65, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#2a2a5e" roughness={0.3} metalness={0.7} emissive="#00f0ff" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[-0.4, 1.65, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#2a2a5e" roughness={0.3} metalness={0.7} emissive="#00f0ff" emissiveIntensity={0.15} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={isMotivated ? '#ffe4c4' : '#f5deb3'}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Hair - anime style */}
      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.38, 32, 32, 0, Math.PI * 2, 0, 0.7]} />
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.4}
          metalness={0.5}
          emissive="#2a2a5e"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Hair spikes */}
      {[[0, 2.75, 0.15], [0.2, 2.7, 0.1], [-0.2, 2.7, 0.1], [0.1, 2.72, -0.1], [-0.1, 2.72, -0.1]].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], pos[2]]}>
          <coneGeometry args={[0.06, 0.3, 8]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {/* Eyes - glowing neon */}
      <mesh ref={leftEyeRef} position={[-0.12, 2.35, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={isMotivated ? '#00f0ff' : '#a0ffff'}
          emissive={isMotivated ? '#00f0ff' : '#80ffff'}
          emissiveIntensity={isMotivated ? 1.2 : 0.6}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.12, 2.35, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={isMotivated ? '#00f0ff' : '#a0ffff'}
          emissive={isMotivated ? '#00f0ff' : '#80ffff'}
          emissiveIntensity={isMotivated ? 1.2 : 0.6}
          roughness={0.1}
        />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 2.22, 0.32]}>
        <boxGeometry args={[0.06, 0.015, 0.01]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.36, 0.04, 8, 32]} />
        <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.9} emissive="#a855f7" emissiveIntensity={0.4} />
      </mesh>

      {/* Legs */}
      <mesh position={[0.12, 0.45, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshStandardMaterial color="#0d0d26" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[-0.12, 0.45, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
        <meshStandardMaterial color="#0d0d26" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}
