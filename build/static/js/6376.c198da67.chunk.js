"use strict";(self.webpackChunkdemoecomm=self.webpackChunkdemoecomm||[]).push([[6376],{6376:(e,a,l)=>{l.r(a),l.d(a,{default:()=>j});var o=l(5043),n=l(3216),d=l(8834),i=l(2141),r=l(3731),t=l(3892),c=l(899),s=l(9657),m=l(8655),p=l(5337),_=l(8223),h=l(3041),g=l(8366),u=l(164),x=l(1686),b=l(6213),y=l(579);const j=function(){const[e,a]=(0,o.useState)(!1),l=(0,n.Zp)(),j=(0,n.g)();console.log(j,"params");const[v,f]=(0,o.useState)(),[C,N]=(0,o.useState)({clnt_name:"",clnt_email:"",clnt_phn:"",gst:"",pan:"",reg_no:"",dynamicFields:[{sl_no:0,poc_name:"",poc_designation:"",poc_department:"",poc_email:"",poc_direct_no:"",poc_ext_no:"",poc_ph_1:"",poc_ph_2:"",poc_location:"",poc_address:""}]}),k={clnt_name:"",clnt_email:"",clnt_phn:"",gst:"",pan:"",reg_no:"",dynamicFields:[{sl_no:j.id>0?0:C.dynamicFields[0].sl_no,poc_name:"",poc_designation:"",poc_department:"",poc_email:"",poc_direct_no:"",poc_ext_no:"",poc_ph_1:"",poc_ph_2:"",poc_location:"",poc_address:""}]},A=c.Ik({clnt_name:c.Yj().required("Client's name is required"),clnt_email:c.Yj().required("Client's email is required"),clnt_phn:c.Yj().required("Client's phone no. is required"),gst:c.Yj().required("GST is required"),pan:c.Yj().required("PAN is required"),reg_no:c.Yj().required("Registration no. is required"),dynamicFields:c.YO().of(c.Ik().shape({poc_name:c.Yj().optional(),poc_designation:c.Yj().optional(),poc_department:c.Yj().optional(),poc_email:c.Yj().optional(),poc_direct_no:c.Yj().optional(),poc_ext_no:c.Yj().optional(),poc_ph_1:c.Yj().optional(),poc_ph_2:c.Yj().optional(),poc_address:c.Yj().optional(),poc_location:c.Yj().optional()}))});return(0,o.useEffect)((()=>{+j.id>0&&(a(!0),b.A.post(h.O+"/api/getclient",{id:j.id}).then((e=>{var l,o,n,d;console.log(e.data.msg,"getclient show"),f(null===(l=e.data)||void 0===l?void 0:l.msg),a(!1),N({...k,clnt_name:e.data.msg.client_name,clnt_email:e.data.msg.client_email,clnt_phn:e.data.msg.client_phone,gst:null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.msg.client_gst,pan:null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.msg.client_pan,reg_no:null===e||void 0===e||null===(d=e.data)||void 0===d?void 0:d.msg.client_reg})})).catch((e=>{console.log(e),l("/error/"+e.code+"/"+e.message)})),b.A.post(h.O+"/api/getclientpoc",{id:j.id}).then((e=>{a(!1),console.log(e.data.msg[0],"res"),N((a=>({...a,dynamicFields:e.data.msg.map(((e,a)=>({sl_no:e.sl_no,poc_name:e.poc_name,poc_designation:e.poc_designation,poc_department:e.poc_department,poc_email:e.poc_email,poc_direct_no:e.poc_direct_no,poc_ext_no:e.poc_ext_no,poc_ph_1:e.poc_ph_1,poc_ph_2:e.poc_ph_2,poc_location:e.poc_location,poc_address:e.poc_address})))})))})).catch((e=>{console.log(e),l("/error/"+e.code+"/"+e.message)}))),console.log(C,"formValues"),console.log(j.id,"params.id")}),[j.id]),(0,y.jsxs)("section",{className:"bg-transparent dark:bg-[#001529]",children:[(0,y.jsx)(i.A,{text:j.id>0?"Update client":"Add client",mode:j.id>0?1:0,title:"Client",data:j.id&&v?v:""}),(0,y.jsx)("div",{className:"w-full bg-white p-6 rounded-2xl",children:(0,y.jsx)(x.A,{indicator:(0,y.jsx)(u.A,{spin:!0}),size:"large",className:"text-green-900 dark:text-gray-400",spinning:e,children:(0,y.jsx)(t.l1,{initialValues:+j.id>0?C:k,validationSchema:A,onSubmit:e=>{console.log("onSubmit"),a(!0),console.log(e),b.A.post(h.O+"/api/addclient",{c_id:+j.id,user:localStorage.getItem("email"),c_name:e.clnt_name,c_phone:e.clnt_phn.toString(),c_email:e.clnt_email,c_gst:e.gst,c_pan:e.pan,c_reg:e.reg_no,c_poc:e.dynamicFields}).then((e=>{var l;a(!1),f(null===(l=e.data)||void 0===l?void 0:l.msg),e.data.suc>0?(0,g.Q)("success",e.data.msg):(0,g.Q)("error",e.data.msg)})).catch((e=>{console.log(e),l("/error/"+e.code+"/"+e.message)}))},validateOnMount:!0,enableReinitialize:!0,children:e=>{var a,l;let{values:n,handleChange:i,handleBlur:c,handleSubmit:h,errors:g,touched:u}=e;return(0,y.jsxs)("form",{onSubmit:h,children:[(0,y.jsxs)("div",{className:"grid gap-4 sm:grid-cols-2 sm:gap-6",children:[(0,y.jsxs)("div",{className:"sm:col-span-2",children:[(0,y.jsx)(r.A,{placeholder:"Type user name...",type:"text",label:"Client name",name:"clnt_name",formControlName:n.clnt_name,handleChange:i,handleBlur:c,mode:1}),g.clnt_name&&u.clnt_name&&(0,y.jsx)(s.A,{title:g.clnt_name})]}),(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsx)(r.A,{placeholder:"Type client's email...",type:"text",label:"Email",name:"clnt_email",formControlName:n.clnt_email,handleChange:i,handleBlur:c,mode:1}),g.clnt_email&&u.clnt_email&&(0,y.jsx)(s.A,{title:g.clnt_email})]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(r.A,{placeholder:"+91 123-456-7890",type:"number",label:"Phone No.",name:"clnt_phn",formControlName:n.clnt_phn,handleChange:i,handleBlur:c,mode:1}),g.clnt_phn&&u.clnt_phn&&(0,y.jsx)(s.A,{title:g.clnt_phn})]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(r.A,{placeholder:"Type GST",type:"text",label:"GST",name:"gst",formControlName:n.gst,handleChange:i,handleBlur:c,mode:1}),g.gst&&u.gst&&(0,y.jsx)(s.A,{title:g.gst})]}),(0,y.jsxs)("div",{children:[(0,y.jsx)(r.A,{placeholder:"Type PAN",type:"text",label:"PAN",name:"pan",formControlName:n.pan,handleChange:i,handleBlur:c,mode:1}),g.pan&&u.pan&&(0,y.jsx)(s.A,{title:g.pan})]}),(0,y.jsxs)("div",{className:"w-full sm:col-span-2",children:[(0,y.jsx)(r.A,{placeholder:"Type Reg No.",type:"text",label:"Reg No.",name:"reg_no",formControlName:n.reg_no,handleChange:i,handleBlur:c,mode:1}),g.reg_no&&u.reg_no&&(0,y.jsx)(s.A,{title:g.reg_no})]}),(0,y.jsx)(t.ED,{name:"dynamicFields",children:e=>{let{push:a,remove:l}=e;return(0,y.jsxs)(y.Fragment,{children:[n.dynamicFields.map(((e,a)=>{var d,t,s,p,_,h,g,u,x,b;return(0,y.jsxs)(o.Fragment,{children:[(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type the name of Contact Person...",type:"text",label:"Contact Person",name:"dynamicFields[".concat(a,"].poc_name"),formControlName:(null===(d=n.dynamicFields[a])||void 0===d?void 0:d.poc_name)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type POC Designation...",type:"text",label:"POC Designation",name:"dynamicFields[".concat(a,"].poc_designation"),formControlName:(null===(t=n.dynamicFields[a])||void 0===t?void 0:t.poc_designation)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type POC department...",type:"text",label:"POC Department",name:"dynamicFields[".concat(a,"].poc_department"),formControlName:(null===(s=n.dynamicFields[a])||void 0===s?void 0:s.poc_department)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type POC Email...",type:"text",label:"POC Email",name:"dynamicFields[".concat(a,"].poc_email"),formControlName:(null===(p=n.dynamicFields[a])||void 0===p?void 0:p.poc_email)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type POC Direct No.",type:"text",label:"POC Direct No",name:"dynamicFields[".concat(a,"].poc_direct_no"),formControlName:(null===(_=n.dynamicFields[a])||void 0===_?void 0:_.poc_direct_no)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type POC Extension No.",type:"text",label:"POC Extension No",name:"dynamicFields[".concat(a,"].poc_ext_no"),formControlName:(null===(h=n.dynamicFields[a])||void 0===h?void 0:h.poc_ext_no)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type POC Primary Phone No.",type:"text",label:"POC Primary Phone No.",name:"dynamicFields[".concat(a,"].poc_ph_1"),formControlName:(null===(g=n.dynamicFields[a])||void 0===g?void 0:g.poc_ph_1)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type POC Secondary Phone No.",type:"text",label:"POC Secondary Phone No.",name:"dynamicFields[".concat(a,"].poc_ph_2"),formControlName:(null===(u=n.dynamicFields[a])||void 0===u?void 0:u.poc_ph_2)||"",handleChange:i,handleBlur:c,mode:1})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type Client Location...",type:"text",label:"Client Location",name:"dynamicFields[".concat(a,"].poc_location"),formControlName:(null===(x=n.dynamicFields[a])||void 0===x?void 0:x.poc_location)||"",handleChange:i,handleBlur:c,mode:3})}),(0,y.jsx)("div",{children:(0,y.jsx)(r.A,{placeholder:"Type Delivery Address...",type:"text",label:"Delivery Address",name:"dynamicFields[".concat(a,"].poc_address"),formControlName:(null===(b=n.dynamicFields[a])||void 0===b?void 0:b.poc_address)||"",handleChange:i,handleBlur:c,mode:3})}),(0,y.jsx)("div",{className:"sm:col-span-2",children:(0,y.jsx)(m.A,{onClick:()=>l(a)})})]},a)})),(0,y.jsx)("div",{className:"sm:col-span-2",children:(0,y.jsx)(_.Ay,{onClick:()=>a({sl_no:0,poc_name:"",poc_designation:"",poc_department:"",poc_email:"",poc_direct_no:"",poc_ext_no:"",poc_ph_1:"",poc_ph_2:"",poc_location:"",poc_address:""}),icon:(0,y.jsx)(p.A,{}),children:"Add field"})})]})}}),j.id>0&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsx)("label",{className:"block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100",children:"Created By"}),(0,y.jsx)("input",{className:"bg-bg-white border border-green-500 text-gray-800 text-sm rounded-lg  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",disabled:!0,value:null===v||void 0===v?void 0:v.created_by})]}),(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsx)("label",{className:"block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100",children:"Created At"}),(0,y.jsx)("input",{className:"bg-bg-white border border-green-500 text-gray-800 text-sm rounded-lg  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",disabled:!0,value:null===v||void 0===v||null===(a=v.created_at)||void 0===a?void 0:a.split("T").join(" ")})]}),(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsx)("label",{className:"block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100",children:"Modified By"}),(0,y.jsx)("input",{className:"bg-bg-white border border-green-500 text-gray-800 text-sm rounded-lg  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",disabled:!0,value:null===v||void 0===v?void 0:v.modified_by})]}),(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsx)("label",{className:"block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100",children:"Modified at"}),(0,y.jsx)("input",{className:"bg-bg-white border border-green-500 text-gray-800 text-sm rounded-lg  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",disabled:!0,value:null===v||void 0===v||null===(l=v.modified_at)||void 0===l?void 0:l.split("T").join(" ")})]})]})]}),(0,y.jsx)(d.A,{mode:j.id>0?"E":"A"})]})}})})})]})}}}]);
//# sourceMappingURL=6376.c198da67.chunk.js.map