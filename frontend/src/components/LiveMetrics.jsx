import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState([
    { label: 'Traffic Flow', value: 78, trend: 'up', change: 5 },
    { label: 'Air Quality', value: 92, trend: 'up', change: 3 },
    { label: 'Energy Usage', value: 65, trend: 'down', change: 2 },
    { label: 'Response Time', value: 88, trend: 'up', change: 7 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        change: Math.abs(Math.random() * 10).toFixed(1)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-30"
    >
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-dark/90 backdrop-blur-xl rounded-xl border border-primary/30 p-4 min-w-[140px]"
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-4 h-4 text-primary" />
            {metric.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </div>
          <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold">{metric.value.toFixed(0)}%</p>
            <p className={`text-xs mb-1 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {metric.trend === 'up' ? '+' : '-'}{metric.change}%
            </p>
          </div>
          <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${metric.value}%` }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LiveMetrics;
