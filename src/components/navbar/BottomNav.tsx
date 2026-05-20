'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Search, Grid3X3, Bookmark, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import { BOTTOM_NAV_ITEMS } from '@/utils/constants';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe-bottom pt-4 pointer-events-none">
      <div className="mx-auto max-w-md pb-4 pointer-events-auto">
        <div className="glass flex items-center justify-around rounded-3xl px-2 py-3 shadow-2xl">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            
            let Icon = Home;
            if (item.icon === 'Search') Icon = Search;
            if (item.icon === 'Grid3X3') Icon = Grid3X3;
            if (item.icon === 'Bookmark') Icon = Bookmark;
            if (item.icon === 'User') Icon = User;

            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative flex flex-col items-center justify-center w-14 h-12"
              >
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <Icon
                    className={cn(
                      'w-6 h-6 transition-colors duration-300',
                      isActive ? 'text-yellow-400' : 'text-zinc-400 hover:text-zinc-200'
                    )}
                  />
                  <span className={cn(
                    "text-[10px] font-medium transition-all duration-300",
                    isActive ? "opacity-100 text-yellow-400" : "opacity-0 h-0"
                  )}>
                    {item.label}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 bg-white/5 rounded-2xl border border-yellow-400/20"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-yellow-400 blur-[2px]" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
