'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { Badge } from '@/components/ui/Badge';
import { Content } from '@/types/content';

const MOCK_GENRES = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Romance', 'Thriller', 'Horror', 'Fantasy'];
const MOCK_CATEGORIES = ['All', 'Movies', 'Anime', 'Web Series', 'Short Dramas'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Partial<Content>[]>([]);

  // Mock search effect
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      // Generate some fake results based on query length for visual testing
      const fakeResults = Array.from({ length: Math.min(10, query.length * 2) }).map((_, i) => ({
        id: `search-mock-${i}`,
        title: `${query} Result ${i + 1}`,
        slug: `search-result-${i}`,
        poster_url: `https://picsum.photos/seed/search${query}${i}/400/600`,
        rating: 7.0 + (Math.random() * 2),
        release_year: 2024,
      }));
      setResults(fakeResults);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, activeCategory]);

  return (
    <div className="flex flex-col min-h-full pb-8">
      <div className="sticky top-16 z-30 bg-black/80 backdrop-blur-md px-4 py-3 pb-2 border-b border-white/5">
        <SearchBar 
          value={query} 
          onChange={setQuery} 
          autoFocus 
          placeholder="What do you want to watch?"
        />
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-4 pb-2 snap-x">
          {MOCK_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="snap-start shrink-0 focus:outline-none"
            >
              <Badge 
                variant={activeCategory === cat ? 'yellow' : 'dark'}
                className="px-4 py-1.5 text-sm"
              >
                {cat}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {query.length === 0 ? (
        <div className="px-4 py-8">
          <h3 className="text-lg font-bold font-outfit text-white mb-4">Popular Genres</h3>
          <div className="flex flex-wrap gap-3">
            {MOCK_GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => setQuery(genre)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <SearchResults query={query} results={results} isLoading={isLoading} />
      )}
    </div>
  );
}
