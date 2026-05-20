'use client';

import { Modal } from '@/components/ui/Modal';
import { usePlayerStore } from '@/stores/playerStore';
import { Check } from 'lucide-react';

interface SubtitleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function SubtitleSelector({ isOpen, onClose, onSelect }: SubtitleSelectorProps) {
  const { currentSubtitleIndex, availableSubtitles } = usePlayerStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-white mb-4">Subtitles</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => { onSelect(-1); onClose(); }}
            className={`flex items-center justify-between p-4 rounded-xl transition-colors ${currentSubtitleIndex === -1 ? 'bg-yellow-400/10 text-yellow-400' : 'text-white hover:bg-white/5'}`}
          >
            <span className="font-medium">Off</span>
            {currentSubtitleIndex === -1 && <Check className="w-5 h-5" />}
          </button>
          
          {availableSubtitles.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { onSelect(idx); onClose(); }}
              className={`flex items-center justify-between p-4 rounded-xl transition-colors ${currentSubtitleIndex === idx ? 'bg-yellow-400/10 text-yellow-400' : 'text-white hover:bg-white/5'}`}
            >
              <span className="font-medium">{s.label}</span>
              {currentSubtitleIndex === idx && <Check className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
