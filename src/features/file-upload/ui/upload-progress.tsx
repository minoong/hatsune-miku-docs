import { motion, AnimatePresence } from 'framer-motion';

import { UPLOAD_STATUS_LABELS, UPLOAD_STATUS_COLORS } from '~/entities/media/model/constants';
import { formatFileSize, getFileExtension } from '~/shared/lib/file-utils';
import { getMimeTypeIcon, getFileTypeLabel, formatDuration } from '~/shared/lib/media-utils';

import type { UploadProgressProps } from '../model/types';

export const UploadProgress = ({ files, onRemove, onRetry }: UploadProgressProps) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">업로드 진행률 ({files.length}개 파일)</h3>
        {files.some((f) => f.uploadStatus === 'error') && (
          <button
            onClick={() => files.filter((f) => f.uploadStatus === 'error').forEach((f) => onRetry?.(f.id))}
            className="text-sm text-blue-600 transition-colors hover:text-blue-800"
          >
            실패한 모든 파일 재시도
          </button>
        )}
      </div>

      <div className="max-h-96 space-y-2 overflow-y-auto">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                {/* File icon and preview */}
                <div className="flex-shrink-0">
                  {file.thumbnail ? (
                    <img src={file.thumbnail} alt={file.name} className="h-10 w-10 rounded object-cover" />
                  ) : file.preview ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <span className="text-lg">{getMimeTypeIcon(file.mimeType)}</span>
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100">
                      <span className="text-xs font-medium text-gray-600">{getFileExtension(file.name).toUpperCase()}</span>
                    </div>
                  )}
                </div>

                {/* File info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium ${UPLOAD_STATUS_COLORS[file.uploadStatus]}`}>{UPLOAD_STATUS_LABELS[file.uploadStatus]}</span>
                      {onRemove && (
                        <button
                          onClick={() => onRemove(file.id)}
                          className="text-gray-400 transition-colors hover:text-red-600"
                          aria-label={`${file.name} 제거`}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{getFileTypeLabel(file.mimeType)}</span>
                      <span>•</span>
                      <span>{formatFileSize(file.size)}</span>
                      {file.metadata?.duration && (
                        <>
                          <span>•</span>
                          <span>{formatDuration(file.metadata.duration)}</span>
                        </>
                      )}
                      {file.metadata && (
                        <>
                          <span>•</span>
                          <span>
                            {file.metadata.width}×{file.metadata.height}
                          </span>
                        </>
                      )}
                    </div>

                    {file.uploadStatus === 'error' && onRetry && (
                      <button onClick={() => onRetry(file.id)} className="text-xs text-blue-600 transition-colors hover:text-blue-800">
                        재시도
                      </button>
                    )}
                  </div>

                  {/* Progress bar */}
                  {(file.uploadStatus === 'uploading' || file.uploadStatus === 'processing') && (
                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <motion.div
                          className="h-2 rounded-full bg-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${file.uploadProgress || 0}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{file.uploadProgress || 0}% 완료</p>
                    </div>
                  )}

                  {/* Error message */}
                  {file.error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-600">
                      {file.error}
                    </motion.p>
                  )}

                  {/* Success indicator */}
                  {file.uploadStatus === 'completed' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-1 flex items-center text-xs text-green-600"
                    >
                      <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      업로드 완료
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
