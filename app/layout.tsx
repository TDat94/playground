import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/global/header';
import { Providers } from '@/components/providers/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Dat's Playground",
  description:
    'A personal portfolio, which is also a playground to mess around with website development and design.',
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme-preference');
    var theme = stored && ['light', 'dark', 'catppuccin-latte', 'catppuccin-mocha'].includes(stored)
      ? stored
      : 'light';
    var root = document.documentElement;
    root.classList.remove('light', 'dark', 'catppuccin-latte', 'catppuccin-mocha');
    root.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <Header className="fixed top-0 right-0 left-0 z-50" />
          <main className="pt-16">{children}</main>
        </Providers>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </body>
    </html>
  );
}
