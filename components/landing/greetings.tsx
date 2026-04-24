'use client';

import { motion } from 'framer-motion';

export const Greeting = () => {
  const glowColor = 'rgba(255, 255, 255, 0.3)';

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-foreground text-2xl font-semibold tracking-tighter">
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
