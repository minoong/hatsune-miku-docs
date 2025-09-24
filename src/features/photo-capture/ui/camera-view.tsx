import type { MediaCaptureHook } from '~/shared/lib/hooks/use-media-capture';
import { Button } from '~/shared/ui/button/button';

interface CameraViewProps {
  mediaCapture: MediaCaptureHook;
  onPhotoCapture: (photo: string) => void;
  onClose: () => void;
}

export const CameraView = ({ mediaCapture, onPhotoCapture, onClose }: CameraViewProps) => {
  const { videoRef, canvasRef, capturePhoto } = mediaCapture;

  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) {
      onPhotoCapture(photo);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* 헤더 */}
      <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-black/50 p-4">
        <Button variant="ghost" onClick={onClose} className="text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
        <h1 className="text-lg font-medium text-white">사진 촬영</h1>
        <div className="h-10 w-10" /> {/* 여백 */}
      </div>

      {/* 카메라 뷰 */}
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          playsInline
          muted
          controls={false}
          webkit-playsinline=""
          onCanPlay={(e) => {
            // iOS Safari를 위한 재생 보장
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch((err) => {
                console.warn('비디오 재생 실패:', err);
                // 추가 사용자 인터랙션 대기
              });
            }
          }}
          onLoadedData={(e) => {
            // 데이터 로드 완료 시에도 재생 시도
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(console.warn);
            }
          }}
        />

        {/* 가이드라인 */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-72 w-72 rounded-lg border-2 border-white/30" />
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="flex justify-center bg-black/50 p-6">
        <Button onClick={handleCapture} className="flex h-20 w-20 items-center justify-center rounded-full bg-white hover:bg-gray-100 active:bg-gray-200">
          <div className="h-16 w-16 rounded-full border-4 border-gray-300 bg-white" />
        </Button>
      </div>

      {/* 숨겨진 캔버스 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
