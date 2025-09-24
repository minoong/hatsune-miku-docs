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
      className={`fixed left-1/2 -translate-x-1/2 ${positionClasses[position]} pointer-events-none z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="rounded-lg bg-black/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">{message}</div>
    </div>
  );
};
