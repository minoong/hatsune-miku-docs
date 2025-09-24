import type { SupportedMediaType } from './file-utils';
import { isImageFile, isVideoFile, convertHEICToJPEG } from './file-utils';

export type MediaType = 'image' | 'video' | 'unknown';

export const getMediaType = (file: File): MediaType => {
  if (isImageFile(file)) return 'image';
  if (isVideoFile(file)) return 'video';
  return 'unknown';
};

export const getMimeTypeIcon = (mimeType: SupportedMediaType): string => {
  const iconMap: Record<string, string> = {
    'image/jpeg': '🖼️',
    'image/jpg': '🖼️',
    'image/png': '🖼️',
    'image/gif': '🎞️',
    'image/webp': '🖼️',
    'image/heic': '🖼️',
    'image/heif': '🖼️',
    'video/mp4': '🎬',
    'video/webm': '🎬',
    'video/quicktime': '🎬',
    'video/avi': '🎬',
    'video/x-msvideo': '🎬',
    'video/x-matroska': '🎬',
  };

  return iconMap[mimeType] || '📄';
};

export const getFileTypeLabel = (mimeType: SupportedMediaType): string => {
  const labelMap: Record<string, string> = {
    'image/jpeg': 'JPEG Image',
    'image/jpg': 'JPG Image',
    'image/png': 'PNG Image',
    'image/gif': 'GIF Image',
    'image/webp': 'WebP Image',
    'image/heic': 'HEIC Image',
    'image/heif': 'HEIF Image',
    'video/mp4': 'MP4 Video',
    'video/webm': 'WebM Video',
    'video/quicktime': 'MOV Video',
    'video/avi': 'AVI Video',
    'video/x-msvideo': 'AVI Video',
    'video/x-matroska': 'MKV Video',
  };

  return labelMap[mimeType] || 'Unknown File';
};

export const getVideoMetadata = (
  file: File,
): Promise<{
  duration: number;
  width: number;
  height: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!isVideoFile(file)) {
      reject(new Error('File is not a video'));
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      });
      URL.revokeObjectURL(video.src);
    };

    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
      URL.revokeObjectURL(video.src);
    };

    video.src = URL.createObjectURL(file);
  });
};

export const formatDuration = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getImageDimensions = async (
  file: File,
): Promise<{
  width: number;
  height: number;
}> => {
  if (!isImageFile(file)) {
    throw new Error('File is not an image');
  }

  // Convert HEIC files first
  const processedFile = await convertHEICToJPEG(file);

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(processedFile);
  });
};

export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

export const getOrientationClass = (aspectRatio: number): 'landscape' | 'portrait' | 'square' => {
  if (aspectRatio > 1.1) return 'landscape';
  if (aspectRatio < 0.9) return 'portrait';
  return 'square';
};
