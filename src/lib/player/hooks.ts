'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import { usePlayerStore } from '@/stores/playerStore';
import { useWatchHistory } from '@/hooks/useWatchHistory';

export function useVideoPlayer(videoRef: React.RefObject<HTMLVideoElement | null>, streamUrl: string) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  
  const { 
    setAvailableQualities, 
    setPlaying, 
    setPaused, 
    setBuffering, 
    setTime,
    setBuffered,
    setFullscreen,
    setPiP,
    setAvailableAudioTracks,
    setAudioTrack
  } = usePlayerStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    const initPlayer = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          startLevel: -1, // Auto start level
          capLevelToPlayerSize: true, // Don't download 4K if player is small
          maxBufferLength: 30, // Keep buffer reasonable
          // Removed lowLatencyMode and other aggressive settings that were slowing down standard streams
        });

        hlsRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          setIsReady(true);
          const qualities = data.levels.map((level, index) => ({
            height: level.height,
            bitrate: level.bitrate,
            index,
          }));
          setAvailableQualities(qualities);
          
          if (hls.audioTracks) {
            const audioTracks = hls.audioTracks.map((track, index) => ({
              id: track.id,
              groupId: track.groupId,
              language: track.lang || 'unknown',
              name: track.name || track.lang || `Track ${index + 1}`
            }));
            setAvailableAudioTracks(audioTracks);
            setAudioTrack(hls.audioTrack);
          }

          video.play().catch(e => console.warn('Auto-play prevented', e));
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error('Fatal network error encountered, try to recover');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error('Fatal media error encountered, try to recover');
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                setError('A fatal error occurred while loading the video.');
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for Safari
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
          setIsReady(true);
          video.play().catch(e => console.warn('Auto-play prevented', e));
        });
      } else {
        setError('HLS is not supported in this browser.');
      }
    };

    initPlayer();

    // Event listeners
    const handlePlay = () => { setPlaying(true); setPaused(false); };
    const handlePause = () => { setPaused(true); setPlaying(false); };
    const handleWaiting = () => setBuffering(true);
    const handlePlaying = () => setBuffering(false);
    const handleTimeUpdate = () => {
      setTime(video.currentTime, video.duration || 0);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('timeupdate', handleTimeUpdate);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [streamUrl, videoRef, setAvailableQualities, setAvailableAudioTracks, setAudioTrack, setPlaying, setPaused, setBuffering, setTime, setBuffered, setFullscreen]);

  return { hlsRef, isReady, error };
}

export function usePlaybackMemory(videoRef: React.RefObject<HTMLVideoElement | null>, contentId: string, episodeId?: string) {
  const { saveProgress } = useWatchHistory();
  const memoryKey = `pkp_progress_${contentId}${episodeId ? `_${episodeId}` : ''}`;
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const savedTime = localStorage.getItem(memoryKey);
      if (savedTime && parseFloat(savedTime) > 0) {
        // Only restore if not too close to the end
        if (parseFloat(savedTime) < video.duration * 0.95) {
          video.currentTime = parseFloat(savedTime);
        }
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [videoRef, memoryKey]);

  // Save progress periodically
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    saveIntervalRef.current = setInterval(() => {
      if (!video.paused && video.currentTime > 0) {
        localStorage.setItem(memoryKey, video.currentTime.toString());
        // Sync to Supabase
        saveProgress(contentId, episodeId, video.currentTime, video.duration);
      }
    }, 5000);

    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, [videoRef, memoryKey, contentId, episodeId, saveProgress]);
}

export function useGestureControls(videoRef: React.RefObject<HTMLVideoElement | null>, containerRef: React.RefObject<HTMLDivElement | null>) {
  const { brightness, setBrightness, volume, setVolume, setShowControls } = usePlayerStore();
  const startX = useRef(0);
  const startY = useRef(0);
  const startBright = useRef(0);
  const startVol = useRef(0);
  const startTime = useRef(0);
  const lastTap = useRef(0);
  const isDragging = useRef(false);
  const actionType = useRef<'brightness' | 'volume' | 'seek' | null>(null);

  const [ripple, setRipple] = useState<{ side: 'left' | 'right', id: number } | null>(null);
  const [indicator, setIndicator] = useState<{ type: 'brightness' | 'volume', value: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 1) return;
    
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    startBright.current = brightness;
    startVol.current = volume;
    if (videoRef.current) startTime.current = videoRef.current.currentTime;
    isDragging.current = false;
    actionType.current = null;
  }, [brightness, volume, videoRef]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 1 || !containerRef.current || !videoRef.current) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX.current;
    const diffY = startY.current - currentY; // Invert Y so up is positive
    const { width, height } = containerRef.current.getBoundingClientRect();

    if (!isDragging.current) {
      if (Math.abs(diffX) > 20 || Math.abs(diffY) > 20) {
        isDragging.current = true;
        if (Math.abs(diffX) > Math.abs(diffY)) {
          actionType.current = 'seek';
        } else {
          actionType.current = startX.current > width / 2 ? 'volume' : 'brightness';
        }
      }
    }

    if (isDragging.current) {
      if (actionType.current === 'brightness') {
        const delta = diffY / height * 2; // Full swipe = 2.0 change
        const newBright = Math.max(0.2, Math.min(2.0, startBright.current + delta));
        setBrightness(newBright);
        setIndicator({ type: 'brightness', value: (newBright - 0.2) / 1.8 });
      } else if (actionType.current === 'volume') {
        const delta = diffY / height; // Full swipe = 1.0 change
        const newVol = Math.max(0, Math.min(1, startVol.current + delta));
        setVolume(newVol);
        videoRef.current.volume = newVol;
        setIndicator({ type: 'volume', value: newVol });
      } else if (actionType.current === 'seek') {
        // Horizontal swipe seek logic if needed (optional, double tap is usually better)
      }
    }
  }, [setBrightness, setVolume, videoRef, containerRef]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    setIndicator(null);
    
    if (!isDragging.current && containerRef.current && videoRef.current) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap.current;
      
      if (tapLength < 300 && tapLength > 0) {
        // Double tap
        const { width } = containerRef.current.getBoundingClientRect();
        const tapX = e.changedTouches[0].clientX;
        
        if (tapX < width / 2) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
          setRipple({ side: 'left', id: Date.now() });
        } else {
          videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
          setRipple({ side: 'right', id: Date.now() });
        }
        lastTap.current = 0; // Reset
      } else {
        // Single tap
        setShowControls(true);
        lastTap.current = currentTime;
      }
    }
    isDragging.current = false;
  }, [setShowControls, videoRef, containerRef]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    ripple,
    indicator,
  };
}
