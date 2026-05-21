import { create } from 'zustand';
import { PlayerState, QualityLevel, SubtitleTrack, AudioTrack } from '@/types/player';

interface PlayerStore extends PlayerState {
  setPlaying: (isPlaying: boolean) => void;
  setPaused: (isPaused: boolean) => void;
  setBuffering: (isBuffering: boolean) => void;
  setTime: (currentTime: number, duration: number) => void;
  setBuffered: (buffered: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setBrightness: (brightness: number) => void;
  setQuality: (quality: number) => void;
  setAvailableQualities: (qualities: QualityLevel[]) => void;
  setSpeed: (speed: number) => void;
  setFullscreen: (isFullscreen: boolean) => void;
  setPiP: (isPiP: boolean) => void;
  setSubtitle: (index: number) => void;
  setAvailableSubtitles: (subtitles: SubtitleTrack[]) => void;
  setAudioTrack: (index: number) => void;
  setAvailableAudioTracks: (tracks: AudioTrack[]) => void;
  setShowControls: (show: boolean) => void;
  setShowSkipIntro: (show: boolean) => void;
  setShowNextEpisode: (show: boolean) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  isPaused: true,
  isBuffering: true,
  currentTime: 0,
  duration: 0,
  buffered: 0,
  volume: 1,
  isMuted: false,
  brightness: 1,
  currentQuality: -1,
  availableQualities: [],
  playbackSpeed: 1,
  showControls: true,
  isFullscreen: false,
  isPiP: false,
  currentSubtitleIndex: -1,
  availableSubtitles: [],
  currentAudioTrack: -1,
  availableAudioTracks: [],
  showSkipIntro: false,
  showNextEpisode: false,

  setPlaying: (isPlaying) => set({ isPlaying, isPaused: !isPlaying }),
  setPaused: (isPaused) => set({ isPaused, isPlaying: !isPaused }),
  setBuffering: (isBuffering) => set({ isBuffering }),
  setTime: (currentTime, duration) => set({ currentTime, duration }),
  setBuffered: (buffered) => set({ buffered }),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted, volume: state.isMuted ? 1 : 0 })),
  setBrightness: (brightness) => set({ brightness: Math.max(0.2, Math.min(2, brightness)) }),
  setQuality: (currentQuality) => set({ currentQuality }),
  setAvailableQualities: (availableQualities) => set({ availableQualities }),
  setSpeed: (playbackSpeed) => set({ playbackSpeed }),
  setFullscreen: (isFullscreen) => set({ isFullscreen }),
  setPiP: (isPiP) => set({ isPiP }),
  setSubtitle: (currentSubtitleIndex) => set({ currentSubtitleIndex }),
  setAvailableSubtitles: (availableSubtitles) => set({ availableSubtitles }),
  setAudioTrack: (currentAudioTrack) => set({ currentAudioTrack }),
  setAvailableAudioTracks: (availableAudioTracks) => set({ availableAudioTracks }),
  setShowControls: (showControls) => set({ showControls }),
  setShowSkipIntro: (showSkipIntro) => set({ showSkipIntro }),
  setShowNextEpisode: (showNextEpisode) => set({ showNextEpisode }),
}));
