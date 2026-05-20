import { Content, Episode } from './content';

export interface User {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  is_premium: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface WatchHistoryItem {
  id: string;
  user_id: string;
  content_id: string;
  episode_id?: string;
  progress: number;
  duration?: number;
  completed: boolean;
  last_watched_at: string;
  
  // Joined
  content?: Content;
  episode?: Episode;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  content_id: string;
  added_at: string;
  
  // Joined
  content?: Content;
}
