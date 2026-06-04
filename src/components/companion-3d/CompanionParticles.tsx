import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CompanionParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < 80; i++) {
      const angle = (i / 80) * Math.PI * 2;
      const radius = 1.2 + Math.random() * 0.8;
      pos.push(
        Math.cos(angle) * radius,
        Math.random() * 3,
        Math.sin(angle) * radius
      );
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00f0ff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
