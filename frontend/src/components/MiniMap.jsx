import React from 'react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

const MiniMap = ({ buildings, selectedBuilding }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute bottom-20 right-6 w-64 h-64 bg-dark/90 backdrop-blur-xl rounded-2xl border border-primary/30 p-4 z-30"
    >
      <div className="flex items-center gap-2 mb-3">
        <Map className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold">City Map</h3>
      </div>
      
      <div className="relative w-full h-[calc(100%-2rem)] bg-darker rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {buildings?.map((building, i) => {
            const x = ((building.position.x + 50) / 100) * 100;
            const y = ((building.position.z + 50) / 100) * 100;
            const isSelected = selectedBuilding?._id === building._id;
            
            return (
              <motion.circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r={isSelected ? 4 : 2}
                fill={isSelected ? '#f39c12' : building.color}
                opacity={isSelected ? 1 : 0.6}
                animate={{
                  scale: isSelected ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: isSelected ? Infinity : 0
                }}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default MiniMap;
