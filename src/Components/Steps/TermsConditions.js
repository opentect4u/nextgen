import React, { useEffect, useState } from 'react'
import TDInputTemplate from '../TDInputTemplate'
import { useFormik } from "formik";
import * as Yup from "yup";
import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
function TermsConditions({pressNext,pressBack,data}) {
    console.log(data)
    const params = useParams();
    const initialValues = {
      price_basis_flag: data.price_basis_flag?data.price_basis_flag:"",
      price_basis_desc:data.price_basis_desc?data.price_basis_desc:"",
      packing_forwarding_val:data.packing_forwarding?data.packing_forwarding:"",
      packing_forwarding_extra:data.packing_forwarding?data.packing_forwarding_extra:"",
      packing_forwarding_extra_val:data.packing_forwarding?data.packing_forwarding_extra_val:"",
      freight_insurance:data.freight_insurance?data.freight_insurance:"",
      freight_insurance_val:data.freight_insurance?data.freight_insurance_val:"",
      test_certificate:data.test_certificate?data.test_certificate:"",
      test_certificate_desc:data.test_certificate_desc?data.test_certificate_desc:"",
      ld_applicable_date:data.ld_applicable_date?data.ld_applicable_date:"",
      ld_applied_on:data.ld_applied_on?data.ld_applied_on:"",
      ld_value:data.ld_value?data.ld_value:"",
      po_min_value:data.po_min_value?data.po_min_value:"",
      others_ld:data.others_ld?data.others_ld:"",
      others_applied:data.others_applied?data.others_applied:"",
      warranty_guarantee_flag:data.warranty_guarantee_flag?data.warranty_guarantee_flag:"",
      duration:data.duration?data.duration:"",
      duration_val:data.duration_val?data.duration_val:"",
      om_manual_flag:data.om_manual_flag?data.om_manual_flag:"",
      om_manual_desc:data.om_manual_desc?data.om_manual_desc:"",
      oi_flag:data.oi_flag?data.oi_flag:"",
      oi_desc:data.oi_desc?data.oi_desc:"",
      packing_type:data.packing_type?data.packing_type:"",
      manufacture_clearance:data.manufacture_clearance?data.manufacture_clearance:"",
      manufacture_clearance_desc:data.manufacture_clearance_desc?data.manufacture_clearance_desc:""
    };
    const [formValues, setValues] = useState(initialValues);
    const validationSchema = Yup.object({
      price_basis_flag: Yup.string().required("Price basis date is required"),
      price_basis_desc:Yup.string().required("Price Basis is required"),
      packing_forwarding_val:Yup.string().required("Packing & Forwarding is required"),
      packing_forwarding_extra: Yup.string().when('packing_forwarding_val', {
        is: 'E',
        then: () => Yup.string().required("Extra is required"),
        otherwise: () => Yup.string()}),
      packing_forwarding_extra_val: Yup.string().when('packing_forwarding', {
        is: 'E',
        then: () => Yup.string().required("Extra value is required"),
        otherwise: () => Yup.string()}),
      freight_insurance:Yup.string().required("Freight Insurance is required"),
      freight_insurance_val: Yup.string().when('freight_insurance', {
        is: 'E',
        then: () => Yup.string().required("Extra value is required"),
        otherwise: () => Yup.string()}),
      test_certificate:Yup.string().required("Test Certificate is required"),
      test_certificate_desc: Yup.string().when('test_certificate', {
        is: 'Y',
        then: () => Yup.string().required("Test Certificate description is required"),
        otherwise: () => Yup.string()}),
      ld_applicable_date:Yup.string().required("LD applicable date is required"),
      others_ld: Yup.string().when('ld_applicable_date', {
        is: 'O',
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string()}),

      ld_applied_on:Yup.string().required("LD applied on is required"),
      others_applied: Yup.string().when('ld_applied_on', {
        is: 'O',
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string()}),
      ld_value:Yup.string().required("LD values is required"),
      po_min_value:Yup.string().required("PO total value is required"),
      warranty_guarantee_flag:Yup.string().required("Warranty/Guarantee is required"),
      duration:Yup.string().required("Duration is required"),
      duration_val:Yup.string().required("Duration desctription is required"),
      om_manual_flag:Yup.string().required("O&M Manual is required"),
      om_manual_desc: Yup.string().when('om_manual_flag', {
        is: 'A',
        then: () => Yup.string().required("O&M Manual description is required"),
        otherwise: () => Yup.string()}),
      oi_flag:Yup.string().required("Operation/Installation is required"),
      oi_desc: Yup.string().when('oi_flag', {
        is: 'A',
        then: () => Yup.string().required("Operation/Installation description is required"),
        otherwise: () => Yup.string()}),
      packing_type:Yup.string().required("Packing type is required"),
      manufacture_clearance:Yup.string().required("Manufacture clearance is required"),
      manufacture_clearance_desc: Yup.string().when('manufacture_clearance', {
        is: 'A',
        then: () => Yup.string().required("Manufacture clearance description is required"),
        otherwise: () => Yup.string()}),
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
   useEffect(()=>{
    localStorage.removeItem('terms')
    localStorage.setItem('terms',JSON.stringify(formik.values))
    
   },[formik.values])
  return (
    <div className="py-2 px-4 mx-auto w-full lg:py-2">
     <h2 className="text-2xl text-green-900 font-bold my-3">
        Terms & Conditions
        </h2>
    <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-10 sm:gap-6">
        <div className="sm:col-span-5">
        <TDInputTemplate
                        placeholder="Price Basis"
                        type="text"
                        label="Price Basis"
                        name="price_basis_flag"
                        data={[
                          { name: "FOR", code: "F" },
                          { name: "EX-WORKS", code: "E" },
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
        <div className="sm:col-span-5">
        <TDInputTemplate
                        placeholder="Price Basis Description"
                        type="text"
                        label="Price Basis Description"
                        name="price_basis_desc"
                        
                        formControlName={formik.values.price_basis_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={3}
                      />
                      {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-6 sm:gap-6 my-10">
        <div className="sm:col-span-2">
        
        <TDInputTemplate
                        placeholder="Packing & Forwaring"
                        type="number"
                        label="Packing & Forwaring"
                        name="packing_forwarding_val"
                        data={[{name:'Inclusive',code:"I"},{name:'Extra(%)',code:'E'}]}
                        formControlName={formik.values.packing_forwarding_val}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.packing_forwarding_val && formik.touched.packing_forwarding_val && (
                      <VError title={formik.errors.packing_forwarding_val} />
                    )}
        </div>
        <div className="sm:col-span-2">
        {formik.values.packing_forwarding_val=='E' &&
        <TDInputTemplate
                        placeholder="Packing & Forwaring Extra"
                        type="number"
                        label="Packing & Forwaring Extra"
                        name="packing_forwarding_extra"
                        
                        formControlName={formik.values.packing_forwarding_extra}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />}
                      {formik.errors.packing_forwarding_extra && formik.touched.packing_forwarding_extra && (
                      <VError title={formik.errors.packing_forwarding_extra} />
                    )}
                  
        </div>

        <div className="sm:col-span-2">
        {formik.values.packing_forwarding_val=='E' &&
        <TDInputTemplate
                        placeholder="Packing & Forwaring Extra Value"
                        type="number"
                        label="Packing & Forwaring Value"
                        name="packing_forwarding_extra_val"
                        
                        formControlName={formik.values.packing_forwarding_extra_val}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
        }
                      {formik.errors.packing_forwarding_extra_val && formik.touched.packing_forwarding_extra_val && (
                      <VError title={formik.errors.packing_forwarding_extra_val} />
                    )}
        </div>
        <div className="sm:col-span-3">
        <TDInputTemplate
                        placeholder="Freight & Insurance"
                        type="text"
                        label="Freight & Insurance"
                        name="freight_insurance"
                        data={[{name:'Inclusive',code:"I"},{name:'Extra',code:'E'}]}
                        
                        formControlName={formik.values.freight_insurance}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.freight_insurance && formik.touched.freight_insurance && (
                      <VError title={formik.errors.freight_insurance} />
                    )}
        </div>
        <div className="sm:col-span-3">
        <TDInputTemplate
                        placeholder="Freight & Insurance Description"
                        type="text"
                        label="Freight & Insurance Description"
                        name="freight_insurance_val"
                        
                        formControlName={formik.values.freight_insurance_val}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={3}
                      />
                      {formik.errors.freight_insurance_val && formik.touched.freight_insurance_val && (
                      <VError title={formik.errors.freight_insurance_val} />
                    )}
        </div>
       </div>
       <div className="grid gap-4 sm:grid-cols-10 sm:gap-6 my-10">
        
       
      
        <div className="sm:col-span-5">
        <TDInputTemplate
                        placeholder="Test Certificate"
                        type="text"
                        label="Test Certificate"
                        name="test_certificate"
                       
                        formControlName={formik.values.test_certificate}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        data={[{code:'Y',name:'Yes'},{code:'N',name:'No'}]}
                        mode={2}
                      />
                      {formik.errors.test_certificate && formik.touched.test_certificate && (
                      <VError title={formik.errors.test_certificate} />
                    )}
        </div>
        <div className="sm:col-span-5">
        {formik.values.test_certificate=='Y' &&
        <TDInputTemplate
                        placeholder="Test Certificate Description"
                        type="text"
                        label="Test Certificate Description"
                        name="test_certificate_desc"
                       
                        formControlName={formik.values.test_certificate_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={3}
                      />}
                      {formik.errors.test_certificate_desc && formik.touched.test_certificate_desc && (
                      <VError title={formik.errors.test_certificate_desc} />
                    )}
        </div>
       
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD applicable date"
                        type="date"
                        label="LD applicable date"
                        name="ld_applicable_date"
                        data={[{name:'MRN Date',code:'M'},{name:'Dispatch Date',code:'D'},{name:'Others',code:'O'}]}
                        formControlName={formik.values.ld_applicable_date}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.ld_applicable_date && formik.touched.ld_applicable_date && (
                      <VError title={formik.errors.ld_applicable_date} />
                    )}
        </div>
        <div className="sm:col-span-2">
        {formik.values.ld_applicable_date=='O' &&
        <TDInputTemplate
                        placeholder="Others"
                        type="text"
                        label="Others"
                        name="others_ld"
                       
                        formControlName={formik.values.others_ld}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />}
                      {formik.errors.others_ld && formik.touched.others_ld && (
                      <VError title={formik.errors.others_ld} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD value applied on"
                        type="text"
                        label="LD value applied on"
                        name="ld_applied_on"
                        data={[{code:'T',name:'PO Total Value(%)'},{code:'P',name:'Pending Material Value'},{name:'Others',code:'O'}]}
                        formControlName={formik.values.ld_applied_on}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.ld_applied_on && formik.touched.ld_applied_on && (
                      <VError title={formik.errors.ld_applied_on} />
                    )}
        </div>
        <div className="sm:col-span-2">
        {formik.values.ld_applied_on=='O' &&
        <TDInputTemplate
                        placeholder="Others"
                        type="text"
                        label="Others"
                        name="others_applied"
                        formControlName={formik.values.others_applied}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />}
                      {formik.errors.others_applied && formik.touched.others_applied && (
                      <VError title={formik.errors.others_applied} />
                    )}
        </div>
        <div className="sm:col-span-2">
        <TDInputTemplate
                        placeholder="LD value (%)"
                        type="number"
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
       
        <div className="sm:col-span-10">
        <TDInputTemplate
                        placeholder="Maximum % on PO value"
                        type="number"
                        label="Maximum % on PO value"
                        name="po_min_value"
                       
                        formControlName={formik.values.po_min_value}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.po_min_value && formik.touched.po_min_value && (
                      <VError title={formik.errors.po_min_value} />
                    )}
        </div>
       
       
        <div className="sm:col-span-10">
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
        <div className="sm:col-span-5">
        <TDInputTemplate
                        placeholder="Duration"
                        type="date"
                        label="Duration"
                        name="duration"
                        data={[{code:'D',name:'Day'},{code:'M',name:'Month'},{name:'Year',code:'Y'}]}
                        formControlName={formik.values.duration}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.duration && formik.touched.duration && (
                      <VError title={formik.errors.duration} />
                    )}
        </div>
        <div className="sm:col-span-5">
        <TDInputTemplate
                        placeholder="Duration Value"
                        type="text"
                        label="Duration Value"
                        name="duration_val"
                       
                        formControlName={formik.values.duration_val}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.duration_val && formik.touched.duration_val && (
                      <VError title={formik.errors.duration_val} />
                    )}
        </div>
       
        
        <div className="sm:col-span-5">
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

        <div className="sm:col-span-5">
          {formik.values.om_manual_flag=='A' &&
        <TDInputTemplate
                        placeholder="O&M Manual Description"
                        type="text"
                        label="O&M Manual Description"
                        name="om_manual_desc"
                        formControlName={formik.values.om_manual_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={3}
                      />}
                      {formik.errors.om_manual_desc && formik.touched.om_manual_desc && (
                      <VError title={formik.errors.om_manual_desc} />
                    )}
        </div>
        <div className="sm:col-span-5">
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
        <div className="sm:col-span-5">
        {formik.values.oi_flag=='A' &&
        <TDInputTemplate
                        placeholder="Operation/Installation Description"
                        type="text"
                        label="Operation/Installation Description"
                        name="oi_desc"
                        formControlName={formik.values.oi_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={3}
                      />}
                      {formik.errors.oi_desc && formik.touched.oi_desc && (
                      <VError title={formik.errors.oi_desc} />
                    )}
        </div>
        <div className="sm:col-span-10">
        <TDInputTemplate
                        placeholder="Packing type"
                        type="text"
                        label="Packing type"
                        name="packing_type"
                        formControlName={formik.values.packing_type}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={3}
                      />
                      {formik.errors.packing_type && formik.touched.packing_type && (
                      <VError title={formik.errors.packing_type} />
                    )}
        </div>
        <div className="sm:col-span-5">
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
        <div className="sm:col-span-5">
        {formik.values.manufacture_clearance=='A' &&
        <TDInputTemplate
                        placeholder="Manufacture Clearance Description"
                        type="text"
                        label="Manufacture Clearance Description"
                        name="manufacture_clearance_desc"
                        formControlName={formik.values.manufacture_clearance_desc}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={3}
                      />}
                      {formik.errors.manufacture_clearance_desc && formik.touched.manufacture_clearance_desc && (
                      <VError title={formik.errors.manufacture_clearance_desc} />
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