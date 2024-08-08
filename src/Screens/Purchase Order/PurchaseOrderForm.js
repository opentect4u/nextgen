import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import BasicDetails from "../../Components/Steps/BasicDetails";
import Delivery from "../../Components/Steps/Delivery";
import More from "../../Components/Steps/More";
import TermsConditions from "../../Components/Steps/TermsConditions";
import ProductDetails from "../../Components/Steps/ProductDetails";
import HeadingTemplate from "../../Components/HeadingTemplate";
import Notes from "../../Components/Steps/Notes";
import { FileTextOutlined, LoadingOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import PaymentTerms from "../../Components/Steps/PaymentTerms";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
import { Spin } from "antd";
import { Message } from "../../Components/Message";
import DialogBox from "../../Components/DialogBox";

function PurchaseOrderForm() {
  const stepperRef = useRef(null);
  const params = useParams();
  console.log(params, "params");
  localStorage.setItem("id", params.id);
  const [loading,setLoading] = useState(false)
  const [visible,setVisible] = useState(false)
  const [delivery, setDeliveryAdd] = useState("");
  const [order_type, setOrderType] = useState("");
  const [b_order_dt, setBOrderDt] = useState("");
  const [proj_name, setProjectName] = useState("");
  const [vendor_name, setVendorName] = useState("");
  const [po_issue_date,setPoIssueDate]=useState("")

  const [order_id, setOrderId] = useState("");
  const [itemList, setItemList] = useState([]);
  const [termList, setTermList] = useState([]);
  const [notes, setNotes] = useState("");

  const [insp_flag, setInspFlag] = useState("N");
  localStorage.setItem("insp_flag", "N");
  const [insp, setInsp] = useState("");
  const [drawing_flag, setDrawingFlag] = useState("N");
  localStorage.setItem("drawing_flag", "N");

  const [drawing, setDrawing] = useState("");
  const [mdcc_flag, setMdccFlag] = useState("N");
  localStorage.setItem("mdcc_flag", "N");

  const [mdcc, setMdcc] = useState("");
  const [drawingDate, setDrawingDate] = useState("");
 
  const [price_basis_flag, setPriceBasisFlag] = useState("");
  const [price_basis_desc, setPriceBasisDesc] = useState("");
  const [packing_forwarding, setPackingForwarding] = useState("");
  const [packing_forwardingExtra, setPackingForwardingExtra] = useState("");
  const [packing_forwardingExtraVal, setPackingForwardingExtraVal] = useState("");
  const [freight_insurance, setFreightInsurance] = useState("");
  const [freight_insurance_val, setFreightInsuranceVal] = useState("");
  const [test_certificate, setTestCertificate] = useState("");
  const [test_certificate_desc, setTestCertificateDesc] = useState("");
  const [ld_applicable_date, setLDApplicableDate] = useState("");
  const [others_ld, setOthersLd] = useState("");
  const [ld_applied_on, setLDAppliedOn] = useState("");
  const [others_applied, setOthersApplied] = useState("");
  const [ld_value, setLDValue] = useState("");
  const [po_min_value, setPOMinValue] = useState("");
  const [warranty_guarantee_flag, setWarrantyFlag] = useState("");
  const [duration, setDuration] = useState("");
  const [duration_val, setDurationVal] = useState("");
  const [om_manual_flag, setOMFlag] = useState("");
  const [om_manual_desc, setOMDesc] = useState("");
  const [oi_flag, setOIFlag] = useState("");
  const [oi_desc, setOIDesc] = useState("");
  const [ware_house_flag,setWareHouse]=useState("")
  const [packing_type, setPackingType] = useState("");
  const [manufacture_clearance, setManufactureClearance] = useState("");
  const [manufacture_clearance_desc, setManufactureDesc] = useState("");
  const [clickFlag,setClickFlag]=useState("P")
  const navigate=useNavigate()
  const submitPo=()=>{
    axios.post(url + "/api/addpo", {
      sl_no:+localStorage.getItem('id'),
      po_status:clickFlag,
      po_issue_date:localStorage.getItem('po_issue_date'),
      po_id: localStorage.getItem("order_id"),
      po_date: localStorage.getItem("order_date"),
      po_type: localStorage.getItem("order_type"),
      project_id: localStorage.getItem("proj_name"),
      vendor_id: localStorage.getItem("vendor_name"),
      item_dtl:JSON.parse(localStorage.getItem("itemList")),
      price_basis: JSON.parse(localStorage.getItem("terms"))
        ? JSON.parse(localStorage.getItem("terms"))
        .price_basis_flag:"",
      price_basis_desc:JSON.parse(localStorage.getItem("terms"))
      ? JSON.parse(localStorage.getItem("terms"))
        .price_basis_desc :"",
      packing_fwd_val:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .packing_forwarding_val:"",
        packing_fwd_extra:JSON.parse(localStorage.getItem("terms"))? parseFloat(JSON.parse(localStorage.getItem("terms"))
        .packing_forwarding_extra):0.0,
        packing_fwd_extra_val:JSON.parse(localStorage.getItem("terms"))? parseFloat(JSON.parse(localStorage.getItem("terms"))
        .packing_forwarding_extra_val):0.0,
      freight_ins: JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .freight_insurance:"",
        freight_ins_val: JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .freight_insurance_val:"",
      test_certificate:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .test_certificate:"",
      test_certificate_desc:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .test_certificate_desc:"",
      ld_date: JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .ld_applicable_date:"",
      ld_date_desc:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms")).others_ld:"",
      ld_val: JSON.parse(localStorage.getItem("terms"))?JSON.parse(localStorage.getItem("terms")).ld_applied_on:"",
      ld_val_desc:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .others_applied:"",
      ld_val_per: JSON.parse(localStorage.getItem("terms"))?parseFloat(JSON.parse(localStorage.getItem("terms")).ld_value):0.0,
      min_per:JSON.parse(localStorage.getItem("terms"))?  parseFloat(JSON.parse(localStorage.getItem("terms")).po_min_value):0.0,
      warranty_guaranty:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .warranty_guarantee_flag:"",
      duration:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms")).duration:"",
      duration_value:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .duration_val:"",
      o_m_manual:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .om_manual_flag:"",
      o_m_desc:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms")).om_manual_desc:'',
      operation_installation:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .oi_flag:"",
      operation_installation_desc:JSON.parse(
        localStorage.getItem("terms")
      )? JSON.parse(
        localStorage.getItem("terms")
      ).oi_desc:"",
      packing_type: JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .packing_type:"",
      manufacture_clearance:JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
        .manufacture_clearance:"",
      manufacture_clearance_desc:JSON.parse(
        localStorage.getItem("terms")
      )? JSON.parse(
        localStorage.getItem("terms")
      ).manufacture_clearance_desc:"",
      payment_terms:JSON.parse(localStorage.getItem('termList')),
      bill_to:'NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046',
      ship_to:localStorage.getItem("ship_to"),
      warehouse_flag:localStorage.getItem('ware_house_flag'),
      po_notes:localStorage.getItem("notes"),
      mdcc:localStorage.getItem("mdcc_flag"),
      mdcc_scope:localStorage.getItem("mdcc"),
      inspection:localStorage.getItem("insp_flag"),
      inspection_scope:localStorage.getItem("insp"),
      draw:localStorage.getItem("drawing_flag"),
      draw_scope:localStorage.getItem("drawing"),
      draw_period:localStorage.getItem("dt"),
      user:localStorage.getItem('email')

    }).then(res=>{
      if (res.data.suc > 0) {
        Message("success", res.data.msg);
        // if (params.id == 0) handleReset();
      
        setTimeout(navigate(-1),2500)
      } 
      else {
        Message("error", res.data.msg);
        setLoading(false)
      }
      console.log(res)})
      .catch(err=>Message("err", err));
  }
  useState(()=>{
  if(+params.id>0){
    axios.post(url+'/api/getpo',{id:+params.id}).then(res=>{
      console.log(res)
      localStorage.setItem('id',params.id)
      localStorage.setItem("order_id",res?.data?.msg?.po_id)
      localStorage.setItem("order_date",res?.data?.msg?.po_date)
      localStorage.setItem("order_type",res?.data?.msg?.type)
      localStorage.setItem("proj_name",res?.data?.msg?.project_id)
      localStorage.setItem("vendor_name",res?.data?.msg?.vendor_id)
      localStorage.setItem("po_status",res?.data?.msg?.po_status)
      localStorage.setItem("po_issue_date",res?.data?.msg?.po_issue_date)
      setClickFlag(res?.data?.msg?.po_status)
      setBOrderDt(res?.data?.msg?.po_date)
      setOrderType(res?.data?.msg?.type)
      setOrderId(res?.data?.msg?.po_id)
      setProjectName(res?.data?.msg?.project_id)
      setVendorName(res?.data?.msg?.vendor_id)
      setPoIssueDate(res?.data?.msg?.po_issue_date)
      axios.post(url+'/api/getpoitem',{id:+params.id}).then(resItem=>{
        
        console.log(resItem)
        for(let i=0;i<resItem?.data?.msg?.length;i++){
          itemList.push({
            sl_no:resItem?.data?.msg[i].sl_no,
            item_name:resItem?.data?.msg[i].item_id,
            qty:resItem?.data?.msg[i].quantity,
            rate:resItem?.data?.msg[i].item_rt,
            unit:resItem?.data?.msg[i].unit_id,
            disc:resItem?.data?.msg[i].discount,
            SGST:resItem?.data?.msg[i].sgst_id,
            CGST:resItem?.data?.msg[i].cgst_id,
            IGST:resItem?.data?.msg[i].igst_id,
            unit_price:resItem?.data?.msg[i].item_rt-resItem?.data?.msg[i].discount,
            delivery_date:resItem?.data?.msg[i].delivery_dt,
            total:resItem?.data?.msg[i].cgst_id? ((resItem?.data?.msg[i].item_rt-resItem?.data?.msg[i].discount)*resItem?.data?.msg[i].quantity*resItem?.data?.msg[i].cgst_id)+((resItem?.data?.msg[i].item_rt-resItem?.data?.msg[i].discount)*resItem?.data?.msg[i].quantity*resItem?.data?.msg[i].cgst_id):((resItem?.data?.msg[i].item_rt-resItem?.data?.msg[i].discount)*resItem?.data?.msg[i].quantity*resItem?.data?.msg[i].igst_id)
          })
        }
        setItemList(itemList)
        localStorage.setItem('itemList',JSON.stringify(itemList))
        axios.post(url+'/api/getpoterms',{id:+params.id}).then(resTerm=>{
          console.log(resTerm)
          setPriceBasisFlag(resTerm?.data?.msg[0]?.price_basis)
          setPriceBasisDesc(resTerm?.data?.msg[0]?.price_basis_desc)
          setPackingForwarding(resTerm?.data?.msg[0]?.packing_fwd_val)
          setPackingForwardingExtra(resTerm?.data?.msg[0]?.packing_fwd_extra)
          setPackingForwardingExtraVal(resTerm?.data?.msg[0]?.packing_fwd_extra_val)
          setFreightInsurance(resTerm?.data?.msg[0]?.freight_ins)
          setFreightInsuranceVal(resTerm?.data?.msg[0]?.freight_ins_val)
          setTestCertificate(resTerm?.data?.msg[0]?.test_certificate)
          setTestCertificateDesc(resTerm?.data?.msg[0]?.test_certificate_desc)
          setLDApplicableDate(resTerm?.data?.msg[0]?.ld_date)
          setOthersLd(resTerm?.data?.msg[0]?.ld_date_desc)
          setLDAppliedOn(resTerm?.data?.msg[0]?.ld_val)
          setOthersApplied(resTerm?.data?.msg[0]?.ld_val_desc)
          setLDValue(resTerm?.data?.msg[0]?.ld_val_per)
          setPOMinValue(resTerm?.data?.msg[0]?.min_per)
          setWarrantyFlag(resTerm?.data?.msg[0]?.warranty_guarantee)
          setDuration(resTerm?.data?.msg[0]?.duration)
          setDurationVal(resTerm?.data?.msg[0]?.duration_value)
          setOMFlag(resTerm?.data?.msg[0]?.o_m_manual)
          setOMDesc(resTerm?.data?.msg[0]?.o_m_desc)
          setOIFlag(resTerm?.data?.msg[0]?.operation_installation)
          setOIDesc(resTerm?.data?.msg[0]?.operation_installation_desc)
          setPackingType(resTerm?.data?.msg[0]?.packing_type)
          setManufactureClearance(resTerm?.data?.msg[0]?.manufacture_clearance)
          setManufactureDesc(resTerm?.data?.msg[0]?.manufacture_clearance_desc)
          const terms_conditions={
            price_basis_flag: resTerm?.data?.msg[0]?.price_basis,
            price_basis_desc:resTerm?.data?.msg[0]?.price_basis_desc,
            packing_forwarding_val:resTerm?.data?.msg[0]?.packing_fwd_val,
            packing_forwarding_extra:resTerm?.data?.msg[0]?.packing_fwd_extra,
            packing_forwarding_extra_val:resTerm?.data?.msg[0]?.packing_fwd_extra_val,
            freight_insurance:resTerm?.data?.msg[0]?.freight_ins,
            freight_insurance_val:resTerm?.data?.msg[0]?.freight_ins_val,
            test_certificate:resTerm?.data?.msg[0]?.test_certificate,
            test_certificate_desc:resTerm?.data?.msg[0]?.test_certificate_desc,
            ld_applicable_date:resTerm?.data?.msg[0]?.ld_date,
            ld_applied_on:resTerm?.data?.msg[0]?.ld_val,
            ld_value:resTerm?.data?.msg[0]?.ld_val_per,
            po_min_value:resTerm?.data?.msg[0]?.min_per,
            others_ld:resTerm?.data?.msg[0]?.ld_date_desc,
            others_applied:resTerm?.data?.msg[0]?.ld_val_desc,
            warranty_guarantee_flag:resTerm?.data?.msg[0]?.warranty_guarantee_flag,
            duration:resTerm?.data?.msg[0]?.duration,
            duration_val:resTerm?.data?.msg[0]?.duration_value,
            om_manual_flag:resTerm?.data?.msg[0]?.o_m_manual,
            om_manual_desc:resTerm?.data?.msg[0]?.o_m_desc,
            oi_flag:resTerm?.data?.msg[0]?.oi_flag,
            oi_desc:resTerm?.data?.msg[0]?.oi_desc,
            packing_type:resTerm?.data?.msg[0]?.packing_type,
            manufacture_clearance:resTerm?.data?.msg[0]?.manufacture_clearance,
            manufacture_clearance_desc:resTerm?.data?.msg[0]?.manufacture_clearance_desc
          };
          console.log(terms_conditions)
          localStorage.setItem('terms',JSON.stringify(terms_conditions))
        })
      axios.post(url+'/api/getpopayterms',{id:+params.id}).then(resPay=>{
        console.log(resPay)
        for(let i=0;i<resPay?.data?.msg?.length;i++){
          termList.push({
            sl_no:resPay?.data?.msg[i]?.sl_no,
            stage:resPay?.data?.msg[i]?.stage_no,
            term:resPay?.data?.msg[i]?.terms_dtls
        })
        }
        setTermList(termList)
        localStorage.setItem('termList',JSON.stringify(termList))
        axios.post(url+'/api/getpodelivery',{id:+params.id}).then(resDel=>{
          console.log(resDel)
          setDeliveryAdd(resDel?.data?.msg[0]?.ship_to)
          setWareHouse(resDel?.data?.msg[0]?.ware_house_flag)
          setNotes(resDel?.data?.msg[0]?.po_notes)

          axios.post(url+'/api/getpomore',{id:+params.id}).then(resMore=>{
            console.log(resMore)
            setInspFlag(resMore?.data?.msg[0]?.inspection)
            setInsp(resMore?.data?.msg[0]?.inspection_scope)
            setMdccFlag(resMore?.data?.msg[0]?.mdcc)
            setMdcc(resMore?.data?.msg[0]?.mdcc_scope)
            setDrawingFlag(resMore?.data?.msg[0]?.draw)
            setDrawing(resMore?.data?.msg[0]?.draw_scope)
            setDrawingDate(resMore?.data?.msg[0]?.draw_period)
            localStorage.setItem("mdcc_flag",resMore?.data?.msg[0]?.mdcc)
            localStorage.setItem("mdcc",resMore?.data?.msg[0]?.mdcc)
            localStorage.setItem("insp_flag",resMore?.data?.msg[0]?.inspection)
            localStorage.setItem("insp",resMore?.data?.msg[0]?.inspection_scope)
            localStorage.setItem("drawing_flag",resMore?.data?.msg[0]?.draw)
            localStorage.setItem("drawing",resMore?.data?.msg[0]?.draw_scope)
            localStorage.setItem("dt",resMore?.data?.msg[0]?.draw_period)

          })
        })
      })

      })
    })
  }
  },[])
  return (
    <>
      <FloatButton
        icon={loading?<LoadingOutlined spin />:<FileTextOutlined />}
        tooltip="Save draft"
        disabled={loading?true:false}
        type="primary"
        style={{
          insetInlineEnd: 100,
          right: 20,
          bottom: 100,
          height: 50,
          width: 50,
        }}
        onClick={() => {setLoading(true); setClickFlag("P"); submitPo()}
        
        
        }
      />
      <HeadingTemplate
        text={params.id > 0 ? "Update purchase order" : "Create purchase order"}
        mode={params.id > 0 ? 1 : 0}
        title={"Purchase Order"}
        data={''}
      />
       <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
      <div className="card bg-white rounded-lg p-5">
        <Stepper
          ref={stepperRef}
          style={{ flexBasis: "100%" }}
          orientation="vertical"
          linear={+params.id>0?false:true}
        >
          <StepperPanel header="Basic Details">
            <BasicDetails
              data={{
                order_date: b_order_dt,
                proj_name: proj_name,
                vendor_name: vendor_name,
                type: order_type,
                order_id: order_id,
                po_issue_date:po_issue_date
              }}
              pressNext={(values) => {
                console.log(values);
                // if(values){
                setOrderType(values?.type);
                setBOrderDt(values?.order_date);
                setVendorName(values?.vendor_name);
                setProjectName(values?.proj_name);
                setOrderId(values?.order_id);
                setPoIssueDate(values.po_issue_date)
                stepperRef.current.nextCallback();
                // }
              }}
              pressBack={(values) => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Item Details">
            <ProductDetails
              data={{ itemList: itemList }}
              pressNext={(values) => {
                console.log(values);
                setItemList(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Terms & Conditions">
            <TermsConditions
              data={{
                price_basis_flag: price_basis_flag,
                price_basis_desc: price_basis_desc,
                packing_forwarding: packing_forwarding,
                packing_forwarding_extra:packing_forwardingExtra,
                packing_forwarding_extra_val:packing_forwardingExtraVal,
                freight_insurance: freight_insurance,
                freight_insurance_val: freight_insurance_val,
                test_certificate: test_certificate,
                test_certificate_desc: test_certificate_desc,
                ld_applicable_date: ld_applicable_date,
                ld_applied_on: ld_applied_on,
                ld_value: ld_value,
                po_min_value: po_min_value,
                others_ld: others_ld,
                others_applied: others_applied,
                warranty_guarantee_flag: warranty_guarantee_flag,
                duration: duration,
                duration_val: duration_val,
                om_manual_flag: om_manual_flag,
                om_manual_desc: om_manual_desc,
                oi_flag: oi_flag,
                oi_desc: oi_desc,
                packing_type: packing_type,
                manufacture_clearance: manufacture_clearance,
                manufacture_clearance_desc: manufacture_clearance_desc,
              }}
              pressNext={(values) => {
                console.log(values);
                setPriceBasisFlag(values.price_basis_flag);
                setPriceBasisDesc(values.price_basis_desc);
                setPackingForwarding(values.packing_forwarding);
                setPackingForwardingExtra(values.packing_forwarding_extra);
                setPackingForwardingExtraVal(values.packing_forwarding_extra_val);
                setFreightInsurance(values.freight_insurance);
                setFreightInsuranceVal(values.freight_insurance_val);
                setTestCertificate(values.test_certificate);
                setTestCertificateDesc(values.test_certificate_desc);
                setLDApplicableDate(values.ld_applicable_date);
                setLDAppliedOn(values.ld_applied_on);
                setOthersApplied(values.others_applied);
                setOthersLd(values.others_ld);
                setLDValue(values.ld_value);
                setPOMinValue(values.po_min_value);
                setWarrantyFlag(values.warranty_guarantee_flag);
                setDuration(values.duration);
                setDurationVal(values.duration_val);
                setOMFlag(values.om_manual_flag);
                setOMDesc(values.om_manual_desc);
                setOIFlag(values.oi_flag);
                setOIDesc(values.oi_desc);
                setPackingType(values.packing_type);
                setManufactureClearance(values.manufacture_clearance);
                setManufactureDesc(values.manufacture_clearance_desc);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Payment Terms">
            <PaymentTerms
            data={{ termList: termList }}
              pressNext={() => {
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Delivery Details">
            <Delivery
              data={{ type: order_type, delivery: delivery,ware_house_flag: ware_house_flag}}
              pressNext={(values) => {
                console.log(values);
                setDeliveryAdd(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="More">
            <More
              data={{
                mdcc_flag: mdcc_flag,
                mdcc: mdcc,
                drawing_flag: drawing_flag,
                drawing: drawing,
                insp_flag: insp_flag,
                insp: insp,
                drawingDate: drawingDate,
              }}
              pressNext={(values) => {
                console.log(values);
                setMdccFlag(values.mdcc_flag);
                setMdcc(values.mdcc);
                setDrawingFlag(values.drawing_flag);
                setDrawing(values.drawing);
                setInspFlag(values.insp_flag);
                setInsp(values.insp);
                setDrawingDate(values.drawingDate);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Notes">
            <Notes
              data={{ notes: notes }}
              pressNext={(values) => {
                console.log(values);
                setNotes(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Preview">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <button
          type="submit"
          className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
          onClick={()=>setVisible(true)}
        >
          View
        </button>
              </div>
            </div>
            <div className="flex pt-4 justify-content-start">
              {/* <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            /> */}
            </div>
          </StepperPanel>
        
        </Stepper>
      </div>
      </Spin>
      <DialogBox visible={visible} flag={10} data={''} onPress={()=>setVisible(false)}/>
    </>
  );
}

export default PurchaseOrderForm;