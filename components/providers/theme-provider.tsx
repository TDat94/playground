'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const THEMES = [
  'light',
  'dark',
  'catppuccin-latte',
  'catppuccin-mocha',
] as const;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme-preference"
      themes={[...THEMES]}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
