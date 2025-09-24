import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Slider } from '~/shared/ui/slider/slider';
import { Button } from '~/shared/ui/button/button';
import { EDIT_CONTROLS, type PhotoEditSettings } from '~/features/photo-edit/model/types';

interface CompactEditControlsBottomSheetProps {
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
  activeColor: string;
}

const CATEGORIES: Category[] = [
  {
    key: 'basic',
    label: '기본',
    color: 'bg-gray-100 text-gray-600',
    activeColor: 'bg-blue-100 text-blue-700',
  },
  {
    key: 'advanced',
    label: '고급',
    color: 'bg-gray-100 text-gray-600',
    activeColor: 'bg-purple-100 text-purple-700',
  },
];

export const CompactEditControlsBottomSheet = ({ isOpen, settings, onSettingsChange, onClose }: CompactEditControlsBottomSheetProps) => {
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
    if (activeTab === category.key) {
      return category.activeColor + ' font-medium';
    }
    return category.color + ' hover:bg-gray-200';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white shadow-2xl"
            style={{ height: '35vh' }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 1 }}
            onDragEnd={(_, info) => {
              if (info.velocity.y > 500 || info.offset.y > 100) {
                onClose();
              }
            }}
          >
            {/* Drag Handle */}
            <div className="flex cursor-grab justify-center pt-3 pb-1 active:cursor-grabbing">
              <div className="h-1 w-8 rounded-full bg-gray-300" />
            </div>

            <div className="flex h-full flex-col pb-6">
              {/* 헤더 - 컴팩트하게 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex cursor-grab items-center justify-between border-b border-gray-200 px-4 py-2 active:cursor-grabbing"
              >
                <h2 className="text-lg font-semibold text-gray-900">조정</h2>
                {hasChanges && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                    <Button variant="ghost" onClick={handleReset} className="px-2 py-1 text-sm">
                      초기화
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* 카테고리 탭 - 컴팩트하게 */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="border-b border-gray-100 px-4 py-2"
              >
                <div className="flex space-x-2">
                  {CATEGORIES.map((category, index) => (
                    <motion.button
                      key={category.key}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(category.key)}
                      className={`rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-all duration-200 ${getCategoryStyle(category)}`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* 컨트롤 - 메인 영역, 스크롤 가능 */}
              <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-3">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="space-y-3">
                  {filteredControls.map((control, index) => (
                    <motion.div key={control.key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.05 }}>
                      <Slider
                        label={control.label}
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        value={settings[control.key]}
                        onChange={(e) => handleSliderChange(control.key, Number(e.target.value))}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
