import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BtnComp from '../../../Components/BtnComp';
import HeadingTemplate from '../../../Components/HeadingTemplate';
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { useFormik, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import VError from "../../../Components/VError";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { url } from "../../../Address/BaseUrl";
import { Message } from "../../../Components/Message";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";



function ClientForm() {
    const [loading, setLoading] = useState(false);

    const params = useParams()
    console.log(params, 'params')
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 4,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 20,
            },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 20,
                offset: 4,
            },
        },
    };
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };
    const initialValues = {
        clnt_name: "",
        clnt_email: "",
        clnt_phn: "",
        clnt_loc: "",
        delvry_add: "",
        gst: "",
        pan: "",
        reg_no: "",
        // cont_person: "",
        dynamicFields: [{ poc_name: '', poc_designation: "", poc_department: "", poc_email: "", poc_direct_no: "", poc_ext_no: "", poc_ph_1: "", poc_ph_2: "" }]
    };
    const onSubmit = (values) => {
        setLoading(true)
        console.log(values);
        axios
            .post(url + "/api/addclient", {
                c_id: +params.id,
                user: localStorage.getItem("email"),
                c_name: values.clnt_name,
                c_phone: values.clnt_phn.toString(),
                c_email: values.clnt_email,
                c_location: values.clnt_loc,
                c_address: values.delvry_add,
                c_gst: values.gst,
                c_pan: values.pan,
                c_reg: values.reg_no,
                c_poc: values.dynamicFields
            })
            .then((res) => {
                setLoading(false);
                console.log(res, 'client add')
                if (res.data.suc > 0) {
                    Message("success", res.data.msg);
                    if (params.id == 0) formik.handleReset();
                } else {
                    Message("error", res.data.msg);
                }
            });
    };
    const validationSchema = Yup.object({
        clnt_name: Yup.string().required("Client's name is required"),
        clnt_email: Yup.string().required("Client's email is required"),
        clnt_phn: Yup.string().required("Client's phone no. is required"),
        clnt_loc: Yup.string().required("Client location is required"),
        delvry_add: Yup.string().required("Delivery address is required"),
        gst: Yup.string().required("GST is required"),
        pan: Yup.string().required("PAN is required"),
        reg_no: Yup.string().required("Registration no. is required"),
        dynamicFields: Yup.array().of(
            Yup.object().shape({
                poc_name: Yup.string().optional(),
                poc_designation: Yup.string().optional(),
                poc_department: Yup.string().optional(),
                poc_email: Yup.string().optional(),
                poc_direct_no: Yup.string().optional(),
                poc_ext_no: Yup.string().optional(),
                poc_ph_1: Yup.string().optional(),
                poc_ph_2: Yup.string().optional(),
            })
        )
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    });
    return (

        <section className="bg-white dark:bg-[#001529]">
            <div className="py-8 mx-auto w-5/6 lg:py-16">
                <HeadingTemplate text={params.id > 0 ? 'Update client' : 'Add client'} />
                <Spin
                            indicator={<LoadingOutlined spin />}
                            size="large"
                            className="text-green-900 dark:text-gray-400"
                            spinning={loading}
                        >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        validateOnMount
                    >
                        {formik => (
                          
                            <form onSubmit={formik.handleSubmit}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <TDInputTemplate
                                            placeholder="Type user name..."
                                            type="text"
                                            label="Client name"
                                            name="clnt_name"
                                            formControlName={formik.values.clnt_name}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={1}
                                        />
                                        {formik.errors.clnt_name && formik.touched.clnt_name ? (
                                            <VError title={formik.errors.clnt_name} />
                                        ) : null}
                                    </div>
                                    <div className="w-full">
                                        <TDInputTemplate
                                            placeholder="Type client's email..."
                                            type="text"
                                            label="Email"
                                            name="clnt_email"
                                            formControlName={formik.values.clnt_email}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={1}
                                        />
                                        {formik.errors.clnt_email && formik.touched.clnt_email ? (
                                            <VError title={formik.errors.clnt_email} />
                                        ) : null}
                                    </div>
                                    <div>
                                        <TDInputTemplate
                                            placeholder="+91 123-456-7890"
                                            type="number"
                                            label="Phone No."
                                            name="clnt_phn"
                                            formControlName={formik.values.clnt_phn}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={1}
                                        />
                                        {formik.errors.clnt_phn && formik.touched.clnt_phn ? (
                                            <VError title={formik.errors.clnt_phn} />
                                        ) : null}
                                    </div>

                                    {/* <div className="sm:col-span-2">
                                <TDInputTemplate
                                    placeholder="Type contact person's name..."
                                    type="text"
                                    label="Contact Person"
                                    name="cont_person"
                                    formControlName={formik.values.cont_person}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {formik.errors.cont_person && formik.touched.cont_person ? (
                                    <VError title={formik.errors.cont_person} />
                                ) : null}
                            </div> */}
                                    <div>
                                        <TDInputTemplate
                                            placeholder="Type Client Location..."
                                            type="text"
                                            label="Client Location"
                                            name="clnt_loc"
                                            formControlName={formik.values.clnt_loc}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={3}
                                        />
                                        {formik.errors.clnt_loc && formik.touched.clnt_loc ? (
                                            <VError title={formik.errors.clnt_loc} />
                                        ) : null}
                                    </div>
                                    <div>
                                        <TDInputTemplate
                                            placeholder="Type Delivery Address..."
                                            type="text"
                                            label="Delivery Address"
                                            name="delvry_add"
                                            formControlName={formik.values.delvry_add}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={3}
                                        />
                                        {formik.errors.delvry_add && formik.touched.delvry_add ? (
                                            <VError title={formik.errors.delvry_add} />
                                        ) : null}
                                    </div>
                                    <div>
                                        <TDInputTemplate
                                            placeholder="Type GST"
                                            type="text"
                                            label="GST"
                                            name="gst"
                                            formControlName={formik.values.gst}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={1}
                                        />
                                        {formik.errors.gst && formik.touched.gst ? (
                                            <VError title={formik.errors.gst} />
                                        ) : null}
                                    </div>
                                    <div>
                                        <TDInputTemplate
                                            placeholder="Type PAN"
                                            type="text"
                                            label="PAN"
                                            name="pan"
                                            formControlName={formik.values.pan}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={1}
                                        />
                                        {formik.errors.pan && formik.touched.pan ? (
                                            <VError title={formik.errors.pan} />
                                        ) : null}
                                    </div>
                                    <div className="w-full">
                                        <TDInputTemplate
                                            placeholder="Type Reg No."
                                            type="text"
                                            label="Reg No."
                                            name="reg_no"
                                            formControlName={formik.values.reg_no}
                                            handleChange={formik.handleChange}
                                            handleBlur={formik.handleBlur}
                                            mode={1}
                                        />
                                        {formik.errors.reg_no && formik.touched.reg_no ? (
                                            <VError title={formik.errors.reg_no} />
                                        ) : null}
                                    </div>
                                    <FieldArray name="dynamicFields">
                                        {({ push, remove }) => (
                                            <>
                                                {formik.values.dynamicFields.map((field, index) => (
                                                    <React.Fragment key={index}>
                                                        <div className="w-full sm:col-span-2">
                                                            <TDInputTemplate
                                                                placeholder="Type the name of Contact Person..."
                                                                type="text"
                                                                label="Contact Person"
                                                                name={`dynamicFields[${index}].poc_name`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_name || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                        </div>
                                                        <div className="w-full sm:col-span-2">
                                                            <TDInputTemplate
                                                                placeholder="Type POC Designation..."
                                                                type="text"
                                                                label="POC Designation"
                                                                name={`dynamicFields[${index}].poc_designation`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_designation || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                            {/* {formik.errors.dynamicFields && formik.errors.dynamicFields[index] && formik.errors.dynamicFields[index].designation && formik.touched.dynamicFields && formik.touched.dynamicFields[index] && formik.touched.dynamicFields[index].designation ? (
                                                        <VError title={formik.errors.dynamicFields[index].designation} />
                                                    ) : null} */}

                                                        </div>
                                                        <div className="w-full sm:col-span-2" >
                                                            <TDInputTemplate
                                                                placeholder="Type POC department..."
                                                                type="text"
                                                                label="POC Department"
                                                                name={`dynamicFields[${index}].poc_department`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_department || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                            {/* {formik.errors.dynamicFields && formik.errors.dynamicFields[index] && formik.errors.dynamicFields[index].designation && formik.touched.dynamicFields && formik.touched.dynamicFields[index] && formik.touched.dynamicFields[index].designation ? (
                                                        <VError title={formik.errors.dynamicFields[index].designation} />
                                                    ) : null} */}
                                                        </div>
                                                        <div className="w-full sm:col-span-2" >
                                                            <TDInputTemplate
                                                                placeholder="Type POC Email..."
                                                                type="text"
                                                                label="POC Email"
                                                                name={`dynamicFields[${index}].poc_email`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_email || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                        </div>
                                                        <div className="w-full sm:col-span-2" >
                                                            <TDInputTemplate
                                                                placeholder="Type POC Direct No."
                                                                type="text"
                                                                label="POC Direct No"
                                                                name={`dynamicFields[${index}].poc_direct_no`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_direct_no || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                        </div>
                                                        <div className="w-full sm:col-span-2" >
                                                            <TDInputTemplate
                                                                placeholder="Type POC Extension No."
                                                                type="text"
                                                                label="POC Extension No"
                                                                name={`dynamicFields[${index}].poc_ext_no`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_ext_no || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                        </div>
                                                        <div className="w-full sm:col-span-2" >
                                                            <TDInputTemplate
                                                                placeholder="Type POC Primary Phone No."
                                                                type="text"
                                                                label="POC Primary Phone No."
                                                                name={`dynamicFields[${index}].poc_ph_1`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_ph_1 || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                        </div>
                                                        <div className="w-full sm:col-span-2" >
                                                            <TDInputTemplate
                                                                placeholder="Type POC Secondary Phone No."
                                                                type="text"
                                                                label="POC Secondary Phone No."
                                                                name={`dynamicFields[${index}].poc_ph_2`}
                                                                formControlName={formik.values.dynamicFields[index]?.poc_ph_2 || ""}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                            />
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <MinusCircleOutlined onClick={() => remove(index)} />
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                                <div className="sm:col-span-2">
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => push({ poc_name: "", poc_designation: "", poc_department: "", poc_email: "", poc_direct_no: "", poc_ext_no: "", poc_ph_1: "", poc_ph_2: "" })}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add field
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>
                                <BtnComp />
                            </form>
                        )}
                    </Formik>
                    </Spin>

                
            </div>
        </section>
    )
}

export default ClientForm
