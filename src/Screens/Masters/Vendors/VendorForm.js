import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import VError from "../../../Components/VError";
import TDInputTemplate from "../../../Components/TDInputTemplate";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { url } from "../../../Address/BaseUrl";
import { Spin } from "antd";
import { LoadingOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
// import { Button } from 'primereact/button';

function VendorForm() {
  const stepperRef = useRef(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [msmeList, setMsmeList] = useState([]);
  const [msmeVal, setmsmeVal] = useState(false)
  const [tdsPercTrue, setTdsPercTrue] = useState(false)
  const [tcsPercTrue, setTcsPercTrue] = useState(false)
  const [compositeTrue, setCompositeTrue] = useState(false)
  const [stateTrue, setStateTrue] = useState(false)
  const [gstNoTrue, setGstNoTrue] = useState(false)
  const [exFlag, setExempted] = useState(false)
  const [cat,setCat]=useState([])
  console.log(params, "params");
  var categories=[]


  // const [msmeValue,setmsmeValue] = useState('')


  let msmeOptions = [
    { code: 'Y', name: 'Yes' },
    { code: 'N', name: 'No' }
  ];
 
  const handleChangeMsme = (event, handleChange) => {
    // console.log("Custom handleChange logic for", event.target.name, event.target.value);
    handleChange(event);
    const value = event.target.value;
    if (value === 'Y') {
      setmsmeVal(true);
    } else {
      setmsmeVal(false);
    }
  };
  const handleChangetds = (event, handleChange) => {
    handleChange(event);
    const value = event.target.value;
    if (value === 'Y') {
      setTdsPercTrue(true);
    } else {
      setTdsPercTrue(false);
    }
  };
  const handleChangetcs = (event, handleChange) => {
    handleChange(event);
    const value = event.target.value;
    if (value === 'Y') {
      setTcsPercTrue(true);
    } else {
      setTcsPercTrue(false);
    }
  };
  const handleChangeSupply = (event, handleChange) => {
    handleChange(event);
    const value = event.target.value;
    if (value === 'R') {
      setGstNoTrue(true)
      setCompositeTrue(true);
      setStateTrue(true);
      setExempted(true)

    } else if (value === 'U') {
      setCompositeTrue(false);
      setStateTrue(true);
      setExempted(false)
      setGstNoTrue(false)
    } else {
      setCompositeTrue(false);
      setStateTrue(false);
      setGstNoTrue(false)
      setExempted(false)

    }
  };
  // const handleChangemsme = (e) => {
  //   const value = e.target.value;
  //   setmsmeValue(value);
  //   if (value === 'Y') {
  //     setmsmeVal(true);
  //   } else {
  //     setmsmeVal(false);
  //   }
  // };

  const [formValues, setValues] = useState({
    // v_name: "",
    // v_email: "",
    // v_phone:"",
    // v_gst: "",
    // v_pan: "",
    // v_msme: "",
    // v_msmeno: "",
    // v_bankdtls: "",
    // v_remarks: "",
    // v_address: "",
    // v_tan:"",
    // dynamicFields_category: [
    //   {
    //     sl_no:  0 ,
    //     category_id:""
    //   },
    // ],
    // dynamicFields: [{
    //   sl_no: 0,
    //   poc_name: "", poc_ph_1: "", poc_ph_2: "",poc_email:""
    // }]
  });

  const initialValues = {
    v_name: "",
    v_email: "",
    v_phone: "",
    v_gst: "",
    v_pan: "",
    // v_reg: "",
    v_msme: "",
    v_msmeno: "",
    v_banknm: "",
    v_brnnm:"",
    v_ifsc:"",
    v_micr:"",
    v_ac:"",
    v_tan: "",
    v_tds: "",
    tds_perc: "",
    v_tcs: "",
    tcs_perc: "",
    supply_flag: "",
    v_gst_no: "",
    v_composite: "",
    v_e_r_supply: "",
    v_state: "",
    v_address: "",
    dynamicFields: [{
      sl_no:0,
      // sl_no: 0,
      poc_name: "", poc_ph_1: "", poc_ph_2: "",poc_email:""
    }],
    dynamicFields_category: [
      {
        sl_no:0,
        category_id:""
        // poc_address: "",
      },
    ],
  };

  const validationSchema = Yup.object({
    // v_name: Yup.string().required("Name is required"),
    // v_phone: Yup.string().required("Phone is required").length(10),
    // v_email: Yup.string()
    //   .required("Email is required")
    //   .email("Incorrect email format"),
    // v_gst: Yup.string(),
    // v_pan: Yup.string(),
    // v_msme: Yup.string().required("MSME is required"),
    // v_msmeno: Yup.string().when('v_msme', {
    //   is: 'Y',
    //   then: () => Yup.string().required('MSME No. is required'),
    //   otherwise: () => Yup.string()
    // }),
    // v_brnnm: Yup.string().required("Branch name required"),
    // v_banknm: Yup.string().required("Bank name required"),
    // v_ac: Yup.string().required("Account no. required"),
    // v_micr: Yup.string().required("MICR code required"),
    // v_ifsc: Yup.string().required("IFSC required"),
    // v_tan: Yup.string().required("TAN is required"),
    // v_tds: Yup.string().required("TDS is required"),
    // tds_perc: Yup.string().when('v_tds', {
    //   is: 'Y',
    //   then: () => Yup.string().required('TDS percentage is required'),
    //   otherwise: () => Yup.string()
    // }),
    // v_tcs: Yup.string().required("TCS is required"),
    // tcs_perc: Yup.string().when('v_tcs', {
    //   is: 'Y',
    //   then: () => Yup.string().required('TCS percentage is required'),
    //   otherwise: () => Yup.string()
    // }),



    // v_address: Yup.string().required("Address is required"),
    // dynamicFields: Yup.array().of(
    //   Yup.object().shape({
    //     poc_name: Yup.string().required("Contact person is required"),
    //     poc_ph_1: Yup.string().required("Phone is required").length(10),
    //     poc_ph_2: Yup.string().required("Phone is required").length(10),
    //     poc_email: Yup.string().required("Email is required").email(),
    //   })
    // ),
    // dynamicFields_category: Yup.array().of(
    //   Yup.object().shape({
    //     category_id: Yup.string().required("Deals in required"),
    //   })
    // )
  });

  useEffect(() => {
    setMsmeList(msmeOptions)
     axios.post(url + "/api/getcategory", { id: 0}).then((res) => {
      for (let i = 0; i < res?.data?.msg?.length; i++) {
        categories.push(
          {
          name: res?.data?.msg[i].catg_name,
          code: res?.data?.msg[i].sl_no
        }
      );
      }
      setCat(categories);
    });

    if (+params.id > 0) {
      setLoading(true);
      // axios.post(url + "/api/getvendor", { id: params.id })
      //   .then((res) => {
      //     console.log(res.data.msg.desig_name);
      //     setLoading(false);
      //     setData(res.data?.msg)

      //     setValues({
      //       v_: res.data?.msg?.vendor_name,
      //       v_email: res.data?.msg?.vendor_email,
      //       poc_name: res.data?.msg?.vendor_contact,
      //       poc_ph_1: res.data?.msg?.vendor_phone,
      //       poc_ph_2: res.data?.msg?.vendor_phone,
      //       v_remarks: res.data?.msg?.vendor_remarks,
      //       v_gst: res.data?.msg?.vendor_gst,
      //       v_pan: res.data?.msg?.vendor_pan,
      //       // v_reg: res.data?.msg?.vendor_reg,
      //       v_msme: res.data?.msg?.vendor_msme,
      //       v_msmeno: res.data?.msg?.vendor_msmeno,
      //       v_address: res.data?.msg?.vendor_address,

      //     });
      //   }).catch(err => { console.log(err); navigate('/error' + '/' + err.code + '/' + err.message) });
      axios.post(url + "/api/getvendor", { id: params.id }).then((res) => {
        console.log(res,'getvendor');
        setValues({
          // ...formValues,
          v_name: res.data.msg.vendor_name,
          v_email: res.data.msg.vendor_email,
          v_phone: res.data.msg.vendor_phone,
          v_gst: res.data.msg.vendor_gst,
          v_pan: res.data.msg.vendor_pan,
          v_msme: res.data.msg.vendor_msme,
          v_msmeno: res.data.msg.v_msmeno,
          v_remarks: res.data.msg.vendor_remarks,
          v_address: res.data.msg.vendor_address,
          v_msme: res.data.msg.msme_flag,
          v_msmeno:res.data.msg.msme_no,
          v_bankdtls:res.data.msg.bank_details,
          v_tan:res.data.msg.tan_no,
          v_tds:res.data.msg.tds_flag,
          tds_perc:res.data.msg.tds_prtg,
          v_tcs:res.data.msg.tcs_flag,
          tcs_perc:res.data.msg.tcs_prtg,
          supply_flag:res.data.msg.supply_flag,
          v_gst_no:res.data.msg.gst_no,
          v_composite:res.data.msg.org_type,
          v_e_r_supply:res.data.msg.e_r_supply,
          v_state:res.data.msg.state,
        });
      });
      axios.post(url + "/api/getvendorbank", { id: params.id }).then((res) => {
        console.log(res.data.msg[0].micr_code,'getvendorbank');
        setValues({
          v_micr:res.data.msg[0].micr_code,
          v_ifsc:res.data.msg[0].ifsc,
          v_ac:res.data.msg[0].ac_no,
          v_banknm:res.data.msg[0].bank_name,
          v_brnnm:res.data.msg[0].branch_name,
        })})
      axios
      .post(url + "/api/getvendordeals", {
        id: params.id,
      })
      .then((res) => {
        console.log(res.data.msg[0], "res");
        // res.data.msg.map((item, index) =>({console.log(item)}))
        setValues(prev => ({
          ...prev,
          dynamicFields_category: res.data.msg.map((item, index) => ({
            sl_no: item.sl_no,
            category_id: item.category_id,
          })),
        }));
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
      axios.post(url + "/api/getvendorpoc", { id: params.id }).then((res) => {
        console.log(res.data.msg[0], 'res getvendorpoc');
        setValues(prevValues => ({
          ...prevValues,
          dynamicFields: res.data.msg.map((item) => ({
            sl_no: item.sl_no,
            poc_name: item.poc_name,
            poc_ph_1: item.poc_ph_1,
            poc_ph_2: item.poc_ph_2,
            poc_email:item.poc_email
          }))
        }));
        setLoading(false);
      });
    }
  }, []);
  const onSubmit = (values) => {
    console.log("onsubmit called")
    console.log(values, 'onsubmit vendor');
    setLoading(true);
    axios
      .post(url + "/api/addVendor", {
        v_id: +params.id,
        user: localStorage.getItem("email"),
        v_name: values.v_name,
        v_gst: values.v_gst,
        v_pan: values.v_pan,
        v_phone:values.v_phone,
        v_email:values.v_email,
        msme_flag: values.v_msme,
        msme_no: values.v_msmeno,
        v_banknm:values.v_banknm,
        v_brnnm:values.v_brnnm,
        v_ifsc:values.v_ifsc,
        v_micr:values.v_micr,
        v_ac:values.v_ac,
        tan_no: values.v_tan,
        tds_flag: values.v_tds,
        tds_prtg: values.tds_perc,
        tcs_flag: values.v_tcs,
        tcs_prtg: values.tcs_perc,
        supply_flag: values.supply_flag,
        gst_no: values.v_gst_no,
        composite: values.v_composite,
        e_r_supply: values.v_e_r_supply,
        state: values.v_state,
        v_address: values.v_address,
        v_poc: values.dynamicFields,
        v_deals:values.dynamicFields_category
      })
      .then((res) => {
        setLoading(false);
        if (res.data.suc > 0) {
          Message("success", res.data.msg);
          // if (params.id == 0) formik.handleReset();
        } else {
          Message("error", res.data.msg);
        }
      }).catch(err => { console.log(err); navigate('/error' + '/' + err.code + '/' + err.message) });
  };
  // const formik = useFormik({
  //   initialValues: +params.id > 0 ? formValues : initialValues,
  //   onSubmit,
  //   validationSchema,
  //   validateOnMount: true,
  //   enableReinitialize: true,
  // });
  return (
    <section className="bg-transparent dark:bg-[#001529]">
      {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
      <HeadingTemplate
        text={params.id > 0 ? "Update vendor" : "Add vendor"}
        mode={params.id > 0 ? 1 : 0}
        title={'Vendor'}
        data={params.id && data ? data : ''}
      />
      <div className="w-full bg-white p-6 rounded-2xl">

        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="text-green-900 dark:text-gray-400"
          spinning={loading}
        >
          {/* Form without Stepper */}
          {/* <Formik initialValues={+params.id > 0 ? formValues : initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount={true} enableReinitialize={true}>
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Type name..."
                      type="text"
                      label="Vendor name"
                      name="v_name"
                      formControlName={values.v_name}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_name && touched.v_name ? <VError title={errors.v_name} /> : null}
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type Phone No...."
                      type="text"
                      label="Vendor phone No."
                      name="v_phone"
                      formControlName={values.v_phone}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_phone && touched.v_phone ? <VError title={errors.v_phone} /> : null}
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type email..."
                      type="text"
                      label="Vendor email"
                      name="v_email"
                      formControlName={values.v_email}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_email && touched.v_email ? <VError title={errors.v_email} /> : null}
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type GST..."
                      type="text"
                      label="GST"
                      name="v_gst"
                      formControlName={values.v_gst}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_gst && touched.v_gst ? <VError title={errors.v_gst} /> : null}
                  </div>
                  <div className="sm:col-span-1">
                    <TDInputTemplate
                      placeholder="Type PAN..."
                      type="text"
                      label="PAN"
                      name="v_pan"
                      formControlName={values.v_pan}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_pan && touched.v_pan ? <VError title={errors.v_pan} /> : null}
                  </div>
                  <div className='sm:col-span-2'>
                    <TDInputTemplate
                      placeholder="Select MSME"
                      type="text"
                      label="MSME"
                      name="v_msme"
                      formControlName={values.v_msme}
                      handleChange={event => handleChangeMsme(event, handleChange)}
                      handleBlur={handleBlur}
                      data={msmeList}
                      mode={2}
                    />
                    {errors.v_msme && touched.v_msme ? <VError title={errors.v_msme} /> : null}
                  </div>
                  {msmeVal &&
                    <div className='sm:col-span-2' >
                      <TDInputTemplate
                        placeholder="Type MSME No."
                        type="text"
                        label="MSME No."
                        name="v_msmeno"
                        formControlName={values.v_msmeno}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.v_msmeno && touched.v_msmeno ? <VError title={errors.v_msmeno} /> : null}
                    </div>}

                  <div className="sm:col-span-1">
                    <TDInputTemplate
                      placeholder="Type Bank Details..."
                      type="text"
                      label="Bank Details"
                      name="v_bankdtls"
                      formControlName={values.v_bankdtls}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_bankdtls && touched.v_bankdtls ? <VError title={errors.v_bankdtls} /> : null}
                  </div>
                  <div className="sm:col-span-1">
                    <TDInputTemplate
                      placeholder="Type TAN..."
                      type="text"
                      label="TAN"
                      name="v_tan"
                      formControlName={values.v_tan}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_tan && touched.v_tan ? <VError title={errors.v_tan} /> : null}
                  </div>
                  <div className='sm:col-span-2'>
                    <TDInputTemplate
                      placeholder="Select TDS"
                      type="text"
                      label="TDS"
                      name="v_tds"
                      formControlName={values.v_tds}
                      handleChange={event => handleChangetds(event, handleChange)}
                      handleBlur={handleBlur}
                      data={msmeList}
                      mode={2}
                    />
                    {errors.v_tds && touched.v_tds ? <VError title={errors.v_tds} /> : null}
                  </div>
                  {tdsPercTrue &&
                    <div className='sm:col-span-2' >
                      <TDInputTemplate
                        placeholder="Type TDS Percentage"
                        type="text"
                        label="TDS Percentage"
                        name="tds_perc"
                        formControlName={values.tds_perc}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.tds_perc && touched.tds_perc ? <VError title={errors.tds_perc} /> : null}
                    </div>}

                  <div className='sm:col-span-2'>
                    <TDInputTemplate
                      placeholder="Select TCS"
                      type="text"
                      label="TCS"
                      name="v_tcs"
                      formControlName={values.v_tcs}
                      handleChange={event => handleChangetcs(event, handleChange)}
                      handleBlur={handleBlur}
                      data={msmeList}
                      mode={2}
                    />
                    {errors.v_tcs && touched.v_tcs ? <VError title={errors.v_tcs} /> : null}
                  </div>
                  {tcsPercTrue &&
                    <div className='sm:col-span-2' >
                      <TDInputTemplate
                        placeholder="Type TCS Percentage"
                        type="text"
                        label="TCS Percentage"
                        name="tcs_perc"
                        formControlName={values.tcs_perc}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.tcs_perc && touched.tcs_perc ? <VError title={errors.tcs_perc} /> : null}
                    </div>}
                  <Radio.Group name="supply_flag" value={values.supply_flag}
                    onChange={event => handleChangeSupply(event, handleChange)}
                    onBlur={handleBlur}>
                    <Radio value={'R'}>Registered</Radio>
                    <Radio value={'U'}>Unregistered</Radio>
                    <Radio value={'O'}>Overseas Supplier</Radio>
                  </Radio.Group>
                  {errors.supply_flag && touched.supply_flag ? <VError title={errors.supply_flag} /> : null}
                  {gstNoTrue &&
                    <div className='sm:col-span-2' >
                      <TDInputTemplate
                        placeholder="Type GST No."
                        type="text"
                        label="GST No."
                        name="v_gst_no"
                        formControlName={values.v_gst_no}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.v_gst_no && touched.v_gst_no ? <VError title={errors.v_gst_no} /> : null}
                    </div>}
                  {compositeTrue &&
                    <div className='sm:col-span-2' >
                      <TDInputTemplate
                        placeholder="Type composite"
                        type="text"
                        label="Composite"
                        name="v_composite"
                        formControlName={values.v_composite}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.v_composite && touched.v_composite ? <VError title={errors.v_composite} /> : null}
                    </div>}
                  <div className='sm:col-span-2' >
                    <TDInputTemplate
                      placeholder="Type Exempted rated supply"
                      type="text"
                      label="Exempted rated supply"
                      name="v_e_r_supply"
                      formControlName={values.v_e_r_supply}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.v_e_r_supply && touched.v_e_r_supply ? <VError title={errors.v_e_r_supply} /> : null}
                  </div>
                  {stateTrue &&
                    <div><Radio.Group name="v_state" value={values.v_state}
                      onChange={handleChange}
                      onBlur={handleBlur}>
                      <Radio value={'E'}>Interstate</Radio>
                      <Radio value={'A'}>Intrastate</Radio>
                    </Radio.Group>
                      {errors.v_state && touched.v_state ? <VError title={errors.v_state} /> : null}
                    </div>}
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Lorem Ipsum Dolor Sit..."
                      type="text"
                      label="Deals in"
                      name="v_remarks"
                      formControlName={values.v_remarks}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={3}
                    />
                    {errors.v_remarks && touched.v_remarks ? <VError title={errors.v_remarks} /> : null}
                  </div>
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Type vendor address here..."
                      type="text"
                      label="Address"
                      name="v_address"
                      formControlName={values.v_address}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={3}
                    />
                    {errors.v_address && touched.v_address ? <VError title={errors.v_address} /> : null}
                  </div>
                  <FieldArray name="dynamicFields">
                    {({ push, remove, insert, unshift }) => (
                      <>
                        {values.dynamicFields?.map((field, index) => (
                          <React.Fragment key={index}>
                            <div className="sm:col-span-2 flex gap-2 justify-end">
                              <Button
                                className="rounded-full text-white bg-red-800 border-red-800"
                                onClick={() => remove(index)}
                                icon={<MinusOutlined />}
                              ></Button>

                              <Button
                                className="rounded-full bg-green-900 text-white"
                                onClick={() => unshift({ sl_no: 0, poc_name: "", poc_ph_1: "" })} icon={<PlusOutlined />}
                              ></Button>

                            </div>
                            <div className="sm:col-span-2">
                              <TDInputTemplate
                                placeholder="Type contact person name..."
                                type="text"
                                label="Contact person name"
                                name={`dynamicFields[${index}].poc_name`}
                                formControlName={field.poc_name}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                              {errors.dynamicFields?.[index]?.poc_name && touched.dynamicFields?.[index]?.poc_name ? (
                                <VError title={errors.dynamicFields[index].poc_name} />
                              ) : null}
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type contact person primary phone..."
                                type="text"
                                label="Contact person primary phone no."
                                name={`dynamicFields[${index}].poc_ph_1`}
                                formControlName={field.poc_ph_1}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                              {errors.dynamicFields?.[index]?.poc_ph_1 && touched.dynamicFields?.[index]?.poc_ph_1 ? (
                                <VError title={errors.dynamicFields[index].poc_ph_1} />
                              ) : null}
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type contact secondary person phone..."
                                type="text"
                                label="Contact person secondary phone no."
                                name={`dynamicFields[${index}].poc_ph_2`}
                                formControlName={field.poc_ph_2}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                              {errors.dynamicFields?.[index]?.poc_ph_2 && touched.dynamicFields?.[index]?.poc_ph_2 ? (
                                <VError title={errors.dynamicFields[index].poc_ph_2} />
                              ) : null}
                            </div>

                          </React.Fragment>
                        ))}
                        <div className="sm:col-span-2">
                          <Button type="dashed" onClick={() => push({ sl_no: 0, poc_name: "", poc_ph_1: "" })} icon={<PlusOutlined />}>
                            Add field
                          </Button>
                        </div>
                      </>
                    )}
                  </FieldArray>
                </div>

                <BtnComp mode={params.id > 0 ? "E" : "A"} />

              </form>
            )}
          </Formik> */}
          {/* Form without Stepper */}
          <Formik initialValues={+params.id > 0 ? formValues : initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount={true} enableReinitialize={true}>
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <div className="card flex flex-col justify-center">
                {/*  <Stepper ref={stepperRef} style={{ flexBasis: '80rem' }}>
                    <StepperPanel header="Header I">*/}
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                          <TDInputTemplate
                            placeholder="Type name..."
                            type="text"
                            label="Vendor name"
                            name="v_name"
                            formControlName={values.v_name}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_name && touched.v_name ? <VError title={errors.v_name} /> : null}
                        </div>
                        <div>
                          <TDInputTemplate
                            placeholder="Type GST..."
                            type="text"
                            label="GST"
                            name="v_gst"
                            formControlName={values.v_gst}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_gst && touched.v_gst ? <VError title={errors.v_gst} /> : null}
                        </div>
                        <div className="sm:col-span-1">
                          <TDInputTemplate
                            placeholder="Type PAN..."
                            type="text"
                            label="PAN"
                            name="v_pan"
                            formControlName={values.v_pan}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_pan && touched.v_pan ? <VError title={errors.v_pan} /> : null}
                        </div>
                       
                        <div className="sm:col-span-2">
                          {/* <TDInputTemplate
                            placeholder="Lorem Ipsum Dolor Sit..."
                            type="text"
                            label="Deals in"
                            name="v_remarks"
                            formControlName={values.v_remarks}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={3}
                          />
                          {errors.v_remarks && touched.v_remarks ? <VError title={errors.v_remarks} /> : null} */}
                          <FieldArray name="dynamicFields_category">
                          {({ push, remove, insert, unshift }) => (
                            <>
                              {values.dynamicFields_category?.map((field, index) => (
                                <React.Fragment key={index}>
                                  <div className="sm:col-span-2 flex gap-2 justify-end my-3">
                                    <Button
                                      className="rounded-full text-white bg-red-800 border-red-800"
                                      onClick={() => remove(index)}
                                      icon={<MinusOutlined />}
                                    ></Button>

                                    <Button
                                      className="rounded-full bg-green-900 text-white"
                                      onClick={() => unshift({ sl_no: 0, category_id:"" })} icon={<PlusOutlined />}
                                    ></Button>

                                  </div>
                                  <div className="sm:col-span-2">
                                    <TDInputTemplate
                                      placeholder="Deals in"
                                      type="text"
                                      label="Deals in"
                                      name={`dynamicFields_category[${index}].category_id`}
                                      formControlName={field.category_id}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      data={cat}
                                      mode={2}
                                    />
                                    {errors.dynamicFields_category?.[index]?.category_id && touched.dynamicFields_category?.[index]?.category_id ? (
                                      <VError title={errors.dynamicFields_category[index].category_id} />
                                    ) : null}
                                  </div>
                                </React.Fragment>
                              ))}
                              {/* <div className="sm:col-span-2">
                          <Button type="dashed" onClick={() => push({ sl_no: 0, poc_name: "", poc_ph_1: "" })} icon={<PlusOutlined />}>
                            Add field
                          </Button>
                        </div> */}
                            </>
                          )}
                        </FieldArray>
                        </div>
                      </div>
                      {/* <div className="flex pt-4 justify-content-end">
                        <Button className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" iconPos="right" onClick={() =>{ stepperRef.current.nextCallback();}}> Next
                          <ArrowRightOutlined className='ml-2' />
                        </Button>
                      </div> */}
                    {/* </StepperPanel> */}
                    {/* <StepperPanel header="Header II"> */}
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div>
                          <TDInputTemplate
                            placeholder="Select MSME"
                            type="text"
                            label="MSME"
                            name="v_msme"
                            formControlName={values.v_msme}
                            handleChange={event => handleChangeMsme(event, handleChange)}
                            handleBlur={handleBlur}
                            data={msmeList}
                            mode={2}
                          />
                          {errors.v_msme && touched.v_msme ? <VError title={errors.v_msme} /> : null}
                        </div>
                        {msmeVal &&
                          <div>
                            <TDInputTemplate
                              placeholder="Type MSME No."
                              type="text"
                              label="MSME No."
                              name="v_msmeno"
                              formControlName={values.v_msmeno}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              mode={1}
                            />
                            {errors.v_msmeno && touched.v_msmeno ? <VError title={errors.v_msmeno} /> : null}
                          </div>}

                        <div className="sm:col-span-2">
                          <TDInputTemplate
                            placeholder="Type Bank Name..."
                            type="text"
                            label="Bank Name"
                            name="v_banknm"
                            formControlName={values.v_banknm}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_banknm && touched.v_banknm ? <VError title={errors.v_banknm} /> : null}
                        </div>
                        <div >
                          <TDInputTemplate
                            placeholder="Type Branch Name..."
                            type="text"
                            label="Branch Name"
                            name="v_brnnm"
                            formControlName={values.v_brnnm}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_brnnm && touched.v_brnnm ? <VError title={errors.v_brnnm} /> : null}
                        </div>
                        <div >
                          <TDInputTemplate
                            placeholder="Type A/C No."
                            type="text"
                            label="A/C No."
                            name="v_ac"
                            formControlName={values.v_ac}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_ac && touched.v_ac ? <VError title={errors.v_ac} /> : null}
                        </div>
                        <div >
                          <TDInputTemplate
                            placeholder="Type IFSC"
                            type="text"
                            label="IFSC"
                            name="v_ifsc"
                            formControlName={values.v_ifsc}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_ifsc && touched.v_ifsc ? <VError title={errors.v_ifsc} /> : null}
                        </div>
                        <div >
                          <TDInputTemplate
                            placeholder="Type MICR Code"
                            type="text"
                            label="MICR Code"
                            name="v_micr"
                            formControlName={values.v_micr}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_micr && touched.v_micr ? <VError title={errors.v_micr} /> : null}
                        </div>
                        <div className="sm:col-span-1">
                          <TDInputTemplate
                            placeholder="Type TAN..."
                            type="text"
                            label="TAN"
                            name="v_tan"
                            formControlName={values.v_tan}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_tan && touched.v_tan ? <VError title={errors.v_tan} /> : null}
                        </div>
                        <div>
                          <TDInputTemplate
                            placeholder="Select TDS"
                            type="text"
                            label="TDS"
                            name="v_tds"
                            formControlName={values.v_tds}
                            handleChange={event => handleChangetds(event, handleChange)}
                            handleBlur={handleBlur}
                            data={msmeList}
                            mode={2}
                          />
                          {errors.v_tds && touched.v_tds ? <VError title={errors.v_tds} /> : null}
                        </div>
                        {tdsPercTrue &&
                          <div>
                            <TDInputTemplate
                              placeholder="Type TDS Percentage"
                              type="text"
                              label="TDS Percentage"
                              name="tds_perc"
                              formControlName={values.tds_perc}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              mode={1}
                            />
                            {errors.tds_perc && touched.tds_perc ? <VError title={errors.tds_perc} /> : null}
                          </div>}

                        <div>
                          <TDInputTemplate
                            placeholder="Select TCS"
                            type="text"
                            label="TCS"
                            name="v_tcs"
                            formControlName={values.v_tcs}
                            handleChange={event => handleChangetcs(event, handleChange)}
                            handleBlur={handleBlur}
                            data={msmeList}
                            mode={2}
                          />
                          {errors.v_tcs && touched.v_tcs ? <VError title={errors.v_tcs} /> : null}
                        </div>
                        {tcsPercTrue &&
                          <div >
                            <TDInputTemplate
                              placeholder="Type TCS Percentage"
                              type="text"
                              label="TCS Percentage"
                              name="tcs_perc"
                              formControlName={values.tcs_perc}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              mode={1}
                            />
                            {errors.tcs_perc && touched.tcs_perc ? <VError title={errors.tcs_perc} /> : null}
                          </div>}
                        <Radio.Group name="supply_flag" value={values.supply_flag}
                          onChange={event => handleChangeSupply(event, handleChange)}
                          onBlur={handleBlur}>
                          <Radio value={'R'}>Registered</Radio>
                          <Radio value={'U'}>Unregistered</Radio>
                          <Radio value={'O'}>Overseas Supplier</Radio>
                        </Radio.Group>
                        {errors.supply_flag && touched.supply_flag ? <VError title={errors.supply_flag} /> : null}
                        {gstNoTrue &&
                          <div className='sm:col-span-2' >
                            <TDInputTemplate
                              placeholder="Type GST No."
                              type="text"
                              label="GST No."
                              name="v_gst_no"
                              formControlName={values.v_gst_no}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              mode={1}
                            />
                            {errors.v_gst_no && touched.v_gst_no ? <VError title={errors.v_gst_no} /> : null}
                          </div>}
                        {compositeTrue &&
                          <div className='sm:col-span-2' >
                            <TDInputTemplate
                              placeholder="Type composite"
                              type="text"
                              label="Composite"
                              name="v_composite"
                              formControlName={values.v_composite}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              data={[{name:'Composite 1',code:'c1'},{name:'Composite 2',code:'c2'},{name:'Composite 3',code:'c3'}]}
                              mode={2}
                            />
                            {errors.v_composite && touched.v_composite ? <VError title={errors.v_composite} /> : null}
                          </div>}

                       {exFlag && <div className='sm:col-span-2' >
                          <TDInputTemplate
                            placeholder="Type Exempted rated supply"
                            type="text"
                            label="Exempted rated supply"
                            name="v_e_r_supply"
                            formControlName={values.v_e_r_supply}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            data={[{name:'Yes',code:'Y'},{name:'No',code:'N'}]}
                            mode={2}
                          />
                          {errors.v_e_r_supply && touched.v_e_r_supply ? <VError title={errors.v_e_r_supply} /> : null}
                        </div>}
                        {stateTrue &&
                          <div><Radio.Group name="v_state" value={values.v_state}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                            <Radio value={'E'}>Interstate</Radio>
                            <Radio value={'A'}>Intrastate</Radio>
                          </Radio.Group>
                            {errors.v_state && touched.v_state ? <VError title={errors.v_state} /> : null}
                          </div>}
                      </div>
                      {/* <div className="flex pt-4 justify-content-between">
                        <Button className="inline-flex items-center px-5 py-5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900" onClick={() => stepperRef.current.prevCallback()} ><ArrowLeftOutlined className='mr-2' />
                          Back
                        </Button>
                        <Button className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" iconPos="right" onClick={() => {stepperRef.current.nextCallback();}} > Next
                          <ArrowRightOutlined className='ml-2' />
                        </Button>
                      </div> */}
                    {/* </StepperPanel> */}
                    {/* <StepperPanel header="Header III"> */}
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div>
                          <TDInputTemplate
                            placeholder="Type Phone No...."
                            type="text"
                            label="Vendor phone No."
                            name="v_phone"
                            formControlName={values.v_phone}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_phone && touched.v_phone ? <VError title={errors.v_phone} /> : null}
                        </div>
                        <div>
                          <TDInputTemplate
                            placeholder="Type email..."
                            type="text"
                            label="Vendor email"
                            name="v_email"
                            formControlName={values.v_email}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={1}
                          />
                          {errors.v_email && touched.v_email ? <VError title={errors.v_email} /> : null}
                        </div>
                        <div className="sm:col-span-2">
                          <TDInputTemplate
                            placeholder="Type vendor address here..."
                            type="text"
                            label="Address"
                            name="v_address"
                            formControlName={values.v_address}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            mode={3}
                          />
                          {errors.v_address && touched.v_address ? <VError title={errors.v_address} /> : null}
                        </div>
                        <FieldArray name="dynamicFields">
                          {({ push, remove, insert, unshift }) => (
                            <>
                              {values.dynamicFields?.map((field, index) => (
                                <React.Fragment key={index}>
                                  <div className="sm:col-span-2 flex gap-2 justify-end">
                                    <Button
                                      className="rounded-full text-white bg-red-800 border-red-800"
                                      onClick={() => remove(index)}
                                      icon={<MinusOutlined />}
                                    ></Button>

                                    <Button
                                      className="rounded-full bg-green-900 text-white"
                                      onClick={() => unshift({ sl_no: 0, poc_name: "", poc_ph_1: "",poc_ph_2:"",poc_email:" " })} icon={<PlusOutlined />}
                                    ></Button>

                                  </div>
                                  <div className="sm:col-span-2">
                                    <TDInputTemplate
                                      placeholder="Type contact person name..."
                                      type="text"
                                      label="Contact person name"
                                      name={`dynamicFields[${index}].poc_name`}
                                      formControlName={field.poc_name}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      mode={1}
                                    />
                                    {errors.dynamicFields?.[index]?.poc_name && touched.dynamicFields?.[index]?.poc_name ? (
                                      <VError title={errors.dynamicFields[index].poc_name} />
                                    ) : null}
                                  </div>
                                  <div>
                                    <TDInputTemplate
                                      placeholder="Type contact person primary phone..."
                                      type="text"
                                      label="Contact person primary phone no."
                                      name={`dynamicFields[${index}].poc_ph_1`}
                                      formControlName={field.poc_ph_1}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      mode={1}
                                    />
                                    {errors.dynamicFields?.[index]?.poc_ph_1 && touched.dynamicFields?.[index]?.poc_ph_1 ? (
                                      <VError title={errors.dynamicFields[index].poc_ph_1} />
                                    ) : null}
                                  </div>
                                  <div>
                                    <TDInputTemplate
                                      placeholder="Type contact secondary person phone..."
                                      type="text"
                                      label="Contact person secondary phone no."
                                      name={`dynamicFields[${index}].poc_ph_2`}
                                      formControlName={field.poc_ph_2}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      mode={1}
                                    />
                                    {errors.dynamicFields?.[index]?.poc_ph_2 && touched.dynamicFields?.[index]?.poc_ph_2 ? (
                                      <VError title={errors.dynamicFields[index].poc_ph_2} />
                                    ) : null}
                                  </div>
                                  <div className="sm:col-span-2">
                                    <TDInputTemplate
                                      placeholder="Type contact person email..."
                                      type="text"
                                      label="Contact person email"
                                      name={`dynamicFields[${index}].poc_email`}
                                      formControlName={field.poc_email}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      mode={1}
                                    />
                                    {errors.dynamicFields?.[index]?.poc_email && touched.dynamicFields?.[index]?.poc_email ? (
                                      <VError title={errors.dynamicFields[index].poc_email} />
                                    ) : null}
                                  </div>
                                </React.Fragment>
                              ))}
                              {/* <div className="sm:col-span-2">
                          <Button type="dashed" onClick={() => push({ sl_no: 0, poc_name: "", poc_ph_1: "" })} icon={<PlusOutlined />}>
                            Add field
                          </Button>
                        </div> */}
                            </>
                          )}
                        </FieldArray>

                      </div>
                      <div className="flex pt-4 justify-start">
                                        {/* <Button className="inline-flex items-center px-5 py-5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900" onClick={() => stepperRef.current.prevCallback()}>
                                            <ArrowLeftOutlined className='mr-2' />
                                            Back
                                        </Button> */}
                                        <BtnComp
                                            mode={params.id > 0 ? "E" : "A"}
                                        //   onReset={formik.handleReset}
                                        />
                                    </div>
                    {/* </StepperPanel> */}
                  {/* </Stepper> */}
                </div>
              </form>
            )}
          </Formik>
        </Spin>
      </div>
    </section>
  );
}

export default VendorForm;
