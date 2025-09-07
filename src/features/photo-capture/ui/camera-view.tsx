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
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-between items-center p-4 bg-black/50 absolute top-0 left-0 right-0 z-10">
        <Button variant="ghost" onClick={onClose} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
        <h1 className="text-white text-lg font-medium">사진 촬영</h1>
        <div className="w-10 h-10" /> {/* 여백 */}
      </div>

      {/* 카메라 뷰 */}
      <div className="flex-1 relative overflow-hidden">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />

        {/* 가이드라인 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 border-2 border-white/30 rounded-lg" />
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="bg-black/50 p-6 flex justify-center">
        <Button onClick={handleCapture} className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-gray-300 bg-white" />
        </Button>
      </div>

      {/* 숨겨진 캔버스 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
