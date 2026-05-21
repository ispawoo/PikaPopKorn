'use client';

import { Modal } from '@/components/ui/Modal';
import { usePlayerStore } from '@/stores/playerStore';
import { Check } from 'lucide-react';

interface QualitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function QualitySelector({ isOpen, onClose, onSelect }: QualitySelectorProps) {
  const { currentQuality, availableQualities } = usePlayerStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col max-h-[70vh]">
        <h3 className="text-lg font-bold text-white mb-4 shrink-0">Video Quality</h3>
        
        {availableQualities.length === 0 ? (
          <div className="flex flex-col gap-3 text-center py-4">
            <p className="text-zinc-400">Quality is managed automatically by your device.</p>
            <button
              onClick={() => { onSelect(-1); onClose(); }}
              className={`flex items-center justify-between p-4 rounded-xl transition-colors ${currentQuality === -1 ? 'bg-yellow-400/10 text-yellow-400' : 'text-white hover:bg-white/5'}`}
            >
              <span className="font-medium">Auto</span>
              {currentQuality === -1 && <Check className="w-5 h-5" />}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1 overflow-y-auto hide-scrollbar">
            <button
              onClick={() => { onSelect(-1); onClose(); }}
              className={`flex items-center justify-between p-4 rounded-xl transition-colors ${currentQuality === -1 ? 'bg-yellow-400/10 text-yellow-400' : 'text-white hover:bg-white/5'}`}
            >
              <span className="font-medium">Auto</span>
              {currentQuality === -1 && <Check className="w-5 h-5" />}
            </button>
            
            {availableQualities.map((q) => (
              <button
                key={q.index}
                onClick={() => { onSelect(q.index); onClose(); }}
                className={`flex items-center justify-between p-4 rounded-xl transition-colors ${currentQuality === q.index ? 'bg-yellow-400/10 text-yellow-400' : 'text-white hover:bg-white/5'}`}
              >
                <span className="font-medium">{q.height}p</span>
                {currentQuality === q.index && <Check className="w-5 h-5" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
