'use client';

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onClear, autoFocus = false, placeholder = 'Search movies, anime, series...' }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to allow transition before focus
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [autoFocus]);

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  return (
    <motion.div 
      className={`relative flex items-center w-full rounded-2xl transition-all duration-300 ${
        isFocused ? 'bg-zinc-800 border-yellow-400/50 shadow-[0_0_15px_rgba(255,215,0,0.15)]' : 'bg-white/10 border-white/10'
      } border backdrop-blur-md px-4 py-3`}
    >
      <SearchIcon className={`w-5 h-5 mr-3 transition-colors ${isFocused ? 'text-yellow-400' : 'text-zinc-400'}`} />
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 font-medium"
      />

      <AnimatePresence>
        {value.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="ml-2 p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
