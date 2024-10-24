import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BtnComp from "../../Components/BtnComp";
import VError from "../../Components/VError";
import TDInputTemplate from "../../Components/TDInputTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Message } from "../../Components/Message";
import { url } from "../../Address/BaseUrl";
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import DialogBox from "../../Components/DialogBox";

function UnitMaster({onClose,onLoading}) {
  const params = useParams();
  const [loading,setLoading]=useState(false)
  const [visible,setVisible]=useState(false)
  const [count,setCount]=useState(0)
  const [data,setData]=useState()
  const navigate=useNavigate()
  const [flag,setFlag]=useState(4)
  const initialValues = {
    u_nm: "",
  };
  const [formValues, setValues] = useState(initialValues);
  useEffect(()=>{onLoading(loading)},[loading])
  const onSubmit = (values) => {
    setLoading(true)
    console.log(values);
    axios
      .post(url + "/api/addunit", {
        id: 0,
        name: values.u_nm,
        user: localStorage.getItem("email"),
      })
      .then((res) => {
        setLoading(false)
        if (res.data.suc > 0) {
          Message("success", res.data.msg);
          setCount(prev=>prev+1)
            onClose()
            formik.handleReset();
        } else {
          Message("error", res.data.msg);
        }
      }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
  };
  const validationSchema = Yup.object({
    u_nm: Yup.string().required("Unit name is required"),
  });
  const onDelete=()=>{
    console.log(params.id)
    setVisible(true)
  }
  const deleteItem=()=>{
    console.log(params.id)
    setVisible(false)
    setLoading(true)
    axios.post(url+'/api/deleteunit',{id:params.id,user:localStorage.getItem('email')}).then(res=>{
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
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <section  className="bg-transparent dark:bg-[#001529]">
          {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
          {/* <HeadingTemplate
              text={params.id > 0 ? "Update unit" : "Add unit"}
              mode={params.id>0?1:0}
              title={'Unit'}
              data={params.id && data?data:''}
            /> */}
             <h2 className="text-2xl text-green-900 font-bold my-3">
            Add Unit
          </h2>
          <div className="w-full bg-white p-6 rounded-2xl">
           
        <Spin indicator={<LoadingOutlined spin />} size="large" className="text-green-900 dark:text-gray-400" spinning={loading}>   
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <TDInputTemplate
                placeholder="Type Unit name..."
                type="text"
                label="Unit name"
                name="u_nm"
                formControlName={formik.values.u_nm}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                mode={1}
              />

              {formik.errors.u_nm && formik.touched.u_nm ? (
                <VError title={formik.errors.u_nm} />
              ) : null}
            </div>
          </div>
          <BtnComp
            mode={"A"}
            onReset={formik.handleReset}
            onDelete={()=>onDelete()}
            
          />
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

export default UnitMaster
