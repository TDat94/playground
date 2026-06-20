'use client';

import { NewsLog } from '@/components/news/news-log';
import { news } from '@/features/news/data';

export default function NewsPage() {
  return (
    <div className="bg-background w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="font-display text-foreground text-3xl tracking-tighter sm:text-4xl">
          ~/news.log
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          # {news.length} entries · sorted newest first
        </p>
        <div className="mt-6">
          <NewsLog />
        </div>
      </div>
    </div>
  );
}
