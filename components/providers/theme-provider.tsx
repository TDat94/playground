'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme-preference"
      themes={['light', 'dark', 'catppuccin-latte', 'catppuccin-mocha']}
    >
      {children}
    </ThemeProvider>
  );
}
