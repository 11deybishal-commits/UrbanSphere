import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const FloatingIslands = () => {
  const islandsRef = useRef([]);

  useFrame((state) => {
    islandsRef.current.forEach((island, i) => {
      if (island) {
        island.position.y = Math.sin(state.clock.elapsedTime + i * 2) * 0.5 + 15;
        island.rotation.y = state.clock.elapsedTime * 0.2;
      }
    });
  });

  const islands = [
    { pos: [-25, 15, -25], color: '#4a90e2', size: 3 },
    { pos: [25, 15, -25], color: '#f39c12', size: 2.5 },
    { pos: [-25, 15, 25], color: '#e74c3c', size: 2.8 },
    { pos: [25, 15, 25], color: '#27ae60', size: 2.6 }
  ];

  return (
    <group>
      {islands.map((island, i) => (
        <mesh
          key={i}
          ref={(el) => (islandsRef.current[i] = el)}
          position={island.pos}
          castShadow
        >
          <octahedronGeometry args={[island.size, 0]} />
          <meshStandardMaterial
            color={island.color}
            emissive={island.color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingIslands;
