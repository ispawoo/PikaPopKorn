'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FastForward } from 'lucide-react';

interface SkipIntroProps {
  show: boolean;
  onSkip: () => void;
}

export function SkipIntro({ show, onSkip }: SkipIntroProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); onSkip(); }}
          className="absolute bottom-24 right-4 md:right-8 z-30 flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg font-bold shadow-xl"
        >
          Skip Intro
          <FastForward className="w-4 h-4 fill-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
