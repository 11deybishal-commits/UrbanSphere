import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid, Stars, Sparkles } from '@react-three/drei';
import Building from './Building';
import ParticleField from './ParticleField';
import HolographicRings from './HolographicRings';
import DataStreams from './DataStreams';
import FloatingIslands from './FloatingIslands';
import EnergyBeams from './EnergyBeams';

const CityScene = ({ buildings, onBuildingClick, selectedBuilding, visualSettings }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [30, 25, 30], fov: 60 }}>
        <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={60} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4a90e2" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#f39c12" />
        <spotLight position={[0, 30, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Grid 
          args={[100, 100]} 
          cellSize={2} 
          cellThickness={0.5} 
          cellColor="#4a90e2" 
          sectionSize={10} 
          sectionThickness={1} 
          sectionColor="#f39c12"
          fadeDistance={80}
          fadeStrength={1}
          position={[0, -0.01, 0]}
        />
        
        {visualSettings?.particles !== false && <ParticleField />}
        {visualSettings?.holographicRings !== false && <HolographicRings />}
        {visualSettings?.dataStreams !== false && <DataStreams buildings={buildings} />}
        <FloatingIslands />
        {visualSettings?.energyBeams !== false && <EnergyBeams buildings={buildings} />}
        
        <Sparkles count={100} scale={50} size={2} speed={0.3} opacity={0.5} color="#4a90e2" />
        
        {buildings.map((building) => (
          <Building
            key={building._id}
            building={building}
            onClick={() => onBuildingClick(building)}
            isSelected={selectedBuilding?._id === building._id}
          />
        ))}
        
        <Environment preset="night" />
        
        <fog attach="fog" args={['#0a0e27', 50, 100]} />
      </Canvas>
    </div>
  );
};

export default CityScene;
