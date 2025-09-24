import { motion } from 'framer-motion';

import { FileDropzone } from '~/features/file-upload/ui/dropzone';
import { UploadProgress } from '~/features/file-upload/ui/upload-progress';
import type { Any } from '~/shared/model/global';

import type { MediaGalleryOptions } from '../model/types';
import { useMediaGallery } from '../model/use-media-gallery';

import { MediaGalleryToolbar } from './media-gallery-toolbar';
import { MediaGalleryGrid } from './media-gallery-grid';

interface MediaGalleryProps extends MediaGalleryOptions {
  onFileClick?: (file: Any) => void;
  onFileDownload?: (file: Any) => void;
  className?: string;
}

export const MediaGallery = ({ onFileClick, onFileDownload, className = '', ...options }: MediaGalleryProps) => {
  const gallery = useMediaGallery(options);

  const handleFileDownload = (fileId: string) => {
    const file = gallery.state.files.find((f) => f.id === fileId);
    if (file) {
      onFileDownload?.(file);

      // Default download behavior
      const url = URL.createObjectURL(file.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleFileClick = (file: Any) => {
    onFileClick?.(file);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Area */}
      <div className="space-y-4">
        <div className="min-h-[200px]">
          <FileDropzone
            {...gallery.dropzoneProps}
            isDragActive={gallery.dropzoneProps?.isDragActive}
            isDragAccept={gallery.dropzoneProps?.isDragAccept}
            isDragReject={gallery.dropzoneProps?.isDragReject}
            disabled={gallery.isUploading}
          />
        </div>

        {/* Upload Progress */}
        {Object.keys(gallery.uploadProgress).length > 0 && (
          <UploadProgress
            files={gallery.state.files.filter((f) => f.uploadStatus !== 'completed')}
            onRemove={gallery.removeFile}
            onRetry={(fileId) => {
              // Retry logic would go here
              console.log('Retry upload for file:', fileId);
            }}
          />
        )}
      </div>

      {/* Toolbar */}
      {gallery.state.files.length > 0 && (
        <MediaGalleryToolbar
          viewMode={gallery.state.viewMode}
          sortBy={gallery.state.sortBy}
          sortOrder={gallery.state.sortOrder}
          filterBy={gallery.state.filterBy}
          searchQuery={gallery.state.searchQuery}
          selectedCount={gallery.state.selectedFiles.length}
          totalCount={gallery.state.filteredFiles.length}
          onViewModeChange={gallery.setViewMode}
          onSortChange={(sortBy, sortOrder) => {
            gallery.setSortBy(sortBy);
            gallery.setSortOrder(sortOrder);
          }}
          onFilterChange={gallery.setFilterBy}
          onSearchChange={gallery.setSearchQuery}
          onSelectAll={gallery.selectAll}
          onDeselectAll={gallery.deselectAll}
          onDeleteSelected={options.enableBulkActions ? gallery.deleteSelected : undefined}
          onDownloadSelected={options.enableBulkActions ? gallery.downloadSelected : undefined}
        />
      )}

      {/* Gallery Grid */}
      {gallery.state.filteredFiles.length > 0 ? (
        <MediaGalleryGrid
          files={gallery.state.filteredFiles}
          viewMode={gallery.state.viewMode}
          selectedFiles={gallery.state.selectedFiles}
          onFileClick={handleFileClick}
          onFileSelect={gallery.toggleSelection}
          onFileDelete={gallery.removeFile}
          onFileDownload={handleFileDownload}
          enableSelection={options.enableSelection ?? true}
        />
      ) : gallery.state.files.length === 0 ? (
        <motion.div className="py-12 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 text-gray-400">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">업로드된 파일이 없습니다</h3>
          <p className="text-gray-500">파일을 드래그하거나 업로드 영역을 클릭하세요.</p>
        </motion.div>
      ) : (
        <motion.div className="py-12 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 text-gray-400">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">검색 결과가 없습니다</h3>
          <p className="text-gray-500">검색어나 필터를 조정해보세요.</p>
          <button
            onClick={() => {
              gallery.setSearchQuery('');
              gallery.setFilterBy('all');
            }}
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            필터 지우기
          </button>
        </motion.div>
      )}

      {/* Loading State */}
      {gallery.state.isLoading && (
        <motion.div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <motion.div
                className="h-6 w-6 rounded-full border-3 border-blue-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-gray-900">Processing files...</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
