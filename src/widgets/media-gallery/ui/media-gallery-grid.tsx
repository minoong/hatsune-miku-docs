import { motion, AnimatePresence } from 'framer-motion';

import { MediaCard } from '~/features/media-card/ui/media-card';

import type { MediaGalleryGridProps } from '../model/types';

export const MediaGalleryGrid = ({
  files,
  viewMode,
  selectedFiles,
  onFileClick,
  onFileSelect,
  onFileDelete,
  onFileDownload,
  enableSelection,
}: MediaGalleryGridProps) => {
  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-4';
      case 'masonry':
      default:
        return 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (viewMode === 'list') {
    return (
      <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="show">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div key={file.id} variants={itemVariants} layout className="relative">
              {enableSelection && (
                <div className="absolute top-3 left-3 z-10">
                  <motion.label className="flex cursor-pointer items-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <input type="checkbox" checked={selectedFiles.includes(file.id)} onChange={() => onFileSelect(file.id)} className="sr-only" />
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white hover:border-blue-400'} `}
                    >
                      {selectedFiles.includes(file.id) && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </motion.label>
                </div>
              )}

              <div className="flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
                <div className="h-20 w-20 flex-shrink-0">
                  <img src={file.thumbnail || file.preview || URL.createObjectURL(file.file)} alt={file.name} className="h-full w-full rounded object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-gray-900">{file.name}</h3>
                  <p className="text-sm text-gray-500">{file.mimeType}</p>
                  {file.metadata && (
                    <p className="text-xs text-gray-400">
                      {file.metadata.width}×{file.metadata.height}
                      {file.metadata.duration && ` • ${Math.round(file.metadata.duration)}s`}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button onClick={() => onFileClick(file)} className="p-2 text-gray-400 transition-colors hover:text-blue-600" aria-label="파일 보기">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => onFileDownload(file.id)}
                    className="p-2 text-gray-400 transition-colors hover:text-green-600"
                    aria-label="파일 다운로드"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>

                  <button onClick={() => onFileDelete(file.id)} className="p-2 text-gray-400 transition-colors hover:text-red-600" aria-label="파일 삭제">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div className={getGridClasses()} variants={containerVariants} initial="hidden" animate="show">
      <AnimatePresence>
        {files.map((file) => (
          <motion.div key={file.id} variants={itemVariants} layout className="relative" style={viewMode === 'masonry' ? { breakInside: 'avoid' } : undefined}>
            {enableSelection && (
              <div className="absolute top-3 left-3 z-10">
                <motion.label className="flex cursor-pointer items-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <input type="checkbox" checked={selectedFiles.includes(file.id)} onChange={() => onFileSelect(file.id)} className="sr-only" />
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 backdrop-blur-sm transition-all ${selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-500' : 'bg-opacity-90 border-gray-300 bg-white hover:border-blue-400'} `}
                  >
                    {selectedFiles.includes(file.id) && (
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </motion.label>
              </div>
            )}

            <MediaCard
              media={file}
              variant={viewMode === 'masonry' ? 'detailed' : 'compact'}
              showExif={false}
              showMetadata={true}
              onClick={onFileClick}
              onDelete={() => onFileDelete(file.id)}
              onDownload={() => onFileDownload(file.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
