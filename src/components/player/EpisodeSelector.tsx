'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { EpisodeCard } from '@/components/cards/EpisodeCard';
import { Episode } from '@/types/content';

interface EpisodeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  episodes: Partial<Episode>[];
  currentEpisodeId?: string;
  onSelect: (episodeId: string) => void;
}

export function EpisodeSelector({ isOpen, onClose, episodes, currentEpisodeId, onSelect }: EpisodeSelectorProps) {
  // Simple grouping by season if available, otherwise just list
  const seasons = Array.from(new Set(episodes.map(e => e.season_number || 1))).sort((a, b) => a - b);
  const [activeSeason, setActiveSeason] = useState(seasons[0] || 1);

  const activeEpisodes = episodes.filter(e => (e.season_number || 1) === activeSeason);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="sm:max-w-xl h-[80vh] flex flex-col pt-2">
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-xl font-bold font-outfit text-white mb-4 px-2">Episodes</h3>
        
        {seasons.length > 1 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4 px-2 pb-2">
            {seasons.map(season => (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSeason === season ? 'bg-yellow-400 text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Season {season}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto hide-scrollbar pr-2 flex flex-col gap-2 pb-safe-bottom">
          {activeEpisodes.map(ep => (
            <EpisodeCard
              key={ep.id}
              episode={ep}
              isActive={ep.id === currentEpisodeId}
              onClick={() => {
                if (ep.id) onSelect(ep.id);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
