import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router';
import BtnComp from '../../../Components/BtnComp';
import HeadingTemplate from '../../../Components/HeadingTemplate';
import { Switch } from "antd";
import { Message } from "../../../Components/Message";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { Formik, FieldArray } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { url } from "../../../Address/BaseUrl";
import AuditTrail from "../../../Components/AuditTrail";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';


function ProjectForm() {
    const navigate = useNavigate();
    const [client, setClient] = useState([]);
    const params = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false);
    const [pmList, setPMList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [yesNo, setYesNoList] = useState([])
    const [priceBais, setPriceBasisList] = useState([])
    const [ldClsVal, setLdClsVal] = useState(false)
    const [gstPan, setGstPan] = useState(false)
    const [pocs, setPocs] = useState([]);

    const stepperRef = useRef(null);

    let projectStatusOptions = [
        { code: 'O', name: 'Open' },
        { code: 'C', name: 'Close' }
    ];
    let yesNoList = [
        { code: 'Y', name: 'Yes' },
        { code: 'N', name: 'No' }
    ];
    let priceBasisList = [
        { code: 'F', name: 'For' },
        { code: 'E', name: 'Ex-Work' }
    ];

    var clientList = [];

    const handleChangeLdCls = (event, handleChange) => {
        formik.handleChange(event);
        const value = event.target.value;
        if (value === 'Y') {
            setLdClsVal(true);
        } else {
            setLdClsVal(false);
        }
    };
    const handleChangeClient = (event, handleChange) => {
        formik.handleChange(event);
        const value = event.target.value;
        console.log(value, 'handleChangeClient')
        if (value) {
            setGstPan(true);
        } else {
            setGstPan(false);
        }
        axios
            .post(url + "/api/getclient", { id: value })
            .then((res) => {
                console.log(res.data.msg.client_gst, "getclient project");
                formik.setFieldValue('p_gst', res.data.msg.client_gst);
                formik.setFieldValue('p_pan', res.data.msg.client_pan);
                formik.setFieldValue('proj_loc', res.data.msg.client_location)
            })
        axios
            .post(url + "/api/getclientpoc", { id: value })
            .then((res) => {
                if (res.data.msg.length > 0) {
                    setPocs(res.data.msg);
                } else {
                    setPocs([]);
                }
                formik.setFieldValue('poc_name', res.data.msg.poc_name);
                formik.setFieldValue('poc_email', res.data.msg.poc_email);
                formik.setFieldValue('poc_ph_1', res.data.msg.poc_ph_1)
                formik.setFieldValue('poc_ph_2', res.data.msg.poc_ph_2)
            })
    };
    const initialValues = {
        proj_id: "",
        assgn_pm: "",
        projnm: "",
        client_id: "",
        order_id: "",
        order_dt: "",
        projend_delvry_dt: "",
        proj_loc: "",
        delvry_add: "",
        proj_des: "",
        end_user: "",
        proj_consultant: "",
        epc_con: "",
        manufac: "",
        proj_extra: "",
        Proj_ordr_val: "",
        prc_basis: "",
        ld_cls: "",
        ld_cls_dtl: "",
        erctn_res: "",
        proj_sts: "",
        sts_remarks: "",
        handovr_cer: "",
        warranty_check: " ",
        p_gst: "",
        p_pan: "",
        poc_name: "",
        poc_email: "",
        poc_ph_1: "",
        poc_ph_2: ""
    };
    const [formValues, setValues] = useState(initialValues);

    const validationSchema = Yup.object({
        proj_id: Yup.string().required("Project ID is required"),
        assgn_pm: Yup.string().required("Assign project manager is required"),
        projnm: Yup.string().required("Project name is required"),
        client_id: Yup.string().required("Client ID is required"),
        order_id: Yup.string().required("Order ID is required"),
        order_dt: Yup.date().required("Order date is required"),
        projend_delvry_dt: Yup.date().required("Project end delivery date is required"),
        proj_loc: Yup.string().required("Location is required"),
        delvry_add: Yup.string().required("Delivery Address is required"),
        proj_des: Yup.string().required("Project Description is required"),
        end_user: Yup.string().required("End user is required"),
        proj_consultant: Yup.string().required("Consultant is required"),
        epc_con: Yup.string().required("EPC Contractor is required"),
        manufac: Yup.string().required("Manufacturer is required"),
        proj_extra: Yup.string().required("Extra is required"),
        Proj_ordr_val: Yup.string().required("Project order value is required"),
        prc_basis: Yup.string().required("Price basis is required"),
        ld_cls: Yup.string().required("LD clause is required"),
        ld_cls_dtl: Yup.string().when('ld_cls', {
            is: 'Y',
            then: () => Yup.string().required('LD clause details is required'),
            otherwise: () => Yup.string()
        }),
        erctn_res: Yup.string().required("Erection responsibility is required"),
        proj_sts: Yup.string().required("Project Status is required"),
        sts_remarks: Yup.string().required("Status remarks is required"),
        // sts_remarks: Yup.string().when('proj_sts', {
        //     is: (value) => value && value.length > 0,
        //     then: Yup.string().required('Status remarks is required'),
        //     otherwise: Yup.string()
        //   }),
        handovr_cer: Yup.string().optional(),
        p_gst: Yup.string().optional(),
        p_pan: Yup.string().optional(),
        poc_name: Yup.string().optional(),
        poc_email: Yup.string().optional(),
        poc_ph_1: Yup.string().optional(),
        poc_ph_2: Yup.string().optional(),
        warranty_check: Yup.string().required("Warranty Type is required")

    });
    useEffect(() => {
        // setLoading(true);
        axios.post(url + "/api/getclient", { id: 0 }).then((res) => {
            //   setLoading(false);
            console.log(res, 'res client')
            for (let i = 0; i < res?.data?.msg?.length; i++) {
                clientList.push(
                    {
                        name: res?.data?.msg[i].client_name,
                        code: res?.data?.msg[i].sl_no
                    }
                );
            }
            console.log(clientList, 'clientList')
            setClient(clientList);
        });
        axios.post(url + "/api/getuser", { id: 0 }).then((res) => {
            //   setLoading(false);
            console.log(res.data.msg, 'res user')
            const pmlist = res.data.msg
                .filter(user => user.user_type === "PM")
                .map(user => ({ name: user.user_name, code: user.sl_no }));
            console.log(pmlist, 'PMList')
            setPMList(pmlist)
        });
        setStatusList(projectStatusOptions)
        setPriceBasisList(priceBasisList)
        setYesNoList(yesNoList)


        if (+params.id > 0) {
            setLoading(true);

            axios.post(url + "/api/getproject", { id: params.id }).then((res) => {
                console.log(res.data.msg, 'getproject');
                setData(res.data?.msg)
                setLoading(false);
                setValues({
                    proj_id: res?.data?.msg.proj_id,
                    assgn_pm: res?.data?.msg.proj_manager,
                    projnm: res?.data?.msg.proj_name,
                    client_id: res?.data?.msg.client_id,
                    order_id: res?.data?.msg.order_id,
                    order_dt: res?.data?.msg.order_date,
                    // projend_delvry_dt:
                    proj_loc: res?.data?.msg.proj_location,
                    delvry_add: res?.data?.msg.proj_addr,
                    proj_des: res?.data?.msg.proj_desc,
                    end_user: res?.data?.msg.proj_end_user,
                    proj_consultant: res?.data?.msg.proj_consultant,
                    epc_con: res?.data?.msg.epc_contractor,
                    manufac: res?.data?.msg.proj_manufacturer,
                    proj_extra: res?.data?.msg.extra,
                    Proj_ordr_val: res?.data?.msg.proj_order_val,
                    prc_basis: res?.data?.msg.price_basis,
                    ld_cls: res?.data?.msg.ld_clause,
                    ld_cls_dtl: res?.data?.msg.ld_clause,
                    erctn_res: res?.data?.msg.erection_responsibility,
                    proj_sts: res?.data?.msg.project_status,
                    sts_remarks: res?.data?.msg.proj_remarks,
                    // handovr_cer: res?.data?.msg.,
                    warranty_check: res?.data?.msg.warranty,
                });
            });
        }

    }, []);

    const onSubmit = (values) => {
        console.log("onsubmit called")
        console.log(values);
        axios
            .post(url + "/api/addproject", {
                id: +params.id,
                user: localStorage.getItem("email"),
                proj_id: values.proj_id,
                proj_name: values.projnm,
                client_id: values.client_id,
                order_id: values.order_id,
                order_date: values.order_dt,
                projend_delvry_dt: values.projend_delvry_dt,
                proj_location: values.proj_loc,
                proj_addr: values.delvry_add,
                proj_desc: values.proj_des,
                proj_order_val: values.Proj_ordr_val,
                proj_end_user: values.end_user,
                proj_consultant: values.proj_consultant,
                epc_contractor: values.epc_con,
                proj_manufacturer: values.manufac,
                price_basis: values.prc_basis,
                extra: values.proj_extra,
                ld_clause: values.ld_cls,
                ld_clause_dtl: values.ld_cls_dtl,
                erection_responsibility: values.erctn_res,
                warranty: values.warranty_check,
                project_status: values.proj_sts,
                proj_manager: +values.assgn_pm,
                proj_remarks: values.sts_remarks,



                // c_location: values.poc_location,
                // c_address: values.poc_address,

            })
            .then((res) => {
                //   setLoading(false);
                setData(res.data?.msg);
                if (res.data.suc > 0) {
                    Message("success", res.data.msg);
                    // if (params.id == 0) formik.handleReset();
                } else {
                    Message("error", res.data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
                navigate("/error" + "/" + err.code + "/" + err.message);
            });
    };

    console.log(params, 'params')

    const formik = useFormik({
        initialValues: +params.id > 0 ? formValues : initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true
    });
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
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card flex justify-content-center">

                            <Stepper ref={stepperRef} style={{ flexBasis: '80rem' }}>

                                <StepperPanel header="Project Details">
                                    {/* <div className="flex flex-column h-12rem"> */}
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type product ID..."
                                                type="text"
                                                label="Project ID"
                                                name="proj_id"
                                                formControlName={formik.values.proj_id}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                                disabled={params.id > 0}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Select Project Manager..."
                                                type="text"
                                                label="Assign Project Manager"
                                                name="assgn_pm"
                                                formControlName={formik.values.assgn_pm}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                data={pmList}
                                                mode={2}
                                                disabled={params.id > 0}
                                            />
                                        </div>
                                        <div className='sm:col-span-2'>
                                            <TDInputTemplate
                                                placeholder="Type product name..."
                                                type="text"
                                                label="Project Name"
                                                name="projnm"
                                                formControlName={formik.values.projnm}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                            />
                                        </div>

                                        <div>
                                            <TDInputTemplate
                                                placeholder="Select order no."
                                                type="text"
                                                label="Order No."
                                                name="order_id"
                                                formControlName={formik.values.order_id}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                //   data={cat}
                                                mode={1}
                                                disabled={params.id > 0}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type order date..."
                                                type="date"
                                                label="Order Date"
                                                name="order_dt"
                                                formControlName={formik.values.order_dt}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type project order value..."
                                                type="text"
                                                label="Project Order Value"
                                                name="Proj_ordr_val"
                                                formControlName={formik.values.Proj_ordr_val}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type price basis"
                                                type="text"
                                                label="Price Basis"
                                                name="prc_basis"
                                                formControlName={formik.values.prc_basis}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                data={priceBais}
                                                mode={2}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type order date..."
                                                type="date"
                                                label="Project end delivery Date"
                                                name="proj_end_delvry_dt"
                                                formControlName={formik.values.projend_delvry_dt}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type LD clause"
                                                type="text"
                                                label="LD Clause"
                                                name="ld_cls"
                                                formControlName={formik.values.ld_cls}
                                                handleChange={handleChangeLdCls}
                                                handleBlur={formik.handleBlur}
                                                data={yesNo}
                                                mode={2}
                                            />
                                        </div>
                                        {ldClsVal && <div>
                                            <TDInputTemplate
                                                placeholder="Type LD clause deatils"
                                                type="text"
                                                label="LD Clause Details"
                                                name="ld_cls_dtl"
                                                formControlName={formik.values.ld_cls_dtl}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div>}
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type Warranty"
                                                type="text"
                                                label="Warranty Type"
                                                name="warranty_check"
                                                formControlName={formik.values.warranty_check}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                data={yesNo}
                                                mode={3}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type erection responsibility"
                                                type="text"
                                                label="Erection Responsibility"
                                                name="erctn_res"
                                                formControlName={formik.values.erctn_res}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                data={yesNo}
                                                mode={2}
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <TDInputTemplate

                                                type="file"
                                                label="PO & Other Docs"
                                                name="handovr_cer"
                                                formControlName={formik.values.po_docs}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                            />
                                        </div>

                                    </div>
                                    {/* </div> */}
                                    <div className="flex pt-4 justify-content-end">
                                        <Button className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" iconPos="right" onClick={() => stepperRef.current.nextCallback()}> Next
                                            <ArrowRightOutlined className='ml-2' />
                                        </Button>
                                    </div>
                                </StepperPanel>
                                <StepperPanel header="Client Details">
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="sm:col-span-2">
                                            <TDInputTemplate
                                                placeholder="Select client..."
                                                type="text"
                                                label="Client"
                                                name="client_id"
                                                formControlName={formik.values.client_id}
                                                handleChange={handleChangeClient}
                                                handleBlur={formik.handleBlur}
                                                data={client}
                                                mode={2}
                                                disabled={params.id > 0}
                                            />
                                        </div>
                                        {gstPan &&
                                            <><div>
                                                <TDInputTemplate
                                                    placeholder="Type GST"
                                                    type="text"
                                                    label="GST"
                                                    name="gst"
                                                    formControlName={formik.values.p_gst}
                                                    handleChange={formik.handleChange}
                                                    handleBlur={formik.handleBlur}
                                                    disabled
                                                    mode={1} />
                                            </div><div>
                                                    <TDInputTemplate
                                                        placeholder="Type PAN"
                                                        type="text"
                                                        label="PAN"
                                                        name="gst"
                                                        formControlName={formik.values.p_pan}
                                                        handleChange={formik.handleChange}
                                                        handleBlur={formik.handleBlur}
                                                        mode={1}
                                                        disabled />
                                                </div>
                                                <div>
                                                    <TDInputTemplate
                                                        placeholder="Type Location"
                                                        type="text"
                                                        label="Location"
                                                        name="proj_loc"
                                                        formControlName={formik.values.proj_loc}
                                                        handleChange={formik.handleChange}
                                                        handleBlur={formik.handleBlur}
                                                        mode={3}
                                                    />
                                                </div></>
                                        }

                                        {/* <div >
                                            <TDInputTemplate
                                                placeholder="Type delivery Address"
                                                type="text"
                                                label="Delivery Address"
                                                name="delvry_add"
                                                formControlName={formik.values.delvry_add}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div> */}
                                        <div className="sm:col-span-2">
                                            <TDInputTemplate
                                                placeholder="Type description..."
                                                type="text"
                                                label="Project Description"
                                                name="proj_des"
                                                formControlName={formik.values.proj_des}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <TDInputTemplate
                                                placeholder="Type end user..."
                                                type="text"
                                                label="End User"
                                                name="end_user"
                                                formControlName={formik.values.end_user}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type consultant..."
                                                type="text"
                                                label="Consultant"
                                                name="proj_consultant"
                                                formControlName={formik.values.proj_consultant}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div>
                                        <div>
                                            <TDInputTemplate
                                                placeholder="Type EPC..."
                                                type="text"
                                                label="EPC Contractor"
                                                name="epc_con"
                                                formControlName={formik.values.epc_con}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div>

                                        {gstPan &&
                                            <>
                                                {pocs.map((poc, index) => (
                                                    <div key={index}>
                                                        <div>
                                                            <TDInputTemplate
                                                                type="text"
                                                                label="POC Name"
                                                                name={`pocs[${index}].poc_name`}
                                                                formControlName={poc.poc_name}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div>
                                                            <TDInputTemplate
                                                                type="text"
                                                                label="POC Email"
                                                                name={`pocs[${index}].poc_email`}
                                                                formControlName={poc.poc_email}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div>
                                                            <TDInputTemplate
                                                                type="text"
                                                                label="POC Primary Phone No."
                                                                name={`pocs[${index}].poc_ph_1`}
                                                                formControlName={poc.poc_ph_1}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div>
                                                            <TDInputTemplate
                                                                type="text"
                                                                label="POC Secondary Phone No."
                                                                name={`pocs[${index}].poc_ph_2`}
                                                                formControlName={poc.poc_ph_2}
                                                                handleChange={formik.handleChange}
                                                                handleBlur={formik.handleBlur}
                                                                mode={1}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                ))}


                                            </>


                                        }
                                        {/* <div>
                                            <TDInputTemplate
                                                placeholder="Type manufacturer..."
                                                type="text"
                                                label="Manufacturer"
                                                name="manufac"
                                                formControlName={formik.values.manufac}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div> */}
                                        {/* <div>
                                            <TDInputTemplate
                                                placeholder="Type Extra..."
                                                type="text"
                                                label="Extra"
                                                name="proj_extra"
                                                formControlName={formik.values.proj_extra}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div> */}

                                    </div>
                                    <div className="flex pt-4 justify-content-between">
                                        <Button className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900" onClick={() => stepperRef.current.prevCallback()} ><ArrowLeftOutlined className='mr-2' />
                                            Back
                                        </Button>
                                        <Button className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" iconPos="right" onClick={() => stepperRef.current.nextCallback()} > Next
                                            <ArrowRightOutlined className='ml-2' />
                                        </Button>
                                    </div>
                                </StepperPanel>
                                <StepperPanel header="Step III">
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                                        {/* <div className='flex gap-4 items-center sm:mt-6'>
                                            <label className="block mb-2 text-sm font-bold text-green-900 dark:text-gray-100">Warranty</label>
                                            <Switch name="warranty_check" size="large"
                                                formControlName={formik.values.warranty_check}
                                                onChange={value => formik.setFieldValue('warranty_check', value)}
                                                checked={formik.values.warranty_check === 'Y'}
                                                onChange={value => formik.setFieldValue('warranty_check', value ? 'Y' : 'N')}
                                                onBlur={formik.handleBlur}
                                                handleBlur={formik.handleBlur}
                                            />
                                        </div> */}
                                        <div className='sm:col-span-2'>
                                            <TDInputTemplate
                                                placeholder="Select project status..."
                                                type="text"
                                                label="Project Status"
                                                name="proj_sts"
                                                formControlName={formik.values.proj_sts}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                data={statusList}
                                                mode={2}

                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <TDInputTemplate
                                                placeholder="Type status remarks"
                                                type="text"
                                                label="Status remarks"
                                                name="sts_remarks"
                                                formControlName={formik.values.sts_remarks}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={3}
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <TDInputTemplate
                                                placeholder=""
                                                type="file"
                                                label="Handover certificate"
                                                name="handovr_cer"
                                                formControlName={formik.values.handovr_cer}
                                                handleChange={formik.handleChange}
                                                handleBlur={formik.handleBlur}
                                                mode={1}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex pt-4 justify-content-start">
                                        <Button className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900" onClick={() => stepperRef.current.prevCallback()}>
                                            <ArrowLeftOutlined className='mr-2' />
                                            Back
                                        </Button>
                                        <BtnComp
                                            mode={params.id > 0 ? "E" : "A"}
                                        //   onReset={formik.handleReset}
                                        />
                                    </div>
                                    {/* <div className="flex justify-end">
                </div> */}
                                </StepperPanel>

                            </Stepper>

                        </div>
                    </form>
                </Spin>
            </div>
        </section>
    )
}

export default ProjectForm
