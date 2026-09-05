import { motion } from 'framer-motion';
import { InfinityIcon, PauseIcon, SparklesIcon } from 'lucide-react';
import { deliverables } from '../data/deliverables';

export function WhatYouGet() {
  const regularDeliverables = deliverables.slice(0, -2);

  return (
    <section
      aria-labelledby="deliverables-heading"
      className="relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
    >
      <div aria-hidden="true" className="section-glow -right-56 top-20 bg-cyan-400/10" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent shadow-glow backdrop-blur-xl">
            <SparklesIcon className="h-3.5 w-3.5" aria-hidden="true" />
            ერთი პაკეტი
          </span>

          <h2
            id="deliverables-heading"
            className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl"
          >
            რას მოიცავს პაკეტი
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/55 sm:text-lg">
            ყველაფერი, რაც გჭირდებათ ძლიერი და პროფესიონალური
            ბრენდისთვის — ერთ პაკეტში, დამატებითი ხარჯების გარეშე.
          </p>
        </motion.div>

        <ul className="mt-12 flex flex-wrap justify-center gap-3.5 sm:gap-4">
          {regularDeliverables.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="w-fit max-w-full"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 26
                }}
                className="glass-panel glass-panel-hover group relative overflow-hidden rounded-2xl px-5 py-4 sm:px-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 opacity-0 blur-md transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100"
                />

                <div className="relative">
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-snug text-ink sm:text-base">
                      {item.label}
                    </span>

                    <span className="mt-1 block text-[13px] leading-snug text-ink/45">
                      {item.note}
                    </span>
                  </span>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </ul>

        <div className="benefits-shell relative mt-16 overflow-hidden rounded-[30px] border p-4 backdrop-blur-xl sm:mt-20 sm:rounded-[34px] sm:p-6">
          <span
            aria-hidden="true"
            className="absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]"
          />
          <span
            aria-hidden="true"
            className="absolute -right-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-brandviolet/10 blur-[80px]"
          />

          <div className="relative mb-5 flex items-center gap-4 px-2 sm:mb-6">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
              მოქნილი პირობები
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-ink/20 to-transparent" />
          </div>

          <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[24px] border border-accent/20 bg-gradient-to-br from-white/[0.11] via-white/[0.055] to-accent/[0.055] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.13)] transition-colors hover:border-accent/35 sm:p-7"
            >
              <span className="absolute right-5 top-4 text-xs font-semibold tracking-[0.16em] text-ink/20">
                01
              </span>
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ink/15 bg-ink/[0.055] text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_30px_-18px_rgba(110,153,255,0.8)] backdrop-blur-xl transition-transform group-hover:scale-105">
                  <InfinityIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                    უსასრულო რევიზია
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/55 sm:text-base">
                    ვამუშავებთ დიზაინს მანამ, სანამ შედეგი სრულად არ
                    დააკმაყოფილებს თქვენს მოლოდინს.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-[24px] border border-brandviolet/20 bg-gradient-to-br from-white/[0.11] via-white/[0.055] to-brandviolet/[0.055] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.13)] transition-colors hover:border-brandviolet/35 sm:p-7"
            >
              <span className="absolute right-5 top-4 text-xs font-semibold tracking-[0.16em] text-ink/20">
                02
              </span>
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ink/15 bg-ink/[0.055] text-brandviolet shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_30px_-18px_rgba(139,124,255,0.8)] backdrop-blur-xl transition-transform group-hover:scale-105">
                  <PauseIcon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                    პაუზის შესაძლებლობა
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/55 sm:text-base">
                    საჭიროების შემთხვევაში შეგიძლიათ მომსახურება
                    ნებისმიერ დროს შეაჩეროთ დამატებითი პირობების გარეშე.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-[#6f9fff] to-[#8b7cff] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_38px_-16px_rgba(111,159,255,0.75)]"
          >
            დაიწყე დღესვე
          </motion.a>

          <p className="text-xs text-ink/40">
            ყველა მომსახურება შედის ერთ ფასში.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
