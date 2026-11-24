const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['SOC_ANALYST', 'RISK_OFFICER', 'ADMIN'], default: 'SOC_ANALYST' },
  organization: { type: String, default: 'National Payments Defense SOC' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
