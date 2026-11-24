import React from 'react';
import Simulator from './components/Simulator';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <header className="max-w-7xl mx-auto mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            SentinelUPI: Real-Time Fraud Defense
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Autonomous Heuristic Rule Engine + XGBoost Behavioral Anomaly Detection
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Sub-50ms Inference Active
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Simulator />
        </div>
        <div className="lg:col-span-7">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
