'use client';

import { news } from '@/features/news/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MIN_GAP_PX = 72;
const MAX_GAP_PX = 540;

const monthsBetween = (later: Date, earlier: Date): number => {
  const yearDiff = later.getFullYear() - earlier.getFullYear();
  const monthDiff = later.getMonth() - earlier.getMonth();
  const dayAdjust = later.getDate() < earlier.getDate() ? 1 : 0;
  return Math.max(0, yearDiff * 12 + monthDiff - dayAdjust);
};

export const Timeline = () => {
  const sorted = [...news].sort((a, b) => b.date.getTime() - a.date.getTime());

  const monthGaps = sorted.map((item, i) =>
    i === sorted.length - 1
      ? 0
      : monthsBetween(sorted[i].date, sorted[i + 1].date),
  );
  const maxMonths = Math.max(1, ...monthGaps);

  const gaps = monthGaps.map((months) => {
    if (months === 0) {
      return MIN_GAP_PX;
    }
    const ratio = Math.log1p(months) / Math.log1p(maxMonths);
    return MIN_GAP_PX + ratio * (MAX_GAP_PX - MIN_GAP_PX);
  });

  const itemGaps = [0, ...gaps.slice(0, -1)];

  return (
    <div className="relative w-full">
      {/* Center vertical line (visible md+) */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-[var(--deep-indigo)] md:block"
      />
      {/* Center vertical line (mobile, offset for right-side cards) */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-4 w-0.5 bg-[var(--deep-indigo)] md:hidden"
      />

      <ol className="flex flex-col py-6">
        {sorted.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <li
              key={item.time + i}
              className="relative"
              style={{ marginTop: itemGaps[i] }}
            >
              {/* Dot on the center line */}
              <span
                aria-hidden
                className="bg-background absolute top-6 z-10 grid size-4 -translate-x-1/2 place-items-center rounded-full border-2 border-[var(--deep-indigo)]"
                style={{ left: 'calc(50% - 0px)' }}
              />

              {/* Mobile-only dot, aligned to the mobile line */}
              <span
                aria-hidden
                className="bg-background absolute top-6 z-10 grid size-4 -translate-x-1/2 place-items-center rounded-full border-2 border-[var(--deep-indigo)] md:hidden"
                style={{ left: '1rem' }}
              />

              <div
                className={['grid grid-cols-1 md:grid-cols-2', 'gap-y-3'].join(
                  ' ',
                )}
              >
                {/* Time + Icon column (desktop) */}
                <div
                  className={[
                    'hidden md:flex md:items-start md:gap-3 md:pr-8 md:text-right',
                    isLeft
                      ? 'md:justify-end'
                      : 'md:order-2 md:pl-8 md:text-left',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex items-center gap-3',
                      isLeft ? 'flex-row-reverse' : 'flex-row',
                    ].join(' ')}
                  >
                    <span
                      className={`nf ${item.icon} text-2xl text-[var(--deep-indigo)]`}
                    />
                    <span className="text-foreground text-sm font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>

                {/* Content card column (desktop) */}
                <div
                  className={[
                    'hidden md:block',
                    isLeft ? 'md:pl-8' : 'md:order-1 md:pr-8',
                  ].join(' ')}
                >
                  <Card size="sm">
                    <CardContent className="text-foreground/90 text-sm leading-relaxed">
                      {item.content}
                    </CardContent>
                  </Card>
                </div>

                {/* Mobile: combined single column */}
                <div className="pr-2 pl-12 md:hidden">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`nf ${item.icon} text-xl text-[var(--deep-indigo)]`}
                    />
                    <span className="text-foreground text-sm font-medium">
                      {item.time}
                    </span>
                  </div>
                  <Card size="sm">
                    <CardHeader className="pb-0">
                      <CardTitle className="sr-only">{item.time}</CardTitle>
                    </CardHeader>
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
