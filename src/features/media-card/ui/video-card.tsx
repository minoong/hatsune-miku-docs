import { useState } from 'react';
import { motion } from 'framer-motion';

import type { MediaCardProps } from '~/entities/media/model/types';
import { formatDuration } from '~/shared/lib/media-utils';

import { useMediaCard } from '../model/use-media-card';

interface VideoCardProps {
  media: MediaCardProps['media'];
  variant: MediaCardProps['variant'];
}

export const VideoCard = ({ media, variant = 'compact' }: VideoCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const { isPlaying, videoRef, handlePlayToggle } = useMediaCard({
    autoPlayVideos: false,
  });

  const isDetailed = variant === 'detailed';
  const videoHeight = isDetailed ? 'h-64' : 'h-48';

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !media.metadata?.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newTime = percentage * media.metadata.duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (hasError) {
    return (
      <div className={`${videoHeight} flex items-center justify-center rounded-lg bg-gray-100`}>
        <div className="text-center text-gray-500">
          <svg className="mx-auto mb-2 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-sm">Failed to load video</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${videoHeight} group overflow-hidden rounded-lg bg-gray-100`}>
      {/* Loading placeholder */}
      {isLoading && (
        <motion.div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-blue-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        preload="metadata"
        muted
        playsInline
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onTimeUpdate={handleTimeUpdate}
        poster={media.thumbnail || media.preview}
      >
        <source src={URL.createObjectURL(media.file)} type={media.mimeType} />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause button */}
      <motion.button
        className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          handlePlayToggle();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        <div className="bg-opacity-50 flex h-16 w-16 items-center justify-center rounded-full bg-black backdrop-blur-sm">
          {isPlaying ? (
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM11 8a1 1 0 012 0v4a1 1 0 11-2 0V8z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </motion.button>

      {/* Video metadata overlay */}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3">
        {/* Duration and current time */}
        <div className="mb-2 flex items-center justify-between text-xs text-white">
          <span>{formatDuration(currentTime)}</span>
          {media.metadata?.duration && <span>{formatDuration(media.metadata.duration)}</span>}
        </div>

        {/* Progress bar */}
        {media.metadata?.duration && (
          <div className="bg-opacity-30 h-1 w-full cursor-pointer rounded-full bg-white" onClick={handleSeek}>
            <motion.div
              className="h-full rounded-full bg-white"
              style={{
                width: `${(currentTime / media.metadata.duration) * 100}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {/* Video dimensions */}
        {media.metadata && (
          <div className="mt-2 flex items-center justify-between text-xs text-white">
            <span>
              {media.metadata.width}×{media.metadata.height}
            </span>
            <span className="capitalize">{media.metadata.orientation}</span>
          </div>
        )}
      </div>

      {/* Video type indicator */}
      <div className="absolute top-2 right-2">
        <div className="rounded bg-gradient-to-t from-black/60 to-black/20 px-2 py-1 text-xs text-white backdrop-blur-md">🎬 Video</div>
      </div>

      {/* Orientation indicator for detailed view */}
      {isDetailed && media.metadata && media.metadata.orientation !== 'square' && (
        <div className="absolute top-2 left-2">
          <div className="rounded bg-gradient-to-t from-black/60 to-black/20 px-2 py-1 text-xs text-white backdrop-blur-md">
            {media.metadata.orientation === 'landscape' ? '📐' : '📏'}
          </div>
        </div>
      )}
    </div>
  );
};
