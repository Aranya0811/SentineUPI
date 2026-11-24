const { checkMuleRegistry } = require('./threatIntelligence');

// Heuristic Rule Checks to catch obvious fraud and known cybercrime signatures
function evaluateRules(payload) {
  const flags = [];

  // Rule 1: High velocity burst (> 5 transactions in 10 minutes)
  if (payload.velocity_last_10m >= 5) {
    flags.push('HIGH_VELOCITY_ATTACK');
  }

  // Rule 2: Sudden huge single transfer to fresh receiver
  if (payload.amount >= 50000 && payload.is_new_payee === 1) {
    flags.push('HIGH_VALUE_NEW_PAYEE');
  }

  // Rule 3: Extreme distance jump (> 1000 km)
  if (payload.geo_distance_km >= 1000) {
    flags.push('IMPOSSIBLE_TRAVEL_VELOCITY');
  }

  // Rule 4: Recipient identified in National Cybercrime Mule Registry (I4C / 1930)
  if (payload.receiverVpa) {
    const mule = checkMuleRegistry(payload.receiverVpa);
    if (mule) {
      flags.push('MULE_ACCOUNT_NCRP_BLACKLIST');
    }
  }

  // Rule 5: Critical Device Compromise / Screen Sharing / Root
  if (payload.device_risk_score && Number(payload.device_risk_score) >= 0.8) {
    flags.push('DEVICE_COMPROMISE_SUSPECTED');
  }

  return flags;
}

module.exports = { evaluateRules };
