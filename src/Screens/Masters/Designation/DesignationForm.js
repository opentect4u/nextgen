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
import DialogBox from "../../../Components/DialogBox";
import { useNavigate } from "react-router-dom";
import PrintComp from "../../../Components/PrintComp";
function DesignationForm() {
    const [loading,setLoading] =useState(false)
    const [visible,setVisible]=useState(false)
    const [count,setCount]=useState(0)
    const [data,setData]=useState()
    const navigate=useNavigate()
    const [flag,setFlag]=useState(4)
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
          setData(res.data?.msg)

          setLoading(false)
          setValues({desig_nm:res.data.msg.desig_name})
            
        })
      }
        },[count])
        const onDelete=()=>{
          console.log(params.id)
          setVisible(true)
        }
        const deleteItem=()=>{
          console.log(params.id)
          setVisible(false)
          setLoading(true)
          axios.post(url+'/api/deletedesig',{id:params.id,user:localStorage.getItem('email')}).then(res=>{
            console.log(res)
            setLoading(false)
            if(res.data.suc>0){
              Message('success',res.data.msg)
              navigate(-1)
            }
            else{
              Message('error',res.data.msg)
  
            }
          })
        }
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
           {params.id>0 && data && <PrintComp toPrint={data} title={'Designation'}/>}
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
                <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
         Created By
      </label>
              <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.created_by}/>
            </div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
         Created At
      </label>
              <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.created_at?.split('T').join( ' ')}/>
            </div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
         Modified By
      </label>
              <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.modified_by}/>
            </div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
       Modified at
      </label>
              <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.modified_at?.split('T').join( ' ')}/>
            </div>
              </div>
              <BtnComp mode={params.id>0?'E':'A'} onDelete={()=>onDelete()} onReset={formik.handleReset}/>
            </form>
            </Spin>
          </div>
          <DialogBox
        visible={visible}
        flag={flag}
        onPress={() => setVisible(false)}
        onDelete={()=>deleteItem()}
      />
        </section>
      );
}

export default DesignationForm
