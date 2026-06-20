'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function Hero() {
  const reduce = useReducedMotion();
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.2, 0.65, 0.3, 1] as const },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3"
    >
      <motion.h1
        variants={itemVariants}
        className="font-display text-foreground text-4xl leading-[1.1] font-bold tracking-tighter sm:text-5xl lg:text-6xl"
      >
        Welcome to my personal{' '}
        <motion.span
          className="text-mauve"
          animate={
            reduce
              ? undefined
              : {
                  textShadow: [
                    '0 0 0px rgba(203,166,247,0)',
                    '0 0 16px rgba(203,166,247,0.6)',
                    '0 0 0px rgba(203,166,247,0)',
                  ],
                }
          }
          transition={reduce ? undefined : { duration: 2.5, repeat: Infinity }}
        >
          playground
        </motion.span>
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-muted-foreground font-mono text-base sm:text-lg"
      >
        tester · ricer · catppuccin enthusiast
      </motion.p>
    </motion.div>
  );
}
