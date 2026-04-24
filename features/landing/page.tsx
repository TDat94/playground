'use client';

import Image from 'next/image';
import { Lora } from 'next/font/google';
import { basePath } from '@/components/global/constants';
import { Greeting } from '@/components/landing/greetings';
import { AboutMe } from '@/components/landing/about';
import { Interests } from '@/components/landing/interests';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic'],
  display: 'swap',
});

export default function LandingPage() {
  return (
    <div className="bg-background w-full">
      {/* Quote Section */}
      <div className="items-top mx-auto flex w-full max-w-4xl justify-center px-4 py-8 sm:px-8">
        <div className="flex w-full flex-col items-center gap-8">
          {/* Image Section */}
          <div className="flex w-full flex-shrink-0 items-center justify-center">
            <Image
              src={`${basePath}/Avicii.jpg`}
              alt="Avicii portrait"
              width={1280}
              height={380}
              priority
              className="object-cover"
            />
          </div>

          {/* Quote Section */}
          <div className="bg-foreground/10 flex w-full flex-col items-center justify-center rounded-lg p-4">
            <blockquote className={`${lora.className} w-full space-y-2`}>
              <p className="text-foreground dark:muted-foreground w-full text-center text-xl italic sm:text-xl">
                One day you&apos;ll leave this world behind. So live a life you
                will remember.
              </p>
              <p className="text-md text-foreground/70 w-full text-right font-medium">
                ~ The Nights by Avicii ~
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Greeting Section */}
      <div className="mx-auto flex w-full max-w-4xl items-start justify-start py-8 sm:px-8">
        <div className="w-full">
          <Greeting />
        </div>
      </div>

      {/* About Me Section */}
      <div className="mx-auto flex w-full max-w-4xl items-start justify-start py-8 sm:px-8">
        <div className="w-full">
          <AboutMe />
        </div>
      </div>

      {/* Interests Section */}
      <div className="mx-auto flex w-full max-w-4xl items-start justify-start py-8 sm:px-8">
        <div className="w-full">
          <Interests />
        </div>
      </div>
    </div>
  );
}
