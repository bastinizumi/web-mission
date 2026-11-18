import React from 'react';
import { motion } from 'framer-motion';

const METRICS = [
  {
    title: 'Creative Web Design & UI/UX',
    description:
      "Delivering innovative, mobile-responsive, and customized website designs that effectively reflect your brand's identity.",
    percent: 95,
  },
  {
    title: 'Client Satisfaction & Reliability',
    description:
      'Committed to exceeding client expectations with timely delivery, robust code, and quality-driven digital solutions.',
    percent: 98,
  },
];

export default function ExcellenceGrowthSection() {
  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="bento-card bento-card-hover p-8 sm:p-12 lg:p-14 bg-white/95 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-7">
              <span className="font-mono-tech text-xs font-black tracking-wider text-black uppercase bg-slate-100 border-2 border-black rounded-full px-3.5 py-1 shadow-[2px_2px_0px_#000] inline-block mb-4">
                Proven Craft &amp; Reliability
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-[1.1]">
                Delivering Excellence &amp; Strategic Business Growth
              </h2>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-800 font-medium">
                <span className="font-black text-black">Since 2017</span>, Web Mission has been a premier{' '}
                <span className="font-black text-black">web development company in Chennai</span>. We combine creativity, cutting-edge technology, and data-driven marketing to build high-converting,{' '}
                <span className="font-black text-black">SEO-optimized websites</span> tailored to your long-term business goals.
              </p>

              <div className="mt-8 space-y-5">
                {METRICS.map((metric, idx) => (
                  <div
                    key={metric.title}
                    className="rounded-xl border-2 border-black bg-slate-50 p-5 shadow-[3px_3px_0px_#000]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-base sm:text-lg font-black text-black">
                          {metric.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                          {metric.description}
                        </p>
                      </div>
                      <span className="font-mono-tech text-2xl font-black text-black shrink-0">
                        {metric.percent}%
                      </span>
                    </div>

                    <div className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-white border-2 border-black">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.percent}%` }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 1.1,
                          delay: idx * 0.15,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="h-full rounded-full bg-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border-2 border-black overflow-hidden shadow-[5px_5px_0px_#000]">
                <img
                  src="/images/growth-prism.jpg"
                  alt="Strategic digital growth architectural visual"
                  loading="lazy"
                  className="h-[340px] sm:h-[420px] w-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
