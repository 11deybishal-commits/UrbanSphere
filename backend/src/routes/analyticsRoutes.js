import express from 'express';
import Analytics from '../models/Analytics.js';
import CityLocation from '../models/CityLocation.js';
import Hospital from '../models/Hospital.js';
import TrafficData from '../models/TrafficData.js';
import PollutionData from '../models/PollutionData.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const latest = await Analytics.findOne().sort({ date: -1 });
    
    if (!latest) {
      const computed = await computeAnalytics();
      return res.json({ success: true, data: computed });
    }
    
    res.json({ success: true, data: latest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/compute', async (req, res) => {
  try {
    const analytics = await computeAnalytics();
    const saved = new Analytics(analytics);
    await saved.save();
    res.json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function computeAnalytics() {
  const locations = await CityLocation.find();
  const hospitals = await Hospital.find();
  const traffic = await TrafficData.find();
  const pollution = await PollutionData.find();
  
  const totalPopulation = locations.reduce((sum, loc) => sum + (loc.population || 0), 0);
  const activeVehicles = traffic.reduce((sum, t) => sum + (t.vehicleCount || 0), 0);
  const averageAQI = pollution.length > 0 
    ? pollution.reduce((sum, p) => sum + p.aqi, 0) / pollution.length 
    : 50;
  const hospitalOccupancy = hospitals.length > 0
    ? (hospitals.reduce((sum, h) => sum + (h.currentPatients / h.capacity), 0) / hospitals.length) * 100
    : 0;
  
  return {
    date: new Date(),
    metrics: {
      totalPopulation,
      activeVehicles,
      averageAQI: Math.round(averageAQI),
      hospitalOccupancy: Math.round(hospitalOccupancy),
      energyConsumption: Math.round(totalPopulation * 0.5),
      waterUsage: Math.round(totalPopulation * 0.3)
    },
    trends: {
      trafficGrowth: Math.random() * 10 - 5,
      pollutionChange: Math.random() * 10 - 5,
      populationGrowth: Math.random() * 5
    }
  };
}

export default router;
