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
import { useNavigate } from 'react-router-dom';
import DialogBox from "../../../Components/DialogBox";
import PrintComp from "../../../Components/PrintComp";

const CategoryForm = () => {
  const params = useParams();
  const [loading,setLoading]=useState(false)
  const [visible,setVisible]=useState(false)
  const [data,setData]=useState()
  const [count,setCount]=useState(0)

  const navigate=useNavigate()
  const [flag,setFlag]=useState(4)
  const initialValues = {
    catnm: "",
  };
  const [formValues,setValues] = useState(initialValues)
  var result;
   useEffect(()=>{
    if(+params.id>0){
      setLoading(true)
        axios.post(url+'/api/getcategory',{id:params.id}).then(res=>{
      console.log(res.data.msg.catg_name)
      setData(res.data?.msg)
      setLoading(false)
      setValues({catnm:res.data.msg.catg_name})
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
  }
    },[count])
  const onSubmit = (values) => {
    console.log(values);
    setLoading(true)
    axios.post(url+'/api/addcategory',{id:+params.id,name:values.catnm,user:localStorage.getItem('email')}).then(res=>{
      setLoading(false)
      if(res.data.suc>0){
        Message('success',res.data.msg)
        if(params.id==0)
          formik.handleReset()
          setCount(prev=>prev+1)
      }
      else{
        Message('error',res.data.msg)

      }
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
    
    console.log(result)
  };
  const onDelete=()=>{
    console.log(params.id)
    setVisible(true)
  }
  const deleteItem=()=>{
    setLoading(true)
    console.log(params.id)
    setVisible(false)
    axios.post(url+'/api/deletecategory',{id:params.id,user:localStorage.getItem('email')}).then(res=>{
      console.log(res)
      setLoading(false)
      if(res.data.suc>0){
        Message('success',res.data.msg)
        navigate(-1)
      }
      else{
        Message('error',res.data.msg)

      }
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
  }
  const validationSchema = Yup.object({
    catnm: Yup.string().required("Category name is required"),
  });
  const formik = useFormik({
    initialValues:(+params.id>0?formValues:initialValues),
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize:true
  });
  return (
    <section  className="bg-transparent dark:bg-[#001529]">
          {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
          <HeadingTemplate
              text={params.id > 0 ? "Update category" : "Add category"}
              mode={params.id>0?1:0}
              title={'Category'}
              data={params.id && data?data:''}
            />
          <div className="w-full bg-white p-6 rounded-2xl">
          <Spin indicator={<LoadingOutlined spin />} size="large" className="text-green-900 dark:text-gray-400" spinning={loading}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              
              <TDInputTemplate
                placeholder="Type category name..."
                type="text"
                label="Category name"
                name="catnm"
                formControlName={formik.values.catnm}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                mode={1}
              />

              {formik.errors.catnm && formik.touched.catnm ? (
                <VError title={formik.errors.catnm} />
              ) : null}
            </div>
            { params.id>0 &&   <>
                <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100">
         Created By
      </label>
              <input  className="bg-bg-white border border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.created_by}/>
            </div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100">
         Created At
      </label>
              <input  className="bg-bg-white border border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.created_at?.split('T').join( ' ')}/>
            </div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100">
         Modified By
      </label>
              <input  className="bg-bg-white border border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.modified_by}/>
            </div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-emerald-500 dark:text-gray-100">
       Modified at
      </label>
              <input  className="bg-bg-white border border-green-500 text-gray-800 text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" disabled={true} value={data?.modified_at?.split('T').join( ' ')}/>
            </div>
              </>}
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
};

export default CategoryForm;
