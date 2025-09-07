import { useCallback, useRef, useState } from 'react';

export interface MediaCaptureHook {
  isSupported: boolean;
  isCameraActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => string | null;
  selectFromGallery: () => Promise<string | null>;
}

export const useMediaCapture = (): MediaCaptureHook => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  const startCamera = useCallback(async () => {
    if (!isSupported) {
      throw new Error('카메라를 지원하지 않는 브라우저입니다.');
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // 후면 카메라 우선
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (error) {
      console.error('카메라 접근 실패:', error);
      throw error;
    }
  }, [isSupported]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', 0.9);
  }, []);

  const selectFromGallery = useCallback(() => {
    return new Promise<string | null>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = false;

      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve((e.target?.result as string) || null);
          };
          reader.readAsDataURL(file);
        } else {
          resolve(null);
        }
      };

      input.click();
    });
  }, []);

  return {
    isSupported,
    isCameraActive,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capturePhoto,
    selectFromGallery,
  };
};
