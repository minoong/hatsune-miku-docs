import type { DropzoneState } from 'react-dropzone';

import type { MediaFile, FileUploadConfig, UploadError } from '~/entities/media/model/types';
import type { Any } from '~/shared/model/global';

export interface FileUploadState {
  files: MediaFile[];
  isUploading: boolean;
  uploadProgress: Record<string, number>;
  errors: UploadError[];
}

export interface UseFileUploadOptions extends Partial<FileUploadConfig> {
  onUploadComplete?: (files: MediaFile[]) => void;
  onUploadError?: (error: UploadError) => void;
  onFileAdd?: (file: MediaFile) => void;
  onFileRemove?: (fileId: string) => void;
}

export interface FileUploadHookReturn {
  // State
  files: MediaFile[];
  isUploading: boolean;
  uploadProgress: Record<string, number>;
  errors: UploadError[];

  // Dropzone props
  dropzoneProps: DropzoneState;

  // Actions
  addFiles: (files: File[] | FileList) => Promise<void>;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  clearErrors: () => void;
  retryUpload: (fileId: string) => Promise<void>;
  uploadAll: () => Promise<void>;
}

export interface DropzoneProps {
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  disabled?: boolean;
  onDrop?: (acceptedFiles: File[], rejectedFiles: Any[]) => void;
  onDropAccepted?: (files: File[]) => void;
  onDropRejected?: (rejectedFiles: Any[]) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface UploadProgressProps {
  files: MediaFile[];
  onRemove?: (fileId: string) => void;
  onRetry?: (fileId: string) => void;
}
