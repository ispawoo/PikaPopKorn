'use client';

import { HeroBanner } from '@/components/banners/HeroBanner';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { ContentCard } from '@/components/cards/ContentCard';
import { motion } from 'framer-motion';

import { Content } from '@/types/content';

// Mock data generator for visual testing
const generateMockContent = (count: number, category: string, startId: number): Partial<Content>[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `mock-${startId + i}`,
    title: `${category} Title ${i + 1}`,
    slug: `mock-${category.toLowerCase()}-${i + 1}`,
    poster_url: `https://picsum.photos/seed/poster-${category}-${i}/400/600`,
    rating: 8.5 + (Math.random() * 1.5),
    release_year: 2020 + Math.floor(Math.random() * 5),
    category: { id: category.toLowerCase(), name: category, slug: category.toLowerCase() } as any
  }));
};

const mockBanners = [
  {
    id: 'b1',
    content_id: 'mock-1',
    image_url: 'https://picsum.photos/seed/banner1/800/450',
    title: 'Epic Adventure Returns',
    subtitle: 'The most anticipated sequel of the year is finally here.',
    content: { slug: 'epic-adventure' }
  },
  {
    id: 'b2',
    content_id: 'mock-2',
    image_url: 'https://picsum.photos/seed/banner2/800/450',
    title: 'Cyberpunk Horizons',
    subtitle: 'A new anime series exploring the limits of humanity.',
    content: { slug: 'cyberpunk-horizons' }
  }
];

export default function HomePage() {
  const trending = generateMockContent(6, 'Movie', 100);
  const anime = generateMockContent(6, 'Anime', 200);
  const series = generateMockContent(6, 'Series', 300);

  return (
    <div className="flex flex-col gap-2 pb-8 overflow-hidden">
      <HeroBanner banners={mockBanners} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
        transition={{ delay: 0.2 }}
      >
        <ScrollRow title="Popular Anime" href="/categories/anime">
          {anime.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </ScrollRow>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ScrollRow title="Binge-Worthy Series" href="/categories/web-series">
          {series.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </ScrollRow>
      </motion.div>
    </div>
  );
}
