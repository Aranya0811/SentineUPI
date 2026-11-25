import React from 'react';
import { Shield, ExternalLink, Github, Linkedin, Mail, Phone, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 mt-auto">
      { }
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">

          { }
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-900/30">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Sentinel<span className="text-blue-500">UPI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Autonomous real-time digital payment defense framework. Combines sub-5ms deterministic heuristic velocity gates with XGBoost gradient-boosted behavioral models to safeguard UPI rails.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono text-slate-300">Defense Pipeline Online &middot; Sub-35ms SLA</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('console')} className="hover:text-white transition">
                  Defense Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qr-scanner')} className="hover:text-white transition">
                  QR Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('threats')} className="hover:text-white transition">
                  Threat Intel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Industry & Regulatory References */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Official References
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.rbi.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1 group"
                >
                  <span>RBI Cyber Security Framework</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npci.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1 group"
                >
                  <span>NPCI UPI 2.0 Rails Standards</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.cert-in.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1 group"
                >
                  <span>CERT-In Financial Incident Mandate</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
                </a>
              </li>
              <li>
                <span className="text-slate-500 block">ISO 20022 Financial Messaging</span>
              </li>
              <li>
                <span className="text-slate-500 block">Zero-Trust Account Verification</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Engineering & Technical Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Developer & Security
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/AryanSingh1938/SentinelUPI"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 text-slate-300" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/divit-pandey-768650381/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Network</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:shekharanand281@gmail.com"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-300" />
                  <span>Security Inquiries</span>
                </a>
              </li>
              <li>
                <span className="text-slate-500 block">FastAPI ML Endpoint (/predict)</span>
              </li>
              <li>
                <span className="text-slate-500 block">Socket.IO Live Threat Stream</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 <strong className="text-slate-300 font-semibold">SentinelUPI Project</strong>. All rights reserved. Built for high-frequency digital payment fraud interception.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> NPCI Interoperable
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-blue-400" /> Zero-PII Tokenized
            </span>
            <span className="text-slate-600">&bull;</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-200">
              Security Disclosure
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
