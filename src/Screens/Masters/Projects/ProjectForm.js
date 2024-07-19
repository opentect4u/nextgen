import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BtnComp from '../../../Components/BtnComp';
import HeadingTemplate from '../../../Components/HeadingTemplate';
import { Switch } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";




function ProjectForm() {
    const params = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false);

    // const [formValues, setValues] = useState({
    //     v_name: "",
    //     v_email: "",
    //     v_gst: "",
    //     v_pan: "",
    //     v_reg: "",
    //     v_remarks: "",
    //     v_address: "",
    //     dynamicFields: [{
    //       sl_no: 0,
    //       poc_name: "", poc_ph_1: "",poc_ph_2:""
    //     }]
    //   });

    const initialValues = {
        client_id: "",
        projnm: "",
        order_id: "",
        order_dt: "",
        proj_loc: "",
        proj_add: "",
        proj_des: "",
        Proj_ordr_val: "",
        end_user: "",
        proj_consultant: "",
        epc_con: "",
        manufac: "",
        prc_basis: "",
        proj_extra: "",
        created_dt: "",
        ld_cls: "",
        proj_warrant: "",
        erctn_res: "",
        proj_sts: "",
        dynamicFields: [{
            //   sl_no: params.id > 0 ? 0 : formValues.dynamicFields[0].sl_no,
            sl_no: 0,
            sts_remarks: ""
        }]
    };

    const validationSchema = Yup.object({
        v_name: Yup.string().required("Name is required"),
        v_email: Yup.string()
            .required("Email is required")
            .email("Incorrect email format"),
        v_phone: Yup.string().required("Phone is required").length(10),
        v_address: Yup.string().required("Address is required"),
        // v_pan:Yup.string().matches("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
        v_pan: Yup.string(),
        // v_gst:Yup.string().matches("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$")
        v_gst: Yup.string(),
        v_remarks: Yup.string(),
        dynamicFields: Yup.array().of(
            Yup.object().shape({
                poc_name: Yup.string().required("Contact person is required"),
                poc_ph_1: Yup.string().required("Phone is required").length(10),
                poc_ph_2: Yup.string().required("Phone is required").length(10),

            })
        )
    });

    const onSubmit = (values) => {
        console.log("onsubmit called")
        console.log(values);
    };

    console.log(params, 'params')
    return (
        <section className="bg-transparent dark:bg-[#001529]">
            {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
            <HeadingTemplate
                text={params.id > 0 ? "Update project" : "Add project"}
                mode={params.id > 0 ? 1 : 0}
                title={'Project'}
                data={params.id && data ? data : ''}
            />
            <div className="w-full bg-white p-6 rounded-2xl">
                <Spin
                    indicator={<LoadingOutlined spin />}
                    size="large"
                    className="text-green-900 dark:text-gray-400"
                    spinning={loading}
                >
                    {/* <form onSubmit={formik.handleSubmit}> */}
                    <form>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                            <div>
                                <TDInputTemplate
                                    placeholder="Select client..."
                                    type="text"
                                    label="Client"
                                    name="client_id"
                                    //   formControlName={formik.values.client_id}
                                    //   handleChange={formik.handleChange}
                                    //   handleBlur={formik.handleBlur}
                                    //   data={cat}
                                    mode={2}
                                    disabled={params.id > 0}
                                />
                                {/* {formik.errors.cat_id && formik.touched.cat_id ? (
                  <VError title={formik.errors.cat_id} />
                ) : null} */}
                            </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="Type product name..."
                                    type="text"
                                    label="Project Name"
                                    name="projnm"
                                    // formControlName={formik.values.projnm}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.projnm && formik.touched.projnm ? (
                                    <VError title={formik.errors.projnm} />
                                ) : null} */}
                            </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="Select order id..."
                                    type="text"
                                    label="Order ID"
                                    name="order_id"
                                    //   formControlName={formik.values.order_id}
                                    //   handleChange={formik.handleChange}
                                    //   handleBlur={formik.handleBlur}
                                    //   data={cat}
                                    mode={2}
                                    disabled={params.id > 0}
                                />
                                {/* {formik.errors.order_id && formik.touched.order_id ? (
                  <VError title={formik.errors.order_id} />
                ) : null} */}
                            </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="Type order date..."
                                    type="date"
                                    label="Order Date"
                                    name="order_dt"
                                    // formControlName={formik.values.order_dt}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.order_dt && formik.touched.order_dt ? (
                                    <VError title={formik.errors.order_dt} />
                                ) : null} */}
                            </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="Type Location"
                                    type="text"
                                    label="Location"
                                    name="proj_loc"
                                    //   formControlName={values.proj_loc}
                                    //   handleChange={handleChange}
                                    //   handleBlur={handleBlur}
                                    mode={3}
                                />
                                {/* {errors.proj_loc && touched.proj_loc ? <VError title={errors.proj_loc} /> : null} */}
                            </div>
                            <div >
                                <TDInputTemplate
                                    placeholder="Type delivery Address"
                                    type="text"
                                    label="Delivery Address"
                                    name="proj_add"
                                    //   formControlName={values.proj_add}
                                    //   handleChange={handleChange}
                                    //   handleBlur={handleBlur}
                                    mode={3}
                                />
                                {/* {errors.proj_add && touched.proj_add ? <VError title={errors.proj_add} /> : null} */}

                            </div>
                            <div className="sm:col-span-2">
                                <TDInputTemplate
                                    placeholder="Type description..."
                                    type="text"
                                    label="Project Description"
                                    name="proj_des"
                                    // formControlName={values.proj_des}
                                    // handleChange={handleChange}
                                    // handleBlur={handleBlur}
                                    mode={3}
                                />
                                {/* {errors.proj_des && touched.proj_des ? <VError title={errors.proj_des} /> : null} */}
                            </div>
                           
                            <div>
                                <TDInputTemplate
                                    placeholder="Type end user..."
                                    type="text"
                                    label="End User"
                                    name="end_user"
                                    // formControlName={formik.values.end_user}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.end_user && formik.touched.end_user ? (
                                    <VError title={formik.errors.end_user} />
                                ) : null} */}
                            </div>
                            <div>
                            <TDInputTemplate
                                    placeholder="Type consultant..."
                                    type="text"
                                    label="Consultant"
                                    name="proj_consultant"
                                    // formControlName={formik.values.proj_consultant}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                    
                                />
                            </div>
                           
                            <div>
                                <TDInputTemplate
                                    placeholder="Type EPC..."
                                    type="text"
                                    label="EPC Contractor"
                                    name="epc_con"
                                    // formControlName={formik.values.epc_con}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.epc_con && formik.touched.epc_con ? (
                                    <VError title={formik.errors.epc_con} />
                                ) : null} */}
                            </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="Type manufacturer..."
                                    type="text"
                                    label="Manufacturer"
                                    name="manufac"
                                    // formControlName={formik.values.manufac}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.manufac && formik.touched.manufac ? (
                                    <VError title={formik.errors.manufac} />
                                ) : null} */}
                            </div>
                            <div>
                              
                              <TDInputTemplate
                                 placeholder="Type project order value..."
                                 type="text"
                                 label="Project Order Value"
                                 name="Proj_ordr_val"
                                 // formControlName={formik.values.Proj_ordr_val}
                                 // handleChange={formik.handleChange}
                                 // handleBlur={formik.handleBlur}
                                 mode={1}
                             />
                             {/* {formik.errors.Proj_ordr_val && formik.touched.Proj_ordr_val ? (
                                 <VError title={formik.errors.Proj_ordr_val} />
                             ) : null} */}
                             {/* {formik.errors.proj_consultant && formik.touched.proj_consultant ? (
                                 <VError title={formik.errors.proj_consultant} />
                             ) : null} */}
                         </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="Type price basis"
                                    type="text"
                                    label="Price Basis"
                                    name="prc_basis"
                                    // formControlName={formik.values.prc_basis}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.prc_basis && formik.touched.prc_basis ? (
                                    <VError title={formik.errors.prc_basis} />
                                ) : null} */}
                            </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="..."
                                    type="text"
                                    label="Extra"
                                    name="proj_extra"
                                    // formControlName={formik.values.proj_extra}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.proj_extra && formik.touched.proj_extra ? (
                                    <VError title={formik.errors.proj_extra} />
                                ) : null} */}
                            </div>

                            <div>
                                <TDInputTemplate
                                    placeholder="Type LD clause"
                                    type="text"
                                    label="LD Clause"
                                    name="ld_cls"
                                    // formControlName={formik.values.ld_cls}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.ld_cls && formik.touched.ld_cls ? (
                                    <VError title={formik.errors.ld_cls} />
                                ) : null} */}
                            </div>

                            <div>
                            <TDInputTemplate
                                    placeholder=""
                                    type="file"
                                    label="Handover certificate"
                                    name="ld_cls"
                                    // formControlName={formik.values.ld_cls}
                                    // handleChange={formik.handleChange}
                                    // handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                            </div>
                           
                            <div className="sm:col-span-2">
                                <TDInputTemplate
                                    placeholder="Type erection responsibility"
                                    type="text"
                                    label="Erection Responsibility"
                                    name="erctn_res"
                                    //   formControlName={values.erctn_res}
                                    //   handleChange={handleChange}
                                    //   handleBlur={handleBlur}
                                    mode={3}
                                />
                                {/* {errors.erctn_res && touched.erctn_res ? <VError title={errors.erctn_res} /> : null} */}
                            </div>
                            <div className='sm:col-span-2'>
                                <TDInputTemplate
                                    placeholder="Select project status..."
                                    type="text"
                                    label="Project Status"
                                    name="proj_sts"
                                    //   formControlName={formik.values.proj_sts}
                                    //   handleChange={formik.handleChange}
                                    //   handleBlur={formik.handleBlur}
                                    //   data={cat}
                                    mode={2}
                                    disabled={params.id > 0}
                                />
                                {/* {formik.errors.proj_sts && formik.touched.proj_sts ? (<VError title={formik.errors.proj_sts} />) : null} */}
                            </div>
                            <div className="sm:col-span-2">
               <TDInputTemplate
                                    placeholder="Type status remarks"
                                    type="text"
                                    label="Status remarks"
                                    name="erctn_res"
                                    //   formControlName={values.erctn_res}
                                    //   handleChange={handleChange}
                                    //   handleBlur={handleBlur}
                                    mode={3}
                                />
                                {/* {errors.erctn_res && touched.erctn_res ? <VError title={errors.erctn_res} /> : null} */}
                            </div>
                            <div className='flex gap-4 items-center sm:mt-6'>
                                <label className="block mb-2 text-sm font-bold text-green-900 dark:text-gray-100">Warranty</label>
                    <Switch size="large" defaultChecked />

                               
                                {/* {formik.errors.proj_warrant && formik.touched.proj_warrant ?(<VError title={formik.errors.proj_warrant} />) : null} */}
                            </div>


                        </div>

                        <BtnComp
                            mode={params.id > 0 ? "E" : "A"}
                        //   onReset={formik.handleReset}
                        />
                    </form>
                </Spin>
            </div>
        </section>

        //    <section className="bg-white dark:bg-[#001529]">
        //             <div className="py-8 mx-auto w-5/6 lg:py-16">
        //             <HeadingTemplate text={params.id>0?'Update project':'Add project'} />

        //                 <form action="#">
        //                     <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        //                         <div className="sm:col-span-2">
        //                             <label for="projnm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
        //                             <input type="text" name="projnm" id="projnm" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type project name" required="" />
        //                         </div>

        //                         <div className="sm:col-span-2">
        //                             <label for="clnt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
        //                             <input type="text" name="clnt" id="clnt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Client Name" required="" />
        //                         </div>

        //                         <div className="sm:col-span-2">
        //                             <label for="proj_add" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Address</label>
        //                             <textarea id="proj_add" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Full Address Here"></textarea>
        //                         </div>

        //                     </div>
        //                    <BtnComp/>
        //                 </form>
        //             </div>
        //         </section>
    )
}

export default ProjectForm
