'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { WatchHistoryItem } from '@/types/user';

export function useWatchHistory() {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem('pika_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error fetching watch history:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const saveProgress = async (contentId: string, episodeId: string | undefined, progress: number, duration: number) => {
    const completed = progress > duration * 0.9;
    
    try {
      const stored = localStorage.getItem('pika_history');
      let currentHistory: WatchHistoryItem[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = currentHistory.findIndex(h => h.content_id === contentId && h.episode_id === (episodeId || undefined));
      
      const newItem: WatchHistoryItem = {
        id: existingIndex >= 0 ? currentHistory[existingIndex].id : `hist_${Date.now()}`,
        user_id: user?.id || 'guest',
        content_id: contentId,
        episode_id: episodeId || undefined,
        progress,
        duration,
        completed,
        last_watched_at: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        currentHistory[existingIndex] = newItem;
      } else {
        currentHistory.unshift(newItem); // Add to beginning
      }
      
      setHistory(currentHistory);
      localStorage.setItem('pika_history', JSON.stringify(currentHistory));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const clearHistory = async () => {
    setHistory([]);
    localStorage.removeItem('pika_history');
  };

  return { history, isLoading, fetchHistory, saveProgress, clearHistory };
}
