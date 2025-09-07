import type { PhotoEditSettings } from '../model/types';

export const generateCSSFilter = (settings: PhotoEditSettings): string => {
  const filters = [];

  // 밝기 (0-200%, 기본 100%)
  const brightness = Math.max(0, 100 + settings.brightness);
  if (brightness !== 100) {
    filters.push(`brightness(${brightness}%)`);
  }

  // 대비 (0-200%, 기본 100%)
  const contrast = Math.max(0, 100 + settings.contrast);
  if (contrast !== 100) {
    filters.push(`contrast(${contrast}%)`);
  }

  // 채도 (0-200%, 기본 100%)
  const saturation = Math.max(0, 100 + settings.saturation);
  if (saturation !== 100) {
    filters.push(`saturate(${saturation}%)`);
  }

  // 색상 회전 (색온도 근사치)
  if (settings.temperature !== 0) {
    const hue = settings.temperature * 0.5; // -50 to 50 degrees
    filters.push(`hue-rotate(${hue}deg)`);
  }

  // 세피아 효과 (따뜻한 색온도)
  if (settings.temperature > 0) {
    const sepia = Math.min(30, settings.temperature * 0.3);
    filters.push(`sepia(${sepia}%)`);
  }

  return filters.join(' ');
};

export const generateCanvasFilter = (canvas: HTMLCanvasElement, originalImageData: ImageData, settings: PhotoEditSettings): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imageData = ctx.createImageData(originalImageData);
  const data = imageData.data;
  const original = originalImageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = original[i];
    let g = original[i + 1];
    let b = original[i + 2];
    const a = original[i + 3];

    // 밝기 조정
    if (settings.brightness !== 0) {
      const brightnessFactor = settings.brightness * 2.55; // -255 to 255
      r = Math.max(0, Math.min(255, r + brightnessFactor));
      g = Math.max(0, Math.min(255, g + brightnessFactor));
      b = Math.max(0, Math.min(255, b + brightnessFactor));
    }

    // 대비 조정
    if (settings.contrast !== 0) {
      const contrastFactor = (259 * (settings.contrast + 255)) / (255 * (259 - settings.contrast));
      r = Math.max(0, Math.min(255, contrastFactor * (r - 128) + 128));
      g = Math.max(0, Math.min(255, contrastFactor * (g - 128) + 128));
      b = Math.max(0, Math.min(255, contrastFactor * (b - 128) + 128));
    }

    // 채도 조정
    if (settings.saturation !== 0) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      const saturationFactor = (settings.saturation + 100) / 100;

      r = Math.max(0, Math.min(255, gray + (r - gray) * saturationFactor));
      g = Math.max(0, Math.min(255, gray + (g - gray) * saturationFactor));
      b = Math.max(0, Math.min(255, gray + (b - gray) * saturationFactor));
    }

    // 색온도 조정 (간단한 색상 이동)
    if (settings.temperature !== 0) {
      const tempFactor = settings.temperature / 100;
      if (tempFactor > 0) {
        // 따뜻하게 (더 많은 빨강/노랑)
        r = Math.max(0, Math.min(255, r + tempFactor * 30));
        g = Math.max(0, Math.min(255, g + tempFactor * 15));
      } else {
        // 차갑게 (더 많은 파랑)
        b = Math.max(0, Math.min(255, b + Math.abs(tempFactor) * 30));
      }
    }

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
  }

  ctx.putImageData(imageData, 0, 0);
};
