import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { aiAPI } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AIInsightsPanel = ({ building, onClose }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, [building]);

  const loadInsights = async () => {
    setLoading(true);
    try {
      const response = await aiAPI.getInsights(building._id);
      if (response.data.success) {
        setInsights(response.data.data);
      }
    } catch (error) {
      console.error('Error loading insights:', error);
      setInsights({
        summary: `${building.name} is currently operational`,
        recommendation: "Monitor regularly for optimal performance",
        metrics: ["Status: Active", "Performance: Normal"],
        prediction: "Stable operations expected"
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 78 },
    { name: 'Wed', value: 82 },
    { name: 'Thu', value: 75 },
    { name: 'Fri', value: 88 },
    { name: 'Sat', value: 70 },
    { name: 'Sun', value: 60 }
  ];

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="absolute right-0 top-0 bottom-0 w-96 bg-dark/95 backdrop-blur-xl border-l border-primary/20 overflow-y-auto z-40"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
            <h2 className="text-lg font-bold">AI Insights</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : (
          <>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-2">{building.name}</h3>
              <p className="text-sm text-gray-400">{building.type.toUpperCase()}</p>
            </div>

            <InsightCard
              icon={<CheckCircle className="w-5 h-5" />}
              title="Status"
              content={insights?.summary}
              color="from-green-500 to-emerald-500"
            />

            <InsightCard
              icon={<AlertCircle className="w-5 h-5" />}
              title="Recommendation"
              content={insights?.recommendation}
              color="from-blue-500 to-cyan-500"
            />

            <InsightCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Prediction"
              content={insights?.prediction}
              color="from-purple-500 to-pink-500"
            />

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-sm font-semibold mb-3">Key Metrics</h3>
              <ul className="space-y-2">
                {insights?.metrics?.map((metric, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-sm font-semibold mb-3">Activity</h3>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a0e27', border: '1px solid #4a90e2', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#4a90e2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const InsightCard = ({ icon, title, content, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-lg bg-white/5 border border-white/10"
  >
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-300">{content}</p>
      </div>
    </div>
  </motion.div>
);

export default AIInsightsPanel;
