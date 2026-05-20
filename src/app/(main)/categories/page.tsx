'use client';

import { CategoryCard } from '@/components/categories/CategoryCard';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'Movies', slug: 'movies', colorClass: 'bg-blue-900/60', icon: '🎬', count: 1240 },
  { name: 'Anime', slug: 'anime', colorClass: 'bg-red-900/60', icon: '🌸', count: 850 },
  { name: 'Web Series', slug: 'web-series', colorClass: 'bg-emerald-900/60', icon: '📺', count: 420 },
  { name: 'Short Dramas', slug: 'short-dramas', colorClass: 'bg-purple-900/60', icon: '🎭', count: 310 },
];

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 
  'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 
  'TV Movie', 'Thriller', 'War', 'Western'
];

export default function CategoriesPage() {
  return (
    <div className="px-4 py-6 pb-8">
      <h1 className="text-3xl font-black font-outfit text-white mb-6">Categories</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-10">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <CategoryCard {...cat} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold font-outfit text-white mb-4">Browse by Genre</h2>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button
              key={genre}
              className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
            >
              {genre}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
