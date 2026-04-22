'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Greeting = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isNowDark = document.documentElement.classList.contains('dark');
      setIsDark(isNowDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const glowColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-2xl font-semibold tracking-tighter text-zinc-900 dark:text-zinc-100">
        Welcome to my personal{' '}
        <motion.span
          animate={{
            opacity: [0.4, 1, 0.4],
            textShadow: [
              `0px 0px 0px ${glowColor}`,
              `0px 0px 10px ${glowColor}`,
              `0px 0px 0px ${glowColor}`,
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-primary"
        >
          Playround
        </motion.span>
      </h1>
    </div>
  );
};
