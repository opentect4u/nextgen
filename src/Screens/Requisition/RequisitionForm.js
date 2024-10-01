import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeadingTemplate from "../../Components/HeadingTemplate";
import VError from "../../Components/VError";
import TDInputTemplate from "../../Components/TDInputTemplate";
import axios from "axios";
import { ScrollPanel } from "primereact/scrollpanel";
import { url } from "../../Address/BaseUrl";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../Components/DialogBox";
import Viewdetails from "../../Components/Viewdetails";
import {  Spin, Tag } from "antd";
import { Message } from "../../Components/Message";
import moment from "moment/moment";

function RequisitionForm() {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [id, setId] = useState();
    const [req_date,setReqDate]=useState('')
    const [type,setType]=useState('')
    const [intended,setIntended]=useState('')
    const [project,setProject]=useState('')
    const [purpose,setPurpose]=useState('')
    const [projectData,setProjectData]=useState([])
    const [projectList,setProjectList]=useState([])
    const [itemDtlsForm,setItemDtlsForm]=useState([])
    
    const params = useParams();
    useEffect(() => {
      getItemInfo(params.po_no);
      axios.post(url + "/api/getproject", { id: 0 }).then((res) => {
        console.log(res);
        setProjectData(res?.data?.msg)
        for(let i of res?.data?.msg){
            projectList.push({code:i.sl_no,name:i.proj_name})
        }
      });
    }, []);
  
    const deleteItem = () => {
      setLoading(true);
    //   axios
    //     .post(url + "/api/deletedeliverydoc", {
    //       po_no: params.po_no.toString(),
    //       user: localStorage.getItem("email"),
    //       id: id,
    //     })
    //     .then((res) => {
    //       setLoading(false);
    //       setVisible(false);
    //       if (res?.data?.suc > 0) {
    //         Message("success", res?.data?.msg);
    //         fileList.splice(0,1);
    //       } else {
    //         Message("error", res?.data?.msg);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       navigate("/error" + "/" + err.code + "/" + err.message);
    //     });
    };
    const getItemInfo = (po_no) => {
    //   setLoading(true);
     
  
    };
  
    const onsubmit = () => {
   
    };
  
    return (
      <section className="bg-transparent dark:bg-[#001529]">
        <HeadingTemplate
          text={'Update Requisition'}
          mode={params.id > 0 ? 1 : 0}
        //   title={"Category"}
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
              {/* {mrn_no && (
                <div className="sm:col-span-12 flex justify-end">
                  <Tag className="text-lg" color="#eb8d00">
                    {mrn_no}
                  </Tag>
                </div>
              )} */}
  
              <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                <div className="sm:col-span-6">
                  <TDInputTemplate
                    placeholder="Date"
                    type="date"
                    label="Date"
                    name="po_no"
                    min={moment(new Date(new Date().setFullYear(new Date().getFullYear() - 3))).format('yyyy-MM-DD')} //may need to change
                    formControlName={moment(new Date()).format('yyyy-MM-DD')}
                    max={moment(new Date()).format('yyyy-MM-DD')} 
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
                    name="type"
                    formControlName={intended}
                    handleChange={(txt) => setIntended(txt.target.value)}
                    // disabled={params.id > 0}
                    data={[{name:'Client',code:'C'},{name:'Warehouse',code:'W'}]}
                    mode={2}
                  />
                 
                </div>
                <div className={intended=='C'?"sm:col-span-6":"sm:col-span-12"}>
                  <TDInputTemplate
                    placeholder="Requisition Type"
                    type="date"
                    label="Requisition Type"
                    name="type"
                    formControlName={type}
                    handleChange={(txt) => setType(txt.target.value)}
                    // disabled={params.id > 0}
                    data={[{name:'Production',code:'P'},{name:'Preissue',code:'I'},{name:'Resale',code:'R'}]}
                    mode={2}
                  />
                 
                </div>
                {intended=='C' && <div className="sm:col-span-6">
                  <TDInputTemplate
                    placeholder="Project"
                    type="date"
                    label="Project"
                    name="po_no"
                    formControlName={project}
                    handleChange={(txt) => {setProject(txt.target.value);
                      setLoading(true)
                      axios.post(url+'/api/item_dtls',{Proj_id:txt.target.value}).then(res=>{console.log(res)
                      setLoading(false)
                     for(let i of res?.data?.msg){
                      itemDtlsForm.push({
                        prod_name:i.prod_name,
                        mrn_no:i.mrn_no,
                        qty:i.quantity,
                        rc_qty:i.rc_qty
                      })
                     }

                      })
                    }}
                    // disabled={params.id > 0}
                    data={projectList}
                    mode={2}
                  />
                 
                </div>}
                <div className="sm:col-span-12">
                  <TDInputTemplate
                    placeholder="Purpose"
                    type="date"
                    label="Purpose"
                    name="purpose"
                    formControlName={purpose}
                    handleChange={(txt) => setPurpose(txt.target.value)}
                    // disabled={params.id > 0}
               
                    mode={3}
                  />
                 
                </div>
                <ScrollPanel
                style={{ width: "100%", height: "300px" }}
                className="relative border-2 overflow-x-hidden border-gray-300 p-2 rounded-lg sm:col-span-12"
              >
                <div>
                  {itemDtlsForm.map((item, index) => (
                    <>
                      {/* {itemDtlsForm.length > 1 && (
                        <Divider
                          style={{ borderColor: "#014737", color: "#A8A29E" }}
                        >
                        
                       
                        </Divider>
                      )} */}
                      <table className="w-full border-separate border border-[#C4F1BE] overflow-x-scroll text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400">
                        <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 w-1/6 font-bold"
                            >
                              MRN
                            </th>
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
                        
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-[#DDEAE0] border-b-2 text-sm border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                            {/* <th
                              scope="row"
                              className="px-4 w-1/6 py-4 flex justify-between gap-10 items-center  text-gray-900 whitespace-nowrap dark:text-white"
                            >
                               {item.mrn_no}
                            </th> */}
                            
                            <td
                              className="px-4 w-1/6  py-4 flex justify-between gap-10 items-center  text-gray-900 whitespace-nowrap dark:text-white"
                            >
                               <Tag color="#eb8d00">
                               {item.mrn_no}
                </Tag>
                              
                            </td>
                            <td
                              scope="row"
                              className="px-4 w-1/6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white"
                            >
                            {item.prod_name}
                            </td>
                            
                         
                            <td
                              className="px-4 w-full py-4 flex justify-between gap-10 items-center  text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <TDInputTemplate
                                  placeholder="Quantity"
                                  type="number"
                                  name="rc_qty"
                                  formControlName={item.rc_qty}
                                  // handleChange={(event) =>
                                  //   handleDtChange(index, event)
                                  // }
                                  mode={1}
                                />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                     
                    </>
                  ))}
                </div>
              </ScrollPanel>
                <div className="flex justify-center items-center mx-auto">
                <button
                //   disabled={!con || errorSum(isError) ||zeroError}
                  onClick={() => onsubmit()}
                  className=" disabled:bg-gray-400 mx-auto disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                >
                  Submit
                </button>
                </div>
              </div>
            </div>
          </div>
        </Spin>
        <DialogBox
          visible={visible}
        //   flag={flag1}
          id={id}
          // data={itemList}
        //   data={itemInfo}
          onPress={() => setVisible(false)}
          onDelete={() => deleteItem()}
        />
      </section>
    );
}

export default RequisitionForm
