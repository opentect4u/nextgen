import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import VError from "../../../Components/VError";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { useFormik,Formik,FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { url } from "../../../Address/BaseUrl";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

function VendorForm() {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    v_name: "",
    v_email: "",
    v_gst: "",
    v_pan: "",
    v_reg: "",
    v_remarks: "",
    v_address: "",
    dynamicFields: [{
      // sl_no: params.id>0?0:formValues.dynamicFields[0].sl_no,
      sl_no:0,v_contact: "",v_phone: "",
}]
  };
  const [formValues, setValues] = useState(initialValues);

  const validationSchema = Yup.object({
    v_name: Yup.string().required("Name is required"),
    v_email: Yup.string()
      .required("Email is required")
      .email("Incorrect email format"),
    v_address: Yup.string().required("Address is required"),
    // v_pan:Yup.string().matches("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
    v_pan:Yup.string(),
    // v_gst:Yup.string().matches("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$")
    v_gst:Yup.string(),
    v_remarks:Yup.string(),
    dynamicFields: Yup.array().of(
      Yup.object().shape({
        v_contact: Yup.string().required("Contact person is required"),
        v_phone: Yup.string().required("Phone is required").length(10),
      })
  )
  });

  useEffect(() => {
    if (+params.id > 0) {
      setLoading(true);

      axios.post(url + "/api/getvendor", { id: params.id }).then((res) => {
        console.log(res.data.msg.desig_name);
        setLoading(false);
        setValues({ 
          v_name: res.data.msg.vendor_name,
          v_email: res.data.msg.vendor_email,
          v_contact: res.data.msg.vendor_contact,
          v_phone: res.data.msg.vendor_phone,
          v_remarks: res.data.msg.vendor_remarks,
          v_gst: res.data.msg.vendor_gst,
          v_pan: res.data.msg.vendor_pan,
          v_reg: res.data.msg.vendor_reg,
          v_address: res.data.msg.vendor_address,
        
        });
      });
    }
  }, []);
  const onSubmit = (values) => {
    console.log(values);
    setLoading(true);
    axios
      .post(url + "/api/addvendor", {
        v_id: +params.id,
        user: localStorage.getItem("email"),
        v_name: values.v_name,
        v_email: values.v_email,
        v_contact: values.v_contact,
        v_phone: values.v_phone.toString(),
        v_gst: values.v_gst,
        v_pan: values.v_pan,
        v_reg: values.v_reg,
        v_remarks: values.v_remarks,
        v_address: values.v_address,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.suc > 0) {
          Message("success", res.data.msg);
          if (params.id == 0) formik.handleReset();
        } else {
          Message("error", res.data.msg);
        }
      });
  };
  const formik = useFormik({
    initialValues: +params.id > 0 ? formValues : initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  console.log(params, "params");
  return (
    <section className="bg-white dark:bg-[#001529]">
      <div className="py-8 mx-auto w-5/6 lg:py-16">
        <HeadingTemplate
          text={params.id > 0 ? "Update vendor" : "Add vendor"}
        />
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
          {({ values, handleChange, handleBlur,handleSubmit, errors, touched }) => (
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

                {formik.errors.v_name && formik.touched.v_name ? (
                  <VError title={formik.errors.v_name} />
                ) : null}
              </div>
              <div className="sm:col-span-2">
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

                {errors.v_email && touched.v_email ? (
                  <VError title={errors.v_email} />
                ) : null}
              </div>
              <div></div>
              <div className="sm:col-span-2 -mt-4">
                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                  <div className="sm:col-span-1">
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

                    {errors.v_gst && touched.v_gst ? (
                      <VError title={errors.v_gst} />
                    ) : null}
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

                    {errors.v_pan && touched.v_pan ? (
                      <VError title={errors.v_pan} />
                    ) : null}
                  </div>
                  <div className="sm:col-span-1">
                    <TDInputTemplate
                      placeholder="Type registration. no. ..."
                      type="text"
                      label="Registration no."
                      name="v_reg"
                      formControlName={values.v_reg}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      mode={1}
                    />

                    {errors.v_reg && touched.v_reg ? (
                      <VError title={errors.v_reg} />
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
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

                {errors.v_remarks && touched.v_remarks ? (
                  <VError title={errors.v_remarks} />
                ) : null}
              </div>
              <div>
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

                {errors.v_address && touched.v_address ? (
                  <VError title={errors.v_address} />
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Type Remarks here..."
                  type="text"
                  label="Remarks"
                  name="v_remarks"
                  formControlName={values.v_remarks}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  mode={3}
                />

                {errors.v_remarks && touched.v_remarks ? (
                  <VError title={errors.v_remarks} />
                ) : null}
              </div>
              <FieldArray name="dynamicFields">
                                    {({ push, remove }) => (
                                        <>
                                            {values.dynamicFields.map((field, index) => (
                                                <React.Fragment key={index}>
              <div className="w-full">
                <TDInputTemplate
                  placeholder="Type contact person name..."
                  type="text"
                  label="Contact person name"
                  name="v_contact"
                  formControlName={values.v_contact}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  mode={1}
                />

                {formik.errors.v_contact && formik.touched.v_contact ? (
                  <VError title={formik.errors.v_contact} />
                ) : null}
              </div>
              <div>
                <TDInputTemplate
                  placeholder="Type contact person phone..."
                  type="number"
                  label="Contact person phone no."
                  name="v_phone"
                  formControlName={values.v_phone}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  mode={1}
                />

                {errors.v_phone && touched.v_phone ? (
                  <VError title={errors.v_phone} />
                ) : null}
              </div>
              <div className="sm:col-span-2">
                                                        <MinusCircleOutlined onClick={() => remove(index)} />
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                            <div className="sm:col-span-2">
                                                <Button
                                                    type="dashed"
                                                    onClick={() => push({ sl_no: 0,v_contact:"",v_phone:"", })}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add field
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </FieldArray>
            </div>
            <BtnComp
              mode={params.id > 0 ? "E" : "A"}
              onReset={formik.handleReset}
            />
          </form>
          )}
          </Formik>
        </Spin>
      </div>
    </section>
  );
}

export default VendorForm;
