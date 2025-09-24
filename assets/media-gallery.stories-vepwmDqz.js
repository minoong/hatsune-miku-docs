import{j as m}from"./jsx-runtime-D_zvdyIk.js";import{M as f}from"./media-gallery-Ch2ogOTJ.js";import"./dropzone-PVWdUuhb.js";import"./proxy-DO5oYl8W.js";import"./iframe-h5e1zR-T.js";import"./preload-helper-D9Z9MdNV.js";import"./media-card-DxRmDn4l.js";import"./index-zX9A9w7_.js";import"./index-CxEweawz.js";const B={title:"Widgets/MediaGallery",component:f,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{defaultViewMode:{control:"select",options:["list","masonry"],description:"Default view mode for the gallery"},enableSearch:{control:"boolean",description:"Enable search functionality"},enableBulkActions:{control:"boolean",description:"Enable bulk actions (select all, delete selected, etc.)"},enableSelection:{control:"boolean",description:"Enable file selection"},maxGridColumns:{control:"number",min:1,max:8,description:"Maximum number of columns in grid view"}},decorators:[e=>m.jsx("div",{className:"p-6 min-h-screen bg-gray-50",children:m.jsx(e,{})})]},l={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:4,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},o={args:{defaultViewMode:"masonry",defaultSortBy:"name",defaultSortOrder:"asc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:6,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},n={args:{defaultViewMode:"list",defaultSortBy:"size",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},a={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},r={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"images",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:4,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},t={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"videos",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:3,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},i={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!1,enableBulkActions:!0,enableSelection:!0,maxGridColumns:4,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},d={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!1,enableSelection:!1,maxGridColumns:4,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},c={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:8,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},s={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:2,onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}},u={args:{defaultViewMode:"masonry",defaultSortBy:"created",defaultSortOrder:"desc",defaultFilter:"all",enableSearch:!0,enableBulkActions:!0,enableSelection:!0,maxGridColumns:4,uploadConfig:{multiple:!0,maxFiles:10,maxSize:5*1024*1024,generateThumbnails:!0,extractExif:!0,autoUpload:!1},onFileClick:e=>console.log("File clicked:",e.name),onFileDownload:e=>console.log("File download:",e.name)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 4,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'name',
    defaultSortOrder: 'asc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 6,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'list',
    defaultSortBy: 'size',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'images',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 4,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'videos',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 3,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: false,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 4,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: false,
    enableSelection: false,
    maxGridColumns: 4,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 8,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    defaultViewMode: 'masonry',
    defaultSortBy: 'created',
    defaultSortOrder: 'desc',
    defaultFilter: 'all',
    enableSearch: true,
    enableBulkActions: true,
    enableSelection: true,
    maxGridColumns: 2,
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...s.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
      maxSize: 5 * 1024 * 1024,
      // 5MB
      generateThumbnails: true,
      extractExif: true,
      autoUpload: false
    },
    onFileClick: file => console.log('File clicked:', file.name),
    onFileDownload: file => console.log('File download:', file.name)
  }
}`,...u.parameters?.docs?.source}}};const x=["Default","MasonryView","ListView","MasonryChronological","ImagesOnly","VideosOnly","NoSearch","NoBulkActions","CompactMasonry","LargeGrid","CustomUploadConfig"];export{c as CompactMasonry,u as CustomUploadConfig,l as Default,r as ImagesOnly,s as LargeGrid,n as ListView,a as MasonryChronological,o as MasonryView,d as NoBulkActions,i as NoSearch,t as VideosOnly,x as __namedExportsOrder,B as default};
