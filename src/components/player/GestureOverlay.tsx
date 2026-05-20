'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FastForward, Rewind, Sun, Volume2 } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface GestureOverlayProps {
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
  ripple: { side: 'left' | 'right', id: number } | null;
  indicator: { type: 'brightness' | 'volume', value: number } | null;
}

export function GestureOverlay({ handlers, ripple, indicator }: GestureOverlayProps) {
  return (
    <div 
      className="absolute inset-0 z-10 touch-none overflow-hidden"
      {...handlers}
    >
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`absolute top-0 bottom-0 w-1/2 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm pointer-events-none ${
              ripple.side === 'left' ? 'left-0 rounded-r-[100%]' : 'right-0 rounded-l-[100%]'
            }`}
          >
            {ripple.side === 'left' ? (
              <>
                <Rewind className="w-8 h-8 text-white fill-white mb-2" />
                <span className="text-white font-bold">-10s</span>
              </>
            ) : (
              <>
                <FastForward className="w-8 h-8 text-white fill-white mb-2" />
                <span className="text-white font-bold">+10s</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {indicator && (
          <motion.div
            initial={{ opacity: 0, x: indicator.type === 'brightness' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none p-4 ${
              indicator.type === 'brightness' ? 'left-4' : 'right-4'
            }`}
          >
            <div className="h-32 w-1.5 bg-black/50 rounded-full overflow-hidden flex flex-col justify-end">
              <div 
                className="w-full bg-yellow-400" 
                style={{ height: `${indicator.value * 100}%` }}
              />
            </div>
            <div className="bg-black/50 p-2 rounded-full backdrop-blur-md">
              {indicator.type === 'brightness' ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
