import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, LogIn } from 'lucide-react';
import AuthModal from './AuthModal';
import UserProfileModal from './UserProfileModal';

export default function Navbar({ activeSection, onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'console', label: 'Defense Console' },
    { id: 'qr-scanner', label: 'QR Scanner' },
    { id: 'threats', label: 'Threat Intel' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <>
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40 px-6 sm:px-10 py-3.5 text-slate-800 shadow-sm">
        <div className="w-full flex items-center justify-between">
          
          {/* 1. LEFT-MOST: Logo & Brand Title */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-600/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                  Sentinel<span className="text-blue-600">UPI</span>
                </span>
                <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Fraud Engine v2.0
                </span>
              </div>
            </div>
          </div>

          {/* 2. CENTER: Large & Bold Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 justify-center flex-1 px-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 text-base sm:text-[17px] font-bold rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 3. RIGHT-MOST: Model Status & Analyst Profile Controls */}
          <div className="flex items-center gap-3.5 flex-shrink-0">
            
            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Model Online</span>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => setShowProfileModal(true)}
                title="View Analyst credentials"
                className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 pl-3.5 pr-2 py-1.5 rounded-lg transition cursor-pointer shadow-sm"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-sm font-bold text-slate-900">{user.name}</span>
                </div>
                <div className="w-8 h-8 rounded-md bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto gap-2 mt-2 pt-2 border-t border-slate-200 pb-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 text-sm whitespace-nowrap rounded-md font-bold transition ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}
