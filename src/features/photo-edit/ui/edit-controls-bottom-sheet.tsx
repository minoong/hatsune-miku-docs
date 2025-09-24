import { useState } from 'react';

import { Slider } from '~/shared/ui/slider/slider';
import { BottomSheet } from '~/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '~/shared/ui/button/button';
import { EDIT_CONTROLS, type PhotoEditSettings } from '~/features/photo-edit/model/types';

interface EditControlsBottomSheetProps {
  isOpen: boolean;
  settings: PhotoEditSettings;
  onSettingsChange: (settings: PhotoEditSettings) => void;
  onClose: () => void;
}

export const EditControlsBottomSheet = ({ isOpen, settings, onSettingsChange, onClose }: EditControlsBottomSheetProps) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

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

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="조정" snapPoints={[0.5, 0.85]} initialSnap={0}>
      <div className="flex h-full flex-col">
        {/* 탭과 초기화 버튼 */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('basic')}
              className={`border-b-2 py-2 text-sm font-medium transition-colors ${
                activeTab === 'basic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
              }`}
            >
              기본
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`border-b-2 py-2 text-sm font-medium transition-colors ${
                activeTab === 'advanced' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
              }`}
            >
              고급
            </button>
          </div>

          {hasChanges && (
            <Button variant="ghost" onClick={handleReset} className="text-sm">
              초기화
            </Button>
          )}
        </div>

        {/* 컨트롤 */}
        <div className="flex-1 space-y-6 overflow-auto p-4">
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
    </BottomSheet>
  );
};
