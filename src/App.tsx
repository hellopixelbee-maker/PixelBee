import { Nav } from './components/Nav';
import {Hero} from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { HowItWorks } from './components/HowItWorks';
import { WhatYouGet } from './components/WhatYouGet';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="relative min-h-screen w-full overflow-clip bg-canvas font-sans text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-blue-600/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-[-14rem] top-[38%] h-[38rem] w-[38rem] rounded-full bg-violet-600/10 blur-[130px]"
      />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <Portfolio />
        <WhatYouGet />
        <Pricing />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
