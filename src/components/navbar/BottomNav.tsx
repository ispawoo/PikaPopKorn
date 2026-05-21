'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LayoutGrid, Bookmark, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import { BOTTOM_NAV_ITEMS } from '@/utils/constants';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950 border-t border-white/5 pb-safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {BOTTOM_NAV_ITEMS.map((item) => {
          // Adjust logic to match exact route or child route for active state, except home which must be exact
          const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
          
          let Icon = Home;
          if (item.icon === 'Search') Icon = Search;
          if (item.icon === 'Grid3X3') Icon = LayoutGrid;
          if (item.icon === 'Bookmark') Icon = Bookmark;
          if (item.icon === 'User') Icon = User;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center justify-center w-16 pt-1 pb-2 gap-1"
            >
              <Icon
                className={cn(
                  'w-5 h-5 md:w-6 md:h-6 transition-colors duration-200',
                  isActive ? 'text-yellow-400' : 'text-zinc-500'
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={cn(
                "text-[10px] md:text-xs font-medium transition-colors duration-200",
                isActive ? "text-yellow-400" : "text-zinc-500"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
