'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchWatchlist = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem('pika_watchlist');
      if (stored) {
        setWatchlistIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const toggleWatchlist = async (contentId: string) => {
    const isCurrentlySaved = watchlistIds.includes(contentId);
    
    const newWatchlist = isCurrentlySaved 
      ? watchlistIds.filter(id => id !== contentId)
      : [...watchlistIds, contentId];
      
    setWatchlistIds(newWatchlist);
    localStorage.setItem('pika_watchlist', JSON.stringify(newWatchlist));
    
    return true;
  };

  const isInWatchlist = (contentId: string) => watchlistIds.includes(contentId);

  return { watchlistIds, isLoading, toggleWatchlist, isInWatchlist, fetchWatchlist };
}
