import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { faqItems } from '../data/faq';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      <div aria-hidden="true" className="section-glow -right-64 top-12 bg-violet-500/15" />
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            ხშირად დასმული კითხვები
          </h2>

          <p className="mx-auto mt-3 max-w-md text-ink/55">
            დამატებითი კითხვები გაქვთ? მოგვწერეთ და პასუხს იმავე დღეს მიიღებთ.
          </p>
        </div>

        <ul className="glass-panel divide-y divide-ink/10 overflow-hidden rounded-card">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <li key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors duration-200 hover:bg-ink/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:px-7"
                  >
                    <span className="text-[15px] font-semibold text-ink sm:text-base">
                      {item.question}
                    </span>

                    <PlusIcon
                      className={`h-5 w-5 shrink-0 text-accent/70 transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="content"
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.28,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 pr-12 text-[15px] leading-relaxed text-ink/55 sm:px-7">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

