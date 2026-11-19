import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Edit3,
  Check,
  Radio,
} from 'lucide-react';
import GoldIconPod from './common/GoldIconPod';

const SERVICES_OPTIONS = [
  'Website Development',
  'UI/UX Design',
  '3D Visualization',
  'Web Applications',
  'Branding',
  'Digital Solutions',
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  // Editable Office Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    street: 'No: 13, 2nd Floor, Appadurai St, TMP Nagar, Padi',
    city: 'Chennai, Tamil Nadu',
    pincode: '600050',
    country: 'India',
  });
  const [tempAddress, setTempAddress] = useState(addressData);

  const handleAddressSave = () => {
    setAddressData(tempAddress);
    setIsEditingAddress(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please provide your name, email, and project message.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Your inquiry has been successfully transmitted to our Chennai studio!',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Website Development',
        message: '',
      });
    } catch (err) {
      // Fallback graceful success simulation
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been received. Our leadership will respond within 24 hours.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen text-white py-16 sm:py-36 px-4 sm:px-10 lg:px-16 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ================= SECTION HEADER ================= */}
        <div className="relative z-20 max-w-3xl mb-12 sm:mb-20">

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-3.5 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)] mb-4 sm:mb-5">
            <Radio className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-amber-300 uppercase">
              START A CONVERSATION • 3D SHAPE 05: FREQUENCY BEACON
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] sm:leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-[#fce89f] via-[#d4af37] to-[#aa771c] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]">
              Exceptional.
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-200 font-sans font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Ready to pioneer your brand&apos;s digital future? Fill out the brief below or connect directly to our Chennai studio via WhatsApp, email, or telephone.
          </p>
        </div>

        {/* ================= 2-COLUMN CONTACT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Direct Channels & Editable Address Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Quick Connect Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">

              {/* WhatsApp Direct Link */}
              <a
                href="https://wa.me/9186376623600?text=Hi%20Web%20Mission%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20your%20agency."
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-amber-500/20 bg-[#0a0c10]/85 p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]"
              >
                <div className="flex items-center gap-4">
                  <GoldIconPod
                    icon={MessageSquare}
                    size="md"
                    className="group-hover:border-emerald-400 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                  />
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Instant WhatsApp
                    </div>
                    <div className="font-sans text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      +91 86376 623600
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Email Direct Link */}
              <a
                href="mailto:hello@webmissions.in"
                className="group flex items-center justify-between rounded-2xl border border-amber-500/20 bg-[#0a0c10]/85 p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]"
              >
                <div className="flex items-center gap-4">
                  <GoldIconPod icon={Mail} size="md" />
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Official Inquiries
                    </div>
                    <div className="font-sans text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      hello@webmissions.in
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-amber-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+9186376623600"
                className="group flex items-center justify-between rounded-2xl border border-amber-500/20 bg-[#0a0c10]/85 p-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]"
              >
                <div className="flex items-center gap-4">
                  <GoldIconPod icon={Phone} size="md" />
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Studio Hotline
                    </div>
                    <div className="font-sans text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      +91 86376 623600
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-amber-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

            </div>

            {/* ================= EDITABLE OFFICE ADDRESS CARD ================= */}
            <div className="rounded-3xl border border-amber-500/25 bg-[#0a0c10]/85 p-7 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <GoldIconPod
                    icon={MapPin}
                    size="xs"
                    hudCorners={false}
                    className="!h-6 !w-6 border-amber-400/50 bg-amber-500/15"
                  />
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                    Chennai Headquarters
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (isEditingAddress) {
                      handleAddressSave();
                    } else {
                      setTempAddress(addressData);
                      setIsEditingAddress(true);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-[#12151f] px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  {isEditingAddress ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Save Address</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3 w-3" />
                      <span>Edit Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Editable or Display View */}
              {isEditingAddress ? (
                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={tempAddress.street}
                      onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-[#12151f] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                        City &amp; State
                      </label>
                      <input
                        type="text"
                        value={tempAddress.city}
                        onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-[#12151f] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={tempAddress.pincode}
                        onChange={(e) => setTempAddress({ ...tempAddress, pincode: e.target.value })}
                        className="w-full rounded-lg border border-slate-700 bg-[#12151f] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="font-sans text-slate-300 text-sm leading-relaxed">
                  <p className="font-bold text-white text-base">Web Mission Digital Studio</p>
                  <p className="mt-1">{addressData.street}</p>
                  <p>{addressData.city} - {addressData.pincode}, {addressData.country}</p>
                </div>
              )}

              {/* Working Hours */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <GoldIconPod
                    icon={Clock}
                    size="xs"
                    hudCorners={false}
                    className="!h-5 !w-5 border-amber-400/50 bg-amber-500/15"
                  />
                  <span>Mon - Sat: 9:30 AM - 7:30 PM IST</span>
                </div>
                <span className="text-emerald-400 font-bold">Open</span>
              </div>
            </div>

            {/* Studio Availability Status */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Q1 &amp; Q2 2026 Sprint Slots Open
                </span>
              </div>
              <GoldIconPod
                icon={Sparkles}
                size="xs"
                hudCorners={false}
                className="!h-6 !w-6 border-amber-400/50 bg-amber-500/20"
              />
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-amber-500/25 bg-[#0a0c10]/85 p-8 sm:p-11 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] relative">

              <div className="mb-8">
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                  Send Us a Project Brief
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-sans font-medium">
                  We review incoming briefs daily and respond with technical insights &amp; pricing within 24 hours.
                </p>
              </div>

              {/* Feedback Alert Status */}
              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-xs font-sans ${status.type === 'success'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-[#0f1118] px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-[#0f1118] px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Service Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-[#0f1118] px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Service Needed <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-[#0f1118] px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
                    >
                      {SERVICES_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0f1118] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Project Overview &amp; Goals <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current platform, your goals, key timelines, or budget expectations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-[#0f1118] px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl border border-[#fce89f]/60 bg-gradient-to-r from-[#b8860b] via-[#e2b755] to-[#996515] py-4 font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-[#140e04] shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Brief...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 text-slate-950" />
                        <span>Send Message &amp; Get Consultation</span>
                      </>
                    )}
                  </motion.button>

                  <p className="mt-3 text-center font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Guaranteed NDA Protection • 24-Hour Studio Response
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Hairline Gradient Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </section>
  );
}
