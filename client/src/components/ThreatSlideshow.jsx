import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, ChevronLeft, ChevronRight, CheckCircle2, ShieldAlert
} from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Autonomous Payment Guard vs Intrusion',
    category: 'Gateway Security Architecture',
    badge: 'Active Defense',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    image: '/images/slide1-cyber-defense.jpg',
    imageAlt: 'UPI Cyber Security Lock vs Hacker',
    description: 'Continuous gateway monitoring isolating malicious intrusion attempts, preventing rogue debits across linked bank accounts and payment cards.',
    defenseStrategy: 'Device hardware attestation and session token integrity checks isolate unauthorized access attempts instantly.',
    stats: {
      detectionRate: '99.8%',
      riskCategory: 'Intrusion Defense',
      action: 'Automatic Token Revocation'
    }
  },
  {
    id: 2,
    title: 'Comprehensive Matrix of UPI Scams',
    category: 'Threat Taxonomy & Patterns',
    badge: 'Universal Coverage',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    image: '/images/slide2-types-of-scams.jpg',
    imageAlt: 'Types of UPI Scams: App Cloning, SIM Cloning, Phishing, QR Tampering',
    description: 'Full-spectrum detection covering App Cloning, SIM Duplication, Deceiving VPAs, QR Tampering, Phishing, Vishing, and Fraudulent Merchant Rings.',
    defenseStrategy: 'Heuristic velocity screening filters out burst transactions, while XGBoost scores seven-dimensional behavioral vectors.',
    stats: {
      detectionRate: '99.4%',
      riskCategory: 'Multi-Vector Radar',
      action: 'Multi-Tiered Flagging'
    }
  },
  {
    id: 3,
    title: 'PIN Harvesting & Social Engineering Traps',
    category: 'Phishing & Collect Exploits',
    badge: 'High Severity',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    image: '/images/slide3-pin-warning.jpg',
    imageAlt: 'UPI PIN Phishing Warning on Smartphone',
    description: 'Scammers posing as buyers broadcast deceptive "Collect" payment requests, tricking victims into typing their confidential 4 or 6-digit UPI PIN.',
    defenseStrategy: 'Reversal anomaly detection flags sudden incoming collect requests at odd hours and applies step-up challenges.',
    stats: {
      detectionRate: '98.9%',
      riskCategory: 'Collect Phishing',
      action: 'Adaptive Step-Up Challenge'
    }
  },
  {
    id: 4,
    title: 'Verified Zero-Risk Digital Settlement',
    category: 'Clean Digital Payments',
    badge: 'Verified Clean',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: '/images/slide4-verified-safe.jpg',
    imageAlt: 'Payment Successful on Smartphone',
    description: 'Legitimate consumer and merchant transactions processed in under 35 milliseconds with zero user friction and trusted payee confidence.',
    defenseStrategy: 'Trusted beneficiary recognition and low device-risk baseline permits frictionless instant approval.',
    stats: {
      detectionRate: '99.9%',
      riskCategory: 'Approved Settlement',
      action: 'Frictionless Fast-Path'
    }
  }
];

export default function ThreatSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = slides[current];

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-200 gap-3">
        <div>
          <span className="text-xs uppercase font-extrabold text-blue-600 tracking-wider">
            Threat Intelligence & Visual Reference
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Visual Guide to UPI Fraud Vectors & Countermeasures
          </h2>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition shadow-sm"
            title="Previous vector"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-bold text-slate-700 px-2 font-mono">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition shadow-sm"
            title="Next vector"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
      >
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Infographic Image */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-3 flex items-center justify-center overflow-hidden max-h-[340px]">
            <img 
              src={slide.image} 
              alt={slide.imageAlt}
              className="w-full h-full max-h-[310px] object-contain rounded-lg transition-transform duration-500 hover:scale-102"
            />
          </div>

          {/* Right: Details & Telemetry with Enlarged Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded text-xs font-bold border ${slide.badgeColor}`}>
                {slide.badge}
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider">
                {slide.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {slide.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {slide.description}
            </p>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-slate-900 block mb-1">
                Sentinel Defense Countermeasure:
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {slide.defenseStrategy}
              </p>
            </div>

            {/* Quick Metrics Line */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-sm">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Precision Rate</span>
                <span className="text-base font-extrabold text-emerald-700">{slide.stats.detectionRate}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Classification</span>
                <span className="text-sm font-bold text-slate-900">{slide.stats.riskCategory}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Interception Action</span>
                <span className="text-sm font-bold text-blue-700">{slide.stats.action}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Thumbnail Selector Bar with Larger Text */}
        <div className="bg-slate-50 border-t border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrent(idx)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm font-bold transition border ${
                  current === idx
                    ? 'bg-white text-blue-700 border-blue-200 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${current === idx ? 'bg-blue-600' : 'bg-slate-400'}`}></span>
                <span className="hidden md:inline truncate max-w-[160px]">{s.title}</span>
                <span className="md:hidden">Slide {idx + 1}</span>
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-mono hidden sm:inline font-medium">
            Hover to pause auto-rotation
          </span>
        </div>

      </div>
    </div>
  );
}
