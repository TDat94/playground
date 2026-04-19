'use client';

import Image from 'next/image';
import { Lora } from 'next/font/google';
import { basePath } from '@/components/global/constants';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic'],
  display: 'swap',
});

export default function Landing() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-16 sm:px-8 dark:bg-black">
      <div className="flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        {/* Image Section */}
        <div className="flex flex-shrink-0 items-center justify-center lg:w-1/2">
          <Image
            src={`${basePath}/Avicii.jpg`}
            alt="Avicii portrait"
            width={400}
            height={500}
            priority
            className="rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Quote Section */}
        <div className="flex flex-col items-start justify-center lg:w-1/2">
          <blockquote className={`${lora.className} space-y-6`}>
            <p className="text-3xl leading-relaxed text-zinc-900 italic sm:text-4xl dark:text-zinc-100">
              One day you&apos;ll leave this world behind. So live a life you
              will remember.
            </p>
            <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
              — The Nights by Avicii
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
