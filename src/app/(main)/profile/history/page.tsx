'use client';

import { useWatchHistory } from '@/hooks/useWatchHistory';
import { EpisodeCard } from '@/components/cards/EpisodeCard';
import { Button } from '@/components/ui/Button';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatTimeAgo } from '@/utils/format';

export default function HistoryPage() {
  const { history, clearHistory } = useWatchHistory();
  const router = useRouter();

  // Mock history item population
  const populatedHistory = history.map((item, i) => ({
    ...item,
    episode: {
      title: `Watched Episode ${i + 1}`,
      episode_number: i + 1,
      season_number: 1,
      duration: 1400,
      thumbnail_url: `https://picsum.photos/seed/hist${i}/400/225`
    }
  }));

  return (
    <div className="px-4 py-6 pb-8 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold font-outfit text-white">Watch History</h1>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to clear your watch history?')) {
                clearHistory();
              }
            }}
            className="text-sm font-medium text-red-400 hover:text-red-300"
          >
            Clear All
          </button>
        )}
      </div>

      {populatedHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No history</h3>
          <p className="text-zinc-400 mb-6">You haven&apos;t watched anything yet.</p>
          <Link href="/">
            <Button variant="primary">Start Watching</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {populatedHistory.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-500 px-2">{formatTimeAgo(item.last_watched_at)}</span>
              <Link href={`/watch/${item.content_id}${item.episode_id ? `?episode=${item.episode_id}` : ''}`}>
                <EpisodeCard 
                  episode={item.episode as any} 
                  progress={item.progress} 
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
