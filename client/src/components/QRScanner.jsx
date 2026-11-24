import React, { useState } from 'react';
import axios from 'axios';
import { QrCode, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function QRScanner() {
  const [uriInput, setUriInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const presets = [
    {
      label: 'Fake Electricity Bill Scam',
      type: 'threat',
      uri: 'upi://pay?pa=electricity_bill_update@ybl&pn=State%20Electricity%20Board&am=1850&cu=INR&tn=Immediate%20Bill%20Clearance%20Before%20Disconnection'
    },
    {
      label: 'OLX "Receive Money" Scam',
      type: 'threat',
      uri: 'upi://pay?pa=mule_ring_99@ybl&pn=Buyer%20Advance%20Refund&am=5000&cu=INR&tn=Enter%20UPI%20PIN%20to%20Receive%20Money%20in%20Account'
    },
    {
      label: 'Customer Care Impersonation',
      type: 'threat',
      uri: 'upi://pay?pa=fake_support_refund@oksbi&pn=SBI%20Card%20Support&am=25000&cu=INR&tn=Security%20Refund%20Validation'
    },
    {
      label: 'Legitimate Merchant QR',
      type: 'safe',
      uri: 'upi://pay?pa=merchant9482@icici&pn=Blue%20Tokai%20Coffee&mc=5499&tr=REF849201&cu=INR&am=380'
    }
  ];

  const handleScan = async (targetUri) => {
    const uriToEvaluate = targetUri || uriInput;
    if (!uriToEvaluate) return;

    setLoading(true);
    setAnalysis(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/scan/upi-intent`, {
        uri: uriToEvaluate
      });
      setAnalysis(res.data);
    } catch (err) {
      alert('QR Forensic Engine error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (presetUri) => {
    setUriInput(presetUri);
    handleScan(presetUri);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-800 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-slate-200 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              UPI Intent & QR Forensic Inspector
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                Deep-Link Analyzer
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Decode payment QR payloads, evaluate collect-request spoofing, and verify merchant authenticity
            </p>
          </div>
        </div>

        {/* Live status badge */}
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
          NPCI Standard v2.0
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="mb-4">
        <label className="text-xs text-slate-600 font-bold block mb-1.5">
          Load Pre-Configured Test Scenarios:
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadPreset(p.uri)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                p.type === 'safe'
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
              }`}
            >
              {p.type === 'safe' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="space-y-3">
        <div>
          <label className="text-xs sm:text-sm text-slate-700 font-bold block mb-1">
            Raw UPI URI or Scanned QR String:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={uriInput}
              onChange={(e) => setUriInput(e.target.value)}
              placeholder="e.g. upi://pay?pa=merchant@icici&pn=Shop&am=500&cu=INR"
              className="flex-1 bg-slate-50 border border-slate-300 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-semibold"
            />
            <button
              type="submit"
              disabled={loading || !uriInput.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-lg text-xs sm:text-sm transition flex items-center gap-2 shadow-sm"
            >
              {loading ? 'Analyzing...' : 'Inspect Payload'}
            </button>
          </div>
        </div>
      </form>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fadeIn">
          {/* Result Banner */}
          <div className={`p-4 flex items-center justify-between text-sm ${
            analysis.riskLevel === 'CRITICAL_THREAT' ? 'bg-rose-600 text-white' :
            analysis.riskLevel === 'SUSPICIOUS' ? 'bg-amber-500 text-slate-950 font-bold' :
            'bg-emerald-600 text-white'
          }`}>
            <div className="flex items-center gap-2.5 font-black text-base">
              {analysis.riskLevel === 'CRITICAL_THREAT' && <ShieldAlert className="w-6 h-6 text-white" />}
              {analysis.riskLevel === 'SUSPICIOUS' && <AlertTriangle className="w-6 h-6 text-slate-950" />}
              {analysis.riskLevel === 'SAFE' && <ShieldCheck className="w-6 h-6 text-white" />}
              <span>Forensic Result: {analysis.riskLevel}</span>
            </div>
            <span className="text-xs sm:text-sm font-black px-2.5 py-1 rounded bg-black/20">
              Risk Score: {analysis.riskScore}%
            </span>
          </div>

          <div className="p-5 bg-white space-y-4">
            {/* Parsed Parameter Grid */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Decoded UPI Parameters
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-400 block text-[10px] font-semibold">Payee VPA (pa)</span>
                  <span className="font-mono font-bold text-slate-900 break-all">{analysis.parsed?.payeeVpa || 'None'}</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-400 block text-[10px] font-semibold">Claimed Display Name (pn)</span>
                  <span className="font-bold text-slate-900">{analysis.parsed?.payeeName}</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-400 block text-[10px] font-semibold">Merchant Code (mc)</span>
                  <span className="font-bold text-slate-900">{analysis.parsed?.merchantCode}</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-400 block text-[10px] font-semibold">Embedded Amount (am)</span>
                  <span className="font-bold text-slate-900">{analysis.parsed?.amount}</span>
                </div>
              </div>
            </div>

            {/* Forensic Findings */}
            {analysis.findings && analysis.findings.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Detected Forensic Anomalies & Violations ({analysis.findings.length})
                </h4>
                <div className="space-y-1.5">
                  {analysis.findings.map((f, i) => (
                    <div key={i} className="text-xs p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 font-medium">
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Protective Action Recommendations
                </h4>
                <div className="space-y-1">
                  {analysis.recommendations.map((r, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">&bull;</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
