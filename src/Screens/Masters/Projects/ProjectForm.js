import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import { Message } from "../../../Components/Message";
import { useNavigate } from "react-router-dom";
import {
  LoadingOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  InfoOutlined 
} from "@ant-design/icons";
import { Spin } from "antd";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import axios from "axios";
import { url } from "../../../Address/BaseUrl";
import AuditTrail from "../../../Components/AuditTrail";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import DialogBox from "../../../Components/DialogBox";

function ProjectForm() {
  const navigate = useNavigate();
  const [client, setClient] = useState([]);
  const [globalClient,setGlobal]=useState([])
  const params = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pmList, setPMList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [yesNo, setYesNoList] = useState([]);
  const [pocList, setPocList] = useState([]);
  const [nameList, setPocNameList] = useState([]);
  const [priceBais, setPriceBasisList] = useState([]);
  const [selectedPoc, setselectedPoc] = useState(false);
  const [ldClsVal, setLdClsVal] = useState(false);
  const [gstPan, setGstPan] = useState(false);
  const [proj_id, setProjID] = useState("");
  const [assgn_pm, setAssign] = useState("");
  const [projnm, setProjnm] = useState("");
  const [order_id, setOrderID] = useState("");
  const [order_dt, setOrderDt] = useState("");
  const [proj_ordr_val, setOrderVal] = useState("");
  const [prc_basis, setProjBasis] = useState("");
  const [proj_end_delvry_dt, setEndDel] = useState("");
  const [ld_cls, setLdClause] = useState("");
  const [ld_cls_dtl, setDtl] = useState("");
  const [warranty_check, setWarranty] = useState("");
  const [erctn_res, setErection] = useState("");
  const [docs, setDocs] = useState();
  const [locList, setLocList] = useState([]);
  const [client_id, setClientID] = useState("");
  const [end_user, setEndUser] = useState("");
  const [client_loc, setClientLoc] = useState("");
  const [proj_consultant, setConsultant] = useState("");
  const [epc_con, setEPC] = useState("");
  const [p_gst, setGST] = useState("");
  const [p_pan, setPAN] = useState("");
  const [proj_des, setDes] = useState("");
  const [clientLocList, setClientLocList] = useState([]);
  const [visible,setVisible]=useState(false)
  const [clientInfo,setClientInfo]=useState()
  const [flag,setFlag]=useState()
  const[info,setInfo]=useState()
  const [pocSet, setPocSet] = useState([
    { sl_no: 0, poc_name: "", poc_ph_1: "", poc_designation: "", poc_email: "" },
  ]);
  const handleDtChange = (index,event) => {
    console.log(event)
    const selected = pocList.find((poc) => poc.sl_no == event.target.value);
    console.log(selected)
    let data = [...pocSet];
    console.log(data)
    console.log(event.target.name,event.target.value)
      
    data[index][event.target.name] = event.target.value;
    // data[index]['poc_name'] = selected.sl_no;
    data[index]['poc_email'] = selected.poc_email;
    data[index]['poc_ph_1'] = selected.poc_ph_1;
    data[index]['poc_designation']= selected.poc_designation
    setPocSet(data);
  };
  const addDt = () => {
    setPocSet([...pocSet,{ sl_no: 0, poc_name: "", poc_ph_1: "", poc_designation: "", poc_email: "" }
    ]);
  };
  const removeDt = (index) => {
    let data = [...pocSet];
    data.splice(index, 1);
    setPocSet(data);
  };
  const stepperRef = useRef(null);

  let projectStatusOptions = [
    { code: "O", name: "Open" },
    { code: "C", name: "Close" },
  ];
  let yesNoList = [
    { code: "Y", name: "Yes" },
    { code: "N", name: "No" },
  ];
  let priceBasisList = [
    { code: "F", name: "For" },
    { code: "E", name: "Ex-Work" },
  ];

  var clientList = [];
  var pocNameList = [];

 
  const handleChangeClient = (event) => {
    console.log(client_id);
    const value = event.target.value;
    console.log(value, "handleChangeClient");
    setLocList([]);

    if (value) {
      setGstPan(true);
    } else {
      setGstPan(false);
    }
    axios.post(url + "/api/getclient", { id: value }).then((res) => {
      setClientInfo(res.data.msg)
      console.log(res.data.msg.client_gst, "getclient project");
    });
    axios.post(url + "/api/getclientpoc", { id: value }).then((res) => {
      console.log(res, "getclientpoc");
      setPocList(res.data.msg);
      for (let i = 0; i < res?.data?.msg?.length; i++) {
        pocNameList.push({
          name: res?.data?.msg[i].poc_name,
          code: res?.data?.msg[i].sl_no,
        });
        setPocNameList(pocNameList);
      }
    });
    axios.post(url + "/api/getclientloc", { id: value }).then((res) => {
      console.log(res, "getclientloc");
      setLocList(res.data.msg);
      setClientLocList(res.data.msg);
      locList.length = 0;

      for (let i = 0; i < res?.data?.msg?.length; i++) {
        locList.push({
          name: res?.data?.msg[i].c_loc,
          code: res?.data?.msg[i].c_loc,
        });
        setLocList(locList);
      }
    });
  };
 
 

  useEffect(() => {
    setLoading(true)
    axios.post(url + "/api/getclient", { id: 0 })
    .then((res) => {
      console.log(res, "res client");
      for (let i = 0; i < res?.data?.msg?.length; i++) {
        clientList.push({
          name: res?.data?.msg[i].client_name,
          code: res?.data?.msg[i].sl_no,
        });
      }
      setClient(clientList);
      setGlobal(res.data.msg)

   

    });
    axios.post(url + "/api/getuser", { id: 0 }).then((res) => {
      console.log(res.data.msg, "res user");
      const pmlist = res.data.msg
        .filter((user) => user.user_type === "PM")
        .map((user) => ({ name: user.user_name, code: user.sl_no }));
      console.log(pmlist, "PMList");
      setLoading(false)
      setPMList(pmlist);
    });
    setStatusList(projectStatusOptions);
    setPriceBasisList(priceBasisList);
    setYesNoList(yesNoList);
    console.log(globalClient)
    if (+params.id > 0) {
      setLoading(true);
    
      axios.post(url + "/api/getproject", { id: params.id }).then((resProj) => {
        console.log(resProj.data.msg, "getproject");
        setData(resProj.data?.msg);
           
            axios.post(url + "/api/getclientpoc", { id: resProj?.data?.msg.client_id }).then((resPoc) => {
                console.log(resPoc, "getclientpoc");
                setPocList(resPoc.data.msg);
                for (let i = 0; i < resPoc?.data?.msg?.length; i++) {
                  pocNameList.push({
                    name: resPoc?.data?.msg[i].poc_name,
                    code: resPoc?.data?.msg[i].sl_no,
                  });
                  setPocNameList(pocNameList);
                }
                axios.post(url + "/api/getclientloc", { id: resProj?.data?.msg.client_id }).then((resLoc) => {
                    console.log(resLoc, "getclientloc");
                    setLocList(resLoc.data.msg);
                    setClientLocList(resLoc.data.msg);
                    locList.length = 0;
              
                    for (let i = 0; i < resLoc?.data?.msg?.length; i++) {
                      locList.push({
                        name: resLoc?.data?.msg[i].c_loc,
                        code: resLoc?.data?.msg[i].c_loc,
                      });
                      setLocList(locList);
                    }
                    pocSet.length=0
                    axios.post(url + "/api/getprojectpoc", { id: resProj?.data?.msg.proj_id }).then((res) => {
                        for (let i = 0; i < res?.data?.msg?.length; i++) {
                            pocSet.push({
                              sl_no: res?.data?.msg[i].sl_no,
                              poc_name: res?.data?.msg[i].poc_name,
                              poc_ph_1: res?.data?.msg[i].poc_phone_1,
                              poc_designation: res?.data?.msg[i].poc_designation,
                              poc_email:res?.data?.msg[i].poc_email
                            });
                          }
                          setPocSet(pocSet)
                          setProjID(resProj?.data?.msg.proj_id)
                          setAssign(resProj?.data?.msg.proj_manager)
                          setProjnm(resProj?.data?.msg.proj_name)
                          setClientID(resProj?.data?.msg.client_id)
                          console.log(globalClient)
                          axios.post(url + "/api/getclient", { id: 0 })
                          .then((resclientdt) => {
                          setClientInfo(resclientdt.data.msg?.filter(e=>e.sl_no==resProj?.data?.msg.client_id)[0])
                          console.log(resclientdt.data.msg?.filter(e=>e.sl_no==resProj?.data?.msg.client_id)[0],"gggggggg")
                          })
                          setGST(resProj?.data?.msg.client_gst)
                          setPAN(resProj?.data?.msg.client_pan)
                          setClientLoc(resProj?.data?.msg.client_location)
                          setOrderID(resProj?.data?.msg.order_id)
                          setOrderDt(resProj?.data?.msg.order_date)
                          setDes(resProj?.data?.msg.proj_desc)
                          setEndUser(resProj?.data?.msg.proj_end_user)
                          setConsultant(resProj?.data?.msg.proj_consultant)
                          setEPC(resProj?.data?.msg.epc_contractor)
                          setOrderVal(resProj?.data?.msg.proj_order_val)
                          setProjBasis(resProj?.data?.msg.price_basis)
                          setLdClause(resProj?.data?.msg.ld_clause_flag)
                          setLdClsVal(resProj?.data?.msg.ld_clause_flag=='Y'?true:false)
                          setDtl(resProj?.data?.msg.ld_clause)
                          setErection(resProj?.data?.msg.erection_responsibility)
                          setWarranty(resProj?.data?.msg.warranty)
                          setLoading(false)
                      })

                  });
              });
    })
}
  }, []);
 
  const onSubmitClient = (values) => {
    console.log("client called");
      console.log(client_id,assgn_pm,client_loc,p_gst,p_pan,proj_des,end_user,proj_consultant,epc_con,pocSet);
      setLoading(true)
       const formData=new FormData()
      //  formData.append("id",+params.id)
      //  formData.append("user",localStorage.getItem("email"))

      //  formData.append("proj_id", proj_id);
      //       formData.append("proj_name", projnm);
      //       formData.append("client_id", client_id);
      //       formData.append("client_location", client_loc);
      //       formData.append("client_gst", p_gst);
      //       formData.append("client_pan", p_pan);
      //       formData.append("order_id", order_id);
      //       formData.append("order_date", order_dt);
      //       formData.append("proj_delivery_date", proj_end_delvry_dt);
      //       formData.append("proj_desc", proj_des);
      //       formData.append("proj_order_val", proj_ordr_val);
      //       formData.append("proj_end_user", end_user);
      //       formData.append("proj_consultant", proj_consultant);
      //       formData.append("epc_contractor", epc_con);
      //       formData.append("price_basis", prc_basis);
      //       formData.append("ld_clause_flag", ld_cls);
      //       formData.append("ld_clause", ld_cls_dtl);
      //       formData.append("erection_responsibility", erctn_res);
      //       formData.append("warranty", warranty_check);
      //       formData.append("proj_manager", +assgn_pm);
      //       formData.append("proj_poc", pocSet);
            // console.log(docs);
            // formData.append("docs",docs)
           
              // arr.push(dt)
          
       axios.post(url + "/api/addproject",  {
            id: +params.id,
            user: localStorage.getItem("email"),
            proj_id: proj_id,
            proj_name: projnm,
            client_id: client_id,
            client_location:client_loc,
            client_gst:p_gst,
            client_pan:p_pan,
            order_id: order_id,
            order_date: order_dt,
            proj_delivery_date: proj_end_delvry_dt,
            proj_desc: proj_des,
            proj_order_val: proj_ordr_val,
            proj_end_user: end_user,
            proj_consultant: proj_consultant,
            epc_contractor: epc_con,
            price_basis: prc_basis,
            ld_clause_flag: ld_cls,
            ld_clause: ld_cls_dtl,
            erection_responsibility: erctn_res,
            warranty: warranty_check,
            proj_manager: +assgn_pm,
            proj_poc:pocSet
           // c_location: values.poc_location,
            // c_address: values.poc_address,

        }
        )
        .then((res) => {
            setData(res.data?.msg);
            if (res.data.suc > 0) {
              formData.append("proj_id",proj_id)
              var arr=new Array()
              formData.append("user",localStorage.getItem("email"))
              for(let dt of docs){
                arr.push(dt)
                formData.append("docs",arr)
              }
            console.log(formData,docs)
              
                axios.post(url+'/api/add_proj_files',formData).then(resProjFile=>{
                  if(resProjFile.data.suc>0){
                    Message("success", res.data.msg);
                  }
                  else{
                    Message("error", res.data.msg);

                  }
                })
            } else {
                Message("error", res.data.msg);
            }
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
            navigate("/error" + "/" + err.code + "/" + err.message);
        });
  };
  const onSubmitProject = () => {
   console.log(docs)
   
  };

  return (
    <section className="bg-transparent dark:bg-[#001529]">
      {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
      <HeadingTemplate
        text={params.id > 0 ? "Update client order" : "Add client order"}
        mode={params.id > 0 ? 1 : 0}
        title={"Project"}
        data={params.id && data ? data : ""}
      />
      <div className="w-full bg-white p-6 rounded-2xl">
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="text-green-900 dark:text-gray-400"
          spinning={loading}
        >
          <div className="card flex justify-content-center">
            <Stepper ref={stepperRef} style={{ flexBasis: "80rem" }}>
              <StepperPanel header="Project Details">
                {/* <div className="flex flex-column h-12rem"> */}
                {/* <form > */}

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <TDInputTemplate
                      placeholder="Type product ID..."
                      type="text"
                      label="Project ID"
                      name="proj_id"
                      formControlName={proj_id}
                      handleChange={(txt) => setProjID(txt.target.value)}
                      mode={1}
                      disabled={params.id > 0}
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <TDInputTemplate
                      placeholder="Type product name..."
                      type="text"
                      label="Project Name"
                      name="projnm"
                      formControlName={projnm}
                      handleChange={(txt) => setProjnm(txt.target.value)}
                      mode={1}
                    />
                  </div>

                  <div>
                    <TDInputTemplate
                      placeholder="Select order no."
                      type="text"
                      label="Order No."
                      name="order_id"
                      formControlName={order_id}
                      handleChange={(txt) => setOrderID(txt.target.value)}
                      mode={1}
                      disabled={params.id > 0}
                    />
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type order date..."
                      type="date"
                      label="Order Date"
                      name="order_dt"
                      formControlName={order_dt}
                      handleChange={(txt) => setOrderDt(txt.target.value)}
                      mode={1}
                    />
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type project order value..."
                      type="text"
                      label="Project Order Value"
                      name="proj_ordr_val"
                      formControlName={proj_ordr_val}
                      handleChange={(txt) => setOrderVal(txt.target.value)}
                      mode={1}
                    />
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type price basis"
                      type="text"
                      label="Price Basis"
                      name="prc_basis"
                      formControlName={prc_basis}
                      handleChange={(txt) => setProjBasis(txt.target.value)}
                      data={priceBais}
                      mode={2}
                    />
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type order date..."
                      type="date"
                      label="Project end delivery Date"
                      name="proj_end_delvry_dt"
                      formControlName={proj_end_delvry_dt}
                      handleChange={(txt) => setEndDel(txt.target.value)}
                      mode={1}
                    />
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type LD clause"
                      type="text"
                      label="LD Clause"
                      name="ld_cls"
                      formControlName={ld_cls}
                      handleChange={(txt) => {
                        setLdClause(txt.target.value);
                        setLdClsVal(ld_cls == "Y" ? false : true);
                      }}
                      data={yesNo}
                      mode={2}
                    />
                  </div>
                  {ldClsVal && (
                    <div>
                      <TDInputTemplate
                        placeholder="Type LD clause details"
                        type="text"
                        label="LD Clause Details"
                        name="ld_cls_dtl"
                        formControlName={ld_cls_dtl}
                        handleChange={(txt) => setDtl(txt.target.value)}
                        mode={3}
                      />
                    </div>
                  )}
                  <div>
                    <TDInputTemplate
                      placeholder="Type Warranty"
                      type="text"
                      label="Warranty"
                      name="warranty_check"
                      formControlName={warranty_check}
                      handleChange={(txt) => setWarranty(txt.target.value)}
                      data={yesNo}
                      mode={3}
                    />
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type erection responsibility"
                      type="text"
                      label="Erection Responsibility"
                      name="erctn_res"
                      formControlName={erctn_res}
                      handleChange={(txt) => setErection(txt.target.value)}
                      data={yesNo}
                      mode={2}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      type="file"
                      label="PO & Other Docs"
                      name="docs"
                      multiple={true}
                      // formControlName={docs[0]}
                      handleChange={(event) => setDocs(event.target.files)}
                      mode={1}
                    />
                  </div>
                </div>
                {/* </div> */}
                <div className="flex pt-4 justify-content-end">
                  <button
                    className=" disabled:bg-gray-400 
                                        disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                    iconPos="right"
                    onClick={() => {
                      onSubmitProject();
                      stepperRef.current.nextCallback();
                    }}
                  >
                    {" "}
                    Next
                    <ArrowRightOutlined className="ml-2" />
                  </button>
                </div>
                {/* </form> */}
              </StepperPanel>
              <StepperPanel header="Client Details">
              <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="text-green-900 dark:text-gray-400"
          spinning={loading}
        >
                <div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
                  <div className="sm:col-span-4">
                    <TDInputTemplate
                      placeholder="Select client..."
                      type="text"
                      label="Client"
                      name="client_id"
                      formControlName={client_id}
                      handleChange={(text) => {
                        setClientID(text.target.value);
                        console.log(clientLocList,pocList)
                        handleChangeClient(text);
                      }}
                      data={client}
                      mode={2}
                      disabled={params.id > 0}
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-center">
                {client_id &&   <button className=" disabled:bg-gray-400 
                  disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" onClick={()=>{setFlag(5);setVisible(true)}}>
                    View client Details

                   </button>}
                  </div>
                  <>
                    {" "}
                    <div className="sm:col-span-2">
                      <TDInputTemplate
                        placeholder="Select client location"
                        type="text"
                        label="Client Location"
                        name="client_loc"
                        formControlName={client_loc}
                        handleChange={(txt) => {
                          setClientLoc(txt.target.value);
                          console.log(
                            clientLocList,
                            clientLocList?.filter(
                              (e) => e.c_loc == txt.target.value
                            )
                          );
                          setGST(
                            clientLocList?.filter(
                              (e) => e.c_loc == txt.target.value
                            )[0].c_gst
                          );
                          setPAN(
                            clientLocList?.filter(
                              (e) => e.c_loc == txt.target.value
                            )[0].c_pan
                          );
                        }}
                        data={locList}
                        mode={2}
                        disabled={params.id > 0}
                      />
                    </div>
                    <div className="col-span-2">
                      <TDInputTemplate
                        placeholder="Type GST"
                        type="text"
                        label="GST"
                        name="p_gst"
                        formControlName={p_gst}
                        disabled
                        mode={1}
                      />
                    </div>
                    <div className="col-span-2">
                      <TDInputTemplate
                        placeholder="Type PAN"
                        type="text"
                        label="PAN"
                        name="p_pan"
                        formControlName={p_pan}
                        mode={1}
                        disabled
                      />
                    </div>
                  </>
                 
                  <div className="sm:col-span-6">
                    <TDInputTemplate
                      placeholder="Type description..."
                      type="text"
                      label="Project Description"
                      name="proj_des"
                      formControlName={proj_des}
                      handleChange={(txt) => setDes(txt.target.value)}
                      mode={3}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Type end user..."
                      type="text"
                      label="End User"
                      name="end_user"
                      formControlName={end_user}
                      handleChange={(txt) => setEndUser(txt.target.value)}
                      mode={1}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Type consultant..."
                      type="text"
                      label="Consultant"
                      name="proj_consultant"
                      formControlName={proj_consultant}
                      handleChange={(txt) => setConsultant(txt.target.value)}
                      mode={1}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Type EPC..."
                      type="text"
                      label="EPC Contractor"
                      name="epc_con"
                      formControlName={epc_con}
                      handleChange={(txt) => setEPC(txt.target.value)}
                      mode={1}
                    />
                  </div>

                
                </div>
                {pocSet.map((input, index) => (
                    <>
                      <div key={index} className="flex-col gap-3 justify-between mt-12">
                        <div className="flex gap-2 justify-end mt-4 -mb-5">
                          {pocSet.length > 1 && (
                            <button
                              className=" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-white bg-primary-700 h-6 w-6  bg-red-900 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800"
                              onClick={() => removeDt(index)}
                            >
                              -
                            </button>
                          )}
                          <button
                            className=" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-white bg-primary-700 h-6 w-6  bg-green-900 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800"
                            onClick={() => addDt()}
                          >
                            +
                          </button>
                        {pocSet[index]?.poc_name &&  <button
                            className=" inline-flex items-center justify-center -mt-1 text-sm font-medium text-center text-white bg-primary-700 h-6 w-6 bg-blue-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={()=>
                            {  console.log(pocSet[index])
                             setFlag(6)
                             setInfo(pocList.filter(e=>e.sl_no==+pocSet[index]?.poc_name)[0])
                             setVisible(true)
                            }
                            
                            }
                          >
                            <InfoOutlined/>
                          </button>}
                        </div>
                        <div className="grid grid-cols-3 gap-5 mb-5">
                         
                       
                        <div className="col-span-1">
                        <TDInputTemplate
                          placeholder="Choose name"
                          formControlName={input?.poc_name}
                          handleChange={event => handleDtChange(index, event)}
                          label="Contact Person"
                          name="poc_name"
                          data={nameList}
                          mode={2}
                        />
                        </div>
                              <>
                                <div className="sm:col-span-1 hidden">
                                  <TDInputTemplate
                                    type="text"
                                    label="Email"
                                    name="poc_email"
                                    formControlName={input?.poc_email}
                                    mode={1}
                                    disabled
                                  />
                                </div>
                                <div  className="sm:col-span-1">
                                  <TDInputTemplate
                                    type="text"
                                    label="POC Designation"
                                    name="poc_designation"
                                    formControlName={input?.poc_designation}
                                    mode={1}
                                    disabled
                                  />
                                </div>
                                <div  className="sm:col-span-1">
                                  <TDInputTemplate
                                    type="text"
                                    label="POC Primary Phone No."
                                    name="poc_ph_1"
                                    formControlName={input?.poc_ph_1}
                                    mode={1}
                                    disabled
                                  />
                                </div>
                               
                              </>
                        
                        </div>
                       
                      </div>
                    </>
                  ))}
                <div className="sm:col-span-2">
                  <TDInputTemplate
                    placeholder="Project Manager..."
                    type="text"
                    label="Project Manager"
                    name="assgn_pm"
                    formControlName={assgn_pm}
                    handleChange={(txt) => setAssign(txt.target.value)}
                    data={pmList}
                    mode={2}
                    disabled={params.id > 0}
                  />
                </div>
                <div className="flex pt-4 justify-content-start">
                  <Button
                    className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    <ArrowLeftOutlined className="mr-2" />
                    Back
                  </Button>
                  <button className=" disabled:bg-gray-400 
                  disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" onClick={()=>onSubmitClient()}>Submit</button>
                 
                </div>
                </Spin>
              </StepperPanel>
            </Stepper>
          </div>
        </Spin>
      </div>
      <DialogBox
        visible={visible}
        flag={flag}
        data={flag==5?{poc:pocList,loc:clientLocList,info:clientInfo}:{info:info}}
        onPress={() => setVisible(false)}
      />
    </section>
  );
}

export default ProjectForm;
