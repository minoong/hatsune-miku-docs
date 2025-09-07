import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  position?: 'top' | 'center' | 'bottom';
  duration?: number;
}

export const Toast = ({ message, isVisible, position = 'center', duration = 2000 }: ToastProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const positionClasses = {
    top: 'top-20',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-20',
  };

  if (!show) return null;

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 ${positionClasses[position]} z-[100] transition-opacity duration-300 pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm font-medium">{message}</div>
    </div>
  );
};
