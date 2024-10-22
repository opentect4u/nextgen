import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import BtnComp from "../../../Components/BtnComp";
import { useFormik } from "formik";
import * as Yup from "yup";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import VError from "../../../Components/VError";
import { url } from "../../../Address/BaseUrl";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AuditTrail from "../../../Components/AuditTrail";
import DialogBox from "../../../Components/DialogBox";
import DrawerComp from "../../../Components/DrawerComp";
const UserAddForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const [desig, setDesig] = useState([]);
  const [active_flag, setActiveFlag] = useState("");
  const [dept, setDept] = useState([]);
  const [data,setData]=useState()
  const [count,setCount]=useState(0)
  const [reason,setReason]=useState("")
  const [visible,setVisible]=useState(false)
  const [types,setTypes] = useState([])
  var designations = [];
  var departments = [];
  const initialValues = {
    user_name: "",
    user_designation: "",
    user_type: "",
    user_email: "",
    user_phone: "",
    // user_permission: "",
    user_dept: "",
    user_location: "",
  };
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0);
  const onClose = () => {
    setOpen(false);
  }
  useEffect(()=>{
    axios.post(url+'/api/user_type',{id:0}).then(res=>{
      console.log(res)
      setTypes([])
      for(let i of res?.data?.msg){
        types.push({
          name:i.user_type,
          code:i.sl_no
        })
      }
      setTypes(types)
    })
  },[])
  const onSubmit = (values) => {
    setLoading(true)
    console.log(values);
    axios
      .post(url + "/api/adduser", {
        u_id: +params.id,
        user: localStorage.getItem("email"),
        u_name: values.user_name,
        u_phone: values.user_phone.toString(),
        u_email: values.user_email,
        u_type: values.user_type,
        u_desig: values.user_designation,
        u_dept: values.user_dept,
        // u_permission: values.user_permission,
        u_loc: values.user_location,
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
      }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
  };
  const [formValues, setValues] = useState(initialValues);
  useEffect(() => {
    setLoading(true);

    axios.post(url + "/api/getdesig", { id: 0 })
    .then((res) => {
      setLoading(false);

      for (let i = 0; i < res?.data?.msg?.length; i++) {
        designations.push({
          code: res?.data?.msg[i]?.sl_no,
          name: res?.data?.msg[i]?.desig_name,
        });
      }
      setDesig(designations)
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
    setLoading(true);
    axios.post(url + "/api/getdept", { id: 0 })
    .then((res) => {
      setLoading(false);

      for (let i = 0; i < res?.data?.msg?.length; i++) {
        departments.push({
          code: res?.data?.msg[i]?.sl_no,
          name: res?.data?.msg[i]?.dept_name,
        });
      }
      setDept(departments)
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
    if(params.id>0){
    setLoading(true)
    axios.post(url + "/api/getuser", { id: params.id })
    .then((res) => {
      console.log(res.data.msg);
      setData(res.data?.msg)
      setActiveFlag(res?.data?.msg?.active_flag)
      setLoading(false);
      setValues({
        user_name: res?.data?.msg?.user_name,
        user_phone: res?.data?.msg?.user_phone,
        user_email: res?.data?.msg?.user_email,
        user_type: res?.data?.msg?.user_type,
        user_designation: res?.data?.msg?.user_desig,
        user_dept: res?.data?.msg?.user_dept,
        // user_permission: res?.data?.msg?.user_permission,
        user_location: res?.data?.msg?.user_location,
      });
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});;;
  }
  }, [count]);

  const activate = (status,reason)=>{
    setVisible(false)
    setLoading(true)
    axios.post(url+'/api/activate_user',{id:+params.id,user:localStorage.getItem('email'),status:status,reason:reason}).then(res=>{

      setLoading(false)
      
      if (res.data.suc > 0) {
        Message("success", res.data.msg);
       navigate(-1)
      } else {
        Message("error", res.data.msg);
      }

    })
  }
  const validationSchema = Yup.object({
    user_name: Yup.string().required("Name is required"),
    user_designation: Yup.string().required("Designation is required"),
    user_type: Yup.string().required("Type is required"),
    user_email: Yup.string()
      .required("Email Id is required")
      .email("Incorrect email format"),
    user_phone: Yup.string().length(10),
    user_dept: Yup.string().required("Department is required"),
    user_location: Yup.string().required("Location is required"),
  });
  //  console.log(formValues)
  const formik = useFormik({
    initialValues: +params.id > 0 ? formValues : initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <section  className="bg-transparent dark:bg-[#001529]">
        <HeadingTemplate
          text={params.id > 0 ? "Update company user" : "Add company user"}
          mode={params.id>0?1:0}
          title={'Product'}
          data={params.id && data?data:''}
        />
      <div  className="w-full bg-white p-6 rounded-2xl">

 <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="text-green-900 dark:text-gray-400"
          spinning={loading}
        >
       
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          
            <div className="sm:col-span-2 mb-2">
              <TDInputTemplate
                placeholder="Type user name..."
                type="text"
                label="User name"
                name="user_name"
                formControlName={formik.values.user_name}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                mode={1}
              />

              {formik.errors.user_name && formik.touched.user_name ? (
                <VError title={formik.errors.user_name} />
              ) : null}
            </div>
            <div className="w-full">
              <TDInputTemplate
                placeholder="Select designation"
                type="text"
                label="Designation"
                name="user_designation"
                formControlName={formik.values.user_designation}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                mode={2}
                data={desig}
              />
              {formik.errors.user_designation &&
              formik.touched.user_designation ? (
                <VError title={formik.errors.user_designation} />
              ) : null}
            </div>
            <div>
              <TDInputTemplate
                placeholder="Select type"
                type="text"
                label="Type"
                name="user_type"
                formControlName={formik.values.user_type}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                // data={[
                //   {
                //     code: "AD",
                //     name: "Admin",
                //   },
                //   {
                //     code: "PM",
                //     name: "Project Manager",
                //   },
                //   {
                //     code: "WM",
                //     name: "Warehouse Manager",
                //   },
                //   {
                //     code: "PuM",
                //     name: "Purchase Manager",
                //   },
                //   {
                //     code: "GU",
                //     name: "General User",
                //   },
                // ]}
                data={types}
                mode={2}
              />
              {formik.errors.user_type && formik.touched.user_type ? (
                <VError title={formik.errors.user_type} />
              ) : null}
            </div>
            <div className="w-full">
              <TDInputTemplate
                placeholder="Select department"
                type="text"
                label="Department"
                name="user_dept"
                formControlName={formik.values.user_dept}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                mode={2}
                data={dept}
              />
              {formik.errors.user_dept && formik.touched.user_dept ? (
                <VError title={formik.errors.user_dept} />
              ) : null}
            </div>
            <div>
              <TDInputTemplate
                placeholder="Select location"
                type="text"
                label="Location"
                name="user_location"
                formControlName={formik.values.user_location}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                data={[
                  {
                    code: "F",
                    name: "Factory",
                  },
                  {
                    code: "S",
                    name: "Site",
                  },
                  {
                    code: "O",
                    name: "Office",
                  },
                ]}
                mode={2}
              />
              {formik.errors.user_location && formik.touched.user_location ? (
                <VError title={formik.errors.user_location} />
              ) : null}
            </div>
            <div className="w-full">
              <TDInputTemplate
                placeholder="Type your email..."
                type="text"
                label="Email"
                name="user_email"
                formControlName={formik.values.user_email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                disabled={+params.id>0}
                mode={1}
              />
              {formik.errors.user_email && formik.touched.user_email ? (
                <VError title={formik.errors.user_email} />
              ) : null}
            </div>
            <div>
              <TDInputTemplate
                placeholder="+91 123-456-7890"
                type="number"
                label="Phone No."
                name="user_phone"
                formControlName={formik.values.user_phone}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                mode={1}
              />
              {formik.errors.user_phone && formik.touched.user_phone ? (
                <VError title={formik.errors.user_phone} />
              ) : null}
            </div>
            { params.id>0 && <AuditTrail data={data}/>}

            {/* <div className="sm:col-span-2">
              <TDInputTemplate
                placeholder="Select permission..."
                type="text"
                label="Permissions"
                name="user_permission"
                formControlName={formik.values.user_permission}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                data={[
                  {
                    code: "MA",
                    name: "Masters",
                  },
                  {
                    code: "PO",
                    name: "Purchase Orders",
                  },
                  {
                    code: "ST",
                    name: "Stocks",
                  },
                  {
                    code: "RP",
                    name: "Reports",
                  },
                ]}
                mode={2}
              />
              {formik.errors.user_permission &&
              formik.touched.user_permission ? (
                <VError title={formik.errors.user_permission} />
              ) : null}
            </div> */}
            
          </div>
          <BtnComp
            mode={params.id > 0 ? "E" : "A"}
            onReset={formik.handleReset}
          />
         <div className='flex justify-center w-1/4 mx-auto items-center my-4'>
         {active_flag=='N' &&  <button type="submit" onClick={()=>activate('Y','')}  className="text-white bg-green-900 hover:bg-
      green-900 w-1/4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm sm:w-full px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-blue-400">
        Activate
      </button>}
    
      
      </div>
        </form>
        <div className="flex justify-between w-1/3 mx-auto items-center">
        {active_flag=='Y' &&  <button type="submit" onClick={()=>setVisible(true)} className="text-white bg-red-900 hover:bg-
      red-900 w-1/4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm sm:w-full px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-blue-400">
        Deactivate/Block
      </button>}
      {params.id>0 &&  <button onClick={()=>{ 
                          setMode(9);
                          setOpen(true);
                      
                      }} className="text-white bg-green-500 hover:bg-
      red-900 w-1/6  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs sm:w-full px-6 py-3 text-center dark:bg-green-500 dark:hover:bg-green-700 text-nowrap dark:focus:ring-green-800 disabled:bg-blue-400 ml-2">
        Reset Pasword
      </button>}
      </div>
        </Spin>
      </div>
      <DialogBox
        visible={visible}
        flag={19}
        onPress={() => setVisible(false)}
        // onDelete={() => deleteItem()}
        onDeactivate={(values)=>{activate('N',values);console.log(values)}}
      />
      <DrawerComp open={open} flag={mode} onClose={() => onClose()} />

    </section>
  );
};

export default UserAddForm;
