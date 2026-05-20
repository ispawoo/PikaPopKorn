'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ScrollRowProps {
  title: string;
  href?: string;
  children: React.ReactNode;
}

export function ScrollRow({ title, href, children }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-xl font-bold font-outfit text-white">{title}</h2>
        {href && (
          <Link href={href} className="text-sm font-medium text-yellow-400 hover:text-yellow-300">
            See All
          </Link>
        )}
      </div>
      
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start pl-2 hidden md:flex"
        >
          <div className="bg-black/50 p-1 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors text-white">
            <ChevronLeft className="w-6 h-6" />
          </div>
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar px-4 snap-x snap-mandatory py-2"
        >
          {children}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-2 hidden md:flex"
        >
          <div className="bg-black/50 p-1 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors text-white">
            <ChevronRight className="w-6 h-6" />
          </div>
        </button>
      </div>
    </div>
  );
}
