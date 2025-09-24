import { useState, useCallback, useMemo, useEffect } from 'react';

import { MediaProcessor } from '~/entities/media/lib/media-processor';
import { useFileUpload } from '~/features/file-upload/model/use-file-upload';

import type { MediaGalleryOptions, MediaGalleryState, MediaGalleryHookReturn } from './types';

const DEFAULT_OPTIONS: Required<MediaGalleryOptions> = {
  uploadConfig: {},
  defaultViewMode: 'masonry',
  defaultSortBy: 'created',
  defaultSortOrder: 'desc',
  defaultFilter: 'all',
  enableSearch: true,
  enableBulkActions: true,
  enableSelection: true,
  maxGridColumns: 6,
};

export const useMediaGallery = (options: MediaGalleryOptions = {}): MediaGalleryHookReturn => {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const [state, setState] = useState<MediaGalleryState>({
    files: [],
    filteredFiles: [],
    selectedFiles: [],
    viewMode: config.defaultViewMode,
    sortBy: config.defaultSortBy,
    sortOrder: config.defaultSortOrder,
    filterBy: config.defaultFilter,
    searchQuery: '',
    isLoading: false,
  });

  const fileUpload = useFileUpload({
    onFileAdd: (file) => {
      console.log('File added:', file);
      setState((prev) => ({
        ...prev,
        files: [...prev.files, file],
      }));
    },
    onFileRemove: (fileId) => {
      setState((prev) => ({
        ...prev,
        files: prev.files.filter((f) => f.id !== fileId),
        selectedFiles: prev.selectedFiles.filter((id) => id !== fileId),
      }));
    },
  });

  // Filter and sort files
  const filteredAndSortedFiles = useMemo(() => {
    let filtered = MediaProcessor.filterFiles(state.files, state.filterBy);

    // Apply search filter
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (file) => file.name.toLowerCase().includes(query) || file.mimeType.toLowerCase().includes(query) || file.type.toLowerCase().includes(query),
      );
    }

    // Sort files
    const sorted = MediaProcessor.sortFiles(filtered, state.sortBy, state.sortOrder);

    return sorted;
  }, [state.files, state.filterBy, state.searchQuery, state.sortBy, state.sortOrder]);

  // Update filtered files when dependencies change
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      filteredFiles: filteredAndSortedFiles,
    }));
  }, [filteredAndSortedFiles]);

  // File operations
  const addFiles = useCallback(
    async (files: File[] | FileList) => {
      setState((prev) => ({ ...prev, isLoading: true }));
      await fileUpload.addFiles(files);
      setState((prev) => ({ ...prev, isLoading: false }));
    },
    [fileUpload],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      fileUpload.removeFile(fileId);
    },
    [fileUpload],
  );

  const removeFiles = useCallback(
    (fileIds: string[]) => {
      fileIds.forEach((id) => fileUpload.removeFile(id));
    },
    [fileUpload],
  );

  const clearFiles = useCallback(() => {
    fileUpload.clearFiles();
    setState((prev) => ({
      ...prev,
      selectedFiles: [],
    }));
  }, [fileUpload]);

  // Selection operations
  const selectFile = useCallback(
    (fileId: string) => {
      if (!config.enableSelection) return;

      setState((prev) => ({
        ...prev,
        selectedFiles: prev.selectedFiles.includes(fileId) ? prev.selectedFiles : [...prev.selectedFiles, fileId],
      }));
    },
    [config.enableSelection],
  );

  const selectFiles = useCallback(
    (fileIds: string[]) => {
      if (!config.enableSelection) return;

      setState((prev) => ({
        ...prev,
        selectedFiles: [...new Set([...prev.selectedFiles, ...fileIds])],
      }));
    },
    [config.enableSelection],
  );

  const deselectFile = useCallback((fileId: string) => {
    setState((prev) => ({
      ...prev,
      selectedFiles: prev.selectedFiles.filter((id) => id !== fileId),
    }));
  }, []);

  const deselectFiles = useCallback((fileIds: string[]) => {
    setState((prev) => ({
      ...prev,
      selectedFiles: prev.selectedFiles.filter((id) => !fileIds.includes(id)),
    }));
  }, []);

  const selectAll = useCallback(() => {
    if (!config.enableSelection) return;

    setState((prev) => ({
      ...prev,
      selectedFiles: prev.filteredFiles.map((file) => file.id),
    }));
  }, [config.enableSelection]);

  const deselectAll = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedFiles: [],
    }));
  }, []);

  const toggleSelection = useCallback(
    (fileId: string) => {
      if (!config.enableSelection) return;

      setState((prev) => ({
        ...prev,
        selectedFiles: prev.selectedFiles.includes(fileId) ? prev.selectedFiles.filter((id) => id !== fileId) : [...prev.selectedFiles, fileId],
      }));
    },
    [config.enableSelection],
  );

  // View controls
  const setViewMode = useCallback((mode: MediaGalleryState['viewMode']) => {
    setState((prev) => ({ ...prev, viewMode: mode }));
  }, []);

  const setSortBy = useCallback((sortBy: MediaGalleryState['sortBy']) => {
    setState((prev) => ({ ...prev, sortBy }));
  }, []);

  const setSortOrder = useCallback((order: MediaGalleryState['sortOrder']) => {
    setState((prev) => ({ ...prev, sortOrder: order }));
  }, []);

  const setFilterBy = useCallback((filter: MediaGalleryState['filterBy']) => {
    setState((prev) => ({ ...prev, filterBy: filter }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  // Bulk actions
  const downloadSelected = useCallback(() => {
    if (!config.enableBulkActions || state.selectedFiles.length === 0) return;

    const selectedMediaFiles = state.files.filter((file) => state.selectedFiles.includes(file.id));

    selectedMediaFiles.forEach((file) => {
      const url = URL.createObjectURL(file.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
  }, [config.enableBulkActions, state.selectedFiles, state.files]);

  const deleteSelected = useCallback(() => {
    if (!config.enableBulkActions || state.selectedFiles.length === 0) return;

    const confirmed = window.confirm(`Are you sure you want to delete ${state.selectedFiles.length} selected files?`);

    if (confirmed) {
      removeFiles(state.selectedFiles);
    }
  }, [config.enableBulkActions, state.selectedFiles, removeFiles]);

  return {
    state,
    addFiles,
    removeFile,
    removeFiles,
    clearFiles,
    selectFile,
    selectFiles,
    deselectFile,
    deselectFiles,
    selectAll,
    deselectAll,
    toggleSelection,
    setViewMode,
    setSortBy,
    setSortOrder,
    setFilterBy,
    setSearchQuery,
    downloadSelected,
    deleteSelected,
    uploadProgress: fileUpload.uploadProgress,
    isUploading: fileUpload.isUploading,
    dropzoneProps: fileUpload.dropzoneProps,
  };
};
