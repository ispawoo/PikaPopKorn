'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';

export function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const supabase = createClient();

  const fetchWatchlist = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('watchlist')
        .select('content_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setWatchlistIds((data as any[]).map(item => item.content_id));
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const toggleWatchlist = async (contentId: string) => {
    if (!user) return false;
    
    const isCurrentlySaved = watchlistIds.includes(contentId);
    
    // Optimistic update
    setWatchlistIds(prev => 
      isCurrentlySaved 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );

    try {
      if (isCurrentlySaved) {
        const { error } = await supabase
          .from('watchlist')
          .delete()
          .eq('user_id', user.id)
          .eq('content_id', contentId);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('watchlist')
          .insert({
            user_id: user.id,
            content_id: contentId,
          } as any);
          
        if (error) throw error;
      }
      return true;
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      // Revert optimistic update
      setWatchlistIds(prev => 
        isCurrentlySaved 
          ? [...prev, contentId]
          : prev.filter(id => id !== contentId)
      );
      return false;
    }
  };

  const isInWatchlist = (contentId: string) => watchlistIds.includes(contentId);

  return { watchlistIds, isLoading, toggleWatchlist, isInWatchlist, fetchWatchlist };
}
