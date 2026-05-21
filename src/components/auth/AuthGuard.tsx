'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export function AuthGuard({
  children,
  requireAdmin = false,
}: {
  children: ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const pathname = usePathname() || '';

  useEffect(() => {
    const hasLocalToken = typeof window !== 'undefined' && localStorage.getItem('admin_auth_token') === 'true';
    if (!isLoading && requireAdmin && !user?.is_admin && !hasLocalToken) {
      if (!pathname.startsWith('/pikadmin')) {
        router.push('/pikadmin');
      }
    }
  }, [isAuthenticated, isLoading, user, router, requireAdmin, pathname]);

  // For admin routes: block until auth is confirmed
  if (requireAdmin) {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      );
    }

    const hasLocalToken = typeof window !== 'undefined' && localStorage.getItem('admin_auth_token') === 'true';
    if (!user?.is_admin && !hasLocalToken) {
      if (pathname.startsWith('/pikadmin')) {
        return <>{children}</>;
      }
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-black p-4 text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">Access Denied</h1>
          <p className="text-zinc-400">You do not have permission to view this page.</p>
        </div>
      );
    }
  }

  // For all other routes: render immediately — profile/home/etc work without auth
  return <>{children}</>;
}
