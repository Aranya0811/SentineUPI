import React, { useState } from 'react';
import axios from 'axios';
import { Send, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function Simulator() {
  const [formData, setFormData] = useState({
    senderVpa: 'user@okhdfcbank',
    receiverVpa: 'merchant@paytm',
    amount: '4500',
    velocity_last_10m: '1',
    amount_to_avg_ratio: '1.2',
    is_new_payee: '0',
    geo_distance_km: '3',
    device_risk_score: '0.1'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/api/transactions/process', formData);
      setResult(res.data.transaction);
    } catch (err) {
      alert('Failed to connect to backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-white">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
          <span>⚡</span> UPI Payment Simulator
        </h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => applyPreset('normal')} className="text-xs bg-emerald-950 border border-emerald-500/30 text-emerald-300 px-2 py-1 rounded hover:bg-emerald-900">Normal</button>
          <button type="button" onClick={() => applyPreset('suspicious')} className="text-xs bg-amber-950 border border-amber-500/30 text-amber-300 px-2 py-1 rounded hover:bg-amber-900">OTP Challenge</button>
          <button type="button" onClick={() => applyPreset('criticalFraud')} className="text-xs bg-rose-950 border border-rose-500/30 text-rose-300 px-2 py-1 rounded hover:bg-rose-900">Mule Burst</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400">Sender UPI ID</label>
            <input type="text" value={formData.senderVpa} onChange={e => setFormData({ ...formData, senderVpa: e.target.value })} className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded text-sm mt-1 focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Receiver UPI ID</label>
            <input type="text" value={formData.receiverVpa} onChange={e => setFormData({ ...formData, receiverVpa: e.target.value })} className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded text-sm mt-1 focus:outline-none focus:border-cyan-500" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-400">Amount (INR)</label>
            <input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Velocity (10 min)</label>
            <input type="number" value={formData.velocity_last_10m} onChange={e => setFormData({ ...formData, velocity_last_10m: e.target.value })} className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Device Risk (0-1)</label>
            <input type="number" step="0.05" value={formData.device_risk_score} onChange={e => setFormData({ ...formData, device_risk_score: e.target.value })} className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded text-sm mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400">Distance Shift (km)</label>
            <input type="number" value={formData.geo_distance_km} onChange={e => setFormData({ ...formData, geo_distance_km: e.target.value })} className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded text-sm mt-1" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Is New Payee?</label>
            <select value={formData.is_new_payee} onChange={e => setFormData({ ...formData, is_new_payee: e.target.value })} className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded text-sm mt-1">
              <option value="0">No (Known Beneficiary)</option>
              <option value="1">Yes (First-time VPA)</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded font-semibold text-sm transition flex items-center justify-center gap-2">
          <Send className="w-4 h-4" />
          {loading ? 'Analyzing with Defense ML...' : 'Dispatch UPI Payment'}
        </button>
      </form>

      {result && (
        <div className={`mt-5 p-4 rounded-lg border ${
          result.decision === 'BLOCK' ? 'bg-rose-950/40 border-rose-500/50 text-rose-200' :
          result.decision === 'OTP_CHALLENGE' ? 'bg-amber-950/40 border-amber-500/50 text-amber-200' :
          'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-2">
              {result.decision === 'BLOCK' && <ShieldAlert className="w-5 h-5 text-rose-400" />}
              {result.decision === 'OTP_CHALLENGE' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {result.decision === 'ALLOW' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
              Decision: {result.decision}
            </span>
            <span className="text-lg">Risk: {result.riskScore}%</span>
          </div>
          <p className="text-xs mt-2 text-slate-300">{result.decisionReason}</p>
        </div>
      )}
    </div>
  );
}
