import { useState } from 'react';
import { PhotoSelector } from '~/features/photo-select/ui/photo-selector';
import { PhotoEditor } from '~/widgets/photo-editor/photo-editor';

export const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [, setEditedImage] = useState<string | null>(null);

  const handlePhotoSelect = (imageData: string) => {
    setSelectedImage(imageData);
    setEditedImage(null);
  };

  const handlePhotoSave = (editedImageData: string) => {
    setEditedImage(editedImageData);
    // 실제 앱에서는 여기서 이미지를 저장하거나 다운로드할 수 있습니다

    // 브라우저 다운로드 트리거
    const link = document.createElement('a');
    link.href = editedImageData;
    link.download = `edited-photo-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 편집 완료 후 처음으로 돌아가기
    setSelectedImage(null);
  };

  const handleBackToSelection = () => {
    setSelectedImage(null);
    setEditedImage(null);
  };

  // 사진 선택 화면
  if (!selectedImage) {
    return <PhotoSelector onPhotoSelect={handlePhotoSelect} />;
  }

  // 사진 편집 화면
  return <PhotoEditor imageData={selectedImage} onSave={handlePhotoSave} onBack={handleBackToSelection} />;
};
