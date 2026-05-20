'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { WatchHistoryItem } from '@/types/user';

export function useWatchHistory() {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const supabase = createClient();

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, you'd join with content and episodes
      const { data, error } = await supabase
        .from('watch_history')
        .select('*')
        .eq('user_id', user.id)
        .order('last_watched_at', { ascending: false });

      if (error) throw error;
      setHistory(data as WatchHistoryItem[]);
    } catch (error) {
      console.error('Error fetching watch history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const saveProgress = async (contentId: string, episodeId: string | undefined, progress: number, duration: number) => {
    if (!user) return;
    
    const completed = progress > duration * 0.9; // Consider completed if > 90%
    
    try {
      const { error } = await supabase
        .from('watch_history')
        .upsert({
          user_id: user.id,
          content_id: contentId,
          episode_id: episodeId || null,
          progress,
          duration,
          completed,
          last_watched_at: new Date().toISOString(),
        } as any, {
          onConflict: 'user_id, content_id, episode_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const clearHistory = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('watch_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return { history, isLoading, fetchHistory, saveProgress, clearHistory };
}
