import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreatSlideshow from './components/ThreatSlideshow';
import About from './components/About';
import Contact from './components/Contact';
import Simulator from './components/Simulator';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85; // navbar height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Robust Scroll Spy: checks from bottom to top and handles page bottom reach
  useEffect(() => {
    const sectionIds = ['home', 'console', 'threats', 'about', 'contact'];
    
    const handleScroll = () => {
      // 1. If user is at or near the bottom of the page (in Contact section or viewing Footer)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400) {
        setActiveSection('contact');
        return;
      }

      // 2. Otherwise determine active section based on scroll offset (checking from bottom-most section up)
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          return;
        }
      }

      // 3. Default to home if near top
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* Pinned Top Navbar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Single Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-16">
        
        {/* Analyst Session Bar */}
        {isAuthenticated && (
          <div className="p-3 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                Session Active: <strong className="text-slate-900">{user.name}</strong> ({user.role}) &middot; {user.organization}
              </span>
            </div>
            <button
              onClick={() => scrollToSection('console')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Jump to Defense Console &darr;
            </button>
          </div>
        )}

        {/* SECTION 1: HOME */}
        <section id="home" className="pt-2">
          <Hero onNavigate={scrollToSection} />
        </section>

        {/* SECTION 2: DEFENSE CONSOLE & SANDBOX */}
        <section id="console" className="pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider">
                Live Interception Environment
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Real-Time Defense Console & Telemetry Radar
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Socket Connected
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
        </section>

        {/* SECTION 3: THREAT INTEL */}
        <section id="threats" className="pt-6 border-t border-slate-200">
          <ThreatSlideshow />
        </section>

        {/* SECTION 4: ABOUT ARCHITECTURE */}
        <section id="about" className="pt-6 border-t border-slate-200">
          <About />
        </section>

        {/* SECTION 5: CONTACT US */}
        <section id="contact" className="pt-6 border-t border-slate-200 pb-12">
          <Contact />
        </section>

      </main>

      {/* Professional Black Footer */}
      <Footer onNavigate={scrollToSection} />

    </div>
  );
}
