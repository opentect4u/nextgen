"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[8201,3501],{6460:(e,n,t)=>{t.d(n,{A:()=>d});t(5043);var a=t(3216),o=t(2167),c=t(9120),i=t(9938),r=t(880),l=t(579);const d=function(){const e=(0,a.Zp)();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.A,{icon:(0,l.jsx)(c.A,{}),className:"sm:hidden",onClick:()=>e(-1),type:"primary",style:{right:24,bottom:80}}),(0,l.jsx)(r.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.3,type:"just"},className:"hidden sm:flex sm:justify-end items-center",children:(0,l.jsx)(o.A,{title:"Back",children:(0,l.jsx)("button",{className:" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-green-900 bg-primary-700 h-9 w-9  bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",onClick:()=>e(-1),children:(0,l.jsx)(c.A,{})})})})]})}},8834:(e,n,t)=>{t.d(n,{A:()=>r});t(5043);var a=t(617),o=t(1966),c=t(8143),i=t(579);const r=function(e){let{onReset:n,mode:t,onDelete:r}=e;return(0,i.jsxs)("div",{className:"flex justify-center",children:["A"==t&&(0,i.jsxs)("button",{type:"reset",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900",onClick:n,children:[(0,i.jsx)(a.A,{className:"mr-2"}),"Reset"]}),"E"==t&&(0,i.jsxs)("button",{type:"button",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900",onClick:r,children:[(0,i.jsx)(o.A,{className:"mr-2"}),"Delete"]}),(0,i.jsxs)("button",{type:"submit",className:" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600",children:[(0,i.jsx)(c.A,{className:"mr-2"}),"Submit"]})]})}},2141:(e,n,t)=>{t.d(n,{A:()=>r});t(5043);var a=t(6460),o=t(880),c=t(1581),i=t(579);const r=function(e){let{text:n,mode:t,data:r,title:l}=e;return(0,i.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5",children:(0,i.jsxs)("div",{className:"flex flex-col bg-green-900 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-1.5",children:[(0,i.jsx)(o.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.2,type:"just"},className:"text-xl font-semibold text-white my-1  dark:text-gray-400 ",children:n}),(0,i.jsxs)("div",{className:"flex justify-end items-center gap-3",children:[(0,i.jsx)(a.A,{}),1==t&&(0,i.jsx)(c.A,{toPrint:r,title:l})]})]})})}},1581:(e,n,t)=>{t.d(n,{A:()=>h});t(5043);var a=t(2167),o=t(4834),c=t(9938),i=t(691),r=t(579);const l=function(e){let{printData:n,title:t}=e;return console.log(n),(0,r.jsx)("div",{className:"mt-5",children:(0,r.jsx)(i.A,{title:t,items:n})})},d={created_by:"Created By",created_at:"Created At",modified_by:"Modified By",modified_at:"Modified At",catg_name:"Category Name",sl_no:"ID",desig_name:"Designation",unit_name:"Unit",dept_name:"Department",prod_name:"Product",prod_cat:"Category",prod_make:"Make",part_no:"Part No.",model_no:"Model No.",article_no:"Article No.",hsn_code:"HSN Code",stk_cnt:"Stock",prod_desc:"Description"};var s=t(3286);const m=function(){return(0,r.jsxs)("div",{className:"flex justify-center my-5 mb-5",children:[(0,r.jsx)("img",{src:s,className:"sm:h-14 h-9",alt:"Flowbite Logo"}),(0,r.jsx)("h2",{className:"mb-4 text-xl font-bold text-[#22543d]  dark:text-gray-400 ",children:"NextGen Automation Pvt Ltd"}),(0,r.jsx)("span",{className:"my-5 mb-5",children:"Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046 Ph-033 4068 6032/6450 0535 Email: info@ngapl.com"})]})};var u=t(880);const h=function(e){let{toPrint:n,title:t}=e;console.log(n);var i=[];for(let a of Object.keys(n))"serial_number"!=a&&i.push({key:a,label:d[a]+" - ",children:n[a]});function s(){var e=document.getElementById("tablePrint"),n=window.open("","Print-Window");n.document.open(),n.document.writeln("<!DOCTYPE html>"),n.document.writeln('<html><head><title></title><style type="text/css">'),n.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),n.document.writeln('</head><body onload="window.print()">'),n.document.writeln(e.innerHTML),n.document.writeln("</body></html>"),n.document.close(),setTimeout((function(){n.close()}),10)}return(0,r.jsxs)(u.P.div,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.5,type:"just"},children:[(0,r.jsx)(c.A,{icon:(0,r.jsx)(o.A,{}),onClick:()=>s(),className:"sm:hidden",type:"primary",style:{right:24,bottom:80}}),(0,r.jsx)(a.A,{title:"Print",children:(0,r.jsx)("button",{onClick:()=>s(),className:" inline-flex items-center justify-center mr-4 sm:-mr-1  text-sm font-medium text-center text-green-900 bg-primary-700 h-9 w-9 -mt-1 bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900  dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",children:(0,r.jsx)(o.A,{})})}),(0,r.jsxs)("div",{className:"hidden justify-center",id:"tablePrint",children:[(0,r.jsx)(m,{}),(0,r.jsx)(l,{className:"mt-5",title:t,printData:i})]})]})}},8414:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});var a=t(5043),o=t(3216),c=(t(6460),t(2624)),i=t(8834),r=t(7548),l=t(2141),d=t(579);const s=function(){const e=(0,o.g)();console.log(e,"params");const[n,t]=(0,a.useState)(!1);return(0,d.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,d.jsxs)("div",{className:"py-8 mx-auto w-5/6 lg:py-16",children:[(0,d.jsx)(l.A,{text:e.id>0?"Update order":"Add order"}),(0,d.jsxs)("form",{action:"#",children:[(0,d.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,d.jsxs)("div",{className:"sm:col-span-2",children:[(0,d.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Client Name"}),(0,d.jsx)(r.A,{showSearch:!0,className:"bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ",placeholder:"Select a client",optionFilterProp:"label",size:"large",options:[{value:"1",label:"L&T"},{value:"AL",label:"Ashok Leyland"}]})]}),(0,d.jsxs)("div",{className:"sm:col-span-2",children:[(0,d.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Project Name"}),(0,d.jsx)(r.A,{showSearch:!0,className:"bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ",placeholder:"Select a project",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select Project"},{value:"D",label:"DOLVI"},{value:"PM",label:"A/C BEUMER_JPPL"}]})]}),(0,d.jsxs)("div",{className:"sm:col-span-2",children:[(0,d.jsx)("label",{for:"brand",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Client Order No."}),(0,d.jsx)("input",{type:"text",name:"brand",id:"brand",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"0000000",required:""})]}),(0,d.jsxs)("div",{className:"sm:col-span-1 flex justify-start",children:[(0,d.jsx)("label",{for:"brand",className:"block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white",children:"Cost waiver?"}),(0,d.jsx)(c.A,{size:"large",value:n,onChange:e=>t(e),defaultChecked:!0})]}),!n&&(0,d.jsxs)("div",{className:"sm:col-span-2 ",children:[(0,d.jsx)("label",{for:"name",className:"block mb-2 mr- 4 text-sm font-medium text-gray-900 dark:text-white",children:"Cost to be negotiated by"}),(0,d.jsx)(r.A,{showSearch:!0,className:"w-full",optionFilterProp:"label",size:"large",options:[{value:"AD",label:"Admin"},{value:"PM",label:"Project Manager"},{value:"WM",label:"Warehouse Manager"},{value:"GU",label:"General User"}]})]})]}),(0,d.jsx)(i.A,{})]})]})})}},1966:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(8168),o=t(5043);const c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"};var i=t(2172),r=function(e,n){return o.createElement(i.A,(0,a.A)({},e,{ref:n,icon:c}))};const l=o.forwardRef(r)},617:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(8168),o=t(5043);const c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"};var i=t(2172),r=function(e,n){return o.createElement(i.A,(0,a.A)({},e,{ref:n,icon:c}))};const l=o.forwardRef(r)},8143:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(8168),o=t(5043);const c={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"};var i=t(2172),r=function(e,n){return o.createElement(i.A,(0,a.A)({},e,{ref:n,icon:c}))};const l=o.forwardRef(r)},2624:(e,n,t)=>{t.d(n,{A:()=>O});var a=t(5043),o=t(164),c=t(8139),i=t.n(c),r=t(8168),l=t(4467),d=t(5544),s=t(45),m=t(8678),u=t(5001),h=["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"],g=a.forwardRef((function(e,n){var t,o=e.prefixCls,c=void 0===o?"rc-switch":o,g=e.className,p=e.checked,b=e.defaultChecked,f=e.disabled,x=e.loadingIcon,y=e.checkedChildren,k=e.unCheckedChildren,v=e.onClick,w=e.onChange,S=e.onKeyDown,j=(0,s.A)(e,h),C=(0,m.A)(!1,{value:p,defaultValue:b}),A=(0,d.A)(C,2),N=A[0],M=A[1];function I(e,n){var t=N;return f||(M(t=e),null===w||void 0===w||w(t,n)),t}var E=i()(c,g,(t={},(0,l.A)(t,"".concat(c,"-checked"),N),(0,l.A)(t,"".concat(c,"-disabled"),f),t));return a.createElement("button",(0,r.A)({},j,{type:"button",role:"switch","aria-checked":N,disabled:f,className:E,ref:n,onKeyDown:function(e){e.which===u.A.LEFT?I(!1,e):e.which===u.A.RIGHT&&I(!0,e),null===S||void 0===S||S(e)},onClick:function(e){var n=I(!N,e);null===v||void 0===v||v(n,e)}}),x,a.createElement("span",{className:"".concat(c,"-inner")},a.createElement("span",{className:"".concat(c,"-inner-checked")},y),a.createElement("span",{className:"".concat(c,"-inner-unchecked")},k)))}));g.displayName="Switch";const p=g;var b=t(610),f=t(5296),x=t(8440),y=t(9122),k=t(5734),v=t(97),w=t(4414),S=t(4441),j=t(8365);const C=e=>{const{componentCls:n,trackHeightSM:t,trackPadding:a,trackMinWidthSM:o,innerMinMarginSM:c,innerMaxMarginSM:i,handleSizeSM:r,calc:l}=e,d="".concat(n,"-inner"),s=(0,k.zA)(l(r).add(l(a).mul(2)).equal()),m=(0,k.zA)(l(i).mul(2).equal());return{[n]:{["&".concat(n,"-small")]:{minWidth:o,height:t,lineHeight:(0,k.zA)(t),["".concat(n,"-inner")]:{paddingInlineStart:i,paddingInlineEnd:c,["".concat(d,"-checked, ").concat(d,"-unchecked")]:{minHeight:t},["".concat(d,"-checked")]:{marginInlineStart:"calc(-100% + ".concat(s," - ").concat(m,")"),marginInlineEnd:"calc(100% - ".concat(s," + ").concat(m,")")},["".concat(d,"-unchecked")]:{marginTop:l(t).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},["".concat(n,"-handle")]:{width:r,height:r},["".concat(n,"-loading-icon")]:{top:l(l(r).sub(e.switchLoadingIconSize)).div(2).equal(),fontSize:e.switchLoadingIconSize},["&".concat(n,"-checked")]:{["".concat(n,"-inner")]:{paddingInlineStart:c,paddingInlineEnd:i,["".concat(d,"-checked")]:{marginInlineStart:0,marginInlineEnd:0},["".concat(d,"-unchecked")]:{marginInlineStart:"calc(100% - ".concat(s," + ").concat(m,")"),marginInlineEnd:"calc(-100% + ".concat(s," - ").concat(m,")")}},["".concat(n,"-handle")]:{insetInlineStart:"calc(100% - ".concat((0,k.zA)(l(r).add(a).equal()),")")}},["&:not(".concat(n,"-disabled):active")]:{["&:not(".concat(n,"-checked) ").concat(d)]:{["".concat(d,"-unchecked")]:{marginInlineStart:l(e.marginXXS).div(2).equal(),marginInlineEnd:l(e.marginXXS).mul(-1).div(2).equal()}},["&".concat(n,"-checked ").concat(d)]:{["".concat(d,"-checked")]:{marginInlineStart:l(e.marginXXS).mul(-1).div(2).equal(),marginInlineEnd:l(e.marginXXS).div(2).equal()}}}}}}},A=e=>{const{componentCls:n,handleSize:t,calc:a}=e;return{[n]:{["".concat(n,"-loading-icon").concat(e.iconCls)]:{position:"relative",top:a(a(t).sub(e.fontSize)).div(2).equal(),color:e.switchLoadingIconColor,verticalAlign:"top"},["&".concat(n,"-checked ").concat(n,"-loading-icon")]:{color:e.switchColor}}}},N=e=>{const{componentCls:n,trackPadding:t,handleBg:a,handleShadow:o,handleSize:c,calc:i}=e,r="".concat(n,"-handle");return{[n]:{[r]:{position:"absolute",top:t,insetInlineStart:t,width:c,height:c,transition:"all ".concat(e.switchDuration," ease-in-out"),"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:a,borderRadius:i(c).div(2).equal(),boxShadow:o,transition:"all ".concat(e.switchDuration," ease-in-out"),content:'""'}},["&".concat(n,"-checked ").concat(r)]:{insetInlineStart:"calc(100% - ".concat((0,k.zA)(i(c).add(t).equal()),")")},["&:not(".concat(n,"-disabled):active")]:{["".concat(r,"::before")]:{insetInlineEnd:e.switchHandleActiveInset,insetInlineStart:0},["&".concat(n,"-checked ").concat(r,"::before")]:{insetInlineEnd:0,insetInlineStart:e.switchHandleActiveInset}}}}},M=e=>{const{componentCls:n,trackHeight:t,trackPadding:a,innerMinMargin:o,innerMaxMargin:c,handleSize:i,calc:r}=e,l="".concat(n,"-inner"),d=(0,k.zA)(r(i).add(r(a).mul(2)).equal()),s=(0,k.zA)(r(c).mul(2).equal());return{[n]:{[l]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:c,paddingInlineEnd:o,transition:"padding-inline-start ".concat(e.switchDuration," ease-in-out, padding-inline-end ").concat(e.switchDuration," ease-in-out"),["".concat(l,"-checked, ").concat(l,"-unchecked")]:{display:"block",color:e.colorTextLightSolid,fontSize:e.fontSizeSM,transition:"margin-inline-start ".concat(e.switchDuration," ease-in-out, margin-inline-end ").concat(e.switchDuration," ease-in-out"),pointerEvents:"none",minHeight:t},["".concat(l,"-checked")]:{marginInlineStart:"calc(-100% + ".concat(d," - ").concat(s,")"),marginInlineEnd:"calc(100% - ".concat(d," + ").concat(s,")")},["".concat(l,"-unchecked")]:{marginTop:r(t).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},["&".concat(n,"-checked ").concat(l)]:{paddingInlineStart:o,paddingInlineEnd:c,["".concat(l,"-checked")]:{marginInlineStart:0,marginInlineEnd:0},["".concat(l,"-unchecked")]:{marginInlineStart:"calc(100% - ".concat(d," + ").concat(s,")"),marginInlineEnd:"calc(-100% + ".concat(d," - ").concat(s,")")}},["&:not(".concat(n,"-disabled):active")]:{["&:not(".concat(n,"-checked) ").concat(l)]:{["".concat(l,"-unchecked")]:{marginInlineStart:r(a).mul(2).equal(),marginInlineEnd:r(a).mul(-1).mul(2).equal()}},["&".concat(n,"-checked ").concat(l)]:{["".concat(l,"-checked")]:{marginInlineStart:r(a).mul(-1).mul(2).equal(),marginInlineEnd:r(a).mul(2).equal()}}}}}},I=e=>{const{componentCls:n,trackHeight:t,trackMinWidth:a}=e;return{[n]:Object.assign(Object.assign(Object.assign(Object.assign({},(0,w.dF)(e)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:a,height:t,lineHeight:"".concat((0,k.zA)(t)),verticalAlign:"middle",background:e.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:"all ".concat(e.motionDurationMid),userSelect:"none",["&:hover:not(".concat(n,"-disabled)")]:{background:e.colorTextTertiary}}),(0,w.K8)(e)),{["&".concat(n,"-checked")]:{background:e.switchColor,["&:hover:not(".concat(n,"-disabled)")]:{background:e.colorPrimaryHover}},["&".concat(n,"-loading, &").concat(n,"-disabled")]:{cursor:"not-allowed",opacity:e.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},["&".concat(n,"-rtl")]:{direction:"rtl"}})}},E=(0,S.OF)("Switch",(e=>{const n=(0,j.h1)(e,{switchDuration:e.motionDurationMid,switchColor:e.colorPrimary,switchDisabledOpacity:e.opacityLoading,switchLoadingIconSize:e.calc(e.fontSizeIcon).mul(.75).equal(),switchLoadingIconColor:"rgba(0, 0, 0, ".concat(e.opacityLoading,")"),switchHandleActiveInset:"-30%"});return[I(n),M(n),N(n),A(n),C(n)]}),(e=>{const{fontSize:n,lineHeight:t,controlHeight:a,colorWhite:o}=e,c=n*t,i=a/2,r=c-4,l=i-4;return{trackHeight:c,trackHeightSM:i,trackMinWidth:2*r+8,trackMinWidthSM:2*l+4,trackPadding:2,handleBg:o,handleSize:r,handleSizeSM:l,handleShadow:"0 2px 4px 0 ".concat(new v.q("#00230b").setAlpha(.2).toRgbString()),innerMinMargin:r/2,innerMaxMargin:r+2+4,innerMinMarginSM:l/2,innerMaxMarginSM:l+2+4}}));var P=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)n.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(t[a[o]]=e[a[o]])}return t};const z=a.forwardRef(((e,n)=>{const{prefixCls:t,size:c,disabled:r,loading:l,className:d,rootClassName:s,style:u,checked:h,value:g,defaultChecked:k,defaultValue:v,onChange:w}=e,S=P(e,["prefixCls","size","disabled","loading","className","rootClassName","style","checked","value","defaultChecked","defaultValue","onChange"]),[j,C]=(0,m.A)(!1,{value:null!==h&&void 0!==h?h:g,defaultValue:null!==k&&void 0!==k?k:v}),{getPrefixCls:A,direction:N,switch:M}=a.useContext(f.QO),I=a.useContext(x.A),z=(null!==r&&void 0!==r?r:I)||l,D=A("switch",t),O=a.createElement("div",{className:"".concat(D,"-handle")},l&&a.createElement(o.A,{className:"".concat(D,"-loading-icon")})),[L,H,T]=E(D),q=(0,y.A)(c),_=i()(null===M||void 0===M?void 0:M.className,{["".concat(D,"-small")]:"small"===q,["".concat(D,"-loading")]:l,["".concat(D,"-rtl")]:"rtl"===N},d,s,H,T),R=Object.assign(Object.assign({},null===M||void 0===M?void 0:M.style),u);return L(a.createElement(b.A,{component:"Switch"},a.createElement(p,Object.assign({},S,{checked:j,onChange:function(){C(arguments.length<=0?void 0:arguments[0]),null===w||void 0===w||w.apply(void 0,arguments)},prefixCls:D,className:_,style:R,disabled:z,ref:n,loadingIcon:O}))))})),D=z;D.__ANT_SWITCH=!0;const O=D},8060:(e,n,t)=>{t.d(n,{A:()=>l});var a=t(9379),o="".concat("accept acceptCharset accessKey action allowFullScreen allowTransparency\n    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge\n    charSet checked classID className colSpan cols content contentEditable contextMenu\n    controls coords crossOrigin data dateTime default defer dir disabled download draggable\n    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder\n    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity\n    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media\n    mediaGroup method min minLength multiple muted name noValidate nonce open\n    optimum pattern placeholder poster preload radioGroup readOnly rel required\n    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected\n    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style\n    summary tabIndex target title type useMap value width wmode wrap"," ").concat("onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown\n    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick\n    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown\n    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel\n    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough\n    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata\n    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError").split(/[\s\n]+/),c="aria-",i="data-";function r(e,n){return 0===e.indexOf(n)}function l(e){var n,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];n=!1===t?{aria:!0,data:!0,attr:!0}:!0===t?{aria:!0}:(0,a.A)({},t);var l={};return Object.keys(e).forEach((function(t){(n.aria&&("role"===t||r(t,c))||n.data&&r(t,i)||n.attr&&o.includes(t))&&(l[t]=e[t])})),l}},3286:(e,n,t)=>{e.exports=t.p+"static/media/Logo.664ecbce05aa60f016eb.png"}}]);
//# sourceMappingURL=8201.e14ad572.chunk.js.map