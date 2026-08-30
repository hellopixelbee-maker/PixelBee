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
      className="relative w-full overflow-hidden bg-cream px-4 pb-10 pt-14 sm:px-8 sm:pt-20"
    >
      <div className="mx-auto max-w-6xl">
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
            className="pointer-events-none relative z-0 -mt-[-0.1em] block select-none whitespace-nowrap text-[clamp(2rem,11vw,10rem)] font-bold italic leading-[0.9] tracking-[-0.045em] text-gray-400"
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
          className="mt-8 text-center text-[11px] font-medium tracking-[-0.01em] text-[#a89c86] sm:text-xs"
        >
          გამოწერის დაპაუზება ან გაუქმება შეგიძლიათ ნებისმიერ დროს
        </motion.p>
      </div>
    </section>
  );
}
