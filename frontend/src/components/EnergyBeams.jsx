import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EnergyBeams = ({ buildings }) => {
  const beamsRef = useRef([]);

  useFrame((state) => {
    beamsRef.current.forEach((beam, i) => {
      if (beam) {
        beam.material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.3;
        beam.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      }
    });
  });

  const selectedBuildings = buildings?.slice(0, 10) || [];

  return (
    <group>
      {selectedBuildings.map((building, i) => (
        <mesh
          key={i}
          ref={(el) => (beamsRef.current[i] = el)}
          position={[building.position.x, building.position.y + building.dimensions.height / 2, building.position.z]}
        >
          <cylinderGeometry args={[0.1, 0.1, 10, 8]} />
          <meshBasicMaterial
            color={building.color}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

export default EnergyBeams;
