import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileDropzone } from './dropzone';

const meta: Meta<typeof FileDropzone> = {
  title: 'Features/File Upload/Dropzone',
  component: FileDropzone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDragActive: {
      control: 'boolean',
      description: 'Whether files are currently being dragged over the dropzone',
    },
    isDragAccept: {
      control: 'boolean',
      description: 'Whether the dragged files are accepted',
    },
    isDragReject: {
      control: 'boolean',
      description: 'Whether the dragged files are rejected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropzone is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    disabled: false,
  },
};

export const DragActive: Story = {
  args: {
    isDragActive: true,
    isDragAccept: false,
    isDragReject: false,
    disabled: false,
  },
};

export const DragAccept: Story = {
  args: {
    isDragActive: true,
    isDragAccept: true,
    isDragReject: false,
    disabled: false,
  },
};

export const DragReject: Story = {
  args: {
    isDragActive: true,
    isDragAccept: false,
    isDragReject: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    disabled: true,
  },
};

export const CustomContent: Story = {
  args: {
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    disabled: false,
    children: (
      <div className="text-center">
        <div className="mb-4 text-4xl">📸</div>
        <h3 className="mb-2 text-lg font-semibold">Upload Your Photos</h3>
        <p className="text-gray-600">Drag and drop your photos here or click to browse</p>
        <p className="mt-2 text-sm text-gray-500">Supports JPEG, PNG, GIF, WebP formats</p>
      </div>
    ),
  },
};
