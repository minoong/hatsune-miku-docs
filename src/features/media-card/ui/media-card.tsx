import { motion } from 'framer-motion';

import type { MediaCardProps } from '~/entities/media/model/types';
import { formatFileSize } from '~/shared/lib/file-utils';
import { getFileTypeLabel, formatDuration } from '~/shared/lib/media-utils';

import { useMediaCard } from '../model/use-media-card';

import { ImageCard } from './image-card';
import { VideoCard } from './video-card';
import { ExifInfo } from './exif-info';

export const MediaCard = ({ media, variant = 'compact', showExif = false, showMetadata = true, onClick, onDelete, onDownload }: MediaCardProps) => {
  const { isHovered, showExifPanel, handleMouseEnter, handleMouseLeave, handleExifToggle, handleKeyDown } = useMediaCard({
    showExifPanel: showExif,
    enableKeyboardNavigation: true,
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // 이미 처리된 이벤트인지 확인
    if ((e.target as HTMLElement).closest('button') || showExifPanel) {
      // 버튼이나 버튼 내부 요소를 클릭한 경우 무시
      return;
    }

    onClick?.(media);
  };

  const isDetailed = variant === 'detailed';

  return (
    <motion.div
      className={`
        relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
        cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isDetailed ? 'p-4' : 'p-2'}
      `}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`${media.name} 보기`}
    >
      {/* Media Content */}
      <div className={`relative ${isDetailed ? 'mb-4' : 'mb-2'}`}>
        {media.type === 'image' ? <ImageCard media={media} variant={variant} /> : <VideoCard media={media} variant={variant} />}

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            {/* View Button */}
            <motion.button
              className="p-2 bg-white bg-opacity-90 rounded-full text-gray-700 hover:bg-opacity-100 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onClick?.(media)}
              aria-label="전체 크기로 보기"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </motion.button>

            {/* EXIF Button (for images only) */}
            {media.type === 'image' && media.exifData && (
              <motion.button
                className="p-2 bg-white bg-opacity-90 rounded-full text-gray-700 hover:bg-opacity-100 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleExifToggle();
                }}
                aria-label="EXIF 데이터 보기"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.button>
            )}

            {/* Download Button */}
            {onDownload && (
              <motion.button
                className="p-2 bg-white bg-opacity-90 rounded-full text-gray-700 hover:bg-opacity-100 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDownload(media)}
                aria-label="파일 다운로드"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.button>
            )}

            {/* Delete Button */}
            {onDelete && (
              <motion.button
                className="p-2 bg-red-500 bg-opacity-90 rounded-full text-white hover:bg-opacity-100 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(media)}
                aria-label="파일 삭제"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Metadata */}
      {showMetadata && (
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <h3 className={`font-medium text-gray-900 truncate ${isDetailed ? 'text-base' : 'text-sm'}`}>{media.name}</h3>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">타입</span>
              <span className={`font-medium text-gray-700 ${isDetailed ? 'text-sm' : 'text-xs'}`}>{getFileTypeLabel(media.mimeType)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">크기</span>
              <span className={`font-medium text-gray-700 ${isDetailed ? 'text-sm' : 'text-xs'}`}>{formatFileSize(media.size)}</span>
            </div>
            {media.metadata && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">해상도</span>
                <span className="text-xs font-medium text-gray-700">
                  {media.metadata.width}×{media.metadata.height}
                </span>
              </div>
            )}
            {media.metadata?.duration && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">재생시간</span>
                <span className="text-xs font-medium text-gray-700">{formatDuration(media.metadata.duration)}</span>
              </div>
            )}
            {isDetailed && media.exifData?.make && media.exifData?.model && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">카메라</span>
                <span className="text-xs font-medium text-gray-700">
                  {media.exifData.make} {media.exifData.model}
                </span>
              </div>
            )}
            {isDetailed && media.exifData?.datetime && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">날짜</span>
                <span className="text-xs font-medium text-gray-700">{new Date(media.exifData.datetime).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EXIF Panel */}
      <ExifInfo media={media} isOpen={showExifPanel} onClose={handleExifToggle} />
    </motion.div>
  );
};
