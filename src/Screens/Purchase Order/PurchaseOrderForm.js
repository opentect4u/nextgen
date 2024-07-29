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
function PurchaseOrderForm() {
  const stepperRef = useRef(null);

  const params = useParams();
  console.log(params, "params");
  const [type, setType] = useState("");
  const [deliveryConfirm, setDelivery] = useState(false);
  const [insp, setInsp] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [delivery, setDeliveryAdd] = useState("");
  const [order_type, setOrderType] = useState("");
  return (
    <>
      <HeadingTemplate
        text={params.id > 0 ? "Update purchase order" : "Create purchase order"}
        mode={params.id > 0 ? 1 : 0}
        title={"Purchase Order"}
        // data={params.id && data?data:''}
      />
      <div className="card bg-white rounded-lg p-5">
        <Stepper ref={stepperRef} style={{ flexBasis: "100%" }}>
          <StepperPanel header="Order Type">
            <OrderType
              pressNext={(values) => {
                console.log(values);
                setOrderType(values.order_type);
                stepperRef.current.nextCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Basic Details">
            <BasicDetails
              type={order_type}
              pressNext={(values) => {
                console.log(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={(values) => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Product Details">
            <ProductDetails
              pressNext={(values) => {
                console.log(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={(values) => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Terms & Conditions">
            <TermsConditions
              pressNext={(values) => {
                console.log(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Delivery Details">
            <Delivery
              type={order_type}
              pressNext={(values) => {
                console.log(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="More">
            <More
              pressNext={(values) => {
                console.log(values);
                stepperRef.current.nextCallback();
              }}
              pressBack={() => {
                stepperRef.current.prevCallback();
              }}
            />
          </StepperPanel>
          <StepperPanel header="Notes">
            <Notes/>
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
