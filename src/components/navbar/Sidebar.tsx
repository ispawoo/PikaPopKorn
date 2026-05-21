import { useState } from 'react';
import Link from 'next/link';
import { Home, Film, Tv, PlaySquare, Star, Settings, X, Crown, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-zinc-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col border-r border-white/5`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <Link href="/" className="font-outfit text-xl font-black tracking-tight flex items-center" onClick={onClose}>
            <span className="text-white">Pika</span>
            <span className="text-yellow-400">PopKorn</span>
          </Link>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-6">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Browse</div>
            <div className="flex flex-col gap-1">
              <SidebarLink href="/" icon={Home} label="Home" onClick={onClose} />
              <SidebarLink href="/categories/movies" icon={Film} label="Movies" onClick={onClose} />
              <SidebarLink href="/categories/web-series" icon={Tv} label="Web Series" onClick={onClose} />
              <SidebarLink href="/categories/anime" icon={PlaySquare} label="Anime" onClick={onClose} />
              <SidebarLink href="/categories/short-dramas" icon={Star} label="Short Dramas" onClick={onClose} />
            </div>
          </div>

          <div className="px-4 mb-6">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Account</div>
            <div className="flex flex-col gap-1">
              <SidebarLink href="/profile/settings" icon={Settings} label="Settings" onClick={onClose} />
              {!user?.is_premium && (
                <SidebarLink href="/premium" icon={Crown} label="Go Premium" onClick={onClose} className="text-yellow-400" />
              )}
              {user?.is_admin && (
                <SidebarLink href="/admin" icon={Shield} label="Admin Panel" onClick={onClose} className="text-red-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarLink({ href, icon: Icon, label, onClick, className = "text-zinc-300 hover:text-white" }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors ${className}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}
