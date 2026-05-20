'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Heart, Share2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScrollRow } from '@/components/ui/ScrollRow';
import { ContentCard } from '@/components/cards/ContentCard';
import { EpisodeCard } from '@/components/cards/EpisodeCard';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useToast } from '@/components/ui/Toast';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ContentDetailPage({ params }: PageProps) {
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
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: "In a world where magic and technology collide, a young prodigy discovers a secret that could tear the fabric of reality apart. Follow their journey across dimensions as they race against time to prevent the ultimate catastrophe. This is a longer description that needs to be truncated initially to show the expand functionality properly.",
    backdrop_url: `https://picsum.photos/seed/${slug}-back/800/450`,
    poster_url: `https://picsum.photos/seed/${slug}/400/600`,
    rating: 8.7,
    release_year: 2024,
    duration: isSeries ? null : 124,
    genres: [{ name: 'Action' }, { name: 'Sci-Fi' }, { name: 'Drama' }],
    category: { name: isSeries ? 'Anime' : 'Movies' },
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
      {/* Hero Backdrop */}
      <div className="relative w-full aspect-[4/5] md:aspect-[21/9] lg:aspect-[2.5/1]">
        <Image
          src={mockContent.backdrop_url}
          alt={mockContent.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex flex-col items-start">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="yellow">{mockContent.rating.toFixed(1)} Rating</Badge>
            <Badge variant="default">{mockContent.release_year}</Badge>
            {mockContent.duration && <Badge variant="default">{Math.floor(mockContent.duration/60)}h {mockContent.duration%60}m</Badge>}
            <Badge variant="outline">{mockContent.category.name}</Badge>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black font-outfit text-white mb-4 shadow-black drop-shadow-lg">
            {mockContent.title}
          </h1>

          <div className="flex items-center gap-3 w-full max-w-md">
            <Link href={`/watch/${mockContent.id}`} className="flex-1">
              <Button variant="glow" size="lg" className="w-full">
                <Play className="w-5 h-5 mr-2 fill-black" />
                Play
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="shrink-0 bg-white/10 hover:bg-white/20 border border-white/10" onClick={handleWatchlist}>
              <Heart className={`w-5 h-5 ${saved ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
            </Button>
            <Button variant="ghost" size="icon" className="shrink-0 bg-white/10 hover:bg-white/20 border border-white/10" onClick={handleShare}>
              <Share2 className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl">
        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mockContent.genres.map(g => (
            <span key={g.name} className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
              {g.name}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className={`text-zinc-300 leading-relaxed ${!expandedDesc ? 'line-clamp-3' : ''}`}>
            {mockContent.description}
          </p>
          <button 
            onClick={() => setExpandedDesc(!expandedDesc)}
            className="text-yellow-400 text-sm font-medium mt-1 flex items-center hover:text-yellow-300"
          >
            {expandedDesc ? (
              <>Show Less <ChevronUp className="w-4 h-4 ml-1" /></>
            ) : (
              <>Read More <ChevronDown className="w-4 h-4 ml-1" /></>
            )}
          </button>
        </div>

        {/* Episodes Section */}
        {isSeries && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-outfit text-white">Episodes</h2>
              <select 
                value={activeSeason}
                onChange={(e) => setActiveSeason(Number(e.target.value))}
                className="bg-zinc-900 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400"
              >
                <option value={1}>Season 1</option>
                <option value={2}>Season 2</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              {mockEpisodes.map((ep, idx) => (
                <Link href={`/watch/${mockContent.id}?episode=${ep.id}`} key={ep.id}>
                  <EpisodeCard 
                    episode={ep} 
                    progress={idx === 2 ? 600 : undefined} // Mock progress on 3rd episode
                    isActive={idx === 3} // Mock 4th episode as active/next up
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <ScrollRow title="More Like This">
        {mockRelated.map(item => (
          <ContentCard key={item.id} content={item} />
        ))}
      </ScrollRow>
    </div>
  );
}
