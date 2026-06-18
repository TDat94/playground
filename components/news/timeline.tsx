'use client';

import { news } from '@/features/news/data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { computeGapRatios } from './timeline-utils';

export const Timeline = () => {
  const sorted = [...news].sort((a, b) => b.date.getTime() - a.date.getTime());
  const dates = sorted.map((item) => item.date);
  const ratios = computeGapRatios(dates);

  return (
    <div className="relative w-full">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-4 w-0.5 bg-[var(--deep-indigo)] md:left-1/2 md:-translate-x-1/2"
      />

      <ol className="flex flex-col py-6">
        {sorted.map((item, i) => {
          const isLeft = i % 2 === 0;
          const ratio = ratios[i];

          return (
            <li
              key={item.time + i}
              suppressHydrationWarning
              className="relative"
              style={
                ratio > 0
                  ? {
                      marginTop: `calc(var(--news-min-gap) + ${ratio} * (var(--news-max-gap) - var(--news-min-gap)))`,
                    }
                  : undefined
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  className={cn(
                    'relative flex items-center gap-3 py-1 pr-4 pl-12 md:py-0 md:pr-0 md:pl-0',
                    isLeft
                      ? 'md:justify-end md:pr-8 md:text-right'
                      : 'md:order-2 md:pl-8 md:text-left',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'bg-background absolute top-1/2 z-10 grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--deep-indigo)]',
                      'left-4',
                      isLeft ? 'md:left-full' : 'md:left-0',
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-[var(--deep-indigo)]" />
                  </span>
                  <span
                    className={cn(
                      'nf text-xl text-[var(--deep-indigo)] md:text-3xl',
                      item.icon,
                    )}
                  />
                  <span className="text-foreground text-sm font-medium md:text-base">
                    {item.time}
                  </span>
                </div>

                <div
                  className={cn(
                    'pr-4 pl-12 md:pr-0 md:pl-0',
                    isLeft ? 'md:pl-8' : 'md:order-1 md:pr-8',
                  )}
                >
                  <Card
                    size="sm"
                    className="border-primary/30 border transition-all hover:border-[var(--deep-indigo)] hover:shadow-sm"
                  >
                    <CardContent className="text-foreground/90 text-sm leading-relaxed">
                      {item.content}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
