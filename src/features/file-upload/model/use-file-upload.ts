import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import type { MediaFile, UploadError } from '~/entities/media/model/types';
import { DEFAULT_UPLOAD_CONFIG, ERROR_MESSAGES } from '~/entities/media/model/constants';
import { MediaProcessor } from '~/entities/media/lib/media-processor';
import { isSupportedMediaFile, validateFileSize } from '~/shared/lib/file-utils';

import type { FileUploadState, UseFileUploadOptions, FileUploadHookReturn } from './types';

export const useFileUpload = (options: UseFileUploadOptions = {}): FileUploadHookReturn => {
  const { onUploadComplete, onUploadError, onFileAdd, onFileRemove, ...configOptions } = options;
  const config = { ...DEFAULT_UPLOAD_CONFIG, ...configOptions };

  const [state, setState] = useState<FileUploadState>({
    files: [],
    isUploading: false,
    uploadProgress: {},
    errors: [],
  });

  const addError = useCallback(
    (error: UploadError) => {
      setState((prev) => ({
        ...prev,
        errors: [...prev.errors, error],
      }));
      onUploadError?.(error);
    },
    [onUploadError],
  );

  const addFiles = useCallback(
    async (files: File[] | FileList) => {
      const fileArray = Array.from(files);

      if (fileArray.length === 0) {
        return;
      }

      const totalFiles = state.files.length + fileArray.length;

      if (totalFiles > config.maxFiles) {
        addError({
          code: 'MAX_FILES_EXCEEDED',
          message: `${ERROR_MESSAGES.MAX_FILES_EXCEEDED}. Maximum ${config.maxFiles} files allowed.`,
        });
        return;
      }

      setState((prev) => ({ ...prev, isUploading: true }));

      const processedFiles: MediaFile[] = [];

      for (const file of fileArray) {
        try {
          const isSupported = isSupportedMediaFile(file);

          if (!isSupported) {
            addError({
              code: 'UNSUPPORTED_TYPE',
              message: `${ERROR_MESSAGES.UNSUPPORTED_TYPE}: ${file.name}`,
              file: file.name,
            });
            continue;
          }

          const sizeValid = validateFileSize(file);

          if (!sizeValid) {
            addError({
              code: 'FILE_TOO_LARGE',
              message: `${ERROR_MESSAGES.FILE_TOO_LARGE}: ${file.name}`,
              file: file.name,
            });
            continue;
          }

          const mediaFile = await MediaProcessor.processFile(file, config.generateThumbnails, config.extractExif);

          processedFiles.push(mediaFile);
          onFileAdd?.(mediaFile);
        } catch (_) {
          addError({
            code: 'PROCESSING_FAILED',
            message: `${ERROR_MESSAGES.PROCESSING_FAILED}: ${file.name}`,
            file: file.name,
          });
        }
      }

      setState((prev) => ({
        ...prev,
        files: [...prev.files, ...processedFiles],
        isUploading: false,
      }));

      if (config.autoUpload && processedFiles.length > 0) {
        await uploadFiles(processedFiles);
      }
    },
    [state.files.length, config, addError, onFileAdd],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      setState((prev) => {
        const updatedFiles = prev.files.filter((file) => file.id !== fileId);
        const { [fileId]: _removed, ...remainingProgress } = prev.uploadProgress;

        return {
          ...prev,
          files: updatedFiles,
          uploadProgress: remainingProgress,
        };
      });

      onFileRemove?.(fileId);
    },
    [onFileRemove],
  );

  const clearFiles = useCallback(() => {
    setState((prev) => ({
      ...prev,
      files: [],
      uploadProgress: {},
      errors: [],
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setState((prev) => ({
      ...prev,
      errors: [],
    }));
  }, []);

  const uploadFiles = useCallback(
    async (filesToUpload?: MediaFile[]) => {
      const files = filesToUpload || state.files.filter((file) => file.uploadStatus === 'pending' || file.uploadStatus === 'error');

      if (files.length === 0) return;

      setState((prev) => ({ ...prev, isUploading: true }));

      for (const file of files) {
        try {
          // Simulate upload progress
          for (let progress = 0; progress <= 100; progress += 10) {
            setState((prev) => ({
              ...prev,
              uploadProgress: {
                ...prev.uploadProgress,
                [file.id]: progress,
              },
            }));

            // Update file status
            setState((prev) => ({
              ...prev,
              files: prev.files.map((f) =>
                f.id === file.id ? { ...f, uploadProgress: progress, uploadStatus: progress === 100 ? 'completed' : 'uploading' } : f,
              ),
            }));

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        } catch (_) {
          setState((prev) => ({
            ...prev,
            files: prev.files.map((f) => (f.id === file.id ? { ...f, uploadStatus: 'error', error: ERROR_MESSAGES.UPLOAD_FAILED } : f)),
          }));

          addError({
            code: 'UPLOAD_FAILED',
            message: `${ERROR_MESSAGES.UPLOAD_FAILED}: ${file.name}`,
            file: file.name,
          });
        }
      }

      setState((prev) => ({ ...prev, isUploading: false }));

      const completedFiles = state.files.filter((file) => file.uploadStatus === 'completed');
      if (completedFiles.length > 0) {
        onUploadComplete?.(completedFiles);
      }
    },
    [state.files, addError, onUploadComplete],
  );

  const retryUpload = useCallback(
    async (fileId: string) => {
      const file = state.files.find((f) => f.id === fileId);
      if (file) {
        await uploadFiles([file]);
      }
    },
    [state.files, uploadFiles],
  );

  const uploadAll = useCallback(async () => {
    await uploadFiles();
  }, [uploadFiles]);

  // Dropzone configuration
  const dropzoneProps = useDropzone({
    multiple: config.multiple,
    maxFiles: config.maxFiles,
    maxSize: config.maxSize,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic', '.heif'],
      'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
    },
    onDrop: (files) => {
      addFiles(files);
    },
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach((rejected) => {
        const { file, errors } = rejected;
        errors.forEach((error) => {
          let errorMessage: string = ERROR_MESSAGES.INVALID_FILE;

          if (error.code === 'file-too-large') {
            errorMessage = ERROR_MESSAGES.FILE_TOO_LARGE;
          } else if (error.code === 'file-invalid-type') {
            errorMessage = ERROR_MESSAGES.UNSUPPORTED_TYPE;
          } else if (error.code === 'too-many-files') {
            errorMessage = ERROR_MESSAGES.MAX_FILES_EXCEEDED;
          }

          addError({
            code: error.code,
            message: `${errorMessage}: ${file.name}`,
            file: file.name,
          });
        });
      });
    },
  });

  return {
    files: state.files,
    isUploading: state.isUploading,
    uploadProgress: state.uploadProgress,
    errors: state.errors,
    dropzoneProps,
    addFiles,
    removeFile,
    clearFiles,
    clearErrors,
    retryUpload,
    uploadAll,
  };
};
