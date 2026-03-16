import express from 'express';
import { processNaturalLanguageQuery, generateBuildingInsights } from '../services/aiService.js';
import Hospital from '../models/Hospital.js';
import CityLocation from '../models/CityLocation.js';
import TrafficData from '../models/TrafficData.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query is required' });
    }
    
    const parsed = await processNaturalLanguageQuery(query);
    let results = [];
    
    if (parsed.type === 'hospital') {
      results = await Hospital.find(parsed.filters).populate('locationId').limit(10);
    } else if (parsed.type === 'traffic') {
      results = await TrafficData.find(parsed.filters).limit(10);
    } else if (parsed.type === 'location') {
      results = await CityLocation.find(parsed.filters).limit(10);
    }
    
    res.json({ 
      success: true, 
      data: {
        intent: parsed.intent,
        type: parsed.type,
        results
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/insights/:buildingId', async (req, res) => {
  try {
    const { buildingId } = req.params;
    
    let building = await CityLocation.findById(buildingId);
    
    if (!building) {
      return res.status(404).json({ success: false, error: 'Building not found' });
    }
    
    if (building.type === 'hospital') {
      const hospital = await Hospital.findOne({ locationId: buildingId });
      if (hospital) {
        building = { ...building.toObject(), ...hospital.toObject() };
      }
    }
    
    const insights = await generateBuildingInsights(building);
    
    res.json({ success: true, data: insights });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
