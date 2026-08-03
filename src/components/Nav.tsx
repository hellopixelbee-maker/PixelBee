import React from 'react';
const links = [{
  label: 'Work',
  href: '#work'
}, {
  label: 'Process',
  href: '#process'
}, {
  label: 'Pricing',
  href: '#pricing'
}, {
  label: 'FAQ',
  href: '#faq'
}];
export function Nav() {
  return <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-canvas/80 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-[17px] font-bold tracking-tight text-ink">
          Flux<span className="text-black/40">Studio</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-black/60 transition-colors duration-200 hover:text-ink">
                {link.label}
              </a>
            </li>)}
        </ul>

        <a href="#pricing" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          Get started
        </a>
      </nav>
    </header>;
}