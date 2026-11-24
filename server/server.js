require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Transaction = require('./models/Transaction');
const User = require('./models/User');
const authenticateToken = require('./middleware/auth');
const { evaluateRules } = require('./services/ruleEngine');
const { getMLRiskScore } = require('./services/mlClient');

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'sentinel_upi_jwt_secret_secure_key_9999';

// In-memory fallback stores for robust hackathon/demo execution
const memoryUsers = [
  {
    id: 'usr_demo_1',
    name: 'Chief Risk Officer',
    email: 'analyst@sentinel.ai',
    // Pre-hashed 'password123'
    password: bcrypt.hashSync('password123', 10),
    role: 'SOC_ANALYST',
    organization: 'National Payments Defense SOC'
  }
];

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Real-time socket connection
io.on('connection', (socket) => {
  console.log('Frontend SOC dashboard connected:', socket.id);
});

// --- AUTHENTICATION ROUTES ---

// 1. Sign Up / Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role = 'SOC_ANALYST', organization = 'National Payments Defense' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists in MongoDB or memory
    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already registered with this email.' });
      }
    } else {
      const existing = memoryUsers.find(u => u.email === normalizedEmail);
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already registered with this email.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let createdUser;

    if (mongoose.connection.readyState === 1) {
      createdUser = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role,
        organization
      });
    } else {
      createdUser = {
        id: 'usr_' + Date.now(),
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role,
        organization
      };
      memoryUsers.push(createdUser);
    }

    const token = jwt.sign(
      { id: createdUser._id || createdUser.id, email: createdUser.email, role: createdUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: createdUser._id || createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        organization: createdUser.organization
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Sign In / Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let foundUser = null;

    if (mongoose.connection.readyState === 1) {
      foundUser = await User.findOne({ email: normalizedEmail });
    }
    
    // Check fallback in-memory users if not in mongo or mongo offline
    if (!foundUser) {
      foundUser = memoryUsers.find(u => u.email === normalizedEmail);
    }

    if (!foundUser) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
    }

    const token = jwt.sign(
      { id: foundUser._id || foundUser.id, email: foundUser.email, role: foundUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: foundUser._id || foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        organization: foundUser.organization
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Current User Profile (/api/auth/me)
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    let user = null;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(req.user.id).select('-password');
    }
    if (!user) {
      user = memoryUsers.find(u => (u._id || u.id) === req.user.id);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }

    res.json({
      success: true,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- TRANSACTION INGESTION & PIPELINE ---

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

    // 1. Evaluate Heuristic Rules
    const ruleFlags = evaluateRules({
      velocity_last_10m,
      amount,
      is_new_payee,
      geo_distance_km
    });

    // 2. Fetch ML prediction from Python Microservice
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
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.warn('Running without MongoDB (in-memory mode for hackathon demo):', err.message));

server.listen(PORT, () => {
  console.log(`Sentinel Server running on http://localhost:${PORT}`);
  console.log(`Default Analyst account: analyst@sentinel.ai / password123`);
});
