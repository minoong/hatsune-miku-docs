import type { MediaFile, ViewMode, SortBy, SortOrder, FilterBy, FileUploadConfig } from '~/entities/media/model/types';
import type { Any } from '~/shared/model/global';

export interface MediaGalleryOptions {
  uploadConfig?: Partial<FileUploadConfig>;
  defaultViewMode?: ViewMode;
  defaultSortBy?: SortBy;
  defaultSortOrder?: SortOrder;
  defaultFilter?: FilterBy;
  enableSearch?: boolean;
  enableBulkActions?: boolean;
  enableSelection?: boolean;
  maxGridColumns?: number;
}

export interface MediaGalleryState {
  files: MediaFile[];
  filteredFiles: MediaFile[];
  selectedFiles: string[];
  viewMode: ViewMode;
  sortBy: SortBy;
  sortOrder: SortOrder;
  filterBy: FilterBy;
  searchQuery: string;
  isLoading: boolean;
  error?: string;
}

export interface MediaGalleryHookReturn {
  // State
  state: MediaGalleryState;

  // File operations
  addFiles: (files: File[] | FileList) => Promise<void>;
  removeFile: (fileId: string) => void;
  removeFiles: (fileIds: string[]) => void;
  clearFiles: () => void;

  // Selection
  selectFile: (fileId: string) => void;
  selectFiles: (fileIds: string[]) => void;
  deselectFile: (fileId: string) => void;
  deselectFiles: (fileIds: string[]) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleSelection: (fileId: string) => void;

  // View controls
  setViewMode: (mode: ViewMode) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (order: SortOrder) => void;
  setFilterBy: (filter: FilterBy) => void;
  setSearchQuery: (query: string) => void;

  // Bulk actions
  downloadSelected: () => void;
  deleteSelected: () => void;

  // Upload
  uploadProgress: Record<string, number>;
  isUploading: boolean;
  dropzoneProps: Any;
}

export interface MediaGalleryToolbarProps {
  viewMode: ViewMode;
  sortBy: SortBy;
  sortOrder: SortOrder;
  filterBy: FilterBy;
  searchQuery: string;
  selectedCount: number;
  totalCount: number;
  onViewModeChange: (mode: ViewMode) => void;
  onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
  onFilterChange: (filter: FilterBy) => void;
  onSearchChange: (query: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDeleteSelected?: () => void;
  onDownloadSelected?: () => void;
}

export interface MediaGalleryGridProps {
  files: MediaFile[];
  viewMode: ViewMode;
  selectedFiles: string[];
  onFileClick: (file: MediaFile) => void;
  onFileSelect: (fileId: string) => void;
  onFileDelete: (fileId: string) => void;
  onFileDownload: (fileId: string) => void;
  enableSelection: boolean;
}
