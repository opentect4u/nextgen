import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
import { url } from "../../Address/BaseUrl";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Viewdetails from "../Viewdetails";
import DialogBox from "../DialogBox";

// import { AutoComplete } from 'antd';
// import  { AutoCompleteProps } from 'antd';
import { AutoComplete } from "primereact/autocomplete";
function BasicDetails({ pressNext, pressBack, data }) {
  console.log(data)
  const params = useParams();
  const [projectList, setProjectList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorsList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(data.type);
  const [proj_name, setProjName] = useState(data.proj_name);
  const [order_id, setOrderId] = useState(data.order_id);
  const [order_date, setOrderDate] = useState(data.order_date);
  const [vendor_name,setVendorName]=useState(data.vendor_name)
  const [visible,setVisible]=useState(false)
  const [projectInfo,setProjectInfo]=useState([])
  const [vendorInfo,setVendorInfo]=useState([])
  const [pocList,setPoc]=useState([])
  const [deals,setDeals]=useState([])
  const [vendorPocList,setPocList]=useState([])
  const [flag,setFlag]=useState(0)
  const [val,setVal]=useState()
  console.log(params.id);
  const onSubmit = () => {
    console.log(type,proj_name,order_id,order_date,vendor_name);
    setVal({type:type,proj_name:proj_name,order_date:order_date,order_id:order_id,vendor_name:vendor_name});
    pressNext(val)
  };
 
  useEffect(() => {
    setLoading(true);
    axios.post(url + "/api/getproject", { id: 0 }).then((resProj) => {
      setProjects(resProj?.data?.msg);
      for (let i = 0; i < resProj?.data?.msg?.length; i++) {
        projectList.push({
          name: resProj?.data?.msg[i].proj_name,
          code: resProj?.data?.msg[i].sl_no,
        });
      }
      setProjectList(projectList);
      axios.post(url + "/api/getvendor", { id: 0 }).then((resVendor) => {
        setVendorList(resVendor?.data?.msg);
        setVendors(resVendor?.data?.msg)
        for (let i = 0; i < resVendor?.data?.msg?.length; i++) {
          vendorsList.push({
            name: resVendor?.data?.msg[i].vendor_name,
            code: resVendor?.data?.msg[i].sl_no,
          });
        }
      setVendorList(vendorsList);

      setLoading(false);
      })
    });
  }, []);
  const onSelectProject = (event) => {
    console.log(event.target.value)
    console.log(projects.filter((e) => e.sl_no == event.target.value))
    setProjectInfo(projects.filter((e) => e.sl_no == event.target.value))
    setOrderDate(projects.filter((e) => e.sl_no == event.target.value)[0]
        .order_date)
    setOrderId(projects.filter((e) => e.sl_no == event.target.value)[0]
        .order_id)
        setLoading(true)
        axios.post(url + "/api/getprojectpoc", { id: projects.filter((e) => e.sl_no == event.target.value)[0]
          .proj_id}).then((res) => {
          console.log(res)
          setPoc(res?.data?.msg)
          setLoading(false)
      })
  };
 
  const onSelectVendor=(event)=>{
    console.log(event.target.value)
    setLoading(true)
    axios.post(url+'/api/getvendorpoc',{id:event.target.value}).then((resPoc)=>{
      console.log(resPoc)
      setPocList(resPoc?.data?.msg)
      axios.post(url+'/api/getvendordeals',{id:event.target.value}).then(resDeals=>{
        console.log(resDeals)
        setDeals(resDeals?.data?.msg)
        setLoading(false)
      })
      
    })
  }
  return (
    <section className="bg-white dark:bg-[#001529]">
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
        <div className="py-2 px-4 mx-auto w-full lg:py-2">
          <h2 className="text-2xl text-green-900 font-bold my-3">
            Basic Details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className={type=='P'?"sm:col-span-1":"sm:col-span-2"}>
              <TDInputTemplate
                placeholder="Order type"
                type="text"
                label="Order type"
                name="order_type"
                data={[
                  { name: "General", code: "G" },
                  { name: "Project Specific", code: "P" },
                ]}
                formControlName={type}
                handleChange={(txt) => setType(txt.target.value)}
                mode={2}
              />
              {/* {formik.errors.order_type && formik.touched.order_type && (
            <VError title={formik.errors.order_type} />
          )} */}
            </div>
           {type=='P' &&
           <>
           
           <div className="sm:col-span-1">
              <TDInputTemplate
                placeholder="Project name"
                type="text"
                label="Project Name"
                name="project_name"
                data={projectList}
                formControlName={proj_name}
                handleChange={(event) => {
                 
                  setProjName(event.target.value=='Project name'?'':event.target.value)
                  if(event.target.value!='Project name')
                    {onSelectProject(event)}
                    else{
                      setOrderId('');setOrderDate('')
                    }
                }}
                mode={2}
              />
               {/* <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="input here"
      options={projectList}
    /> */}
             
             {proj_name && <Viewdetails click={()=>{setFlag(7);setVisible(true)}}/>}
              {/* {formik.errors.project_name && formik.touched.project_name && (
                <VError title={formik.errors.project_name} />
              )} */}
            </div>
            <div className="sm:col-span-1">
              <div className="flex flex-col">
                <TDInputTemplate
                  placeholder="Order date"
                  type="date"
                  label="Order Date"
                  name="order_date"
                  formControlName={order_date}
                  disabled={true}
                  mode={1}
                />
                {/* {formik.errors.order_date && formik.touched.order_date && (
                  <VError title={formik.errors.order_date} />
                )} */}
              </div>
            </div>
            <div className="sm:col-span-1">
              <div className="flex flex-col">
                <TDInputTemplate
                  placeholder="Order No."
                  type="text"
                  label="Order No."
                  name="order_no"
                  formControlName={order_id}
                  disabled={true}
                  mode={1}
                />
                {/* {formik.errors.order_no && formik.touched.order_no && (
                  <VError title={formik.errors.order_no} />
                )} */}
              </div>
            </div>
           </>
            }
            <div className="sm:col-span-2">
              <TDInputTemplate
                placeholder="Vendor name"
                type="text"
                label="Vendor name"
                name="vendor_name"
                data={vendorsList}
                formControlName={vendor_name}
                handleChange={(event)=>{
                  setVendorName(event.target.value)
                  if(event.target.value!='Vendor name')
                    {onSelectVendor(event)
                  setVendorInfo(vendors?.filter(e=>e.sl_no==event.target.value))
                    }
                  else{
                    setVendorName('')
                  }

                }}
                // handleBlur={formik.handleBlur}

                mode={2}
              />
             {vendor_name && <Viewdetails click={()=>{setFlag(8);setVisible(true)}}/>}
            
              {/* {formik.errors.vendor_name && formik.touched.vendor_name && (
                <VError title={formik.errors.vendor_name} />
              )} */}
            </div>
          </div>
          <div className="flex pt-4 justify-between">
            <button
              className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
              onClick={pressBack}
            >
              Back
            </button>
            <button
              type="submit"
              className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
              onClick={()=>onSubmit()}
            >
              Next
            </button>
          </div>
        </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={flag}
        data={flag==7?{info:projectInfo[0],poc:pocList}:{info:vendorInfo[0],deals:deals,poc:vendorPocList}}
        onPress={() => setVisible(false)}
      />
    </section>
  );
}

export default BasicDetails;
