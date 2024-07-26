import React,{ useEffect, useState }from 'react'
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import VError from "../../../Components/VError";
import axios from "axios";
import { url } from "../../../Address/BaseUrl";
import { Message } from "../../../Components/Message";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AuditTrail from "../../../Components/AuditTrail";

function GstForm() {
  const params = useParams();
  const navigate=useNavigate()
  const [data,setData]=useState()
  const [loading, setLoading] = useState(false);
  const [count,setCount]=useState(0)

  var categories = [];
  const [cat, setCat] = useState([]);
  const initialValues = {
    cat_id: "",
    cgst_rate:"",
    sgst_rate:""
  };
  const [formValues, setValues] = useState(initialValues);
  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    axios
      .post(url + "/api/addgst", {
        gst_id: +params.id,
        user: localStorage.getItem("email"),
        cat_id: values.cat_id,
        cgst_rate: values.cgst_rate,
        sgst_rate: values.sgst_rate,
      })
      .then((res) => {
        setLoading(false);
        setCount(prev=>prev+1)
        if (res.data.suc > 0) {
          Message("success", res.data.msg);
          if (params.id == 0) formik.handleReset();
        } else {
          Message("error", res.data.msg);
        }
      }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});;;
  };
  const validationSchema = Yup.object({
    cat_id: Yup.string().required("Category is required"),
    cgst_rate:Yup.string().required("CGST Rate is required"),
    sgst_rate:Yup.string().required("SGST Rate is required"),
  });
  const formik = useFormik({
    initialValues: +params.id > 0 ? formValues : initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    setLoading(true);
    axios.post(url + "/api/getcategory", { id: 0}).then((res) => {
      setLoading(false);
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

      axios.post(url + "/api/getgst", { id: params.id }).then((res) => {
        console.log(res.data.msg);
        setData(res.data?.msg)
        setLoading(false);
        setValues({
          cat_id: res?.data?.msg.category_id,
          cgst_rate: res?.data?.msg.cgst_rate,
          sgst_rate: res?.data?.msg.sgst_rate,
        });
      });
    }
  }, [count]);
  return (
    <section  className="bg-transparent dark:bg-[#001529]">
          <HeadingTemplate
              text={params.id > 0 ? "Update GST" : "Add GST"}
              mode={params.id>0?1:0}
              title={'GST'}
              data={params.id && data?data:''}
            />
          <div className="w-full bg-white p-6 rounded-2xl">
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
                  placeholder="Select category..."
                  type="text"
                  label="Category"
                  name="cat_id"
                  formControlName={formik.values.cat_id}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  data={cat}
                  mode={2}
                  // disabled={params.id > 0}
                />
                {formik.errors.cat_id && formik.touched.cat_id ? (
                  <VError title={formik.errors.cat_id} />
                ) : null}
              </div>
              <div className="sm:col-span-2 mb-2">
                <TDInputTemplate
                  placeholder="Type CGST Rate"
                  type="text"
                  label="CGST Rate"
                  name="cgst_rate"
                  formControlName={formik.values.cgst_rate}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />
                {formik.errors.cgst_rate && formik.touched.cgst_rate ? (
                  <VError title={formik.errors.cgst_rate} />
                ) : null}
              </div>
              <div className="sm:col-span-2 mb-2">
                <TDInputTemplate
                  placeholder="Type SGST Rate"
                  type="text"
                  label="CGST Rate"
                  name="sgst_rate"
                  formControlName={formik.values.sgst_rate}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.sgst_rate && formik.touched.sgst_rate ? (
                  <VError title={formik.errors.sgst_rate} />
                ) : null}
              </div>
          
              { params.id>0 && <AuditTrail data={data}/>}
            </div>
            <BtnComp
              mode={params.id > 0 ? "E" : "A"}
              onReset={formik.handleReset}
            />
          </form>
        </Spin>
      </div>
    </section>
  )
}

export default GstForm