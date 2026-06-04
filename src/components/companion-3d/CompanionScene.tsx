import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import CompanionModel from './CompanionModel';
import CompanionParticles from './CompanionParticles';

export default function CompanionScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.5], fov: 40 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#00f0ff" />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#ff00e5" />
      <pointLight position={[0, 4, 0]} intensity={0.3} color="#8b5cf6" />
      <Suspense fallback={null}>
        <CompanionModel />
        <CompanionParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
