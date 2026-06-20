'use client';

import { Resume } from '@/components/resume/resume';

export default function ResumePage() {
  return (
    <div className="bg-background w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="font-display text-foreground text-3xl tracking-tighter sm:text-4xl">
          ~/resume.pdf
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          # embedded · click open for full screen
        </p>
        <div className="mt-6">
          <Resume />
        </div>
      </div>
    </div>
  );
}
