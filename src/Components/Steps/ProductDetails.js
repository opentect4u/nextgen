import React, { useState } from 'react'
import TDInputTemplate from '../TDInputTemplate'
import { Formik, FieldArray,useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
function ProductDetails({pressBack,presNext}) {
  const params = useParams();

    const [formValues, setValues] = useState({
       
        dynamicFields: [
          {
            sl_no: 0,
            item_name: "",
            qty: "",
            disc: "",
            unit: "",
            unit_price: "",
            total: "",
            GST: "",
            delivery_date: "",
            // poc_address: "",
          },
        ],
      });
    
      const initialValues = {
      
        dynamicFields: [
          {
            sl_no: params.id > 0 ? 0 : formValues.dynamicFields[0].sl_no,
            item_name: "",
            qty: "",
            disc: "",
            unit: "",
            unit_price: "",
            total: "",
            GST: "",
            delivery_date: "",
            // poc_address: "",
          },
        ],
      };
    
      const onSubmit = (values) => {
        console.log("onSubmit");
        console.log(values);
      };
      const validationSchema = Yup.object({
       
        dynamicFields: Yup.array().of(
          Yup.object().shape({
            item_name: Yup.string().required('Name is required'),
            qty: Yup.string().required('Quantity is required'),
            disc: Yup.string().required('Discount is required'),
            unit: Yup.string().required('Unit is required'),
            unit_price: Yup.string().required('Unit price is required'),
            GST: Yup.string().required('GST is required'),
            delivery_date: Yup.string().required('Date is required'),
           
          })
        ),
      });
    
      // const formik = useFormik({
      //     initialValues: +params.id > 0 ? formValues : initialValues,
      //     onSubmit,
      //     validationSchema,
      //     validateOnMount: true,
      //     e
  return (
    <section className="bg-white dark:bg-[#001529]">
    <div className="py-2 px-4 mx-auto w-full lg:py-2">
    <h2 className="text-2xl text-green-900 font-bold my-3">
        Product Details
        </h2>

        <Formik
            initialValues={+params.id > 0 ? formValues : initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount={true}
            enableReinitialize={true}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <FieldArray name="dynamicFields">
             
                    {({ push, remove, insert }) => (
                      <>
                        
                        {values.dynamicFields.map((field, index) => (
                          <React.Fragment key={index}>
                            <div className="sm:col-span-2 flex gap-2 justify-end my-3">
                            {values.dynamicFields.length>1 &&<Button
                              className="rounded-full text-white bg-red-800 border-red-800"
                              onClick={() => remove(index)}
                              icon={<MinusOutlined />}
                            ></Button>}

                            <Button
                              className="rounded-full bg-green-900 text-white"
                              onClick={() =>
                                insert({
                                    sl_no: 0,
                                    item_name: "",
                                    qty: "",
                                    disc: "",
                                    unit: "",
                                    unit_price: "",
                                    total: "",
                                    GST: "",
                                    delivery_date: "",
                                  // poc_address: "",
                                })
                              }
                              icon={<PlusOutlined />}
                            ></Button>

                            </div>
                     
  <div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
          <div className="sm:col-span-6 flex flex-col">
          <TDInputTemplate
                        placeholder="Item name"
                        type="text"
                        label="Item name"
                        
                        data={[
                          { name: "For", code: "F" },
                          { name: "Ex-works", code: "E" },
                        ]}
                        formControlName={
                            values.dynamicFields[index]?.item_name || ""
                           }
                        name={`dynamicFields[${index}].item_name`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.price_basis_flag && formik.touched.price_basis_flag && (
                      <VError title={formik.errors.price_basis_flag} />
                    )} */}
          </div>

        
          <div className="sm:col-span-2 flex flex-col">
            
        <TDInputTemplate
                        placeholder="Quantity"
                        type="number"
                        label="Quantity"
                        formControlName={
                            values.dynamicFields[index]?.qty || ""
                           }
                        name={`dynamicFields[${index}].qty`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
          </div>
          
          <div className="sm:col-span-2 flex flex-col">
          <TDInputTemplate
                        placeholder="Discount"
                        type="number"
                        label="Discount"
                        formControlName={
                            values.dynamicFields[index]?.disc || ""
                           }
                        name={`dynamicFields[${index}].disc`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
          </div>
          <div className="sm:col-span-2 flex flex-col">
          <TDInputTemplate
                        placeholder="Unit"
                        type="text"
                        label="Unit"
                       
                        data={[
                          { name: "For", code: "F" },
                          { name: "Ex-works", code: "E" },
                        ]}
                        formControlName={
                            values.dynamicFields[index]?.unit || ""
                           }
                        name={`dynamicFields[${index}].unit`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={2}
                      />
                      {/* {formik.errors.price_basis_flag && formik.touched.price_basis_flag && (
                      <VError title={formik.errors.price_basis_flag} />
                    )} */}
          </div>
          <div className="sm:col-span-2">
          <TDInputTemplate
                        placeholder="Unit price"
                        type="number"
                        label="Unit price"
                        formControlName={
                            values.dynamicFields[index]?.unit_price || ""
                           }
                        name={`dynamicFields[${index}].unit_price`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
          </div>
          <div className="sm:col-span-2">
          <TDInputTemplate
                        placeholder="Total"
                        type="number"
                        label="Total"
                        formControlName={
                            values.dynamicFields[index]?.total || ""
                           }
                        name={`dynamicFields[${index}].total`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
          </div>
          
          <div className="sm:col-span-2 flex flex-col">
          <TDInputTemplate
                        placeholder="GST"
                        type="number"
                        label="GST"
                        
                        formControlName={
                            values.dynamicFields[index]?.gst || ""
                           }
                        name={`dynamicFields[${index}].gst`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
          </div>
          <div className="sm:col-span-6 flex flex-col">
          <TDInputTemplate
                        placeholder="Delivery Date"
                        type="date"
                        label="Delivery Date"
                        formControlName={
                            values.dynamicFields[index]?.delivery_date || ""
                           }
                        name={`dynamicFields[${index}].delivery_date`}
                        
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        
                        // formControlName={formik.values.price_basis_desc}
                        // handleChange={formik.handleChange}
                        // handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
          </div>
        </div>

                          </React.Fragment>))}
                          </>
                    )}
                    </FieldArray>
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
            )}
            </Formik>
      
    </div>
  </section>
  )
}

export default ProductDetails
