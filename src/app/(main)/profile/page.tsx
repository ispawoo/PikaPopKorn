'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { User, Clock, Settings, Crown, ChevronRight, LogOut, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: User, label: 'Edit Profile', href: '/profile/edit' },
    { icon: Clock, label: 'Watch History', href: '/profile/history' },
    { icon: Download, label: 'Downloads', href: '/profile/downloads' },
    { icon: Settings, label: 'App Settings', href: '/profile/settings' },
  ];

  return (
    <div className="px-4 py-6 pb-8 min-h-full flex flex-col max-w-md mx-auto w-full">
      <div className="flex flex-col items-center text-center mb-8 pt-4">
        <div className="w-24 h-24 rounded-full bg-zinc-800 overflow-hidden relative border-2 border-yellow-400 mb-4 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
          {user?.avatar_url ? (
            <Image src={user.avatar_url} alt={user.first_name || 'User'} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-zinc-500">
              {user?.first_name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold font-outfit text-white mb-1">
          {user?.first_name} {user?.last_name}
        </h1>
        <p className="text-zinc-400 text-sm mb-3">@{user?.username || 'user'}</p>
        {user?.is_premium && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black shadow-lg">
            <Crown className="w-3.5 h-3.5" />
            PREMIUM
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 mb-8">
        {menuItems.map((item, idx) => (
          <Link href={item.href} key={idx}>
            <div className="flex items-center justify-between p-4 bg-zinc-900/80 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-zinc-300" />
                </div>
                <span className="font-medium text-white">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </div>
          </Link>
        ))}
      </div>

      <Button 
        variant="ghost" 
        className="w-full text-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-400 py-6 rounded-2xl font-semibold border-none" 
        onClick={logout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </Button>

      <div className="mt-auto pt-8 text-center">
        <p className="text-zinc-600 text-xs">Version 1.0.0</p>
      </div>
    </div>
  );
}
