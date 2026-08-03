import { Nav } from './components/Nav';
import {Hero} from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { HowItWorks } from './components/HowItWorks';
import { WhatYouGet } from './components/WhatYouGet';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
// import { Testimonials } from './components/Testimonials';
// import { FinalCta } from './components/FinalCta';
export function App() {
  return <div className="min-h-screen w-full bg-canvas font-sans text-ink">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Portfolio />
        <WhatYouGet />
        <Pricing />
        <Faq />
        {/* <Testimonials /> */}
      </main>
      {/* <FinalCta /> */}
    </div>;
}