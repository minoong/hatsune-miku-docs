import{j as e}from"./jsx-runtime-D_zvdyIk.js";const o=({children:s,className:a=""})=>e.jsx("div",{className:`group relative w-80 h-80 m-5 [transform-style:preserve-3d] [perspective:1000px] ${a}`,children:e.jsx("div",{className:"absolute top-0 left-0 w-full h-full [transform-style:preserve-3d] transition-transform duration-1000 ease-in-out group-hover:[transform:rotateY(180deg)]",children:s})});o.__docgenInfo={description:"",methods:[],displayName:"FlipCardRoot",props:{className:{defaultValue:{value:"''",computed:!1},required:!1}}};const d=({src:s,alt:a,className:g="",objectFit:C="cover"})=>{const f={cover:"object-cover",contain:"object-contain",fill:"object-fill",none:"object-none","scale-down":"object-scale-down"}[C];return e.jsx("div",{className:`absolute top-0 left-0 w-full h-full ${g}`,children:e.jsx("img",{src:s,alt:a,className:`absolute top-0 left-0 w-full h-full ${f}`})})};d.__docgenInfo={description:"",methods:[],displayName:"FlipCardImage",props:{className:{defaultValue:{value:"''",computed:!1},required:!1},objectFit:{defaultValue:{value:"'cover'",computed:!1},required:!1}}};const c=({children:s,className:a=""})=>e.jsx("div",{className:`absolute top-0 left-0 w-full h-full [backface-visibility:hidden] flex justify-center items-center [transform-style:preserve-3d] [transform:rotateY(180deg)] ${a}`,children:e.jsx("div",{className:"[transform-style:preserve-3d] p-5 [transform:translateZ(100px)]",children:s})});c.__docgenInfo={description:"",methods:[],displayName:"FlipCardContent",props:{className:{defaultValue:{value:"''",computed:!1},required:!1}}};const p=({children:s,className:a=""})=>e.jsx("h2",{className:`text-white text-xl tracking-wider ${a}`,children:s});p.__docgenInfo={description:"",methods:[],displayName:"FlipCardTitle",props:{className:{defaultValue:{value:"''",computed:!1},required:!1}}};const m=({children:s,className:a=""})=>e.jsx("p",{className:`text-white text-base ${a}`,children:s});m.__docgenInfo={description:"",methods:[],displayName:"FlipCardDescription",props:{className:{defaultValue:{value:"''",computed:!1},required:!1}}};const u=({children:s,className:a=""})=>e.jsx("section",{className:`flex justify-center items-center flex-wrap [transform-style:preserve-3d] max-w-[1100px] mx-auto ${a}`,children:s});u.__docgenInfo={description:"",methods:[],displayName:"FlipCardGrid",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const r=Object.assign(o,{Image:d,Content:c,Title:p,Description:m,Grid:u}),F={title:"Features/FlipCard",component:r,parameters:{layout:"centered",docs:{description:{component:"🎴 마우스를 올리면 뒤집어지는 마법같은 카드! 앞면엔 예쁜 이미지, 뒷면엔 멋진 내용을 담을 수 있어요 ✨"},story:{overflow:"auto"}}},tags:["autodocs"]},t={render:()=>e.jsxs(r,{children:[e.jsx(r.Image,{src:"/images/miku-main.png",alt:"Miku"}),e.jsx(r.Content,{className:"bg-slate-800",children:e.jsxs("div",{className:"bg-gradient-to-br from-pink-500 to-yellow-400 p-5 rounded-lg translate-z-24",children:[e.jsx(r.Title,{children:"✨ 미쿠의 하루"}),e.jsx(r.Description,{children:"오늘도 열심히 노래 연습을 하고 있어요! 미쿠리가 정말 예쁘죠? 💙"})]})})]})},i={render:()=>e.jsx("div",{className:"min-h-screen flex justify-center items-center bg-gray-100 p-8",children:e.jsx(r.Grid,{children:Array.from({length:6},(s,a)=>e.jsxs(r,{children:[e.jsx(r.Image,{src:"/images/miku-main.png",alt:"Miku"}),e.jsx(r.Content,{className:"bg-slate-800",children:e.jsxs("div",{className:"bg-gradient-to-br from-pink-500 to-yellow-400 p-5 rounded-lg",children:[e.jsxs(r.Title,{children:["🎵 미쿠 카드 ",a+1]}),e.jsx(r.Description,{children:"각각 다른 매력을 가진 미쿠의 모습들! 하나씩 마우스를 올려보세요 🌟"})]})})]},a))})})},n={render:()=>e.jsxs(r,{children:[e.jsx(r.Image,{src:"/images/miku-main.png",alt:"Miku"}),e.jsx(r.Content,{className:"bg-gradient-to-br from-blue-500 to-purple-600",children:e.jsxs("div",{className:"p-5",children:[e.jsx(r.Title,{className:"text-2xl font-bold mb-4",children:"🎨 나만의 스타일"}),e.jsx(r.Description,{className:"text-lg",children:"원하는 색깔과 스타일로 자유롭게 꾸며보세요! 상상력이 곧 디자인이에요 🚀"})]})})]})},l={render:()=>e.jsxs("div",{className:"flex gap-8 flex-wrap justify-center",children:[e.jsxs(r,{children:[e.jsx(r.Image,{src:"/images/miku-main.png",alt:"Miku",objectFit:"cover"}),e.jsx(r.Content,{className:"bg-slate-800",children:e.jsxs("div",{className:"bg-gradient-to-br from-green-500 to-blue-500 p-5 rounded-lg",children:[e.jsx(r.Title,{children:"📷 꽉 채우기 (Cover)"}),e.jsx(r.Description,{children:"이미지가 카드를 가득 채워서 시원해 보여요! 📐"})]})})]}),e.jsxs(r,{children:[e.jsx(r.Image,{src:"/images/miku-main.png",alt:"Miku",objectFit:"contain"}),e.jsx(r.Content,{className:"bg-slate-800",children:e.jsxs("div",{className:"bg-gradient-to-br from-purple-500 to-pink-500 p-5 rounded-lg",children:[e.jsx(r.Title,{children:"🖼️ 전체 보기 (Contain)"}),e.jsx(r.Description,{children:"이미지 전체가 잘리지 않고 다 보여요! 완벽주의자용 💫"})]})})]})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <FlipCard>
      <FlipCard.Image src="/images/miku-main.png" alt="Miku" />
      <FlipCard.Content className="bg-slate-800">
        <div className="bg-gradient-to-br from-pink-500 to-yellow-400 p-5 rounded-lg translate-z-24">
          <FlipCard.Title>✨ 미쿠의 하루</FlipCard.Title>
          <FlipCard.Description>오늘도 열심히 노래 연습을 하고 있어요! 미쿠리가 정말 예쁘죠? 💙</FlipCard.Description>
        </div>
      </FlipCard.Content>
    </FlipCard>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="min-h-screen flex justify-center items-center bg-gray-100 p-8">
      <FlipCard.Grid>
        {Array.from({
        length: 6
      }, (_, i) => <FlipCard key={i}>
            <FlipCard.Image src="/images/miku-main.png" alt="Miku" />
            <FlipCard.Content className="bg-slate-800">
              <div className="bg-gradient-to-br from-pink-500 to-yellow-400 p-5 rounded-lg">
                <FlipCard.Title>🎵 미쿠 카드 {i + 1}</FlipCard.Title>
                <FlipCard.Description>각각 다른 매력을 가진 미쿠의 모습들! 하나씩 마우스를 올려보세요 🌟</FlipCard.Description>
              </div>
            </FlipCard.Content>
          </FlipCard>)}
      </FlipCard.Grid>
    </div>
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <FlipCard>
      <FlipCard.Image src="/images/miku-main.png" alt="Miku" />
      <FlipCard.Content className="bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="p-5">
          <FlipCard.Title className="text-2xl font-bold mb-4">🎨 나만의 스타일</FlipCard.Title>
          <FlipCard.Description className="text-lg">원하는 색깔과 스타일로 자유롭게 꾸며보세요! 상상력이 곧 디자인이에요 🚀</FlipCard.Description>
        </div>
      </FlipCard.Content>
    </FlipCard>
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex gap-8 flex-wrap justify-center">
      <FlipCard>
        <FlipCard.Image src="/images/miku-main.png" alt="Miku" objectFit="cover" />
        <FlipCard.Content className="bg-slate-800">
          <div className="bg-gradient-to-br from-green-500 to-blue-500 p-5 rounded-lg">
            <FlipCard.Title>📷 꽉 채우기 (Cover)</FlipCard.Title>
            <FlipCard.Description>이미지가 카드를 가득 채워서 시원해 보여요! 📐</FlipCard.Description>
          </div>
        </FlipCard.Content>
      </FlipCard>

      <FlipCard>
        <FlipCard.Image src="/images/miku-main.png" alt="Miku" objectFit="contain" />
        <FlipCard.Content className="bg-slate-800">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-5 rounded-lg">
            <FlipCard.Title>🖼️ 전체 보기 (Contain)</FlipCard.Title>
            <FlipCard.Description>이미지 전체가 잘리지 않고 다 보여요! 완벽주의자용 💫</FlipCard.Description>
          </div>
        </FlipCard.Content>
      </FlipCard>
    </div>
}`,...l.parameters?.docs?.source}}};const j=["Default","Grid","CustomContent","ObjectFitVariations"];export{n as CustomContent,t as Default,i as Grid,l as ObjectFitVariations,j as __namedExportsOrder,F as default};
