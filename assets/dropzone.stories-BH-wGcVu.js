import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{F as i}from"./dropzone-PVWdUuhb.js";import"./proxy-DO5oYl8W.js";import"./iframe-h5e1zR-T.js";import"./preload-helper-D9Z9MdNV.js";const m={title:"Features/File Upload/Dropzone",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{isDragActive:{control:"boolean",description:"Whether files are currently being dragged over the dropzone"},isDragAccept:{control:"boolean",description:"Whether the dragged files are accepted"},isDragReject:{control:"boolean",description:"Whether the dragged files are rejected"},disabled:{control:"boolean",description:"Whether the dropzone is disabled"}}},s={args:{isDragActive:!1,isDragAccept:!1,isDragReject:!1,disabled:!1}},a={args:{isDragActive:!0,isDragAccept:!1,isDragReject:!1,disabled:!1}},r={args:{isDragActive:!0,isDragAccept:!0,isDragReject:!1,disabled:!1}},t={args:{isDragActive:!0,isDragAccept:!1,isDragReject:!0,disabled:!1}},c={args:{isDragActive:!1,isDragAccept:!1,isDragReject:!1,disabled:!0}},o={args:{isDragActive:!1,isDragAccept:!1,isDragReject:!1,disabled:!1,children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-4xl mb-4",children:"📸"}),e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Upload Your Photos"}),e.jsx("p",{className:"text-gray-600",children:"Drag and drop your photos here or click to browse"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Supports JPEG, PNG, GIF, WebP formats"})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    disabled: false
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isDragActive: true,
    isDragAccept: false,
    isDragReject: false,
    disabled: false
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isDragActive: true,
    isDragAccept: true,
    isDragReject: false,
    disabled: false
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isDragActive: true,
    isDragAccept: false,
    isDragReject: true,
    disabled: false
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    disabled: false,
    children: <div className="text-center">
        <div className="text-4xl mb-4">📸</div>
        <h3 className="text-lg font-semibold mb-2">Upload Your Photos</h3>
        <p className="text-gray-600">Drag and drop your photos here or click to browse</p>
        <p className="text-sm text-gray-500 mt-2">Supports JPEG, PNG, GIF, WebP formats</p>
      </div>
  }
}`,...o.parameters?.docs?.source}}};const D=["Default","DragActive","DragAccept","DragReject","Disabled","CustomContent"];export{o as CustomContent,s as Default,c as Disabled,r as DragAccept,a as DragActive,t as DragReject,D as __namedExportsOrder,m as default};
