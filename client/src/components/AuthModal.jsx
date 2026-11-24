import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, User, X, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('SOC_ANALYST');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    } else {
      const res = await register(name, email, password, role);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    }
    setLoading(false);
  };

  const fillDemoAnalyst = () => {
    setIsLogin(true);
    setEmail('analyst@sentinel.ai');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-lg w-full max-w-sm shadow-xl overflow-hidden relative text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Analyst Authentication</h3>
              <p className="text-[11px] text-slate-500">
                {isLogin ? 'Sign in to access risk operations console' : 'Create an analyst account'}
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex mt-3 bg-slate-200/80 p-0.5 rounded">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-1 text-xs font-semibold rounded transition ${
                isLogin ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-1 text-xs font-semibold rounded transition ${
                !isLogin ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {error && (
            <div className="p-2 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded font-medium">
              {error}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="text-[11px] text-slate-600 font-semibold">Full Name</label>
              <input
                type="text"
                required
                placeholder="Officer Alex Ray"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] text-slate-600 font-semibold">Official Email</label>
            <input
              type="email"
              required
              placeholder="analyst@sentinel.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-600 font-semibold">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-[11px] text-slate-600 font-semibold">Assigned Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
              >
                <option value="SOC_ANALYST">SOC Fraud Analyst</option>
                <option value="RISK_OFFICER">Senior Risk Officer</option>
                <option value="ADMIN">Security Administrator</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold text-white transition flex items-center justify-center gap-1.5 mt-2 shadow-sm"
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-2 border-t border-slate-200 text-center">
            <button
              type="button"
              onClick={fillDemoAnalyst}
              className="text-[11px] font-medium text-blue-600 hover:text-blue-700 underline"
            >
              Auto-Fill Demo Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
