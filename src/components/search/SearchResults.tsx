'use client';

import { motion } from 'framer-motion';
import { ContentCard } from '../cards/ContentCard';
import { SkeletonCard } from '../cards/SkeletonCard';
import { Content } from '@/types/content';

interface SearchResultsProps {
  query: string;
  results: Partial<Content>[];
  isLoading: boolean;
}

export function SearchResults({ query, results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-4 px-4 py-6 justify-center md:justify-start">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center">
          <span className="text-4xl">🍿</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 font-outfit">No results found</h3>
        <p className="text-zinc-400 max-w-sm">
          We couldn&apos;t find any matches for &quot;{query}&quot;. Try checking for typos or using different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 px-4 py-6 justify-center md:justify-start">
      {results.map((content, idx) => (
        <motion.div
          key={content.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <ContentCard content={content} />
        </motion.div>
      ))}
    </div>
  );
}
