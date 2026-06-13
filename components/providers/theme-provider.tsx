'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { THEME_NAMES, STORAGE_KEY } from './themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme={false}
      storageKey={STORAGE_KEY}
      themes={THEME_NAMES}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
