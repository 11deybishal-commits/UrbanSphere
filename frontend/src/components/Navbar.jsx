import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, Settings, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 bg-gradient-to-r from-dark/90 to-darker/90 backdrop-blur-lg border-b border-primary/20 px-6 flex items-center justify-between"
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
      
      <div className="flex items-center gap-4">
        <NavButton icon={<Activity />} label="Analytics" />
        <NavButton icon={<Bell />} label="Alerts" badge={3} />
        <NavButton icon={<Settings />} label="Settings" />
      </div>
    </motion.nav>
  );
};

const NavButton = ({ icon, label, badge }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
    title={label}
  >
    {icon}
    {badge && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
        {badge}
      </span>
    )}
  </motion.button>
);

export default Navbar;
