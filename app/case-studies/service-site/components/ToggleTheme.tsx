'use client';

import React from 'react';
import { MoonStarIcon, SunIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const THEME_OPTIONS = [
  { icon: SunIcon, value: 'light' },
  { icon: MoonStarIcon, value: 'dark' },
];

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex h-8 w-16" />;
  }

  return (
    <motion.div
      key={String(isMounted)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center overflow-hidden rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-md"
      role="radiogroup"
    >
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={cn(
            'relative flex size-8 cursor-pointer items-center justify-center rounded-md transition-all',
            theme === option.value
              ? 'text-black dark:text-white'
              : 'text-black/40 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80'
          )}
          role="radio"
          aria-checked={theme === option.value}
          aria-label={`Switch to ${option.value} theme`}
          onClick={() => setTheme(option.value)}
        >
          {theme === option.value && (
            <motion.div
              layoutId="theme-option"
              transition={{ type: 'spring', bounce: 0.1, duration: 0.75 }}
              className="absolute inset-0 rounded-md border border-black/20 dark:border-white/20"
            />
          )}
          <option.icon className="size-4" />
        </button>
      ))}
    </motion.div>
  );
}
