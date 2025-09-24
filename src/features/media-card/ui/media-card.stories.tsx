import type { Meta, StoryObj } from '@storybook/react-vite';

import type { MediaFile } from '~/entities/media/model/types';

import { MediaCard } from './media-card';

// Mock media file data
const createMockImageFile = (overrides: Partial<MediaFile> = {}): MediaFile => ({
  id: '1',
  file: new File(['mock'], 'sample-image.jpg', { type: 'image/jpeg' }),
  type: 'image',
  mimeType: 'image/jpeg',
  name: 'sample-image.jpg',
  size: 2048576, // 2MB
  preview: 'https://picsum.photos/400/300',
  thumbnail: 'https://picsum.photos/200/150',
  uploadProgress: 100,
  uploadStatus: 'completed',
  metadata: {
    width: 1920,
    height: 1080,
    aspectRatio: 1.78,
    orientation: 'landscape',
  },
  exifData: {
    make: 'Canon',
    model: 'EOS R5',
    datetime: '2024-01-15 10:30:00',
    exposureTime: 0.008, // 1/125s
    fNumber: 2.8,
    iso: 400,
    focalLength: 85,
    gpsLatitude: 37.7749,
    gpsLongitude: -122.4194,
  },
  createdAt: new Date('2024-01-15T10:30:00Z'),
  updatedAt: new Date('2024-01-15T10:30:00Z'),
  ...overrides,
});

const createMockVideoFile = (overrides: Partial<MediaFile> = {}): MediaFile => ({
  id: '2',
  file: new File(['mock'], 'sample-video.mp4', { type: 'video/mp4' }),
  type: 'video',
  mimeType: 'video/mp4',
  name: 'sample-video.mp4',
  size: 15728640, // 15MB
  preview: 'https://picsum.photos/400/300',
  thumbnail: 'https://picsum.photos/200/150',
  uploadProgress: 100,
  uploadStatus: 'completed',
  metadata: {
    width: 1920,
    height: 1080,
    aspectRatio: 1.78,
    orientation: 'landscape',
    duration: 45.5,
  },
  createdAt: new Date('2024-01-15T11:00:00Z'),
  updatedAt: new Date('2024-01-15T11:00:00Z'),
  ...overrides,
});

const meta: Meta<typeof MediaCard> = {
  title: 'Features/Media Card/MediaCard',
  component: MediaCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['compact', 'detailed'],
      description: 'Card variant',
    },
    showExif: {
      control: 'boolean',
      description: 'Show EXIF data panel initially',
    },
    showMetadata: {
      control: 'boolean',
      description: 'Show metadata information',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageCompact: Story = {
  args: {
    media: createMockImageFile(),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
    onDelete: (media) => console.log('Delete:', media.name),
    onDownload: (media) => console.log('Download:', media.name),
  },
};

export const ImageDetailed: Story = {
  args: {
    media: createMockImageFile(),
    variant: 'detailed',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
    onDelete: (media) => console.log('Delete:', media.name),
    onDownload: (media) => console.log('Download:', media.name),
  },
};

export const VideoCompact: Story = {
  args: {
    media: createMockVideoFile(),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
    onDelete: (media) => console.log('Delete:', media.name),
    onDownload: (media) => console.log('Download:', media.name),
  },
};

export const VideoDetailed: Story = {
  args: {
    media: createMockVideoFile(),
    variant: 'detailed',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
    onDelete: (media) => console.log('Delete:', media.name),
    onDownload: (media) => console.log('Download:', media.name),
  },
};

export const PortraitImage: Story = {
  args: {
    media: createMockImageFile({
      metadata: {
        width: 1080,
        height: 1920,
        aspectRatio: 0.56,
        orientation: 'portrait',
      },
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
  },
};

export const SquareImage: Story = {
  args: {
    media: createMockImageFile({
      metadata: {
        width: 1080,
        height: 1080,
        aspectRatio: 1,
        orientation: 'square',
      },
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
  },
};

export const WithoutExifData: Story = {
  args: {
    media: createMockImageFile({
      exifData: undefined,
    }),
    variant: 'detailed',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
  },
};

export const UploadingState: Story = {
  args: {
    media: createMockImageFile({
      uploadStatus: 'uploading',
      uploadProgress: 65,
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
  },
};

export const ErrorState: Story = {
  args: {
    media: createMockImageFile({
      uploadStatus: 'error',
      error: 'Upload failed due to network error',
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
  },
};

export const MinimalActions: Story = {
  args: {
    media: createMockImageFile(),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: (media) => console.log('Clicked:', media.name),
    onDelete: undefined,
    onDownload: undefined,
  },
};
