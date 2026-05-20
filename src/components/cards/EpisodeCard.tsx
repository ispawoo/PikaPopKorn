'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Episode } from '@/types/content';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatDuration } from '@/utils/format';

interface EpisodeCardProps {
  episode: Partial<Episode>;
  isActive?: boolean;
  progress?: number;
  onClick?: () => void;
}

export function EpisodeCard({ episode, isActive, progress, onClick }: EpisodeCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group flex gap-3 p-2 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-white/10 border-l-2 border-yellow-400' : 'hover:bg-white/5'}`}
    >
      <div className="relative w-32 md:w-40 aspect-video rounded-lg overflow-hidden bg-zinc-900 shrink-0">
        {episode.thumbnail_url ? (
          <Image
            src={episode.thumbnail_url}
            alt={episode.title || 'Thumbnail'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 160px"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-500 text-xs text-center px-2">E{episode.episode_number}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}>
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
        {progress !== undefined && episode.duration && (
          <div className="absolute bottom-0 left-0 right-0 px-1 pb-1">
            <ProgressBar progress={(progress / episode.duration) * 100} className="h-1 bg-black/50" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 py-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-medium text-yellow-400 shrink-0">
            {episode.season_number ? `S${episode.season_number} ` : ''}E{episode.episode_number}
          </span>
          {episode.duration && (
            <span className="text-xs text-zinc-500">{formatDuration(episode.duration)}</span>
          )}
        </div>
        <h4 className={`text-sm font-bold line-clamp-2 ${isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
          {episode.title}
        </h4>
      </div>
    </motion.div>
  );
}
