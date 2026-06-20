'use client';

import { Hero } from '@/components/landing/hero';
import { Monogram } from '@/components/landing/monogram';
import { Quote } from '@/components/landing/quote';
import { AboutMe } from '@/components/landing/about';
import { Directory } from '@/components/landing/directory';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="bg-background w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Hero */}
        <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto]">
          <Hero />
          <Monogram />
        </section>

        {/* Quote */}
        <section>
          <Quote
            text={`One day you'll leave this world behind. So live a life you will remember.`}
            attribution="The Nights by Avicii"
          />
        </section>

        {/* About */}
        <section>
          <AboutMe />
        </section>

        {/* Directory */}
        <section>
          <Directory />
        </section>
      </div>
      <Footer />
    </div>
  );
}
