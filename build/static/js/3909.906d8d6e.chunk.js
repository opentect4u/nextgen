"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[3909],{3041:(e,t,r)=>{r.d(t,{O:()=>a});const a="https://apinextgen.opentech4u.co.in:3011"},6460:(e,t,r)=>{r.d(t,{A:()=>d});r(5043);var a=r(3216),n=r(2167),o=r(9120),i=r(9938),s=r(880),l=r(579);const d=function(){const e=(0,a.Zp)();return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.A,{icon:(0,l.jsx)(o.A,{}),className:"sm:hidden",onClick:()=>e(-1),type:"primary",style:{right:24,bottom:80}}),(0,l.jsx)(s.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.3,type:"just"},className:"hidden sm:flex sm:justify-end items-center",children:(0,l.jsx)(n.A,{title:"Back",children:(0,l.jsx)("button",{className:" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-green-900 bg-primary-700 h-9 w-9  bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",onClick:()=>e(-1),children:(0,l.jsx)(o.A,{})})})})]})}},8834:(e,t,r)=>{r.d(t,{A:()=>s});r(5043);var a=r(617),n=r(1966),o=r(8143),i=r(579);const s=function(e){let{onReset:t,mode:r,onDelete:s}=e;return(0,i.jsxs)("div",{className:"flex justify-center",children:["A"==r&&(0,i.jsxs)("button",{type:"reset",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900",onClick:t,children:[(0,i.jsx)(a.A,{className:"mr-2"}),"Reset"]}),"E"==r&&(0,i.jsxs)("button",{type:"button",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900",onClick:s,children:[(0,i.jsx)(n.A,{className:"mr-2"}),"Delete"]}),(0,i.jsxs)("button",{type:"submit",className:" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600",children:[(0,i.jsx)(o.A,{className:"mr-2"}),"Submit"]})]})}},2141:(e,t,r)=>{r.d(t,{A:()=>s});r(5043);var a=r(6460),n=r(880),o=r(1581),i=r(579);const s=function(e){let{text:t,mode:r,data:s,title:l}=e;return(0,i.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5",children:(0,i.jsxs)("div",{className:"flex flex-col bg-green-900 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-1.5",children:[(0,i.jsx)(n.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.2,type:"just"},className:"text-xl font-semibold text-white my-1  dark:text-gray-400 ",children:t}),(0,i.jsxs)("div",{className:"flex justify-end items-center gap-3",children:[(0,i.jsx)(a.A,{}),1==r&&(0,i.jsx)(o.A,{toPrint:s,title:l})]})]})})}},8366:(e,t,r)=>{r.d(t,{Q:()=>n});r(5043);var a=r(6433);const n=(e,t)=>{a.Ay.open({type:e,content:t})}},1581:(e,t,r)=>{r.d(t,{A:()=>h});r(5043);var a=r(2167),n=r(4834),o=r(9938),i=r(691),s=r(579);const l=function(e){let{printData:t,title:r}=e;return console.log(t),(0,s.jsx)("div",{className:"mt-5",children:(0,s.jsx)(i.A,{title:r,items:t})})},d={created_by:"Created By",created_at:"Created At",modified_by:"Modified By",modified_at:"Modified At",catg_name:"Category Name",sl_no:"ID",desig_name:"Designation",unit_name:"Unit",dept_name:"Department",prod_name:"Product",prod_cat:"Category",prod_make:"Make",part_no:"Part No.",model_no:"Model No.",article_no:"Article No.",hsn_code:"HSN Code",stk_cnt:"Stock",prod_desc:"Description"};var c=r(3286);const m=function(){return(0,s.jsxs)("div",{className:"flex justify-center my-5 mb-5",children:[(0,s.jsx)("img",{src:c,className:"sm:h-14 h-9",alt:"Flowbite Logo"}),(0,s.jsx)("h2",{className:"mb-4 text-xl font-bold text-[#22543d]  dark:text-gray-400 ",children:"NextGen Automation Pvt Ltd"}),(0,s.jsx)("span",{className:"my-5 mb-5",children:"Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046 Ph-033 4068 6032/6450 0535 Email: info@ngapl.com"})]})};var u=r(880);const h=function(e){let{toPrint:t,title:r}=e;console.log(t);var i=[];for(let a of Object.keys(t))"serial_number"!=a&&i.push({key:a,label:d[a]+" - ",children:t[a]});function c(){var e=document.getElementById("tablePrint"),t=window.open("","Print-Window");t.document.open(),t.document.writeln("<!DOCTYPE html>"),t.document.writeln('<html><head><title></title><style type="text/css">'),t.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),t.document.writeln('</head><body onload="window.print()">'),t.document.writeln(e.innerHTML),t.document.writeln("</body></html>"),t.document.close(),setTimeout((function(){t.close()}),10)}return(0,s.jsxs)(u.P.div,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.5,type:"just"},children:[(0,s.jsx)(o.A,{icon:(0,s.jsx)(n.A,{}),onClick:()=>c(),className:"sm:hidden",type:"primary",style:{right:24,bottom:80}}),(0,s.jsx)(a.A,{title:"Print",children:(0,s.jsx)("button",{onClick:()=>c(),className:" inline-flex items-center justify-center mr-4 sm:-mr-1  text-sm font-medium text-center text-green-900 bg-primary-700 h-9 w-9 -mt-1 bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900  dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",children:(0,s.jsx)(n.A,{})})}),(0,s.jsxs)("div",{className:"hidden justify-center",id:"tablePrint",children:[(0,s.jsx)(m,{}),(0,s.jsx)(l,{className:"mt-5",title:r,printData:i})]})]})}},3731:(e,t,r)=>{r.d(t,{A:()=>o});var a=r(5043),n=r(579);const o=function(e){var t;const[r,o]=(0,a.useState)(null);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("label",{className:"block mb-2 text-sm font-bold text-green-900 dark:text-gray-100",children:[" ",e.label]}),1==e.mode&&(0,n.jsx)("input",{type:e.type,name:e.name,value:e.formControlName,className:"bg-bg-white border-1 border-green-900 text-gray-800 text-sm rounded-full  focus:border-green-900 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:e.placeholder,onChange:e.handleChange,onBlur:e.handleBlur,disabled:e.disabled}),2==e.mode&&(0,n.jsxs)("select",{id:"countries",className:"bg-bg-white border-1 border-green-900 text-gray-800 text-sm rounded-full  focus:border-green-900 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",value:e.formControlName,onChange:e.handleChange,name:e.name,placeholder:e.placeholder,options:null===e||void 0===e?void 0:e.data,onBlur:e.handleBlur,disabled:e.disabled,children:[(0,n.jsx)("option",{selected:!0,children:e.placeholder}),null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.map(((e,t)=>(0,n.jsx)("option",{value:e.code,children:e.name})))]}),3==e.mode&&(0,n.jsx)("textarea",{rows:"8",className:"bg-bg-white border-1 border-green-900 text-sm rounded-lg  focus:border-green-900 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",name:e.name,value:e.formControlName,placeholder:e.placeholder,onChange:e.handleChange,onBlur:e.handleBlur})]})}},9657:(e,t,r)=>{r.d(t,{A:()=>o});r(5043);var a=r(880),n=r(579);const o=function(e){let{title:t}=e;return(0,n.jsxs)(a.P.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{delay:.1,type:"tween",stiffness:500},className:"text-[#92140C] text-sm font-semibold py-2 px-2",children:[t,"!"]})}},1966:(e,t,r)=>{r.d(t,{A:()=>l});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"};var i=r(2172),s=function(e,t){return n.createElement(i.A,(0,a.A)({},e,{ref:t,icon:o}))};const l=n.forwardRef(s)},8655:(e,t,r)=>{r.d(t,{A:()=>l});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"minus-circle",theme:"outlined"};var i=r(2172),s=function(e,t){return n.createElement(i.A,(0,a.A)({},e,{ref:t,icon:o}))};const l=n.forwardRef(s)},5337:(e,t,r)=>{r.d(t,{A:()=>l});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"};var i=r(2172),s=function(e,t){return n.createElement(i.A,(0,a.A)({},e,{ref:t,icon:o}))};const l=n.forwardRef(s)},617:(e,t,r)=>{r.d(t,{A:()=>l});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"};var i=r(2172),s=function(e,t){return n.createElement(i.A,(0,a.A)({},e,{ref:t,icon:o}))};const l=n.forwardRef(s)},8143:(e,t,r)=>{r.d(t,{A:()=>l});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"};var i=r(2172),s=function(e,t){return n.createElement(i.A,(0,a.A)({},e,{ref:t,icon:o}))};const l=n.forwardRef(s)},3286:(e,t,r)=>{e.exports=r.p+"static/media/Logo.664ecbce05aa60f016eb.png"}}]);
//# sourceMappingURL=3909.906d8d6e.chunk.js.map