import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import locationRoutes from './routes/locationRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import trafficRoutes from './routes/trafficRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { seedDatabase } from './utils/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urbansphere')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/locations', locationRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/traffic', trafficRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'operational', 
    timestamp: new Date(),
    services: {
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      api: 'running'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 UrbanSphere Backend running on port ${PORT}`);
});
