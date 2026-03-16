import express from 'express';
import Hospital from '../models/Hospital.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { sortBy, emergencyLoad } = req.query;
    let query = Hospital.find();
    
    if (emergencyLoad) {
      query = query.where('emergencyLoad').equals(emergencyLoad);
    }
    
    if (sortBy === 'rating') {
      query = query.sort({ rating: -1 });
    } else if (sortBy === 'waitTime') {
      query = query.sort({ estimatedWaitTime: 1 });
    }
    
    const hospitals = await query.populate('locationId');
    res.json({ success: true, data: hospitals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate('locationId');
    if (!hospital) {
      return res.status(404).json({ success: false, error: 'Hospital not found' });
    }
    res.json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
