const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  txnId: { type: String, required: true, unique: true },
  senderVpa: { type: String, required: true },
  receiverVpa: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  riskScore: { type: Number, required: true },
  decision: { type: String, enum: ['ALLOW', 'OTP_CHALLENGE', 'BLOCK'], required: true },
  decisionReason: { type: String },
  deviceRiskScore: { type: Number },
  velocity: { type: Number },
  status: { type: String, default: 'COMPLETED' }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
