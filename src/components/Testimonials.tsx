import React from 'react';
import { MessageSquareQuoteIcon } from 'lucide-react';
import { testimonials } from '../data/testimonials';
export function Testimonials() {
  const hasTestimonials = testimonials.length > 0;
  return <section aria-labelledby="testimonials-heading" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 id="testimonials-heading" className="text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
          What clients say
        </h2>

        {hasTestimonials ? <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => <li key={testimonial.name} className="flex flex-col justify-between rounded-card bg-white p-7 transition-transform duration-200 hover:-translate-y-1">
                <blockquote className="text-[17px] leading-relaxed text-ink">
                  “{testimonial.quote}”
                </blockquote>
                <div className="mt-7 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                    {testimonial.initials}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-ink">
                      {testimonial.name}
                    </span>
                    <span className="block text-black/50">
                      {testimonial.role}
                    </span>
                  </span>
                </div>
              </li>)}
          </ul> : <div className="mt-10 flex flex-col items-center rounded-card border border-dashed border-black/15 bg-white/60 px-6 py-16 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.06]">
              <MessageSquareQuoteIcon className="h-5 w-5 text-black/50" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="mt-4 text-base font-semibold text-ink">
              No reviews here yet
            </p>
            <p className="mt-1 max-w-sm text-sm text-black/55">
              The first few clients are onboarding now. Their words will show up
              here soon.
            </p>
          </div>}
      </div>
    </section>;
}