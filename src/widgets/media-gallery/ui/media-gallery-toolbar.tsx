import { motion } from 'framer-motion';

import { VIEW_MODES, SORT_OPTIONS, FILTER_OPTIONS, FILTER_LABELS } from '~/entities/media/model/constants';
import type { Any } from '~/shared/model/global';

import type { MediaGalleryToolbarProps } from '../model/types';

export const MediaGalleryToolbar = ({
  viewMode,
  sortBy,
  sortOrder,
  filterBy,
  searchQuery,
  selectedCount,
  totalCount,
  onViewModeChange,
  onSortChange,
  onFilterChange,
  onSearchChange,
  onSelectAll,
  onDeselectAll,
  onDeleteSelected,
  onDownloadSelected,
}: MediaGalleryToolbarProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        {/* Left side - Search and filters */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="파일 검색..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:w-64"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter */}
          <select
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value as Any)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {FILTER_LABELS[option]}
              </option>
            ))}
          </select>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as Any, sortOrder)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === 'name' ? '이름순' : option === 'size' ? '크기순' : option === 'type' ? '타입별' : option === 'created' ? '생성순' : '수정순'}
                </option>
              ))}
            </select>

            <button
              onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
              className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-50 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              aria-label={`${sortOrder === 'asc' ? '내림차순' : '오름차순'} 정렬`}
            >
              {sortOrder === 'asc' ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Right side - View mode and actions */}
        <div className="flex items-center justify-between space-x-4 sm:justify-end">
          {/* Selection info and bulk actions */}
          {selectedCount > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {selectedCount}개 선택됨 (์ด {totalCount}개)
              </span>

              <div className="flex items-center space-x-2">
                <button onClick={onDeselectAll} className="text-sm text-gray-500 transition-colors hover:text-gray-700">
                  선택 해제
                </button>

                {onDownloadSelected && (
                  <button onClick={onDownloadSelected} className="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600">
                    다운로드
                  </button>
                )}

                {onDeleteSelected && (
                  <button onClick={onDeleteSelected} className="rounded bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-600">
                    삭제
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Select all button */}
          {selectedCount === 0 && totalCount > 0 && (
            <button onClick={onSelectAll} className="text-sm text-blue-600 transition-colors hover:text-blue-800">
              전체 선택
            </button>
          )}

          {/* File count */}
          <span className="text-sm text-gray-500">{totalCount}개 파일</span>

          {/* View mode toggle */}
          <div className="flex items-center rounded-lg bg-gray-100 p-1">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`rounded px-3 py-1.5 text-sm transition-all ${
                  viewMode === mode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label={`Switch to ${mode} view`}
              >
                {mode === 'list' && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                )}
                {mode === 'masonry' && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
