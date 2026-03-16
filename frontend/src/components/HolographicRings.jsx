import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HolographicRings = () => {
  const ringsRef = useRef([]);

  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = state.clock.elapsedTime * (0.5 + i * 0.2);
        ring.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime + i) * 0.2;
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, i * 2, 0]}
        >
          <torusGeometry args={[15 + i * 3, 0.1, 16, 100]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#4a90e2' : '#f39c12'}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

export default HolographicRings;
