import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bankOrEntity: '',
    severity: 'Medium',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="mb-6">
        <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider">
          Incident Escalation & Support Desk
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">
          Contact Sentinel Defense Operations Center
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Submit fraud ring notifications, request pilot PSP gateway access, or consult security analysts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Contact info cards */}
        <div className="md:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" /> Operational Response Channels
            </h3>

            <div className="flex items-start gap-2.5">
              <Phone className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
              <div>
                <span className="text-slate-800 font-semibold">SOC Emergency Hotline</span>
                <p className="text-slate-600">+91 1800-SENTINEL (Toll Free)</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
              <div>
                <span className="text-slate-800 font-semibold">Incident Reporting</span>
                <p className="text-slate-600 font-mono">soc-response@sentinel.defense.in</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
              <div>
                <span className="text-slate-800 font-semibold">Security Operations Center</span>
                <p className="text-slate-600">Cyber Security Center, Cyber City, Hyderabad, India</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-xs text-slate-600">
            <span className="font-bold text-slate-800 block mb-1">Standard Service Level Target</span>
            High-severity API integration inquiries and false-positive escalation reports receive analyst response within 15 minutes.
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7 bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Inquiry Dispatched</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your communication has been logged and assigned to the active risk operations analyst on duty.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded transition"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Officer Vikram Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="v.rao@bank.co.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Institution / Entity</label>
                  <input
                    type="text"
                    required
                    placeholder="Bank / Payment Aggregator"
                    value={formData.bankOrEntity}
                    onChange={(e) => setFormData({ ...formData, bankOrEntity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Priority Level</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Low">Low - General Inquiries & Demos</option>
                    <option value="Medium">Medium - Pilot Testing</option>
                    <option value="Critical">Critical - Active Fraud Exploitation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 font-semibold">Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your inquiry or suspicious transaction telemetry observed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 p-2.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 mt-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Submit to Operations Desk
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
