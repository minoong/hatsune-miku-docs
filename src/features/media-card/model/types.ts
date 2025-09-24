import type { MediaFile } from '~/entities/media/model/types';

export interface MediaCardHookOptions {
  autoPlayVideos?: boolean;
  showExifPanel?: boolean;
  enableKeyboardNavigation?: boolean;
}

export interface MediaCardHookReturn {
  isHovered: boolean;
  isPlaying: boolean;
  showExifPanel: boolean;
  isFullscreen: boolean;
  imageRef: React.RefObject<HTMLImageElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;

  // Event handlers
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handlePlayToggle: () => void;
  handleExifToggle: () => void;
  handleFullscreenToggle: () => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export interface MediaCardActionsProps {
  media: MediaFile;
  onView?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  className?: string;
}

export interface ExifInfoProps {
  media: MediaFile;
  isOpen: boolean;
  onClose: () => void;
}
