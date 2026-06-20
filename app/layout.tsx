import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/global/polybar';
import { Providers } from '@/components/providers/theme-provider';
import {
  STORAGE_KEY,
  THEME_MODES,
  THEME_NAMES,
} from '@/components/providers/themes';

// Note: Departure Mono is not exported by next/font/google. We use
// JetBrains Mono (loaded with weights up to 700) as the body font
// and target the same family at weight 700 in the display role
// (via the `font-display` class in components/landing/hero.tsx).
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const displayFont = jetbrainsMono;

export const metadata: Metadata = {
  title: "Dat's Playground",
  description:
    'A personal portfolio, which is also a playground to mess around with website development and design.',
};

const validThemes = JSON.stringify(THEME_NAMES);
const themeModes = JSON.stringify(THEME_MODES);

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored && ${validThemes}.includes(stored) ? stored : 'catppuccin-mocha';
    var mode = (${themeModes})[theme] || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme-mode', mode);
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
        jetbrainsMono.variable,
        displayFont.variable,
        'font-sans',
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
