import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import OrderType from "../../Components/Steps/OrderType";
import BasicDetails from "../../Components/Steps/BasicDetails";
import Delivery from "../../Components/Steps/Delivery";
import More from "../../Components/Steps/More";
import TermsConditions from "../../Components/Steps/TermsConditions";
import ProductDetails from "../../Components/Steps/ProductDetails";
import HeadingTemplate from "../../Components/HeadingTemplate";
import Notes from "../../Components/Steps/Notes";
import { FileTextOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import PaymentTerms from "../../Components/Steps/PaymentTerms";
function PurchaseOrderForm() {
  const stepperRef = useRef(null);

  const params = useParams();
  console.log(params, "params");
  const [delivery, setDeliveryAdd] = useState("");
  const [order_type, setOrderType] = useState("");
  const [b_order_dt, setBOrderDt] = useState("");
  const [proj_name, setProjectName] = useState("");
  const [vendor_name, setVendorName] = useState("");
  const [order_id, setOrderId] = useState("");
  const [itemList, setItemList] = useState([]);
  const [notes, setNotes] = useState("");

  const [insp_flag, setInspFlag] = useState("N");
  const [insp, setInsp] = useState("");
  const [drawing_flag, setDrawingFlag] = useState("N");
  const [drawing, setDrawing] = useState("");
  const [mdcc_flag, setMdccFlag] = useState("N");
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
      />
      <HeadingTemplate
        text={params.id > 0 ? "Update purchase order" : "Create purchase order"}
        mode={params.id > 0 ? 1 : 0}
        title={"Purchase Order"}
        // data={params.id && data?data:''}
      />
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
                ld_applicable_date:ld_applicable_date,
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
    </>
  );
}

export default PurchaseOrderForm;
