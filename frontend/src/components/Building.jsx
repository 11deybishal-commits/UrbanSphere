import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Building = ({ building, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const { position, dimensions, color } = building;
  const { width, height, depth } = dimensions;
  
  useFrame((state) => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else {
        meshRef.current.position.y = position.y;
      }
    }
  });
  
  const emissiveColor = hovered || isSelected ? color : '#000000';
  const emissiveIntensity = hovered ? 0.3 : isSelected ? 0.5 : 0;
  
  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial 
        color={color}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        metalness={0.3}
        roughness={0.7}
      />
      
      {(hovered || isSelected) && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
          <lineBasicMaterial color="#ffffff" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
};

export default Building;
