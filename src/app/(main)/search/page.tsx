'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { Content } from '@/types/content';
import { ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const POPULAR_SEARCHES = ['Dune Part Two', 'Game of Thrones', 'One Piece', 'Jujutsu Kaisen', 'The Last of Us', 'Money Heist'];
const INITIAL_RECENT_SEARCHES = ['Interstellar', 'Attack on Titan', 'Peaky Blinders', 'The Night Agent', 'Demon Slayer'];

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Partial<Content>[]>([]);
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);

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
        rating: 7.0 + (i % 3),
        release_year: 2020 + (i % 5),
      }));
      setResults(fakeResults);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const removeRecent = (search: string) => {
    setRecentSearches(prev => prev.filter(item => item !== search));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Top Bar matching Figma */}
      <div className="flex items-center px-4 py-3 gap-4">
        <button onClick={() => router.back()} className="p-1 -ml-1 text-zinc-300 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold font-outfit text-white">Search</h1>
      </div>

      <div className="px-4 py-2">
        <SearchBar 
          value={query} 
          onChange={setQuery} 
          autoFocus 
          placeholder="Search movies, web series, anime..."
        />
      </div>

      {query.length === 0 ? (
        <div className="px-4 py-6 flex flex-col gap-8">
          <div>
            <h3 className="text-sm font-bold font-outfit text-white mb-3">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map(search => (
                <button
                  key={search}
                  onClick={() => setQuery(search)}
                  className="px-4 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold font-outfit text-white">Recent Searches</h3>
                <button onClick={clearAllRecent} className="text-xs font-medium text-yellow-400">Clear All</button>
              </div>
              <div className="flex flex-col">
                {recentSearches.map((search, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <button onClick={() => setQuery(search)} className="flex items-center gap-3 flex-1 text-left">
                      <span className="text-zinc-500 text-sm">⏱</span>
                      <span className="text-sm text-zinc-300">{search}</span>
                    </button>
                    <button onClick={() => removeRecent(search)} className="p-1 text-zinc-500 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <SearchResults query={query} results={results} isLoading={isLoading} />
      )}
    </div>
  );
}
