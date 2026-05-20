export interface QualityLevel {
  height: number;
  bitrate: number;
  index: number;
}

export interface SubtitleTrack {
  id: number;
  language: string;
  label: string;
  url: string;
}

export interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  isMuted: boolean;
  brightness: number;
  currentQuality: number; // -1 for auto
  availableQualities: QualityLevel[];
  playbackSpeed: number;
  showControls: boolean;
  isFullscreen: boolean;
  isPiP: boolean;
  currentSubtitleIndex: number; // -1 for off
  availableSubtitles: SubtitleTrack[];
  showSkipIntro: boolean;
  showNextEpisode: boolean;
}
