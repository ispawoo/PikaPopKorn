'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { LayoutDashboard, Film, Image as ImageIcon, Users, BarChart3, Menu, X, LogOut, ArrowLeft, Subtitles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content', label: 'Content', icon: Film },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
  { href: '/admin/subtitles', label: 'Subtitles', icon: Subtitles },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname() || '';
  const { logout } = useAuth();
  
  const isLoginPage = pathname.startsWith('/admin/login');

  if (isLoginPage) {
    return (
      <AuthGuard requireAdmin>
        {children}
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requireAdmin>
      <div className="flex h-screen bg-black text-white overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/80 md:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-white/5 transform transition-transform duration-300 md:relative md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col`}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
            <span className="text-xl font-black font-outfit text-yellow-400">PikaAdmin</span>
            <button className="md:hidden p-1 text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
            {ADMIN_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-yellow-400/10 text-yellow-400' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/5 flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to App</span>
            </Link>
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-white/5 flex items-center px-4 md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-zinc-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <span className="ml-2 font-bold font-outfit">PikaAdmin</span>
          </header>
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
