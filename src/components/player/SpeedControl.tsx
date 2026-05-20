'use client';

import { Modal } from '@/components/ui/Modal';
import { usePlayerStore } from '@/stores/playerStore';

interface SpeedControlProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (speed: number) => void;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function SpeedControl({ isOpen, onClose, onSelect }: SpeedControlProps) {
  const { playbackSpeed } = usePlayerStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-white mb-4">Playback Speed</h3>
        <div className="grid grid-cols-3 gap-3">
          {SPEEDS.map((speed) => (
            <button
              key={speed}
              onClick={() => { onSelect(speed); onClose(); }}
              className={`p-3 rounded-xl font-medium transition-all ${
                playbackSpeed === speed 
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
