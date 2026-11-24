// Threat Intelligence, UPI Deep Link / QR Forensics, and I4C Mule Registry

// Simulated National Cybercrime Reporting Portal (NCRP / CFCFRMS / 1930) Mule Blacklist
const KNOWN_MULE_REGISTRY = [
  {
    identifier: 'mule_ring_99@ybl',
    type: 'VPA',
    category: 'Organized Cyber Syndicate Layering Ring',
    reportedCount: 47,
    firReference: 'FIR-NCRP-2026-DEL-89412',
    state: 'Active Mule Node'
  },
  {
    identifier: 'fake_support_refund@oksbi',
    type: 'VPA',
    category: 'Fake Bank Customer Support Phishing',
    reportedCount: 19,
    firReference: 'FIR-NCRP-2026-MUM-44120',
    state: 'High Risk'
  },
  {
    identifier: 'scam_lottery_win@paytm',
    type: 'VPA',
    category: 'Social Engineering Lottery / Prize Scam',
    reportedCount: 31,
    firReference: 'FIR-NCRP-2026-BLR-10934',
    state: 'Blacklisted'
  },
  {
    identifier: 'electricity_bill_update@ybl',
    type: 'VPA',
    category: 'Utility Bill Power Disconnection Scam',
    reportedCount: 54,
    firReference: 'FIR-NCRP-2026-KOL-78219',
    state: 'Active Mule Node'
  },
  {
    identifier: '9988776655@upi',
    type: 'MOBILE',
    category: 'SIM-Swap Mule Collector',
    reportedCount: 23,
    firReference: 'FIR-NCRP-2026-HYD-51209',
    state: 'Frozen Account'
  },
  {
    identifier: '991122334455',
    type: 'ACCOUNT',
    category: 'Unverified Mule Account Pool',
    reportedCount: 15,
    firReference: 'FIR-NCRP-2026-PUN-33102',
    state: 'Flagged by FIU-IND'
  }
];

// Check recipient against mule database
function checkMuleRegistry(target) {
  if (!target) return null;
  const normalized = target.toLowerCase().trim();
  const match = KNOWN_MULE_REGISTRY.find(m => 
    normalized.includes(m.identifier.toLowerCase()) || m.identifier.toLowerCase().includes(normalized)
  );
  return match || null;
}

