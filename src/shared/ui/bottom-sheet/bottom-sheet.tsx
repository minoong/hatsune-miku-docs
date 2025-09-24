import { useEffect, useRef, useState, type ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  snapPoints?: number[];
  initialSnap?: number;
}

export const BottomSheet = ({ isOpen, onClose, children, title, snapPoints = [0.4, 0.8], initialSnap = 0 }: BottomSheetProps) => {
  const [currentSnap, setCurrentSnap] = useState(initialSnap);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const snapPoint = snapPoints[currentSnap];
  const translateY = isDragging ? Math.max(0, currentY - startY) : 0;

  const finalTranslateY = `${(1 - snapPoint) * 100 + (translateY / window.innerHeight) * 100}%`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;
    const threshold = window.innerHeight * 0.1;

    if (deltaY > threshold) {
      if (currentSnap < snapPoints.length - 1) {
        setCurrentSnap(currentSnap + 1);
      } else {
        onClose();
      }
    } else if (deltaY < -threshold) {
      if (currentSnap > 0) {
        setCurrentSnap(currentSnap - 1);
      }
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
    setCurrentY(e.clientY);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const deltaY = currentY - startY;
    const threshold = window.innerHeight * 0.1;

    if (deltaY > threshold) {
      if (currentSnap < snapPoints.length - 1) {
        setCurrentSnap(currentSnap + 1);
      } else {
        onClose();
      }
    } else if (deltaY < -threshold) {
      if (currentSnap > 0) {
        setCurrentSnap(currentSnap - 1);
      }
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
  }, [isDragging, currentY, startY, currentSnap]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-[20px] bg-white shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${finalTranslateY})`,
          height: '100vh',
          paddingTop: '20px',
        }}
      >
        {/* Handle Bar */}
        <div
          className="flex cursor-grab justify-center pb-4 active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 px-4 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
