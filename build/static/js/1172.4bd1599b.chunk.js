"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[1172],{3041:(e,a,n)=>{n.d(a,{O:()=>r});const r="https://apinextgen.opentech4u.co.in:3011"},6460:(e,a,n)=>{n.d(a,{A:()=>i});n(5043);var r=n(3216),t=n(8483),l=n(9120),d=n(7297),o=n(880),s=n(579);const i=function(){const e=(0,r.Zp)();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.A,{icon:(0,s.jsx)(l.A,{}),className:"sm:hidden",onClick:()=>e(-1),type:"primary",style:{right:24,bottom:80}}),(0,s.jsx)(o.P.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{delay:.3,type:"just"},className:"hidden sm:flex sm:justify-end items-center",children:(0,s.jsx)(t.A,{title:"Back",children:(0,s.jsx)("button",{className:" inline-flex items-center justify-center  text-sm font-medium text-center text-emerald-500 bg-primary-700 h-9 w-9  bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",onClick:()=>e(-1),children:(0,s.jsx)(l.A,{})})})})]})}},8834:(e,a,n)=>{n.d(a,{A:()=>o});n(5043);var r=n(617),t=n(1966),l=n(8143),d=n(579);const o=function(e){let{onReset:a,mode:n,onDelete:o}=e;return(0,d.jsxs)("div",{className:"flex justify-center",children:["A"==n&&(0,d.jsxs)("button",{type:"reset",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#f37373] bg-[#f37373] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:a,children:[(0,d.jsx)(r.A,{className:"mr-2"}),"Reset"]}),"E"==n&&(0,d.jsxs)("button",{type:"button",className:"inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#f37373] bg-[#f37373] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900",onClick:o,children:[(0,d.jsx)(t.A,{className:"mr-2"}),"Delete"]}),(0,d.jsxs)("button",{type:"submit",className:" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-emerald-500 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600",children:[(0,d.jsx)(l.A,{className:"mr-2"}),"Submit"]})]})}},2141:(e,a,n)=>{n.d(a,{A:()=>o});n(5043);var r=n(6460),t=n(880),l=n(1581),d=n(579);const o=function(e){let{text:a,mode:n,data:o,title:s}=e;return(0,d.jsx)("div",{className:"bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5",children:(0,d.jsxs)("div",{className:"flex flex-col bg-emerald-500 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-2",children:[(0,d.jsx)(t.P.h2,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{delay:.2,type:"just"},className:"text-xl font-semibold text-white my-1  dark:text-gray-400 ",children:a}),(0,d.jsxs)("div",{className:"flex justify-end items-center",children:[(0,d.jsx)(r.A,{}),1==n&&(0,d.jsx)(l.A,{toPrint:o,title:s})]})]})})}},8366:(e,a,n)=>{n.d(a,{Q:()=>t});n(5043);var r=n(6433);const t=(e,a)=>{r.Ay.open({type:e,content:a})}},1581:(e,a,n)=>{n.d(a,{A:()=>p});n(5043);var r=n(8483),t=n(4834),l=n(7297),d=n(691),o=n(579);const s=function(e){let{printData:a,title:n}=e;return console.log(a),(0,o.jsx)("div",{className:"mt-5",children:(0,o.jsx)(d.A,{title:n,items:a})})},i={created_by:"Created By",created_at:"Created At",modified_by:"Modified By",modified_at:"Modified At",catg_name:"Category Name",sl_no:"ID",desig_name:"Designation",unit_name:"Unit",dept_name:"Department",prod_name:"Product",prod_cat:"Category",prod_make:"Make",part_no:"Part No.",model_no:"Model No.",article_no:"Article No.",hsn_code:"HSN Code",stk_cnt:"Stock",prod_desc:"Description"};var m=n(3286);const c=function(){return(0,o.jsxs)("div",{className:"flex justify-center my-5 mb-5",children:[(0,o.jsx)("img",{src:m,className:"sm:h-14 h-9",alt:"Flowbite Logo"}),(0,o.jsx)("h2",{className:"mb-4 text-xl font-bold text-[#22543d]  dark:text-gray-400 ",children:"NextGen Automation Pvt Ltd"}),(0,o.jsx)("span",{className:"my-5 mb-5",children:"Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046 Ph-033 4068 6032/6450 0535 Email: info@ngapl.com"})]})};const p=function(e){let{toPrint:a,title:n}=e;console.log(a);var d=[];for(let r of Object.keys(a))"serial_number"!=r&&d.push({key:r,label:i[r]+" - ",children:a[r]});function m(){var e=document.getElementById("tablePrint"),a=window.open("","Print-Window");a.document.open(),a.document.writeln("<!DOCTYPE html>"),a.document.writeln('<html><head><title></title><style type="text/css">'),a.document.writeln("@media print { .center { text-align: center;}                                         .inline { display: inline; }                                         .underline { text-decoration: underline; }                                         .left { margin-left: 315px;}                                          .right { margin-right: 375px; display: inline; }                                          table { border-collapse: collapse; font-size: 10px;}                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}                                           th, td { }                                         .border { border: 1px solid black; }                                          .bottom { bottom: 5px; width: 100%; position: fixed                                                                           } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>"),a.document.writeln('</head><body onload="window.print()">'),a.document.writeln(e.innerHTML),a.document.writeln("</body></html>"),a.document.close(),setTimeout((function(){a.close()}),10)}return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l.A,{icon:(0,o.jsx)(t.A,{}),onClick:()=>m(),className:"sm:hidden",type:"primary",style:{right:24,bottom:80}}),(0,o.jsx)(r.A,{title:"Print",children:(0,o.jsx)("button",{onClick:()=>m(),className:" inline-flex items-center justify-center mr-4 sm:mr-1  text-sm font-medium text-center text-emerald-500 bg-primary-700 h-9 w-9  bg-white hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900  dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800",children:(0,o.jsx)(t.A,{})})}),(0,o.jsxs)("div",{className:"hidden justify-center",id:"tablePrint",children:[(0,o.jsx)(c,{}),(0,o.jsx)(s,{className:"mt-5",title:n,printData:d})]})]})}},3731:(e,a,n)=>{n.d(a,{A:()=>l});var r=n(5043),t=n(579);const l=function(e){var a;const[n,l]=(0,r.useState)(null);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("label",{className:"block mb-2 text-sm font-bold text-emerald-500 dark:text-gray-100",children:[" ",e.label]}),1==e.mode&&(0,t.jsx)("input",{type:e.type,name:e.name,value:e.formControlName,className:"bg-bg-white border-1 border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:e.placeholder,onChange:e.handleChange,onBlur:e.handleBlur,disabled:e.disabled}),2==e.mode&&(0,t.jsxs)("select",{id:"countries",className:"bg-bg-white border-1 border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",value:e.formControlName,onChange:e.handleChange,name:e.name,placeholder:e.placeholder,options:null===e||void 0===e?void 0:e.data,onBlur:e.handleBlur,disabled:e.disabled,children:[(0,t.jsx)("option",{selected:!0,children:e.placeholder}),null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.map(((e,a)=>(0,t.jsx)("option",{value:e.code,children:e.name})))]}),3==e.mode&&(0,t.jsx)("textarea",{rows:"8",className:"bg-bg-white border-1 border-green-500 text-sm rounded-lg  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",name:e.name,value:e.formControlName,placeholder:e.placeholder,onChange:e.handleChange,onBlur:e.handleBlur})]})}},9657:(e,a,n)=>{n.d(a,{A:()=>l});n(5043);var r=n(880),t=n(579);const l=function(e){let{title:a}=e;return(0,t.jsxs)(r.P.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{delay:.1,type:"tween",stiffness:500},className:"text-[#C05746] text-sm py-2 px-2",children:[a,"!"]})}},1172:(e,a,n)=>{n.r(a),n.d(a,{default:()=>b});var r=n(5043),t=n(3216),l=n(8834),d=n(2141),o=n(9657),s=n(3731),i=n(3892),m=n(899),c=n(6213),p=n(8366),h=n(3041),u=n(1686),g=n(164),v=n(8655),x=n(5337),_=n(8223),y=n(579);const b=function(){const e=(0,t.g)(),[a,n]=(0,r.useState)(!1),[b,f]=(0,r.useState)({v_name:"",v_email:"",v_gst:"",v_pan:"",v_reg:"",v_remarks:"",v_address:"",dynamicFields:[{sl_no:0,poc_name:"",poc_ph_1:"",poc_ph_2:""}]}),j={v_name:"",v_email:"",v_phone:"",v_gst:"",v_pan:"",v_reg:"",v_remarks:"",v_address:"",dynamicFields:[{sl_no:e.id>0?0:b.dynamicFields[0].sl_no,poc_name:"",poc_ph_1:"",poc_ph_2:""}]},k=m.Ik({v_name:m.Yj().required("Name is required"),v_email:m.Yj().required("Email is required").email("Incorrect email format"),v_phone:m.Yj().required("Phone is required").length(10),v_address:m.Yj().required("Address is required"),v_pan:m.Yj(),v_gst:m.Yj(),v_remarks:m.Yj(),dynamicFields:m.YO().of(m.Ik().shape({poc_name:m.Yj().required("Contact person is required"),poc_ph_1:m.Yj().required("Phone is required").length(10),poc_ph_2:m.Yj().required("Phone is required").length(10)}))});return(0,r.useEffect)((()=>{+e.id>0&&(n(!0),c.A.post(h.O+"/api/getvendor",{id:e.id}).then((e=>{console.log(e.data.msg.desig_name),n(!1),f({v_name:e.data.msg.vendor_name,v_email:e.data.msg.vendor_email,poc_name:e.data.msg.vendor_contact,poc_ph_1:e.data.msg.vendor_phone,poc_ph_2:e.data.msg.vendor_phone,v_remarks:e.data.msg.vendor_remarks,v_gst:e.data.msg.vendor_gst,v_pan:e.data.msg.vendor_pan,v_reg:e.data.msg.vendor_reg,v_address:e.data.msg.vendor_address})})))}),[]),console.log(e,"params"),(0,y.jsx)("section",{className:"bg-white dark:bg-[#001529]",children:(0,y.jsxs)("div",{className:"py-8 mx-auto w-5/6 lg:py-16",children:[(0,y.jsx)(d.A,{text:e.id>0?"Update vendor":"Add vendor"}),(0,y.jsx)(u.A,{indicator:(0,y.jsx)(g.A,{spin:!0}),size:"large",className:"text-green-900 dark:text-gray-400",spinning:a,children:(0,y.jsx)(i.l1,{initialValues:+e.id>0?b:j,validationSchema:k,onSubmit:a=>{console.log("onsubmit called"),console.log(a),n(!0),c.A.post(h.O+"/api/addVendor",{v_id:+e.id,user:localStorage.getItem("email"),v_name:a.v_name,v_email:a.v_email,v_phone:a.v_phone.toString(),v_gst:a.v_gst,v_pan:a.v_pan,v_reg:a.v_reg,v_remarks:a.v_remarks,v_address:a.v_address,v_poc:a.dynamicFields}).then((e=>{n(!1),e.data.suc>0?(0,p.Q)("success",e.data.msg):(0,p.Q)("error",e.data.msg)}))},validateOnMount:!0,enableReinitialize:!0,children:a=>{let{values:n,handleChange:t,handleBlur:d,handleSubmit:m,errors:c,touched:p}=a;return(0,y.jsxs)("form",{onSubmit:m,children:[(0,y.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(s.A,{placeholder:"Type name...",type:"text",label:"Vendor name",name:"v_name",formControlName:n.v_name,handleChange:t,handleBlur:d,mode:1}),c.v_name&&p.v_name?(0,y.jsx)(o.A,{title:c.v_name}):null]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(s.A,{placeholder:"Type Phone No....",type:"text",label:"Vendor phone No.",name:"v_phone",formControlName:n.v_phone,handleChange:t,handleBlur:d,mode:1}),c.v_phone&&p.v_phone?(0,y.jsx)(o.A,{title:c.v_phone}):null]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(s.A,{placeholder:"Type email...",type:"text",label:"Vendor email",name:"v_email",formControlName:n.v_email,handleChange:t,handleBlur:d,mode:1}),c.v_email&&p.v_email?(0,y.jsx)(o.A,{title:c.v_email}):null]}),(0,y.jsx)("div",{className:"sm:col-span-2 -mt-4",children:(0,y.jsxs)("div",{className:"grid gap-4 sm:grid-cols-3 sm:gap-6",children:[(0,y.jsxs)("div",{className:"sm:col-span-1",children:[(0,y.jsx)(s.A,{placeholder:"Type GST...",type:"text",label:"GST",name:"v_gst",formControlName:n.v_gst,handleChange:t,handleBlur:d,mode:1}),c.v_gst&&p.v_gst?(0,y.jsx)(o.A,{title:c.v_gst}):null]}),(0,y.jsxs)("div",{className:"sm:col-span-1",children:[(0,y.jsx)(s.A,{placeholder:"Type PAN...",type:"text",label:"PAN",name:"v_pan",formControlName:n.v_pan,handleChange:t,handleBlur:d,mode:1}),c.v_pan&&p.v_pan?(0,y.jsx)(o.A,{title:c.v_pan}):null]}),(0,y.jsxs)("div",{className:"sm:col-span-1",children:[(0,y.jsx)(s.A,{placeholder:"Type registration. no. ...",type:"text",label:"Registration no.",name:"v_reg",formControlName:n.v_reg,handleChange:t,handleBlur:d,mode:1}),c.v_reg&&p.v_reg?(0,y.jsx)(o.A,{title:c.v_reg}):null]})]})}),(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(s.A,{placeholder:"Lorem Ipsum Dolor Sit...",type:"text",label:"Deals in",name:"v_remarks",formControlName:n.v_remarks,handleChange:t,handleBlur:d,mode:3}),c.v_remarks&&p.v_remarks?(0,y.jsx)(o.A,{title:c.v_remarks}):null]}),(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(s.A,{placeholder:"Type vendor address here...",type:"text",label:"Address",name:"v_address",formControlName:n.v_address,handleChange:t,handleBlur:d,mode:3}),c.v_address&&p.v_address?(0,y.jsx)(o.A,{title:c.v_address}):null]}),(0,y.jsx)(i.ED,{name:"dynamicFields",children:e=>{let{push:a,remove:l}=e;return(0,y.jsxs)(y.Fragment,{children:[n.dynamicFields.map(((e,a)=>{var n,i,m,h,u,g,x,_,b,f,j,k;return(0,y.jsxs)(r.Fragment,{children:[(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsx)(s.A,{placeholder:"Type contact person name...",type:"text",label:"Contact person name",name:"dynamicFields[".concat(a,"].poc_name"),formControlName:e.poc_name,handleChange:t,handleBlur:d,mode:1}),null!==(n=c.dynamicFields)&&void 0!==n&&null!==(i=n[a])&&void 0!==i&&i.poc_name&&null!==(m=p.dynamicFields)&&void 0!==m&&null!==(h=m[a])&&void 0!==h&&h.poc_name?(0,y.jsx)(o.A,{title:c.dynamicFields[a].poc_name}):null]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(s.A,{placeholder:"Type contact person phone...",type:"text",label:"Contact person phone no.",name:"dynamicFields[".concat(a,"].poc_ph_1"),formControlName:e.poc_ph_1,handleChange:t,handleBlur:d,mode:1}),null!==(u=c.dynamicFields)&&void 0!==u&&null!==(g=u[a])&&void 0!==g&&g.poc_ph_1&&null!==(x=p.dynamicFields)&&void 0!==x&&null!==(_=x[a])&&void 0!==_&&_.poc_ph_1?(0,y.jsx)(o.A,{title:c.dynamicFields[a].poc_ph_1}):null]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(s.A,{placeholder:"Type contact person phone...",type:"text",label:"Contact person phone no.",name:"dynamicFields[".concat(a,"].poc_ph_2"),formControlName:e.poc_ph_2,handleChange:t,handleBlur:d,mode:1}),null!==(b=c.dynamicFields)&&void 0!==b&&null!==(f=b[a])&&void 0!==f&&f.poc_ph_2&&null!==(j=p.dynamicFields)&&void 0!==j&&null!==(k=j[a])&&void 0!==k&&k.poc_ph_2?(0,y.jsx)(o.A,{title:c.dynamicFields[a].poc_ph_2}):null]}),(0,y.jsx)("div",{className:"sm:col-span-2",children:(0,y.jsx)(v.A,{onClick:()=>l(a)})})]},a)})),(0,y.jsx)("div",{className:"sm:col-span-2",children:(0,y.jsx)(_.Ay,{type:"dashed",onClick:()=>a({sl_no:0,poc_name:"",poc_ph_1:""}),icon:(0,y.jsx)(x.A,{}),children:"Add field"})})]})}})]}),(0,y.jsx)(l.A,{mode:e.id>0?"E":"A"})]})}})})]})})}},3286:(e,a,n)=>{e.exports=n.p+"static/media/Logo.664ecbce05aa60f016eb.png"}}]);
//# sourceMappingURL=1172.4bd1599b.chunk.js.map