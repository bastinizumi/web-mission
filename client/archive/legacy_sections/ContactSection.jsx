import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, PhoneCall, Send, AlertCircle } from 'lucide-react';

const SERVICE_OPTIONS = [
  'UI/UX & Web Design',
  'Web Development',
  'Digital Marketing & SEO',
  'App Development',
  'E-Commerce Solutions',
  'Full Website Redesign',
];

export default function ContactSection({ preselectedService = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || 'Web Development',
    message: '',
  });
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Could not send message. Please try again.');
      }

      setStatus({
        type: 'success',
        text: data.message || 'Thank you! Your inquiry has been received by our Chennai studio.',
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'Web Development',
        message: '',
      });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="bento-card bento-card-hover p-8 bg-white/95 backdrop-blur-sm">
              <span className="font-mono-tech text-xs font-black tracking-wider text-black uppercase bg-slate-100 border-2 border-black rounded-full px-3.5 py-1 shadow-[2px_2px_0px_#000] inline-block mb-4">
                Connect With Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-black leading-tight">
                Let&apos;s Build Your Next Breakthrough
              </h2>
              <p className="mt-3 text-base text-slate-700 font-medium leading-relaxed">
                Reach out to discuss website redesigns, custom MERN applications, or growth marketing tailored to your brand.
              </p>
            </div>

            <div className="bento-card bento-card-hover p-6 flex items-start gap-4 bg-white/95 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-slate-100 text-black shadow-[2px_2px_0px_#000]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-black text-black">
                  Our Office Location
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 font-medium">
                  No: 13, 2nd Floor, Appadurai St, TMP Nagar, Padi, Chennai, Tamil Nadu 600050
                </p>
              </div>
            </div>

            <a href="tel:+918637662360" className="block">
              <div className="bento-card bento-card-hover p-6 flex items-start gap-4 bg-white/95 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-slate-100 text-black shadow-[2px_2px_0px_#000]">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-black text-black">
                    Call or WhatsApp
                  </h3>
                  <p className="mt-1 font-mono-tech text-base font-black text-black">
                    +91 86376 62360
                  </p>
                </div>
              </div>
            </a>

            <div className="bento-card bento-card-hover p-6 flex items-start gap-4 bg-white/95 backdrop-blur-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-slate-100 text-black shadow-[2px_2px_0px_#000]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-black text-black">
                  Send Us an Email
                </h3>
                <div className="mt-1 space-y-0.5 text-sm font-semibold">
                  <a href="mailto:hello@webmissions.in" className="block text-black hover:underline">
                    hello@webmissions.in
                  </a>
                  <a href="mailto:webmissionsss@gmail.com" className="block text-slate-700 hover:text-black">
                    webmissionsss@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bento-card bento-card-hover h-full p-8 sm:p-12 bg-white/95 backdrop-blur-sm">
              <h3 className="font-display text-2xl sm:text-3xl font-black text-black">
                Drop Us a Message
              </h3>
              <p className="mt-2 text-base text-slate-700 font-medium">
                Got a project in mind or need assistance? Fill out the form below and we&apos;ll reply shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="bento-name" className="block font-mono-tech text-xs font-black uppercase text-black mb-2">
                      Your Name
                    </label>
                    <input
                      id="bento-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full rounded-xl border-2 border-black bg-white px-4 py-3.5 text-sm font-medium text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                  <div>
                    <label htmlFor="bento-email" className="block font-mono-tech text-xs font-black uppercase text-black mb-2">
                      Your Email
                    </label>
                    <input
                      id="bento-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full rounded-xl border-2 border-black bg-white px-4 py-3.5 text-sm font-medium text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="bento-phone" className="block font-mono-tech text-xs font-black uppercase text-black mb-2">
                      Phone Number
                    </label>
                    <input
                      id="bento-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full rounded-xl border-2 border-black bg-white px-4 py-3.5 text-sm font-medium text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                  <div>
                    <label htmlFor="bento-service" className="block font-mono-tech text-xs font-black uppercase text-black mb-2">
                      Select Service
                    </label>
                    <select
                      id="bento-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border-2 border-black bg-white px-4 py-3.5 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000]"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="bento-message" className="block font-mono-tech text-xs font-black uppercase text-black mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="bento-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    className="w-full resize-none rounded-xl border-2 border-black bg-white px-4 py-3.5 text-sm font-medium text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000]"
                  />
                </div>

                {status.type === 'success' && (
                  <div className="flex items-center gap-3 rounded-xl border-2 border-black bg-emerald-100 p-4 text-sm font-bold text-emerald-950 shadow-[3px_3px_0px_#000]">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                    <span>{status.text}</span>
                  </div>
                )}

                {status.type === 'error' && (
                  <div className="flex items-center gap-3 rounded-xl border-2 border-black bg-rose-100 p-4 text-sm font-bold text-rose-950 shadow-[3px_3px_0px_#000]">
                    <AlertCircle className="h-5 w-5 shrink-0 text-rose-700" />
                    <span>{status.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="btn-bento-black w-full py-4 px-8 text-sm flex items-center justify-center gap-3 shadow-[4px_4px_0px_#000]"
                >
                  {status.type === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
