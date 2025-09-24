import { parse } from 'exifr';

export interface ExifData {
  make?: string;
  model?: string;
  datetime?: string | Date;
  orientation?: number;
  xResolution?: number;
  yResolution?: number;
  resolutionUnit?: number;
  software?: string;
  exposureTime?: number;
  fNumber?: number;
  iso?: number;
  focalLength?: number;
  flash?: number;
  whiteBalance?: number;
  gpsLatitude?: number;
  gpsLongitude?: number;
  gpsAltitude?: number;
  imageWidth?: number;
  imageHeight?: number;
}

export const extractExifData = async (file: File): Promise<ExifData> => {
  try {
    const rawExif = await parse(file, {
      tiff: true,
      exif: true,
      gps: true,
      interop: true,
      ifd1: true,
    });

    if (!rawExif) {
      return {};
    }

    // Safely extract datetime
    let datetime = rawExif.DateTime || rawExif.DateTimeOriginal || rawExif.DateTimeDigitized;
    if (datetime && typeof datetime !== 'string' && !(datetime instanceof Date)) {
      datetime = String(datetime);
    }

    const exifData: ExifData = {
      make: rawExif.Make,
      model: rawExif.Model,
      datetime,
      orientation: rawExif.Orientation,
      xResolution: rawExif.XResolution,
      yResolution: rawExif.YResolution,
      resolutionUnit: rawExif.ResolutionUnit,
      software: rawExif.Software,
      exposureTime: rawExif.ExposureTime,
      fNumber: rawExif.FNumber,
      iso: rawExif.ISO || rawExif.ISOSpeedRatings,
      focalLength: rawExif.FocalLength,
      flash: rawExif.Flash,
      whiteBalance: rawExif.WhiteBalance,
      gpsLatitude: rawExif.latitude,
      gpsLongitude: rawExif.longitude,
      gpsAltitude: rawExif.GPSAltitude,
      imageWidth: rawExif.ExifImageWidth || rawExif.PixelXDimension,
      imageHeight: rawExif.ExifImageHeight || rawExif.PixelYDimension,
    };

    return exifData;
  } catch (_) {
    return {};
  }
};

export const formatExposureTime = (exposureTime?: number): string => {
  if (!exposureTime) return 'N/A';

  if (exposureTime >= 1) {
    return `${exposureTime}s`;
  }

  const fraction = 1 / exposureTime;
  return `1/${Math.round(fraction)}s`;
};

export const formatFNumber = (fNumber?: number): string => {
  if (!fNumber) return 'N/A';
  return `f/${fNumber.toFixed(1)}`;
};

export const formatFocalLength = (focalLength?: number): string => {
  if (!focalLength) return 'N/A';
  return `${Math.round(focalLength)}mm`;
};

export const formatISO = (iso?: number): string => {
  if (!iso) return 'N/A';
  return `ISO ${iso}`;
};

export const formatDateTime = (datetime?: string | Date): string => {
  if (!datetime) return 'N/A';

  try {
    // If it's already a Date object
    if (datetime instanceof Date) {
      return datetime.toLocaleString();
    }

    // If it's a string, handle different formats
    if (typeof datetime === 'string') {
      // EXIF format: "YYYY:MM:DD HH:MM:SS"
      if (datetime.includes(':') && datetime.includes(' ')) {
        const [date, time] = datetime.split(' ');
        const [year, month, day] = date.split(':');
        const formattedDate = new Date(`${year}-${month}-${day} ${time}`);

        if (!isNaN(formattedDate.getTime())) {
          return formattedDate.toLocaleString();
        }
      }

      // Try to parse as regular date string
      const parsedDate = new Date(datetime);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleString();
      }
    }

    // If all parsing fails, return the original value as string
    return String(datetime);
  } catch (error) {
    console.warn('Failed to format datetime:', datetime, error);
    return String(datetime) || 'N/A';
  }
};

export const hasGPSData = (exifData: ExifData): boolean => {
  return !!(exifData.gpsLatitude && exifData.gpsLongitude);
};

export const formatGPSCoordinates = (exifData: ExifData): string | null => {
  if (!hasGPSData(exifData)) return null;

  const lat = exifData.gpsLatitude!;
  const lng = exifData.gpsLongitude!;

  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

export const getDeviceInfo = (exifData: ExifData): string => {
  const { make, model } = exifData;

  if (make && model) {
    return `${make} ${model}`;
  }

  if (make) return make;
  if (model) return model;

  return 'Unknown Device';
};

export const getCameraSettings = (exifData: ExifData) => {
  return {
    exposureTime: formatExposureTime(exifData.exposureTime),
    fNumber: formatFNumber(exifData.fNumber),
    iso: formatISO(exifData.iso),
    focalLength: formatFocalLength(exifData.focalLength),
  };
};
