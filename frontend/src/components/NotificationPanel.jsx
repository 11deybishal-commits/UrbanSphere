import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const messages = [
      { type: 'success', text: 'Traffic flow optimized on Route 3', icon: CheckCircle },
      { type: 'info', text: 'Air quality improved by 12%', icon: Info },
      { type: 'warning', text: 'Hospital 2 at 85% capacity', icon: AlertCircle },
      { type: 'info', text: 'Energy consumption reduced', icon: CheckCircle }
    ];

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const newNotif = {
        id: Date.now(),
        ...randomMsg
      };
      
      setNotifications(prev => [...prev.slice(-2), newNotif]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
      }, 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2 w-80">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className={`p-4 rounded-xl backdrop-blur-xl border ${
              notif.type === 'success' ? 'bg-green-500/20 border-green-500/50' :
              notif.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50' :
              'bg-blue-500/20 border-blue-500/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <notif.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm flex-1">{notif.text}</p>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
