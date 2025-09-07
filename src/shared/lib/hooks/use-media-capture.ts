import { useCallback, useRef, useState } from 'react';

export interface MediaCaptureHook {
  isSupported: boolean;
  isCameraActive: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => string | null;
  selectFromGallery: () => Promise<string | null>;
  captureWithNativeCamera: () => Promise<string | null>;
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
      console.log('카메라 권한 요청 중...');

      // iOS Safari를 위한 단계적 제약조건 시도
      let mediaStream: MediaStream;

      // 1단계: 기본 후면 카메라
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
      } catch (firstError) {
        console.warn('후면 카메라 실패, 전면 카메라 시도:', firstError);

        // 2단계: 전면 카메라
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
          });
        } catch (secondError) {
          console.warn('전면 카메라 실패, 기본 설정 시도:', secondError);

          // 3단계: 최소 제약조건
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
        }
      }

      if (videoRef.current) {
        const video = videoRef.current;

        // iOS Safari에서 안전한 스트림 설정
        video.srcObject = mediaStream;
        video.setAttribute('playsinline', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');

        // 메타데이터 로드 대기
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('비디오 메타데이터 로드 타임아웃'));
          }, 5000);

          video.onloadedmetadata = () => {
            clearTimeout(timeout);
            console.log('비디오 메타데이터 로드 완료');
            resolve();
          };
        });

        // 명시적 재생 시도
        try {
          await video.play();
          console.log('비디오 재생 시작');
        } catch (playError) {
          console.warn('자동 재생 실패:', playError);
          // 사용자 인터랙션이 필요한 경우를 위해 이벤트 리스너 추가
          const playOnInteraction = () => {
            video.play().catch(console.warn);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
          };
          document.addEventListener('touchstart', playOnInteraction);
          document.addEventListener('click', playOnInteraction);
        }
      }

      setStream(mediaStream);
      setIsCameraActive(true);
      console.log('카메라 시작 완료');
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
      input.capture = 'environment'; // iOS에서 직접 카메라 촬영
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

  // 네이티브 파일 선택 (카메라 포함)
  const captureWithNativeCamera = useCallback(() => {
    console.log('captureWithNativeCamera 함수 실행됨');
    return new Promise<string | null>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = false;

      // DOM에 추가해서 클릭 이벤트가 제대로 작동하도록 함
      input.style.position = 'fixed';
      input.style.top = '-1000px';
      input.style.left = '-1000px';
      input.style.visibility = 'hidden';
      document.body.appendChild(input);

      console.log('input 요소 생성 및 DOM에 추가됨');

      input.onchange = (event) => {
        console.log('input.onchange 이벤트 발생');
        const file = (event.target as HTMLInputElement).files?.[0];
        console.log('선택된 파일:', file);

        // 입력 요소 정리
        document.body.removeChild(input);

        if (file) {
          console.log('파일 정보:', {
            name: file.name,
            size: file.size,
            type: file.type,
          });

          const reader = new FileReader();
          reader.onload = (e) => {
            console.log('FileReader 로드 완료');
            resolve((e.target?.result as string) || null);
          };
          reader.onerror = (e) => {
            console.error('FileReader 에러:', e);
            resolve(null);
          };
          reader.readAsDataURL(file);
        } else {
          console.log('파일이 선택되지 않음');
          resolve(null);
        }
      };

      // 취소 시 정리
      input.oncancel = () => {
        console.log('파일 선택 취소됨');
        document.body.removeChild(input);
        resolve(null);
      };

      // 포커스 변경 시 정리 (Safari에서 취소 감지)
      const cleanup = () => {
        setTimeout(() => {
          if (document.body.contains(input)) {
            console.log('파일 선택 타임아웃, 정리');
            document.body.removeChild(input);
            resolve(null);
          }
        }, 100);
      };

      window.addEventListener('focus', cleanup, { once: true });

      console.log('input.click() 실행 시도');
      try {
        input.click();
        console.log('input.click() 실행 완료');
      } catch (error) {
        console.error('input.click() 실행 실패:', error);
        document.body.removeChild(input);
        resolve(null);
      }
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
    captureWithNativeCamera,
  };
};
