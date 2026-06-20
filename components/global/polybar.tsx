'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Coffee, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  THEME_LABELS,
  THEME_MODES,
  THEME_NAMES,
  type ThemeName,
} from '@/components/providers/themes';

const navLinks: { label: string; href: string }[] = [
  { label: 'home', href: '/' },
  { label: 'news', href: '/news' },
  { label: 'resume', href: '/resume' },
  { label: 'roadmap', href: '/roadmap' },
];

function ThemeIcon({ theme }: { theme: ThemeName }) {
  switch (theme) {
    case 'light':
      return <Sun />;
    case 'dark':
      return <Moon />;
    case 'catppuccin-latte':
      return <Coffee />;
    case 'catppuccin-mocha':
      return <Monitor />;
  }
}

function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function useClock() {
  const [now, setNow] = useState<string>(() =>
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  );
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      );
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function BlinkingPrompt({ mounted }: { mounted: boolean }) {
  if (!mounted) return <span className="font-mono">$</span>;
  return (
    <span
      className="animate-pulse font-mono"
      style={{ animationDuration: '1s' }}
      aria-hidden
    >
      $
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const time = useClock();
  const [open, setOpen] = useState(false);

  const currentTheme: ThemeName = THEME_NAMES.includes(
    resolvedTheme as ThemeName,
  )
    ? (resolvedTheme as ThemeName)
    : 'catppuccin-mocha';

  const applyTheme = (newTheme: ThemeName) => {
    const apply = () => {
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.setAttribute(
        'data-theme-mode',
        THEME_MODES[newTheme],
      );
      setTheme(newTheme);
    };
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (
        document as Document & {
          startViewTransition: (cb: () => void) => unknown;
        }
      ).startViewTransition(apply);
    } else {
      apply();
    }
    setOpen(false);
  };

  return (
    <header
      className={cn('border-border fixed top-0 right-0 left-0 z-50 border-b')}
    >
      {/* Top strip */}
      <div className="bg-card text-foreground">
        <div className="max-w-8xl mx-auto flex h-8 items-center justify-between px-4 font-mono text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 truncate">
            <span className="text-mauve">tuan</span>
            <span className="text-muted-foreground">@</span>
            <span className="text-mauve">dat</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-foreground">~</span>
            <span className="text-foreground">/playground</span>
            <span className="text-mauve ml-2">
              <BlinkingPrompt mounted={mounted} />
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme pill */}
            <div className="relative">
              <Button
                variant="ghost"
                size="xs"
                className="h-6 gap-1.5 px-2 font-mono text-xs"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Select theme"
                suppressHydrationWarning
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mounted ? currentTheme : 'ssr'}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                    suppressHydrationWarning
                  >
                    {mounted ? (
                      <ThemeIcon
                        theme={currentTheme}
                        data-icon="inline-start"
                      />
                    ) : (
                      <Monitor
                        className="size-4"
                        data-icon="inline-start"
                        aria-hidden
                      />
                    )}
                    <span>
                      {mounted
                        ? THEME_LABELS[currentTheme]
                        : THEME_LABELS['catppuccin-mocha']}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </Button>
              {open && (
                <ul
                  role="listbox"
                  className="bg-card border-border absolute right-0 z-50 mt-1 w-48 overflow-hidden rounded-md border font-mono text-xs shadow-md"
                >
                  {THEME_NAMES.map((name) => (
                    <li key={name}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={name === currentTheme}
                        onClick={() => applyTheme(name)}
                        className={cn(
                          'hover:bg-secondary flex w-full items-center gap-2 px-3 py-1.5 text-left',
                          name === currentTheme && 'text-mauve',
                        )}
                      >
                        <ThemeIcon theme={name} data-icon="inline-start" />
                        <span>{THEME_LABELS[name]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Clock */}
            <time
              className="text-muted-foreground tabular-nums"
              suppressHydrationWarning
            >
              {mounted ? time : '--:--'}
            </time>
            {/* Status */}
            <span className="flex items-center gap-1.5">
              <span
                className="bg-cat-green inline-block size-1.5 rounded-full"
                aria-hidden
              />
              <span className="text-muted-foreground">online</span>
            </span>
          </div>
        </div>
      </div>

      {/* Nav strip */}
      <div className="bg-background">
        <div className="max-w-8xl mx-auto flex h-12 items-center px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center gap-1 font-mono text-sm"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href ||
                    pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  className={cn(
                    'nav-underline text-foreground hover:text-mauve px-3 py-1.5 transition-colors',
                    isActive && 'text-mauve',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
