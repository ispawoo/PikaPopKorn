'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function AuthGuard({ children, requireAdmin = false }: { children: ReactNode; requireAdmin?: boolean }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Uncomment if you want to force redirect, but in TMA usually we want to stay
        // router.push('/');
      } else if (requireAdmin && !user?.is_admin) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, user, router, requireAdmin]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-yellow-400"></div>
      </div>
    );
  }

  if (requireAdmin && !user?.is_admin) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black p-4 text-center">
        <h1 className="mb-2 text-2xl font-bold text-white">Access Denied</h1>
        <p className="text-zinc-400">You do not have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
