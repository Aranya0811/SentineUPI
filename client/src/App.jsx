import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreatSlideshow from './components/ThreatSlideshow';
import About from './components/About';
import Contact from './components/Contact';
import Simulator from './components/Simulator';
import Dashboard from './components/Dashboard';
import { useAuth } from './context/AuthContext';
import { ShieldCheck, Terminal } from 'lucide-react';

export default function App() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-5">
        
        {/* Analyst Session Bar */}
        {isAuthenticated && (
          <div className="mb-5 p-3 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                Session Active: <strong className="text-slate-900">{user.name}</strong> ({user.role}) &middot; {user.organization}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('console')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
              >
                Go to Defense Console &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'home' && (
          <div className="space-y-12 pb-16">
            <Hero onNavigate={setActiveTab} />

            {/* Sandbox Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Live Interception Sandbox</h2>
                  <p className="text-xs text-slate-500">Dispatch test payments and review real-time decision telemetry</p>
                </div>
                <button
                  onClick={() => setActiveTab('console')}
                  className="text-xs bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded text-slate-700 font-medium flex items-center gap-1.5 transition shadow-sm"
                >
                  <Terminal className="w-3.5 h-3.5 text-blue-600" /> Dedicated Console View
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5">
                  <Simulator />
                </div>
                <div className="lg:col-span-7">
                  <Dashboard />
                </div>
              </div>
            </div>

            {/* Threat Vectors Showcase */}
            <ThreatSlideshow />

            {/* Architecture Section */}
            <About />

            {/* Contact Support */}
            <Contact />
          </div>
        )}

        {/* Tab 2: DEFENSE CONSOLE */}
        {activeTab === 'console' && (
          <div className="py-2 space-y-5 pb-16">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900">National UPI Defense Operations Console</h2>
                <p className="text-xs text-slate-500">
                  Continuous Telemetry Interception &middot; Sub-50ms Heuristic Baseline &middot; XGBoost Anomaly Classifier
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono font-medium text-slate-600">SOCKET STREAM CONNECTED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5">
                <Simulator />
              </div>
              <div className="lg:col-span-7">
                <Dashboard />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: THREAT INTEL */}
        {activeTab === 'slideshow' && (
          <div className="py-4 pb-16">
            <ThreatSlideshow />
          </div>
        )}

        {/* Tab 4: ABOUT ARCHITECTURE */}
        {activeTab === 'about' && (
          <div className="py-4 pb-16">
            <About />
          </div>
        )}

        {/* Tab 5: CONTACT */}
        {activeTab === 'contact' && (
          <div className="py-4 pb-16">
            <Contact />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <span className="font-semibold text-slate-800">SentinelUPI Defense Framework</span>
          </div>
          <p>&copy; 2026 SentinelUPI Project. Built for Real-Time Digital Payment Security.</p>
          <div className="flex gap-4 text-slate-500">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-800">Architecture</button>
            <button onClick={() => setActiveTab('slideshow')} className="hover:text-slate-800">Threat Reference</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-slate-800">Contact</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
