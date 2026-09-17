import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import {
  portfolioItems,
  type PortfolioItem,
  type PortfolioProject,
} from '../data/portfolio';

export function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const selectedIndex = selectedItem
    ? portfolioItems.findIndex((item) => item.id === selectedItem.id)
    : -1;
  const activeGallery = selectedProject?.gallery ?? selectedItem?.gallery ?? [];
  const activeGalleryLayout =
    selectedProject?.galleryLayout ?? selectedItem?.galleryLayout;

  const moveCategory = (direction: 1 | -1) => {
    setSelectedProject(null);
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
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;

    const handlePortfolioKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        else setSelectedItem(null);
      }

      if (selectedProject) return;

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

    window.addEventListener('keydown', handlePortfolioKeys);

    return () => {
      window.removeEventListener('keydown', handlePortfolioKeys);
    };
  }, [selectedItem, selectedProject]);

  return (
    <>
      <section
        id="work"
        aria-labelledby="portfolio-heading"
        className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      >
        <div aria-hidden="true" className="section-glow -left-60 top-32 bg-violet-500/15" />
        <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
            ჩვენი მიმართულებები
          </p>
          <h2
            id="portfolio-heading"
            className="text-3xl font-bold tracking-[-0.03em] text-ink sm:text-5xl"
          >
            გადახედე ნამუშევრებს
          </h2>
          <p className="mt-3 text-ink/55 sm:text-lg">
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
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedProject(null);
                }}
                aria-haspopup="dialog"
                className="group mx-auto block w-full max-w-[205px] rounded-[20px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="relative h-[132px] sm:h-[142px]">
                  <div className="absolute inset-x-2 top-1 z-10 h-[78px] overflow-hidden rounded-t-xl border border-ink/10 bg-ink/[0.06] shadow-lg transition-transform duration-300 ease-out group-hover:-translate-y-9">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="portfolio-folder-back absolute inset-x-0 bottom-0 top-[18px] z-0 rounded-[13px] border backdrop-blur-[26px]" />
                  <div className="portfolio-folder-tab absolute left-0 top-[28px] z-20 h-[32px] w-[58%] rounded-tl-[13px] rounded-tr-[16px] border-l border-t backdrop-blur-[26px] transition-transform duration-300 group-hover:-translate-y-1" />
                  <div className="portfolio-folder-front absolute inset-x-0 bottom-0 top-[44px] z-20 flex items-center justify-center rounded-[13px] border px-3 py-2 backdrop-blur-[24px] transition-all duration-300 group-hover:-translate-y-1">
                    <h3 className="text-center text-[12px] font-semibold uppercase leading-[1.3] tracking-[0.055em] text-ink/90 transition-colors group-hover:text-ink sm:text-[14px]">
                      {item.title.toLocaleUpperCase('ka-GE')}
                    </h3>
                  </div>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
        </div>
      </section>

      {createPortal(
        <AnimatePresence>
          {selectedItem && (
          <motion.div
            className="portfolio-backdrop fixed inset-0 z-[200] flex items-center justify-center p-3 backdrop-blur-2xl sm:p-6 lg:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedItem(null);
                setSelectedProject(null);
              }
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
              className="portfolio-dialog relative flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] border backdrop-blur-2xl sm:rounded-[30px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-accent/15 blur-[90px]"
              />

              <header className="relative flex shrink-0 items-start justify-between gap-5 border-b border-ink/[0.09] px-5 py-5 sm:px-8 sm:py-6">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/80 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(115,151,255,0.9)]" />
                    პორტფოლიო&nbsp;&nbsp;·&nbsp;&nbsp;
                    {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                    {String(portfolioItems.length).padStart(2, '0')}
                  </p>
                  <h3
                    id="portfolio-dialog-title"
                    className="mt-2 text-xl font-bold leading-tight tracking-[-0.025em] text-ink sm:text-3xl lg:text-4xl"
                  >
                    {selectedProject?.title ?? selectedItem.title}
                  </h3>
                  {selectedProject && (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-ink/[0.12] bg-ink/[0.05] px-3 text-xs font-semibold text-ink/65 transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                      პროექტებზე დაბრუნება
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(null);
                    setSelectedProject(null);
                  }}
                  aria-label="პორტფოლიოს ფანჯრის დახურვა"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/[0.12] bg-ink/[0.06] text-ink/65 backdrop-blur-xl transition-all hover:rotate-90 hover:border-ink/25 hover:bg-ink/[0.12] hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-11 sm:w-11"
                >
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 lg:p-8">
                {selectedItem.projects && !selectedProject ? (
                  <ul className="mx-auto grid w-full max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {Array.from({ length: 6 }, (_, projectIndex) => {
                      const project = selectedItem.projects?.[projectIndex];

                      if (!project) {
                        return (
                          <li
                            key={`project-placeholder-${projectIndex}`}
                            className="flex aspect-square flex-col items-center justify-center rounded-[18px] border border-dashed border-ink/[0.13] bg-ink/[0.025] text-center backdrop-blur-xl sm:rounded-[24px]"
                          >
                            <span className="text-2xl font-semibold tabular-nums text-ink/15 sm:text-3xl">
                              {String(projectIndex + 1).padStart(2, '0')}
                            </span>
                            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink/25 sm:text-[10px]">
                              მალე
                            </span>
                          </li>
                        );
                      }

                      return (
                        <motion.li
                          key={project.id}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.38,
                            delay: projectIndex * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            aria-label={`${project.title} პროექტის გახსნა`}
                            className="group relative block aspect-square w-full overflow-hidden rounded-[18px] border border-ink/[0.14] bg-ink/[0.04] text-left shadow-[0_22px_55px_-32px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_28px_65px_-32px_rgba(93,110,255,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:rounded-[24px]"
                          >
                            <img
                              src={project.cover}
                              alt=""
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-gradient-to-t from-[#050814]/90 via-[#050814]/12 to-transparent"
                            />
                            <span className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                              <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[10px]">
                                პროექტი
                              </span>
                              <span className="mt-1 block text-lg font-bold uppercase tracking-[0.06em] text-white sm:text-2xl">
                                {project.title}
                              </span>
                            </span>
                          </button>
                        </motion.li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="relative mx-auto w-full">
                    <div
                      className={`grid ${
                        activeGalleryLayout === 'long-form'
                          ? 'w-full gap-2 sm:gap-3'
                          : activeGallery.length === 1
                            ? 'mx-auto max-w-4xl gap-4 sm:gap-5'
                            : 'gap-4 sm:grid-cols-2 sm:gap-5'
                      }`}
                    >
                      {activeGallery.map((image, imageIndex) => (
                        <figure
                          key={`${image}-${imageIndex}`}
                          className={`relative isolate flex justify-center overflow-hidden rounded-[18px] border border-ink/[0.12] bg-ink/[0.035] shadow-[0_24px_70px_-36px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.18)] sm:rounded-[24px] ${
                            activeGalleryLayout === 'long-form'
                              ? 'items-start'
                              : 'items-center'
                          } ${activeGallery.length === 1 ? 'min-h-[260px]' : ''}`}
                        >
                          {activeGalleryLayout !== 'long-form' && (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 scale-110 bg-cover bg-center opacity-20 blur-2xl"
                              style={{ backgroundImage: `url(${image})` }}
                            />
                          )}
                          {activeGalleryLayout !== 'long-form' && (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-gradient-to-b from-[#050916]/20 via-[#050916]/35 to-[#050916]/60"
                            />
                          )}
                          <img
                            src={image}
                            alt={`${selectedProject?.title ?? selectedItem.title} — ნამუშევარი ${imageIndex + 1}`}
                            className={`relative z-10 w-full ${
                              activeGalleryLayout === 'long-form'
                                ? 'h-auto object-contain'
                                : activeGallery.length === 1
                                  ? 'max-h-[60vh] object-contain'
                                  : 'aspect-[4/3] h-full object-cover'
                            }`}
                          />
                        </figure>
                      ))}
                    </div>

                    {!selectedProject && (
                      <>
                        <button
                          type="button"
                          onClick={() => moveCategory(-1)}
                          aria-label="წინა პორტფოლიოს კატეგორია"
                          className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#090f20]/75 text-white shadow-xl backdrop-blur-xl transition-all hover:-translate-x-1 hover:-translate-y-1/2 hover:border-accent/70 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:left-4 sm:h-12 sm:w-12"
                        >
                          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveCategory(1)}
                          aria-label="შემდეგი პორტფოლიოს კატეგორია"
                          className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#090f20]/75 text-white shadow-xl backdrop-blur-xl transition-all hover:translate-x-1 hover:-translate-y-1/2 hover:border-accent/70 hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-4 sm:h-12 sm:w-12"
                        >
                          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <footer className="relative flex shrink-0 items-center justify-between gap-4 border-t border-ink/[0.09] px-5 py-3 sm:px-8 sm:py-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40 sm:text-xs">
                  კატეგორია
                </span>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {portfolioItems.map((item, index) => (
                    <span
                      key={item.id}
                      className={`h-1.5 rounded-full transition-all ${
                        index === selectedIndex ? 'w-6 bg-accent' : 'w-1.5 bg-ink/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="min-w-10 text-right text-xs font-semibold tabular-nums text-ink/55">
                  {selectedIndex + 1} / {portfolioItems.length}
                </span>
              </footer>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

