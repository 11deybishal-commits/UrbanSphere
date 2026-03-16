import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Database, Cpu } from 'lucide-react';

const Footer = () => {
  const [status, setStatus] = useState({
    api: 'operational',
    database: 'connected',
    latency: '12ms'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus({
        api: 'operational',
        database: 'connected',
        latency: `${Math.floor(Math.random() * 20) + 10}ms`
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="absolute bottom-0 left-0 right-0 h-12 bg-dark/80 backdrop-blur-xl border-t border-primary/20 px-6 flex items-center justify-between text-sm z-20"
    >
      <div className="flex items-center gap-6">
        <StatusIndicator icon={<Wifi />} label="API" status={status.api} />
        <StatusIndicator icon={<Database />} label="Database" status={status.database} />
        <StatusIndicator icon={<Cpu />} label="Latency" status={status.latency} />
      </div>
      
      <div className="text-gray-400">
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
    <span className="text-green-400 font-semibold">{status}</span>
  </div>
);

export default Footer;
