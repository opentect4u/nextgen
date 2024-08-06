import React, { useRef, useState } from "react";
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

function PurchaseOrderForm() {
  const stepperRef = useRef(null);
  const params = useParams();
  console.log(params, "params");
  localStorage.setItem("id", params.id);
  const [loading,setLoading] = useState(false)
  const [delivery, setDeliveryAdd] = useState("");
  const [order_type, setOrderType] = useState("");
  const [b_order_dt, setBOrderDt] = useState("");
  const [proj_name, setProjectName] = useState("");
  const [vendor_name, setVendorName] = useState("");
  const [order_id, setOrderId] = useState("");
  const [itemList, setItemList] = useState([]);
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
  const [freight_insurance, setFreightInsurance] = useState("");
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
  const [packing_type, setPackingType] = useState("");
  const [manufacture_clearance, setManufactureClearance] = useState("");
  const [manufacture_clearance_desc, setManufactureDesc] = useState("");
  return (
    <>
      <FloatButton
        icon={<FileTextOutlined />}
        tooltip="Save draft"
        type="primary"
        style={{
          insetInlineEnd: 100,
          right: 20,
          bottom: 100,
          height: 50,
          width: 50,
        }}
        onClick={() => {
          setLoading(true)
          axios.post(url + "/api/addpo", {
            sl_no:+localStorage.getItem('id'),
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
            packing_fwd_per:JSON.parse(localStorage.getItem("terms"))? parseFloat(JSON.parse(localStorage.getItem("terms"))
              .packing_forwarding):0.0,
            freight_ins: JSON.parse(localStorage.getItem("terms"))? JSON.parse(localStorage.getItem("terms"))
              .freight_insurance:"",
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
            warehouse_flag:'Y',
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
              setLoading(false)
            } else {
              Message("error", res.data.msg);
              setLoading(false)

            }
            console.log(res)})
            .catch(err=>Message("err", err));
        }}
      />
      <HeadingTemplate
        text={params.id > 0 ? "Update purchase order" : "Create purchase order"}
        mode={params.id > 0 ? 1 : 0}
        title={"Purchase Order"}
        // data={params.id && data?data:''}
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
        >
          <StepperPanel header="Basic Details">
            <BasicDetails
              data={{
                order_date: b_order_dt,
                proj_name: proj_name,
                vendor_name: vendor_name,
                type: order_type,
                order_id: order_id,
              }}
              pressNext={(values) => {
                console.log(values);
                setOrderType(values.type);
                setBOrderDt(values.order_date);
                setVendorName(values.vendor_name);
                setProjectName(values.proj_name);
                setOrderId(values.order_id);
                stepperRef.current.nextCallback();
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
                freight_insurance: freight_insurance,
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
                setFreightInsurance(values.freight_insurance);
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
              data={{ type: order_type, delivery: delivery }}
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
                Content III
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
          <StepperPanel header="Logs">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                Content III
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
    </>
  );
}

export default PurchaseOrderForm;
