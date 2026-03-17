import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei';
import Building from './Building';
import ParticleField from './ParticleField';
import HolographicRings from './HolographicRings';
import DataStreams from './DataStreams';
import FloatingIslands from './FloatingIslands';
import EnergyBeams from './EnergyBeams';

const CityScene = ({ buildings, onBuildingClick, selectedBuilding }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-dark to-darker relative">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={60} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={100}
            maxPolarAngle={Math.PI / 2.2}
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
          
          <ParticleField />
          <HolographicRings />
          <DataStreams buildings={buildings} />
          <FloatingIslands />
          <EnergyBeams buildings={buildings} />
          
          {buildings && buildings.length > 0 && buildings.map((building) => (
            <Building
              key={building._id}
              building={building}
              onClick={() => onBuildingClick(building)}
              isSelected={selectedBuilding?._id === building._id}
            />
          ))}
          
          <Environment preset="night" />
          
          <fog attach="fog" args={['#0a0e27', 50, 100]} />
        </Suspense>
      </Canvas>
      
      <HelpText />
    </div>
  );
};

const HelpText = () => (
  <div className="absolute top-8 left-8 text-gray-400 text-sm pointer-events-none">
    <p className="text-primary font-semibold mb-1">🖱️ Drag to rotate • Scroll to zoom • Click buildings</p>
  </div>
);

export default CityScene;
