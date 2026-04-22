'use client';

import Image from 'next/image';
import { Lora } from 'next/font/google';
import { basePath } from '@/components/global/constants';
import { Greeting } from '@/components/landing/greetings';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic'],
  display: 'swap',
});

export default function Landing() {
  return (
    <div className="bg-background w-full">
      {/* Quote Section */}
      <div className="items-top mx-auto flex w-full max-w-4xl justify-center px-4 pt-16 sm:px-8">
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
          <div className="bg-foreground/10 flex w-full flex-col items-center justify-center rounded-lg p-4 dark:bg-white/10">
            <blockquote className={`${lora.className} w-full space-y-2`}>
              <p className="w-full text-center text-xl text-zinc-900 italic sm:text-xl dark:text-zinc-100">
                One day you&apos;ll leave this world behind. So live a life you
                will remember.
              </p>
              <p className="text-md w-full text-right font-medium text-zinc-600 dark:text-zinc-400">
                ~ The Nights by Avicii ~
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Greeting Section */}
      <div className="mx-auto flex w-full max-w-4xl items-start justify-start py-16 sm:px-8">
        <div className="w-full">
          <Greeting />
        </div>
      </div>
    </div>
  );
}