// UPI Deep Link & QR Code Parser and Forensic Engine
function parseAndAnalyzeUpiUri(rawUri) {
  if (!rawUri || typeof rawUri !== 'string') {
    return {
      isValidUpi: false,
      error: 'Empty or invalid URI provided'
    };
  }

  const trimmed = rawUri.trim();
  
  if (!trimmed.toLowerCase().startsWith('upi://pay')) {
    return {
      isValidUpi: false,
      error: 'Invalid UPI scheme. Must begin with upi://pay?'
    };
  }

  try {
    const urlObj = new URL(trimmed);
    const params = new URLSearchParams(urlObj.search);

    const pa = params.get('pa') || ''; // Payee VPA
    const pn = params.get('pn') || ''; // Payee Name
    const mc = params.get('mc') || ''; // Merchant Code
    const tr = params.get('tr') || ''; // Transaction Reference ID
    const tn = params.get('tn') || ''; // Transaction Note
    const am = params.get('am') || ''; // Amount
    const cu = params.get('cu') || 'INR'; // Currency
    const mode = params.get('mode') || ''; // e.g. QR, intent

    const findings = [];
    const recommendations = [];
    let riskScore = 5; // Base minimal risk

    // 1. Mandatory Parameter check
    if (!pa) {
      findings.push('CRITICAL: Missing Payee VPA (pa parameter). Malformed UPI payload.');
      riskScore += 50;
    }

    // 2. Mule & NCRP Blacklist check
    const muleHit = checkMuleRegistry(pa);
    if (muleHit) {
      findings.push(`CRITICAL BLACKLIST: Recipient "${pa}" is flagged in National Cybercrime Mule Registry (${muleHit.firReference}) with ${muleHit.reportedCount} reported fraud incidents.`);
      riskScore += 75;
      recommendations.push('Immediate Block: Do not proceed with payment. Flagged under NCRP Cyber Fraud reporting.');
    }

    // 3. Social Engineering Display Name Spoofing
    const suspiciousKeywords = [
      'electricity', 'power bill', 'customer care', 'support', 'refund',
      'lottery', 'winner', 'cashback', 'reward', 'sbi desk', 'paytm helpdesk',
      'olx buyer', 'telecom verification', 'kyc update'
    ];

    const pnLower = pn.toLowerCase();
    const hasSpoofKeyword = suspiciousKeywords.some(kw => pnLower.includes(kw));

    if (hasSpoofKeyword && !mc) {
      findings.push(`NAME SPOOFING DETECTED: Payee Name is "${pn}", claiming to be an institution or support, but lacks an official Merchant Category Code (mc). It maps to individual VPA: ${pa}`);
      riskScore += 45;
      recommendations.push('Verify authentic utility/support portal directly. Legitimate banks and utilities do not request direct personal VPA transfers without a registered merchant code.');
    }

    // 4. Collect Request disguised as Refund / Reward in note
    const tnLower = tn.toLowerCase();
    if (tnLower.includes('receive money') || tnLower.includes('enter pin to receive') || tnLower.includes('refund voucher')) {
      findings.push('REVERSE SOCIAL ENGINEERING: Transaction note claims you will receive money or demands PIN entry for receiving. In UPI, PIN is NEVER required to receive money.');
      riskScore += 60;
      recommendations.push('Scam Alert: In Unified Payments Interface, entering UPI PIN always DEBITS funds from your bank account.');
    }

    // 5. Pre-filled High Amount in static QR / intent
    const parsedAmount = parseFloat(am);
    if (!isNaN(parsedAmount)) {
      if (parsedAmount >= 25000) {
        findings.push(`HIGH VALUE EMBEDDED: Pre-filled transfer amount of ₹${parsedAmount.toLocaleString('en-IN')} embedded in QR payload.`);
        riskScore += 20;
      }
    }

    // 6. Suspicious PSP domain or characters
    if (pa && !pa.includes('@')) {
      findings.push('INVALID VPA SYNTAX: Missing "@" domain separator in payee handle.');
      riskScore += 30;
    }

    // Calculate final risk level
    const finalScore = Math.min(Math.max(riskScore, 0), 100);
    let riskLevel = 'SAFE';
    if (finalScore >= 70) {
      riskLevel = 'CRITICAL_THREAT';
    } else if (finalScore >= 35) {
      riskLevel = 'SUSPICIOUS';
    }

    if (recommendations.length === 0) {
      recommendations.push('Payload appears standard. Always verify beneficiary name matches the intended recipient before authorizing with UPI PIN.');
    }

    return {
      isValidUpi: true,
      rawUri: trimmed,
      parsed: {
        payeeVpa: pa,
        payeeName: pn || 'Not Specified',
        merchantCode: mc || 'None (Personal P2P Handle)',
        amount: am ? `₹${am}` : 'Open (Payer enters amount)',
        currency: cu,
        transactionNote: tn || 'None',
        refId: tr || 'None',
        mode: mode || 'Standard Deep Link'
      },
      muleRecord: muleHit,
      riskScore: finalScore,
      riskLevel,
      findings,
      recommendations
    };
  } catch (err) {
    return {
      isValidUpi: false,
      error: `URI Parsing Exception: ${err.message}`
    };
  }
}

// Generate an official Cybercrime Reporting Dossier for Law Enforcement / Banks
function generateCybercrimeDossier(txn) {
  const incidentNumber = 'NCRP-' + Date.now().toString().slice(-8);
  const timestamp = txn.timestamp ? new Date(txn.timestamp).toISOString() : new Date().toISOString();

  return {
    dossierHeader: {
      framework: 'MHA National Cyber Crime Reporting Portal (1930 / CFCFRMS)',
      incidentNumber,
      generatedAt: timestamp,
      classification: txn.decision === 'BLOCK' ? 'HIGH PRIORITY FRAUD INTERCEPTION' : 'FLAGGED SUSPICIOUS TRANSACTION'
    },
    transactionEvidence: {
      transactionId: txn.txnId || 'UPI-' + Date.now().toString().slice(-8),
      senderVpa: txn.senderVpa,
      receiverVpa: txn.receiverVpa,
      amountInr: txn.amount,
      riskScore: txn.riskScore,
      decisionEnforced: txn.decision,
      primaryViolationReason: txn.decisionReason,
      deviceRiskIndex: txn.deviceRiskScore || 'N/A',
      tenMinuteVelocity: txn.velocity || 'N/A'
    },
    lawEnforcementActionItems: [
      `1. Immediate temporary lien/hold requested on receiving beneficiary handle: ${txn.receiverVpa}`,
      `2. Verification of KYC documents and reverse IP logs through receiving Payment Service Provider (PSP)`,
      `3. Alert forwarded to Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS Helpline 1930)`
    ],
    disclaimer: 'This electronic telemetry evidence record was generated autonomously by SentinelUPI Defense Core for banking fraud forensics.'
  };
}

module.exports = {
  checkMuleRegistry,
  parseAndAnalyzeUpiUri,
  generateCybercrimeDossier,
  KNOWN_MULE_REGISTRY
};
