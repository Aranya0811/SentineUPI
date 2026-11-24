import React, { useState } from 'react';
import axios from 'axios';
import { Send, AlertTriangle, ShieldCheck, ShieldAlert, AtSign, Smartphone, Building2 } from 'lucide-react';

export default function Simulator() {
  const [transferMode, setTransferMode] = useState('UPI_ID');

  // Input states - start blank
  const [senderVpa, setSenderVpa] = useState('');
  const [receiverVpa, setReceiverVpa] = useState('');

  const [senderMobile, setSenderMobile] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');

  const [receiverAccount, setReceiverAccount] = useState('');
  const [receiverIfsc, setReceiverIfsc] = useState('');

  // Risk parameters
  const [formData, setFormData] = useState({
    amount: '',
    velocity_last_10m: '1',
    amount_to_avg_ratio: '1.0',
    is_new_payee: '0',
    geo_distance_km: '',
    device_risk_score: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Switch mode and clear fields
  const handleModeChange = (mode) => {
    setTransferMode(mode);
    setSenderVpa('');
    setReceiverVpa('');
    setSenderMobile('');
    setReceiverMobile('');
    setReceiverAccount('');
    setReceiverIfsc('');
    setResult(null);
  };

  const presets = {
    normal: {
      amount: '350',
      velocity_last_10m: '1',
      amount_to_avg_ratio: '0.8',
      is_new_payee: '0',
      geo_distance_km: '2',
      device_risk_score: '0.05'
    },
    suspicious: {
      amount: '18500',
      velocity_last_10m: '3',
      amount_to_avg_ratio: '3.8',
      is_new_payee: '1',
      geo_distance_km: '140',
      device_risk_score: '0.45'
    },
    criticalFraud: {
      amount: '75000',
      velocity_last_10m: '8',
      amount_to_avg_ratio: '9.2',
      is_new_payee: '1',
      geo_distance_km: '1200',
      device_risk_score: '0.92'
    }
  };

  const applyPreset = (key) => {
    setFormData(prev => ({ ...prev, ...presets[key] }));
    if (key === 'normal') {
      if (transferMode === 'UPI_ID') {
        setSenderVpa('user@okhdfcbank');
        setReceiverVpa('kirana_store@paytm');
      } else if (transferMode === 'MOBILE') {
        setSenderMobile('9876543210');
        setReceiverMobile('9823456789');
      } else {
        setReceiverAccount('5010049281729');
        setReceiverIfsc('HDFC0000060');
      }
    } else if (key === 'suspicious') {
      if (transferMode === 'UPI_ID') {
        setSenderVpa('user@okhdfcbank');
        setReceiverVpa('new_payee_482@ybl');
      } else if (transferMode === 'MOBILE') {
        setSenderMobile('9876543210');
        setReceiverMobile('9123456780');
      } else {
        setReceiverAccount('302918274619');
        setReceiverIfsc('SBIN0001234');
      }
    } else if (key === 'criticalFraud') {
      if (transferMode === 'UPI_ID') {
        setSenderVpa('victim@okaxis');
        setReceiverVpa('mule_ring_99@ybl');
      } else if (transferMode === 'MOBILE') {
        setSenderMobile('9876543210');
        setReceiverMobile('9988776655');
      } else {
        setReceiverAccount('991122334455');
        setReceiverIfsc('PUNB0123400');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    let resolvedSender = senderVpa || 'user@okhdfcbank';
    let resolvedReceiver = receiverVpa || 'receiver@paytm';

    if (transferMode === 'MOBILE') {
      resolvedSender = senderMobile ? `${senderMobile}@upi` : '9876543210@upi';
      resolvedReceiver = receiverMobile ? `${receiverMobile}@upi` : '9823456789@upi';
    } else if (transferMode === 'BANK_ACCOUNT') {
      resolvedSender = 'user@okhdfcbank';
      resolvedReceiver = receiverAccount 
        ? `A/C ${receiverAccount.slice(-4)} (${receiverIfsc || 'HDFC0001'})`
        : 'A/C ...1729 (HDFC0000060)';
    }

    const payload = {
      amount: formData.amount || '1000',
      velocity_last_10m: formData.velocity_last_10m || '1',
      amount_to_avg_ratio: formData.amount_to_avg_ratio || '1.0',
      is_new_payee: formData.is_new_payee || '0',
      geo_distance_km: formData.geo_distance_km || '2',
      device_risk_score: formData.device_risk_score || '0.1',
      senderVpa: resolvedSender,
      receiverVpa: resolvedReceiver,
      transferMode
    };

    try {
      const res = await axios.post('http://localhost:5000/api/transactions/process', payload);
      setResult(res.data.transaction);
    } catch (err) {
      alert('Backend connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-800 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Transaction Ingestion Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Configure parameters to evaluate fraud defense pipeline</p>
        </div>
        
        {/* Preset buttons */}
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => applyPreset('normal')} 
            className="text-xs sm:text-sm font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-md transition"
          >
            Normal
          </button>
          <button 
            type="button" 
            onClick={() => applyPreset('suspicious')} 
            className="text-xs sm:text-sm font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-md transition"
          >
            Challenge
          </button>
          <button 
            type="button" 
            onClick={() => applyPreset('criticalFraud')} 
            className="text-xs sm:text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1 rounded-md transition"
          >
            Fraud
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Transfer Mode Selector */}
        <div>
          <label className="text-xs sm:text-sm text-slate-700 font-bold block mb-2">
            Transfer Destination Method
          </label>
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-lg">
            <button
              type="button"
              onClick={() => handleModeChange('UPI_ID')}
              className={`py-2 px-2.5 rounded-md text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                transferMode === 'UPI_ID'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AtSign className="w-4 h-4" /> UPI ID
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('MOBILE')}
              className={`py-2 px-2.5 rounded-md text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                transferMode === 'MOBILE'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4" /> Mobile
            </button>

            <button
              type="button"
              onClick={() => handleModeChange('BANK_ACCOUNT')}
              className={`py-2 px-2.5 rounded-md text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                transferMode === 'BANK_ACCOUNT'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" /> Bank Account
            </button>
          </div>
        </div>

        {/* Dynamic Fields */}
        {transferMode === 'UPI_ID' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs sm:text-sm text-slate-700 font-semibold">Sender VPA</label>
              <input
                type="text"
                value={senderVpa}
                onChange={e => setSenderVpa(e.target.value)}
                placeholder="user@okhdfcbank"
                className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm text-slate-700 font-semibold">Receiver VPA</label>
              <input
                type="text"
                value={receiverVpa}
                onChange={e => setReceiverVpa(e.target.value)}
                placeholder="merchant@paytm"
                className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>
        )}

        {transferMode === 'MOBILE' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs sm:text-sm text-slate-700 font-semibold">Sender Mobile (+91)</label>
              <input
                type="tel"
                maxLength={10}
                value={senderMobile}
                onChange={e => setSenderMobile(e.target.value)}
                placeholder="9876543210"
                className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm text-slate-700 font-semibold">Receiver Mobile (+91)</label>
              <input
                type="tel"
                maxLength={10}
                value={receiverMobile}
                onChange={e => setReceiverMobile(e.target.value)}
                placeholder="9823456789"
                className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>
        )}

        {transferMode === 'BANK_ACCOUNT' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs sm:text-sm text-slate-700 font-semibold">Receiver Account Number</label>
              <input
                type="text"
                value={receiverAccount}
                onChange={e => setReceiverAccount(e.target.value)}
                placeholder="5010049281729"
                className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm text-slate-700 font-semibold">Bank IFSC</label>
              <input
                type="text"
                value={receiverIfsc}
                onChange={e => setReceiverIfsc(e.target.value.toUpperCase())}
                placeholder="HDFC0000060"
                className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-mono uppercase"
              />
            </div>
          </div>
        )}

        {/* Amount & Parameters with enlarged inputs */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs sm:text-sm text-slate-700 font-semibold">Amount (INR)</label>
            <input 
              type="number" 
              value={formData.amount} 
              onChange={e => setFormData({ ...formData, amount: e.target.value })} 
              placeholder="e.g. 4500" 
              className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold" 
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-slate-700 font-semibold">Velocity (10m)</label>
            <input 
              type="number" 
              value={formData.velocity_last_10m} 
              onChange={e => setFormData({ ...formData, velocity_last_10m: e.target.value })} 
              placeholder="1" 
              className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold" 
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-slate-700 font-semibold">Device Risk (0-1)</label>
            <input 
              type="number" 
              step="0.05" 
              value={formData.device_risk_score} 
              onChange={e => setFormData({ ...formData, device_risk_score: e.target.value })} 
              placeholder="0.1" 
              className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs sm:text-sm text-slate-700 font-semibold">Location Shift (km)</label>
            <input 
              type="number" 
              value={formData.geo_distance_km} 
              onChange={e => setFormData({ ...formData, geo_distance_km: e.target.value })} 
              placeholder="e.g. 3" 
              className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold" 
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-slate-700 font-semibold">Beneficiary History</label>
            <select 
              value={formData.is_new_payee} 
              onChange={e => setFormData({ ...formData, is_new_payee: e.target.value })} 
              className="w-full bg-slate-50 border border-slate-300 px-3 py-2 rounded-lg text-sm mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
            >
              <option value="0">Known Beneficiary</option>
              <option value="1">First-Time Beneficiary</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm sm:text-base transition flex items-center justify-center gap-2 mt-3 shadow-md shadow-blue-600/20"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Evaluating Model Telemetry...' : 'Dispatch Payment Telemetry'}
        </button>
      </form>

      {/* Result Card */}
      {result && (
        <div className={`mt-5 p-4 rounded-xl border text-sm ${
          result.decision === 'BLOCK' ? 'bg-rose-50 border-rose-200 text-rose-900' :
          result.decision === 'OTP_CHALLENGE' ? 'bg-amber-50 border-amber-200 text-amber-900' :
          'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <div className="flex items-center justify-between font-extrabold text-base">
            <span className="flex items-center gap-2">
              {result.decision === 'BLOCK' && <ShieldAlert className="w-5 h-5 text-rose-600" />}
              {result.decision === 'OTP_CHALLENGE' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
              {result.decision === 'ALLOW' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
              Decision: {result.decision}
            </span>
            <span>Risk Score: {result.riskScore}%</span>
          </div>
          <p className="text-xs sm:text-sm mt-2 text-slate-700 font-medium">{result.decisionReason}</p>
        </div>
      )}
    </div>
  );
}
