"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[2067],{6460:(e,r,a)=>{a.d(r,{A:()=>c});a(5043);var t=a(3216),o=a(2167),s=a(9120),l=a(9938),d=a(880),n=a(579);const c=function(){const e=(0,t.Zp)();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.A,{icon:(0,n.jsx)(s.A,{}),className:"sm:hidden",onClick:()=>e(-1),type:"primary",style:{right:24,bottom:80}}),(0,n.jsx)(d.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.3,type:"just"},className:"hidden sm:flex sm:justify-end items-center",children:(0,n.jsx)(o.A,{title:"Back",children:(0,n.jsx)("button",{className:" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-green-900 bg-primary-700 h-9 w-9  bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",onClick:()=>e(-1),children:(0,n.jsx)(s.A,{})})})})]})}},2141:(e,r,a)=>{a.d(r,{A:()=>d});a(5043);var t=a(6460),o=a(880),s=a(1581),l=a(579);const d=function(e){let{text:r,mode:a,data:d,title:n}=e;return(0,l.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5",children:(0,l.jsxs)("div",{className:"flex flex-col bg-green-900 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-1.5",children:[(0,l.jsx)(o.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.2,type:"just"},className:"text-xl font-semibold text-white my-1  dark:text-gray-400 ",children:r}),(0,l.jsxs)("div",{className:"flex justify-end items-center gap-3",children:[(0,l.jsx)(t.A,{}),1==a&&(0,l.jsx)(s.A,{toPrint:d,title:n})]})]})})}},1581:(e,r,a)=>{a.d(r,{A:()=>u});a(5043);var t=a(2167),o=a(4834),s=a(9938),l=a(691),d=a(579);const n=function(e){let{printData:r,title:a}=e;return console.log(r),(0,d.jsx)("div",{className:"mt-5",children:(0,d.jsx)(l.A,{title:a,items:r})})},c={created_by:"Created By",created_at:"Created At",modified_by:"Modified By",modified_at:"Modified At",catg_name:"Category Name",sl_no:"ID",desig_name:"Designation",unit_name:"Unit",dept_name:"Department",prod_name:"Product",prod_cat:"Category",prod_make:"Make",part_no:"Part No.",model_no:"Model No.",article_no:"Article No.",hsn_code:"HSN Code",stk_cnt:"Stock",prod_desc:"Description"};var i=a(3286);const m=function(){return(0,d.jsxs)("div",{className:"flex justify-center my-5 mb-5",children:[(0,d.jsx)("img",{src:i,className:"sm:h-14 h-9",alt:"Flowbite Logo"}),(0,d.jsx)("h2",{className:"mb-4 text-xl font-bold text-[#22543d]  dark:text-gray-400 ",children:"NextGen Automation Pvt Ltd"}),(0,d.jsx)("span",{className:"my-5 mb-5",children:"Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046 Ph-033 4068 6032/6450 0535 Email: info@ngapl.com"})]})};var g=a(880);const u=function(e){let{toPrint:r,title:a}=e;console.log(r);var l=[];for(let t of Object.keys(r))"serial_number"!=t&&l.push({key:t,label:c[t]+" - ",children:r[t]});function i(){var e=document.getElementById("tablePrint"),r=window.open("","Print-Window");r.document.open(),r.document.writeln("<!DOCTYPE html>"),r.document.writeln('<html><head><title></title><style type="text/css">'),r.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),r.document.writeln('</head><body onload="window.print()">'),r.document.writeln(e.innerHTML),r.document.writeln("</body></html>"),r.document.close(),setTimeout((function(){r.close()}),10)}return(0,d.jsxs)(g.P.div,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.5,type:"just"},children:[(0,d.jsx)(s.A,{icon:(0,d.jsx)(o.A,{}),onClick:()=>i(),className:"sm:hidden",type:"primary",style:{right:24,bottom:80}}),(0,d.jsx)(t.A,{title:"Print",children:(0,d.jsx)("button",{onClick:()=>i(),className:" inline-flex items-center justify-center mr-4 sm:-mr-1  text-sm font-medium text-center text-green-900 bg-primary-700 h-9 w-9 -mt-1 bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900  dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",children:(0,d.jsx)(o.A,{})})}),(0,d.jsxs)("div",{className:"hidden justify-center",id:"tablePrint",children:[(0,d.jsx)(m,{}),(0,d.jsx)(n,{className:"mt-5",title:a,printData:l})]})]})}},2630:(e,r,a)=>{a.r(r),a.d(r,{default:()=>f});var t=a(5043),o=a(7170),s=a(4376),l=a(6433),d=a(6263),n=a(2624),c=a(7548),i=a(3567),m=a(7883),g=a(2141),u=a(3216);const b=a.p+"static/media/po.c9f3cf75a116e77c8e29.pdf";var x=a(579);const f=function(){(0,t.useRef)(null);const e=(0,u.g)();console.log(e,"params");const[r,a]=(0,t.useState)(""),[f,p]=(0,t.useState)(!1),[y,h]=(0,t.useState)(!1),[k,j]=(0,t.useState)(!1),[v,N]=(0,t.useState)(""),w=[{title:"Order Type",content:(0,x.jsxs)("form",{className:"max-w-sm mx-auto",children:[(0,x.jsx)(g.A,{text:"Order type"}),(0,x.jsxs)("div",{className:"flex flex-col",children:[(0,x.jsx)("label",{for:"userper",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Type"}),(0,x.jsx)(c.A,{showSearch:!0,className:"bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ",placeholder:"Select type",optionFilterProp:"label",onChange:e=>a(e),size:"large",options:[{value:"",label:"Select type"},{value:"P",label:"Project Specific"},{value:"G",label:"General"}]})]})]})},{title:"Basic Details",content:(0,x.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,x.jsxs)("div",{className:"py-2 px-4 mx-auto w-full lg:py-2",children:[(0,x.jsx)(g.A,{text:"Basic Details"}),(0,x.jsx)("form",{action:"#",children:(0,x.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,x.jsx)("div",{className:"sm:col-span-2",children:(0,x.jsxs)("div",{className:"flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Date"}),(0,x.jsx)(m.A,{name:"order_dt",id:"order_dt",size:"large",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 w-full dark:focus:border-primary-500",placeholder:"Order date",required:""})]})}),"P"==r&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Order No."}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select order no.",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select order no."},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,x.jsxs)("div",{className:"w-full flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Client Name"}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select client",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select client"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,x.jsxs)("div",{className:"w-full flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Project Name"}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select project",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select client"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]})]}),(0,x.jsxs)("div",{className:"w-full flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Product category"}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select category",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select client"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,x.jsxs)("div",{className:"w-full flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Vendor"}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select vendor",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select vendor"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,x.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Project Manager"}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select project manager",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select project manager"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]})]})})]})})},{title:"Product Details",content:(0,x.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,x.jsxs)("div",{className:"py-2 px-4 mx-auto w-full lg:py-2",children:[(0,x.jsx)(g.A,{text:"Product Details"}),(0,x.jsx)("form",{action:"#",children:(0,x.jsxs)("div",{className:"grid gap-4 sm:grid-cols-6 sm:gap-6",children:[(0,x.jsxs)("div",{className:"sm:col-span-6 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Product name"}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select product ",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select product "},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,x.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Quantity"}),(0,x.jsx)("input",{type:"text",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Quantity",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Rate"}),(0,x.jsx)("input",{type:"text",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Rate",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Discount"}),(0,x.jsx)("input",{type:"text",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Discount",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Unit"}),(0,x.jsx)(c.A,{showSearch:!0,className:"w-full",placeholder:"Select unit",optionFilterProp:"label",size:"large",options:[{value:"",label:"Select unit"},{value:"P",label:"L&T"},{value:"G",label:"A/C BEUMER_JPPL-"}]})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Unit Price"}),(0,x.jsx)("input",{type:"text",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Unit Price",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Total"}),(0,x.jsx)("input",{type:"text",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Total Price",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-4",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Packing Type"}),(0,x.jsx)("input",{type:"text",name:"name",id:"name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Packing Type",required:""})]}),(0,x.jsx)("div",{className:"sm:col-span-2",children:(0,x.jsxs)("div",{className:"sm:col-span-1 sm:flex sm:justify-center mt-5",children:[(0,x.jsx)("label",{for:"brand",className:"block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Manufacture clearance required?"}),(0,x.jsx)(n.A,{size:"large",defaultChecked:!0})]})}),(0,x.jsxs)("div",{className:"sm:col-span-6 flex flex-col",children:[(0,x.jsx)("label",{for:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Delivery date"}),(0,x.jsx)(m.A,{name:"order_dt",id:"order_dt",size:"large",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 w-full dark:focus:border-primary-500",placeholder:"Delivery date",required:""})]})]})})]})})},{title:"Terms & Conditions",content:(0,x.jsxs)("div",{className:"py-2 px-4 mx-auto w-full lg:py-2",children:[(0,x.jsx)(g.A,{text:"Terms & Conditions"}),(0,x.jsx)("form",{action:"#",children:(0,x.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Price Basis"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"GST"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Packing & Forwarding"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Freight & Insurance"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Payment Terms"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"LD Charges"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Test Certificate"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"O&M Manual"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Guarantee/Waranty certificate"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Operation/Installation form"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]})]})})]})},{title:"Delivery Details",content:(0,x.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,x.jsxs)("div",{className:"py-2 px-4 mx-auto w-full lg:py-2",children:[(0,x.jsx)(g.A,{text:"Delivery Address"}),(0,x.jsx)("form",{action:"#",children:(0,x.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"description",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Address of NGA"}),(0,x.jsx)("textarea",{id:"description",rows:"8",className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Your address here",disabled:!0,children:"NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046"}),(0,x.jsxs)("p",{className:"mt-3 text-sm text-gray-500 font-bold float-right dark:text-gray-300",id:"file_input_help",children:["Delivery to warehouse?"," ",(0,x.jsx)(n.A,{size:"small",value:f,onClick:e=>{console.log(e),p(e),0==f?(console.log(f),N("NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046"),console.log(v)):N("")},defaultChecked:!0})]})]}),(0,x.jsxs)("div",{className:"sm:col-span-2",children:[(0,x.jsx)("label",{for:"description",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Delivery Address"}),(0,x.jsx)("textarea",{id:"description",rows:"8",className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Your address here",disabled:"G"==r||f,children:"G"==r||f?"NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046":""})]})]})})]})})},{title:"More",content:(0,x.jsxs)("div",{className:"grid gap-4 sm:grid-cols-4 sm:gap-6",children:[(0,x.jsxs)("div",{className:"flex justify-between sm:col-span-1 mt-5",children:[(0,x.jsx)("label",{for:"brand",className:"block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"MDCC"}),(0,x.jsx)(n.A,{size:"large",defaultChecked:!0})]}),(0,x.jsxs)("div",{className:" flex justify-between sm:col-span-1 sm:flex sm:justify-center mt-5",children:[(0,x.jsx)("label",{for:"brand",className:"block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Inspection required?"}),(0,x.jsx)(n.A,{size:"large",value:y,onChange:e=>h(e),defaultChecked:!0})]}),(0,x.jsxs)("div",{className:"flex justify-between sm:col-span-1 sm:flex sm:justify-center mt-5",children:[(0,x.jsx)("label",{for:"brand",className:"block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"Drawing/Datasheet?"}),(0,x.jsx)(n.A,{size:"large",value:k,onChange:e=>j(e),defaultChecked:!0})]}),(0,x.jsxs)("div",{className:"flex justify-between  sm:col-span-1 sm:flex sm:justify-center mt-5",children:[(0,x.jsx)("label",{for:"brand",className:"block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300",children:"PI for advance?"}),(0,x.jsx)(n.A,{size:"large",defaultChecked:!0})]}),k&&(0,x.jsxs)("div",{className:" sm:col-span-4 mt-6",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Drawing/Datasheet to be implemented by"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]}),y&&(0,x.jsxs)("div",{className:"sm:col-span-4",children:[(0,x.jsx)("label",{for:"catnm",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Inspection Scope"}),(0,x.jsx)("input",{type:"text",name:"catnm",id:"catnm",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Type here...",required:""})]})]})},{title:"Preview",content:(0,x.jsx)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:(0,x.jsx)("iframe",{className:"col-span-2 w-full h-full",src:b,title:"W3Schools Free Online Web Tutorials"})})},{title:"Logs",content:(0,x.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,x.jsx)(d.A,{className:"col-span-1 sm:mt-4",mode:"left",items:[{label:"2015-09-01",children:"Create a service"},{label:"2015-09-01 09:12:11",children:"Solve initial network problems"},{children:"Technical testing"},{label:"2015-09-01 09:12:11",children:"Network problems being solved"}]}),(0,x.jsx)("section",{className:"bg-white dark:bg-gray-900 col-span-1",children:(0,x.jsx)("div",{className:"py-2 w-full md:py-2 sm:-mt-5",children:(0,x.jsxs)("form",{action:"#",children:[(0,x.jsx)("label",{for:"description",className:"block mb-2 text-sm font-bold text-green-800 dark:text-white  focus:border-green-800 active:border-green-800 focus:ring-green-800 focus:border-1 duration-300",children:"Your log"}),(0,x.jsx)("textarea",{id:"description",rows:"8",className:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-900 focus:border-green-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  factive:border-green-900  focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900",placeholder:"Lorem Ipsum Dolor Sit Amet..."})]})})})]})}],{token:P}=o.A.useToken(),[A,C]=(0,t.useState)(0),S=w.map((e=>({key:e.title,title:e.title}))),T={lineHeight:"260px",color:"black",backgroundColor:P.colorFillAlter,borderRadius:P.borderRadiusLG,marginTop:70};return(0,x.jsxs)("div",{className:"py-8 mx-auto w-5/6 lg:py-16",children:[(0,x.jsx)(s.A,{responsive:!0,current:A,items:S,progressDot:(e,r)=>{let{status:a,index:t}=r;return(0,x.jsx)(i.A,{content:(0,x.jsxs)("span",{children:["step ",t+1," status: ",a]}),children:e})}}),(0,x.jsx)("div",{style:T,children:w[A].content}),(0,x.jsxs)("div",{className:"float-right",children:[A>0&&(0,x.jsx)("button",{style:{margin:"0 8px"},className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-green-800 border border-green-800 bg-white hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600 hover:border-gray-600 hover:text-gray-600  dark:focus:ring-primary-900 ",onClick:()=>{C(A-1)},children:"Previous"}),A<w.length-1&&(0,x.jsx)("button",{className:"inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-800 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600",onClick:e=>{C(A+1),console.log(e)},children:"Next"}),A===w.length-1&&(0,x.jsx)("button",{className:"inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-800 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600",onClick:()=>l.Ay.success("Processing complete!"),children:"Done"})]})]})}},3286:(e,r,a)=>{e.exports=a.p+"static/media/Logo.664ecbce05aa60f016eb.png"}}]);
//# sourceMappingURL=2067.66bcf8cb.chunk.js.map