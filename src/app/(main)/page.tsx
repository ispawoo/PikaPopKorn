'use client';

import { HeroBanner } from '@/components/banners/HeroBanner';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { ContentCard } from '@/components/cards/ContentCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Content } from '@/types/content';

// Mock data generator for visual testing
const generateMockContent = (count: number, category: string, startId: number): Partial<Content>[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `mock-${startId + i}`,
    title: `${category} Title ${i + 1}`,
    slug: `mock-${category.toLowerCase()}-${i + 1}`,
    poster_url: `https://picsum.photos/seed/poster-${category}-${i}/400/600`,
    rating: 8.5 + (i * 0.1),
    release_year: 2020 + (i % 5),
    category: { id: category.toLowerCase(), name: category, slug: category.toLowerCase() } as any
  }));
};

const mockBanners = [
  {
    id: 'b1',
    content_id: 'mock-1',
    image_url: 'https://picsum.photos/seed/banner1/800/450',
    title: 'DUNE PART TWO',
    subtitle: '',
    content: { slug: 'epic-adventure' }
  },
  {
    id: 'b2',
    content_id: 'mock-2',
    image_url: 'https://picsum.photos/seed/banner2/800/450',
    title: 'CYBERPUNK HORIZONS',
    subtitle: '',
    content: { slug: 'cyberpunk-horizons' }
  }
];

const topCategories = [
  { id: 'home', label: 'Home', active: true },
  { id: 'movies', label: 'Movies', active: false },
  { id: 'web-series', label: 'Web Series', active: false },
  { id: 'anime', label: 'Anime', active: false },
  { id: 'short-dramas', label: 'Short Dramas', active: false },
];

export default function HomePage() {
  const trending = generateMockContent(6, 'Movie', 100);
  const continueWatching = generateMockContent(4, 'Series', 400);
  const anime = generateMockContent(6, 'Anime', 200);
  const series = generateMockContent(6, 'Series', 300);

  return (
    <div className="flex flex-col pb-8 overflow-hidden">
      
      {/* Top Categories Navigation */}
      <div className="w-full overflow-x-auto hide-scrollbar px-4 pt-2 pb-4">
        <div className="flex items-center gap-3 w-max">
          {topCategories.map((cat) => (
            <Link key={cat.id} href={cat.id === 'home' ? '/' : `/categories/${cat.id}`}>
              <button 
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  cat.active 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <HeroBanner banners={mockBanners} />

      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ScrollRow title="Continue Watching" href="/profile">
            {continueWatching.map((item, i) => (
              <ContentCard 
                key={item.id} 
                content={item} 
                progress={40 + (i * 15)} 
                subtitle={`S1:E${i + 1} - ${(10 + i * 15)}m left`} 
              />
            ))}
          </ScrollRow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScrollRow title="Trending Now" href="/search?sort=trending">
            {trending.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </ScrollRow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ScrollRow title="Popular Anime" href="/categories/anime">
            {anime.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </ScrollRow>
        </motion.div>
      </div>
    </div>
  );
}
