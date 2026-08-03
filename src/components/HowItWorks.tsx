import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Step } from '../types/steps';
import { steps } from '../data/steps';

type StepCardProps = {
  step: Step;
  index: number;
};

function StepCard({ step, index }: StepCardProps) {
  const Icon = step.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -14 }}
      className="group relative isolate mx-auto max-w-[400px]"
    >
      {/* Colored light source */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -left-6 -top-10 h-56 w-56 rounded-full blur-2xl transition-all duration-700 ease-out group-hover:scale-125 group-hover:opacity-100"
          style={{ backgroundColor: step.glowFrom, opacity: 0.85 }}
        />

        <div
          className="absolute -bottom-12 -right-8 h-64 w-64 rounded-full blur-2xl transition-all duration-700 ease-out group-hover:scale-125 group-hover:opacity-100"
          style={{ backgroundColor: step.glowTo, opacity: 0.85 }}
        />
      </div>

      {/* Glass card */}
      <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[28px] border border-white/50 bg-white/20 p-7 shadow-glass backdrop-blur-2xl transition-all duration-500 group-hover:shadow-glass-hover">
        {/* Shine effect */}
        <div
          className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -translate-x-full rotate-12 bg-white/25 blur-2xl transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/50 bg-white/25 text-neutral-900 shadow-sm backdrop-blur-md transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105">
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>

          <span className="text-sm font-semibold tabular-nums tracking-widest text-neutral-900/50">
            {step.number}
          </span>
        </div>

        <div className="relative mt-6">
          <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            {step.title}
          </h3>

          <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-neutral-900/70">
            {step.description}
          </p>

          {/* Expands downward on hover */}
          <div
            className="
              overflow-hidden
              max-h-0
              opacity-0
              transition-all
              duration-500
              ease-out
              group-hover:mt-4
              group-hover:max-h-24
              group-hover:opacity-100
            "
          >
            <p className="text-[13px] font-medium leading-relaxed text-neutral-900/60">
              {step.detail}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-neutral-900/70 transition-colors duration-300 group-hover:text-neutral-900">
            <span>ნაბიჯი {Number(step.number)} / 3</span>

            <ArrowUpRightIcon
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2
          style={{ fontFamily: 'BPG Rioni' }}
          className="text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-tight text-neutral-900"
        >
          როგორ მუშაობს
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
          აირჩიე პაკეტი, გამოგზავნე დიზაინის მოთხოვნა და მიიღე
          პროფესიონალური შედეგი სწრაფად და მარტივად.
        </p>
      </div>

      {/* Cards */}
      <div className="grid justify-center gap-24 md:grid-cols-[260px_260px_260px]">
        {steps.map((step, index) => (
          <StepCard
            key={step.number}
            step={step}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}