import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import VError from "../../../Components/VError";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Message } from "../../../Components/Message";
import axios from "axios";
import { url } from "../../../Address/BaseUrl";
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import DialogBox from "../../../Components/DialogBox";
import { useNavigate } from 'react-router-dom';
import PrintComp from "../../../Components/PrintComp";
import AuditTrail from "../../../Components/AuditTrail";

function DeptForm() {
    const params = useParams();
  const [loading,setLoading]=useState(false)
  const [visible,setVisible]=useState(false)
  const [count,setCount]=useState(0)
  const [data,setData]=useState()
  const navigate=useNavigate()
  const [flag,setFlag]=useState(4)
    const initialValues = {
        dept_nm: "",
      };
      const [formValues,setValues] = useState(initialValues)
      useEffect(()=>{
        if(+params.id>0){
          setLoading(true)
            axios.post(url+'/api/getdept',{id:params.id})
            .then(res=>{
          console.log(res.data.msg.dept_name)
          setData(res.data?.msg)
          setLoading(false)
          setValues({dept_nm:res.data.msg.dept_name})
          
        }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});;
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
        axios.post(url+'/api/deletedept',{id:params.id,user:localStorage.getItem('email')})
        .then(res=>{
          console.log(res)
          setLoading(false)
          if(res.data.suc>0){
            Message('success',res.data.msg)
            navigate(-1)
          }
          else{
            Message('error',res.data.msg)

          }
        }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});;
      }
      const onSubmit = (values) => {
        setLoading(true)
        setCount(prev=>prev+1)
        axios.post(url+'/api/adddept',{id:+params.id,name:values.dept_nm,user:localStorage.getItem('email')})
        .then(res=>{
            setLoading(false)
    
            if(res.data.suc>0){
              Message('success',res.data.msg)
              setCount(prev=>prev+1)
              if(params.id==0)
                formik.handleReset()
              
            }
            else{
              Message('error',res.data.msg)
      
            }
          }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});;
      };
      const validationSchema = Yup.object({
        dept_nm: Yup.string().required("Department name is required"),
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
              text={params.id > 0 ? "Update department" : "Add department"}
              mode={params.id>0?1:0}
              title={'Department'}
              data={params.id && data?data:''}
            />
          <div className="w-full bg-white p-6 rounded-2xl">
           
            <Spin indicator={<LoadingOutlined spin />} size="large" className="text-green-900 dark:text-gray-400" spinning={loading}>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  
                  <TDInputTemplate
                    placeholder="Type Department name..."
                    type="text"
                    label="Department name"
                    name="dept_nm"
                    formControlName={formik.values.dept_nm}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    mode={1}
                  />
    
                  {formik.errors.dept_nm && formik.touched.dept_nm ? (
                    <VError title={formik.errors.dept_nm} />
                  ) : null}
                </div>
            { params.id>0 && <AuditTrail data={data}/>}
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

export default DeptForm
