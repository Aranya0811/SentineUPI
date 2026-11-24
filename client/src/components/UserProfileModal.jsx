import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Shield, Mail, Building, Key, Clock, 
  CheckCircle2, X, LogOut
} from 'lucide-react';

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-lg w-full max-w-md shadow-xl overflow-hidden relative text-slate-800">
        
        {/* Header */}
        <div className="relative p-5 bg-slate-50 border-b border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200/50 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Details */}
        <div className="p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">Assigned Role</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{user.role}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">Clearance Level</span>
              <p className="text-xs font-bold text-slate-800 mt-0.5">Tier-1 Security</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Organization:</span>
              <span className="text-slate-900 font-semibold">{user.organization || 'National Payments Defense SOC'}</span>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500">Analyst Reference:</span>
              <span className="font-mono text-slate-800">{user.id || 'ANL-948204'}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500">Session Type:</span>
              <span className="text-slate-800 font-semibold">7-Day JWT Signed Session</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-700 block mb-1.5">
              Authorized Operational Grants
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                Transaction Interception
              </span>
              <span className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                VPA Policy Freezing
              </span>
              <span className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                XGBoost Retraining Trigger
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold rounded text-slate-700 transition shadow-sm"
          >
            Close
          </button>
          <button
            onClick={() => { logout(); onClose(); }}
            className="px-3 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold rounded text-rose-700 transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}
