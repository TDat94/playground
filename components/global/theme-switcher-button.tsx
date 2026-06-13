'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { basePath } from '@/components/global/constants';
import {
  THEME_LABELS,
  THEME_MODES,
  THEME_NAMES,
  type ThemeName,
} from '@/components/providers/themes';

const subscribe = () => () => {};
const useHasMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

function ThemeIcon({ theme }: { theme: ThemeName }) {
  switch (theme) {
    case 'light':
      return <span className="nf nf-fa-sun block text-lg leading-none" />;
    case 'dark':
      return <span className="nf nf-fa-moon block text-lg leading-none" />;
    case 'catppuccin-latte':
      return (
        <Image
          src={`${basePath}/catppuccin-light.png`}
          alt="Catppuccin Latte"
          width={20}
          height={20}
          className="block h-5 w-5"
        />
      );
    case 'catppuccin-mocha':
      return (
        <Image
          src={`${basePath}/catppuccin-dark.png`}
          alt="Catppuccin Mocha"
          width={20}
          height={20}
          className="block h-5 w-5"
        />
      );
  }
}

export function ThemeSwitcherButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();
  const themes = THEME_NAMES;

  const currentTheme = themes.includes(resolvedTheme as ThemeName)
    ? (resolvedTheme as ThemeName)
    : 'light';
  const currentIndex = themes.indexOf(currentTheme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

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
  };

  return (
    <motion.div
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 1000, damping: 20 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => mounted && applyTheme(nextTheme)}
        className="rounded-lg"
        aria-label={
          mounted ? `Switch to ${THEME_LABELS[nextTheme]}` : 'Switch theme'
        }
        title={
          mounted
            ? `Click to switch to ${THEME_LABELS[nextTheme]}`
            : 'Switch theme'
        }
        suppressHydrationWarning
      >
        {mounted ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentTheme}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center justify-center"
            >
              <ThemeIcon theme={currentTheme} />
            </motion.span>
          </AnimatePresence>
        ) : (
          <span
            aria-hidden
            className="block text-lg leading-none opacity-0"
            style={{ width: '1em', height: '1em' }}
          />
        )}
      </Button>
    </motion.div>
  );
}
