import { useState } from 'react';

import type { CarouselItem, Direction } from '~/features/carousel/model/type';
import { useInfiniteCarousel } from '~/features/carousel/model/use-infinite-carousel';

interface InfiniteCarouselProps {
  direction?: 'horizontal' | 'vertical';
}

export const InfiniteCarousel = (props: InfiniteCarouselProps) => {
  const { direction: propDirection = 'horizontal' } = props;
  const [direction] = useState<Direction>(propDirection);
  const [key] = useState<number>(0); // 캐러셀 재생성을 위한 키

  const sampleItems: CarouselItem[] = [
    { id: 1, title: '첫 번째 슬라이드', color: 'bg-gradient-to-br from-pink-400 to-purple-600', image: '🌸' },
    { id: 2, title: '두 번째 슬라이드', color: 'bg-gradient-to-br from-blue-400 to-cyan-600', image: '🌊' },
    { id: 3, title: '세 번째 슬라이드', color: 'bg-gradient-to-br from-green-400 to-emerald-600', image: '🌿' },
    { id: 4, title: '네 번째 슬라이드', color: 'bg-gradient-to-br from-yellow-400 to-orange-600', image: '🌅' },
    { id: 5, title: '다섯 번째 슬라이드', color: 'bg-gradient-to-br from-purple-400 to-indigo-600', image: '🌌' },
  ];

  const carousel = useInfiniteCarousel(sampleItems, {
    direction,
    autoPlayInterval: 3000,
    threshold: 100,
  });

  // 이벤트 핸들러들
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pos = direction === 'horizontal' ? e.clientX : e.clientY;
    carousel.handleStart(pos);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!carousel.isDragging) return;
    e.preventDefault();
    const pos = direction === 'horizontal' ? e.clientX : e.clientY;
    carousel.handleMove(pos);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    const pos = direction === 'horizontal' ? e.touches[0].clientX : e.touches[0].clientY;
    carousel.handleStart(pos);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (!carousel.isDragging) return;
    const pos = direction === 'horizontal' ? e.touches[0].clientX : e.touches[0].clientY;
    carousel.handleMove(pos);
  };

  const isHorizontal = direction === 'horizontal';

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">무한 터치 캐러셀 (TypeScript)</h2>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl" key={key}>
        {/* 캐러셀 컨테이너 */}
        <div
          ref={carousel.containerRef}
          className={`relative cursor-grab select-none active:cursor-grabbing ${isHorizontal ? 'h-96 w-full' : 'h-96 w-full'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={carousel.isDragging ? handleMouseMove : undefined}
          onMouseUp={carousel.isDragging ? carousel.handleEnd : undefined}
          onMouseLeave={carousel.isDragging ? carousel.handleEnd : undefined}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={carousel.handleEnd}
        >
          {/* 슬라이드 컨테이너 */}
          <div
            className={`${isHorizontal ? 'flex' : 'flex flex-col'} h-full ${carousel.isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
            style={{
              transform: carousel.getTransformStyle(),
            }}
          >
            {carousel.items.map((item: CarouselItem, index: number) => (
              <div
                key={`${item.id}-${index}`}
                className={`flex-shrink-0 ${isHorizontal ? 'w-full' : 'h-full w-full'} ${item.color} relative flex flex-col items-center justify-center overflow-hidden text-white`}
              >
                {/* 배경 패턴 */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 h-32 w-32 -translate-x-16 -translate-y-16 transform rounded-full bg-white"></div>
                  <div className="absolute right-0 bottom-0 h-48 w-48 translate-x-24 translate-y-24 transform rounded-full bg-white"></div>
                </div>

                {/* 콘텐츠 */}
                <div className="mb-4 animate-pulse text-8xl">{item.image}</div>
                <h3 className="z-10 mb-2 text-center text-2xl font-bold">{item.title}</h3>
                <p className="z-10 text-center text-lg opacity-90">슬라이드 #{item.id}</p>
                <p className="z-10 mt-2 text-sm opacity-75">{isHorizontal ? '좌우로 드래그' : '상하로 드래그'}</p>
              </div>
            ))}
          </div>

          {/* 네비게이션 버튼 */}
          {isHorizontal ? (
            <>
              <button
                onClick={carousel.prev}
                className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
                disabled={carousel.isTransitioning}
              >
                👈
              </button>

              <button
                onClick={carousel.next}
                className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
                disabled={carousel.isTransitioning}
              >
                👉
              </button>
            </>
          ) : (
            <>
              <button
                onClick={carousel.prev}
                className="absolute top-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
                disabled={carousel.isTransitioning}
              >
                👆
              </button>

              <button
                onClick={carousel.next}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
                disabled={carousel.isTransitioning}
              >
                👇
              </button>
            </>
          )}
        </div>

        {/* 인디케이터 */}
        {isHorizontal && (
          <div className={`bg-gray-50 p-4 ${isHorizontal ? 'flex justify-center space-x-2' : 'flex flex-col items-center space-y-2'}`}>
            {carousel.originalItems.map((_, index: number) => (
              <button
                key={index}
                onClick={() => carousel.goToSlide(index)}
                className={`${isHorizontal ? 'h-3 w-3' : 'h-3 w-3'} rounded-full transition-all duration-300 ${
                  carousel.currentRealIndex === index ? 'scale-125 bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                disabled={carousel.isTransitioning}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
