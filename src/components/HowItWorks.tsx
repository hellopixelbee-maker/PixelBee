import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { steps } from '../data/steps';

export function HowItWorks() {
  return (
    <section id="howitworks" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            მარტივი პროცესი
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-ink sm:whitespace-nowrap sm:text-6xl">
            როგორ მუშაობს
          </h2>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-black/10 lg:block"
          />

          <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex h-full flex-col"
                >
                  <div className="relative z-10 mb-5 flex items-center justify-center">
                    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-black/[0.08] bg-canvas shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)]">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${step.glowFrom}, ${step.glowTo})`,
                        }}
                      >
                        <Icon className="h-5 w-5 text-ink" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </span>
                    <span className="absolute right-0 text-xs font-semibold tracking-[0.16em] text-black/30 lg:hidden">
                      {step.number}
                    </span>
                  </div>

                  <article className="relative flex h-[380px] flex-none flex-col overflow-hidden rounded-[24px] border border-black/[0.07] bg-white/65 p-6 shadow-[0_20px_55px_-40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-white group-hover:shadow-[0_28px_60px_-38px_rgba(0,0,0,0.45)] sm:h-[350px] sm:p-7 lg:h-[340px]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">
                        ნაბიჯი {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-black/25">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-2xl font-bold tracking-[-0.025em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-black/55">
                      {step.description}
                    </p>
                    <p className="mt-5 border-t border-black/[0.07] pt-5 text-[13px] leading-relaxed text-black/40">
                      {step.detail}
                    </p>

                    {index < steps.length - 1 && (
                      <span className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-black/35 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-ink group-hover:text-white lg:hidden">
                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

