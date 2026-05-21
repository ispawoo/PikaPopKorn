'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Heart, Share2, ArrowLeft, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { ContentCard } from '@/components/cards/ContentCard';
import { EpisodeCard } from '@/components/cards/EpisodeCard';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useToast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ContentDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const toast = useToast();
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [activeSeason, setActiveSeason] = useState(1);

  // Mock data based on slug
  const isSeries = slug.includes('series') || slug.includes('anime');
  const mockContentId = `content-${slug}`;
  const saved = isInWatchlist(mockContentId);

  const mockContent = {
    id: mockContentId,
    title: slug === 'epic-adventure' ? 'Dune: Part Two' : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    backdrop_url: `https://picsum.photos/seed/${slug}-back/800/450`,
    poster_url: `https://picsum.photos/seed/${slug}/400/600`,
    rating: 8.7,
    release_year: 2024,
    duration: isSeries ? null : 165,
    genres: [{ name: 'Action' }, { name: 'Adventure' }, { name: 'Drama' }],
    category: { name: isSeries ? 'Anime' : 'Movie' },
    director: 'Denis Villeneuve',
    cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson'
  };

  const mockEpisodes = Array.from({ length: 12 }).map((_, i) => ({
    id: `ep-${i+1}`,
    season_number: 1,
    episode_number: i + 1,
    title: `The Awakening Part ${i + 1}`,
    duration: 1420, // ~24 mins
    thumbnail_url: `https://picsum.photos/seed/ep${i}/400/225`
  }));

  const mockRelated = Array.from({ length: 5 }).map((_, i) => ({
    id: `rel-${i}`,
    title: `Similar Title ${i + 1}`,
    slug: `similar-${i}`,
    poster_url: `https://picsum.photos/seed/sim${i}/400/600`,
    rating: 7.5
  }));

  const handleWatchlist = async () => {
    const success = await toggleWatchlist(mockContent.id);
    if (success) {
      toast.success(saved ? 'Removed from Watchlist' : 'Added to Watchlist');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockContent.title,
        text: `Watch ${mockContent.title} on PikaPopKorn!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info('Link copied to clipboard');
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-8">
      {/* Top Bar matching Figma */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-zinc-300 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold font-outfit text-white">{isSeries ? 'Series Detail' : 'Movie Detail'}</h1>
        </div>
        <button onClick={handleShare} className="text-zinc-300 hover:text-white">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Backdrop */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={mockContent.backdrop_url}
          alt={mockContent.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <Link href={`/watch/${mockContent.id}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        </Link>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-black font-outfit text-white mb-3">
          {mockContent.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs md:text-sm text-zinc-400 font-medium">
          <div className="flex items-center gap-1">
            <span className="bg-yellow-400 text-black font-bold px-1.5 py-0.5 rounded text-[10px]">IMDb</span>
            <span className="text-yellow-400">{mockContent.rating.toFixed(1)}</span>
          </div>
          <span>•</span>
          <span>{mockContent.release_year}</span>
          {mockContent.duration && (
            <>
              <span>•</span>
              <span>{Math.floor(mockContent.duration/60)}h {mockContent.duration%60}m</span>
            </>
          )}
          <span>•</span>
          <span>{mockContent.genres.map(g => g.name).join(', ')}</span>
        </div>

        <div className="flex items-center gap-3 w-full mb-6">
          <Link href={`/watch/${mockContent.id}`} className="flex-1">
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm md:text-base py-3 rounded-lg flex items-center justify-center transition-colors">
              <Play className="w-4 h-4 mr-2 fill-black" />
              Play Now
            </button>
          </Link>
          <button 
            onClick={handleWatchlist}
            className={`flex-1 font-semibold text-sm md:text-base py-3 rounded-lg flex items-center justify-center border transition-colors ${
              saved ? 'bg-white/10 border-white/20 text-yellow-400' : 'bg-transparent border-white/20 text-white hover:bg-white/5'
            }`}
          >
            {saved ? <Heart className="w-4 h-4 mr-2 fill-yellow-400" /> : <Plus className="w-4 h-4 mr-2" />}
            Watchlist
          </button>
        </div>

        <div className="mb-6">
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4">
            {mockContent.description}
          </p>
          
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex">
              <span className="text-zinc-500 w-20">Director</span>
              <span className="text-zinc-300">{mockContent.director}</span>
            </div>
            <div className="flex">
              <span className="text-zinc-500 w-20">Cast</span>
              <span className="text-zinc-300">{mockContent.cast}</span>
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        {isSeries && (
          <div className="mb-8 mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between mb-4">
              <select 
                value={activeSeason}
                onChange={(e) => setActiveSeason(Number(e.target.value))}
                className="bg-transparent text-white text-lg font-bold font-outfit focus:outline-none appearance-none cursor-pointer"
              >
                <option value={1} className="bg-zinc-900">Season 1</option>
                <option value={2} className="bg-zinc-900">Season 2</option>
              </select>
              <ChevronDown className="w-5 h-5 text-white pointer-events-none" />
            </div>
            
            <div className="flex flex-col gap-2">
              {mockEpisodes.map((ep, idx) => (
                <Link href={`/watch/${mockContent.id}?episode=${ep.id}`} key={ep.id}>
                  <EpisodeCard 
                    episode={ep} 
                    progress={idx === 2 ? 600 : undefined}
                    isActive={idx === 2}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <ScrollRow title="More Like This">
          {mockRelated.map(item => (
            <ContentCard key={item.id} content={item} />
          ))}
        </ScrollRow>
      </div>
    </div>
  );
}
