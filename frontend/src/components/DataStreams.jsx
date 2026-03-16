import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataStreams = ({ buildings }) => {
  const linesRef = useRef([]);

  const streams = useMemo(() => {
    if (!buildings || buildings.length < 2) return [];
    
    const result = [];
    for (let i = 0; i < Math.min(buildings.length, 20); i++) {
      const start = buildings[i];
      const end = buildings[(i + 1) % buildings.length];
      if (start && end) {
        result.push({ start, end });
      }
    }
    return result;
  }, [buildings]);

  useFrame((state) => {
    linesRef.current.forEach((line, i) => {
      if (line) {
        line.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      }
    });
  });

  return (
    <group>
      {streams.map((stream, i) => {
        const points = [
          new THREE.Vector3(stream.start.position.x, stream.start.position.y, stream.start.position.z),
          new THREE.Vector3(
            (stream.start.position.x + stream.end.position.x) / 2,
            Math.max(stream.start.position.y, stream.end.position.y) + 5,
            (stream.start.position.z + stream.end.position.z) / 2
          ),
          new THREE.Vector3(stream.end.position.x, stream.end.position.y, stream.end.position.z)
        ];
        
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);

        return (
          <mesh key={i} ref={(el) => (linesRef.current[i] = el)} geometry={geometry}>
            <meshBasicMaterial
              color="#4a90e2"
              transparent
              opacity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default DataStreams;
