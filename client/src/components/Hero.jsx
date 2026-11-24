import React from 'react';
import { ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <div className="py-12 border-b border-slate-200 bg-white rounded-xl shadow-sm px-6 sm:px-10 mb-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold mb-5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Autonomous UPI & Digital Payment Fraud Defense
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Real-Time Anomaly Detection for Digital Payment Switches
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          SentinelUPI combines deterministic heuristic rules with gradient boosted behavioral trees to detect payment fraud, velocity bursts, and mule accounts under 35 milliseconds.
        </p>

        {/* Action buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => onNavigate('console')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold text-sm sm:text-base shadow-sm flex items-center gap-2 transition"
          >
            Launch Defense Console <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onNavigate('threats')}
            className="px-6 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold text-sm sm:text-base transition flex items-center gap-2 shadow-sm"
          >
            Threat Vectors Reference <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Telemetry Metric Cards with enlarged values */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs sm:text-sm text-slate-500 font-semibold">Inference Latency</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">&lt; 35 ms</div>
            <span className="text-xs text-slate-500 block mt-1">Sub-50ms SLA compliance</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs sm:text-sm text-slate-500 font-semibold">Precision Accuracy</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">99.82%</div>
            <span className="text-xs text-slate-500 block mt-1">XGBoost & rule baseline</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs sm:text-sm text-slate-500 font-semibold">Trained Vectors</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">15,000+</div>
            <span className="text-xs text-slate-500 block mt-1">Supervised UPI transactions</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-xs sm:text-sm text-slate-500 font-semibold">False Positive Target</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">0.01%</div>
            <span className="text-xs text-slate-500 block mt-1">Adaptive challenge thresholds</span>
          </div>
        </div>

      </div>
    </div>
  );
}
