import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield, Linkedin, Github, ExternalLink } from 'lucide-react';

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
          Reach our engineers directly via email, professional network, or submit a threat report below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Direct Contact & Channel Cards */}
        <div className="md:col-span-5 space-y-4">
          
          {/* Direct channels card */}
          <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Shield className="w-4 h-4 text-blue-600" /> Direct Contact Channels
            </h3>

            {/* Email link */}
            <a 
              href="mailto:shekharanand281@gmail.com" 
              className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group"
            >
              <div className="w-8 h-8 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-slate-900 font-semibold block">Official Support Email</span>
                <p className="text-slate-600 text-[11px] font-mono truncate">shekharanand281@gmail.com</p>
              </div>
            </a>

            {/* LinkedIn link */}
            <a 
              href="https://www.linkedin.com/in/divit-pandey-768650381/" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group"
            >
              <div className="w-8 h-8 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-slate-900 font-semibold flex items-center gap-1">
                  LinkedIn Professional Profile <ExternalLink className="w-3 h-3 text-slate-400" />
                </span>
                <p className="text-slate-600 text-[11px]">linkedin.com/in/divit-pandey-768650381</p>
              </div>
            </a>

            {/* GitHub Repo */}
            <a 
              href="https://github.com/AryanSingh1938/SentinelUPI" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group"
            >
              <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 flex-shrink-0 group-hover:bg-slate-800 group-hover:text-white transition">
                <Github className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-slate-900 font-semibold flex items-center gap-1">
                  Open Source Repository <ExternalLink className="w-3 h-3 text-slate-400" />
                </span>
                <p className="text-slate-600 text-[11px] font-mono truncate">github.com/AryanSingh1938/SentinelUPI</p>
              </div>
            </a>

            {/* Phone Hotline */}
            <div className="flex items-start gap-3 p-2 border-t border-slate-100">
              <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-900 font-semibold block">Toll-Free Emergency Dispatch</span>
                <p className="text-slate-600 text-[11px]">+91 1800-SENTINEL (9:00 AM - 9:00 PM IST)</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 p-2">
              <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-900 font-semibold block">Security Operations Center</span>
                <p className="text-slate-600 text-[11px]">Cyber Security Complex, Cyber City, Hyderabad, India</p>
              </div>
            </div>

          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-xs text-slate-600">
            <span className="font-bold text-slate-800 block mb-1">Response Commitment</span>
            All inquiries regarding API integration, bank trial access, or security audits are addressed within 24 hours.
          </div>
        </div>

        {/* Right Column: Inquiry & Threat Submission Form */}
        <div className="md:col-span-7 bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Inquiry Dispatched</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your communication has been logged. Our risk engineering team will respond to <strong className="text-slate-800">{formData.email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Send a Message or Report a Suspicious Pattern
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="v.rao@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Institution / Bank</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HDFC / Razorpay / Student"
                    value={formData.bankOrEntity}
                    onChange={(e) => setFormData({ ...formData, bankOrEntity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 font-semibold">Inquiry Category</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 px-2.5 py-1.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Low">General Inquiries & Project Review</option>
                    <option value="Medium">Technical Collaboration & Feedback</option>
                    <option value="Critical">Report Active UPI Fraud Pattern</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-600 font-semibold">Message / Feedback</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your thoughts, integration query, or specific question about our machine learning pipeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 p-2.5 rounded text-xs mt-1 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 mt-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Submit Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
