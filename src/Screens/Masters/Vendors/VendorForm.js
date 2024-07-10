import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import VError from "../../../Components/VError";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { url } from "../../../Address/BaseUrl";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
function VendorForm() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    v_name: "",
    v_email: "",
    v_contact: "",
    v_phone: "",
    v_gst: "",
    v_pan: "",
    v_reg: "",
    v_remarks: "",
    v_address: "",
  };
  const validationSchema = Yup.object({
    v_name: Yup.string().required("Name is required"),
    v_email: Yup.string()
      .required("Email is required")
      .email("Incorrect email format"),
    v_contact: Yup.string().required("Contact person is required"),
    v_phone: Yup.string().required("Phone is required").length(10),
    v_address: Yup.string().required("Address is required"),
    v_pan:Yup.string().matches("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
    v_gst:Yup.string().matches("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9A-Z]{1}$")
  });

  const [formValues, setValues] = useState(initialValues);
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
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Type name..."
                  type="text"
                  label="Vendor name"
                  name="v_name"
                  formControlName={formik.values.v_name}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
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
                  formControlName={formik.values.v_email}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.v_email && formik.touched.v_email ? (
                  <VError title={formik.errors.v_email} />
                ) : null}
              </div>

              <div className="w-full">
                <TDInputTemplate
                  placeholder="Type contact person name..."
                  type="text"
                  label="Contact person name"
                  name="v_contact"
                  formControlName={formik.values.v_contact}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
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
                  formControlName={formik.values.v_phone}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.v_phone && formik.touched.v_phone ? (
                  <VError title={formik.errors.v_phone} />
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
                      formControlName={formik.values.v_gst}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      mode={1}
                    />

                    {formik.errors.v_gst && formik.touched.v_gst ? (
                      <VError title={formik.errors.v_gst} />
                    ) : null}
                  </div>
                  <div className="sm:col-span-1">
                    <TDInputTemplate
                      placeholder="Type PAN..."
                      type="text"
                      label="PAN"
                      name="v_pan"
                      formControlName={formik.values.v_pan}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      mode={1}
                    />

                    {formik.errors.v_pan && formik.touched.v_pan ? (
                      <VError title={formik.errors.v_pan} />
                    ) : null}
                  </div>
                  <div className="sm:col-span-1">
                    <TDInputTemplate
                      placeholder="Type registration. no. ..."
                      type="text"
                      label="Registration no."
                      name="v_reg"
                      formControlName={formik.values.v_reg}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      mode={1}
                    />

                    {formik.errors.v_reg && formik.touched.v_reg ? (
                      <VError title={formik.errors.v_reg} />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Lorem Ipsum Dolor Sit..."
                  type="text"
                  label="Deals in"
                  name="v_remarks"
                  formControlName={formik.values.v_remarks}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={3}
                />

                {formik.errors.v_remarks && formik.touched.v_remarks ? (
                  <VError title={formik.errors.v_remarks} />
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Type vendor address here..."
                  type="text"
                  label="Address"
                  name="v_address"
                  formControlName={formik.values.v_address}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={3}
                />

                {formik.errors.v_address && formik.touched.v_address ? (
                  <VError title={formik.errors.v_address} />
                ) : null}
              </div>
            </div>
            <BtnComp
              mode={params.id > 0 ? "E" : "A"}
              onReset={formik.handleReset}
            />
          </form>
        </Spin>
      </div>
    </section>
  );
}

export default VendorForm;
