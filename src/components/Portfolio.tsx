import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
  portfolioItems,
} from '../data/portfolio';

interface ArcConfig {
  radius: number;
  step: number;
  cardWidth: number;
}

function configFor(width: number): ArcConfig {
  if (width < 640) {
    return {
      radius: 450,
      step: 22,
      cardWidth: 220,
    };
  }

  if (width < 1024) {
    return {
      radius: 600,
      step: 19,
      cardWidth: 290,
    };
  }

  return {
    radius: 780,
    step: 16,
    cardWidth: 360,
  };
}
export function Portfolio() {

  const [index, setIndex] = useState(0);

  const [arc, setArc] = useState<ArcConfig>(() =>
    configFor(
      typeof window === 'undefined'
        ? 1280
        : window.innerWidth
    )
  );

  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const drag = useRef({
    active: false,
    startX: 0,
    handled: false,
  });

  const touchStartX = useRef(0);
  const wheelLock = useRef(false);

  const items = portfolioItems;

  useEffect(() => {
    let timeout: number;

    const onResize = () => {
      clearTimeout(timeout);

      timeout = window.setTimeout(() => {
        setArc(configFor(window.innerWidth));
      }, 100);
    };

    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
  }, []);


  const move = useCallback(
    (direction: 1 | -1) => {
      if (items.length === 0) return;

      setIndex(
        (current) =>
          (current + direction + items.length) %
          items.length
      );
    },
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return;

    const timer = window.setInterval(() => {
      move(1);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [paused, move, items.length]);

  const offsetOf = (i: number) => {
    const n = items.length;

    let offset = i - index;

    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;

    return offset;
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
  };

  const onPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    drag.current = {
      active: true,
      startX: event.clientX,
      handled: false,
    };
  };

  const onPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      !drag.current.active ||
      drag.current.handled
    ) {
      return;
    }

    const delta =
      event.clientX - drag.current.startX;

    if (Math.abs(delta) > 50) {
      drag.current.handled = true;
      move(delta < 0 ? 1 : -1);
    }
  };

  const onTouchStart = (
  event: React.TouchEvent<HTMLDivElement>
) => {
  touchStartX.current =
    event.touches[0].clientX;
};

const onTouchEnd = (
  event: React.TouchEvent<HTMLDivElement>
) => {
  const touchEndX =
    event.changedTouches[0].clientX;

  const delta =
    touchEndX - touchStartX.current;

  if (Math.abs(delta) < 50) return;

  if (delta < 0) {
    move(1);
  } else {
    move(-1);
  }
};

  const onWheel = (
    event: React.WheelEvent<HTMLDivElement>
  ) => {
    if (wheelLock.current) return;

    const threshold = 30;

    if (Math.abs(event.deltaX) < threshold) return;

    wheelLock.current = true;

    if (event.deltaX > 0) {
      move(1);
    } else {
      move(-1);
    }

    setTimeout(() => {
      wheelLock.current = false;
    }, 350);
  };

  const endDrag = () => {
    drag.current.active = false;

    requestAnimationFrame(() => {
      drag.current.handled = false;
    });
  };

  // Track scroll progress across the ENTIRE time the section is in the
  // viewport (from the moment it enters at the bottom, to the moment it
  // exits at the top) instead of only the "entering" sliver. This is what
  // lets us expand on arrival, hold, and collapse again on the way out.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const expandProgress = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 1],
    [0, 1, 1, 0]
  );

  const spreadMotion = useSpring(
    expandProgress,
    {
      stiffness: 120,
      damping: 20,
    }
  );

  // `spreadMotion` is a Framer Motion MotionValue — updating it does NOT by
  // itself trigger a React re-render, so reading `.get()` during render (as
  // the previous version did) only ever captured a single stale value.
  // Subscribing here mirrors it into React state so every animation frame
  // actually re-renders the cards with the live spread value.
  const [spread, setSpread] = useState(0);

  useEffect(() => {
    const unsubscribe = spreadMotion.on('change', (latest) => {
      setSpread(latest);
    });

    return unsubscribe;
  }, [spreadMotion]);

  const current = items[index];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="overflow-hidden py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
              გადახედე ნამუშევრებს
            </h2>

            <p className="mt-2 text-black/55">
              დიზაინები, რომლებიც იდეებს ვიზუალურ ისტორიებად აქცევს.
            </p>
          </div>
        </div>
      </div>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Recent work"
        tabIndex={0}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerLeave={() => {
          endDrag();
          setPaused(false);
        }}
        onPointerEnter={() => setPaused(true)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative mt-12 h-[300px] cursor-grab select-none active:cursor-grabbing sm:mt-16 sm:h-[380px] lg:h-[440px] focus-visible:outline-none"
        style={{
        perspective: '1400px',
        touchAction: 'pan-y',
          }}
      >
        {items.map((item, i) => {
          const offset = offsetOf(i);

          const angle = offset * arc.step;

          const radians =
            (angle * Math.PI) / 180;

          const x =
            arc.radius *
            Math.sin(radians) *
            spread;

          const y =
            arc.radius *
            (1 - Math.cos(radians)) *
            spread;

          const distance =
            Math.abs(offset);

          const visible = distance <= 3;
          const stackRotation = offset * 2;

          return (
            <motion.button
              key={item.id}
              type="button"
              aria-label={item.title}
              aria-current={offset === 0}
              aria-hidden={!visible}
              tabIndex={visible ? 0 : -1}
              onClick={() => {
                if (drag.current.handled) return;

                window.open(
                  item.link,
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              animate={{
                x,
                y: y - (1 - spread) * 30,
                rotate:
                spread < 0.2
                  ? stackRotation
                  : angle * spread,

                scale:
                  spread < 0.15
                    ? 0.85
                    : offset === 0
                    ? 1
                    : 1.03 -
                      distance * 0.025,

                opacity:
                  spread < 0.15
                    ? 1
                    : visible
                    ? 1 - distance * 0.28
                    : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 18,
                mass: 0.12,
              }}
              style={{
                width: arc.cardWidth,
                zIndex: Math.max(
                  1,
                  20 - distance
                ),
                left: '50%',
                marginLeft:
                  -arc.cardWidth / 2,
                pointerEvents: visible
                  ? 'auto'
                  : 'none',
              }}
              className="group absolute top-0 origin-center overflow-hidden rounded-tile bg-white shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center
                  bg-black/40 opacity-0 transition-opacity duration-300
                  ${
                    offset === 0
                      ? 'group-hover:opacity-100'
                      : ''
                  }`}
                >
                  <span
                      className={`translate-y-4 text-lg font-semibold text-white transition-transform duration-300
                      ${
                        offset === 0
                          ? 'group-hover:translate-y-0'
                          : ''
                      }`}
                    >                    {item.title}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-6xl flex-col items-center gap-6 px-5 sm:px-8">
        <div className="h-12 text-center">
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <p className="text-base font-semibold text-ink sm:text-lg">
                  {current.title}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <ChevronLeftIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
          </button>

          <ul className="flex items-center gap-2">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${item.title}`}
                  aria-current={i === index}
                  className={`block h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    i === index
                      ? 'w-6 bg-ink'
                      : 'w-2 bg-black/20 hover:bg-black/40'
                  }`}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <ChevronRightIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}