import type { ExifData } from '~/shared/lib/exif-utils';
import type { SupportedMediaType } from '~/shared/lib/file-utils';
import type { MediaType } from '~/shared/lib/media-utils';

export interface MediaFile {
  id: string;
  file: File;
  type: MediaType;
  mimeType: SupportedMediaType;
  name: string;
  size: number;
  preview?: string;
  thumbnail?: string;
  uploadProgress?: number;
  uploadStatus: UploadStatus;
  error?: string;
  metadata?: MediaMetadata;
  exifData?: ExifData;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaMetadata {
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'landscape' | 'portrait' | 'square';
  duration?: number; // For videos
  frameRate?: number; // For videos
  bitRate?: number; // For videos
}

export type UploadStatus = 'pending' | 'uploading' | 'processing' | 'completed' | 'error' | 'cancelled';

export interface UploadError {
  code: string;
  message: string;
  file?: string;
}

export interface MediaGalleryState {
  files: MediaFile[];
  selectedFiles: string[];
  viewMode: ViewMode;
  sortBy: SortBy;
  sortOrder: SortOrder;
  filterBy: FilterBy;
  isLoading: boolean;
  error?: UploadError;
}

export type ViewMode = 'list' | 'masonry';
export type SortBy = 'name' | 'size' | 'type' | 'created' | 'modified';
export type SortOrder = 'asc' | 'desc';
export type FilterBy = 'all' | 'images' | 'videos' | 'recent';

export interface MediaCardProps {
  media: MediaFile;
  variant?: 'compact' | 'detailed';
  showExif?: boolean;
  showMetadata?: boolean;
  onClick?: (media: MediaFile) => void;
  onDelete?: (media: MediaFile) => void;
  onDownload?: (media: MediaFile) => void;
}

export interface FileUploadConfig {
  multiple: boolean;
  maxFiles: number;
  maxSize: number;
  acceptedTypes: SupportedMediaType[];
  generateThumbnails: boolean;
  extractExif: boolean;
  autoUpload: boolean;
}
