const axios = require('axios');

const senders = ['rahul@oksbi', 'priya@okhdfcbank', 'amit@okicici', 'sneha@paytm', 'vikram@okaxis', 'dev@okaxis'];
const receivers = ['swiggy@icici', 'zomato@hdfc', 'amazon@apl', 'suspicious_mule@ybl', 'kirana_store@paytm'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function streamTransaction() {
  const isAttack = Math.random() < 0.20; // 20% attack rate

  const payload = isAttack
    ? {
        senderVpa: getRandomItem(senders),
        receiverVpa: 'suspicious_mule@ybl',
        amount: Math.floor(Math.random() * 60000) + 40000,
        velocity_last_10m: Math.floor(Math.random() * 6) + 5,
        amount_to_avg_ratio: (Math.random() * 5 + 4).toFixed(1),
        is_new_payee: 1,
        geo_distance_km: Math.floor(Math.random() * 1200) + 300,
        device_risk_score: (Math.random() * 0.4 + 0.6).toFixed(2)
      }
    : {
        senderVpa: getRandomItem(senders),
        receiverVpa: getRandomItem(receivers),
        amount: Math.floor(Math.random() * 2500) + 50,
        velocity_last_10m: 1,
        amount_to_avg_ratio: (Math.random() * 0.8 + 0.5).toFixed(1),
        is_new_payee: 0,
        geo_distance_km: Math.floor(Math.random() * 10) + 1,
        device_risk_score: 0.05
      };

  try {
    const res = await axios.post('http://localhost:5000/api/transactions/process', payload);
    const txn = res.data.transaction;
    const badge = txn.decision === 'BLOCK' ? '🔴 BLOCKED' : txn.decision === 'OTP_CHALLENGE' ? '🟡 CHALLENGE' : '🟢 ALLOWED';
    console.log(`[${badge}] ${txn.txnId} | ₹${txn.amount} | Risk: ${txn.riskScore}% | ${txn.decisionReason}`);
  } catch (err) {
    console.error('Stream dispatch error:', err.message);
  }
}

console.log('⚡ Sentinel Live UPI Traffic Streamer Started (1 txn every 2.5s)...');
setInterval(streamTransaction, 2500);
