import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { MediaFile } from '~/entities/media/model/types';
import type { Any } from '~/shared/model/global';

import { MediaGallery } from './media-gallery';

// Complete playground component for testing
const MediaGalleryPlayground = (args: Any) => {
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleFileClick = (file: MediaFile) => {
    setSelectedFile(file);
    setViewerOpen(true);
    console.log('File clicked:', file.name);
  };

  const handleFileDownload = (file: MediaFile) => {
    console.log('File download:', file.name);
    // Default download will be handled by the gallery
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">📸 미디어 갤러리 플레이그라운드</h1>
        <p className="text-gray-600">사진, 동영상, GIF를 업로드하여 미디어 갤러리를 테스트해보세요. EXIF 데이터 추출, 썸네일, 다양한 보기 모드를 지원합니다.</p>
      </div>

      {/* Media Gallery */}
      <MediaGallery {...args} onFileClick={handleFileClick} onFileDownload={handleFileDownload} className="mx-auto max-w-7xl" />

      {/* File Viewer Modal */}
      {viewerOpen && selectedFile && (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={closeViewer}>
          <div className="relative max-h-full max-w-4xl overflow-hidden rounded-lg bg-white" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeViewer}
              className="bg-opacity-50 hover:bg-opacity-75 absolute top-4 right-4 z-10 rounded-full bg-black p-2 text-white transition-all"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* File content */}
            <div className="p-6">
              {selectedFile.type === 'image' ? (
                <div className="text-center">
                  <img
                    src={selectedFile.preview || URL.createObjectURL(selectedFile.file)}
                    alt={selectedFile.name}
                    className="mx-auto max-h-[70vh] max-w-full rounded object-contain"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <video src={URL.createObjectURL(selectedFile.file)} controls className="mx-auto max-h-[70vh] max-w-full rounded object-contain">
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* File info */}
              <div className="mt-4 border-t pt-4">
                <h3 className="mb-2 text-lg font-semibold">{selectedFile.name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">타입:</span>
                    <span className="ml-2">{selectedFile.mimeType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">크기:</span>
                    <span className="ml-2">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                  {selectedFile.metadata && (
                    <>
                      <div>
                        <span className="text-gray-600">해상도:</span>
                        <span className="ml-2">
                          {selectedFile.metadata.width}×{selectedFile.metadata.height}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Orientation:</span>
                        <span className="ml-2 capitalize">{selectedFile.metadata.orientation}</span>
                      </div>
                      {selectedFile.metadata.duration && (
                        <div>
                          <span className="text-gray-600">재생시간:</span>
                          <span className="ml-2">{Math.round(selectedFile.metadata.duration)}s</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* EXIF data for images */}
                {selectedFile.type === 'image' && selectedFile.exifData && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="mb-2 font-semibold">📷 카메라 정보</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {selectedFile.exifData.make && selectedFile.exifData.model && (
                        <div>
                          <span className="text-gray-600">카메라:</span>
                          <span className="ml-2">
                            {selectedFile.exifData.make} {selectedFile.exifData.model}
                          </span>
                        </div>
                      )}
                      {selectedFile.exifData.datetime && (
                        <div>
                          <span className="text-gray-600">날짜:</span>
                          <span className="ml-2">{new Date(selectedFile.exifData.datetime).toLocaleString()}</span>
                        </div>
                      )}
                      {selectedFile.exifData.exposureTime && (
                        <div>
                          <span className="text-gray-600">Exposure:</span>
                          <span className="ml-2">1/{Math.round(1 / selectedFile.exifData.exposureTime)}s</span>
                        </div>
                      )}
                      {selectedFile.exifData.fNumber && (
                        <div>
                          <span className="text-gray-600">Aperture:</span>
                          <span className="ml-2">f/{selectedFile.exifData.fNumber}</span>
                        </div>
                      )}
                      {selectedFile.exifData.iso && (
                        <div>
                          <span className="text-gray-600">ISO:</span>
                          <span className="ml-2">{selectedFile.exifData.iso}</span>
                        </div>
                      )}
                      {selectedFile.exifData.focalLength && (
                        <div>
                          <span className="text-gray-600">초점거리:</span>
                          <span className="ml-2">{Math.round(selectedFile.exifData.focalLength)}mm</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mx-auto mt-12 max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">🧪 테스트 방법</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">•</span>
            <span>
              <strong>파일 업로드:</strong> 이미지, 동영상, GIF를 업로드 영역에 드래그 앤 드롭하세요
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">•</span>
            <span>
              <strong>보기 모드:</strong> 툴바를 사용하여 리스트와 메이슨리 보기 간 전환할 수 있습니다
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">•</span>
            <span>
              <strong>검색 및 필터:</strong> 검색창과 필터 드롭다운을 사용하여 특정 파일을 찾으세요
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">•</span>
            <span>
              <strong>선택:</strong> 체크박스를 클릭하여 여러 파일을 선택하고 일괄 작업을 수행하세요
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">•</span>
            <span>
              <strong>EXIF 데이터:</strong> 카메라로 촬영한 사진을 업로드하여 메타데이터 추출 기능을 확인하세요
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">•</span>
            <span>
              <strong>동영상 재생:</strong> MP4, WebM, MOV 파일을 업로드하여 비디오 컨트롤을 테스트하세요
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">•</span>
            <span>
              <strong>반응형:</strong> 삤이즈를 조정하여 반응형 동작을 테스트하세요
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">📋 Supported Formats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>Images:</strong> JPEG, PNG, GIF, WebP
            </div>
            <div>
              <strong>Videos:</strong> MP4, WebM, MOV, AVI, MKV
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MediaGalleryPlayground> = {
  title: 'Examples/Media Gallery Playground',
  component: MediaGalleryPlayground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete media gallery playground for testing file uploads, EXIF extraction, and all features.',
      },
    },
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompletePlayground: Story = {
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
      maxFiles: 50,
      maxSize: 100 * 1024 * 1024, // 100MB
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false,
    },
  },
};

export const MinimalConfiguration: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'name',
    defaultSortOrder: 'asc',
    defaultFilter: 'all',
    enableSearch: false,
    enableBulkActions: false,
    enableSelection: false,
    maxGridColumns: 3,
    uploadConfig: {
      multiple: true,
      maxFiles: 10,
      maxSize: 10 * 1024 * 1024, // 10MB
      generateThumbnails: false,
      extractExif: false,
      autoUpload: true,
    },
  },
};

export const ImagesOnlyGallery: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'images',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 5,
    uploadConfig: {
      multiple: true,
      maxFiles: 30,
      maxSize: 20 * 1024 * 1024, // 20MB
      acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false,
    },
  },
};

export const VideoFocusedGallery: Story = {
  args: {
    defaultViewMode: 'list',
    defaultSortBy: 'size',
    defaultSortOrder: 'desc',
    defaultFilter: 'videos',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 2,
    uploadConfig: {
      multiple: true,
      maxFiles: 15,
      maxSize: 500 * 1024 * 1024, // 500MB
      acceptedTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/avi'],
      generateThumbnails: false,
      extractExif: false,
      autoUpload: false,
    },
  },
};

export const CompactMasonryView: Story = {
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 8,
    uploadConfig: {
      multiple: true,
      maxFiles: 100,
      maxSize: 50 * 1024 * 1024, // 50MB
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false,
    },
  },
};
