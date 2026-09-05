import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

const links = [
  {
    label: 'როგორ მუშაობს',
    href: '#howitworks',
  },
  {
    label: 'ნამუშევრები',
    href: '#work',
  },
  {
    label: 'ფასები',
    href: '#pricing',
  },
  {
    label: 'FAQ',
    href: '#faq',
  },
];

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function Nav() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isLight = theme === 'light';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      localStorage.setItem('pixel-bee-theme', theme);
    } catch {
      // The selected theme still works for the current session if storage is unavailable.
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className="site-nav mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-2xl border px-4 backdrop-blur-[30px] sm:px-6"
      >
        <a
          href="#top"
          className="shrink-0 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <img
            src="/wordlogo.png"
            alt="Pixel Bee"
            width="655"
            height="151"
            className="h-5 w-auto sm:h-8"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink/55 transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            aria-label={isLight ? 'მუქი თემის ჩართვა' : 'ღია თემის ჩართვა'}
            aria-pressed={isLight}
            title={isLight ? 'მუქი თემა' : 'ღია თემა'}
            className="theme-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-ink transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-11 sm:w-11"
          >
            {isLight ? (
              <MoonIcon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <SunIcon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>

          <a
            href="#contact"
            className="rounded-full border border-white/15 bg-gradient-to-r from-[#6f9fff] to-[#8b7cff] px-3 py-2.5 text-[12px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(111,159,255,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 sm:text-sm"
          >
            დაგვიკავშირდი
          </a>
        </div>
      </nav>
    </header>
  );
}
