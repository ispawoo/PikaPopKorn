'use client';

import { CategoryCard } from '@/components/categories/CategoryCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Movies', slug: 'movies', imageUrl: 'https://picsum.photos/seed/movies/400/300', count: 1250 },
  { name: 'Web Series', slug: 'web-series', imageUrl: 'https://picsum.photos/seed/webseries/400/300', count: 850 },
  { name: 'Anime', slug: 'anime', imageUrl: 'https://picsum.photos/seed/anime/400/300', count: 950 },
  { name: 'Short Dramas', slug: 'short-dramas', imageUrl: 'https://picsum.photos/seed/shortdramas/400/300', count: 620 },
];

const GENRES = [
  'Action', 'Adventure', 'Drama', 'Thriller', 'Sci-Fi', 'Romance', 'Comedy', 'Fantasy', 'Crime', 'Mystery'
];

export default function CategoriesPage() {
  return (
    <div className="px-4 py-6 pb-8">
      <h1 className="text-2xl font-black font-outfit text-white mb-6">Categories</h1>
      
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
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
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-outfit text-white">Genres</h2>
          <Link href="/genres" className="text-xs font-medium text-yellow-400">View All</Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button
              key={genre}
              className="px-4 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
            >
              {genre}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
