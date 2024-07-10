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
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
function DesignationForm() {
    const [loading,setLoading] =useState(false)
    const params = useParams();
    const initialValues = {
        desig_nm: "",
      };
      const [formValues,setValues] = useState(initialValues)
      useEffect(()=>{
        if(+params.id>0){
        setLoading(true)

            axios.post(url+'/api/getdesig',{id:params.id}).then(res=>{
          console.log(res.data.msg.desig_name)
          setLoading(false)
          setValues({desig_nm:res.data.msg.desig_name})
            
        })
      }
        },[])
      const onSubmit = (values) => {
        console.log(values);
        setLoading(true)
        axios.post(url+'/api/adddesig',{id:+params.id,name:values.desig_nm,user:localStorage.getItem('email')}).then(res=>{
          setLoading(false)
            if(res.data.suc>0){
              Message('success',res.data.msg)
              if(params.id==0)
                formik.handleReset()
            }
            else{
              Message('error',res.data.msg)
      
            }

          })
      };
      const validationSchema = Yup.object({
        desig_nm: Yup.string().required("Designation is required"),
      });
    
      const formik = useFormik({
        initialValues:(+params.id>0?formValues:initialValues),
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize:true
      });
      return (
        <section className="bg-white dark:bg-[#001529]">
          <div className="py-8 mx-auto w-5/6 lg:py-16">
            <HeadingTemplate
              text={params.id > 0 ? "Update designation" : "Add designation"}
            />
             <Spin indicator={<LoadingOutlined spin />} size="large" className="text-green-900 dark:text-gray-400" spinning={loading}>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  
                  <TDInputTemplate
                    placeholder="Type designation..."
                    type="text"
                    label="Designation"
                    name="desig_nm"
                    formControlName={formik.values.desig_nm}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    mode={1}
                  />
    
                  {formik.errors.desig_nm && formik.touched.desig_nm ? (
                    <VError title={formik.errors.desig_nm} />
                  ) : null}
                </div>
              </div>
              <BtnComp mode={params.id>0?'E':'A'} onReset={formik.handleReset}/>
            </form>
            </Spin>
          </div>
        </section>
      );
}

export default DesignationForm
