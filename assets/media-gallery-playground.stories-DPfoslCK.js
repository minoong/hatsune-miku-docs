import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as m}from"./iframe-h5e1zR-T.js";import{M as f}from"./media-gallery-Ch2ogOTJ.js";import"./preload-helper-D9Z9MdNV.js";import"./dropzone-PVWdUuhb.js";import"./proxy-DO5oYl8W.js";import"./media-card-DxRmDn4l.js";import"./index-zX9A9w7_.js";import"./index-CxEweawz.js";const g=u=>{const[a,o]=m.useState(null),[x,d]=m.useState(!1),p=s=>{o(s),d(!0),console.log("File clicked:",s.name)},h=s=>{console.log("File download:",s.name)},c=()=>{d(!1),o(null)};return e.jsxs("div",{className:"min-h-screen bg-gray-50 p-6",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"📸 미디어 갤러리 플레이그라운드"}),e.jsx("p",{className:"text-gray-600",children:"사진, 동영상, GIF를 업로드하여 미디어 갤러리를 테스트해보세요. EXIF 데이터 추출, 썸네일, 다양한 보기 모드를 지원합니다."})]}),e.jsx(f,{...u,onFileClick:p,onFileDownload:h,className:"max-w-7xl mx-auto"}),x&&a&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4",onClick:c,children:e.jsxs("div",{className:"relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden",onClick:s=>s.stopPropagation(),children:[e.jsx("button",{onClick:c,className:"absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-all",children:e.jsx("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),e.jsxs("div",{className:"p-6",children:[a.type==="image"?e.jsx("div",{className:"text-center",children:e.jsx("img",{src:a.preview||URL.createObjectURL(a.file),alt:a.name,className:"max-w-full max-h-[70vh] object-contain mx-auto rounded"})}):e.jsx("div",{className:"text-center",children:e.jsx("video",{src:URL.createObjectURL(a.file),controls:!0,className:"max-w-full max-h-[70vh] object-contain mx-auto rounded",children:"Your browser does not support the video tag."})}),e.jsxs("div",{className:"mt-4 border-t pt-4",children:[e.jsx("h3",{className:"font-semibold text-lg mb-2",children:a.name}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"타입:"}),e.jsx("span",{className:"ml-2",children:a.mimeType})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"크기:"}),e.jsxs("span",{className:"ml-2",children:[(a.size/(1024*1024)).toFixed(2)," MB"]})]}),a.metadata&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"해상도:"}),e.jsxs("span",{className:"ml-2",children:[a.metadata.width,"×",a.metadata.height]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"Orientation:"}),e.jsx("span",{className:"ml-2 capitalize",children:a.metadata.orientation})]}),a.metadata.duration&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"재생시간:"}),e.jsxs("span",{className:"ml-2",children:[Math.round(a.metadata.duration),"s"]})]})]})]}),a.type==="image"&&a.exifData&&e.jsxs("div",{className:"mt-4 border-t pt-4",children:[e.jsx("h4",{className:"font-semibold mb-2",children:"📷 카메라 정보"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[a.exifData.make&&a.exifData.model&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"카메라:"}),e.jsxs("span",{className:"ml-2",children:[a.exifData.make," ",a.exifData.model]})]}),a.exifData.datetime&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"날짜:"}),e.jsx("span",{className:"ml-2",children:new Date(a.exifData.datetime).toLocaleString()})]}),a.exifData.exposureTime&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"Exposure:"}),e.jsxs("span",{className:"ml-2",children:["1/",Math.round(1/a.exifData.exposureTime),"s"]})]}),a.exifData.fNumber&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"Aperture:"}),e.jsxs("span",{className:"ml-2",children:["f/",a.exifData.fNumber]})]}),a.exifData.iso&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"ISO:"}),e.jsx("span",{className:"ml-2",children:a.exifData.iso})]}),a.exifData.focalLength&&e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"초점거리:"}),e.jsxs("span",{className:"ml-2",children:[Math.round(a.exifData.focalLength),"mm"]})]})]})]})]})]})]})}),e.jsxs("div",{className:"mt-12 max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-sm",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"🧪 테스트 방법"}),e.jsxs("div",{className:"space-y-3 text-sm text-gray-700",children:[e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("span",{className:"text-blue-500",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{children:"파일 업로드:"})," 이미지, 동영상, GIF를 업로드 영역에 드래그 앤 드롭하세요"]})]}),e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("span",{className:"text-blue-500",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{children:"보기 모드:"})," 툴바를 사용하여 리스트와 메이슨리 보기 간 전환할 수 있습니다"]})]}),e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("span",{className:"text-blue-500",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{children:"검색 및 필터:"})," 검색창과 필터 드롭다운을 사용하여 특정 파일을 찾으세요"]})]}),e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("span",{className:"text-blue-500",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{children:"선택:"})," 체크박스를 클릭하여 여러 파일을 선택하고 일괄 작업을 수행하세요"]})]}),e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("span",{className:"text-blue-500",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{children:"EXIF 데이터:"})," 카메라로 촬영한 사진을 업로드하여 메타데이터 추출 기능을 확인하세요"]})]}),e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("span",{className:"text-blue-500",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{children:"동영상 재생:"})," MP4, WebM, MOV 파일을 업로드하여 비디오 컨트롤을 테스트하세요"]})]}),e.jsxs("div",{className:"flex items-start space-x-2",children:[e.jsx("span",{className:"text-blue-500",children:"•"}),e.jsxs("span",{children:[e.jsx("strong",{children:"반응형:"})," 삤이즈를 조정하여 반응형 동작을 테스트하세요"]})]})]}),e.jsxs("div",{className:"mt-6 p-4 bg-blue-50 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-blue-900 mb-2",children:"📋 Supported Formats"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-sm text-blue-800",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Images:"})," JPEG, PNG, GIF, WebP"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Videos:"})," MP4, WebM, MOV, AVI, MKV"]})]})]})]})]})},C={title:"Examples/Media Gallery Playground",component:g,parameters:{layout:"fullscreen",docs:{description:{component:"Complete media gallery playground for testing file uploads, EXIF extraction, and all features."}}},tags:["autodocs"],argTypes:{defaultViewMode:{control:"select",options:["list","masonry"],description:"Default view mode for the gallery"},enableSearch:{control:"boolean",description:"Enable search functionality"},enableBulkActions:{control:"boolean",description:"Enable bulk actions (select all, delete selected, etc.)"},enableSelection:{control:"boolean",description:"Enable file selection"},maxGridColumns:{control:"number",min:1,max:8,description:"Maximum number of columns in grid view"}}},l={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:4,uploadConfig:{multiple:!0,maxFiles:50,maxSize:100*1024*1024,generateThumbnails:!0,extractExif:!0,autoUpload:!1}}},t={args:{defaultViewMode:"masonry",defaultSortBy:"name",defaultSortOrder:"asc",defaultFilter:"all",enableSearch:!1,enableBulkActions:!1,enableSelection:!1,maxGridColumns:3,uploadConfig:{multiple:!0,maxFiles:10,maxSize:10*1024*1024,generateThumbnails:!1,extractExif:!1,autoUpload:!0}}},n={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"images",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:5,uploadConfig:{multiple:!0,maxFiles:30,maxSize:20*1024*1024,acceptedTypes:["image/jpeg","image/png","image/gif","image/webp"],generateThumbnails:!0,extractExif:!0,autoUpload:!1}}},r={args:{defaultViewMode:"list",defaultSortBy:"size",defaultSortOrder:"desc",defaultFilter:"videos",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:2,uploadConfig:{multiple:!0,maxFiles:15,maxSize:500*1024*1024,acceptedTypes:["video/mp4","video/webm","video/quicktime","video/avi"],generateThumbnails:!1,extractExif:!1,autoUpload:!1}}},i={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:8,uploadConfig:{multiple:!0,maxFiles:100,maxSize:50*1024*1024,generateThumbnails:!0,extractExif:!0,autoUpload:!1}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
      maxSize: 100 * 1024 * 1024,
      // 100MB
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false
    }
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
      maxSize: 10 * 1024 * 1024,
      // 10MB
      generateThumbnails: false,
      extractExif: false,
      autoUpload: true
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
      maxSize: 20 * 1024 * 1024,
      // 20MB
      acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false
    }
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
      maxSize: 500 * 1024 * 1024,
      // 500MB
      acceptedTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/avi'],
      generateThumbnails: false,
      extractExif: false,
      autoUpload: false
    }
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
      maxSize: 50 * 1024 * 1024,
      // 50MB
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false
    }
  }
}`,...i.parameters?.docs?.source}}};const k=["CompletePlayground","MinimalConfiguration","ImagesOnlyGallery","VideoFocusedGallery","CompactMasonryView"];export{i as CompactMasonryView,l as CompletePlayground,n as ImagesOnlyGallery,t as MinimalConfiguration,r as VideoFocusedGallery,k as __namedExportsOrder,C as default};
