import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Minus, Plus, MessageSquareText } from 'lucide-react';

export default function FaqSection({ faqs = [], onAskUs }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bento-card bento-card-hover p-8 bg-white/95 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-slate-100 px-3.5 py-1 mb-4 shadow-[2px_2px_0px_#000]">
                <HelpCircle className="h-4 w-4 text-black" />
                <span className="font-mono-tech text-xs font-bold tracking-wider text-black uppercase">
                  Frequently Asked
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-black leading-[1.08]">
                Have Questions? We Have Answers.
              </h2>

              <p className="mt-4 text-base text-slate-700 font-semibold leading-relaxed">
                Find quick answers to common questions about our web development and digital marketing services.
              </p>

              <div className="mt-8 overflow-hidden rounded-2xl border-2 border-black bg-slate-100">
                <img
                  src="/images/service-uiux.jpg"
                  alt="Web Mission client consultation and FAQ"
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 bg-white border-t-2 border-black flex items-center justify-between">
                  <span className="font-mono-tech text-xs font-black text-black">
                    NEED A CUSTOM QUOTE?
                  </span>
                  <button
                    type="button"
                    onClick={onAskUs}
                    className="btn-bento-black inline-flex items-center gap-1.5 py-2 px-4 text-xs"
                  >
                    <MessageSquareText className="h-3.5 w-3.5" />
                    Talk to Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.question}
                  className="bento-card overflow-hidden transition-all bg-white/95 backdrop-blur-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none"
                  >
                    <span className="font-display text-base sm:text-lg font-black text-black">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000]">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t-2 border-black/10 px-5 sm:px-6 pb-6 pt-4 text-base text-slate-800 font-medium leading-relaxed bg-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
