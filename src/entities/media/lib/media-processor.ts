import { extractExifData } from '~/shared/lib/exif-utils';
import { getMediaType, getImageDimensions, getVideoMetadata, calculateAspectRatio, getOrientationClass } from '~/shared/lib/media-utils';
import { createFilePreview, generateThumbnail, isImageFile, isVideoFile } from '~/shared/lib/file-utils';
import type { Any } from '~/shared/model/global';

import type { MediaFile, MediaMetadata } from '../model/types';

export class MediaProcessor {
  static async processFile(file: File, generateThumbnails = true, extractExif = true): Promise<MediaFile> {
    const id = crypto.randomUUID();
    const type = getMediaType(file);

    const mediaFile: MediaFile = {
      id,
      file,
      type,
      mimeType: file.type as Any,
      name: file.name,
      size: file.size,
      uploadStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log({ mediaFile });

    try {
      // Generate preview
      if (isImageFile(file) || isVideoFile(file)) {
        mediaFile.preview = await createFilePreview(file);
      }

      // Generate thumbnail for images
      if (generateThumbnails && isImageFile(file)) {
        try {
          mediaFile.thumbnail = await generateThumbnail(file);
        } catch (error) {
          console.warn('Failed to generate thumbnail:', error);
        }
      }

      // Extract metadata
      mediaFile.metadata = await this.extractMetadata(file);

      // Extract EXIF data for images
      if (extractExif && isImageFile(file)) {
        try {
          mediaFile.exifData = await extractExifData(file);
        } catch (error) {
          console.warn('Failed to extract EXIF data:', error);
        }
      }

      mediaFile.uploadStatus = 'completed';
    } catch (error) {
      console.error('Failed to process file:', error);
      mediaFile.uploadStatus = 'error';
      mediaFile.error = error instanceof Error ? error.message : 'Unknown error';
    }

    return mediaFile;
  }

  static async extractMetadata(file: File): Promise<MediaMetadata> {
    const type = getMediaType(file);

    if (type === 'image') {
      const dimensions = await getImageDimensions(file);
      const aspectRatio = calculateAspectRatio(dimensions.width, dimensions.height);

      return {
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio,
        orientation: getOrientationClass(aspectRatio),
      };
    }

    if (type === 'video') {
      const metadata = await getVideoMetadata(file);
      const aspectRatio = calculateAspectRatio(metadata.width, metadata.height);

      return {
        width: metadata.width,
        height: metadata.height,
        aspectRatio,
        orientation: getOrientationClass(aspectRatio),
        duration: metadata.duration,
      };
    }

    // Fallback for unknown types
    return {
      width: 0,
      height: 0,
      aspectRatio: 1,
      orientation: 'square',
    };
  }

  static async updateProgress(mediaFile: MediaFile, progress: number): Promise<MediaFile> {
    return {
      ...mediaFile,
      uploadProgress: Math.min(100, Math.max(0, progress)),
      uploadStatus: progress >= 100 ? 'completed' : 'uploading',
      updatedAt: new Date(),
    };
  }

  static async markAsError(mediaFile: MediaFile, error: string): Promise<MediaFile> {
    return {
      ...mediaFile,
      uploadStatus: 'error',
      error,
      updatedAt: new Date(),
    };
  }

  static async markAsCompleted(mediaFile: MediaFile): Promise<MediaFile> {
    return {
      ...mediaFile,
      uploadStatus: 'completed',
      uploadProgress: 100,
      error: undefined,
      updatedAt: new Date(),
    };
  }

  static sortFiles(files: MediaFile[], sortBy: string, sortOrder: 'asc' | 'desc'): MediaFile[] {
    return [...files].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'created':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'modified':
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
        default:
          return 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  static filterFiles(files: MediaFile[], filterBy: string): MediaFile[] {
    const yesterday = new Date();

    switch (filterBy) {
      case 'images':
        return files.filter((file) => file.type === 'image');
      case 'videos':
        return files.filter((file) => file.type === 'video');
      case 'recent':
        yesterday.setDate(yesterday.getDate() - 1);
        return files.filter((file) => file.createdAt > yesterday);
      case 'all':
      default:
        return files;
    }
  }
}
