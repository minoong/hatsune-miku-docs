import type { Meta, StoryObj } from '@storybook/react-vite';

import { MediaGallery } from './media-gallery';

const meta: Meta<typeof MediaGallery> = {
  title: 'Widgets/MediaGallery',
  component: MediaGallery,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultViewMode: {
      control: 'select',
      options: ['list', 'masonry'],
      description: 'Default view mode for the gallery',
    },
    enableSearch: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    enableBulkActions: {
      control: 'boolean',
      description: 'Enable bulk actions (select all, delete selected, etc.)',
    },
    enableSelection: {
      control: 'boolean',
      description: 'Enable file selection',
    },
    maxGridColumns: {
      control: 'number',
      min: 1,
      max: 8,
      description: 'Maximum number of columns in grid view',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 min-h-screen bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 4,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const MasonryView: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'name',
    defaultSortOrder: 'asc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 6,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const ListView: Story = {
  args: {
    defaultViewMode: 'list',
    defaultSortBy: 'size',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const MasonryChronological: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const ImagesOnly: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'images',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 4,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const VideosOnly: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'videos',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 3,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const NoSearch: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: false,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 4,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const NoBulkActions: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: false,
    enableSelection: false,
    maxGridColumns: 4,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const CompactMasonry: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 8,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const LargeGrid: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 2,
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};

export const CustomUploadConfig: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 4,
    uploadConfig: {
      multiple: true,
      maxFiles: 10,
      maxSize: 5 * 1024 * 1024, // 5MB
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false,
    },
    onFileClick: (file) => console.log('File clicked:', file.name),
    onFileDownload: (file) => console.log('File download:', file.name),
  },
};
