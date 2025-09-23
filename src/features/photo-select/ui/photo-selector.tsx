import { useState } from 'react';

import { useMediaCapture } from '~/shared/lib/hooks/use-media-capture';
import { CameraView } from '~/features/photo-capture/ui/camera-view';
import { Button } from '~/shared/ui/button/button';

interface PhotoSelectorProps {
  onPhotoSelect: (photo: string) => void;
}

export const PhotoSelector = ({ onPhotoSelect }: PhotoSelectorProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const mediaCapture = useMediaCapture();

  const handleTakePhoto = () => {
    console.log('카메라 촬영 버튼 클릭됨');

    // 직접 파일 input 생성 (동기적으로 사용자 제스처 내에서)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;

    // iOS에서 카메라 직접 접근 시도
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      input.capture = 'environment';
    }

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            onPhotoSelect(result);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    // 사용자 제스처 내에서 바로 클릭
    input.click();
  };

  const handleSelectFromGallery = async () => {
    try {
      const photo = await mediaCapture.selectFromGallery();
      if (photo) {
        onPhotoSelect(photo);
      }
    } catch (error) {
      console.error('사진 선택 실패:', error);
    }
  };

  const handlePhotoCapture = (photo: string) => {
    mediaCapture.stopCamera();
    setShowCamera(false);
    onPhotoSelect(photo);
  };

  const handleCloseCamera = () => {
    mediaCapture.stopCamera();
    setShowCamera(false);
  };

  if (showCamera) {
    return <CameraView mediaCapture={mediaCapture} onPhotoCapture={handlePhotoCapture} onClose={handleCloseCamera} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">사진을 선택하세요</h1>
          <p className="text-gray-600">카메라로 촬영하거나 갤러리에서 선택할 수 있습니다</p>
        </div>

        <div className="space-y-4">
          {mediaCapture.isSupported && (
            <Button onClick={handleTakePhoto} fullWidth size="lg" className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              카메라로 촬영
            </Button>
          )}

          <Button onClick={handleSelectFromGallery} variant="secondary" fullWidth size="lg" className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            갤러리에서 선택
          </Button>
        </div>
      </div>
    </div>
  );
};
