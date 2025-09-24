import { useState } from 'react';
import { motion } from 'framer-motion';

import type { MediaCardProps } from '~/entities/media/model/types';

interface ImageCardProps {
  media: MediaCardProps['media'];
  variant: MediaCardProps['variant'];
}

export const ImageCard = ({ media, variant = 'compact' }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isDetailed = variant === 'detailed';
  const imageHeight = isDetailed ? 'h-64' : 'h-48';

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`${imageHeight} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${imageHeight} bg-gray-100 rounded-lg overflow-hidden`}>
      {/* Loading placeholder */}
      {isLoading && (
        <motion.div className="absolute inset-0 bg-gray-200 flex items-center justify-center" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* Main image */}
      <motion.img
        src={media.preview || media.thumbnail || URL.createObjectURL(media.file)}
        alt={media.name}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image metadata overlay */}
      {media.metadata && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-black/50 bg-opacity-50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span>
                {media.metadata.width}×{media.metadata.height}
              </span>
              <span className="capitalize">{media.metadata.orientation}</span>
            </div>
          </div>
        </div>
      )}

      {/* EXIF indicator */}
      {media.exifData && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-blue-500 bg-opacity-80 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      )}

      {/* Orientation indicator for detailed view */}
      {isDetailed && media.metadata && media.metadata.orientation !== 'square' && (
        <div className="absolute top-2 left-2">
          <div className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {media.metadata.orientation === 'landscape' ? '📐' : '📏'}
          </div>
        </div>
      )}
    </div>
  );
};
