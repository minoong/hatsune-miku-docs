import { useState } from 'react';

import { Slider } from '~/shared/ui/slider/slider';
import { Button } from '~/shared/ui/button/button';
import { EDIT_CONTROLS, type PhotoEditSettings } from '~/features/photo-edit/model/types';

interface EditControlsProps {
  settings: PhotoEditSettings;
  onSettingsChange: (settings: PhotoEditSettings) => void;
  onClose: () => void;
}

export const EditControls = ({ settings, onSettingsChange, onClose }: EditControlsProps) => {
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
    <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[70vh] flex-col rounded-t-3xl bg-white shadow-2xl">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={onClose} className="p-2">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Button>
          <h2 className="text-lg font-semibold text-gray-900">편집</h2>
        </div>

        {hasChanges && (
          <Button variant="ghost" onClick={handleReset} className="text-sm">
            초기화
          </Button>
        )}
      </div>

      {/* 탭 */}
      <div className="border-b border-gray-200 px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('basic')}
            className={`border-b-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'basic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            기본
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`border-b-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'advanced' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            고급
          </button>
        </div>
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
  );
};
