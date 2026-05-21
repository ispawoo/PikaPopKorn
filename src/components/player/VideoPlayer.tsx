'use client';

import { useRef, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { useVideoPlayer, usePlaybackMemory, useGestureControls } from '@/lib/player/hooks';
import { GestureOverlay } from './GestureOverlay';
import { PlayerControls } from './PlayerControls';
import { QualitySelector } from './QualitySelector';
import { SubtitleSelector } from './SubtitleSelector';
import { SpeedControl } from './SpeedControl';
import { AudioTrackSelector } from './AudioTrackSelector';
import { SkipIntro } from './SkipIntro';
import { EpisodeSelector } from './EpisodeSelector';
import { Episode } from '@/types/content';
import { Button } from '@/components/ui/Button';

interface VideoPlayerProps {
  streamUrl: string;
  title: string;
  contentId: string;
  episodeId?: string;
  skipIntroStart?: number;
  skipIntroEnd?: number;
  onBack: () => void;
  episodes?: Partial<Episode>[];
  onEpisodeSelect?: (episodeId: string) => void;
}

export function VideoPlayer({ 
  streamUrl, 
  title, 
  contentId, 
  episodeId, 
  skipIntroStart, 
  skipIntroEnd, 
  onBack,
  episodes,
  onEpisodeSelect
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { isReady, error, hlsRef } = useVideoPlayer(videoRef, streamUrl);
  usePlaybackMemory(videoRef, contentId, episodeId);
  const { handlers: gestureHandlers, ripple, indicator } = useGestureControls(videoRef, containerRef);

  const { 
    isBuffering, 
    brightness, 
    currentTime, 
    playbackSpeed,
    currentQuality,
    availableQualities,
    setShowControls
  } = usePlayerStore();

  const [showQuality, setShowQuality] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);

  // Apply playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle quality change
  const handleQualityChange = (index: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = index;
    }
  };

  // Handle audio track change
  const handleAudioTrackChange = (id: number) => {
    if (hlsRef.current) {
      hlsRef.current.audioTrack = id;
    }
  };

  const isSkipIntroVisible = Boolean(
    skipIntroStart && skipIntroEnd && 
    currentTime >= skipIntroStart && 
    currentTime < skipIntroEnd
  );

  const handleSkipIntro = () => {
    if (videoRef.current && skipIntroEnd) {
      videoRef.current.currentTime = skipIntroEnd;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center touch-none"
      onMouseMove={() => setShowControls(true)}
      onClick={() => setShowControls(true)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        style={{ filter: `brightness(${brightness})` }}
        playsInline
        crossOrigin="anonymous"
      />

      {/* Overlays */}
      {!error && (
        <>
          <GestureOverlay handlers={gestureHandlers} ripple={ripple} indicator={indicator} />
          
          <PlayerControls 
            title={title}
            onBack={onBack}
            videoRef={videoRef}
            onQualityClick={() => setShowQuality(true)}
            onSubtitleClick={() => setShowSubtitles(true)}
            onSpeedClick={() => setShowSpeed(true)}
            onSettingsClick={() => setShowAudio(true)}
            onEpisodesClick={episodes && episodes.length > 0 ? () => setShowEpisodes(true) : undefined}
          />
          
          <SkipIntro show={isSkipIntroVisible} onSkip={handleSkipIntro} />
        </>
      )}

      {/* Modals */}
      <QualitySelector isOpen={showQuality} onClose={() => setShowQuality(false)} onSelect={handleQualityChange} />
      <SubtitleSelector isOpen={showSubtitles} onClose={() => setShowSubtitles(false)} onSelect={() => {}} />
      <SpeedControl isOpen={showSpeed} onClose={() => setShowSpeed(false)} onSelect={(speed) => usePlayerStore.getState().setSpeed(speed)} />
      <AudioTrackSelector isOpen={showAudio} onClose={() => setShowAudio(false)} onSelect={handleAudioTrackChange} />
      
      {episodes && onEpisodeSelect && (
        <EpisodeSelector 
          isOpen={showEpisodes} 
          onClose={() => setShowEpisodes(false)} 
          episodes={episodes} 
          currentEpisodeId={episodeId}
          onSelect={onEpisodeSelect} 
        />
      )}

      {/* Loading State */}
      {isBuffering && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Playback Error</h3>
          <p className="text-zinc-400 mb-6 max-w-sm">{error}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>Go Back</Button>
            <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      )}
    </div>
  );
}
