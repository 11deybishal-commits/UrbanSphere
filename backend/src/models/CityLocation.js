import mongoose from 'mongoose';

const cityLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['residential', 'commercial', 'hospital', 'park', 'office', 'industrial'] },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true }
  },
  dimensions: {
    width: { type: Number, default: 1 },
    height: { type: Number, default: 2 },
    depth: { type: Number, default: 1 }
  },
  color: { type: String, default: '#4a90e2' },
  population: { type: Number, default: 0 },
  metadata: {
    address: String,
    floors: Number,
    yearBuilt: Number,
    capacity: Number
  }
}, { timestamps: true });

export default mongoose.model('CityLocation', cityLocationSchema);
