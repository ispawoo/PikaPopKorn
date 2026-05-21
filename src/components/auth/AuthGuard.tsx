'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

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
    if (!isLoading && requireAdmin && !user?.is_admin) {
      if (!pathname.startsWith('/admin/login')) {
        router.push('/admin/login');
      }
    }
  }, [isAuthenticated, isLoading, user, router, requireAdmin, pathname]);

  // For admin routes: block until auth is confirmed
  if (requireAdmin) {
    if (isLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-black">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-yellow-400" />
        </div>
      );
    }

    if (!user?.is_admin) {
      if (pathname.startsWith('/admin/login')) {
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
