import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  metrics: {
    totalPopulation: { type: Number, default: 0 },
    activeVehicles: { type: Number, default: 0 },
    averageAQI: { type: Number, default: 0 },
    hospitalOccupancy: { type: Number, default: 0 },
    energyConsumption: { type: Number, default: 0 },
    waterUsage: { type: Number, default: 0 }
  },
  trends: {
    trafficGrowth: { type: Number, default: 0 },
    pollutionChange: { type: Number, default: 0 },
    populationGrowth: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
