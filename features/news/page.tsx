'use client';

import { Timeline } from '@/components/news/timeline';

export default function NewsPage() {
  return (
    <div className="bg-background w-full">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-start gap-6 px-4 py-8 sm:px-8">
        <div className="flex flex-col items-start justify-start gap-2">
          <h1 className="text-foreground text-3xl font-semibold tracking-tighter">
            News
          </h1>
          <p className="text-foreground/70 text-sm">
            A timeline of notable moments, sorted from most recent to oldest.
            Distant events are compressed, recent ones breathe.
          </p>
        </div>
        <Timeline />
      </div>
    </div>
  );
}
