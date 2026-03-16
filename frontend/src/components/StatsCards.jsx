import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Wind, Zap } from 'lucide-react';

const StatsCards = ({ analytics }) => {
  const stats = [
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Population',
      value: analytics?.metrics?.totalPopulation?.toLocaleString() || '0',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: 'Vehicles',
      value: analytics?.metrics?.activeVehicles?.toLocaleString() || '0',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Wind className="w-5 h-5" />,
      label: 'AQI',
      value: analytics?.metrics?.averageAQI || '0',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Energy',
      value: `${analytics?.metrics?.energyConsumption || '0'} MW`,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-3">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-dark/80 backdrop-blur-xl rounded-xl border border-primary/20 p-4 min-w-[140px]"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
