import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Eye, EyeOff, Zap, Wind } from 'lucide-react';

const ControlPanel = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState({
    particles: true,
    dataStreams: true,
    energyBeams: true,
    holographicRings: true
  });

  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute bottom-20 left-6 w-72 bg-dark/90 backdrop-blur-xl rounded-2xl border border-primary/30 p-4 z-30"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-bold">Visual Controls</h3>
      </div>

      <div className="space-y-3">
        <ControlToggle
          icon={<Zap className="w-4 h-4" />}
          label="Particle Field"
          enabled={settings.particles}
          onToggle={() => toggleSetting('particles')}
        />
        <ControlToggle
          icon={<Wind className="w-4 h-4" />}
          label="Data Streams"
          enabled={settings.dataStreams}
          onToggle={() => toggleSetting('dataStreams')}
        />
        <ControlToggle
          icon={<Zap className="w-4 h-4" />}
          label="Energy Beams"
          enabled={settings.energyBeams}
          onToggle={() => toggleSetting('energyBeams')}
        />
        <ControlToggle
          icon={<Eye className="w-4 h-4" />}
          label="Holographic Rings"
          enabled={settings.holographicRings}
          onToggle={() => toggleSetting('holographicRings')}
        />
      </div>
    </motion.div>
  );
};

const ControlToggle = ({ icon, label, enabled, onToggle }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
    onClick={onToggle}
  >
    <div className="flex items-center gap-2">
      <div className={`${enabled ? 'text-primary' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
    <motion.div
      animate={{ backgroundColor: enabled ? '#4a90e2' : '#374151' }}
      className="w-10 h-6 rounded-full p-1 flex items-center"
    >
      <motion.div
        animate={{ x: enabled ? 16 : 0 }}
        className="w-4 h-4 bg-white rounded-full"
      />
    </motion.div>
  </motion.div>
);

export default ControlPanel;
