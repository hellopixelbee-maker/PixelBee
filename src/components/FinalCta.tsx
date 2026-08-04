import React from 'react';
import { ArrowRightIcon, FacebookIcon, InstagramIcon, MailIcon } from 'lucide-react';
const contacts = [{
  label: 'hello@fluxstudio.co',
  href: 'mailto:hello@fluxstudio.co',
  Icon: MailIcon
}, {
  label: 'Instagram',
  href: 'https://instagram.com',
  Icon: InstagramIcon
}, {
  label: 'Facebook',
  href: 'https://facebook.com',
  Icon: FacebookIcon
}];
export function FinalCta() {
  return <footer id="contact" className="px-5 pb-8 pt-8 sm:px-8 sm:pb-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mesh-cool relative overflow-hidden rounded-card px-6 py-16 text-center sm:px-12 sm:py-24">
          <h2 className="mx-auto max-w-2xl text-[34px] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Your design backlog ends this week.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base">
            Two spots open. Subscribe today and your first request starts
            tomorrow morning.
          </p>

          <a href="mailto:hello@fluxstudio.co" className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-black/70 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Get started
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-black/10 pt-8 sm:flex-row">
          <span className="text-sm font-bold tracking-tight text-ink">
            Flux<span className="text-black/40">Studio</span>
          </span>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {contacts.map(({
            label,
            href,
            Icon
          }) => <li key={label}>
                <a href={href} className="inline-flex items-center gap-2 text-sm text-black/60 transition-colors duration-200 hover:text-ink">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </a>
              </li>)}
          </ul>

          <p className="text-sm text-black/40">
            © {new Date().getFullYear()} Flux Studio
          </p>
        </div>
      </div>
    </footer>;
}