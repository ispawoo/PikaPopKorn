import { formatDistanceToNow, format } from 'date-fns';

export function formatDuration(seconds: number): string {
  if (!seconds) return '0:00';
  
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatViews(views: number): string {
  if (!views) return '0';
  
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  return format(new Date(dateString), 'MMM d, yyyy');
}

export function formatTimeAgo(dateString: string): string {
  if (!dateString) return '';
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function formatRating(rating: number): string {
  if (!rating) return '0.0';
  return rating.toFixed(1);
}
