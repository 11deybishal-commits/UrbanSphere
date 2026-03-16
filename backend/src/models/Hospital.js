import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'CityLocation' },
  position: {
    x: Number,
    y: Number,
    z: Number
  },
  capacity: { type: Number, required: true },
  currentPatients: { type: Number, default: 0 },
  emergencyLoad: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  estimatedWaitTime: { type: Number, default: 15 },
  departments: [String],
  rating: { type: Number, min: 0, max: 5, default: 4 },
  contact: {
    phone: String,
    email: String
  }
}, { timestamps: true });

export default mongoose.model('Hospital', hospitalSchema);
