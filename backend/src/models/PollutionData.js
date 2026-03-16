import mongoose from 'mongoose';

const pollutionDataSchema = new mongoose.Schema({
  area: { type: String, required: true },
  aqi: { type: Number, required: true },
  pm25: { type: Number, default: 0 },
  pm10: { type: Number, default: 0 },
  co2: { type: Number, default: 0 },
  quality: { type: String, enum: ['good', 'moderate', 'unhealthy', 'hazardous'], default: 'good' },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('PollutionData', pollutionDataSchema);
