import { useEffect, useRef, useState } from 'react';

import { type CarouselItem, type UseInfiniteCarouselOptions } from '~/features/carousel/model/type';

export const useInfiniteCarousel = (originalItems: CarouselItem[], options: UseInfiniteCarouselOptions = {}) => {
  const { autoPlayInterval = 3000, direction = 'horizontal', threshold = 100 } = options;

  const items: CarouselItem[] = [...originalItems.slice(-2), ...originalItems, ...originalItems.slice(0, 2)];

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = (): void => {
    if (autoPlayInterval <= 0) return;
    autoPlayRef.current = setInterval(() => {
      if (!isDragging && !isTransitioning) {
        next();
      }
    }, autoPlayInterval);
  };

  const stopAutoPlay = (): void => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [isDragging, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);

      if (currentIndex <= 1) {
        setCurrentIndex(currentIndex + originalItems.length);
      } else if (currentIndex >= items.length - 2) {
        setCurrentIndex(currentIndex - originalItems.length);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, originalItems.length, items.length]);

  const next = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleStart = (clientPos: number): void => {
    setIsDragging(true);
    setStartPos(clientPos);
    setDragDistance(0);
    stopAutoPlay();
  };

  const handleMove = (clientPos: number): void => {
    if (!isDragging) return;
    const distance = clientPos - startPos;
    setDragDistance(distance);
  };

  const handleEnd = (): void => {
    if (!isDragging) return;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        prev();
      } else {
        next();
      }
    }

    setIsDragging(false);
    setDragDistance(0);
    startAutoPlay();
  };

  const goToSlide = (index: number): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 2);
  };

  const getRealIndex = (index: number): number => {
    if (index < 2) return originalItems.length + index - 2;
    if (index >= items.length - 2) return index - originalItems.length - 2;
    return index - 2;
  };

  const currentRealIndex = getRealIndex(currentIndex);

  const getTransformStyle = (): string => {
    const containerSize = direction === 'horizontal' ? containerRef.current?.offsetWidth : containerRef.current?.offsetHeight;

    const baseTransform = -currentIndex * 100;
    const dragOffset = isDragging && containerSize ? (dragDistance / containerSize) * 100 : 0;

    const totalTransform = baseTransform + dragOffset;

    return direction === 'horizontal' ? `translateX(${totalTransform}%)` : `translateY(${totalTransform}%)`;
  };

  return {
    items,
    currentIndex,
    currentRealIndex,
    isTransitioning,
    isDragging,
    containerRef,
    next,
    prev,
    goToSlide,
    handleStart,
    handleMove,
    handleEnd,
    getTransformStyle,
    originalItems,
  };
};
