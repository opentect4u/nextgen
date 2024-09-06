import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeadingTemplate from "../Components/HeadingTemplate";
import VError from "../Components/VError";
import TDInputTemplate from "../Components/TDInputTemplate";
import axios from "axios";
import { url } from "../Address/BaseUrl";
import {
  DeleteOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DialogBox from "../Components/DialogBox";
import PrintComp from "../Components/PrintComp";
import AuditTrail from "../Components/AuditTrail";
import Viewdetails from "../Components/Viewdetails";
import { Spin, Tag } from "antd";
import { Message } from "./Message";

function DeliveryFormComp({ flag, title, onSubmit }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [checkLoad, setCheckLoad] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [itemForm, setItemForm] = useState([]);
  const [delivery_date,setDelivery]=useState()
  const navigate = useNavigate();
  const [flag1, setFlag] = useState(4);
  const [id, setId] = useState();
  const [items, setItems] = useState([]);
  const [po_no, setPoNo] = useState("");
  const [comments, setComments] = useState("");
  const [doc1, setDoc1] = useState();
  const [doc2, setDoc2] = useState();
  const [fileList, setFileList] = useState([]);
  const params = useParams();
  const [delFlag, setDelFlag] = useState();
  const [slno, setSl] = useState();
  const [index, setIndex] = useState();
  const [po_status, setStatus] = useState('A');
  const [errorFlag,setErrorFlag]=useState(0)
  useEffect(() => {
    if (params.id > 0) {
      setLoading(true);
      setCount(1);
      axios
        .post(url + "/api/getdelbyid", { id: +params.id })
        .then((res) => {
          console.log(res);
          setComments(res?.data?.msg[0]?.comments);
          setPoNo(res?.data?.msg[0]?.po_no);
          getItemInfo(res?.data?.msg[0]?.po_no);
          setDelivery(res?.data?.msg[0]?.delivery_date)

          setLoading(false);
          axios
            .post(url + "/api/getdeliverydoc", {
              po_no: res?.data?.msg[0]?.po_no.toString(),
            })
            .then((res) => {
              console.log(po_no);
              console.log(res);
              for (let i of res?.data?.msg) {
                fileList.push({ sl_no: i.sl_no, doc: i.doc });
                console.log(i.doc);
              }
              setFileList(fileList);
            });
        })
        .catch((err) => {
          console.log(err);
          navigate("/error" + "/" + err.code + "/" + err.message);
        });
    }
  }, []);

  const handleDtChange = (event, index) => {
    setErrorFlag(0)
    console.log(event.target.value, event.target.name);
    let data = [...itemForm];
    data[index][event.target.name] = event.target.value;
    if(((+data[index]['cust_qty'])+(+data[index]['wh_qty']))>data[index]['quantity']){
      console.log((data[index]['cust_qty']+data[index]['wh_qty']))
      console.log(data[index]['cust_qty'],data[index]['wh_qty'])
      // debugger
      setErrorFlag(1)
    }
    else if(data[index]['cust_qty']<0 || data[index]['wh_qty']<0){
      setErrorFlag(1)
    }
    else{
      setErrorFlag(0)
    }
    console.log(data);
    setItemForm(data);
    console.log(errorFlag)
  };
  const deleteItem = () => {
    setLoading(true);
    if (delFlag == 1) {
      let u = flag == "C" ? "/api/deletecustomerdel" : "/api/deletetc";
      axios
        .post(url + u, {
          po_no: po_no.toString(),
          user: localStorage.getItem("email"),
        })
        .then((res) => {
          setLoading(false);
          setVisible(false)
          if (res?.data?.suc > 0) {
            Message("success", res?.data?.msg);
            navigate(-1);
          } else {
            Message("error", res?.data?.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/error" + "/" + err.code + "/" + err.message);
        });
    } else {
      let u = flag == "C" ? "/api/deletedeliverydoc" : "/api/deletetc";
      axios
        .post(url + u, { id: slno, user: localStorage.getItem("email") })
        .then((res) => {
          setLoading(false);
          setVisible(false);
          if (res?.data?.suc > 0) {
            Message("success", res?.data?.msg);
            fileList.splice(index, 1);
          } else {
            Message("error", res?.data?.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/error" + "/" + err.code + "/" + err.message);
        });
    }
  };
  const getItemInfo = (po_no) => {
    setLoading(true);
    axios
      .post(url + "/api/getpo", { id: 0 })
      .then((resPO) => {
        setId(resPO?.data?.msg?.filter((e) => e.po_no == po_no)[0]?.sl_no);
        console.log(po_no,resPO)
        console.log(resPO?.data?.msg?.filter((e) => e.po_no == po_no))
        setStatus(
          resPO?.data?.msg?.filter((e) => e.po_no == po_no)[0]?.po_status
        );
        // if (params.id == 0) {
          axios
            .post(url + "/api/getpoitemfordel", {
              id: resPO?.data?.msg?.filter((e) => e.po_no == po_no)[0]?.sl_no,
            })
            .then((resItems) => {
              console.log(resItems)
              setLoading(false);
              setItems(resItems?.data?.msg);
              for (let i of resItems?.data?.msg) {
                itemForm.push({
                  sl_no: i.sl_no,
                  item: i.prod_name,
                  quantity: i.quantity,
                  cust_qty:i.cust_qty,
                  wh_qty:i.wh_qty
                });
              }
             
            })
            .catch((err) => {
              console.log(err);
              navigate("/error" + "/" + err.code + "/" + err.message);
            });
       
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  };
  const onsubmit = () => {
    console.log(po_no, itemForm, doc1, doc2, comments);
    if(delivery_date && po_status && (po_status=='D'||po_status=='L'))
    onSubmit({
      po_no: po_no,
      itemForm: itemForm,
      doc1: doc1,
      doc2: doc2,
      comments: comments,
      delivery_date:delivery_date,
      status:po_status
    });
  };

  const checkid = () => {
    if (po_no) {
      setCheckLoad(true);
      axios
        .post(url + "/api/check_po_no_for_del", { po_no: po_no })
        .then((res) => {
          console.log(res.data.msg[0].count);
          setCheckLoad(false);
          setCount(res.data.msg[0].count);
          itemList.length = 0;
          setItemList([]);
          if (res.data.msg[0].count > 0) {
            getItemInfo(po_no);
          }
        })
        .catch((err) =>
          navigate("/error" + "/" + err.code + "/" + err.message)
        );
    }
  };
  return (
    <section className="bg-transparent dark:bg-[#001529]">
      <HeadingTemplate
        text={title}
        mode={params.id > 0 ? 1 : 0}
        title={"Category"}
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
            <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-6">
                <TDInputTemplate
                  placeholder="PO No."
                  type="text"
                  label="PO No."
                  name="po_no"
                  formControlName={po_no}
                  handleChange={(txt) => setPoNo(txt.target.value)}
                  handleBlur={() => checkid()}
                  disabled={params.id > 0}
                  mode={1}
                />

                {checkLoad && (
                  <Tag icon={<SyncOutlined spin />} color="processing">
                    Checking...
                  </Tag>
                )}
                {count == 0 && po_no && (
                  <VError
                    title={
                      "This PO seems to be either non-existent, or unapproved or has been delivered"
                    }
                  />
                )}

                {!po_no ? <VError title={"PO No. is required"} /> : null}
                {count > 0 && po_no && (<div className="flex justify-between">

                  <Viewdetails
                    click={() => {
                      setFlag(14);
                      setVisible(true);
                    }}/>

<a className="my-2" onClick={()=>{setFlag(15);setVisible(true)}} >
              <Tag  color="#4FB477">
                View Previous Delivery
                </Tag>
                </a>
                </div>
                
                
                )}
              </div>
              <div className="sm:col-span-3">
                <TDInputTemplate
                  placeholder="Status"
                  type="text"
                  label="Status"
                  name="status"
                  formControlName={po_status}
                  handleChange={(txt) => setStatus(txt.target.value)}
                  // disabled={params.id > 0}
                  data={[
                    { name: "Approved", code: "A" },
                    { name: "Delivered", code: "D" },
                    { name: "Partially Delivered", code: "L" },
                  ]}
                  mode={2}
                />
                {po_status!='D'&&po_status!='L' &&  <VError title={"Please update status before saving"} />}
              </div>
              <div className="sm:col-span-3">
                <TDInputTemplate
                  placeholder="Delivery Date"
                  type="date"
                  label="Delivery Date"
                  name="delivery_date"
                  formControlName={delivery_date}
                  handleChange={(txt) => setDelivery(txt.target.value)}
                  // handleBlur={() => checkid()}
                  // disabled={params.id > 0}
                  mode={1}
                />
                 {!delivery_date &&  <VError title={"Please enter date"} />}
              </div>
              <>
                <div className="relative overflow-x-auto sm:col-span-12">
                  {itemForm.length > 0 && po_no && (
                    <table className="w-full text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400">
                      <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 font-bold">
                            Item
                          </th>

                          <th scope="col" className="px-6 py-3 font-bold">
                            Quantity To be delivered
                          </th>
                          <th scope="col" className="px-6 py-3 font-bold">
                            Quantity to Client
                          </th>
                          <th scope="col" className="px-6 py-3 font-bold">
                            Quantity to Warehouse
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemForm.map((item, index) => (
                        <tr className="bg-[#DDEAE0] border-b-2 border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 w-3/12 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.item}
                            </th>

                            <td className="px-6 py-4 w-3/12">
                              <TDInputTemplate
                                placeholder="Quantity"
                                type="number"
                                name="quantity"
                                disabled={true}
                                formControlName={item.quantity}
                                handleChange={(txt) =>
                                  handleDtChange(txt, index)
                                }
                                mode={1}
                              />
                            </td>
                            <td className="px-6 py-4 w-3/12">
                              <TDInputTemplate
                                placeholder="Quantity"
                                type="number"
                                name="cust_qty"
                                formControlName={item.cust_qty}
                                handleChange={(txt) =>
                                  handleDtChange(txt, index)
                                }
                                mode={1}
                              />
                              {item.cust_qty<0 ? (
                <VError title={"Quantity should be >=0"} />
              ) : null }
                            </td>
                            <td className="px-6 py-4 w-3/12">
                              <TDInputTemplate
                                placeholder="Quantity"
                                type="number"
                                name="wh_qty"
                                formControlName={item.wh_qty}
                                handleChange={(txt) =>
                                  handleDtChange(txt, index)
                                }
                                mode={1}
                              />
                               {item.wh_qty<0 ? (
                <VError title={"Quantity should be >=0"} />
              ) : null }

{(+item.cust_qty)+(+item.wh_qty)>item.quantity ? (
                <VError title={"Quantity Mismatch"} />
              ) : null }
                            </td>
                           
                          </tr>
                          
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
             
              {/* <div className="sm:col-span-6">
                <TDInputTemplate
                  placeholder="Comments"
                  type="file"
                  label="Document 2"
                  // disabled={params.id > 0}
                  name="doc2"
                  accept={"application/pdf"}
                  handleChange={(txt) => {
                    if (txt.target.files[0].size / 1000000 <= 1)
                      setDoc2(txt.target.files[0]);
                    else {
                      setDoc2(null);
                      Message("warning", "File size exceeds 1MB");
                    }
                  }}
                  mode={1}
                />
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-xs text-gray-500 dark:text-gray-400"
                >
                  Accepts PDF only. (Max 1MB){" "}
                </p>
              </div> */}
             
              <div className={"sm:col-span-12"}>
                <TDInputTemplate
                  placeholder="Comments"
                  type="text"
                  label="Comments"
                  name="comments"
                  formControlName={comments}
                  handleChange={(txt) => setComments(txt.target.value)}
                  mode={3}
                />
              </div>
              <div className="sm:col-span-12 border-2 border-gray-300 rounded-lg p-4">
                <TDInputTemplate
                  placeholder="Comments"
                  type="file"
                  label="Document"
                  accept={"application/pdf"}
                  name="doc1"
                  handleChange={(txt) => {
                    if (txt.target.files[0].size / 1000000 <= 1) {
                      setDoc1(txt.target.files[0]);
                    } else {
                      setDoc1(null);
                      Message("warning", "File size exceeds 1MB");
                    }

                    if(txt.target.files[0].name?.split('.')[1].toLowerCase()!='pdf'){
                      setDoc1(null)
                      Message('warning','Unsupported file!')
                      
                    }
                  }}
                  mode={1}
                />
                <p
                  id="helper-text-explanation"
                  className="mt-2 text-xs text-gray-500 dark:text-gray-400"
                >
                  Accepts PDF only. (Max 1MB){" "}
                </p>
               
                {fileList?.map((item, index) => (
                  <div className="relative">
                    <a target="_blank" href={url + "/uploads/" + item.doc}>
                      {item?.doc?.toString().split(".")[1] == "pdf" ? (
                        <FilePdfOutlined className="text-6xl my-7 text-red-600" />
                      ) : item?.doc
                          ?.toString()
                          .split(".")[1]
                          ?.includes("doc") ? (
                        <FileWordOutlined className="text-6xl my-7 text-blue-900" />
                      ) : item?.doc
                          ?.toString()
                          .split(".")[1]
                          ?.includes("xls") ||
                        item?.doc?.toString().split(".")[1]?.includes("csv") ? (
                        <FileExcelOutlined className="text-6xl my-7 text-green-800" />
                      ) : (
                        <FileImageOutlined className="text-6xl my-7 text-yellow-500" />
                      )}
                    </a>
                    <DeleteOutlined
                      className="text-red-800 absolute top-6 "
                      onClick={() => {
                        {
                          setSl(item.sl_no);
                          setDelFlag(2);
                          setIndex(index);
                          setVisible(true);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-4">
              {params.id > 0 && (
                <button
                  onClick={() => {
                    setDelFlag(1);
                    setVisible(true);
                  }}
                  className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => onsubmit()}
                disabled={count==0 ||errorFlag==1||checkLoad}
                className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={flag1}
        id={id}
        data={itemForm}
        onPress={() => setVisible(false)}
        onDelete={() => deleteItem()}
      />
    </section>
  );
}

export default DeliveryFormComp;
