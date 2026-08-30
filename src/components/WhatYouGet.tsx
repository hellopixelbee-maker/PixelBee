import { motion } from 'framer-motion';
import {
  SparklesIcon,
} from 'lucide-react';
import { deliverables } from '../data/deliverables';

export function WhatYouGet() {
  const regularDeliverables = deliverables.slice(0, -2);

  return (
    <section
      aria-labelledby="deliverables-heading"
      className="relative w-full overflow-hidden bg-canvas px-5 py-20 sm:px-8 sm:py-28"
    >


      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 shadow-glass backdrop-blur-xl">
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

        {/* MAIN GRID */}
        <ul className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
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
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 26
                }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/60 bg-white/45 p-4 shadow-glass backdrop-blur-2xl transition-colors duration-300 hover:border-white/90 hover:bg-white/70 hover:shadow-glass-hover sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/50 opacity-0 blur-md transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100"
                />

                <div className="relative">
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
          ))}
        </ul>

                {/* SPECIAL CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-dashed border-black/10 bg-[#f7f3f4] p-8"
          >
            <h3 className="text-2xl font-medium text-ink">
              უსასრულო რევიზია
            </h3>

            <p className="mt-3 text-base leading-relaxed text-ink/55">
              ვამუშავებთ დიზაინს მანამ, სანამ შედეგი სრულად არ
              დააკმაყოფილებს თქვენს მოლოდინს.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[28px] border border-dashed border-black/10 bg-[#f7f3f4] p-8"
          >
            <h3 className="text-2xl font-medium text-ink">
              პაუზის შესაძლებლობა
            </h3>

            <p className="mt-3 text-base leading-relaxed text-ink/55">
              საჭიროების შემთხვევაში შეგიძლიათ მომსახურება
              ნებისმიერ დროს შეაჩეროთ დამატებითი პირობების გარეშე.
            </p>
          </motion.div>
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
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white"
          >
            დაიწყე დღესვე
          </motion.a>

          <p className="text-xs text-ink/45">
            ყველა მომსახურება შედის ერთ ფასში.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
