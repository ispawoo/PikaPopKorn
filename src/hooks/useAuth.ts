'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { User } from '@/types/user';

// Create client once outside the hook to avoid re-creating on every render
// (a new object ref would cause the useEffect dependency to fire in a loop)
const supabase = createClient();

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    setLoading(true);

    // Safety timeout: never leave the app stuck loading for more than 5 seconds
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    async function initAuth() {
      try {
        // 1. Check existing Supabase session
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser(profile as User);
            return;
          }
        }

        // 2. If in Telegram WebApp, authenticate with initData
        const initDataString =
          typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initData;

        if (initDataString || process.env.NODE_ENV === 'development') {
          const dataToUse =
            initDataString ||
            'user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22testuser%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&hash=mock_hash';

          const res = await fetch('/api/auth/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ initData: dataToUse }),
          });

          if (res.ok) {
            const { session: newSession } = await res.json();
            if (newSession) {
              await supabase.auth.setSession(newSession);

              const { data: profile } = await supabase
                .from('users')
                .select('*')
                .eq('id', newSession.user.id)
                .single();

              if (profile) {
                setUser(profile as User);
              }
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        clearTimeout(safetyTimer);
        setLoading(false);
      }
    }

    initAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount — supabase is module-level, setUser/setLoading are stable Zustand refs

  const logout = async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().logout();
  };

  return { user, isAuthenticated, isLoading, logout };
}
