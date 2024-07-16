"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[2582],{6460:(e,t,r)=>{r.d(t,{A:()=>c});r(5043);var a=r(3216),n=r(2167),o=r(9120),s=r(7297),i=r(880),d=r(579);const c=function(){const e=(0,a.Zp)();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.A,{icon:(0,d.jsx)(o.A,{}),className:"sm:hidden",onClick:()=>e(-1),type:"primary",style:{right:24,bottom:80}}),(0,d.jsx)(i.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.3,type:"just"},className:"hidden sm:flex sm:justify-end items-center",children:(0,d.jsx)(n.A,{title:"Back",children:(0,d.jsx)("button",{className:" inline-flex items-center justify-center  text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-gray-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 hover:bg-[#C05746] dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",onClick:()=>e(-1),children:(0,d.jsx)(o.A,{})})})})]})}},8834:(e,t,r)=>{r.d(t,{A:()=>i});r(5043);var a=r(617),n=r(1966),o=r(8143),s=r(579);const i=function(e){let{onReset:t,mode:r,onDelete:i}=e;return(0,s.jsxs)("div",{className:"flex justify-center",children:["A"==r&&(0,s.jsxs)("button",{type:"reset",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#C05746] bg-[#C05746] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:t,children:[(0,s.jsx)(a.A,{className:"mr-2"}),"Reset"]}),"E"==r&&(0,s.jsxs)("button",{type:"button",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#C05746] bg-[#C05746] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:i,children:[(0,s.jsx)(n.A,{className:"mr-2"}),"Delete"]}),(0,s.jsxs)("button",{type:"submit",className:" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-500 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600",children:[(0,s.jsx)(o.A,{className:"mr-2"}),"Submit"]})]})}},2141:(e,t,r)=>{r.d(t,{A:()=>i});r(5043);var a=r(6460),n=r(880),o=r(1581),s=r(579);const i=function(e){let{text:t,mode:r,data:i,title:d}=e;return(0,s.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5",children:(0,s.jsxs)("div",{className:"flex flex-col bg-green-500 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-2",children:[(0,s.jsx)(n.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.2,type:"just"},className:"text-xl font-semibold text-white my-1  dark:text-gray-400 ",children:t}),(0,s.jsxs)("div",{className:"flex justify-end items-center",children:[(0,s.jsx)(a.A,{}),1==r&&(0,s.jsx)(o.A,{toPrint:i,title:d})]})]})})}},1581:(e,t,r)=>{r.d(t,{A:()=>g});r(5043);var a=r(2167),n=r(4834),o=r(7297),s=r(691),i=r(579);const d=function(e){let{printData:t,title:r}=e;return console.log(t),(0,i.jsx)("div",{className:"mt-5",children:(0,i.jsx)(s.A,{title:r,items:t})})},c={created_by:"Created By",created_at:"Created At",modified_by:"Modified By",modified_at:"Modified At",catg_name:"Category Name",sl_no:"ID",desig_name:"Designation",unit_name:"Unit",dept_name:"Department",prod_name:"Product",prod_cat:"Category",prod_make:"Make",part_no:"Part No.",model_no:"Model No.",article_no:"Article No.",hsn_code:"HSN Code",stk_cnt:"Stock",prod_desc:"Description"};var l=r(3286);const m=function(){return(0,i.jsxs)("div",{className:"flex justify-center my-5 mb-5",children:[(0,i.jsx)("img",{src:l,className:"sm:h-14 h-9",alt:"Flowbite Logo"}),(0,i.jsx)("h2",{className:"mb-4 text-xl font-bold text-[#22543d]  dark:text-gray-400 ",children:"NextGen Automation Pvt Ltd"}),(0,i.jsx)("span",{className:"my-5 mb-5",children:"Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046 Ph-033 4068 6032/6450 0535 Email: info@ngapl.com"})]})};const g=function(e){let{toPrint:t,title:r}=e;console.log(t);var s=[];for(let a of Object.keys(t))"serial_number"!=a&&s.push({key:a,label:c[a]+" - ",children:t[a]});function l(){var e=document.getElementById("tablePrint"),t=window.open("","Print-Window");t.document.open(),t.document.writeln("<!DOCTYPE html>"),t.document.writeln('<html><head><title></title><style type="text/css">'),t.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),t.document.writeln('</head><body onload="window.print()">'),t.document.writeln(e.innerHTML),t.document.writeln("</body></html>"),t.document.close(),setTimeout((function(){t.close()}),10)}return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.A,{icon:(0,i.jsx)(n.A,{}),onClick:()=>l(),className:"sm:hidden",type:"primary",style:{right:24,bottom:80}}),(0,i.jsx)(a.A,{title:"Print",children:(0,i.jsx)("button",{onClick:()=>l(),className:" inline-flex items-center justify-center mr-4 sm:mr-1  text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-gray-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",children:(0,i.jsx)(n.A,{})})}),(0,i.jsxs)("div",{className:"hidden justify-center",id:"tablePrint",children:[(0,i.jsx)(m,{}),(0,i.jsx)(d,{className:"mt-5",title:r,printData:s})]})]})}},1814:(e,t,r)=>{r.r(t),r.d(t,{default:()=>i});r(5043);var a=r(3216),n=r(8834),o=r(2141),s=r(579);const i=function(){const e=(0,a.g)();return console.log(e,"params"),(0,s.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,s.jsxs)("div",{className:"py-8 mx-auto w-5/6 lg:py-16",children:[(0,s.jsx)(o.A,{text:e.id>0?"Update project":"Add project"}),(0,s.jsxs)("form",{action:"#",children:[(0,s.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,s.jsxs)("div",{className:"sm:col-span-2",children:[(0,s.jsx)("label",{for:"projnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Project Name"}),(0,s.jsx)("input",{type:"text",name:"projnm",id:"projnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type project name",required:""})]}),(0,s.jsxs)("div",{className:"sm:col-span-2",children:[(0,s.jsx)("label",{for:"clnt",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Client"}),(0,s.jsx)("input",{type:"text",name:"clnt",id:"clnt",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type Client Name",required:""})]}),(0,s.jsxs)("div",{className:"sm:col-span-2",children:[(0,s.jsx)("label",{for:"proj_add",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Project Address"}),(0,s.jsx)("textarea",{id:"proj_add",rows:"8",className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type Full Address Here"})]})]}),(0,s.jsx)(n.A,{})]})]})})}},1966:(e,t,r)=>{r.d(t,{A:()=>d});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"};var s=r(2172),i=function(e,t){return n.createElement(s.A,(0,a.A)({},e,{ref:t,icon:o}))};const d=n.forwardRef(i)},617:(e,t,r)=>{r.d(t,{A:()=>d});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"};var s=r(2172),i=function(e,t){return n.createElement(s.A,(0,a.A)({},e,{ref:t,icon:o}))};const d=n.forwardRef(i)},8143:(e,t,r)=>{r.d(t,{A:()=>d});var a=r(8168),n=r(5043);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"}}]},name:"save",theme:"outlined"};var s=r(2172),i=function(e,t){return n.createElement(s.A,(0,a.A)({},e,{ref:t,icon:o}))};const d=n.forwardRef(i)},8887:(e,t,r)=>{r.d(t,{A:()=>n});var a=r(167);const n=e=>{const[,,,,t]=(0,a.Ay)();return t?"".concat(e,"-css-var"):""}},3286:(e,t,r)=>{e.exports=r.p+"static/media/Logo.664ecbce05aa60f016eb.png"}}]);
//# sourceMappingURL=2582.463fc31e.chunk.js.map