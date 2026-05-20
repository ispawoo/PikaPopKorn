'use client';

import { useAuth } from '@/hooks/useAuth';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Clock, Settings, Crown, ChevronRight, LogOut, Coffee } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AUTHOR_NAME, AUTHOR_GITHUB, BUY_ME_COFFEE } from '@/utils/constants';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { watchlistIds } = useWatchlist();
  const { history } = useWatchHistory();

  return (
    <div className="px-4 py-6 pb-8 min-h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-zinc-800 overflow-hidden relative border-2 border-white/10 shrink-0">
          {user?.avatar_url ? (
            <Image src={user.avatar_url} alt={user.first_name || 'User'} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-zinc-500">
              {user?.first_name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-white truncate">
            {user?.first_name} {user?.last_name}
          </h1>
          <p className="text-zinc-400 truncate">@{user?.username || 'user'}</p>
          {user?.is_premium && (
            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-400 text-black">
              <Crown className="w-3 h-3" />
              PREMIUM
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-white font-outfit mb-1">{history.length}</span>
          <span className="text-xs text-zinc-400">Watched</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-white font-outfit mb-1">{watchlistIds.length}</span>
          <span className="text-xs text-zinc-400">Saved</span>
        </GlassCard>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <Link href="/profile/history">
          <GlassCard className="p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Clock className="w-5 h-5 text-zinc-300" />
            </div>
            <div className="flex-1 font-medium text-white">Watch History</div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </GlassCard>
        </Link>
        
        <Link href="/profile/settings">
          <GlassCard className="p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Settings className="w-5 h-5 text-zinc-300" />
            </div>
            <div className="flex-1 font-medium text-white">App Settings</div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </GlassCard>
        </Link>
      </div>

      <Button variant="outline" className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20 mb-12" onClick={logout}>
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>

      <div className="mt-auto pt-8 border-t border-white/10 text-center flex flex-col items-center">
        <p className="text-zinc-500 text-sm mb-4">
          Built with ❤️ by <a href={AUTHOR_GITHUB} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">{AUTHOR_NAME}</a>
        </p>
        <a href={BUY_ME_COFFEE} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="sm" className="bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90">
            <Coffee className="w-4 h-4 mr-2" />
            Buy Me a Coffee
          </Button>
        </a>
        <p className="text-zinc-600 text-xs mt-6">Version 1.0.0</p>
      </div>
    </div>
  );
}
