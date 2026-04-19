'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export const Greeting = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    // Listen for theme changes
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

  const glowColorLight = 'rgba(0, 0, 0, 0.2)';
  const glowColorDark = 'rgba(255, 255, 255, 0.3)';
  const glowColor = isDark ? glowColorDark : glowColorLight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100"
      >
        Welcome,{' '}
        <motion.span
          animate={
            isInView
              ? {
                  opacity: [0.4, 1, 0.4],
                  textShadow: [
                    `0px 0px 0px ${glowColor}`,
                    `0px 0px 10px ${glowColor}`,
                    `0px 0px 0px ${glowColor}`,
                  ],
                }
              : { opacity: 0.4, textShadow: `0px 0px 0px ${glowColor}` }
          }
          transition={{ duration: 2.5, repeat: isInView ? Infinity : 0 }}
          className="text-primary"
        >
          little lost soul
        </motion.span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-xl text-center text-lg whitespace-pre-line text-zinc-600 dark:text-zinc-400"
      >
        You&apos;ve wandered into the gallery of the forgotten.
        <br />
        Stay a while, and let the pixels guide you home.
      </motion.p>
    </motion.div>
  );
};
