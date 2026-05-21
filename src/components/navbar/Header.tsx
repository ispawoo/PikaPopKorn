'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/stores/authStore';

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  const getInitial = () => {
    if (user?.first_name) return user.first_name[0].toUpperCase();
    if (user?.username) return user.username[0].toUpperCase();
    return 'U';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 pt-safe backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button 
              className="text-zinc-300 hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="font-outfit text-xl md:text-2xl font-black tracking-tight flex items-center">
              <span className="text-white">Pika</span>
              <span className="text-yellow-400">PopKorn</span>
              <span className="ml-1 text-xl">🍿</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/search" className="text-zinc-300 hover:text-white transition-colors">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <Link href="/profile" className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-yellow-400/30">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-xs text-yellow-400 font-bold">{getInitial()}</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
