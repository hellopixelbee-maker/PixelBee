import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { steps } from '../data/steps';

export function HowItWorks() {
  return (
    <section id="howitworks" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <div aria-hidden="true" className="section-glow -right-64 top-24" />
      <div className="relative mx-auto max-w-6xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
            მარტივი პროცესი
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-ink sm:whitespace-nowrap sm:text-6xl">
            როგორ მუშაობს
          </h2>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-transparent via-ink/25 to-transparent lg:block"
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
                    <span className="workflow-marker flex h-[72px] w-[72px] items-center justify-center rounded-full border backdrop-blur-2xl transition-all duration-300">
                      <span className="workflow-marker-core relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border backdrop-blur-2xl transition-transform duration-300 group-hover:scale-105">
                        <span
                          aria-hidden="true"
                          className="absolute -left-1 top-0 h-5 w-8 rotate-[-24deg] rounded-full bg-white/25 blur-md"
                        />
                        <Icon
                          className="relative h-5 w-5 text-ink/95"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="absolute right-0 text-xs font-semibold tracking-[0.16em] text-ink/30 lg:hidden">
                      {step.number}
                    </span>
                  </div>

                  <article className="glass-panel glass-panel-hover relative flex h-[380px] flex-none flex-col overflow-hidden rounded-[24px] p-6 group-hover:-translate-y-1.5 sm:h-[350px] sm:p-7 lg:h-[340px]">
                    <span aria-hidden="true" className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent/70">
                        ნაბიჯი {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-ink/25">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-2xl font-bold tracking-[-0.025em] text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                      {step.description}
                    </p>
                    <p className="mt-5 border-t border-ink/10 pt-5 text-[13px] leading-relaxed text-ink/40">
                      {step.detail}
                    </p>

                    {index < steps.length - 1 && (
                      <span className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.06] text-ink/45 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-accent group-hover:text-white lg:hidden">
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

