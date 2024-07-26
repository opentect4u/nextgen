import React, { useState } from 'react'
import TDInputTemplate from '../TDInputTemplate'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
function TermsConditions({pressNext,pressBack}) {
    const params = useParams();
    const initialValues = {
      price_basis_flag: "",
      price_basis_desc:"",
      packing_forwarding:"",
      freight_insurance:"",
      payment_terms:"",
      payment_terms_value:"",
      against:"",
      test_certificate:"",
      ld_charges:"",
      ld_applicable_date:"",
      ld_applied_on:"",
      ld_value:"",
      mrn_date:"",
      po_total_value:"",
      vendor_dispatch_date:"",
      pending_material_value:"",
      others:"",
      warranty_guarantee_flag:"",
      duration:"",
      om_manual_flag:"",
      om_manual_desc:"",
      oi_flag:"",
      oi_desc:""
    };
    const [formValues, setValues] = useState(initialValues);
    const validationSchema = Yup.object({
      price_basis_flag: Yup.string().required("Price basis date is required"),
      price_basis_desc:Yup.string().required("Price Basis is required"),
      packing_forwarding:Yup.string().required("Packing & Forwarding is required"),
      freight_insurance:Yup.string().required("Freight Insurance is required"),
      payment_terms:Yup.string().required("Payment Terms is required"),
      payment_terms_value:Yup.string().required("Value is required"),
      against:Yup.string().required("Against is required"),
      test_certificate:Yup.string().required("Test Certificate is required"),
      ld_charges:Yup.string().required("LD Charges is required"),
      ld_applicable_date:Yup.string().required("LD applicable date is required"),
      ld_applied_on:Yup.string().required("LD applied on is required"),
      ld_value:Yup.string().required("LD values is required"),
      mrn_date:Yup.string().required("Order date is required"),
      po_total_value:Yup.string().required("Order date is required"),
      vendor_dispatch_date:Yup.string().required("Order date is required"),
      pending_material_value:Yup.string().required("Order date is required"),
      others:Yup.string().required("Order date is required"),
      warranty_guarantee_flag:Yup.string().required("Order date is required"),
      duration:Yup.string().required("Order date is required"),
      om_manual_flag:Yup.string().required("Order date is required"),
      om_manual_desc:Yup.string().required("Order date is required"),
      oi_flag:Yup.string().required("Order date is required"),
      oi_desc:Yup.string().required("Order date is required")
    });
   
    const onSubmit = (values) => {
      console.log(values);
      pressNext(values)
    };
    const formik = useFormik({
      initialValues: +params.id > 0 ? formValues : initialValues,
      onSubmit,
      validationSchema,
      validateOnMount: true,
      enableReinitialize: true,
    });
  
  return (
    <div className="py-2 px-4 mx-auto w-full lg:py-2">
     <h2 className="text-2xl text-green-900 font-bold my-3">
        Terms & Conditions
        </h2>
    <form action="#">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Price Basis"
                        type="text"
                        label="Price Basis"
                        name="project_name"
                        data={[
                          { name: "For", code: "F" },
                          { name: "Ex-works", code: "E" },
                        ]}
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Price Basis Description"
                        type="text"
                        label="Price Basis Description"
                        name="project_name"
                        
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
      
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Packing & Forwaring"
                        type="text"
                        label="Packing & Forwaring"
                        name="project_name"
                        
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>

        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Freight & Insurance"
                        type="text"
                        label="Freight & Insurance"
                        name="project_name"
                        
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Payment Terms"
                        type="text"
                        label="Payment Terms"
                        name="project_name"
                        data={[
                          { name: "PI", code: "pi" },
                          { name: "PDC", code: "pdc" },
                          { name: "Others", code: "O" }
                        ]}
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Payment Terms Value"
                        type="text"
                        label="Payment Terms Value"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Against"
                        type="text"
                        label="Against"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Test Certificate"
                        type="text"
                        label="Test Certificate"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD Charges"
                        type="text"
                        label="LD Charges"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD applicable date"
                        type="date"
                        label="LD applicable date"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD value applied on"
                        type="text"
                        label="LD value applied on"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD value (%)"
                        type="text"
                        label="LD value (%)"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="MRN Date"
                        type="date"
                        label="MRN Date"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="PO total value"
                        type="text"
                        label="PO total value"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Vendor dispatch date"
                        type="date"
                        label="Vendor dispatch date"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Pending material value"
                        type="text"
                        label="Pending material value"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Others"
                        type="text"
                        label="Others"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Warranty/Guarantee"
                        type="text"
                        label="Warranty/Guarantee"
                        name="project_name"
                        data={[
                          { name: "Warranty", code: "W" },
                          { name: "Guarantee", code: "G" },
                        ]}
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Duration"
                        type="date"
                        label="Duration"
                        name="project_name"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Price Basis"
                        type="text"
                        label="Price Basis"
                        name="project_name"
                        data={[
                          { name: "For", code: "F" },
                          { name: "Ex-works", code: "E" },
                        ]}
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="O&M Manual"
                        type="text"
                        label="O&M Manual"
                        name="project_name"
                        data={[
                          { name: "Applicable", code: "A" },
                          { name: "Not Applicable", code: "NA" },
                        ]}
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="O&M Manual Description"
                        type="text"
                        label="O&M Manual Description"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Operation/Installation"
                        type="text"
                        label="Operation/Installation"
                        name="project_name"
                        data={[
                          { name: "Applicable", code: "A" },
                          { name: "Not Applicable", code: "NA" },
                        ]}
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Operation/Installation Description"
                        type="text"
                        label="Operation/Installation Description"
                       
                        // formControlName={formik.values.project_name}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )} */}
        </div>
      </div>
    </form>
  </div>
  )
}

export default TermsConditions
