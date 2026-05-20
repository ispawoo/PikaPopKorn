'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { User } from '@/types/user';

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();
  const supabase = createClient();
  const initialized = useRef(false);

  useEffect(() => {
    async function initAuth() {
      if (initialized.current) return;
      initialized.current = true;
      
      setLoading(true);

      try {
        // 1. Check existing Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profile) {
            setUser(profile as User);
            setLoading(false);
            return;
          }
        }

        // 2. If no valid session, but we have Telegram initData, authenticate
        const initDataString = typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initData;
        
        if (initDataString || process.env.NODE_ENV === 'development') {
          // Use mock data string in dev if window.Telegram is not available
          const dataToUse = initDataString || 'user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22testuser%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&hash=mock_hash';
          
          const res = await fetch('/api/auth/telegram', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ initData: dataToUse }),
          });

          if (res.ok) {
            const { session: newSession } = await res.json();
            
            // Set session in Supabase client
            if (newSession) {
              await supabase.auth.setSession(newSession);
              
              // Fetch user profile
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
        setLoading(false);
      }
    }

    initAuth();
  }, [setUser, setLoading, supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().logout();
  };

  return { user, isAuthenticated, isLoading, logout };
}
