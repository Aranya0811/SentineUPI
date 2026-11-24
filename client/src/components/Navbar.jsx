import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, LogIn } from 'lucide-react';
import AuthModal from './AuthModal';
import UserProfileModal from './UserProfileModal';

export default function Navbar({ activeTab, onSelectTab }) {
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'console', label: 'Defense Console' },
    { id: 'slideshow', label: 'Threat Intel' },
    { id: 'about', label: 'Architecture' },
    { id: 'contact', label: 'Support & Incident Desk' }
  ];

  return (
    <>
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-4 sm:px-8 py-3 text-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Product Name */}
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight">
                  Sentinel<span className="text-blue-600">UPI</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wide px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Fraud Engine v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                  activeTab === item.id
                    ? 'bg-slate-100 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Session / User Controls */}
          <div className="flex items-center gap-3">
            
            {/* Engine status indicator */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] font-medium text-slate-700">Model Online</span>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => setShowProfileModal(true)}
                title="View Analyst credentials"
                className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 pl-2.5 pr-2 py-1 rounded-md transition text-xs cursor-pointer shadow-sm"
              >
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-semibold text-slate-800">{user.name}</span>
                </div>
                <div className="w-6 h-6 rounded bg-blue-600 text-white font-semibold text-xs flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto gap-2 mt-2 pt-2 border-t border-slate-200 pb-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`px-3 py-1 text-xs whitespace-nowrap rounded-md transition ${
                activeTab === item.id
                  ? 'bg-slate-100 text-blue-700 font-semibold'
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
