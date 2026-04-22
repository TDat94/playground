'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ThemeSwitcherButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  const handleClick = () => {
    setTheme(isDark ? 'light' : 'dark');
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
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className={`nf text-lg ${isDark ? 'nf-fa-moon' : 'nf-fa-sun'}`} />
      </Button>
    </motion.div>
  );
}
