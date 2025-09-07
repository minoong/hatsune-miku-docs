export interface PhotoEditSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  exposure: number;
  highlights: number;
  shadows: number;
  temperature: number;
  tint: number;
  vibrance: number;
  clarity: number;
}

export const DEFAULT_SETTINGS: PhotoEditSettings = {
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

export interface EditControl {
  key: keyof PhotoEditSettings;
  label: string;
  min: number;
  max: number;
  step: number;
  category: 'basic' | 'advanced';
}

export const EDIT_CONTROLS: EditControl[] = [
  // 기본 조정
  { key: 'brightness', label: '밝기', min: -100, max: 100, step: 1, category: 'basic' },
  { key: 'contrast', label: '대비', min: -100, max: 100, step: 1, category: 'basic' },
  { key: 'saturation', label: '채도', min: -100, max: 100, step: 1, category: 'basic' },

  // 고급 조정
  { key: 'exposure', label: '노출', min: -200, max: 200, step: 1, category: 'advanced' },
  { key: 'highlights', label: '하이라이트', min: -100, max: 100, step: 1, category: 'advanced' },
  { key: 'shadows', label: '그림자', min: -100, max: 100, step: 1, category: 'advanced' },
  { key: 'temperature', label: '색온도', min: -100, max: 100, step: 1, category: 'advanced' },
  { key: 'tint', label: '틴트', min: -100, max: 100, step: 1, category: 'advanced' },
  { key: 'vibrance', label: '생동감', min: -100, max: 100, step: 1, category: 'advanced' },
  { key: 'clarity', label: '선명도', min: -100, max: 100, step: 1, category: 'advanced' },
];
