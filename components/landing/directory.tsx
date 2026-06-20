'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { interests } from '@/features/landing/data';
import { cn } from '@/lib/utils';

const colorByCategory: Record<string, string> = {
  Programming: 'var(--cat-sapphire)',
  'Art & Design': 'var(--mauve)',
  Languages: 'var(--cat-peach)',
  Sports: 'var(--cat-green)',
  Music: 'var(--cat-red)',
  Games: 'var(--cat-yellow)',
};

const slugByCategory: Record<string, string> = {
  Programming: 'programming',
  'Art & Design': 'art-and-design',
  Languages: 'languages',
  Sports: 'sports',
  Music: 'music',
  Games: 'games',
};

export function Directory() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-border bg-card overflow-hidden rounded-lg border">
      <div className="border-border text-mauve flex items-center border-b px-4 py-2 font-mono text-xs tracking-wider uppercase">
        <span>~/interests/</span>
      </div>
      <ul role="list" className="font-mono text-sm">
        {interests.map((category, i) => {
          const isOpen = openIndex === i;
          const accent = colorByCategory[category.name] ?? 'var(--mauve)';
          const slug =
            slugByCategory[category.name] ?? category.name.toLowerCase();
          return (
            <li
              key={category.name}
              className="border-border border-b last:border-b-0"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`dir-panel-${i}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={cn(
                  'hover:bg-secondary flex w-full items-center gap-3 px-4 py-2 text-left transition-colors',
                )}
              >
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground block"
                  aria-hidden
                >
                  <ChevronRight />
                </motion.span>
                <span className="text-muted-foreground w-24 shrink-0">
                  drwxr-xr-x
                </span>
                <span
                  className="inline-block size-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: accent }}
                  aria-hidden
                />
                <span className="text-foreground flex-1 truncate">{slug}</span>
                <span className="text-muted-foreground shrink-0">
                  &rarr; {category.items.length} items
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`dir-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                    style={{ borderLeft: `2px solid ${accent}` }}
                  >
                    <ul className="space-y-1 px-12 py-3 text-sm">
                      {category.items.map((item) =>
                        item.url !== '#' ? (
                          <li key={item.name}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground hover:text-mauve"
                            >
                              <span className="text-muted-foreground">~</span>{' '}
                              {item.name}
                            </a>
                          </li>
                        ) : (
                          <li key={item.name}>
                            <span className="text-foreground">
                              <span className="text-muted-foreground">~</span>{' '}
                              {item.name}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
