import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, SparklesIcon } from 'lucide-react';
import { deliverables } from '../data/deliverables';

export function WhatYouGet() {
  return (
    <section
      aria-labelledby="deliverables-heading"
      className="relative w-full overflow-hidden bg-canvas px-5 py-20 sm:px-8 sm:py-28">
      
      {/* ambient light blobs behind the glass */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[12%] h-72 w-72 rounded-full bg-[#8ba3ff] opacity-40 blur-[110px]" />
        <div className="absolute top-24 right-[8%] h-80 w-80 rounded-full bg-[#ffb98a] opacity-40 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-[#a8f0d8] opacity-35 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center">
          
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 shadow-glass backdrop-blur-xl">
            <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            One plan
          </span>

          <h2
            id="deliverables-heading"
            className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
            
            What you&apos;ll get
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/55 sm:text-lg">
            Everything below is included in the one plan — no add-ons, no
            upsells.
          </p>
        </motion.div>

        <ul className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {deliverables.map((item, i) =>
          <motion.li
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.45,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}>
            
              <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/60 bg-white/45 p-4 shadow-glass backdrop-blur-2xl transition-colors duration-300 hover:border-white/90 hover:bg-white/70 hover:shadow-glass-hover sm:p-5">
              
                {/* sheen sweep on hover */}
                <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/50 opacity-0 blur-md transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
              

                <div className="relative flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/70 bg-white/70 text-ink shadow-sm transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                    <CheckIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-snug text-ink sm:text-base">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-ink/50">
                      {item.note}
                    </span>
                  </span>
                </div>
              </motion.div>
            </motion.li>
          )}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4">
          
          <motion.a
            href="#start"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_32px_-14px_rgba(20,19,26,0.6)] outline-none ring-ink/20 transition-shadow hover:shadow-[0_24px_44px_-16px_rgba(20,19,26,0.7)] focus-visible:ring-4">
            
            დაიწყე დღესვე
          </motion.a>
          <p className="text-xs text-ink/45">
            ყველა პუნქტი შედის ერთ ფასში.
          </p>
        </motion.div>
      </div>
    </section>);

}