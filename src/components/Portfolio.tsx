import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { portfolioItems, type PortfolioItem } from '../data/portfolio';

export function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const moveCategory = (direction: 1 | -1) => {
    setSelectedItem((current) => {
      if (!current) return null;
      const currentIndex = portfolioItems.findIndex((item) => item.id === current.id);
      const nextIndex =
        (currentIndex + direction + portfolioItems.length) % portfolioItems.length;
      return portfolioItems[nextIndex];
    });
  };

  useEffect(() => {
    if (!selectedItem) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedItem(null);
      if (event.key === 'ArrowLeft') {
        setSelectedItem((current) => {
          if (!current) return null;
          const currentIndex = portfolioItems.findIndex((item) => item.id === current.id);
          return portfolioItems[
            (currentIndex - 1 + portfolioItems.length) % portfolioItems.length
          ];
        });
      }
      if (event.key === 'ArrowRight') {
        setSelectedItem((current) => {
          if (!current) return null;
          const currentIndex = portfolioItems.findIndex((item) => item.id === current.id);
          return portfolioItems[(currentIndex + 1) % portfolioItems.length];
        });
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedItem]);

  return (
    <>
      <section
        id="work"
        aria-labelledby="portfolio-heading"
        className="overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            ჩვენი მიმართულებები
          </p>
          <h2
            id="portfolio-heading"
            className="text-3xl font-bold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            გადახედე ნამუშევრებს
          </h2>
          <p className="mt-3 text-black/55 sm:text-lg">
            აირჩიე კატეგორია და დაათვალიერე შესაბამის საქაღალდეში თავმოყრილი პროექტები.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-7">
          {portfolioItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: (index % 4) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                aria-haspopup="dialog"
                className="group mx-auto block w-full max-w-[205px] rounded-[20px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <div className="relative h-[132px] sm:h-[142px]">
                  <div className="absolute inset-x-2 top-0 z-10 h-[78px] overflow-hidden bg-black/5 transition-transform duration-300 ease-out group-hover:-translate-y-8">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 top-[18px] z-0 rounded-[11px] bg-black" />
                  <div className="absolute left-0 top-[28px] z-20 h-[32px] w-[58%] rounded-tl-[11px] rounded-tr-[14px] bg-black transition-transform duration-300 group-hover:-translate-y-1" />
                  <div className="absolute inset-x-0 bottom-0 top-[44px] z-20 rounded-[11px] bg-black shadow-[0_12px_24px_-18px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-1" />
                </div>

                <h3 className="mt-3.5 text-center text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-black/60 sm:text-[17px]">
                  {item.title}
                </h3>
              </button>
            </motion.li>
          ))}
        </ul>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedItem(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-dialog-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88vh] w-full max-w-5xl overflow-x-hidden overflow-y-auto rounded-[26px] bg-canvas p-5 shadow-2xl sm:rounded-[32px] sm:p-8"
            >
              <button
                type="button"
                onClick={() => moveCategory(-1)}
                aria-label="Previous portfolio category"
                className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:-translate-x-1 hover:-translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:left-4 sm:h-12 sm:w-12"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => moveCategory(1)}
                aria-label="Next portfolio category"
                className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:translate-x-1 hover:-translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:right-4 sm:h-12 sm:w-12"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
                    ნამუშევრები
                  </p>
                  <h3
                    id="portfolio-dialog-title"
                    className="mt-2 pr-10 text-2xl font-bold tracking-[-0.025em] text-ink sm:text-4xl"
                  >
                    {selectedItem.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close portfolio gallery"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/[0.06] text-ink transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5">
                {selectedItem.gallery.map((image, imageIndex) => (
                  <figure
                    key={`${image}-${imageIndex}`}
                    className="overflow-hidden rounded-[18px] bg-white shadow-[0_18px_45px_-34px_rgba(0,0,0,0.5)] sm:rounded-[22px]"
                  >
                    <img
                      src={image}
                      alt={`${selectedItem.title} — ნამუშევარი ${imageIndex + 1}`}
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  </figure>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

