const axios = require('axios');

async function getMLRiskScore(payload) {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
    const response = await axios.post(`${mlUrl}/predict`, payload, { timeout: 2500 });
    return response.data;
  } catch (error) {
    console.warn('ML Service unreachable, using heuristic fallback:', error.message);
    const score = payload.amount > 30000 ? 55.0 : 15.0;
    return {
      risk_score: score,
      decision: score >= 50 ? 'OTP_CHALLENGE' : 'ALLOW',
      reason: 'Heuristic Fallback: ML service offline.'
    };
  }
}

module.exports = { getMLRiskScore };
