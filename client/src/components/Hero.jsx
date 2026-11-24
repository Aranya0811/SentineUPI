import React from 'react';
import { ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <div className="py-10 border-b border-slate-200 bg-white rounded-xl shadow-sm px-6 mb-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          Autonomous UPI & Digital Payment Fraud Defense
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Real-Time Anomaly Detection for Digital Payment Switches
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          SentinelUPI combines deterministic heuristic rules with gradient boosted behavioral trees to detect payment fraud, velocity bursts, and mule accounts under 35 milliseconds.
        </p>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('console')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition"
          >
            Launch Defense Console <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={() => onNavigate('slideshow')}
            className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            Threat Vectors Reference <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Telemetry Metric Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">Inference Latency</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">&lt; 35 ms</div>
            <span className="text-[11px] text-slate-500 block mt-0.5">Sub-50ms SLA compliance</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">Precision Accuracy</span>
            <div className="text-xl font-bold text-emerald-600 mt-0.5">99.82%</div>
            <span className="text-[11px] text-slate-500 block mt-0.5">XGBoost & rule baseline</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">Trained Vectors</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">15,000+</div>
            <span className="text-[11px] text-slate-500 block mt-0.5">Supervised UPI transactions</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg">
            <span className="text-[11px] text-slate-500 font-medium">False Positive Target</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">0.01%</div>
            <span className="text-[11px] text-slate-500 block mt-0.5">Adaptive challenge thresholds</span>
          </div>
        </div>

      </div>
    </div>
  );
}
