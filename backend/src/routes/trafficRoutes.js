import express from 'express';
import TrafficData from '../models/TrafficData.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { sortBy, congestionLevel } = req.query;
    let query = TrafficData.find();
    
    if (congestionLevel) {
      query = query.where('congestionLevel').equals(congestionLevel);
    }
    
    if (sortBy === 'congestionLevel') {
      query = query.sort({ congestionLevel: 1 });
    } else if (sortBy === 'speed') {
      query = query.sort({ averageSpeed: -1 });
    }
    
    const traffic = await query.limit(50);
    res.json({ success: true, data: traffic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/realtime', async (req, res) => {
  try {
    const recentTraffic = await TrafficData.find()
      .sort({ timestamp: -1 })
      .limit(20);
    res.json({ success: true, data: recentTraffic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
