import React, { useState } from 'react'
import TDInputTemplate from '../TDInputTemplate'
import { useFormik } from "formik";
import * as Yup from "yup";
import VError from "../../Components/VError";
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
      oi_desc:"",
      packing_type:"",
      manufacture_clearance:""
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
      mrn_date:Yup.string().required("MRN date is required"),
      po_total_value:Yup.string().required("PO total value is required"),
      vendor_dispatch_date:Yup.string().required("Vendor dispatch date is required"),
      pending_material_value:Yup.string().required("Pending material value is required"),
      others:Yup.string().required("Others is required"),
      warranty_guarantee_flag:Yup.string().required("Warranty/Guarantee is required"),
      duration:Yup.string().required("Duration is required"),
      om_manual_flag:Yup.string().required("O&M Manual is required"),
      om_manual_desc:Yup.string().required("O&M Manual description is required"),
      oi_flag:Yup.string().required("Operation/Installation is required"),
      oi_desc:Yup.string().required("Operation/Installation description is required"),
      packing_type:Yup.string().required("Packing type is required"),
      manufacture_clearance:Yup.string().required("Manufacture clearance is required")
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
    <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Price Basis"
                        type="text"
                        label="Price Basis"
                        name="price_basis_flag"
                        data={[
                          { name: "For", code: "F" },
                          { name: "Ex-works", code: "E" },
                        ]}
                        formControlName={formik.values.price_basis_flag}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.price_basis_flag && formik.touched.price_basis_flag && (
                      <VError title={formik.errors.price_basis_flag} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Price Basis Description"
                        type="text"
                        label="Price Basis Description"
                        name="price_basis_desc"
                        
                        formControlName={formik.values.price_basis_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )}
        </div>
      
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Packing & Forwaring"
                        type="text"
                        label="Packing & Forwaring"
                        name="packing_forwarding"
                        
                        formControlName={formik.values.packing_forwarding}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.packing_forwarding && formik.touched.packing_forwarding && (
                      <VError title={formik.errors.packing_forwarding} />
                    )}
        </div>

        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Freight & Insurance"
                        type="text"
                        label="Freight & Insurance"
                        name="freight_insurance"
                        
                        formControlName={formik.values.freight_insurance}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.freight_insurance && formik.touched.freight_insurance && (
                      <VError title={formik.errors.freight_insurance} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Payment Terms"
                        type="text"
                        label="Payment Terms"
                        name="payment_terms"
                        data={[
                          { name: "PI", code: "pi" },
                          { name: "PDC", code: "pdc" },
                          { name: "Others", code: "O" }
                        ]}
                        formControlName={formik.values.payment_terms}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.payment_terms && formik.touched.payment_terms && (
                      <VError title={formik.errors.payment_terms} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Payment Terms Value"
                        type="text"
                        label="Payment Terms Value"
                        name="payment_terms_value"
                       
                        formControlName={formik.values.payment_terms_value}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.payment_terms_value && formik.touched.payment_terms_value && (
                      <VError title={formik.errors.payment_terms_value} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Against"
                        type="text"
                        label="Against"
                        name="against"
                       
                        formControlName={formik.values.against}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.against && formik.touched.against && (
                      <VError title={formik.errors.against} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Test Certificate"
                        type="text"
                        label="Test Certificate"
                        name="test_certificate"
                       
                        formControlName={formik.values.test_certificate}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.test_certificate && formik.touched.test_certificate && (
                      <VError title={formik.errors.test_certificate} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD Charges"
                        type="text"
                        label="LD Charges"
                        name="ld_charges"
                       
                        formControlName={formik.values.ld_charges}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.ld_charges && formik.touched.ld_charges && (
                      <VError title={formik.errors.ld_charges} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD applicable date"
                        type="date"
                        label="LD applicable date"
                        name="ld_applicable_date"
                       
                        formControlName={formik.values.ld_applicable_date}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.ld_applicable_date && formik.touched.ld_applicable_date && (
                      <VError title={formik.errors.ld_applicable_date} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD value applied on"
                        type="text"
                        label="LD value applied on"
                        name="ld_applied_on"
                       
                        formControlName={formik.values.ld_applied_on}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.ld_applied_on && formik.touched.ld_applied_on && (
                      <VError title={formik.errors.ld_applied_on} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD value (%)"
                        type="text"
                        label="LD value (%)"
                        name="ld_value"
                       
                        formControlName={formik.values.ld_value}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.ld_value && formik.touched.ld_value && (
                      <VError title={formik.errors.ld_value} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="MRN Date"
                        type="date"
                        label="MRN Date"
                        name="mrn_date"
                       
                        formControlName={formik.values.mrn_date}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.mrn_date && formik.touched.mrn_date && (
                      <VError title={formik.errors.mrn_date} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="PO total value"
                        type="text"
                        label="PO total value"
                        name="po_total_value"
                       
                        formControlName={formik.values.po_total_value}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.po_total_value && formik.touched.po_total_value && (
                      <VError title={formik.errors.po_total_value} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Vendor dispatch date"
                        type="date"
                        label="Vendor dispatch date"
                        name="vendor_dispatch_date"
                       
                        formControlName={formik.values.vendor_dispatch_date}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.vendor_dispatch_date && formik.touched.vendor_dispatch_date && (
                      <VError title={formik.errors.vendor_dispatch_date} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Pending material value"
                        type="text"
                        label="Pending material value"
                        name="pending_material_value"
                       
                        formControlName={formik.values.pending_material_value}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.pending_material_value && formik.touched.pending_material_value && (
                      <VError title={formik.errors.pending_material_value} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Others"
                        type="text"
                        label="Others"
                        name="others"
                       
                        formControlName={formik.values.others}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.others && formik.touched.others && (
                      <VError title={formik.errors.others} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Warranty/Guarantee"
                        type="text"
                        label="Warranty/Guarantee"
                        name="warranty_guarantee_flag"
                        data={[
                          { name: "Warranty", code: "W" },
                          { name: "Guarantee", code: "G" },
                        ]}
                        formControlName={formik.values.warranty_guarantee_flag}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.warranty_guarantee_flag && formik.touched.warranty_guarantee_flag && (
                      <VError title={formik.errors.warranty_guarantee_flag} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Duration"
                        type="date"
                        label="Duration"
                        name="duration"
                       
                        formControlName={formik.values.duration}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.duration && formik.touched.duration && (
                      <VError title={formik.errors.duration} />
                    )}
        </div>
      
        
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="O&M Manual"
                        type="text"
                        label="O&M Manual"
                        name="om_manual_flag"
                        data={[
                          { name: "Applicable", code: "A" },
                          { name: "Not Applicable", code: "NA" },
                        ]}
                        formControlName={formik.values.om_manual_flag}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.om_manual_flag && formik.touched.om_manual_flag && (
                      <VError title={formik.errors.om_manual_flag} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="O&M Manual Description"
                        type="text"
                        label="O&M Manual Description"
                        name="om_manual_desc"
                        formControlName={formik.values.om_manual_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.om_manual_desc && formik.touched.om_manual_desc && (
                      <VError title={formik.errors.om_manual_desc} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Operation/Installation"
                        type="text"
                        label="Operation/Installation"
                        name="oi_flag"
                        data={[
                          { name: "Applicable", code: "A" },
                          { name: "Not Applicable", code: "NA" },
                        ]}
                        formControlName={formik.values.oi_flag}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.oi_flag && formik.touched.oi_flag && (
                      <VError title={formik.errors.oi_flag} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Operation/Installation Description"
                        type="text"
                        label="Operation/Installation Description"
                        name="oi_desc"
                        formControlName={formik.values.oi_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.oi_desc && formik.touched.oi_desc && (
                      <VError title={formik.errors.oi_desc} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Packing type"
                        type="text"
                        label="Packing type"
                        name="packing_type"
                        formControlName={formik.values.packing_type}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.packing_type && formik.touched.packing_type && (
                      <VError title={formik.errors.packing_type} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="Manufacture Clearance"
                        type="text"
                        label="Manufacture Clearance"
                        name="manufacture_clearance"
                        data={[
                          { name: "Applicable", code: "A" },
                          { name: "Not Applicable", code: "NA" },
                        ]}
                        formControlName={formik.values.manufacture_clearance}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.manufacture_clearance && formik.touched.manufacture_clearance && (
                      <VError title={formik.errors.manufacture_clearance} />
                    )}
        </div>
      </div>
      <div className="flex pt-4 justify-between w-full">
        <button
          className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
          onClick={pressBack}
        >
          Back
        </button>
        <button
          type="submit"
          className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </form>
  </div>
  )
}

export default TermsConditions
