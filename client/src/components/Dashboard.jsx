import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ShieldCheck, ShieldAlert, AlertTriangle, Activity, Smartphone, Building2, AtSign, FileText } from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import CyberDossierModal from './CyberDossierModal';

export default function Dashboard() {
  const [feed, setFeed] = useState([]);
  const [stats, setStats] = useState({ total: 0, blocked: 0, challenged: 0, allowed: 0 });
  const [selectedDossierTxn, setSelectedDossierTxn] = useState(null);

  useEffect(() => {
    const socket = io(API_BASE_URL);

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

  const getMethodBadge = (receiver) => {
    if (!receiver) return null;
    if (receiver.includes('A/C')) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
          <Building2 className="w-2.5 h-2.5 text-slate-500" /> Account
        </span>
      );
    }
    if (/^\d{10}@/.test(receiver) || receiver.startsWith('+91')) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
          <Smartphone className="w-2.5 h-2.5 text-blue-500" /> Mobile
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
        <AtSign className="w-2.5 h-2.5 text-slate-500" /> VPA
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 text-slate-800 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Live Stream Interception Table
          </h2>
          <p className="text-[11px] text-slate-500">Real-time telemetry stream via WebSocket</p>
        </div>
        <span className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded font-medium border border-slate-200">
          Stream Online
        </span>
      </div>

      {/* Metric summary counters */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
          <span className="text-[11px] text-slate-500 font-medium">Scanned</span>
          <p className="text-xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="bg-emerald-50/70 p-2.5 rounded border border-emerald-200">
          <span className="text-[11px] text-emerald-700 font-medium">Approved</span>
          <p className="text-xl font-bold text-emerald-700">{stats.allowed}</p>
        </div>
        <div className="bg-amber-50/70 p-2.5 rounded border border-amber-200">
          <span className="text-[11px] text-amber-800 font-medium">Challenged</span>
          <p className="text-xl font-bold text-amber-800">{stats.challenged}</p>
        </div>
        <div className="bg-rose-50/70 p-2.5 rounded border border-rose-200">
          <span className="text-[11px] text-rose-700 font-medium">Blocked</span>
          <p className="text-xl font-bold text-rose-700">{stats.blocked}</p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto max-h-[360px] overflow-y-auto border border-slate-200 rounded">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 sticky top-0 border-b border-slate-200">
            <tr>
              <th className="py-2 px-3 font-semibold">TXN ID</th>
              <th className="py-2 px-3 font-semibold">Channel</th>
              <th className="py-2 px-3 font-semibold">Sender ➔ Receiver</th>
              <th className="py-2 px-3 font-semibold">Amount</th>
              <th className="py-2 px-3 font-semibold">Risk</th>
              <th className="py-2 px-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {feed.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-slate-400 text-xs">
                  Awaiting transactions. Dispatch a payment on the left to review telemetry.
                </td>
              </tr>
            ) : (
              feed.map((t) => (
                <tr key={t.txnId} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono text-slate-700 text-[11px]">{t.txnId}</td>
                  <td className="p-3">{getMethodBadge(t.receiverVpa)}</td>
                  <td className="p-3 font-mono text-slate-600 text-[11px]">
                    {t.senderVpa} <span className="text-slate-400">➔</span> {t.receiverVpa}
                  </td>
                  <td className="p-3 font-semibold text-slate-900">₹{t.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                      t.riskScore >= 75 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      t.riskScore >= 40 ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {t.riskScore}%
                    </span>
                  </td>
                  <td className="p-3 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      {t.decision === 'BLOCK' && <span className="text-rose-600 font-bold">Blocked</span>}
                      {t.decision === 'OTP_CHALLENGE' && <span className="text-amber-700 font-bold">Challenge</span>}
                      {t.decision === 'ALLOW' && <span className="text-emerald-600 font-bold">Approved</span>}
                      {t.decision !== 'ALLOW' && (
                        <button
                          onClick={() => setSelectedDossierTxn(t)}
                          title="Generate Cybercrime FIR Dossier (1930 / NCRP)"
                          className="p-1 hover:bg-slate-200 rounded text-slate-600 hover:text-rose-700 transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Incident Evidence Dossier Modal */}
      {selectedDossierTxn && (
        <CyberDossierModal
          txn={selectedDossierTxn}
          onClose={() => setSelectedDossierTxn(null)}
        />
      )}
    </div>
  );
}
