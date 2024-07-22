import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BtnComp from '../../../Components/BtnComp';
import HeadingTemplate from '../../../Components/HeadingTemplate';
import { Switch } from "antd";
import { Message } from "../../../Components/Message";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { Formik, FieldArray } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { url } from "../../../Address/BaseUrl";



function ProjectForm() {
    const navigate = useNavigate();
    const [client, setClient] = useState([]);
    const params = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false);
    const [pmList, setPMList] = useState([]);
    const [statusList, setStatusList] = useState([]);

    let projectStatusOptions = [
        { code: 'O', name: 'Open' },
        { code: 'C', name: 'Close' }
    ];

    var clientList = [];

    const initialValues = {
        proj_id: "",
        assgn_pm: "",
        projnm: "",
        client_id: "",
        order_id: "",
        order_dt: "",
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
        erctn_res: "",
        proj_sts: "",
        sts_remarks: "",
        handovr_cer: "",
        warranty_check: "N"
    };

    const validationSchema = Yup.object({
        proj_id: Yup.string().required("Project ID is required"),
        assgn_pm: Yup.string().required("Assign project manager is required"),
        projnm: Yup.string().required("Project name is required"),
        client_id: Yup.string().required("Client ID is required"),
        order_id: Yup.string().required("Order ID is required"),
        order_dt: Yup.date().required("Order date is required"),
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
        erctn_res: Yup.string().required("Erection responsibility is required"),
        proj_sts: Yup.string().required("Project Status is required"),
        sts_remarks: Yup.string().required("Status remarks is required"),
        handovr_cer: Yup.string().optional(),
        warranty_check: Yup.string().optional()

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
        initialValues: initialValues,
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
                        {/* <form> */}
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
                                />
                                {/* {formik.errors.proj_id && formik.touched.proj_id ? (
                                    <VError title={formik.errors.proj_id} />
                                ) : null} */}
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
                                {/* {formik.errors.assgn_pm && formik.touched.assgn_pm ? (
                  <VError title={formik.errors.assgn_pm} />
                ) : null} */}
                            </div>
                            <div className="sm:col-span-2">
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
                                {/* {formik.errors.projnm && formik.touched.projnm ? (
                                    <VError title={formik.errors.projnm} />
                                ) : null} */}
                            </div>
                            <div className="sm:col-span-2">
                                <TDInputTemplate
                                    placeholder="Select client..."
                                    type="text"
                                    label="Client"
                                    name="client_id"
                                    formControlName={formik.values.client_id}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    data={client}
                                    mode={2}
                                    disabled={params.id > 0}
                                />
                                {/* {formik.errors.cat_id && formik.touched.cat_id ? (
                  <VError title={formik.errors.cat_id} />
                ) : null} */}
                            </div>
                            <div>
                                <TDInputTemplate
                                    placeholder="Select order id..."
                                    type="text"
                                    label="Order ID"
                                    name="order_id"
                                    formControlName={formik.values.order_id}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    //   data={cat}
                                    mode={1}
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
                                    formControlName={formik.values.order_dt}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
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
                                    formControlName={formik.values.proj_loc}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    mode={3}
                                />
                                {/* {errors.proj_loc && touched.proj_loc ? <VError title={errors.proj_loc} /> : null} */}
                            </div>
                            <div >
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
                                {/* {errors.delvry_add && touched.delvry_add ? <VError title={errors.delvry_add} /> : null} */}

                            </div>
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
                                {/* {errors.proj_des && touched.proj_des ? <VError title={errors.proj_des} /> : null} */}
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
                                    formControlName={formik.values.manufac}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    mode={3}
                                />
                                {/* {formik.errors.manufac && formik.touched.manufac ? (
                                    <VError title={formik.errors.manufac} />
                                ) : null} */}
                            </div>
                            <div>
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
                                {/* {formik.errors.proj_extra && formik.touched.proj_extra ? (
                                    <VError title={formik.errors.proj_extra} />
                                ) : null} */}
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
                                    formControlName={formik.values.prc_basis}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    mode={1}
                                />
                                {/* {formik.errors.prc_basis && formik.touched.prc_basis ? (
                                    <VError title={formik.errors.prc_basis} />
                                ) : null} */}
                            </div>
                            <div className="sm:col-span-2">
                                <TDInputTemplate
                                    placeholder="Type LD clause"
                                    type="text"
                                    label="LD Clause"
                                    name="ld_cls"
                                    formControlName={formik.values.ld_cls}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    mode={3}
                                />
                                {/* {formik.errors.ld_cls && formik.touched.ld_cls ? (
                                    <VError title={formik.errors.ld_cls} />
                                ) : null} */}
                            </div>
                            <div className="sm:col-span-2">
                                <TDInputTemplate
                                    placeholder="Type erection responsibility"
                                    type="text"
                                    label="Erection Responsibility"
                                    name="erctn_res"
                                    formControlName={formik.values.erctn_res}
                                    handleChange={formik.handleChange}
                                    handleBlur={formik.handleBlur}
                                    mode={3}
                                />
                                {/* {errors.erctn_res && touched.erctn_res ? <VError title={errors.erctn_res} /> : null} */}
                            </div>
                            <div className='flex gap-4 items-center sm:mt-6'>
                                <label className="block mb-2 text-sm font-bold text-green-900 dark:text-gray-100">Warranty</label>
                                <Switch name="warranty_check" size="large"
                                    // formControlName={formik.values.warranty_check}
                                    // onChange={value => formik.setFieldValue('warranty_check', value)}
                                    checked={formik.values.warranty_check === 'Y'}
                                    onChange={value => formik.setFieldValue('warranty_check', value ? 'Y' : 'N')}
                                    onBlur={formik.handleBlur}
                                    handleBlur={formik.handleBlur}
                                />


                                {/* {formik.errors.proj_warrant && formik.touched.proj_warrant ?(<VError title={formik.errors.proj_warrant} />) : null} */}
                            </div>
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
                                    disabled={params.id > 0}
                                />
                                {/* {formik.errors.proj_sts && formik.touched.proj_sts ? (<VError title={formik.errors.proj_sts} />) : null} */}
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
                                {/* {errors.sts_remarks && touched.sts_remarks ? <VError title={errors.sts_remarks} /> : null} */}
                            </div>
                            <div>
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
