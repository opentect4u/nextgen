"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[1172],{3041:(e,a,r)=>{r.d(a,{O:()=>n});const n="https://apinextgen.opentech4u.co.in:8001"},6460:(e,a,r)=>{r.d(a,{A:()=>i});r(5043);var n=r(3216),t=r(2167),l=r(9120),d=r(7297),s=r(880),o=r(579);const i=function(){const e=(0,n.Zp)();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d.A,{icon:(0,o.jsx)(l.A,{}),className:"sm:hidden",onClick:()=>e(-1),type:"primary",style:{right:24,bottom:80}}),(0,o.jsx)(s.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.3,type:"just"},className:"hidden sm:flex sm:justify-end items-center",children:(0,o.jsx)(t.A,{title:"Back",children:(0,o.jsx)("button",{className:" inline-flex items-center justify-center  text-sm font-medium text-center text-emerald-500 bg-primary-700 h-9 w-9  bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",onClick:()=>e(-1),children:(0,o.jsx)(l.A,{})})})})]})}},8834:(e,a,r)=>{r.d(a,{A:()=>s});r(5043);var n=r(617),t=r(1966),l=r(8143),d=r(579);const s=function(e){let{onReset:a,mode:r,onDelete:s}=e;return(0,d.jsxs)("div",{className:"flex justify-center",children:["A"==r&&(0,d.jsxs)("button",{type:"reset",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#f37373] bg-[#f37373] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:a,children:[(0,d.jsx)(n.A,{className:"mr-2"}),"Reset"]}),"E"==r&&(0,d.jsxs)("button",{type:"button",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#f37373] bg-[#f37373] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:s,children:[(0,d.jsx)(t.A,{className:"mr-2"}),"Delete"]}),(0,d.jsxs)("button",{type:"submit",className:" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-emerald-500 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600",children:[(0,d.jsx)(l.A,{className:"mr-2"}),"Submit"]})]})}},2141:(e,a,r)=>{r.d(a,{A:()=>s});r(5043);var n=r(6460),t=r(880),l=r(1581),d=r(579);const s=function(e){let{text:a,mode:r,data:s,title:o}=e;return(0,d.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5",children:(0,d.jsxs)("div",{className:"flex flex-col bg-emerald-500 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-2",children:[(0,d.jsx)(t.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.2,type:"just"},className:"text-xl font-semibold text-white my-1  dark:text-gray-400 ",children:a}),(0,d.jsxs)("div",{className:"flex justify-end items-center",children:[(0,d.jsx)(n.A,{}),1==r&&(0,d.jsx)(l.A,{toPrint:s,title:o})]})]})})}},8366:(e,a,r)=>{r.d(a,{Q:()=>t});r(5043);var n=r(6433);const t=(e,a)=>{n.Ay.open({type:e,content:a})}},1581:(e,a,r)=>{r.d(a,{A:()=>p});r(5043);var n=r(2167),t=r(4834),l=r(7297),d=r(691),s=r(579);const o=function(e){let{printData:a,title:r}=e;return console.log(a),(0,s.jsx)("div",{className:"mt-5",children:(0,s.jsx)(d.A,{title:r,items:a})})},i={created_by:"Created By",created_at:"Created At",modified_by:"Modified By",modified_at:"Modified At",catg_name:"Category Name",sl_no:"ID",desig_name:"Designation",unit_name:"Unit",dept_name:"Department",prod_name:"Product",prod_cat:"Category",prod_make:"Make",part_no:"Part No.",model_no:"Model No.",article_no:"Article No.",hsn_code:"HSN Code",stk_cnt:"Stock",prod_desc:"Description"};var m=r(3286);const c=function(){return(0,s.jsxs)("div",{className:"flex justify-center my-5 mb-5",children:[(0,s.jsx)("img",{src:m,className:"sm:h-14 h-9",alt:"Flowbite Logo"}),(0,s.jsx)("h2",{className:"mb-4 text-xl font-bold text-[#22543d]  dark:text-gray-400 ",children:"NextGen Automation Pvt Ltd"}),(0,s.jsx)("span",{className:"my-5 mb-5",children:"Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046 Ph-033 4068 6032/6450 0535 Email: info@ngapl.com"})]})};const p=function(e){let{toPrint:a,title:r}=e;console.log(a);var d=[];for(let n of Object.keys(a))"serial_number"!=n&&d.push({key:n,label:i[n]+" - ",children:a[n]});function m(){var e=document.getElementById("tablePrint"),a=window.open("","Print-Window");a.document.open(),a.document.writeln("<!DOCTYPE html>"),a.document.writeln('<html><head><title></title><style type="text/css">'),a.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),a.document.writeln('</head><body onload="window.print()">'),a.document.writeln(e.innerHTML),a.document.writeln("</body></html>"),a.document.close(),setTimeout((function(){a.close()}),10)}return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.A,{icon:(0,s.jsx)(t.A,{}),onClick:()=>m(),className:"sm:hidden",type:"primary",style:{right:24,bottom:80}}),(0,s.jsx)(n.A,{title:"Print",children:(0,s.jsx)("button",{onClick:()=>m(),className:" inline-flex items-center justify-center mr-4 sm:mr-1  text-sm font-medium text-center text-emerald-500 bg-primary-700 h-9 w-9  bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900  dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",children:(0,s.jsx)(t.A,{})})}),(0,s.jsxs)("div",{className:"hidden justify-center",id:"tablePrint",children:[(0,s.jsx)(c,{}),(0,s.jsx)(o,{className:"mt-5",title:r,printData:d})]})]})}},3731:(e,a,r)=>{r.d(a,{A:()=>l});var n=r(5043),t=r(579);const l=function(e){var a;const[r,l]=(0,n.useState)(null);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("label",{className:"block mb-2 text-sm font-bold text-emerald-500 dark:text-gray-100",children:[" ",e.label]}),1==e.mode&&(0,t.jsx)("input",{type:e.type,name:e.name,value:e.formControlName,className:"bg-bg-white border-1 border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:e.placeholder,onChange:e.handleChange,onBlur:e.handleBlur,disabled:e.disabled}),2==e.mode&&(0,t.jsxs)("select",{id:"countries",className:"bg-bg-white border-1 border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",value:e.formControlName,onChange:e.handleChange,name:e.name,placeholder:e.placeholder,options:null===e||void 0===e?void 0:e.data,onBlur:e.handleBlur,disabled:e.disabled,children:[(0,t.jsx)("option",{selected:!0,children:e.placeholder}),null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.map(((e,a)=>(0,t.jsx)("option",{value:e.code,children:e.name})))]}),3==e.mode&&(0,t.jsx)("textarea",{rows:"8",className:"bg-bg-white border-1 border-green-500 text-sm rounded-lg  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",name:e.name,value:e.formControlName,placeholder:e.placeholder,onChange:e.handleChange,onBlur:e.handleBlur})]})}},9657:(e,a,r)=>{r.d(a,{A:()=>l});r(5043);var n=r(880),t=r(579);const l=function(e){let{title:a}=e;return(0,t.jsxs)(n.P.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{delay:.1,type:"tween",stiffness:500},className:"text-[#C05746] text-sm py-2 px-2",children:[a,"!"]})}},1172:(e,a,r)=>{r.r(a),r.d(a,{default:()=>b});var n=r(5043),t=r(3216),l=r(8834),d=r(2141),s=r(9657),o=r(3731),i=r(3892),m=r(899),c=r(6213),p=r(8366),h=r(3041),u=r(1686),g=r(164),v=r(8655),x=r(5337),_=r(8223),y=r(579);const b=function(){const e=(0,t.g)(),[a,r]=(0,n.useState)(!1),[b,f]=(0,n.useState)({v_name:"",v_email:"",v_gst:"",v_pan:"",v_reg:"",v_remarks:"",v_address:"",dynamicFields:[{sl_no:0,poc_name:"",poc_ph_1:""}]}),j={v_name:"",v_email:"",v_gst:"",v_pan:"",v_reg:"",v_remarks:"",v_address:"",dynamicFields:[{sl_no:e.id>0?0:b.dynamicFields[0].sl_no,poc_name:"",poc_ph_1:"",poc_ph_2:""}]},k=m.Ik({v_name:m.Yj().required("Name is required"),v_email:m.Yj().required("Email is required").email("Incorrect email format"),v_address:m.Yj().required("Address is required"),v_pan:m.Yj(),v_gst:m.Yj(),v_remarks:m.Yj(),dynamicFields:m.YO().of(m.Ik().shape({poc_name:m.Yj().required("Contact person is required"),poc_ph_1:m.Yj().required("Phone is required").length(10),poc_ph_2:m.Yj().required("Phone is required").length(10)}))});return(0,n.useEffect)((()=>{+e.id>0&&(r(!0),c.A.post(h.O+"/api/getvendor",{id:e.id}).then((e=>{console.log(e.data.msg.desig_name),r(!1),f({v_name:e.data.msg.vendor_name,v_email:e.data.msg.vendor_email,poc_name:e.data.msg.vendor_contact,poc_ph_1:e.data.msg.vendor_phone,poc_ph_2:e.data.msg.vendor_phone,v_remarks:e.data.msg.vendor_remarks,v_gst:e.data.msg.vendor_gst,v_pan:e.data.msg.vendor_pan,v_reg:e.data.msg.vendor_reg,v_address:e.data.msg.vendor_address})})))}),[]),console.log(e,"params"),(0,y.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,y.jsxs)("div",{className:"py-8 mx-auto w-5/6 lg:py-16",children:[(0,y.jsx)(d.A,{text:e.id>0?"Update vendor":"Add vendor"}),(0,y.jsx)(u.A,{indicator:(0,y.jsx)(g.A,{spin:!0}),size:"large",className:"text-green-900 dark:text-gray-400",spinning:a,children:(0,y.jsx)(i.l1,{initialValues:+e.id>0?b:j,validationSchema:k,onSubmit:a=>{console.log("onsubmit called"),console.log(a),r(!0),c.A.post(h.O+"/api/addvendor",{v_id:+e.id,user:localStorage.getItem("email"),v_name:a.v_name,v_email:a.v_email,v_gst:a.v_gst,v_pan:a.v_pan,v_reg:a.v_reg,v_remarks:a.v_remarks,v_address:a.v_address,v_poc:a.dynamicFields}).then((e=>{r(!1),e.data.suc>0?(0,p.Q)("success",e.data.msg):(0,p.Q)("error",e.data.msg)}))},validateOnMount:!0,enableReinitialize:!0,children:a=>{let{values:r,handleChange:t,handleBlur:d,handleSubmit:m,errors:c,touched:p}=a;return(0,y.jsxs)("form",{onSubmit:m,children:[(0,y.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(o.A,{placeholder:"Type name...",type:"text",label:"Vendor name",name:"v_name",formControlName:r.v_name,handleChange:t,handleBlur:d,mode:1}),c.v_name&&p.v_name?(0,y.jsx)(s.A,{title:c.v_name}):null]}),(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(o.A,{placeholder:"Type email...",type:"text",label:"Vendor email",name:"v_email",formControlName:r.v_email,handleChange:t,handleBlur:d,mode:1}),c.v_email&&p.v_email?(0,y.jsx)(s.A,{title:c.v_email}):null]}),(0,y.jsx)("div",{}),(0,y.jsx)("div",{className:"sm:col-span-2 -mt-4",children:(0,y.jsxs)("div",{className:"grid gap-4 sm:grid-cols-3 sm:gap-6",children:[(0,y.jsxs)("div",{className:"sm:col-span-1",children:[(0,y.jsx)(o.A,{placeholder:"Type GST...",type:"text",label:"GST",name:"v_gst",formControlName:r.v_gst,handleChange:t,handleBlur:d,mode:1}),c.v_gst&&p.v_gst?(0,y.jsx)(s.A,{title:c.v_gst}):null]}),(0,y.jsxs)("div",{className:"sm:col-span-1",children:[(0,y.jsx)(o.A,{placeholder:"Type PAN...",type:"text",label:"PAN",name:"v_pan",formControlName:r.v_pan,handleChange:t,handleBlur:d,mode:1}),c.v_pan&&p.v_pan?(0,y.jsx)(s.A,{title:c.v_pan}):null]}),(0,y.jsxs)("div",{className:"sm:col-span-1",children:[(0,y.jsx)(o.A,{placeholder:"Type registration. no. ...",type:"text",label:"Registration no.",name:"v_reg",formControlName:r.v_reg,handleChange:t,handleBlur:d,mode:1}),c.v_reg&&p.v_reg?(0,y.jsx)(s.A,{title:c.v_reg}):null]})]})}),(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(o.A,{placeholder:"Lorem Ipsum Dolor Sit...",type:"text",label:"Deals in",name:"v_remarks",formControlName:r.v_remarks,handleChange:t,handleBlur:d,mode:3}),c.v_remarks&&p.v_remarks?(0,y.jsx)(s.A,{title:c.v_remarks}):null]}),(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(o.A,{placeholder:"Type vendor address here...",type:"text",label:"Address",name:"v_address",formControlName:r.v_address,handleChange:t,handleBlur:d,mode:3}),c.v_address&&p.v_address?(0,y.jsx)(s.A,{title:c.v_address}):null]}),(0,y.jsx)(i.ED,{name:"dynamicFields",children:e=>{let{push:a,remove:l}=e;return(0,y.jsxs)(y.Fragment,{children:[r.dynamicFields.map(((e,a)=>{var r,i,m,h,u,g,x,_,b,f,j,k;return(0,y.jsxs)(n.Fragment,{children:[(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsx)(o.A,{placeholder:"Type contact person name...",type:"text",label:"Contact person name",name:"dynamicFields[".concat(a,"].poc_name"),formControlName:e.poc_name,handleChange:t,handleBlur:d,mode:1}),null!==(r=c.dynamicFields)&&void 0!==r&&null!==(i=r[a])&&void 0!==i&&i.poc_name&&null!==(m=p.dynamicFields)&&void 0!==m&&null!==(h=m[a])&&void 0!==h&&h.poc_name?(0,y.jsx)(s.A,{title:c.dynamicFields[a].poc_name}):null]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(o.A,{placeholder:"Type contact person phone...",type:"number",label:"Contact person phone no.",name:"dynamicFields[".concat(a,"].poc_ph_1"),formControlName:e.poc_ph_1,handleChange:t,handleBlur:d,mode:1}),null!==(u=c.dynamicFields)&&void 0!==u&&null!==(g=u[a])&&void 0!==g&&g.poc_ph_1&&null!==(x=p.dynamicFields)&&void 0!==x&&null!==(_=x[a])&&void 0!==_&&_.poc_ph_1?(0,y.jsx)(s.A,{title:c.dynamicFields[a].poc_ph_1}):null]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(o.A,{placeholder:"Type contact person phone...",type:"number",label:"Contact person phone no.",name:"dynamicFields[".concat(a,"].poc_ph_2"),formControlName:e.poc_ph_2,handleChange:t,handleBlur:d,mode:1}),null!==(b=c.dynamicFields)&&void 0!==b&&null!==(f=b[a])&&void 0!==f&&f.poc_ph_2&&null!==(j=p.dynamicFields)&&void 0!==j&&null!==(k=j[a])&&void 0!==k&&k.poc_ph_2?(0,y.jsx)(s.A,{title:c.dynamicFields[a].poc_ph_2}):null]}),(0,y.jsx)("div",{className:"sm:col-span-2",children:(0,y.jsx)(v.A,{onClick:()=>l(a)})})]},a)})),(0,y.jsx)("div",{className:"sm:col-span-2",children:(0,y.jsx)(_.Ay,{type:"dashed",onClick:()=>a({sl_no:0,poc_name:"",poc_ph_1:""}),icon:(0,y.jsx)(x.A,{}),children:"Add field"})})]})}})]}),(0,y.jsx)(l.A,{mode:e.id>0?"E":"A"})]})}})})]})})}},3286:(e,a,r)=>{e.exports=r.p+"static/media/Logo.664ecbce05aa60f016eb.png"}}]);
//# sourceMappingURL=1172.c0f9999e.chunk.js.map