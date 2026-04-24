'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { basePath } from '@/components/global/constants';

export function ThemeSwitcherButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const themes = ['light', 'dark', 'catppuccin-latte', 'catppuccin-mocha'];
  const currentThemeIndex = themes.indexOf(resolvedTheme || 'light');
  const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
  const nextTheme = themes[nextThemeIndex];

  const getThemeLabel = (theme: string) => {
    const labels: Record<string, string> = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      'catppuccin-latte': 'Catppuccin Latte',
      'catppuccin-mocha': 'Catppuccin Mocha',
    };
    return labels[theme];
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'light':
        return <span className="nf nf-fa-sun text-lg" />;
      case 'dark':
        return <span className="nf nf-fa-moon text-lg" />;
      case 'catppuccin-latte':
        return (
          <Image
            src={`${basePath}/catppuccin-light.png`}
            alt="Catppuccin Latte"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
      case 'catppuccin-mocha':
        return (
          <Image
            src={`${basePath}/catppuccin-dark.png`}
            alt="Catppuccin Mocha"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
      default:
        return <span className="nf nf-fa-sun text-lg" />;
    }
  };

  const handleClick = () => {
    setTheme(nextTheme);
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
        onClick={handleClick}
        className="rounded-lg"
        aria-label={`Switch to ${getThemeLabel(nextTheme)}`}
        title={`Click to switch to ${getThemeLabel(nextTheme)}`}
      >
        {getThemeIcon(resolvedTheme || 'light')}
      </Button>
    </motion.div>
  );
}
