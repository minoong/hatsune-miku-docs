import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ImprovedBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  maxHeight?: string;
  hidePhoto?: boolean;
}

export const ImprovedBottomSheet = ({ isOpen, onClose, children, title, maxHeight = '35vh', hidePhoto = false }: ImprovedBottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (hidePhoto) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      if (hidePhoto) {
        document.body.style.overflow = '';
      }
      return () => clearTimeout(timer);
    }

    return () => {
      if (hidePhoto) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, hidePhoto]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touchY = e.touches[0].clientY;
    setCurrentY(touchY);

    // 위로 드래그할 때는 제한
    if (touchY < startY) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;
    const threshold = 100; // 100px 이상 아래로 드래그하면 닫기

    if (deltaY > threshold) {
      onClose();
    }

    setIsDragging(false);
    setCurrentY(0);
    setStartY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const mouseY = e.clientY;
    setCurrentY(mouseY);

    // 위로 드래그할 때는 제한
    if (mouseY < startY) {
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;
    const threshold = 100;

    if (deltaY > threshold) {
      onClose();
    }

    setIsDragging(false);
    setCurrentY(0);
    setStartY(0);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, currentY, startY]);

  if (!isVisible) return null;

  const dragOffset = isDragging ? Math.max(0, currentY - startY) : 0;

  return (
    <>
      {/* Backdrop - 사진을 가릴 때만 표시 */}
      {hidePhoto && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />
      )}

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed inset-x-0 bottom-0 bg-white rounded-t-[20px] shadow-2xl z-50 transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          maxHeight,
          transform: `translateY(${isOpen ? dragOffset : '100%'}px)`,
        }}
      >
        {/* Handle Bar */}
        <div
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 -m-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </>
  );
};
