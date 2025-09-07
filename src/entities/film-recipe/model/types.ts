export interface FilmRecipe {
  id: string;
  name: string;
  brand: 'fuji' | 'kodak';
  description: string;
  preview: string;
  settings: {
    exposure: number;
    contrast: number;
    saturation: number;
    highlights: number;
    shadows: number;
    temperature: number;
    tint: number;
    vibrance: number;
    clarity: number;
  };
}

export const FILM_RECIPES: FilmRecipe[] = [
  {
    id: 'fuji-classic-chrome',
    name: 'Classic Chrome',
    brand: 'fuji',
    description: '차분하고 클래식한 색감',
    preview: '#8B7355',
    settings: {
      exposure: 0.2,
      contrast: 0.3,
      saturation: -0.2,
      highlights: -0.3,
      shadows: 0.1,
      temperature: -0.1,
      tint: 0,
      vibrance: -0.1,
      clarity: 0.2,
    },
  },
  {
    id: 'fuji-velvia',
    name: 'Velvia',
    brand: 'fuji',
    description: '선명하고 화려한 색감',
    preview: '#E74C3C',
    settings: {
      exposure: 0.1,
      contrast: 0.4,
      saturation: 0.5,
      highlights: -0.2,
      shadows: -0.1,
      temperature: 0.1,
      tint: 0.1,
      vibrance: 0.4,
      clarity: 0.3,
    },
  },
  {
    id: 'fuji-astia',
    name: 'Astia',
    brand: 'fuji',
    description: '부드러운 피부톤',
    preview: '#F8C471',
    settings: {
      exposure: 0.15,
      contrast: 0.1,
      saturation: 0.1,
      highlights: -0.1,
      shadows: 0.2,
      temperature: 0.05,
      tint: -0.05,
      vibrance: 0.2,
      clarity: 0,
    },
  },
  {
    id: 'fuji-provia',
    name: 'Provia',
    brand: 'fuji',
    description: '자연스러운 색재현',
    preview: '#5DADE2',
    settings: {
      exposure: 0,
      contrast: 0.2,
      saturation: 0,
      highlights: -0.1,
      shadows: 0,
      temperature: 0,
      tint: 0,
      vibrance: 0.1,
      clarity: 0.1,
    },
  },
  {
    id: 'kodak-portra400',
    name: 'Portra 400',
    brand: 'kodak',
    description: '따뜻한 피부톤',
    preview: '#F4A460',
    settings: {
      exposure: 0.3,
      contrast: 0.1,
      saturation: 0.2,
      highlights: -0.2,
      shadows: 0.3,
      temperature: 0.2,
      tint: -0.1,
      vibrance: 0.1,
      clarity: -0.1,
    },
  },
  {
    id: 'kodak-ektar',
    name: 'Ektar 100',
    brand: 'kodak',
    description: '극도로 세밀한 입자',
    preview: '#2E8B57',
    settings: {
      exposure: 0,
      contrast: 0.4,
      saturation: 0.4,
      highlights: -0.1,
      shadows: -0.2,
      temperature: -0.05,
      tint: 0,
      vibrance: 0.3,
      clarity: 0.4,
    },
  },
  {
    id: 'kodak-gold',
    name: 'Gold 200',
    brand: 'kodak',
    description: '따뜻하고 빈티지한 색감',
    preview: '#DAA520',
    settings: {
      exposure: 0.2,
      contrast: 0.2,
      saturation: 0.3,
      highlights: -0.3,
      shadows: 0.2,
      temperature: 0.3,
      tint: 0.1,
      vibrance: 0.2,
      clarity: -0.2,
    },
  },
  {
    id: 'kodak-ultramax',
    name: 'UltraMax 400',
    brand: 'kodak',
    description: '생생한 일상 색감',
    preview: '#FF6347',
    settings: {
      exposure: 0.1,
      contrast: 0.3,
      saturation: 0.35,
      highlights: -0.2,
      shadows: 0.1,
      temperature: 0.1,
      tint: 0,
      vibrance: 0.25,
      clarity: 0.1,
    },
  },
];
