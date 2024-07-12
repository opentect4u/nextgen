"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[8510],{8510:(t,e,a)=>{a.d(e,{A:()=>Q});var n=a(5043),c=a(8139),o=a.n(c),s=a(5296),l=a(8574);const i=t=>{const{prefixCls:e,className:a,style:c,size:s,shape:l}=t,i=o()({["".concat(e,"-lg")]:"large"===s,["".concat(e,"-sm")]:"small"===s}),r=o()({["".concat(e,"-circle")]:"circle"===l,["".concat(e,"-square")]:"square"===l,["".concat(e,"-round")]:"round"===l}),g=n.useMemo((()=>"number"===typeof s?{width:s,height:s,lineHeight:"".concat(s,"px")}:{}),[s]);return n.createElement("span",{className:o()(e,i,r,a),style:Object.assign(Object.assign({},g),c)})};var r=a(5734),g=a(4441),d=a(8365);const m=new r.Mo("ant-skeleton-loading",{"0%":{backgroundPosition:"100% 50%"},"100%":{backgroundPosition:"0 50%"}}),u=t=>({height:t,lineHeight:(0,r.zA)(t)}),b=t=>Object.assign({width:t},u(t)),h=t=>({background:t.skeletonLoadingBackground,backgroundSize:"400% 100%",animationName:m,animationDuration:t.skeletonLoadingMotionDuration,animationTimingFunction:"ease",animationIterationCount:"infinite"}),p=(t,e)=>Object.assign({width:e(t).mul(5).equal(),minWidth:e(t).mul(5).equal()},u(t)),C=t=>{const{skeletonAvatarCls:e,gradientFromColor:a,controlHeight:n,controlHeightLG:c,controlHeightSM:o}=t;return{["".concat(e)]:Object.assign({display:"inline-block",verticalAlign:"top",background:a},b(n)),["".concat(e).concat(e,"-circle")]:{borderRadius:"50%"},["".concat(e).concat(e,"-lg")]:Object.assign({},b(c)),["".concat(e).concat(e,"-sm")]:Object.assign({},b(o))}},k=t=>{const{controlHeight:e,borderRadiusSM:a,skeletonInputCls:n,controlHeightLG:c,controlHeightSM:o,gradientFromColor:s,calc:l}=t;return{["".concat(n)]:Object.assign({display:"inline-block",verticalAlign:"top",background:s,borderRadius:a},p(e,l)),["".concat(n,"-lg")]:Object.assign({},p(c,l)),["".concat(n,"-sm")]:Object.assign({},p(o,l))}},v=t=>Object.assign({width:t},u(t)),f=t=>{const{skeletonImageCls:e,imageSizeBase:a,gradientFromColor:n,borderRadiusSM:c,calc:o}=t;return{["".concat(e)]:Object.assign(Object.assign({display:"flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",background:n,borderRadius:c},v(o(a).mul(2).equal())),{["".concat(e,"-path")]:{fill:"#bfbfbf"},["".concat(e,"-svg")]:Object.assign(Object.assign({},v(a)),{maxWidth:o(a).mul(4).equal(),maxHeight:o(a).mul(4).equal()}),["".concat(e,"-svg").concat(e,"-svg-circle")]:{borderRadius:"50%"}}),["".concat(e).concat(e,"-circle")]:{borderRadius:"50%"}}},O=(t,e,a)=>{const{skeletonButtonCls:n}=t;return{["".concat(a).concat(n,"-circle")]:{width:e,minWidth:e,borderRadius:"50%"},["".concat(a).concat(n,"-round")]:{borderRadius:e}}},j=(t,e)=>Object.assign({width:e(t).mul(2).equal(),minWidth:e(t).mul(2).equal()},u(t)),w=t=>{const{borderRadiusSM:e,skeletonButtonCls:a,controlHeight:n,controlHeightLG:c,controlHeightSM:o,gradientFromColor:s,calc:l}=t;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({["".concat(a)]:Object.assign({display:"inline-block",verticalAlign:"top",background:s,borderRadius:e,width:l(n).mul(2).equal(),minWidth:l(n).mul(2).equal()},j(n,l))},O(t,n,a)),{["".concat(a,"-lg")]:Object.assign({},j(c,l))}),O(t,c,"".concat(a,"-lg"))),{["".concat(a,"-sm")]:Object.assign({},j(o,l))}),O(t,o,"".concat(a,"-sm")))},x=t=>{const{componentCls:e,skeletonAvatarCls:a,skeletonTitleCls:n,skeletonParagraphCls:c,skeletonButtonCls:o,skeletonInputCls:s,skeletonImageCls:l,controlHeight:i,controlHeightLG:r,controlHeightSM:g,gradientFromColor:d,padding:m,marginSM:u,borderRadius:p,titleHeight:v,blockRadius:O,paragraphLiHeight:j,controlHeightXS:x,paragraphMarginTop:N}=t;return{["".concat(e)]:{display:"table",width:"100%",["".concat(e,"-header")]:{display:"table-cell",paddingInlineEnd:m,verticalAlign:"top",["".concat(a)]:Object.assign({display:"inline-block",verticalAlign:"top",background:d},b(i)),["".concat(a,"-circle")]:{borderRadius:"50%"},["".concat(a,"-lg")]:Object.assign({},b(r)),["".concat(a,"-sm")]:Object.assign({},b(g))},["".concat(e,"-content")]:{display:"table-cell",width:"100%",verticalAlign:"top",["".concat(n)]:{width:"100%",height:v,background:d,borderRadius:O,["+ ".concat(c)]:{marginBlockStart:g}},["".concat(c)]:{padding:0,"> li":{width:"100%",height:j,listStyle:"none",background:d,borderRadius:O,"+ li":{marginBlockStart:x}}},["".concat(c,"> li:last-child:not(:first-child):not(:nth-child(2))")]:{width:"61%"}},["&-round ".concat(e,"-content")]:{["".concat(n,", ").concat(c," > li")]:{borderRadius:p}}},["".concat(e,"-with-avatar ").concat(e,"-content")]:{["".concat(n)]:{marginBlockStart:u,["+ ".concat(c)]:{marginBlockStart:N}}},["".concat(e).concat(e,"-element")]:Object.assign(Object.assign(Object.assign(Object.assign({display:"inline-block",width:"auto"},w(t)),C(t)),k(t)),f(t)),["".concat(e).concat(e,"-block")]:{width:"100%",["".concat(o)]:{width:"100%"},["".concat(s)]:{width:"100%"}},["".concat(e).concat(e,"-active")]:{["\n        ".concat(n,",\n        ").concat(c," > li,\n        ").concat(a,",\n        ").concat(o,",\n        ").concat(s,",\n        ").concat(l,"\n      ")]:Object.assign({},h(t))}}},N=(0,g.OF)("Skeleton",(t=>{const{componentCls:e,calc:a}=t,n=(0,d.h1)(t,{skeletonAvatarCls:"".concat(e,"-avatar"),skeletonTitleCls:"".concat(e,"-title"),skeletonParagraphCls:"".concat(e,"-paragraph"),skeletonButtonCls:"".concat(e,"-button"),skeletonInputCls:"".concat(e,"-input"),skeletonImageCls:"".concat(e,"-image"),imageSizeBase:a(t.controlHeight).mul(1.5).equal(),borderRadius:100,skeletonLoadingBackground:"linear-gradient(90deg, ".concat(t.gradientFromColor," 25%, ").concat(t.gradientToColor," 37%, ").concat(t.gradientFromColor," 63%)"),skeletonLoadingMotionDuration:"1.4s"});return[x(n)]}),(t=>{const{colorFillContent:e,colorFill:a}=t;return{color:e,colorGradientEnd:a,gradientFromColor:e,gradientToColor:a,titleHeight:t.controlHeight/2,blockRadius:t.borderRadiusSM,paragraphMarginTop:t.marginLG+t.marginXXS,paragraphLiHeight:t.controlHeight/2}}),{deprecatedTokens:[["color","gradientFromColor"],["colorGradientEnd","gradientToColor"]]}),y=t=>{const{prefixCls:e,className:a,rootClassName:c,active:r,shape:g="circle",size:d="default"}=t,{getPrefixCls:m}=n.useContext(s.QO),u=m("skeleton",e),[b,h,p]=N(u),C=(0,l.A)(t,["prefixCls","className"]),k=o()(u,"".concat(u,"-element"),{["".concat(u,"-active")]:r},a,c,h,p);return b(n.createElement("div",{className:k},n.createElement(i,Object.assign({prefixCls:"".concat(u,"-avatar"),shape:g,size:d},C))))},E=t=>{const{prefixCls:e,className:a,rootClassName:c,active:r,block:g=!1,size:d="default"}=t,{getPrefixCls:m}=n.useContext(s.QO),u=m("skeleton",e),[b,h,p]=N(u),C=(0,l.A)(t,["prefixCls"]),k=o()(u,"".concat(u,"-element"),{["".concat(u,"-active")]:r,["".concat(u,"-block")]:g},a,c,h,p);return b(n.createElement("div",{className:k},n.createElement(i,Object.assign({prefixCls:"".concat(u,"-button"),size:d},C))))},H=t=>{const{prefixCls:e,className:a,rootClassName:c,style:l,active:i}=t,{getPrefixCls:r}=n.useContext(s.QO),g=r("skeleton",e),[d,m,u]=N(g),b=o()(g,"".concat(g,"-element"),{["".concat(g,"-active")]:i},a,c,m,u);return d(n.createElement("div",{className:b},n.createElement("div",{className:o()("".concat(g,"-image"),a),style:l},n.createElement("svg",{viewBox:"0 0 1098 1024",xmlns:"http://www.w3.org/2000/svg",className:"".concat(g,"-image-svg")},n.createElement("title",null,"Image placeholder"),n.createElement("path",{d:"M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",className:"".concat(g,"-image-path")})))))},q=t=>{const{prefixCls:e,className:a,rootClassName:c,active:r,block:g,size:d="default"}=t,{getPrefixCls:m}=n.useContext(s.QO),u=m("skeleton",e),[b,h,p]=N(u),C=(0,l.A)(t,["prefixCls"]),k=o()(u,"".concat(u,"-element"),{["".concat(u,"-active")]:r,["".concat(u,"-block")]:g},a,c,h,p);return b(n.createElement("div",{className:k},n.createElement(i,Object.assign({prefixCls:"".concat(u,"-input"),size:d},C))))};var z=a(8168);const A={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM288 604a64 64 0 10128 0 64 64 0 10-128 0zm118-224a48 48 0 1096 0 48 48 0 10-96 0zm158 228a96 96 0 10192 0 96 96 0 10-192 0zm148-314a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"dot-chart",theme:"outlined"};var M=a(2172),R=function(t,e){return n.createElement(M.A,(0,z.A)({},t,{ref:e,icon:A}))};const S=n.forwardRef(R),B=t=>{const{prefixCls:e,className:a,rootClassName:c,style:l,active:i,children:r}=t,{getPrefixCls:g}=n.useContext(s.QO),d=g("skeleton",e),[m,u,b]=N(d),h=o()(d,"".concat(d,"-element"),{["".concat(d,"-active")]:i},u,a,c,b),p=null!==r&&void 0!==r?r:n.createElement(S,null);return m(n.createElement("div",{className:h},n.createElement("div",{className:o()("".concat(d,"-image"),a),style:l},p)))};var F=a(436);const I=(t,e)=>{const{width:a,rows:n=2}=e;return Array.isArray(a)?a[t]:n-1===t?a:void 0},L=t=>{const{prefixCls:e,className:a,style:c,rows:s}=t,l=(0,F.A)(Array(s)).map(((e,a)=>n.createElement("li",{key:a,style:{width:I(a,t)}})));return n.createElement("ul",{className:o()(e,a),style:c},l)},P=t=>{let{prefixCls:e,className:a,width:c,style:s}=t;return n.createElement("h3",{className:o()(e,a),style:Object.assign({width:c},s)})};function T(t){return t&&"object"===typeof t?t:{}}const G=t=>{const{prefixCls:e,loading:a,className:c,rootClassName:l,style:r,children:g,avatar:d=!1,title:m=!0,paragraph:u=!0,active:b,round:h}=t,{getPrefixCls:p,direction:C,skeleton:k}=n.useContext(s.QO),v=p("skeleton",e),[f,O,j]=N(v);if(a||!("loading"in t)){const t=!!d,e=!!m,a=!!u;let s,g;if(t){const t=Object.assign(Object.assign({prefixCls:"".concat(v,"-avatar")},function(t,e){return t&&!e?{size:"large",shape:"square"}:{size:"large",shape:"circle"}}(e,a)),T(d));s=n.createElement("div",{className:"".concat(v,"-header")},n.createElement(i,Object.assign({},t)))}if(e||a){let c,o;if(e){const e=Object.assign(Object.assign({prefixCls:"".concat(v,"-title")},function(t,e){return!t&&e?{width:"38%"}:t&&e?{width:"50%"}:{}}(t,a)),T(m));c=n.createElement(P,Object.assign({},e))}if(a){const a=Object.assign(Object.assign({prefixCls:"".concat(v,"-paragraph")},function(t,e){const a={};return t&&e||(a.width="61%"),a.rows=!t&&e?3:2,a}(t,e)),T(u));o=n.createElement(L,Object.assign({},a))}g=n.createElement("div",{className:"".concat(v,"-content")},c,o)}const p=o()(v,{["".concat(v,"-with-avatar")]:t,["".concat(v,"-active")]:b,["".concat(v,"-rtl")]:"rtl"===C,["".concat(v,"-round")]:h},null===k||void 0===k?void 0:k.className,c,l,O,j);return f(n.createElement("div",{className:p,style:Object.assign(Object.assign({},null===k||void 0===k?void 0:k.style),r)},s,g))}return null!==g&&void 0!==g?g:null};G.Button=E,G.Avatar=y,G.Input=q,G.Image=H,G.Node=B;const Q=G}}]);
//# sourceMappingURL=8510.373fe251.chunk.js.map