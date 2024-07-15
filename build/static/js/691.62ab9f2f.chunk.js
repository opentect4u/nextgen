"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[691],{4320:(e,t,n)=>{n.d(t,{Ay:()=>i,ko:()=>s});var o=n(5043),c=n(167);const a=["xxl","xl","lg","md","sm","xs"],l=e=>({xs:"(max-width: ".concat(e.screenXSMax,"px)"),sm:"(min-width: ".concat(e.screenSM,"px)"),md:"(min-width: ".concat(e.screenMD,"px)"),lg:"(min-width: ".concat(e.screenLG,"px)"),xl:"(min-width: ".concat(e.screenXL,"px)"),xxl:"(min-width: ".concat(e.screenXXL,"px)")}),r=e=>{const t=e,n=[].concat(a).reverse();return n.forEach(((e,o)=>{const c=e.toUpperCase(),a="screen".concat(c,"Min"),l="screen".concat(c);if(!(t[a]<=t[l]))throw new Error("".concat(a,"<=").concat(l," fails : !(").concat(t[a],"<=").concat(t[l],")"));if(o<n.length-1){const e="screen".concat(c,"Max");if(!(t[l]<=t[e]))throw new Error("".concat(l,"<=").concat(e," fails : !(").concat(t[l],"<=").concat(t[e],")"));const a=n[o+1].toUpperCase(),r="screen".concat(a,"Min");if(!(t[e]<=t[r]))throw new Error("".concat(e,"<=").concat(r," fails : !(").concat(t[e],"<=").concat(t[r],")"))}})),e};function i(){const[,e]=(0,c.Ay)(),t=l(r(e));return o.useMemo((()=>{const e=new Map;let n=-1,o={};return{matchHandlers:{},dispatch:t=>(o=t,e.forEach((e=>e(o))),e.size>=1),subscribe(t){return e.size||this.register(),n+=1,e.set(n,t),t(o),n},unsubscribe(t){e.delete(t),e.size||this.unregister()},unregister(){Object.keys(t).forEach((e=>{const n=t[e],o=this.matchHandlers[n];null===o||void 0===o||o.mql.removeListener(null===o||void 0===o?void 0:o.listener)})),e.clear()},register(){Object.keys(t).forEach((e=>{const n=t[e],c=t=>{let{matches:n}=t;this.dispatch(Object.assign(Object.assign({},o),{[e]:n}))},a=window.matchMedia(n);a.addListener(c),this.matchHandlers[n]={mql:a,listener:c},c(a)}))},responsiveMap:t}}),[e])}const s=(e,t)=>{if(t&&"object"===typeof t)for(let n=0;n<a.length;n++){const o=a[n];if(e[o]&&void 0!==t[o])return t[o]}}},691:(e,t,n)=>{n.d(t,{A:()=>A});var o=n(5043),c=n(8139),a=n.n(c),l=n(4320),r=n(5296),i=n(9122),s=n(370);const d={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1},m=o.createContext({});var p=n(2149),b=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(o=Object.getOwnPropertySymbols(e);c<o.length;c++)t.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]])}return n};function g(e,t,n){const c=o.useMemo((()=>{return t||(e=n,(0,p.A)(e).map((e=>Object.assign(Object.assign({},null===e||void 0===e?void 0:e.props),{key:e.key}))));var e}),[t,n]);return o.useMemo((()=>c.map((t=>{var{span:n}=t,o=b(t,["span"]);return Object.assign(Object.assign({},o),{span:"number"===typeof n?n:(0,l.ko)(e,n)})}))),[c,e])}function u(e,t,n){let o=e,c=!1;return(void 0===n||n>t)&&(o=Object.assign(Object.assign({},e),{span:t}),c=void 0!==n),[o,c]}const y=(e,t)=>{const[n,c]=(0,o.useMemo)((()=>function(e,t){const n=[];let o=[],c=t,a=!1;return e.filter((e=>e)).forEach(((l,r)=>{const i=null===l||void 0===l?void 0:l.span,s=i||1;if(r===e.length-1){const[e,t]=u(l,c,i);return a=a||t,o.push(e),void n.push(o)}if(s<c)c-=s,o.push(l);else{const[e,r]=u(l,c,s);a=a||r,o.push(e),n.push(o),c=t,o=[]}})),[n,a]}(t,e)),[t,e]);return n},f=e=>{let{children:t}=e;return t};function h(e){return void 0!==e&&null!==e}const x=e=>{const{itemPrefixCls:t,component:n,span:c,className:l,style:r,labelStyle:i,contentStyle:s,bordered:d,label:m,content:p,colon:b,type:g}=e,u=n;return d?o.createElement(u,{className:a()({["".concat(t,"-item-label")]:"label"===g,["".concat(t,"-item-content")]:"content"===g},l),style:r,colSpan:c},h(m)&&o.createElement("span",{style:i},m),h(p)&&o.createElement("span",{style:s},p)):o.createElement(u,{className:a()("".concat(t,"-item"),l),style:r,colSpan:c},o.createElement("div",{className:"".concat(t,"-item-container")},(m||0===m)&&o.createElement("span",{className:a()("".concat(t,"-item-label"),{["".concat(t,"-item-no-colon")]:!b}),style:i},m),(p||0===p)&&o.createElement("span",{className:a()("".concat(t,"-item-content")),style:s},p)))};function v(e,t,n){let{colon:c,prefixCls:a,bordered:l}=t,{component:r,type:i,showLabel:s,showContent:d,labelStyle:m,contentStyle:p}=n;return e.map(((e,t)=>{let{label:n,children:b,prefixCls:g=a,className:u,style:y,labelStyle:f,contentStyle:h,span:v=1,key:O}=e;return"string"===typeof r?o.createElement(x,{key:"".concat(i,"-").concat(O||t),className:u,style:y,labelStyle:Object.assign(Object.assign({},m),f),contentStyle:Object.assign(Object.assign({},p),h),span:v,colon:c,component:r,itemPrefixCls:g,bordered:l,label:s?n:null,content:d?b:null,type:i}):[o.createElement(x,{key:"label-".concat(O||t),className:u,style:Object.assign(Object.assign(Object.assign({},m),y),f),span:1,colon:c,component:r[0],itemPrefixCls:g,bordered:l,label:n,type:"label"}),o.createElement(x,{key:"content-".concat(O||t),className:u,style:Object.assign(Object.assign(Object.assign({},p),y),h),span:2*v-1,component:r[1],itemPrefixCls:g,bordered:l,content:b,type:"content"})]}))}const O=e=>{const t=o.useContext(m),{prefixCls:n,vertical:c,row:a,index:l,bordered:r}=e;return c?o.createElement(o.Fragment,null,o.createElement("tr",{key:"label-".concat(l),className:"".concat(n,"-row")},v(a,e,Object.assign({component:"th",type:"label",showLabel:!0},t))),o.createElement("tr",{key:"content-".concat(l),className:"".concat(n,"-row")},v(a,e,Object.assign({component:"td",type:"content",showContent:!0},t)))):o.createElement("tr",{key:l,className:"".concat(n,"-row")},v(a,e,Object.assign({component:r?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},t)))};var w=n(5734),S=n(4414),j=n(4441),E=n(8365);const C=e=>{const{componentCls:t,labelBg:n}=e;return{["&".concat(t,"-bordered")]:{["> ".concat(t,"-view")]:{border:"".concat((0,w.zA)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit),"> table":{tableLayout:"auto"},["".concat(t,"-row")]:{borderBottom:"".concat((0,w.zA)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderBottom:"none"},["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat((0,w.zA)(e.padding)," ").concat((0,w.zA)(e.paddingLG)),borderInlineEnd:"".concat((0,w.zA)(e.lineWidth)," ").concat(e.lineType," ").concat(e.colorSplit),"&:last-child":{borderInlineEnd:"none"}},["> ".concat(t,"-item-label")]:{color:e.colorTextSecondary,backgroundColor:n,"&::after":{display:"none"}}}},["&".concat(t,"-middle")]:{["".concat(t,"-row")]:{["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat((0,w.zA)(e.paddingSM)," ").concat((0,w.zA)(e.paddingLG))}}},["&".concat(t,"-small")]:{["".concat(t,"-row")]:{["> ".concat(t,"-item-label, > ").concat(t,"-item-content")]:{padding:"".concat((0,w.zA)(e.paddingXS)," ").concat((0,w.zA)(e.padding))}}}}}},z=(0,j.OF)("Descriptions",(e=>(e=>{const{componentCls:t,extraColor:n,itemPaddingBottom:o,colonMarginRight:c,colonMarginLeft:a,titleMarginBottom:l}=e;return{[t]:Object.assign(Object.assign(Object.assign({},(0,S.dF)(e)),C(e)),{"&-rtl":{direction:"rtl"},["".concat(t,"-header")]:{display:"flex",alignItems:"center",marginBottom:l},["".concat(t,"-title")]:Object.assign(Object.assign({},S.L9),{flex:"auto",color:e.titleColor,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG}),["".concat(t,"-extra")]:{marginInlineStart:"auto",color:n,fontSize:e.fontSize},["".concat(t,"-view")]:{width:"100%",borderRadius:e.borderRadiusLG,table:{width:"100%",tableLayout:"fixed",borderCollapse:"collapse"}},["".concat(t,"-row")]:{"> th, > td":{paddingBottom:o},"&:last-child":{borderBottom:"none"}},["".concat(t,"-item-label")]:{color:e.colorTextTertiary,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"start","&::after":{content:'":"',position:"relative",top:-.5,marginInline:"".concat((0,w.zA)(a)," ").concat((0,w.zA)(c))},["&".concat(t,"-item-no-colon::after")]:{content:'""'}},["".concat(t,"-item-no-label")]:{"&::after":{margin:0,content:'""'}},["".concat(t,"-item-content")]:{display:"table-cell",flex:1,color:e.contentColor,fontSize:e.fontSize,lineHeight:e.lineHeight,wordBreak:"break-word",overflowWrap:"break-word"},["".concat(t,"-item")]:{paddingBottom:0,verticalAlign:"top","&-container":{display:"flex",["".concat(t,"-item-label")]:{display:"inline-flex",alignItems:"baseline"},["".concat(t,"-item-content")]:{display:"inline-flex",alignItems:"baseline"}}},"&-middle":{["".concat(t,"-row")]:{"> th, > td":{paddingBottom:e.paddingSM}}},"&-small":{["".concat(t,"-row")]:{"> th, > td":{paddingBottom:e.paddingXS}}}})}})((0,E.h1)(e,{}))),(e=>({labelBg:e.colorFillAlter,titleColor:e.colorText,titleMarginBottom:e.fontSizeSM*e.lineHeightSM,itemPaddingBottom:e.padding,colonMarginRight:e.marginXS,colonMarginLeft:e.marginXXS/2,contentColor:e.colorText,extraColor:e.colorText})));var M=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(o=Object.getOwnPropertySymbols(e);c<o.length;c++)t.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]])}return n};const k=e=>{const{prefixCls:t,title:n,extra:c,column:p,colon:b=!0,bordered:u,layout:f,children:h,className:x,rootClassName:v,style:w,size:S,labelStyle:j,contentStyle:E,items:C}=e,k=M(e,["prefixCls","title","extra","column","colon","bordered","layout","children","className","rootClassName","style","size","labelStyle","contentStyle","items"]),{getPrefixCls:A,direction:N,descriptions:L}=o.useContext(r.QO),B=A("descriptions",t),P=(0,s.A)(),H=o.useMemo((()=>{var e;return"number"===typeof p?p:null!==(e=(0,l.ko)(P,Object.assign(Object.assign({},d),p)))&&void 0!==e?e:3}),[P,p]),I=g(P,C,h),T=(0,i.A)(S),X=y(H,I),[W,G,R]=z(B),F=o.useMemo((()=>({labelStyle:j,contentStyle:E})),[j,E]);return W(o.createElement(m.Provider,{value:F},o.createElement("div",Object.assign({className:a()(B,null===L||void 0===L?void 0:L.className,{["".concat(B,"-").concat(T)]:T&&"default"!==T,["".concat(B,"-bordered")]:!!u,["".concat(B,"-rtl")]:"rtl"===N},x,v,G,R),style:Object.assign(Object.assign({},null===L||void 0===L?void 0:L.style),w)},k),(n||c)&&o.createElement("div",{className:"".concat(B,"-header")},n&&o.createElement("div",{className:"".concat(B,"-title")},n),c&&o.createElement("div",{className:"".concat(B,"-extra")},c)),o.createElement("div",{className:"".concat(B,"-view")},o.createElement("table",null,o.createElement("tbody",null,X.map(((e,t)=>o.createElement(O,{key:t,index:t,colon:b,prefixCls:B,vertical:"vertical"===f,bordered:u,row:e})))))))))};k.Item=f;const A=k},370:(e,t,n)=>{n.d(t,{A:()=>l});var o=n(5043),c=n(2664);var a=n(4320);const l=function(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];const t=(0,o.useRef)({}),n=function(){const[,e]=o.useReducer((e=>e+1),0);return e}(),l=(0,a.Ay)();return(0,c.A)((()=>{const o=l.subscribe((o=>{t.current=o,e&&n()}));return()=>l.unsubscribe(o)}),[]),t.current}}}]);
//# sourceMappingURL=691.62ab9f2f.chunk.js.map