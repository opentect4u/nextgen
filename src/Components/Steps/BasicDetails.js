import React, { useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import VError from "../../Components/VError";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
function BasicDetails({pressNext,type,pressBack}) {
    const params = useParams();
    const initialValues = {
      order_date: "",
      project_name:"",
      vendor_name:""
    };
    const [formValues, setValues] = useState(initialValues);
    const validationSchemaGeneral = Yup.object({
      order_date: Yup.string().required("Order date is required"),
      vendor_name: Yup.string().required("Vendor name is required"),
    });
    const validationSchemaProject = Yup.object({
        order_date: Yup.string().required("Order date is required"),
        project_name: Yup.string().required("Project name is required"),
        vendor_name: Yup.string().required("Vendor name is required"),
      });
    const onSubmit = (values) => {
      console.log(values);
      pressNext(values)
    };
    const formik = useFormik({
      initialValues: +params.id > 0 ? formValues : initialValues,
      onSubmit,
      validationSchema:type=='P'?validationSchemaProject:validationSchemaGeneral,
      validateOnMount: true,
      enableReinitialize: true,
    });
  
  return (
    <section className="bg-white dark:bg-[#001529]">
            <div className="py-2 px-4 mx-auto w-full lg:py-2">
              <h2 className="text-2xl text-green-900 font-bold my-3">
                Basic Details
              </h2>

              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <div className="flex flex-col">
                      <TDInputTemplate
                        placeholder="Order date"
                        type="date"
                        label="Order Date"
                        name="order_date"
                        formControlName={formik.values.order_date}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={1}
                      />
                      {formik.errors.order_date && formik.touched.order_date && (
                      <VError title={formik.errors.order_date} />
                    )}
                    </div>
                  </div>

                  {type == "P" && (
                  <>
                    <div className="w-full flex flex-col">
                      <TDInputTemplate
                        placeholder="Project name"
                        type="text"
                        label="Project Name"
                        name="project_name"
                        data={[
                          { name: "General", code: "G" },
                          { name: "Project Specific", code: "P" },
                        ]}
                        formControlName={formik.values.project_name}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        mode={2}
                      />
                      {formik.errors.project_name && formik.touched.project_name && (
                      <VError title={formik.errors.project_name} />
                    )}
                    </div>
                  </>
                  )  
                }

                  <div className={type=='P'?`w-full flex flex-col`:`col-span-2`}>
                    <TDInputTemplate
                      placeholder="Vendor"
                      type="text"
                      label="Vendor"
                      name="vendor_name"
                      data={[
                        { name: "General", code: "G" },
                        { name: "Project Specific", code: "P" },
                      ]}
                      formControlName={formik.values.vendor_name}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      mode={2}
                    />
                    {formik.errors.vendor_name && formik.touched.vendor_name && (
                      <VError title={formik.errors.vendor_name} />
                    )}
                  </div>
                </div>
                <div className="flex pt-4 justify-between">
            <button

              className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
       
               onClick={pressBack}
            >
            Back</button>
           <button
            type="submit"
            className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
          >
            Next
          </button>
          </div>
              </form>
            </div>
          </section>
  )
}

export default BasicDetails
