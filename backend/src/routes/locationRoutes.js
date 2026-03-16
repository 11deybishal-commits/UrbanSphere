import express from 'express';
import CityLocation from '../models/CityLocation.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { type, limit = 100 } = req.query;
    const filter = type ? { type } : {};
    const locations = await CityLocation.find(filter).limit(parseInt(limit));
    res.json({ success: true, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const location = await CityLocation.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }
    res.json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const location = new CityLocation(req.body);
    await location.save();
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
