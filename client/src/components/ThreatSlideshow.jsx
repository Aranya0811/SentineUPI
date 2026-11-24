import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Radio, Smartphone, AlertTriangle, 
  ChevronLeft, ChevronRight, CheckCircle2 
} from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Mule Account Ring Attacks',
    category: 'VPA Sybil Attacks',
    badge: 'Critical Anomaly',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Attackers siphon stolen funds across newly activated dummy UPI accounts within minutes to circumvent daily bank transaction velocity limits.',
    defenseStrategy: 'SentinelUPI tracks payee novelty velocity (amount_to_avg_ratio + is_new_payee) and automatically issues an instant step-up challenge before money dispersion.',
    stats: {
      detectionRate: '99.4%',
      riskCategory: 'High Volume Burst',
      avgLossPrevented: '₹4.2 Lakhs'
    },
    icon: ShieldAlert
  },
  {
    id: 2,
    title: 'Impossible Travel & Location Teleportation',
    category: 'Geographic Deviations',
    badge: 'High Anomaly',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'A transaction is originated from Bangalore and another from Delhi within 4 minutes on the same VPA, proving credential theft or remote desktop proxy.',
    defenseStrategy: 'Calculates physical speed vector between GPS/IP coordinates. Any speed over 800 km/h trips the deterministic rule gate directly to Block status.',
    stats: {
      detectionRate: '100%',
      riskCategory: 'Credential Compromise',
      avgLossPrevented: '₹1.8 Lakhs'
    },
    icon: Radio
  },
  {
    id: 3,
    title: 'SIM Swap & Device Hardware Hijack',
    category: 'Hardware Compromise',
    badge: 'Elevated Anomaly',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    description: 'SIM card cloning combined with rooted Android emulators allowing scammers to bypass standard SMS OTP verification seamlessly.',
    defenseStrategy: 'Hardware attestation checks + Device Risk Score beta distribution analyzes emulator fingerprints, VPN exit nodes, and sudden IMEI discrepancies.',
    stats: {
      detectionRate: '98.7%',
      riskCategory: 'Emulator Spoofing',
      avgLossPrevented: '₹95,000'
    },
    icon: Smartphone
  },
  {
    id: 4,
    title: 'Reverse QR Code Social Engineering',
    category: 'Phishing Vectors',
    badge: 'Standard Anomaly',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    description: 'Victims are asked to scan a QR code or enter their UPI PIN under the false pretext of receiving lottery rewards or marketplace payments.',
    defenseStrategy: 'Behavioral profiling detects unexpected collect-request authorizations at unusual hours (1:00 AM - 4:00 AM) and triggers step-up OTP prompts.',
    stats: {
      detectionRate: '97.2%',
      riskCategory: 'Social Engineering',
      avgLossPrevented: '₹35,000'
    },
    icon: AlertTriangle
  }
];

export default function ThreatSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = slides[current];
  const IconComponent = slide.icon;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider">
            Threat Intelligence Report
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Real-World UPI Attack Vectors & Countermeasures
          </h2>
        </div>

        {/* Navigation arrows */}
        <div className="flex gap-1.5">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-1.5 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="p-1.5 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm"
      >
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Details */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${slide.badgeColor}`}>
                {slide.badge}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {slide.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <IconComponent className="w-5 h-5 text-blue-600" />
              {slide.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {slide.description}
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[11px] font-semibold text-slate-900 block mb-1">
                Defense Policy Countermeasure:
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {slide.defenseStrategy}
              </p>
            </div>
          </div>

          {/* Telemetry specs */}
          <div className="md:col-span-4 bg-slate-50 border border-slate-200 p-4 rounded space-y-3">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block pb-2 border-b border-slate-200">
              Vector Telemetry
            </span>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Interception Precision</span>
                <span className="font-semibold text-emerald-700">{slide.stats.detectionRate}</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full" 
                  style={{ width: slide.stats.detectionRate }}
                />
              </div>
            </div>

            <div className="pt-1">
              <span className="text-[11px] text-slate-500">Classification</span>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">{slide.stats.riskCategory}</p>
            </div>

            <div className="pt-1">
              <span className="text-[11px] text-slate-500">Prevented Value (Avg.)</span>
              <p className="text-sm font-bold text-blue-700 mt-0.5">{slide.stats.avgLossPrevented}</p>
            </div>
          </div>

        </div>

        {/* Indicators */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-2.5 flex items-center justify-between">
          <div className="flex gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded transition-all ${
                  current === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            Vector {current + 1} of {slides.length}
          </span>
        </div>

      </div>
    </div>
  );
}
