import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeadingTemplate from "../../Components/HeadingTemplate";
import VError from "../../Components/VError";
import TDInputTemplate from "../../Components/TDInputTemplate";
import axios from "axios";
import { ScrollPanel } from "primereact/scrollpanel";
import { url } from "../../Address/BaseUrl";
import Select from "react-dropdown-select";
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../Components/DialogBox";
import { Spin, Tag } from "antd";
import { Message } from "../../Components/Message";
import moment from "moment/moment";

function RequisitionForm() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [req_date, setReqDate] = useState("");
  const [type, setType] = useState("");
  const [intended, setIntended] = useState("");
  const [project, setProject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [itemDtlsForm, setItemDtlsForm] = useState([]);
  const [error, setError] = useState([]);
  const [flag, setFlag] = useState();
  const [breakupinfo, setBreakUpInfo] = useState([]);
  const [approve_flag,setApproveFlag]=useState("")
  const [projID,setProjID] = useState("")
  const [req_no,setReqNo] = useState("")
  const [count,setCount] =  useState(0)
  const params = useParams();
  useEffect(() => {
    axios.post(url + "/api/getproject", { id: 0 }).then((res) => {
      console.log(res);
      setProjectData(res?.data?.msg);
      for (let i of res?.data?.msg) {
        projectList.push({ code: i.sl_no, name: i.proj_name });
        // projectList.push({ value: i.sl_no, label: i.proj_name });
      }
    });
  }, []);

  const deleteItem = () => {
    setLoading(true);
  
  };
  const errorSum = (dt) => {
    let err = 0;
    for (let i of dt) err += i.flag;
    return err;
  };
  const onApprove=(status)=>{
    setLoading(true)
    axios.post(url+'/api/approve_req',{status:status,user:localStorage.getItem('email'),id:+params.id}).then(res=>{console.log(res)
     if(res?.data?.suc>0){
      Message('success',res?.data?.msg)
      setLoading(false)
      navigate(-1)

     }
     else{
      Message('error',res?.data?.msg)
      setLoading(false)
     }

    })
    .catch((err) => {
      console.log(err);
      navigate("/error" + "/" + err.code + "/" + err.message);
    });

  }
  useEffect(()=>{

  },[])
  const handleDtChange = (index, event) => {
    console.log(index, event.target.value);
    let data = [...itemDtlsForm];
    data[index][event.target.name] = event.target.value;
    if (
      data[index]["rc_qty"] < data[index]["req_qty"] ||
      data[index]["req_qty"] < 0
    ) {
      error[index]["flag"] = 1;
    } else {
      error[index]["flag"] = 0;
    }
    setItemDtlsForm(data);
    console.log(itemDtlsForm);
  };
  useEffect(() => {
    if (+params.id > 0) {
      setLoading(true);
      axios
        .post(url + "/api/get_requisition", { id: +params.id })
        .then((res) => {
          console.log(res);
          setReqDate(res?.data?.msg?.req_date);
          setIntended(res?.data?.msg?.intended_for);
          setType(res?.data?.msg?.req_type);
          setProject(res?.data?.msg?.project_id);
          setPurpose(res?.data?.msg?.purpose);
          setApproveFlag(res?.data?.msg?.approve_flag)
          setReqNo(res?.data?.msg?.req_no)
          axios.post(url+'/api/get_proj_id',{Proj_id:res?.data?.msg?.project_id}).then(res=>{
            console.log(res)
            setProjID(res?.data?.msg[0]?.proj_id)
          })
          axios.post(url+'/api/checkmin',{req_no:res?.data?.msg?.req_no}).then(res=>{console.log(res)
            setCount(res.data)
          })
          axios
            .post(url + "/api/req_item_dtls", { last_req_id: +params.id })
            .then((resItems) => {
              console.log(resItems);
              for (let i of resItems?.data?.msg) {
                error.push({ flag: 0 });
                itemDtlsForm.push({
                  sl_no: +params.id > 0 ? +params.id : 0,
                  po_no: i.po_no,
                  item_id: i.item_id,
                  prod_name: i.prod_name,
                  rc_qty: i.rc_qty,
                  req_qty: i.req_qty,
                });
              }
              setItemDtlsForm(itemDtlsForm);
              setLoading(false);
            });

            axios
            .post(url + "/api/get_item_dtls", {
              Proj_id: +res?.data?.msg?.project_id,
            })
            .then((res) => {
              console.log(res);
              setLoading(false);
              for (let i of res?.data?.msg) {
                error.push({ flag: 0 });
                if (i.rc_qty)
                  breakupinfo.push({
                    sl_no: +params.id > 0 ? +params.id : 0,
                    item_id: i.prod_id,
                    po_no: i.po_no,
                    prod_name: i.prod_name,
                    rc_qty: i.rc_qty,
                    req_qty: i.tot_rc_qty,
                  });
              }
              axios
                .post(url + "/api/item_dtls", {
                  Proj_id: +params.id,
                })
                .then((resDtl) => {
                  setLoading(false);
                  console.log(resDtl);
                  for (let i of resDtl?.data?.msg) {
                    error.push({ flag: 0 });
                    itemDtlsForm.push({
                      sl_no: +params.id > 0 ? +params.id : 0,
                      item_id: i.prod_id,
                      prod_name: i.prod_name,
                      rc_qty: i.tot_rc_qty,
                      req_qty: i.tot_rc_qty,
                    });
                  }
                });
            });
        });

    } else {
      setReqDate(moment(new Date()).format("yyyy-MM-DD"));
    }
  }, []);
  const getItemDetails = (id) => {
    axios.post(url+'/api/get_proj_id',{Proj_id:id}).then(res=>{
      console.log(res)
      setProjID(res?.data?.msg[0]?.proj_id)
    })
    itemDtlsForm.length = 0;
    axios
      .post(url + "/api/get_item_dtls", {
        Proj_id: +id,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        breakupinfo.length = 0;
        setBreakUpInfo([])
        for (let i of res?.data?.msg) {
          error.push({ flag: 0 });
          if (i.rc_qty)
            breakupinfo.push({
              sl_no: +params.id > 0 ? +params.id : 0,
              item_id: i.prod_id,
              po_no: i.po_no,
              prod_name: i.prod_name,
              rc_qty: i.rc_qty,
              req_qty: i.tot_rc_qty,
            });
        }
        setBreakUpInfo(breakupinfo);
      });
    axios
      .post(url + "/api/item_dtls", {
        Proj_id: +id,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        itemDtlsForm.length = 0;
        setItemDtlsForm([])
        for (let i of res?.data?.msg) {
          error.push({ flag: 0 });
          itemDtlsForm.push({
            sl_no: +params.id > 0 ? +params.id : 0,
            item_id: i.prod_id,
            prod_name: i.prod_name,
            rc_qty: i.tot_rc_qty,
            req_qty: i.tot_rc_qty,
          });
        }
        setItemDtlsForm(itemDtlsForm);
      });
  };

  const getWarehouseItemDetails = (id) => {
    itemDtlsForm.length = 0;
    axios
      .post(url + "/api/get_item_dtls", {
        Proj_id: +id,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        for (let i of res?.data?.msg) {
          error.push({ flag: 0 });
          if (i.rc_qty)
            breakupinfo.push({
              sl_no: +params.id > 0 ? +params.id : 0,
              item_id: i.prod_id,
              po_no: i.po_no,
              prod_name: i.prod_name,
              rc_qty: i.rc_qty,
              req_qty: i.tot_rc_qty,
            });
        }
        axios
          .post(url + "/api/item_dtls", {
            Proj_id: +id,
          })
          .then((res) => {
            setLoading(false);
            console.log(res);
            for (let i of res?.data?.msg) {
              error.push({ flag: 0 });
              itemDtlsForm.push({
                sl_no: +params.id > 0 ? +params.id : 0,
                item_id: i.prod_id,
                prod_name: i.prod_name,
                rc_qty: i.tot_rc_qty,
                req_qty: i.tot_rc_qty,
              });
            }
          });
      });
  };
  useEffect(() => {
    axios
      .post(url + "/api/item_dtls", { Proj_id: +params.id })
      .then((res) => console.log(res));
  }, []);
  const onSubmit = () => {
    setLoading(true);
    axios
      .post(url + "/api/save_requisition", {
        user: localStorage.getItem("email"),
        sl_no: +params.id > 0 ? +params.id : 0,
        intended_for: intended,
        req_date: req_date,
        project_id: project||0,
        req_type: type,
        purpose: purpose,
        items: itemDtlsForm,
      })
      .then((res) => {
        setLoading(false);

        console.log(res);
        if (res?.data?.suc > 0) {
          Message("success", res?.data?.msg);
          if (+params.id == 0) {
            navigate(-1);
          }
        } else {
          Message("success", res?.data?.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  };
  return (
    <section className="bg-transparent dark:bg-[#001529]">
      <HeadingTemplate
        text={"Update Requisition"}
        mode={params.id > 0 ? 1 : 0}
        data={""}
      />
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
        <div className="grid grid-cols-12 gap-2">
        
          <div className={"w-full col-span-12 bg-white p-6 rounded-2xl"}>
          {/* <span className="flex justify-start my-2">
              </span> */}
           <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
           {params.id>0 && <div className="sm:col-span-12 flex justify-between">
            <Tag color="#014737">Requisition: {req_no} </Tag>

                   {approve_flag=='A' &&  <Tag
                         className="text-[12px] rounded-full w-36"
                         icon={<CheckCircleOutlined />}
                         color="success"
                       >
                        Approved
                        </Tag>}
                   {approve_flag=='R' &&  <Tag
                        className="text-[12px] rounded-full w-36"
                        icon={<CloseCircleOutlined className="animate-spin" />}
                        color="error"
                      >
                        Rejected
                        </Tag>}
                   {approve_flag=='P' &&  <Tag
                        className="text-[12px] rounded-full w-36"
                        icon={<SyncOutlined spin />}
                        color="processing"
                      >
                        Pending
                        </Tag>}

                    </div>}
              <div className="sm:col-span-6">
                <TDInputTemplate
                  placeholder="Date"
                  type="date"
                  label="Date"
                  name="dt"
                  min={moment(
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 3)
                    )
                  ).format("yyyy-MM-DD")} //may need to change
                  formControlName={
                    params.id > 0
                      ? req_date
                      : moment(new Date()).format("yyyy-MM-DD")
                  }
                  max={moment(new Date()).format("yyyy-MM-DD")}
                  // formControlName={params.po_no}
                  disabled={true}
                  mode={1}
                />
              </div>
              <div className="sm:col-span-6">
                <TDInputTemplate
                  placeholder="Intended For"
                  type="date"
                  label="Intended For"
                  name="int"
                  formControlName={intended}
                  handleChange={(txt) => {
                    setIntended(txt.target.value);

                    if (txt.target.value == "W") {
                      getWarehouseItemDetails(0);
                    }
                  }}
                  disabled={params.id > 0}
                  data={[
                    { name: "Client", code: "C" },
                    { name: "Warehouse", code: "W" },
                  ]}
                  mode={2}
                />
                {!intended && <VError title={"Required"} />}
                {intended == "W" && (
                  <a
                    onClick={() => {
                      setFlag(17);
                      setVisible(true);
                    }}
                  >
                    <Tag color="#4FB477">Itemwise breakup</Tag>
                  </a>
                )}
              </div>
              <div
                className={intended == "C" ? "sm:col-span-6" : "sm:col-span-12"}
              >
                <TDInputTemplate
                  placeholder="Requisition Type"
                  type="date"
                  label="Requisition Type"
                  name="req"
                  formControlName={type}
                  handleChange={(txt) => setType(txt.target.value)}
                  data={[
                    { name: "Production", code: "P" },
                    { name: "Preissue", code: "I" },
                    { name: "Resale", code: "R" },
                  ]}
                  mode={2}
                />
                {!type && <VError title={"Required"} />}
              </div>
              {intended == "C" && (
                <div className="sm:col-span-6 flex-col justify-end items-end">
                  <TDInputTemplate
                    placeholder="Project"
                    type="date"
                    label="Project"
                    name="proj"
                    disabled={params.id > 0}
                    formControlName={project}
                    handleChange={(txt) => {
                      console.log(txt);
                      setProject(txt.target.value);
                      setLoading(true);
                      getItemDetails(txt.target.value);
                      
                    }}
                    data={projectList}
                    mode={2}
                  />
                  {!project && <VError title={"Required"} />}
                  <span className="flex justify-between mt-1 items-center">
                  <a
                    onClick={() => {
                      setFlag(17);
                      setVisible(true);
                    }}
                  >
                    <Tag color="#4FB477">Itemwise breakup</Tag>
                  </a>  
                  <a
                    // onClick={() => {
                    //   setFlag(17);
                    //   setVisible(true);
                    // }}
                  >
                    <Tag color="#eb8d00">Project ID: {projID}</Tag>
                  </a>  
                  
                  
                  </span>
                 

                  {/* <Select
                  clearable
                  color="#014737"
                   className="bg-white border-1 mt-6 border-gray-400 text-gray-800 text-sm rounded-lg  focus:border-green-900 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-1 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    options={projectList}
    labelField="label"
  valueField="value"
    
    onChange={(values) => {console.log(values);

setProject(values[0]?.value);
                      if(values.length){
                      setLoading(true);

                      axios
                        .post(url + "/api/item_dtls", {
                          Proj_id: values[0].value,
                        })
                        .then((res) => {
                          console.log(res);
                          setLoading(false);
                          for (let i of res?.data?.msg) {
                            itemDtlsForm.push({
                              prod_name: i.prod_name,
                              mrn_no: i.mrn_no,
                              // qty: i.quantity,
                              rc_qty: i.tot_rc_qty,
                            });
                          }
                        });
                      }
                    }}

    
  /> */}
                </div>
              )}
              <div className="sm:col-span-12">
                <TDInputTemplate
                  placeholder="Purpose"
                  type="date"
                  label="Purpose"
                  name="purpose"
                  formControlName={purpose}
                  handleChange={(txt) => setPurpose(txt.target.value)}
                  mode={3}
                />
                {!purpose && <VError title={"Required"} />}
              </div>
              {itemDtlsForm.length > 0 && (
                <ScrollPanel
                  style={{ width: "100%", height: "300px" }}
                  className="relative border-2 overflow-x-hidden border-gray-300 p-2 rounded-lg sm:col-span-12"
                >
                  <div>
                    {itemDtlsForm.length > 0 &&
                      itemDtlsForm.map((item, index) => (
                        <>
                          <table className="w-full border-separate border border-[#C4F1BE] overflow-x-scroll text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400">
                            <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 w-1/6 font-bold"
                                >
                                  Item
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 w-1/6 font-bold"
                                >
                                  Received Quantity
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 w-1/6 font-bold"
                                >
                                  Requisition Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-[#DDEAE0] border-b-2 text-sm border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                                <td
                                  scope="row"
                                  className="px-4 w-1/6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {item.prod_name}
                                </td>

                                <td
                                  scope="row"
                                  className="px-4 w-1/6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {item.rc_qty}
                                </td>
                                <td className="px-4 w-full py-4 flex justify-between gap-10 items-center  text-gray-900 whitespace-nowrap dark:text-white">
                                  <TDInputTemplate
                                    placeholder="Quantity"
                                    type="number"
                                    name="req_qty"
                                    formControlName={item.req_qty}
                                    handleChange={(event) =>
                                      handleDtChange(index, event)
                                    }
                                    mode={1}
                                  />
                                  {error[index]["flag"] == 1 && (
                                    <VError title={"Invalid value"} />
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      ))}
                  </div>
                </ScrollPanel>
              )}
              <div className="flex justify-center items-center mx-auto">
               {approve_flag!='A' && <button
                  disabled={
                    errorSum(error) ||
                    !intended ||
                    !type ||
                    !purpose
                  }
                  onClick={() => onSubmit()}
                  className=" disabled:bg-gray-400 mx-auto disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                >
                  Submit
                </button>
}

              {params.id>0 && approve_flag=='P' && (localStorage.getItem('user_type') =='4' || localStorage.getItem('user_type') =='5')  && count>0 && <button
                  disabled={
                    errorSum(error) ||
                    !intended ||
                    !type ||
                    !purpose
                  }
                  onClick={() => onApprove('A')}
                  className=" disabled:bg-gray-400 mx-auto disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                >
                  Approve
                </button>}
                {params.id>0 && approve_flag=='P' && (localStorage.getItem('user_type') =='4' || localStorage.getItem('user_type') =='5') && count>0 &&<button
                  disabled={
                    errorSum(error) ||
                    !intended ||
                    !type ||
                    !purpose
                  }
                  onClick={() => onApprove('R')}
                  className=" disabled:bg-gray-400 mx-auto disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                >
                  Reject
                </button>}
              </div>
            </div>
          </div>
        </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={17}
        id={id}
        // data={itemList}
        //   data={itemInfo}
        data={breakupinfo}
        onPress={() => setVisible(false)}
        onDelete={() => deleteItem()}
      />
    </section>
  );
}

export default RequisitionForm;
