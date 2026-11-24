import React from 'react';
import { ShieldCheck, Cpu, Database, Activity, Mail, Linkedin, Github, ExternalLink, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="py-6 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider">
          System Architecture & Standards
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">
          Multi-Tiered Fraud Detection Framework
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Engineered for high-throughput digital switches, processing transactions through deterministic heuristic filters before machine learning model evaluation.
        </p>
      </div>

      {/* 3 Pipeline stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
          <span className="text-[11px] font-mono text-blue-700 font-bold">Tier 1: &lt; 5ms</span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">Heuristic Velocity Filter</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Deterministic pre-filters screen impossible travel speed (&gt;800 km/h), velocity spikes (&gt;5 attempts in 10 minutes), and known blacklisted VPA hashes.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
          <span className="text-[11px] font-mono text-blue-700 font-bold">Tier 2: &lt; 20ms</span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">XGBoost ML Classifier</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Microservice analyzes normalized seven-dimensional behavioral vectors (amount ratios, odd-hour timing, payee history, device trust index) to output fraud probability.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
          <span className="text-[11px] font-mono text-blue-700 font-bold">Tier 3: Real-Time</span>
          <h3 className="text-sm font-bold text-slate-900 mt-1">Policy Action & Telemetry</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Transactions scoring 40–74% require stepped-up authentication (OTP/Biometric), while critical threats (&gt;75%) are blocked and pushed to the SOC table via WebSockets.
          </p>
        </div>

      </div>

      {/* Regulatory & Security Compliance */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Regulatory Compliance & Banking Integration
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-xs font-bold text-slate-800">RBI Master Directions</span>
            <p className="text-[11px] text-slate-600 mt-1">Adheres to digital payment security guidelines and risk-based step-up authentication.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-xs font-bold text-slate-800">NPCI UPI 2.0 Protocol</span>
            <p className="text-[11px] text-slate-600 mt-1">Compatible with standard virtual payment address (VPA) switches and PSP APIs.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-xs font-bold text-slate-800">Data Minimization</span>
            <p className="text-[11px] text-slate-600 mt-1">End-to-end tokenization; no banking PINs or plaintext credentials logged in database.</p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-xs font-bold text-slate-800">Explainable Decisions</span>
            <p className="text-[11px] text-slate-600 mt-1">Every flagged transaction generates human-readable audit reasons for bank compliance teams.</p>
          </div>
        </div>
      </div>

      {/* Project Team & Engineering Contacts */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 gap-2">
          <div>
            <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider">
              Project Leadership & Research Team
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Connect with the SentinelUPI Developers
            </h3>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto font-medium">
            Open for Technical Collaboration
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Lead Engineer Card */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Lead System & ML Engineer</span>
                <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  Project Author
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Core architect of SentinelUPI's sub-35ms pipeline, heuristic velocity gates, and XGBoost anomaly detection model.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80">
              <a
                href="mailto:shekharanand281@gmail.com"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:border-blue-300 transition shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" /> Email
              </a>
              <a
                href="https://www.linkedin.com/in/divit-pandey-768650381/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:border-blue-300 transition shadow-sm"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn
              </a>
              <a
                href="https://github.com/AryanSingh1938/SentinelUPI"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:border-blue-300 transition shadow-sm"
              >
                <Github className="w-3.5 h-3.5 text-slate-800" /> GitHub
              </a>
            </div>
          </div>

          {/* Research & Security Liaison Card */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Research & Security Liaison</span>
                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Compliance
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Oversees compliance with RBI payment security standards, NPCI switch protocol interoperability, and continuous retraining telemetry.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80">
              <a
                href="mailto:shekharanand281@gmail.com"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:border-blue-300 transition shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" /> Security Inquiries
              </a>
              <a
                href="https://www.linkedin.com/in/divit-pandey-768650381/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:border-blue-300 transition shadow-sm"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" /> Network
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
