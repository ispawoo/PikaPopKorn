'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: number;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({ progress, className, barClassName }: ProgressBarProps) {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("h-1 w-full bg-white/20 rounded-full overflow-hidden", className)}>
      <motion.div 
        className={cn("h-full bg-gradient-to-r from-yellow-500 to-yellow-300", barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${safeProgress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}
