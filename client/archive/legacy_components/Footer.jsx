import React from 'react';
import { ArrowUp, ExternalLink, MapPin } from 'lucide-react';
import BrandMark from './BrandMark';

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Facebook', href: 'https://www.facebook.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
];

export default function Footer() {
  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t-[2.5px] border-black bg-white/95 text-black pt-16 pb-12 px-4 sm:px-6 lg:px-8 shadow-[0px_-4px_0px_#000] backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b-2 border-black/15">
          
          <div className="lg:col-span-4">
            <BrandMark />
            <h3 className="mt-6 font-display text-2xl font-black text-black leading-snug">
              Working Together Ideas come to life
            </h3>
            <p className="mt-3 text-base text-slate-700 font-medium leading-relaxed">
              At Web Mission, we build high-performing digital experiences, custom web applications, and scalable software solutions tailored to elevate your business.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-black uppercase tracking-wider text-black">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-bold text-slate-700">
              {['Web Development', 'UI/UX Design', 'App Development', 'Digital Marketing', 'SEO Optimization'].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#services');
                    }}
                    className="hover:text-black transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-black uppercase tracking-wider text-black">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-bold text-slate-700">
              {[
                { label: 'Home', target: '#home' },
                { label: 'About', target: '#about' },
                { label: 'Services', target: '#services' },
                { label: 'Projects', target: '#projects' },
                { label: 'Contact', target: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.target}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.target);
                    }}
                    className="hover:text-black transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display text-sm font-black uppercase tracking-wider text-black">
              Find Us
            </h4>
            <div className="mt-4 overflow-hidden rounded-xl border-2 border-black bg-slate-100 shadow-[3px_3px_0px_#000]">
              <div className="relative h-36 w-full overflow-hidden">
                <iframe
                  title="Web Mission Chennai Office Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.174%2C13.090%2C80.194%2C13.105&layer=mapnik&marker=13.0977%2C80.1837"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs font-bold text-slate-900 border-t-2 border-black bg-white">
                <span className="inline-flex items-center gap-1.5 truncate">
                  <MapPin className="h-4 w-4 shrink-0 text-black" />
                  TMP Nagar, Padi, Chennai 600050
                </span>
                <a
                  href="https://maps.google.com/?q=Appadurai+St,+TMP+Nagar,+Padi,+Chennai,+Tamil+Nadu 600050"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 font-mono-tech text-xs font-black text-black hover:underline"
                >
                  Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-xs font-black text-slate-700 hover:text-black transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-700 font-bold">
              &copy; {new Date().getFullYear()} Web Mission Chennai. All rights reserved.
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white transition-all"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
