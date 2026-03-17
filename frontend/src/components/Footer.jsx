import { motion } from 'framer-motion';
import { Wifi, Database, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="absolute bottom-0 left-0 right-0 h-12 bg-dark/80 backdrop-blur-xl border-t border-primary/10 px-6 flex items-center justify-between text-sm z-20"
    >
      <div className="flex items-center gap-6">
        <StatusIndicator icon={<Wifi />} label="API" status="operational" />
        <StatusIndicator icon={<Database />} label="Database" status="connected" />
        <StatusIndicator icon={<Cpu />} label="System" status="optimal" />
      </div>
      
      <div className="text-gray-500">
        <span>UrbanSphere v1.0</span>
        <span className="mx-2">•</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </motion.footer>
  );
};

const StatusIndicator = ({ icon, label, status }) => (
  <div className="flex items-center gap-2">
    <div className="text-primary">{icon}</div>
    <span className="text-gray-400">{label}:</span>
    <span className="text-green-400 font-semibold text-xs">{status}</span>
  </div>
);

export default Footer;
