import{j as p}from"./jsx-runtime-D_zvdyIk.js";import{M as u}from"./media-card-DxRmDn4l.js";import"./preload-helper-D9Z9MdNV.js";import"./iframe-h5e1zR-T.js";import"./proxy-DO5oYl8W.js";import"./index-zX9A9w7_.js";import"./index-CxEweawz.js";const a=(e={})=>({id:"1",file:new File(["mock"],"sample-image.jpg",{type:"image/jpeg"}),type:"image",mimeType:"image/jpeg",name:"sample-image.jpg",size:2048576,preview:"https://picsum.photos/400/300",thumbnail:"https://picsum.photos/200/150",uploadProgress:100,uploadStatus:"completed",metadata:{width:1920,height:1080,aspectRatio:1.78,orientation:"landscape"},exifData:{make:"Canon",model:"EOS R5",datetime:"2024-01-15 10:30:00",exposureTime:.008,fNumber:2.8,iso:400,focalLength:85,gpsLatitude:37.7749,gpsLongitude:-122.4194},createdAt:new Date("2024-01-15T10:30:00Z"),updatedAt:new Date("2024-01-15T10:30:00Z"),...e}),g=(e={})=>({id:"2",file:new File(["mock"],"sample-video.mp4",{type:"video/mp4"}),type:"video",mimeType:"video/mp4",name:"sample-video.mp4",size:15728640,preview:"https://picsum.photos/400/300",thumbnail:"https://picsum.photos/200/150",uploadProgress:100,uploadStatus:"completed",metadata:{width:1920,height:1080,aspectRatio:1.78,orientation:"landscape",duration:45.5},createdAt:new Date("2024-01-15T11:00:00Z"),updatedAt:new Date("2024-01-15T11:00:00Z"),...e}),v={title:"Features/Media Card/MediaCard",component:u,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["compact","detailed"],description:"Card variant"},showExif:{control:"boolean",description:"Show EXIF data panel initially"},showMetadata:{control:"boolean",description:"Show metadata information"}},decorators:[e=>p.jsx("div",{className:"w-80",children:p.jsx(e,{})})]},o={args:{media:a(),variant:"compact",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name),onDelete:e=>console.log("Delete:",e.name),onDownload:e=>console.log("Download:",e.name)}},t={args:{media:a(),variant:"detailed",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name),onDelete:e=>console.log("Delete:",e.name),onDownload:e=>console.log("Download:",e.name)}},n={args:{media:g(),variant:"compact",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name),onDelete:e=>console.log("Delete:",e.name),onDownload:e=>console.log("Download:",e.name)}},i={args:{media:g(),variant:"detailed",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name),onDelete:e=>console.log("Delete:",e.name),onDownload:e=>console.log("Download:",e.name)}},s={args:{media:a({metadata:{width:1080,height:1920,aspectRatio:.56,orientation:"portrait"}}),variant:"compact",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name)}},r={args:{media:a({metadata:{width:1080,height:1080,aspectRatio:1,orientation:"square"}}),variant:"compact",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name)}},d={args:{media:a({exifData:void 0}),variant:"detailed",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name)}},l={args:{media:a({uploadStatus:"uploading",uploadProgress:65}),variant:"compact",showExif:!1,showMetadata:!0}},c={args:{media:a({uploadStatus:"error",error:"Upload failed due to network error"}),variant:"compact",showExif:!1,showMetadata:!0}},m={args:{media:a(),variant:"compact",showExif:!1,showMetadata:!0,onClick:e=>console.log("Clicked:",e.name),onDelete:void 0,onDownload:void 0}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile(),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name),
    onDelete: media => console.log('Delete:', media.name),
    onDownload: media => console.log('Download:', media.name)
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile(),
    variant: 'detailed',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name),
    onDelete: media => console.log('Delete:', media.name),
    onDownload: media => console.log('Download:', media.name)
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockVideoFile(),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name),
    onDelete: media => console.log('Delete:', media.name),
    onDownload: media => console.log('Download:', media.name)
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockVideoFile(),
    variant: 'detailed',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name),
    onDelete: media => console.log('Delete:', media.name),
    onDownload: media => console.log('Download:', media.name)
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile({
      metadata: {
        width: 1080,
        height: 1920,
        aspectRatio: 0.56,
        orientation: 'portrait'
      }
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name)
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile({
      metadata: {
        width: 1080,
        height: 1080,
        aspectRatio: 1,
        orientation: 'square'
      }
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name)
  }
}`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile({
      exifData: undefined
    }),
    variant: 'detailed',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name)
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile({
      uploadStatus: 'uploading',
      uploadProgress: 65
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile({
      uploadStatus: 'error',
      error: 'Upload failed due to network error'
    }),
    variant: 'compact',
    showExif: false,
    showMetadata: true
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    media: createMockImageFile(),
    variant: 'compact',
    showExif: false,
    showMetadata: true,
    onClick: media => console.log('Clicked:', media.name),
    onDelete: undefined,
    onDownload: undefined
  }
}`,...m.parameters?.docs?.source}}};const x=["ImageCompact","ImageDetailed","VideoCompact","VideoDetailed","PortraitImage","SquareImage","WithoutExifData","UploadingState","ErrorState","MinimalActions"];export{c as ErrorState,o as ImageCompact,t as ImageDetailed,m as MinimalActions,s as PortraitImage,r as SquareImage,l as UploadingState,n as VideoCompact,i as VideoDetailed,d as WithoutExifData,x as __namedExportsOrder,v as default};
