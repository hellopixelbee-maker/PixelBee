import { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { crew } from '../data/crew';
import { CrewCard } from './CrewCard';

export function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="team-hero-heading"
      className="relative isolate w-full scroll-mt-20 px-4 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-10"
    >
      <div
        aria-hidden="true"
        className="mesh-hero hero-mesh pointer-events-none absolute inset-x-0 -bottom-32 -top-24 -z-10"
      />
      <div aria-hidden="true" className="section-glow -left-52 top-8" />
      <div aria-hidden="true" className="section-glow -right-56 top-20 bg-violet-500/15" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="relative text-center">
          <motion.h1
            id="team-hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'BPG Rioni' }}
            className="relative z-10 text-[clamp(2rem,7vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.03em] text-ink"
          >
            ერთი გამოწერა,
          </motion.h1>

          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ fontFamily: 'BPG Rioni' }}
            className="text-gradient pointer-events-none relative z-0 -mt-[-0.1em] block select-none whitespace-nowrap px-2 pb-[0.14em] text-[clamp(2rem,10.5vw,9rem)] font-bold italic leading-[1.16] tracking-[-0.04em] opacity-90 sm:px-4"
          >
            ულიმიტო დიზაინი
          </motion.span>
        </div>

        <div className="relative -mt-[clamp(-1rem,-4vw,2rem)]">
          <ul
            className="flex items-end justify-center"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {crew.map((member, i) => (
              <li key={member.name} className="contents">
                <CrewCard
                  member={member}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  onHoverChange={setHoveredIndex}
                  scrollYProgress={scrollYProgress}
                />
              </li>
            ))}
          </ul>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mx-auto mt-[4.75rem] w-fit rounded-full border border-ink/10 bg-ink/[0.05] px-4 py-2 text-center text-[11px] font-medium tracking-[-0.01em] text-ink/50 backdrop-blur-xl sm:text-xs"
        >
          გამოწერის დაპაუზება ან გაუქმება შეგიძლიათ ნებისმიერ დროს
        </motion.p>
      </div>
    </section>
  );
}
