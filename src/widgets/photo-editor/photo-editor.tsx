import { useState, useEffect, useRef } from 'react';

import type { FilmRecipe } from '~/entities/film-recipe/model/types';
import type { PhotoEditSettings } from '~/features/photo-edit/model/types';
import { DEFAULT_SETTINGS } from '~/features/photo-edit/model/types';
import { CompactFilmRecipeBottomSheet } from '~/features/film-recipe/ui/compact-film-recipe-bottom-sheet';
import { CompactEditControlsBottomSheet } from '~/features/photo-edit/ui/compact-edit-controls-bottom-sheet';
import { generateCSSFilter } from '~/features/photo-edit/lib/apply-filters';
import { Button } from '~/shared/ui/button/button';
import { Toast } from '~/shared/ui/toast/toast';
import { useLongPress } from '~/shared/lib/hooks/use-long-press';

interface PhotoEditorProps {
  imageData: string;
  onSave: (editedImage: string) => void;
  onBack: () => void;
}

export const PhotoEditor = ({ imageData, onSave, onBack }: PhotoEditorProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<FilmRecipe | null>(null);
  const [editSettings, setEditSettings] = useState<PhotoEditSettings>(DEFAULT_SETTINGS);
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [showEditControls, setShowEditControls] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 필름 레시피 적용
  useEffect(() => {
    if (selectedRecipe) {
      // 레시피 설정을 100배 스케일로 변환 (0.1 -> 10)
      const recipeSettings: PhotoEditSettings = {
        brightness: Math.round(selectedRecipe.settings.exposure * 100),
        contrast: Math.round(selectedRecipe.settings.contrast * 100),
        saturation: Math.round(selectedRecipe.settings.saturation * 100),
        exposure: Math.round(selectedRecipe.settings.exposure * 100),
        highlights: Math.round(selectedRecipe.settings.highlights * 100),
        shadows: Math.round(selectedRecipe.settings.shadows * 100),
        temperature: Math.round(selectedRecipe.settings.temperature * 100),
        tint: Math.round(selectedRecipe.settings.tint * 100),
        vibrance: Math.round(selectedRecipe.settings.vibrance * 100),
        clarity: Math.round(selectedRecipe.settings.clarity * 100),
      };
      setEditSettings(recipeSettings);
    }
  }, [selectedRecipe]);

  // CSS 필터 생성
  const cssFilter = generateCSSFilter(editSettings);

  // 원본 비교를 위한 필터 적용 여부 체크
  const hasChanges = selectedRecipe !== null || Object.values(editSettings).some((value) => value !== 0);

  // 롱프레스 핸들러
  const longPressProps = useLongPress({
    onStart: () => {
      if (hasChanges) {
        setShowOriginal(true);
      }
    },
    onEnd: () => {
      setShowOriginal(false);
    },
    delay: 200,
  });

  const handleSave = async () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기를 이미지 크기로 설정
    canvas.width = imageRef.current.naturalWidth;
    canvas.height = imageRef.current.naturalHeight;

    // 필터 적용하여 이미지 그리기
    ctx.filter = cssFilter;
    ctx.drawImage(imageRef.current, 0, 0);

    // 결과를 데이터 URL로 변환
    const editedImage = canvas.toDataURL('image/jpeg', 0.9);
    onSave(editedImage);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 bg-black/50 text-white">
        <Button variant="ghost" onClick={onBack} className="text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        <h1 className="text-lg font-medium">편집</h1>

        <Button variant="ghost" onClick={handleSave} className="text-white font-medium">
          저장
        </Button>
      </div>

      {/* 이미지 뷰 */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <div className="relative max-w-full max-h-full">
          <img
            ref={imageRef}
            src={imageData}
            alt="편집할 사진"
            className="max-w-full max-h-full object-contain cursor-pointer"
            style={{ filter: showOriginal ? 'none' : cssFilter }}
            crossOrigin="anonymous"
            {...longPressProps}
          />

          {/* 원본 비교 안내 메시지 (변경사항이 있을 때만) */}
          {hasChanges && !showOriginal && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
              길게 눌러서 원본 비교
            </div>
          )}
        </div>
      </div>

      {/* 하단 컨트롤 */}
      <div className="flex flex-col h-[8.5rem] bg-black/80 p-4">
        <div className="flex justify-center space-x-6">
          {/* 필름 레시피 버튼 */}
          <button onClick={() => setShowRecipeSelector(true)} className="flex flex-col items-center space-y-1 text-white">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedRecipe ? 'bg-blue-500' : 'bg-white/20'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M9 8h6M9 12h6m-3 4h3"
                />
              </svg>
            </div>
            <span className="text-xs">필름</span>
          </button>

          {/* 편집 컨트롤 버튼 */}
          <button onClick={() => setShowEditControls(true)} className="flex flex-col items-center space-y-1 text-white">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                Object.values(editSettings).some((v) => v !== 0) ? 'bg-blue-500' : 'bg-white/20'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
            </div>
            <span className="text-xs">조정</span>
          </button>
        </div>

        {/* 선택된 필름 레시피 표시 */}
        {selectedRecipe && (
          <div className="mt-3 text-center">
            <span className="text-white/80 text-sm">
              {selectedRecipe.brand.toUpperCase()} {selectedRecipe.name}
            </span>
          </div>
        )}
      </div>

      {/* 숨겨진 캔버스 */}
      <canvas ref={canvasRef} className="hidden" />

      {/* 바텀시트들 */}
      <CompactFilmRecipeBottomSheet
        isOpen={showRecipeSelector}
        selectedRecipe={selectedRecipe}
        onRecipeSelect={(recipe) => {
          setSelectedRecipe(recipe);
        }}
        onClose={() => setShowRecipeSelector(false)}
      />

      <CompactEditControlsBottomSheet
        isOpen={showEditControls}
        settings={editSettings}
        onSettingsChange={setEditSettings}
        onClose={() => setShowEditControls(false)}
      />

      {/* 원본 비교 토스트 */}
      <Toast message="원본" isVisible={showOriginal} position="center" />
    </div>
  );
};
