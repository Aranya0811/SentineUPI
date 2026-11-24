import React, { useState } from 'react';
import { ShieldAlert, FileText, Download, Check, X, Shield, Building, Clock, MapPin } from 'lucide-react';

export default function CyberDossierModal({ txn, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!txn) return null;

  const incidentRef = 'NCRP-FIR-' + (txn.txnId || Date.now().toString().slice(-6));
  const reportDate = txn.timestamp ? new Date(txn.timestamp).toLocaleString('en-IN') : new Date().toLocaleString('en-IN');

  const formattedText = `========================================================================
NATIONAL CYBERCRIME REPORTING PORTAL (NCRP / HELPLINE 1930)
CITIZEN FINANCIAL CYBER FRAUD REPORTING AND MANAGEMENT SYSTEM (CFCFRMS)
INCIDENT TELEMETRY DOSSIER & EVIDENCE RECORD
========================================================================

INCIDENT REFERENCE ID : ${incidentRef}
GENERATION TIMESTAMP  : ${reportDate}
CLASSIFICATION        : HIGH-PRIORITY DIGITAL PAYMENT FRAUD INTERCEPTION
DEFENSE ENGINE        : SentinelUPI Forensic Pipeline v2.0

------------------------------------------------------------------------
1. TRANSACTION DETAILS & FORENSICS:
------------------------------------------------------------------------
* Transaction Reference ID : ${txn.txnId}
* Channel Type             : UPI P2P / Intent Transfer
* Payer / Sender VPA       : ${txn.senderVpa}
* Payee / Beneficiary VPA  : ${txn.receiverVpa}
* Amount Debited           : INR ${txn.amount?.toLocaleString('en-IN')}
* Risk Score Computed      : ${txn.riskScore}%
* Defense Action Enforced  : ${txn.decision}
* Primary Violation Reason : ${txn.decisionReason}

------------------------------------------------------------------------
2. RISK DRIVERS & ANOMALIES DETECTED:
------------------------------------------------------------------------
* Velocity (Last 10 Min)   : ${txn.velocity || 1} transactions
* Device Risk Index        : ${txn.deviceRiskScore || '0.10'} (Range: 0.0 - 1.0)
${txn.muleRecord ? `* NCRP Blacklist Record    : YES (${txn.muleRecord.firReference}) - ${txn.muleRecord.category}` : '* NCRP Blacklist Record    : Clean / Unlisted prior to this event'}

------------------------------------------------------------------------
3. STATUTORY ACTION ITEMS FOR BENEFICIARY PSP & LAW ENFORCEMENT:
------------------------------------------------------------------------
1. Immediate lien/temporary debit freeze on beneficiary VPA: ${txn.receiverVpa}
2. Preservation of IP logs, IMEI, and device binding logs under Section 91 CrPC / Section 79A IT Act.
3. Automated integration payload ready for 1930 Cyber Fraud Helpline ingestion.

========================================================================
ELECTRONIC SIGNATURE: AUTONOMOUS SENTINEL-UPI TELEMETRY LOG
NPCI / CERT-IN COMPLIANT FORMAT
========================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${incidentRef}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight flex items-center gap-2">
                Cybercrime FIR Evidence Dossier
                <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                  Form 1930 / NCRP
                </span>
              </h3>
              <p className="text-xs text-slate-400">Incident Reference: {incidentRef}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-center justify-between">
            <span className="font-semibold">
              Status: Transaction Intercepted &bull; Action: <strong className="uppercase">{txn.decision}</strong>
            </span>
            <span className="font-mono font-bold text-rose-700">Risk: {txn.riskScore}%</span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-4 font-mono text-[11px] leading-relaxed text-slate-800 whitespace-pre-wrap max-h-[340px] overflow-y-auto">
            {formattedText}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Compliant with Citizen Financial Cyber Fraud Reporting System (CFCFRMS)
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <FileText className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard' : 'Copy Dossier'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" /> Download Official FIR File (.txt)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
