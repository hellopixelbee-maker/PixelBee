import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { categories, portfolioItems, type PortfolioCategory } from '../data/portfolio';
interface ArcConfig {
  radius: number;
  step: number;
  cardWidth: number;
}
function configFor(width: number): ArcConfig {
  if (width < 640) return {
    radius: 420,
    step: 24,
    cardWidth: 220
  };
  if (width < 1024) return {
    radius: 560,
    step: 21,
    cardWidth: 290
  };
  return {
    radius: 720,
    step: 18,
    cardWidth: 360
  };
}
export function Portfolio() {
  const [active, setActive] = useState<'All' | PortfolioCategory>('All');
  const [index, setIndex] = useState(0);
  const [arc, setArc] = useState<ArcConfig>(() => configFor(typeof window === 'undefined' ? 1280 : window.innerWidth));
  const [paused, setPaused] = useState(false);
  const drag = useRef({
    active: false,
    startX: 0,
    handled: false
  });
  const items = useMemo(() => active === 'All' ? portfolioItems : portfolioItems.filter((item) => item.category === active), [active]);
  useEffect(() => {
    const onResize = () => setArc(configFor(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    setIndex(0);
  }, [active]);
  const move = useCallback((direction: 1 | -1) => {
    setIndex((current) => (current + direction + items.length) % items.length);
  }, [items.length]);
  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => move(1), 4200);
    return () => window.clearInterval(timer);
  }, [paused, move, items.length]);
  const offsetOf = (i: number) => {
    const n = items.length;
    let offset = i - index;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    return offset;
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
  };
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current = {
      active: true,
      startX: event.clientX,
      handled: false
    };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || drag.current.handled) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 50) {
      drag.current.handled = true;
      move(delta < 0 ? 1 : -1);
    }
  };
  const endDrag = () => {
    drag.current.active = false;
  };
  const current = items[index];
  return <section id="work" className="overflow-hidden py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
              Recent work
            </h2>
            <p className="mt-2 text-black/55">
              A sample of what lands in client inboxes each week.
            </p>
          </div>

          
        </div>
      </div>

      {/* Arc carousel */}
      <div role="group" aria-roledescription="carousel" aria-label="Recent work" tabIndex={0} onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={() => {
      endDrag();
      setPaused(false);
    }} onPointerEnter={() => setPaused(true)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="relative mt-12 h-[300px] cursor-grab select-none active:cursor-grabbing sm:mt-16 sm:h-[380px] lg:h-[440px] focus-visible:outline-none" style={{
      perspective: '1400px'
    }}>
        {items.map((item, i) => {
        const offset = offsetOf(i);
        const angle = offset * arc.step;
        const radians = angle * Math.PI / 180;
        const x = arc.radius * Math.sin(radians);
        const y = arc.radius * (1 - Math.cos(radians));
        const distance = Math.abs(offset);
        const visible = distance <= 3;
        return <motion.button key={item.id} type="button" aria-label={`${item.title} — ${item.category}`} aria-current={offset === 0} aria-hidden={!visible} tabIndex={visible ? 0 : -1} onClick={() => {
          if (drag.current.handled) return;
          setIndex(i);
        }} animate={{
          x,
          y,
          rotate: angle,
          scale: offset === 0 ? 1 : 1 - distance * 0.06,
          opacity: visible ? 1 - distance * 0.18 : 0,
          filter: offset === 0 ? 'blur(0px)' : `blur(${distance * 0.8}px)`
        }} transition={{
          type: 'spring',
          stiffness: 90,
          damping: 18,
          mass: 0.7
        }} style={{
          width: arc.cardWidth,
          zIndex: 20 - distance,
          left: '50%',
          marginLeft: -arc.cardWidth / 2,
          pointerEvents: visible ? 'auto' : 'none'
        }} className="absolute top-0 origin-center overflow-hidden rounded-tile bg-white shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={`${item.title} — ${item.category} project`} loading="lazy" draggable={false} className="h-full w-full select-none object-cover" />
              </div>
            </motion.button>;
      })}
      </div>

      {/* Caption + controls */}
      <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col items-center gap-6 px-5 sm:px-8">
        <div className="h-12 text-center">
          <AnimatePresence mode="wait">
            {current && <motion.div key={current.id} initial={{
            opacity: 0,
            y: 6
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -6
          }} transition={{
            duration: 0.25
          }}>
                <p className="text-base font-semibold text-ink sm:text-lg">
                  {current.title}
                </p>
                <p className="mt-0.5 text-sm text-black/45">
                  {current.category}
                </p>
              </motion.div>}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-5">
          <button type="button" onClick={() => move(-1)} aria-label="Previous project" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>

          <ul className="flex items-center gap-2">
            {items.map((item, i) => <li key={item.id}>
                <button type="button" onClick={() => setIndex(i)} aria-label={`Go to ${item.title}`} aria-current={i === index} className={`block h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${i === index ? 'w-6 bg-ink' : 'w-2 bg-black/20 hover:bg-black/40'}`} />
              </li>)}
          </ul>

          <button type="button" onClick={() => move(1)} aria-label="Next project" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>;
}