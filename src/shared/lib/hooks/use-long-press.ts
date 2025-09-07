import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  onStart?: () => void;
  onEnd?: () => void;
  delay?: number;
}

export const useLongPress = ({ onStart, onEnd, delay = 200 }: UseLongPressOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressing = useRef(false);

  const start = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      isLongPressing.current = true;
      onStart?.();
    }, delay);
  }, [onStart, delay]);

  const end = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isLongPressing.current) {
      isLongPressing.current = false;
      onEnd?.();
    }
  }, [onEnd]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isLongPressing.current) {
      isLongPressing.current = false;
      onEnd?.();
    }
  }, [onEnd]);

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchCancel: cancel,
  };
};
