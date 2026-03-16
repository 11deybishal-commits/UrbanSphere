import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building2, Hospital, Car, Wind } from 'lucide-react';

const Sidebar = ({ isOpen, onToggle, analytics }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 bg-dark/80 backdrop-blur-xl border-r border-primary/20 p-6 overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              City Overview
            </h2>
            
            <div className="space-y-4">
              <MetricCard
                icon={<Building2 className="w-5 h-5" />}
                label="Population"
                value={analytics?.metrics?.totalPopulation?.toLocaleString() || '0'}
                color="from-blue-500 to-cyan-500"
              />
              
              <MetricCard
                icon={<Hospital className="w-5 h-5" />}
                label="Hospital Occupancy"
                value={`${analytics?.metrics?.hospitalOccupancy || 0}%`}
                color="from-red-500 to-pink-500"
              />
              
              <MetricCard
                icon={<Car className="w-5 h-5" />}
                label="Active Vehicles"
                value={analytics?.metrics?.activeVehicles?.toLocaleString() || '0'}
                color="from-yellow-500 to-orange-500"
              />
              
              <MetricCard
                icon={<Wind className="w-5 h-5" />}
                label="Air Quality Index"
                value={analytics?.metrics?.averageAQI || '0'}
                color="from-green-500 to-emerald-500"
              />
            </div>
            
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Trends</h3>
              <div className="space-y-2">
                <TrendItem 
                  label="Traffic Growth" 
                  value={analytics?.trends?.trafficGrowth?.toFixed(1) || '0'}
                />
                <TrendItem 
                  label="Pollution Change" 
                  value={analytics?.trends?.pollutionChange?.toFixed(1) || '0'}
                />
                <TrendItem 
                  label="Population Growth" 
                  value={analytics?.trends?.populationGrowth?.toFixed(1) || '0'}
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-primary/20 backdrop-blur-lg p-2 rounded-r-lg border border-l-0 border-primary/30"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </motion.button>
    </>
  );
};

const MetricCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  </motion.div>
);

const TrendItem = ({ label, value }) => {
  const isPositive = parseFloat(value) >= 0;
  return (
    <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
      <span className="text-sm text-gray-300">{label}</span>
      <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? '+' : ''}{value}%
      </span>
    </div>
  );
};

export default Sidebar;
