import { useState } from 'react';
import { EDIT_CONTROLS, type PhotoEditSettings } from '../model/types';
import { Slider } from '~/shared/ui/slider/slider';
import { ImprovedBottomSheet } from '~/shared/ui/bottom-sheet/improved-bottom-sheet';
import { Button } from '~/shared/ui/button/button';

interface ImprovedEditControlsBottomSheetProps {
  isOpen: boolean;
  settings: PhotoEditSettings;
  onSettingsChange: (settings: PhotoEditSettings) => void;
  onClose: () => void;
}

type CategoryType = 'basic' | 'advanced';

interface Category {
  key: CategoryType;
  label: string;
  color: string;
}

const CATEGORIES: Category[] = [
  { key: 'basic', label: '기본', color: 'bg-blue-100 text-blue-800' },
  { key: 'advanced', label: '고급', color: 'bg-purple-100 text-purple-800' },
];

export const ImprovedEditControlsBottomSheet = ({ isOpen, settings, onSettingsChange, onClose }: ImprovedEditControlsBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('basic');

  const filteredControls = EDIT_CONTROLS.filter((control) => control.category === activeTab);

  const handleSliderChange = (key: keyof PhotoEditSettings, value: number) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const handleReset = () => {
    const resetSettings: PhotoEditSettings = {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      exposure: 0,
      highlights: 0,
      shadows: 0,
      temperature: 0,
      tint: 0,
      vibrance: 0,
      clarity: 0,
    };
    onSettingsChange(resetSettings);
  };

  const hasChanges = Object.values(settings).some((value) => value !== 0);

  const getCategoryStyle = (category: Category) => {
    const isActive = activeTab === category.key;

    if (isActive) {
      return `${category.color} font-medium`;
    }
    return 'bg-gray-50 text-gray-600 hover:bg-gray-100';
  };

  return (
    <ImprovedBottomSheet isOpen={isOpen} onClose={onClose} maxHeight="75vh">
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">조정</h2>
          {hasChanges && (
            <Button variant="ghost" onClick={handleReset} className="text-sm">
              초기화
            </Button>
          )}
        </div>

        {/* 카테고리 가로 스크롤 */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex space-x-2">
            {CATEGORIES.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveTab(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${getCategoryStyle(category)}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 컨트롤 */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {filteredControls.map((control) => (
            <Slider
              key={control.key}
              label={control.label}
              min={control.min}
              max={control.max}
              step={control.step}
              value={settings[control.key]}
              onChange={(e) => handleSliderChange(control.key, Number(e.target.value))}
            />
          ))}
        </div>
      </div>
    </ImprovedBottomSheet>
  );
};
