'use client';

import { useEffect, useState } from 'react';
import { Bookmark, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWatchlist } from '@/hooks/useWatchlist';
import { ContentCard } from '@/components/cards/ContentCard';
import { SkeletonCard } from '@/components/cards/SkeletonCard';
import { Button } from '@/components/ui/Button';
import { Content } from '@/types/content';
import Link from 'next/link';

export default function WatchlistPage() {
  const { watchlistIds, isLoading, toggleWatchlist } = useWatchlist();
  const [items, setItems] = useState<Partial<Content>[]>([]);

  useEffect(() => {
    // In a real app, we'd fetch the actual content objects based on the IDs
    // Here we generate mock data for the IDs we have
    if (watchlistIds.length > 0) {
      const mockItems = watchlistIds.map((id, i) => ({
        id,
        title: `Saved Item ${i + 1}`,
        slug: `saved-item-${i}`,
        poster_url: `https://picsum.photos/seed/watch${i}/400/600`,
        rating: 8.0,
      }));
      setItems(mockItems);
    } else {
      setItems([]);
    }
  }, [watchlistIds]);

  return (
    <div className="px-4 py-6 pb-8 min-h-full flex flex-col">
      <h1 className="text-3xl font-black font-outfit text-white mb-6">My Watchlist</h1>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <Bookmark className="w-10 h-10 text-zinc-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-outfit">Your watchlist is empty</h3>
          <p className="text-zinc-400 max-w-sm mb-6">
            Save shows and movies to keep track of what you want to watch.
          </p>
          <Link href="/search">
            <Button variant="primary">Explore Content</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
          <AnimatePresence>
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <ContentCard content={item} />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (item.id) toggleWatchlist(item.id);
                  }}
                  className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10 hover:bg-red-500/80 hover:border-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
