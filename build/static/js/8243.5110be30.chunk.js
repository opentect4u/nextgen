"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[8243],{6460:(e,r,t)=>{t.d(r,{A:()=>d});t(5043);var a=t(3216),l=t(2167),o=t(9120),s=t(7297),n=t(880),i=t(579);const d=function(){const e=(0,a.Zp)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.A,{icon:(0,i.jsx)(o.A,{}),className:"sm:hidden",onClick:()=>e(-1),type:"primary",style:{right:24,bottom:80}}),(0,i.jsx)(n.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.3,type:"just"},className:"hidden sm:flex sm:justify-end items-center",children:(0,i.jsx)(l.A,{title:"Back",children:(0,i.jsx)("button",{className:" inline-flex items-center justify-center  text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-gray-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 hover:bg-[#C05746] dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",onClick:()=>e(-1),children:(0,i.jsx)(o.A,{})})})})]})}},8834:(e,r,t)=>{t.d(r,{A:()=>n});t(5043);var a=t(617),l=t(1966),o=t(8143),s=t(579);const n=function(e){let{onReset:r,mode:t,onDelete:n}=e;return(0,s.jsxs)("div",{className:"flex justify-center",children:["A"==t&&(0,s.jsxs)("button",{type:"reset",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#C05746] bg-[#C05746] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:r,children:[(0,s.jsx)(a.A,{className:"mr-2"}),"Reset"]}),"E"==t&&(0,s.jsxs)("button",{type:"button",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#C05746] bg-[#C05746] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:n,children:[(0,s.jsx)(l.A,{className:"mr-2"}),"Delete"]}),(0,s.jsxs)("button",{type:"submit",className:" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-500 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600",children:[(0,s.jsx)(o.A,{className:"mr-2"}),"Submit"]})]})}},2141:(e,r,t)=>{t.d(r,{A:()=>n});t(5043);var a=t(6460),l=t(880),o=t(1581),s=t(579);const n=function(e){let{text:r,mode:t,data:n,title:i}=e;return(0,s.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5",children:(0,s.jsxs)("div",{className:"flex flex-col bg-green-500 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-2",children:[(0,s.jsx)(l.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.2,type:"just"},className:"text-xl font-semibold text-white my-1  dark:text-gray-400 ",children:r}),(0,s.jsxs)("div",{className:"flex justify-end items-center",children:[(0,s.jsx)(a.A,{}),1==t&&(0,s.jsx)(o.A,{toPrint:n,title:i})]})]})})}},1581:(e,r,t)=>{t.d(r,{A:()=>u});t(5043);var a=t(2167),l=t(4834),o=t(7297),s=t(691),n=t(579);const i=function(e){let{printData:r,title:t}=e;return console.log(r),(0,n.jsx)("div",{className:"mt-5",children:(0,n.jsx)(s.A,{title:t,items:r})})},d={created_by:"Created By",created_at:"Created At",modified_by:"Modified By",modified_at:"Modified At",catg_name:"Category Name",sl_no:"ID",desig_name:"Designation",unit_name:"Unit",dept_name:"Department",prod_name:"Product",prod_cat:"Category",prod_make:"Make",part_no:"Part No.",model_no:"Model No.",article_no:"Article No.",hsn_code:"HSN Code",stk_cnt:"Stock",prod_desc:"Description"};var c=t(3286);const m=function(){return(0,n.jsxs)("div",{className:"flex justify-center my-5 mb-5",children:[(0,n.jsx)("img",{src:c,className:"sm:h-14 h-9",alt:"Flowbite Logo"}),(0,n.jsx)("h2",{className:"mb-4 text-xl font-bold text-[#22543d]  dark:text-gray-400 ",children:"NextGen Automation Pvt Ltd"}),(0,n.jsx)("span",{className:"my-5 mb-5",children:"Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046 Ph-033 4068 6032/6450 0535 Email: info@ngapl.com"})]})};const u=function(e){let{toPrint:r,title:t}=e;console.log(r);var s=[];for(let a of Object.keys(r))"serial_number"!=a&&s.push({key:a,label:d[a]+" - ",children:r[a]});function c(){var e=document.getElementById("tablePrint"),r=window.open("","Print-Window");r.document.open(),r.document.writeln("<!DOCTYPE html>"),r.document.writeln('<html><head><title></title><style type="text/css">'),r.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),r.document.writeln('</head><body onload="window.print()">'),r.document.writeln(e.innerHTML),r.document.writeln("</body></html>"),r.document.close(),setTimeout((function(){r.close()}),10)}return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.A,{icon:(0,n.jsx)(l.A,{}),onClick:()=>c(),className:"sm:hidden",type:"primary",style:{right:24,bottom:80}}),(0,n.jsx)(a.A,{title:"Print",children:(0,n.jsx)("button",{onClick:()=>c(),className:" inline-flex items-center justify-center mr-4 sm:mr-1  text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-gray-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",children:(0,n.jsx)(l.A,{})})}),(0,n.jsxs)("div",{className:"hidden justify-center",id:"tablePrint",children:[(0,n.jsx)(m,{}),(0,n.jsx)(i,{className:"mt-5",title:t,printData:s})]})]})}},3139:(e,r,t)=>{t.d(r,{A:()=>i});t(5043);var a=t(7548),l=t(7883),o=t(8834),s=t(6399),n=t(579);const i=function(e){let{mode:r}=e;return(0,n.jsxs)("form",{action:"#",children:[(0,n.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,n.jsx)("div",{className:"sm:col-span-2",children:(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Date"}),(0,n.jsx)(l.A,{name:"order_dt",id:"order_dt",size:"large",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 w-full dark:focus:border-primary-500",placeholder:"Order date",required:""})]})}),(0,n.jsxs)("div",{className:"w-full flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Client Name"}),(0,n.jsx)(a.A,{showSearch:!0,className:"w-full",placeholder:"Select client",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select client"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,n.jsxs)("div",{className:"w-full flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Project Name"}),(0,n.jsx)(a.A,{showSearch:!0,className:"w-full",placeholder:"Select project",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select client"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(2==r||3==r)&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"w-full flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:2==r?"Send to":"Received from"}),(0,n.jsx)(a.A,{showSearch:!0,className:"w-full",placeholder:"Select project manager",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select project manager"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,n.jsxs)("div",{className:"w-full flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Duration"}),(0,n.jsx)("input",{type:"number",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white   active:border-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Type duration(days)",required:""})]})]}),(0,n.jsxs)("div",{className:"w-full flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Product category"}),(0,n.jsx)(a.A,{showSearch:!0,className:"w-full",placeholder:"Select category",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select client"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,n.jsxs)("div",{className:"w-full flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Product"}),(0,n.jsx)(a.A,{showSearch:!0,className:"w-full",placeholder:"Select product",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select product"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,n.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Quantity"}),(0,n.jsx)("input",{type:"number",name:"qty",id:"qty",className:"bg-gray-50 border relative border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"99",required:""}),(0,n.jsx)(s.A,{className:"absolute sm:-bottom-13 sm:right-40 -bottom-16 right-24",color:"#f50",children:"88"})]}),(2==r||3==r)&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Status"}),(0,n.jsx)(a.A,{showSearch:!0,className:"w-full",placeholder:"Select status",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select status"},{value:"P",label:"Initiated"},{value:"G",label:"Accepted"},{value:"G",label:"Rejected"},{value:"G",label:"In Process"}]})]}),(0,n.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,n.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Comments"}),(0,n.jsx)("textarea",{rows:"8",className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"})]})]})]}),(0,n.jsx)(o.A,{})]})}},8243:(e,r,t)=>{t.r(r),t.d(r,{default:()=>n});t(5043);var a=t(3216),l=t(3139),o=t(2141),s=t(579);const n=function(){const e=(0,a.g)();return console.log(e,"params"),(0,s.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,s.jsxs)("div",{className:"py-2 px-4 mx-auto w-5/6 lg:py-8",children:[(0,s.jsx)(o.A,{text:e.id>0?"Requisition details":"Send requisition"}),(0,s.jsx)(l.A,{mode:2})]})})}},3286:(e,r,t)=>{e.exports=t.p+"static/media/Logo.664ecbce05aa60f016eb.png"}}]);
//# sourceMappingURL=8243.5110be30.chunk.js.map