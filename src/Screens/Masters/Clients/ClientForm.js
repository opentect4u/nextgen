import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { useFormik, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import VError from "../../../Components/VError";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { url } from "../../../Address/BaseUrl";
import { Message } from "../../../Components/Message";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import AuditTrail from "../../../Components/AuditTrail";

function ClientForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const params = useParams();
  console.log(params, "params");
  const [data, setData] = useState();
  const [formValues, setValues] = useState({
    clnt_name: "",
    clnt_email: "",
    clnt_phn: "",
    gst: "",
    pan: "",
    reg_no: "",
    dynamicFields: [
      {
        sl_no: 0,
        poc_name: "",
        poc_designation: "",
        poc_department: "",
        poc_email: "",
        poc_direct_no: "",
        poc_ext_no: "",
        poc_ph_1: "",
        poc_ph_2: "",
        poc_location: "",
        poc_address: "",
      },
    ],
  });

  const initialValues = {
    clnt_name: "",
    clnt_email: "",
    clnt_phn: "",
    gst: "",
    pan: "",
    reg_no: "",
    dynamicFields: [
      {
        sl_no: params.id > 0 ? 0 : formValues.dynamicFields[0].sl_no,
        poc_name: "",
        poc_designation: "",
        poc_department: "",
        poc_email: "",
        poc_direct_no: "",
        poc_ext_no: "",
        poc_ph_1: "",
        poc_ph_2: "",
        poc_location: "",
        poc_address: "",
      },
    ],
  };

  const onSubmit = (values) => {
    console.log("onSubmit");
    setLoading(true);
    console.log(values);
    axios
      .post(url + "/api/addclient", {
        c_id: +params.id,
        user: localStorage.getItem("email"),
        c_name: values.clnt_name,
        c_phone: values.clnt_phn.toString(),
        c_email: values.clnt_email,
        // c_location: values.poc_location,
        // c_address: values.poc_address,
        c_gst: values.gst,
        c_pan: values.pan,
        c_reg: values.reg_no,
        c_poc: values.dynamicFields,
      })
      .then((res) => {
        setLoading(false);
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
  const validationSchema = Yup.object({
    clnt_name: Yup.string().required("Client's name is required"),
    clnt_email: Yup.string().required("Client's email is required"),
    clnt_phn: Yup.string().required("Client's phone no. is required"),
    // poc_location: Yup.string().required("Client location is required"),
    // poc_address: Yup.string().required("Delivery address is required"),
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
        poc_address: Yup.string().optional(),
        poc_location: Yup.string().optional(),
      })
    ),
  });

  // const formik = useFormik({
  //     initialValues: +params.id > 0 ? formValues : initialValues,
  //     onSubmit,
  //     validationSchema,
  //     validateOnMount: true,
  //     enableReinitialize: true
  // });
  useEffect(() => {
    if (+params.id > 0) {
      setLoading(true);
      axios
        .post(url + "/api/getclient", { id: params.id })
        .then((res) => {
          console.log(res.data.msg, "getclient show");
          setData(res.data?.msg);
          setLoading(false);
          setValues({
            ...initialValues,
            clnt_name: res.data.msg.client_name,
            clnt_email: res.data.msg.client_email,
            clnt_phn: res.data.msg.client_phone,
            // poc_location: res?.data?.msg.client_location,
            // poc_address: res?.data?.msg.client_address,
            gst: res?.data?.msg.client_gst,
            pan: res?.data?.msg.client_pan,
            reg_no: res?.data?.msg.client_reg,
          });
        })
        .catch((err) => {
          console.log(err);
          navigate("/error" + "/" + err.code + "/" + err.message);
        });
      axios
        .post(url + "/api/getclientpoc", {
          id: params.id,
        })
        .then((res) => {
          setLoading(false);
          console.log(res.data.msg[0], "res");
          setValues((prevValues) => ({
            ...prevValues,
            dynamicFields: res.data.msg.map((item, index) => ({
              sl_no: item.sl_no,
              poc_name: item.poc_name,
              poc_designation: item.poc_designation,
              poc_department: item.poc_department,
              poc_email: item.poc_email,
              poc_direct_no: item.poc_direct_no,
              poc_ext_no: item.poc_ext_no,
              poc_ph_1: item.poc_ph_1,
              poc_ph_2: item.poc_ph_2,
              poc_location: item.poc_location,
              poc_address: item.poc_address,
            })),
          }));
        })
        .catch((err) => {
          console.log(err);
          navigate("/error" + "/" + err.code + "/" + err.message);
        });
    }
    console.log(formValues, "formValues");
    console.log(params.id, "params.id");
  }, [params.id]);
  return (
    <section className="bg-transparent dark:bg-[#001529]">
      {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
      <HeadingTemplate
        text={params.id > 0 ? "Update client" : "Add client"}
        mode={params.id > 0 ? 1 : 0}
        title={"Client"}
        data={params.id && data ? data : ""}
      />
      <div className="w-full bg-white p-6 rounded-2xl">
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="text-green-900 dark:text-gray-400"
          spinning={loading}
        >
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
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Type user name..."
                      type="text"
                      label="Client name"
                      name="clnt_name"
                      formControlName={values.clnt_name}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.clnt_name && touched.clnt_name && (
                      <VError title={errors.clnt_name} />
                    )}
                  </div>
                  <div className="w-full">
                    <TDInputTemplate
                      placeholder="Type client's email..."
                      type="text"
                      label="Email"
                      name="clnt_email"
                      formControlName={values.clnt_email}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.clnt_email && touched.clnt_email && (
                      <VError title={errors.clnt_email} />
                    )}
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="+91 123-456-7890"
                      type="number"
                      label="Phone No."
                      name="clnt_phn"
                      formControlName={values.clnt_phn}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.clnt_phn && touched.clnt_phn && (
                      <VError title={errors.clnt_phn} />
                    )}
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type GST"
                      type="text"
                      label="GST"
                      name="gst"
                      formControlName={values.gst}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.gst && touched.gst && <VError title={errors.gst} />}
                  </div>
                  <div>
                    <TDInputTemplate
                      placeholder="Type PAN"
                      type="text"
                      label="PAN"
                      name="pan"
                      formControlName={values.pan}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.pan && touched.pan && <VError title={errors.pan} />}
                  </div>
                  <div className="w-full sm:col-span-2">
                    <TDInputTemplate
                      placeholder="Type Reg No."
                      type="text"
                      label="Reg No."
                      name="reg_no"
                      formControlName={values.reg_no}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />
                    {errors.reg_no && touched.reg_no && (
                      <VError title={errors.reg_no} />
                    )}
                  </div>
                  <FieldArray name="dynamicFields">
                    
                    {({ push, remove, insert }) => (
                      <>
                      
                        {values.dynamicFields.map((field, index) => (
                          <React.Fragment key={index}>
                            <div className="sm:col-span-2 flex gap-2 justify-end">
                            <Button
                              className="rounded-full text-white bg-red-800 border-red-800"
                              onClick={() => remove(index)}
                              icon={<MinusOutlined />}
                            ></Button>

                            <Button
                              className="rounded-full bg-green-900 text-white"
                              onClick={() =>
                                insert({
                                  sl_no: 0,
                                  poc_name: "",
                                  poc_designation: "",
                                  poc_department: "",
                                  poc_email: "",
                                  poc_direct_no: "",
                                  poc_ext_no: "",
                                  poc_ph_1: "",
                                  poc_ph_2: "",
                                  poc_location: "",
                                  poc_address: "",
                                })
                              }
                              icon={<PlusOutlined />}
                            ></Button>

                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type the name of Contact Person..."
                                type="text"
                                label="Contact Person"
                                name={`dynamicFields[${index}].poc_name`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_name || ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type POC Designation..."
                                type="text"
                                label="POC Designation"
                                name={`dynamicFields[${index}].poc_designation`}
                                formControlName={
                                  values.dynamicFields[index]
                                    ?.poc_designation || ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                              {/* {formik.errors.dynamicFields && formik.errors.dynamicFields[index] && formik.errors.dynamicFields[index].designation && formik.touched.dynamicFields && formik.touched.dynamicFields[index] && formik.touched.dynamicFields[index].designation ? (
                                                        <VError title={formik.errors.dynamicFields[index].designation} />
                                                    ) : null} */}
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type POC department..."
                                type="text"
                                label="POC Department"
                                name={`dynamicFields[${index}].poc_department`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_department ||
                                  ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                              {/* {formik.errors.dynamicFields && formik.errors.dynamicFields[index] && formik.errors.dynamicFields[index].designation && formik.touched.dynamicFields && formik.touched.dynamicFields[index] && formik.touched.dynamicFields[index].designation ? (
                                                        <VError title={formik.errors.dynamicFields[index].designation} />
                                                    ) : null} */}
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type POC Email..."
                                type="text"
                                label="POC Email"
                                name={`dynamicFields[${index}].poc_email`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_email || ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type POC Direct No."
                                type="text"
                                label="POC Direct No"
                                name={`dynamicFields[${index}].poc_direct_no`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_direct_no ||
                                  ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type POC Extension No."
                                type="text"
                                label="POC Extension No"
                                name={`dynamicFields[${index}].poc_ext_no`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_ext_no || ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type POC Primary Phone No."
                                type="text"
                                label="POC Primary Phone No."
                                name={`dynamicFields[${index}].poc_ph_1`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_ph_1 || ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type POC Secondary Phone No."
                                type="text"
                                label="POC Secondary Phone No."
                                name={`dynamicFields[${index}].poc_ph_2`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_ph_2 || ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={1}
                              />
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type Client Location..."
                                type="text"
                                label="Client Location"
                                name={`dynamicFields[${index}].poc_location`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_location ||
                                  ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={3}
                              />
                              {/* {formik.errors.clnt_loc && formik.touched.clnt_loc ? (
                                            <VError title={formik.errors.clnt_loc} />
                                        ) : null} */}
                            </div>
                            <div>
                              <TDInputTemplate
                                placeholder="Type Delivery Address..."
                                type="text"
                                label="Delivery Address"
                                name={`dynamicFields[${index}].poc_address`}
                                formControlName={
                                  values.dynamicFields[index]?.poc_address || ""
                                }
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                mode={3}
                              />
                              {/* {formik.errors.delvry_add && formik.touched.delvry_add ? (
                                            <VError title={formik.errors.delvry_add} />
                                        ) : null} */}
                            </div>
                            
                           
                          </React.Fragment>
                        ))}
                        {/* <div className="sm:col-span-2">
                                                <Button
                                                 className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                                                    onClick={() => push({ sl_no: 0, poc_name: "", poc_designation: "", poc_department: "", poc_email: "", poc_direct_no: "", poc_ext_no: "", poc_ph_1: "", poc_ph_2: "", poc_location: "", poc_address: "" })}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add field
                                                </Button>
                                            </div> */}
                      </>
                    )}
                  </FieldArray>
                  {params.id > 0 && <AuditTrail data={data}/>}
                </div>
                <BtnComp mode={params.id > 0 ? "E" : "A"} />
              </form>
            )}
          </Formik>
        </Spin>
      </div>
    </section>
  );
}

export default ClientForm;
