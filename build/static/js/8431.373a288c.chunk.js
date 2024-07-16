"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[8431],{3041:(e,t,a)=>{a.d(t,{O:()=>o});const o="https://apinextgen.opentech4u.co.in:8001"},7311:(e,t,a)=>{a.d(t,{j:()=>o});const o={categories:{title:"Categories",btnText:"Add categories",headers:[{name:"serial_number",value:"#"},{name:"catg_name",value:"Category"}]},designations:{title:"Designations",btnText:"Add designations",headers:[{name:"serial_number",value:"#"},{name:"desig_name",value:"Designation"},{name:"created_by",value:"Created by"}]},departments:{title:"Departments",btnText:"Add departments",headers:[{name:"serial_number",value:"#"},{name:"dept_name",value:"Department"},{name:"created_by",value:"Created by"}]},units:{title:"Units",btnText:"Add units",headers:[{name:"serial_number",value:"#"},{name:"unit_name",value:"Unit"},{name:"created_by",value:"Created by"}]},vendors:{title:"Vendors",btnText:"Add vendors",headers:[{name:"serial_number",value:"#"},{name:"vendor_name",value:"Name"},{name:"vendor_email",value:"Email"},{name:"vendor_contact",value:"Contact Person"},{name:"vendor_phone",value:"Phone No."},{name:"created_by",value:"Created by"}]},products:{title:"Products",btnText:"Add products",headers:[{name:"serial_number",value:"#"},{name:"prod_name",value:"Name"},{name:"prod_make",value:"Make"},{name:"created_by",value:"Created by"}]},users:{title:"Users",btnText:"Add users",headers:[{name:"serial_number",value:"#"},{name:"user_name",value:"Name"},{name:"user_email",value:"Email"},{name:"user_phone",value:"Phone"},{name:"created_by",value:"Created by"}]},clients:{title:"Clients",btnText:"Add clients",headers:[{name:"serial_number",value:"#"},{name:"client_name",value:"Name"},{name:"client_email",value:"Email"},{name:"client_phone",value:"Phone"},{name:"created_by",value:"Created by"}]}}},9023:(e,t,a)=>{a.d(t,{C:()=>o});const o={LANDING:"/",FORGOTPASS:"/forgotpassword",HOME:"/home",USERS:"mastersComp/users",ADDUSERS:"/home/mastersComp/users/useraddform/",CLIENTS:"mastersComp/clients",ADDCLIENTS:"/home/mastersComp/clients/clientaddform/",UNITS:"mastersComp/units",ADDUNITS:"/home/mastersComp/units/unitaddform/",PROJECTS:"mastersComp/projects",ADDPROJECTS:"/home/mastersComp/projects/projectaddform/",PRODUCTS:"mastersComp/products",ADDPRODUCTS:"/home/mastersComp/products/productaddform/",VENDORS:"mastersComp/vendors",ADDVENDORS:"/home/mastersComp/vendors/vendoraddform/",DEPARTMENTS:"mastersComp/departments",ADDDEPARTMENTS:"/home/mastersComp/departments/departmentaddform/",DESIGNATIONS:"mastersComp/designations",ADDDESIGNATIONS:"/home/mastersComp/designations/designationaddform/",CLIENTORDER:"poComp/clientorder",ORDERFORM:"/home/poComp/orderform/",PURCHASEORDER:"poComp/purchaseorder",PURCHASEORDERFORM:"/home/poComp/purchaseorderform/",CATEGORIES:"mastersComp/categories",ADDCATEGORIES:"/home/mastersComp/categories/categoryform/",STOCKINVIEW:"stockComp/stockinview",STOCKOUTVIEW:"stockComp/stockoutview",STOCKASSIGNVIEW:"stockComp/stockassignview",STOCKINFORM:"/home/stockComp/stockinform/",STOCKOUTFORM:"/home/stockComp/stockoutform/",STOCKASSIGNFORM:"/home/stockComp/stockassignform/",REQUISITIONSENTVIEW:"/home/stockComp/requisitionssentview/",REQUISITIONSENDFORM:"/home/stockComp/requisitionssendform/",REQUISITIONRCVDVIEW:"/home/stockComp/requisitionsrcvdview/",REQUISITIONRCVDFORM:"/home/stockComp/requisitionsrcvdform/"}},6487:(e,t,a)=>{a.d(t,{A:()=>N});var o=a(5043),r=a(2018),s=a(7849),l=a(9642),i=a(5540),n=a(7260),d=a(2505),m=a(3216),c=a(5475),u=a(2167),v=a(4834),p=a(2058),h=a(8758),g=a(8347),b=a(880),x=a(579);const y=function(e){let{headers:t,data:a,flag:y,onPress:w,title:f,btnText:C,onclick:k,setSearch:j,to:N}=e;const S=(0,x.jsx)(r.$,{type:"button",icon:"pi pi-refresh",text:!0}),R=(0,x.jsx)(r.$,{type:"button",icon:"pi pi-download",text:!0}),[E,A]=(0,o.useState)(null),[T,_]=(0,o.useState)(localStorage.getItem("col"));(0,o.useState)((()=>{_(localStorage.getItem("col"))}),[localStorage.getItem("col")]),(0,o.useRef)(null);const L=(0,m.Zp)(),P=[{key:"1",label:(0,x.jsxs)("div",{onClick:()=>function(){var e=document.getElementById("tablePrint"),t=window.open("","Print-Window");t.document.open(),t.document.writeln("<!DOCTYPE html>"),t.document.writeln('<html><head><title></title><style type="text/css">'),t.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),t.document.writeln('</head><body onload="window.print()">'),t.document.writeln(e.innerHTML),t.document.writeln("</body></html>"),t.document.close(),setTimeout((function(){t.close()}),10)}(),children:[(0,x.jsx)(v.A,{})," Print this table"]})}];var D;const O=()=>1==y?(0,x.jsx)(i.A,{className:"text-blue-900"}):(0,x.jsx)(n.A,{className:"text-blue-900"}),I=e=>{console.log(e,"event"),D=e.data,L(N+D.sl_no)},U=(p.A,v.A,e=>{});return(0,x.jsxs)(b.P.section,{initial:{opacity:0,y:1e3},animate:{opacity:1,y:0},transition:{delay:.5,type:"tween",stiffness:100},className:"bg-transparent dark:bg-[#001529] py-3 sm:py-5 w-full -mt-5",children:[f&&(0,x.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden",children:(0,x.jsx)("div",{className:"flex flex-col bg-emerald-500 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-1",children:(0,x.jsx)("div",{class:"w-full",children:(0,x.jsxs)("div",{class:"flex items-center justify-evenly",children:[(0,x.jsx)(b.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:1,type:"just"},className:"text-xl font-bold text-white dark:text-white sm:block hidden mx-5",children:f}),(0,x.jsx)("label",{for:"simple-search",class:"sr-only",children:"Search"}),(0,x.jsxs)("div",{class:"relative w-full",children:[(0,x.jsx)("div",{class:"absolute inset-y-0 left-0 flex items-center md:ml-4 pl-3 pointer-events-none",children:(0,x.jsx)("svg",{"aria-hidden":"true",class:"w-5 h-5 text-gray-500 dark:text-gray-400",fill:"currentColor",viewbox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})})}),(0,x.jsx)(b.P.input,{type:"text",id:"simple-search",initial:{opacity:0,width:0},animate:{opacity:1,width:"95%"},transition:{delay:1.1,type:"just"},className:"bg-white border rounded-full border-emerald-500 text-gray-800 text-sm  block w-full md:w-11/12 pl-10 p-2 dark:bg-gray-800 md:ml-4  duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Search",required:"",onChange:e=>j(e.target.value)})]}),C&&(0,x.jsx)(b.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:1.3,type:"just"},class:"w-full hidden md:block  md:w-auto sm:flex sm:flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0",children:(0,x.jsx)(u.A,{title:C,children:(0,x.jsxs)(c.N_,{to:N+0,type:"submit",className:"flex items-center justify-center text-emerald-500 bg-white hover:bg-primary-800  font-medium rounded-full hover:scale-110 text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-700 focus:outline-none  transition duration-0 hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800 ",children:[(0,x.jsx)(d.A,{})," ",C]})})}),(0,x.jsx)("div",{className:"p-1",children:(0,x.jsx)(g.A,{menu:{items:P},placement:"bottomLeft",arrow:!0,children:(0,x.jsx)(h.A,{className:"flex items-center justify-center  text-white   rounded-full  text-3xl font-bold px-2 h-10 w-10 py-2 dark:text-white focus:outline-none  transition duration-0 hover:duration-500 dark:focus:ring-primary-800"})})})]})})})}),(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{className:"card w-full mt-5",children:[(0,x.jsxs)(s.b,{value:a,showGridlines:!0,stripedRows:!0,stickyHeader:"true",scrollable:!0,paginator:!0,rows:10,rowsPerPageOptions:[5,10,25,50,100,null===a||void 0===a?void 0:a.length],rowClassName:"bg-white text-gray-800 border border-b-gray-300 border-r-white border-l-white active:border-0 hover:bg-emerald-500 hover:text-white  duration-500 space-y-2 dark:hover:bg-[#1e4834]",tableStyle:{minWidth:"100%",fontSize:"14px"},paginatorTemplate:"RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",paginatorClassName:"bg-white text-emerald-500",currentPageReportTemplate:"{first} to {last} of {totalRecords}",paginatorLeft:S,paginatorRight:R,styleClass:"p-datatable-gridlines dark:bg-gray-800 dark:text-gray-300 shadow-lg",className:"shadow-lg rounded-lg",selectionMode:"single",selection:E,onSelectionChange:e=>A(e.value),dataKey:"id",onRowSelect:I,onRowUnselect:U,metaKeySelection:!1,children:[t.map(((e,t)=>(0,x.jsx)(l.V,{field:e.name,header:e.value,headerClassName:"text-emerald-500 bg-white border-b-green-500  dark:bg-gray-700 dark:text-white dark:font-bold",style:{width:"10%"},body:t=>((e,t)=>(0,x.jsx)(u.A,{title:"Click to view details",arrow:!0,children:(0,x.jsx)("span",{children:e[t]})}))(t,e.name)},t))),1==y&&(0,x.jsx)(l.V,{body:O,header:"Action",headerClassName:"text-blue-900 bg-blue-300",style:{width:"10%"},frozen:!0}),2==y&&(0,x.jsx)(l.V,{body:O,header:"Action",headerClassName:"text-blue-900 bg-blue-300",style:{width:"10%"},frozen:!0})]}),(0,x.jsx)(b.P.div,{initial:{opacity:0},animate:{opacity:1},transition:{type:"spring",stiffness:400}})]}),(0,x.jsx)("div",{className:"hidden w-full",id:"tablePrint",children:(0,x.jsxs)(s.b,{value:a,showGridlines:!0,stripedRows:!0,stickyHeader:"true",scrollable:!0,paginator:!0,rows:null===a||void 0===a?void 0:a.length,rowsPerPageOptions:[5,10,25,50,100,null===a||void 0===a?void 0:a.length],rowClassName:" border border-b-gray-300 dark:border-green-900 hover:bg-emerald-500 hover:font-semibold dark:hover:bg-[#1e4834]",tableStyle:{minWidth:"100%",fontSize:"14px"},paginatorTemplate:"RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",paginatorClassName:"dark:bg-white dark:text-gray-700",currentPageReportTemplate:"{first} to {last} of {totalRecords}",paginatorLeft:S,paginatorRight:R,styleClass:"p-datatable-gridlines dark:bg-gray-800 dark:text-gray-300",selectionMode:"single",selection:E,onSelectionChange:e=>A(e.value),dataKey:"id",onRowSelect:I,onRowUnselect:U,metaKeySelection:!1,children:[null===t||void 0===t?void 0:t.map(((e,t)=>(0,x.jsx)(l.V,{field:e.name,header:e.value,headerClassName:T>0?"bg-color-theme-".concat(T," text-green-800 dark:bg-gray-700 dark:text-white dark:font-bold"):"text-green-800 bg-gray-300 dark:bg-gray-700 dark:text-white dark:font-bold",style:{width:"10%"}},t))),1==y&&(0,x.jsx)(l.V,{body:O,header:"Action",headerClassName:"text-blue-900 bg-blue-300",style:{width:"10%"},frozen:!0}),2==y&&(0,x.jsx)(l.V,{body:O,header:"Action",headerClassName:"text-blue-900 bg-blue-300",style:{width:"10%"},frozen:!0})]})})]})]})};var w=a(3041),f=a(6213);var C=a(8366),k=a(4856);const j=function(e){let{flag:t}=e;return(0,x.jsx)("div",{className:"card mt-10",children:(0,x.jsx)("div",{className:"border-round border-1 surface-border p-4",children:(0,x.jsxs)("ul",{className:"m-0 p-0 list-none",children:[(0,x.jsx)("li",{className:"mb-10",children:(0,x.jsx)("div",{className:"flex",children:(0,x.jsxs)("div",{style:{flex:"1"},children:[(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"}),(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"})]})})}),(0,x.jsx)("li",{className:"mb-10",children:(0,x.jsx)("div",{className:"flex",children:(0,x.jsxs)("div",{style:{flex:"1"},children:[(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"}),(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"})]})})}),(0,x.jsx)("li",{className:"mb-10",children:(0,x.jsx)("div",{className:"flex",children:(0,x.jsxs)("div",{style:{flex:"1"},children:[(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"}),(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"})]})})}),(0,x.jsx)("li",{className:"mb-10",children:(0,x.jsx)("div",{className:"flex",children:(0,x.jsxs)("div",{style:{flex:"1"},children:[(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"}),(0,x.jsx)(k.E,{width:"100%",className:"mb-2 bg-emerald-500 dark:bg-gray-500"})]})})})]})})})};const N=function(e){let{templateData:t,template:a,_url:r,to:s}=e;const[l,i]=(0,o.useState)(),[n,d]=(0,o.useState)(),[m,c]=(0,o.useState)(),[u,v]=(0,o.useState)(!1);return(0,o.useEffect)((()=>{v(!0),f.A.post(w.O+r,{id:0}).then((e=>{console.log(e),v(!1),e.data.msg.length<=0||!Array.isArray(e.data.msg)?(0,C.Q)("error","No data"):(i(e.data.msg),d(e.data.msg))}))}),[]),(0,o.useEffect)((()=>{var e,t,o;i((t=m,o=n,"categories"==(e=a)?null===o||void 0===o?void 0:o.filter((e=>{var a;return null===e||void 0===e||null===(a=e.catg_name)||void 0===a?void 0:a.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase())})):"units"==e?null===o||void 0===o?void 0:o.filter((e=>{var a;return null===e||void 0===e||null===(a=e.unit_name)||void 0===a?void 0:a.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase())})):"departments"==e?null===o||void 0===o?void 0:o.filter((e=>{var a;return null===e||void 0===e||null===(a=e.dept_name)||void 0===a?void 0:a.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase())})):"designations"==e?null===o||void 0===o?void 0:o.filter((e=>{var a;return null===e||void 0===e||null===(a=e.desig_name)||void 0===a?void 0:a.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase())})):"vendors"==e?null===o||void 0===o?void 0:o.filter((e=>{var a,o,r,s;return(null===e||void 0===e||null===(a=e.vendor_name)||void 0===a?void 0:a.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(o=e.vendor_email)||void 0===o?void 0:o.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(r=e.vendor_contact)||void 0===r?void 0:r.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(s=e.vendor_phone)||void 0===s?void 0:s.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))})):"products"==e?null===o||void 0===o?void 0:o.filter((e=>{var a,o,r,s;return(null===e||void 0===e||null===(a=e.prod_name)||void 0===a?void 0:a.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(o=e.prod_make)||void 0===o?void 0:o.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(r=e.stk_cnt)||void 0===r?void 0:r.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(s=e.hsn_code)||void 0===s?void 0:s.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))})):"users"==e?null===o||void 0===o?void 0:o.filter((e=>{var a,o,r;return(null===e||void 0===e||null===(a=e.user_name)||void 0===a?void 0:a.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(o=e.user_email)||void 0===o?void 0:o.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))||(null===e||void 0===e||null===(r=e.user_phone)||void 0===r?void 0:r.toLowerCase().includes(null===t||void 0===t?void 0:t.toLowerCase()))})):void 0))}),[m]),(0,x.jsx)("div",{children:u?(0,x.jsx)(j,{className:"mt-10",flag:1}):(0,x.jsx)(y,{headers:t.headers,title:t.title,btnText:t.btnText,data:l,to:s,setSearch:e=>c(e)})})}},8366:(e,t,a)=>{a.d(t,{Q:()=>r});a(5043);var o=a(6433);const r=(e,t)=>{o.Ay.open({type:e,content:t})}}}]);
//# sourceMappingURL=8431.373a288c.chunk.js.map