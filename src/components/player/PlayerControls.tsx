'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ChevronLeft, Settings, Maximize, Minimize, PictureInPicture, Subtitles, Gauge } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { formatDuration } from '@/utils/format';

interface PlayerControlsProps {
  title: string;
  onBack: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onQualityClick: () => void;
  onSubtitleClick: () => void;
  onSpeedClick: () => void;
  onSettingsClick?: () => void;
  onEpisodesClick?: () => void;
}

export function PlayerControls({ title, onBack, videoRef, onQualityClick, onSubtitleClick, onSpeedClick, onSettingsClick, onEpisodesClick }: PlayerControlsProps) {
  const { 
    isPlaying, 
    currentTime, 
    duration, 
    buffered, 
    showControls, 
    setShowControls,
    isFullscreen,
    setFullscreen,
    isPiP,
    setPiP,
    currentQuality,
    availableQualities,
    playbackSpeed,
    availableAudioTracks
  } = usePlayerStore();

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls
  useEffect(() => {
    const resetTimeout = () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (isPlaying) {
        hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
      }
    };

    if (showControls) resetTimeout();
    return () => { if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current); };
  }, [showControls, isPlaying, setShowControls]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const skipTime = (amount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check for iOS native fullscreen first
    if (videoRef.current && (videoRef.current as any).webkitEnterFullscreen) {
      (videoRef.current as any).webkitEnterFullscreen();
      return;
    }

    if (isFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => setFullscreen(false));
      } else {
        setFullscreen(false);
      }
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
          setFullscreen(true);
        });
      } else {
        setFullscreen(true);
      }
    }
  };

  const togglePiP = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (videoRef.current !== document.pictureInPictureElement) {
        await videoRef.current?.requestPictureInPicture();
        setPiP(true);
      } else {
        await document.exitPictureInPicture();
        setPiP(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const qualityText = currentQuality === -1 ? 'Auto' : `${availableQualities[currentQuality]?.height}p`;

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-20 flex flex-col justify-between bg-black/40 pointer-events-none"
          onClick={() => setShowControls(false)}
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto pt-safe">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full text-white hover:bg-white/10">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <h2 className="text-white font-bold text-lg max-w-[60%] truncate">{title}</h2>
            <div className="flex gap-2">
              {availableAudioTracks?.length > 1 && onSettingsClick && (
                <button onClick={(e) => { e.stopPropagation(); onSettingsClick(); }} className="p-2 rounded-full text-white hover:bg-white/10">
                  <Settings className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>

          {/* Center Play/Pause */}
          <div className="absolute inset-0 flex items-center justify-center gap-12 pointer-events-none">
            <button onClick={(e) => skipTime(-10, e)} className="p-4 rounded-full text-white hover:bg-white/10 pointer-events-auto">
              <SkipBack className="w-10 h-10 fill-white" />
            </button>
            <button onClick={handlePlayPause} className="w-20 h-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:border-yellow-400 transition-colors pointer-events-auto">
              {isPlaying ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 fill-white ml-2" />}
            </button>
            <button onClick={(e) => skipTime(10, e)} className="p-4 rounded-full text-white hover:bg-white/10 pointer-events-auto">
              <SkipForward className="w-10 h-10 fill-white" />
            </button>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col gap-2 p-4 pb-safe-bottom bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-auto">
            {/* Scrubber */}
            <div className="flex items-center gap-4">
              <span className="text-white text-sm font-medium w-12">{formatDuration(currentTime)}</span>
              <div className="relative flex-1 h-1.5 flex items-center group cursor-pointer" onClick={e => e.stopPropagation()}>
                {/* Background */}
                <div className="absolute inset-0 bg-white/20 rounded-full" />
                {/* Buffered */}
                <div className="absolute inset-y-0 left-0 bg-white/40 rounded-full" style={{ width: `${(buffered / duration) * 100}%` }} />
                {/* Progress Input */}
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {/* Custom thumb/fill */}
                <div className="absolute inset-y-0 left-0 bg-yellow-400 rounded-full pointer-events-none" style={{ width: `${(currentTime / duration) * 100}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <span className="text-zinc-400 text-sm font-medium w-12">{formatDuration(duration)}</span>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                {onEpisodesClick && (
                  <button onClick={(e) => { e.stopPropagation(); onEpisodesClick(); }} className="text-white text-sm font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10">
                    Episodes
                  </button>
                )}
                <button onClick={(e) => { e.stopPropagation(); onQualityClick(); }} className="flex items-center gap-1 text-white text-sm font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
                  {qualityText}
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={(e) => { e.stopPropagation(); onSpeedClick(); }} className="p-3 md:p-2 text-white hover:bg-white/10 rounded-full flex items-center gap-1">
                  <Gauge className="w-6 h-6 md:w-5 md:h-5" />
                  <span className="text-xs font-bold">{playbackSpeed}x</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); onSubtitleClick(); }} className="p-3 md:p-2 text-white hover:bg-white/10 rounded-full">
                  <Subtitles className="w-6 h-6 md:w-5 md:h-5" />
                </button>
                {document.pictureInPictureEnabled && (
                  <button onClick={togglePiP} className="p-3 md:p-2 text-white hover:bg-white/10 rounded-full hidden md:block">
                    <PictureInPicture className="w-6 h-6 md:w-5 md:h-5" />
                  </button>
                )}
                <button onClick={toggleFullscreen} className="p-3 md:p-2 text-white hover:bg-white/10 rounded-full">
                  {isFullscreen ? <Minimize className="w-6 h-6 md:w-5 md:h-5" /> : <Maximize className="w-6 h-6 md:w-5 md:h-5" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
