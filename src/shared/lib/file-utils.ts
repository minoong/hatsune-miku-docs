export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'] as const;
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/avi', 'video/x-msvideo', 'video/x-matroska'] as const;

export type SupportedImageType = (typeof SUPPORTED_IMAGE_TYPES)[number];
export type SupportedVideoType = (typeof SUPPORTED_VIDEO_TYPES)[number];
export type SupportedMediaType = SupportedImageType | SupportedVideoType;

export const SUPPORTED_MEDIA_TYPES = [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_VIDEO_TYPES] as const;

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export const isImageFile = (file: File): file is File & { type: SupportedImageType } => {
  return SUPPORTED_IMAGE_TYPES.includes(file.type as SupportedImageType);
};

export const isVideoFile = (file: File): file is File & { type: SupportedVideoType } => {
  return SUPPORTED_VIDEO_TYPES.includes(file.type as SupportedVideoType);
};

export const isSupportedMediaFile = (file: File): file is File & { type: SupportedMediaType } => {
  return isImageFile(file) || isVideoFile(file);
};

export const validateFileSize = (file: File): boolean => {
  if (isImageFile(file)) {
    return file.size <= MAX_IMAGE_SIZE;
  }
  if (isVideoFile(file)) {
    return file.size <= MAX_VIDEO_SIZE;
  }
  return file.size <= MAX_FILE_SIZE;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

const isHEICFile = (file: File): boolean => {
  return file.type === 'image/heic' || file.type === 'image/heif';
};

export const convertHEICToJPEG = async (file: File): Promise<File> => {
  if (!isHEICFile(file)) {
    return file;
  }

  try {
    const heic2any = (await import('heic2any')).default;
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    });

    const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

    return new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
      type: 'image/jpeg',
    });
  } catch (error) {
    throw new Error(`Failed to convert HEIC file: ${error}`);
  }
};

export const createFilePreview = async (file: File): Promise<string> => {
  const processedFile = await convertHEICToJPEG(file);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(processedFile);
  });
};

export const generateThumbnail = async (file: File, maxWidth = 300, maxHeight = 300): Promise<string> => {
  if (!isImageFile(file)) {
    throw new Error('File is not an image');
  }

  const processedFile = await convertHEICToJPEG(file);

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      const aspectRatio = width / height;

      let newWidth = maxWidth;
      let newHeight = maxHeight;

      if (aspectRatio > 1) {
        newHeight = maxWidth / aspectRatio;
      } else {
        newWidth = maxHeight * aspectRatio;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx?.drawImage(img, 0, 0, newWidth, newHeight);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to generate thumbnail'));
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(processedFile);
  });
};
