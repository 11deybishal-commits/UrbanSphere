import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const Navbar = ({ analytics }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 bg-gradient-to-r from-dark/95 to-darker/95 backdrop-blur-lg border-b border-primary/10 px-8 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
        >
          <Layers className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            UrbanSphere
          </h1>
          <p className="text-xs text-gray-400">AI-Powered Smart City</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <StatItem label="Population" value={analytics?.metrics?.totalPopulation?.toLocaleString() || '0'} />
        <div className="w-px h-8 bg-primary/20"></div>
        <StatItem label="AQI" value={Math.round(analytics?.metrics?.averageAQI || 0)} />
        <div className="w-px h-8 bg-primary/20"></div>
        <StatItem label="Vehicles" value={analytics?.metrics?.activeVehicles?.toLocaleString() || '0'} />
      </div>
    </motion.nav>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-bold text-primary">{value}</p>
  </div>
);

export default Navbar;
