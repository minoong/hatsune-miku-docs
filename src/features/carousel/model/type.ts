export interface CarouselItem {
  id: number;
  title: string;
  color: string;
  image: string;
}

export type Direction = 'horizontal' | 'vertical';

export interface UseInfiniteCarouselOptions {
  autoPlayInterval?: number;
  direction?: Direction;
  threshold?: number;
}

export interface UseInfiniteCarouselReturn {
  items: CarouselItem[];
  currentIndex: number;
  currentRealIndex: number;
  isTransitioning: boolean;
  isDragging: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  next: () => void;
  prev: () => void;
  goToSlide: (index: number) => void;
  handleStart: (clientPos: number) => void;
  handleMove: (clientPos: number) => void;
  handleEnd: () => void;
  getTransformStyle: () => string;
  originalItems: CarouselItem[];
}
