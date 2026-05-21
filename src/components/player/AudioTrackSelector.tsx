'use client';

import { Modal } from '@/components/ui/Modal';
import { usePlayerStore } from '@/stores/playerStore';
import { Check } from 'lucide-react';

interface AudioTrackSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
}

export function AudioTrackSelector({ isOpen, onClose, onSelect }: AudioTrackSelectorProps) {
  const { currentAudioTrack, availableAudioTracks } = usePlayerStore();

  if (!availableAudioTracks || availableAudioTracks.length === 0) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-white mb-4">Audio Track</h3>
        <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
          {availableAudioTracks.map((track) => (
            <button
              key={track.id}
              onClick={() => { onSelect(track.id); onClose(); }}
              className={`flex items-center justify-between p-4 rounded-xl transition-colors ${currentAudioTrack === track.id ? 'bg-yellow-400/10 text-yellow-400' : 'text-white hover:bg-white/5'}`}
            >
              <span className="font-medium capitalize">{track.name}</span>
              {currentAudioTrack === track.id && <Check className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
