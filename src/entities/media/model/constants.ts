import { SUPPORTED_MEDIA_TYPES } from '~/shared/lib/file-utils';

import type { FilterBy, SortBy, ViewMode } from './types';

export const DEFAULT_UPLOAD_CONFIG = {
  multiple: true,
  maxFiles: 20,
  maxSize: 100 * 1024 * 1024, // 100MB
  acceptedTypes: SUPPORTED_MEDIA_TYPES,
  generateThumbnails: true,
  extractExif: true,
  autoUpload: false,
} as const;

export const MEDIA_CARD_VARIANTS = ['compact', 'detailed'] as const;

export const VIEW_MODES: ViewMode[] = ['list', 'masonry'];

export const SORT_OPTIONS: SortBy[] = ['name', 'size', 'type', 'created', 'modified'];

export const FILTER_OPTIONS: FilterBy[] = ['all', 'images', 'videos', 'recent'];

export const FILTER_LABELS = {
  all: '전체',
  images: '이미지',
  videos: '동영상',
  recent: '최근',
} as const;

export const UPLOAD_STATUS_LABELS = {
  pending: '대기 중',
  uploading: '업로드 중',
  processing: '처리 중',
  completed: '완료',
  error: '오류',
  cancelled: '취소됨',
} as const;

export const UPLOAD_STATUS_COLORS = {
  pending: 'text-gray-500',
  uploading: 'text-blue-500',
  processing: 'text-yellow-500',
  completed: 'text-green-500',
  error: 'text-red-500',
  cancelled: 'text-gray-400',
} as const;

export const MEDIA_TYPE_LABELS = {
  image: '이미지',
  video: '동영상',
  unknown: '알 수 없음',
} as const;

export const THUMBNAIL_SIZE = {
  small: 150,
  medium: 300,
  large: 600,
} as const;

export const GRID_BREAKPOINTS = {
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 5,
} as const;

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: '파일 크기가 최대 제한을 초과했습니다',
  UNSUPPORTED_TYPE: '지원되지 않는 파일 형식입니다',
  UPLOAD_FAILED: '업로드에 실패했습니다. 다시 시도해주세요',
  PROCESSING_FAILED: '파일 처리에 실패했습니다',
  NETWORK_ERROR: '네트워크 오류입니다. 연결을 확인해주세요',
  MAX_FILES_EXCEEDED: '최대 파일 수를 초과했습니다',
  INVALID_FILE: '잘못된 파일입니다',
} as const;
