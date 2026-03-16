import mongoose from 'mongoose';

const trafficDataSchema = new mongoose.Schema({
  routeId: { type: String, required: true },
  routeName: { type: String, required: true },
  congestionLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  averageSpeed: { type: Number, default: 50 },
  vehicleCount: { type: Number, default: 0 },
  incidents: [{
    type: String,
    location: String,
    severity: String
  }],
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('TrafficData', trafficDataSchema);
