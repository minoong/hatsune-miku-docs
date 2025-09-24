import { useState, useRef, useCallback, useEffect } from 'react';

import type { MediaCardHookOptions, MediaCardHookReturn } from './types';

export const useMediaCard = (options: MediaCardHookOptions = {}): MediaCardHookReturn => {
  const { autoPlayVideos = false, showExifPanel = false, enableKeyboardNavigation = true } = options;

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExif, setShowExif] = useState(showExifPanel);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    if (autoPlayVideos && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Video play failed, ignore
      });
      setIsPlaying(true);
    }
  }, [autoPlayVideos]);

  const handleMouseLeave = useCallback(() => {
    // EXIF 패널이 열려있을 때는 호버 상태를 유지
    if (!showExif) {
      setIsHovered(false);
    }

    if (autoPlayVideos && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [autoPlayVideos, showExif]);

  const handlePlayToggle = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        // Video play failed, ignore
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleExifToggle = useCallback(() => {
    setShowExif((prev) => {
      const newValue = !prev;
      // EXIF 패널을 닫을 때 호버 상태도 초기화
      if (!newValue) {
        setIsHovered(false);
      }
      return newValue;
    });
  }, []);

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      const element = imageRef.current || videoRef.current;
      if (element) {
        element.requestFullscreen().catch(() => {
          // Fullscreen failed, ignore
        });
        setIsFullscreen(true);
      }
    } else {
      document.exitFullscreen().catch(() => {
        // Exit fullscreen failed, ignore
      });
      setIsFullscreen(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!enableKeyboardNavigation) return;

      switch (event.key) {
        case ' ':
        case 'Enter':
          event.preventDefault();
          handlePlayToggle();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          handleFullscreenToggle();
          break;
        case 'i':
        case 'I':
          event.preventDefault();
          handleExifToggle();
          break;
        case 'Escape':
          event.preventDefault();
          if (showExif) {
            setShowExif(false);
            setIsHovered(false);
          }
          break;
      }
    },
    [enableKeyboardNavigation, showExif, handlePlayToggle, handleFullscreenToggle, handleExifToggle],
  );

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Cleanup video on unmount
  useEffect(() => {
    const videoElement = videoRef.current;
    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, []);

  return {
    isHovered,
    isPlaying,
    showExifPanel: showExif,
    isFullscreen,
    imageRef,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    handlePlayToggle,
    handleExifToggle,
    handleFullscreenToggle,
    handleKeyDown,
  };
};
