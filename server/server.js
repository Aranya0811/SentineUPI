require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const Transaction = require('./models/Transaction');
const { evaluateRules } = require('./services/ruleEngine');
const { getMLRiskScore } = require('./services/mlClient');

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));
app.use(express.json());

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Real-time socket connection
io.on('connection', (socket) => {
  console.log('Frontend SOC dashboard connected:', socket.id);
});

// Ingest and score UPI transactions in real-time
app.post('/api/transactions/process', async (req, res) => {
  try {
    const {
      senderVpa,
      receiverVpa,
      amount,
      velocity_last_10m = 1,
      amount_to_avg_ratio = 1.0,
      is_new_payee = 0,
      geo_distance_km = 5.0,
      device_risk_score = 0.1
    } = req.body;

    const hour_of_day = new Date().getHours();

    // 1. Evaluate Rule Engine
    const ruleFlags = evaluateRules({
      velocity_last_10m,
      amount,
      is_new_payee,
      geo_distance_km
    });

    // 2. Fetch ML prediction
    const mlResult = await getMLRiskScore({
      amount: Number(amount),
      hour_of_day,
      velocity_last_10m: Number(velocity_last_10m),
      amount_to_avg_ratio: Number(amount_to_avg_ratio),
      is_new_payee: Number(is_new_payee),
      geo_distance_km: Number(geo_distance_km),
      device_risk_score: Number(device_risk_score)
    });

    let finalRiskScore = mlResult.risk_score;
    let finalDecision = mlResult.decision;
    let reason = mlResult.reason;

    // Elevate to BLOCK if critical heuristic triggered
    if (ruleFlags.length >= 2 || ruleFlags.includes('IMPOSSIBLE_TRAVEL_VELOCITY')) {
      finalRiskScore = Math.max(finalRiskScore, 85);
      finalDecision = 'BLOCK';
      reason = `Multiple rules violated: ${ruleFlags.join(', ')}`;
    }

    const txnRecord = {
      txnId: 'UPI-' + Date.now().toString().slice(-8),
      senderVpa,
      receiverVpa,
      amount: Number(amount),
      riskScore: finalRiskScore,
      decision: finalDecision,
      decisionReason: reason,
      deviceRiskScore: Number(device_risk_score),
      velocity: Number(velocity_last_10m),
      timestamp: new Date()
    };

    // Save to Mongo if available
    try {
      if (mongoose.connection.readyState === 1) {
        await Transaction.create(txnRecord);
      }
    } catch (dbErr) {
      console.warn('MongoDB log failed, proceeding in-memory:', dbErr.message);
    }

    // Push real-time alert to React SOC Dashboard via WebSockets
    io.emit('new_transaction', txnRecord);

    return res.status(200).json({
      success: true,
      transaction: txnRecord
    });
  } catch (error) {
    console.error('Transaction pipeline error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch historical transactions
app.get('/api/transactions', async (req, res) => {
  try {
    let txns = [];
    if (mongoose.connection.readyState === 1) {
      txns = await Transaction.find().sort({ timestamp: -1 }).limit(30);
    }
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sentinel_upi';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected.'))
  .catch((err) => console.warn('Running without MongoDB (in-memory mode for hackathon demo):', err.message));

server.listen(PORT, () => {
  console.log(`Node Sentinel Server running on http://localhost:${PORT}`);
});
