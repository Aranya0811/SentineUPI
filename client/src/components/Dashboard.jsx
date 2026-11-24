import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ShieldCheck, ShieldAlert, AlertTriangle, Activity } from 'lucide-react';

export default function Dashboard() {
  const [feed, setFeed] = useState([]);
  const [stats, setStats] = useState({ total: 0, blocked: 0, challenged: 0, allowed: 0 });

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('new_transaction', (txn) => {
      setFeed((prev) => [txn, ...prev.slice(0, 19)]);
      setStats((prev) => ({
        total: prev.total + 1,
        blocked: txn.decision === 'BLOCK' ? prev.blocked + 1 : prev.blocked,
        challenged: txn.decision === 'OTP_CHALLENGE' ? prev.challenged + 1 : prev.challenged,
        allowed: txn.decision === 'ALLOW' ? prev.allowed + 1 : prev.allowed
      }));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl text-white">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
          <Activity className="w-5 h-5 animate-pulse text-red-500" />
          Real-Time SOC Threat Monitor
        </h2>
        <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">Socket: Live Feed</span>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
          <p className="text-xs text-slate-400">Total Scanned</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-emerald-950/30 p-3 rounded border border-emerald-500/30 text-center">
          <p className="text-xs text-emerald-400">Allowed</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.allowed}</p>
        </div>
        <div className="bg-amber-950/30 p-3 rounded border border-amber-500/30 text-center">
          <p className="text-xs text-amber-400">Challenged</p>
          <p className="text-2xl font-bold text-amber-400">{stats.challenged}</p>
        </div>
        <div className="bg-rose-950/30 p-3 rounded border border-rose-500/30 text-center">
          <p className="text-xs text-rose-400">Blocked</p>
          <p className="text-2xl font-bold text-rose-400">{stats.blocked}</p>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 sticky top-0">
            <tr>
              <th className="p-2">TXN ID</th>
              <th className="p-2">Sender ➔ Receiver</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Risk</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {feed.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-500">Waiting for incoming UPI stream...</td>
              </tr>
            ) : (
              feed.map((t) => (
                <tr key={t.txnId} className="hover:bg-slate-800/40 transition">
                  <td className="p-2 font-mono text-slate-300">{t.txnId}</td>
                  <td className="p-2 font-mono text-slate-400">{t.senderVpa} <span className="text-cyan-400">➔</span> {t.receiverVpa}</td>
                  <td className="p-2 font-semibold">₹{t.amount.toLocaleString('en-IN')}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      t.riskScore >= 75 ? 'bg-rose-900 text-rose-200' :
                      t.riskScore >= 40 ? 'bg-amber-900 text-amber-200' :
                      'bg-emerald-900 text-emerald-200'
                    }`}>
                      {t.riskScore}%
                    </span>
                  </td>
                  <td className="p-2 font-bold">
                    {t.decision === 'BLOCK' && <span className="text-rose-400">🚫 BLOCKED</span>}
                    {t.decision === 'OTP_CHALLENGE' && <span className="text-amber-400">⚠️ CHALLENGE</span>}
                    {t.decision === 'ALLOW' && <span className="text-emerald-400">✅ APPROVED</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
