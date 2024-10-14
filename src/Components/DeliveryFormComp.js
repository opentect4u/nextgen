import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeadingTemplate from "../Components/HeadingTemplate";
import VError from "../Components/VError";
import TDInputTemplate from "../Components/TDInputTemplate";
import axios from "axios";
import { ScrollPanel } from "primereact/scrollpanel";
import { url } from "../Address/BaseUrl";
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
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DialogBox from "../Components/DialogBox";
import Viewdetails from "../Components/Viewdetails";
import { Button, Divider, Spin, Tag } from "antd";
import { Message } from "./Message";
import { Checkbox, Col, Row } from "antd";
import moment from "moment/moment";

function DeliveryFormComp({ flag, title, onSubmit }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemForm, setItemForm] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [mrnList,setMrnList]=useState([])
  const [mrnDetails,setMrnDetails]=useState([])
  const navigate = useNavigate();
  const [flag1, setFlag] = useState(4);
  const [id, setId] = useState();
  const [items, setItems] = useState([]);
  const [po_no, setPoNo] = useState("");
  const [fileList, setFileList] = useState([]);
  const params = useParams();
  const [ot_desc, setOtDesc] = useState("");
  const [invoice, setInvoice] = useState("");
  const [inv_dt, setInvoiceDt] = useState("");
  const [lr_no, setLrNo] = useState("");
  const [waybill, setWayBill] = useState("");
  const [inv_el,setInvEl]=useState("")
  // const [invList,setInvList]=useState([{sl:0,invoice:'',inv_dt:'',lr_no:'',waybill:''}])
  const [doc, setDoc] = useState("");
  const [itemInfo, setItemInfo] = useState("");
  const [mrn_no, setMrnNo] = useState("");
  const [ic, setIc] = useState(false);
  const [og, setOg] = useState(false);
  const [dc, setDc] = useState(false);
  const [lr, setLr] = useState(false);
  const [wb, setWb] = useState(false);
  const [pl, setPl] = useState(false);
  const [om, setOm] = useState(false);
  const [ws, setWs] = useState(false);
  const [tc, setTc] = useState(false);
  const [wc, setWc] = useState(false);
  const [ot, setOt] = useState(false);
  const [om_manual, setOmManual] = useState(false);
  const [con, setCon] = useState(false);
  const [isError,setIsError]=useState([])
  const [zeroError,setZeroError]=useState(0)
  const [project_id,setProjectId]=useState()
  const [received_log,setReceivedLod]=useState([])
  // const []

  const onChangeIc = (e) => {
    console.log("checked = ", e.target);
    if (e.target.name == "ic") setIc(e.target.checked);
    if (e.target.name == "og") setOg(e.target.checked);
    if (e.target.name == "dc") setDc(e.target.checked);
    if (e.target.name == "lr") setLr(e.target.checked);
    if (e.target.name == "wb") setWb(e.target.checked);
    if (e.target.name == "pl") setPl(e.target.checked);
    if (e.target.name == "om") setOm(e.target.checked);
    if (e.target.name == "om_manual") setOmManual(e.target.checked);
    if (e.target.name == "ws") setWs(e.target.checked);
    if (e.target.name == "tc") setTc(e.target.checked);
    if (e.target.name == "wc") setWc(e.target.checked);
    if (e.target.name == "ot") setOt(e.target.checked);
    if (e.target.name == "con") setCon(e.target.checked);
  };
  useEffect(()=>{
    axios.post(url+'/api/get_mrn_list',{last_req_id:params.po_no}).then(res=>{
      console.log(res)
      setMrnDetails(res?.data?.msg)
      
      for(let i of res?.data?.msg){
        mrnList.push({
          name:i.invoice,
          code:i.invoice
        })
      }
    })
  },[])
  const getMrnLog=()=>{
    axios.post(url+'/api/get_received_items',{invoice:inv_el,id:params.id}).then(res=>{
      console.log(res)
      setItemInfo(res?.data?.msg)
      setVisible(true);

    })
  }
  useEffect(() => {
    getItemInfo(params.po_no);
  
  }, []);

  const deleteItem = () => {
    setLoading(true);
    axios
      .post(url + "/api/deletedeliverydoc", {
        po_no: params.po_no.toString(),
        user: localStorage.getItem("email"),
        id: id,
      })
      .then((res) => {
        setLoading(false);
        setVisible(false);
        if (res?.data?.suc > 0) {
          Message("success", res?.data?.msg);
          fileList.splice(0,1);
        } else {
          Message("error", res?.data?.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  };
  const getItemInfo = (po_no) => {
    setLoading(true);
    axios
      .post(url + "/api/getpo", { id: 0 })
      .then((resPO) => {
        setId(
          resPO?.data?.msg?.filter((e) => e.po_no == params.po_no)[0]?.sl_no
        );
        setProjectId(
          resPO?.data?.msg?.filter((e) => e.po_no == params.po_no)[0]?.project_id

        )
        axios
          .post(url + "/api/getpoitemfordel", {
            id: resPO?.data?.msg?.filter((e) => e.po_no == params.po_no)[0]
              ?.sl_no,
          })
          .then((resItems) => {
            console.log(resItems);
            setLoading(false);
            setItems(resItems?.data?.msg);

            for (let i of resItems?.data?.msg) {
              itemList.push({
                item_sl:i.item_sl,
                item_id: i.sl_no,
                sl_no: i.sl_no,
                name: i.prod_name,
                sl: i.sl,
                remarks: i.remarks,
                quantity: i.quantity,
                rc_qty: i.rc_qty,
                rc_by: i.created_by,
                rc_at: i.created_at,
                mrn_no:i.mrn_no,
                invoice:i.invoice
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

    axios
      .post(url + "/api/getpoitemforedit", {
        id: params.id,
      })
      .then((resPoItems) => {
        console.log(resPoItems);
        for (let i of resPoItems?.data?.msg) {
          isError.push({flag:0})
          itemForm.push({
            item_id: i.sl_no,
            sl_no: i.sl_no,
            name: i.prod_name,
            sl: "",
            remarks: "",
            quantity: i.quantity,
            rc_qty: 0,
          });
        }
        setItemForm(itemForm);
        console.log(itemForm,isError);
      });
  };
 
  const handleDtChange = (index, event) => {
    console.log(isError)
    let data = [...itemForm];
    data[index][event.target.name] = event.target.value;
    if(!mrn_no){
    if(data[index]['rc_qty']>0)
      setZeroError(0)
    else
      setZeroError(1)
}

    if(data[index]['rc_qty']<0 || ((+data[index]['rc_qty'])+rowSum(
      itemList.filter((e) => e.sl_no == data[index]['item_id']),
      data[index]['quantity']
    ).sum>data[index]['quantity'])){
     isError[index].flag=1
    }
    else{
      isError[index].flag=0
    }

    setItemForm(data);
    console.log(data);
    console.log(isError)
  };
  const errorSum=(dt)=>{
    let err=0
    for(let i of dt)
      err+=i.flag
    return err
  }
  useEffect(()=>{
     console.log(mrnDetails.filter(e=>e.invoice==inv_el))
     setInvoice(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.invoice || "");
      setInvoiceDt(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.invoice_dt || "");
      setLrNo(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.lr_no || "");
      setWayBill(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.waybill || "");
      setIc(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.ic == "Y" ? true : false);
      setOg(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.og == "Y" ? true : false);
      setDc(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.dc == "Y" ? true : false);
      setLr(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.lr == "Y" ? true : false);
      setWb(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.wb == "Y" ? true : false);
      setPl(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.pl == "Y" ? true : false);
      setOm(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.om == "Y" ? true : false);
      setOmManual(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.om_manual == "Y" ? true : false);
      setWs(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.ws == "Y" ? true : false);
      setTc(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.tc == "Y" ? true : false);
      setWc(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.wc == "Y" ? true : false);
      setOt(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.ot == "Y" ? true : false);
      setOtDesc(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.ot_desc);
      setMrnNo(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.mrn_no);
      setCon(mrnDetails.filter(e=>e.invoice==inv_el)[0]?.confirm=='Y'?true:false);
    fileList.length=0

      axios
        .post(url + "/api/getdeliverydoc", { po_no: inv_el })
        .then((resDoc) => {
          console.log(resDoc);
          for (let i of resDoc?.data?.msg) {
            fileList.push({
              sl_no: i.sl_no,
              doc: i.doc,
            });
          }
          console.log(fileList);
        });
  },[inv_el])
  const onsubmit = () => {
    onSubmit({
      po_no: params.po_no,
      items: itemForm,
      lr_no: lr_no,
      invoice: invoice,
      ot_desc: ot_desc,
      doc1: doc,
      invoice_dt: inv_dt,
      waybill: waybill,
      ic: ic,
      og: og,
      dc: dc,
      lr: lr,
      wb: wb,
      pl: pl,
      om: om,
      om_manual: om_manual,
      ws: ws,
      tc: tc,
      wc: wc,
      ot: ot,
      confirm:con
    });
  };
  // const zeroError=()=>{
  //   let flag=0
  //   if(!mrn_no){
  //     for(let i of itemForm){
  //       if(i.rc_qty>0){
  //         flag=1
  //         break
  //       }
        
  //     }
  //   }
  //   return flag
  // }
  const rowSum = (items, qty) => {
    let sum = 0;
    for (let i of items) sum += i.rc_qty;

    if (sum == qty) return { flag: 1, sum: sum };
    else return { flag: 0, sum: sum };
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
              <div className="sm:col-span-12">
                <TDInputTemplate
                  placeholder="PO No."
                  type="text"
                  label="PO No."
                  name="po_no"
                  formControlName={params.po_no}
                  handleChange={(txt) => setPoNo(txt.target.value)}
                  disabled={params.id > 0}
                  mode={1}
                />
                {params.po_no && (
                  <div className="flex justify-between gap-2">
                    <Viewdetails
                      click={() => {
                        setFlag(14);
                        setVisible(true);
                      }}
                    />
                 
                  </div>
                )}

              </div>
              {mrnList.length>0 &&
              <div  className="sm:col-span-12">
                                  <TDInputTemplate
                                    placeholder="Select invoice"
                                    type="text"
                                    name="inv_el"
                                    label="Invoice"
                                    data={mrnList}
                                    formControlName={inv_el}
                                    handleChange={(event) =>
                                     setInvEl(event.target.value)
                                    }
                                    mode={2}
                                  />
                                {inv_el!='' && inv_el!='Select invoice' &&    <span
                                  scope="row"
                                  className=" w-1/6 py-2 flex justify-between gap-10 items-center text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                 
                                  <a
                                    onClick={() => {
                                      setFlag(16);
                                      // setItemInfo(
                                      //   itemList.filter(
                                      //     (e) => e.sl_no == item.sl_no
                                      //   )
                                      // );
                                      getMrnLog()
                                      
                                    }}
                                  >
                                    <Tag color="#4FB477">Items under this invoice</Tag>
                                  </a>
                                </span>
}
                                </div>
                                
}
{mrn_no && (
              <div className="sm:col-span-12 flex justify-end">
                <Tag className="text-lg" color="#eb8d00">
                  {mrn_no}
                </Tag>
              </div>
            )}
              <table className="w-full border-separate border border-[#C4F1BE] overflow-x-scroll text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400 sm:col-span-12">
              <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/4 font-bold">
                      Invoice No. <span className="text-xs text-red-600">*</span>
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/4 font-bold">
                      Invoice Date  <span className="text-xs text-red-600">*</span>
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/4 font-bold">
                      LR No.
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/4 font-bold">
                      Waybill
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#DDEAE0]  border-b-2 border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-4 w-1/4 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <TDInputTemplate
                        placeholder="Invoice No."
                        type="text"
                        name="invoice"
                        formControlName={invoice}
                        handleChange={(txt) => setInvoice(txt.target.value)}
                        disabled={inv_el!=''&&inv_el!='Select invoice'}
                        mode={1}
                      />
                   
                    </th>
                    <td className="px-6 py-4 w-1/4">
                      <TDInputTemplate
                        placeholder="Invoice Date"
                        type="date"
                        name="inv_dt"
                        formControlName={inv_dt}
                        handleChange={(txt)=>setInvoiceDt(txt.target.value)}
                        min={moment(
                          new Date(
                            new Date().setFullYear(new Date().getFullYear() - 3)
                          )
                        ).format("yyyy-MM-DD")} //may need to change
                        max={moment(new Date()).format("yyyy-MM-DD")} //may need to change
                        mode={1}
                      />
                     
                    </td>
                    <td className="px-6 py-4 w-1/4">
                      <TDInputTemplate
                        placeholder="LR No."
                        type="text"
                        name="lr_no"
                        formControlName={lr_no}
                        handleChange={(txt)=>setLrNo(txt.target.value)}
                        mode={1}
                      />
                    </td>
                    <td className="px-6 py-4 w-1/4">
                      <TDInputTemplate
                        placeholder="Waybill"
                        type="text"
                        name="waybill"
                        formControlName={waybill}
                        handleChange={(txt)=>setWayBill(txt.target.value)}
                        mode={1}
                      />
                    </td>
                  </tr>
                </tbody>

              </table>
              <div className="bg-[#C4F1BE] px-6 py-3  sm:col-span-12 text-green-900 font-bold text-xs uppercase">
                Documents
              </div>
              <div
                style={{ width: "100%" }}
                className="border-2 bg-[#DDEAE0] rounded-b-lg p-3  sm:col-span-12 border-gray-300"
              >
                <Row>
                  <Col span={8}>
                    <Checkbox checked={ic} name="ic" onChange={onChangeIc}>
                      Insurance Certificate
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={og} name="og" onChange={onChangeIc}>
                      Original Copy
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={dc} name="dc" onChange={onChangeIc}>
                      Duplicate Copy
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={lr} name="lr" onChange={onChangeIc}>
                      LR
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={wb} name="wb" onChange={onChangeIc}>
                      Waybill
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={pl} name="pl" onChange={onChangeIc}>
                      Packing List
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={om} name="om" onChange={onChangeIc}>
                      Operation and Maintenance
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      checked={om_manual}
                      name="om_manual"
                      onChange={onChangeIc}
                    >
                      O&M Manual
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={ws} name="ws" onChange={onChangeIc}>
                      Weighing Slip
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={tc} name="tc" onChange={onChangeIc}>
                      TC
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={wc} name="wc" onChange={onChangeIc}>
                      Warranty Certificate
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox checked={ot} name="ot" onChange={onChangeIc}>
                      Others
                    </Checkbox>
                  </Col>
                </Row>
                {ot == true && (
                  <Row>
                    <Col span={24} className="my-2">
                      <TDInputTemplate
                        placeholder="Specify Document"
                        type="text"
                        name="ot_desc"
                        label="Specify Document"
                        formControlName={ot_desc}
                        handleChange={(txt) => setOtDesc(txt.target.value)}
                        mode={3}
                      />
                    </Col>
                  </Row>
                )}
                {ot == true && (
                  <Row>
                    <Col span={24} className="my-2">
                      <TDInputTemplate
                        placeholder="Other Document"
                        type="file"
                        name="ot_desc"
                        label="Other Document"
                        // formControlName={ot_desc}
                        handleChange={(txt) => setDoc(txt.target.files[0])}
                        mode={1}
                      />
                      {fileList?.map((item) => (
                        <div className="relative">
                          <a
                            target="_blank"
                            href={url + "/uploads/" + item.doc}
                          >
                            {item.doc.toString().split(".")[1] == "pdf" ? (
                              <FilePdfOutlined className="text-6xl my-7 text-red-600" />
                            ) : item.doc
                                .toString()
                                .split(".")[1]
                                ?.includes("doc") ? (
                              <FileWordOutlined className="text-6xl my-7 text-blue-900" />
                            ) : item.doc
                                .toString()
                                .split(".")[1]
                                ?.includes("xls") ||
                              item.doc
                                .toString()
                                .split(".")[1]
                                ?.includes("csv") ? (
                              <FileExcelOutlined className="text-6xl my-7 text-green-800" />
                            ) : (
                              <FileImageOutlined className="text-6xl my-7 text-yellow-500" />
                            )}
                          </a>
                          <DeleteOutlined
                            className="text-red-800 absolute top-6 "
                            onClick={() => {
                              setId(item.sl_no);
                              setFlag(4);
                              setVisible(true);
                            }}
                          />
                        </div>
                      ))}
                    </Col>
                  </Row>
                )}
              </div>
              <ScrollPanel
                style={{ width: "100%", height: "300px" }}
                className="relative border-2 overflow-x-hidden border-gray-300 p-2 rounded-lg sm:col-span-12"
              >
                <div>
                  {itemForm.map((item, index) => (
                    <>
                      {itemForm.length > 1 && (
                        <Divider
                          style={{ borderColor: "#014737", color: "#A8A29E" }}
                        >
                          <span className="text-green-900 flex justify-between">
                            {rowSum(
                              itemList.filter((e) => e.sl_no == item.item_id),
                              item.quantity
                            ).flag == 1 ? (
                              <CheckCircleFilled className="text-lg text-green-900" />
                            ) : rowSum(
                                itemList.filter((e) => e.sl_no == item.item_id),
                                item.quantity
                              ).sum > 0 ? (
                              <ClockCircleFilled className="text-lg text-amber-600" />
                            ) : (
                              <CloseCircleFilled className="text-[#92140C]" />
                            )}{" "}
                          </span>
                       
                        </Divider>
                      )}
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
                              Ordered Quantity
                            </th>
                            {rowSum(
                              itemList.filter((e) => e.sl_no == item.item_id),
                              item.quantity
                            ).sum > 0 &&
                              rowSum(
                                itemList.filter((e) => e.sl_no == item.item_id),
                                item.quantity
                              ).sum < item.quantity && (
                                <th
                                  scope="col"
                                  className="px-6 py-3 w-1/6 font-bold"
                                >
                                  Already Received
                                </th>
                              )}
                            <th
                              scope="col"
                              className="px-6 py-3 w-1/6 font-bold"
                            >
                              Received Quantity
                            </th>
                            {rowSum(
                          itemList.filter((e) => e.sl_no == item.item_id),
                          item.quantity
                        ).flag == 0 && (
                            <th
                                  scope="col"
                                  className="px-6 py-3 w-1/6 font-bold"
                                >
                                  Sl No.
                                </th>
                        )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-[#DDEAE0] border-b-2 border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-4 w-1/6 py-4 flex justify-between gap-10 items-center  text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Tag
                                color={
                                  rowSum(
                                    itemList.filter(
                                      (e) => e.sl_no == item.item_id
                                    ),
                                    item.quantity
                                  ).flag == 1
                                    ? "#014737"
                                    : rowSum(
                                        itemList.filter(
                                          (e) => e.sl_no == item.item_id
                                        ),
                                        item.quantity
                                      ).sum > 0
                                    ? "#eb8d00"
                                    : "#92140C"
                                }
                              >
                                {" "}
                                {item.name}{" "}
                              </Tag>
                            </th>
                            <th
                              scope="row"
                              className="px-4 w-1/6 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {rowSum(
                                itemList.filter((e) => e.sl_no == item.item_id),
                                item.quantity
                              ).flag == 0 ? (
                                <TDInputTemplate
                                  placeholder="Quantity"
                                  type="number"
                                  name="quantity"
                                  disabled={true}
                                  formControlName={item.quantity}
                                  mode={1}
                                />
                              ) : (
                                <span className="flex justify-between">
                                  <span className="text-green-900">
                                    {item.quantity}
                                  </span>

                                  <a
                                    className="my-2"
                                    onClick={() => {
                                      setFlag(15);
                                      setItemInfo(
                                        itemList.filter(
                                          (e) => e.sl_no == item.sl_no
                                        )
                                      );
                                      setVisible(true);
                                    }}
                                  >
                                    <Tag color="#4FB477">View Log</Tag>
                                  </a>
                                </span>
                              )}
                            </th>
                            {rowSum(
                              itemList.filter((e) => e.sl_no == item.item_id),
                              item.quantity
                            ).sum > 0 &&
                              rowSum(
                                itemList.filter((e) => e.sl_no == item.item_id),
                                item.quantity
                              ).sum < item.quantity && (
                                <th
                                  scope="row"
                                  className="px-4 w-1/6 py-4 flex justify-between gap-10 items-center text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  <span>
                                    {
                                      rowSum(
                                        itemList.filter(
                                          (e) => e.sl_no == item.item_id
                                        ),
                                        item.quantity
                                      ).sum
                                    }
                                  </span>
                                  <a
                                    className="my-2"
                                    onClick={() => {
                                      setFlag(15);
                                      setItemInfo(
                                        itemList.filter(
                                          (e) => e.sl_no == item.sl_no
                                        )
                                      );
                                      setVisible(true);
                                    }}
                                  >
                                    <Tag color="#4FB477">View Log</Tag>
                                  </a>
                                </th>
                              )}
                            <td className="px-6 py-4 w-1/6">
                              {rowSum(
                                itemList.filter((e) => e.sl_no == item.item_id),
                                item.quantity
                              ).flag == 0 ? (
                               
                                   <TDInputTemplate
                                  placeholder="Quantity"
                                  type="number"
                                  name="rc_qty"
                                  formControlName={item.rc_qty}
                                  handleChange={(event) =>
                                    handleDtChange(index, event)
                                  }
                                  mode={1}
                                />
                              ) : (
                                <span className="text-green-900 flex justify-between">
                                  {
                                    rowSum(
                                      itemList.filter(
                                        (e) => e.sl_no == item.item_id
                                      ),
                                      item.quantity
                                    ).sum
                                  }
                                  {rowSum(
                                    itemList.filter(
                                      (e) => e.sl_no == item.item_id
                                    ),
                                    item.quantity
                                  ).flag == 1 ? (
                                    <CheckCircleFilled className="text-lg text-green-900" />
                                  ) : (
                                    <ClockCircleFilled className="text-lg text-amber-600" />
                                  )}{" "}
                                </span>
                              )}
                              { 
                                     item.quantity<((+item.rc_qty)+rowSum(itemList.filter(
                                      (e) => e.sl_no == item.item_id
                                    ),
                                    item.quantity
                                  ).sum) ? (
                                <VError title={"Invalid quantity,should be <="+(item.quantity-rowSum(itemList.filter(
                                  (e) => e.sl_no == item.item_id
                                ),
                                item.quantity
                              ).sum)} />
                              ) : null}
                             {item.rc_qty<0?
                              <VError title={"Invalid quantity should be >0"} />:null}
                            </td>
                            {rowSum(
                                    itemList.filter(
                                      (e) => e.sl_no == item.item_id
                                    ),
                                    item.quantity
                                  ).flag == 0 ?
                            <td className="px-6 py-4 w-1/6">
                                  
                                    <TDInputTemplate
                                      placeholder="Sl No."
                                      type="text"
                                      name="sl"
                                      formControlName={item.sl}
                                      handleChange={(event) =>
                                        handleDtChange(index, event)
                                      }
                                      mode={1}
                                    />
                                  
                                </td>
                                  :null}
                          </tr>
                        </tbody>
                      </table>
                      <table className="w-full border-separate border border-[#C4F1BE] overflow-x-scroll text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400">
                        {rowSum(
                          itemList.filter((e) => e.sl_no == item.item_id),
                          item.quantity
                        ).flag == 0 && (
                          <>
                            <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                              
                                <th
                                  scope="col"
                                  className="px-6 py-3 w-1/4 font-bold"
                                >
                                  Remarks
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-[#DDEAE0] border-b-2 border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                             
                                <td className="px-6 py-4 w-1/4">
                                  <TDInputTemplate
                                    placeholder="Remarks"
                                    type="text"
                                    name="remarks"
                                    formControlName={item.remarks}
                                    handleChange={(event) =>
                                      handleDtChange(index, event)
                                    }
                                    mode={3}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </>
                        )}
                      </table>
                    </>
                  ))}
                </div>
              </ScrollPanel>
            </div>
            <Tag className="my-5 border-green-900 " color="#C4F1BE">
              <Checkbox className="italic font-bold" checked={con} name="con" onChange={onChangeIc}>
                I have checked all the materials and have gone through the
                quantities and the serial numbers of each
              </Checkbox>
            </Tag>
            {zeroError?
            <p>
                              <VError title={"Must enter atleast one received quantity"} />
                              
                              </p>:null} 
            <div className="flex justify-center items-center gap-4">
             
            {/* {!con } {errorSum(isError)} {zeroError} { invoice } {inv_dt}  */}
              <button
                disabled={!con || errorSum(isError) ||zeroError || !invoice || !inv_dt} 
                onClick={() => onsubmit()}
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
        // data={itemList}
        data={itemInfo}
        onPress={() => setVisible(false)}
        onDelete={() => deleteItem()}
        confirm={(value)=>{if(value) {setVisible(false);
        window.location.reload()
        }}}
      />
    </section>
  );
}

export default DeliveryFormComp;
