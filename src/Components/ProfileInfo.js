import React, { useEffect, useRef, useState } from "react";
import { Descriptions, Spin } from "antd";
import { Divider } from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import { url } from "../Address/BaseUrl";
import axios from "axios";
import { Message } from "./Message";
const ProfileInfo = () => {
  const inputFile = useRef(null);
  const [img, setImg] = useState("");
  const [imgPath,setImgPath] = useState("")
  const [phone,setPhone] = useState(localStorage.getItem('user_phone'))
  const [name,setName] = useState(localStorage.getItem('user_name'))
  const [showPhoneText,setPhoneText] = useState(false)
  const [showNameText,setNameText] = useState(false)
  const [loading,setLoading]=useState(false)
  const [count,setCount] = useState(0)
  const [relativePath,setRelativePath] =  useState("")
  
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  useEffect(()=>{
    axios.post(url+'/api/getprofile',{id:localStorage.getItem('email')}).then(res=>{
      console.log(res)
      setImgPath(url+res?.data?.msg?.user_profile_pic)
      setRelativePath(res?.data?.msg?.user_profile_pic)
      localStorage.setItem('user_profile_pic',url+res?.data?.msg?.user_profile_pic)
      localStorage.setItem('user_location',res?.data?.msg?.user_location=='F'?'Factory':res?.data?.msg?.user_location=='O'?'Office':'Site')
    })
  },[count])
  const onUpdate=()=>{
    setLoading(true)
    const formData=new FormData()
    formData.append('user_name',name)
    formData.append('user_phone',phone)
    formData.append('file',img)
    formData.append('user_email',localStorage.getItem('email'))
    axios.post(url+'/api/edit_user',formData).then(res=>{
      setLoading(false)
      console.log(res)
      if(res?.data?.suc>0){
        Message('success',res?.data?.msg)
        localStorage.setItem('user_name',name)
        localStorage.setItem('user_phone',phone)
        setCount(prev=>prev+1)
      }
      else{

      }
    })
  }
  const items = [
    {
      key: "1",
      label: "Name",
      children:<> 
      {!showNameText && 
      <p  onClick={()=>{setNameText(true)}}>{name}</p>
    }
    {showNameText && <input minLength={3} value={name} onBlur={()=>setNameText(!showNameText)} onChange={(txt)=>setName(txt.target.value)}/>}
      </>,
    },
    {
      key: "2",
      label: "Phone",
      children:<> 
      {!showPhoneText && 
      <p onClick={()=>{setPhoneText(true)}}>{phone}</p>
    }
      {showPhoneText && <input maxLength={10} value={phone} onBlur={()=>setPhoneText(!showPhoneText)} onChange={(txt)=>setPhone(txt.target.value)}/>}
      
      </>,
    },
    {
      key: "3",
      label: "Email",
      children: <p>{localStorage.getItem("email")}</p>,
    },
    {
      key: "4",
      label: "Department",
      children: <p>{localStorage.getItem("dept_name")}</p>,
    },
    {
      key: "5",
      label: "Designation",
      children: <p>{localStorage.getItem("desig_name")}</p>,
    },
    {
      key: "6",
      label: "Type",
      children: (
        <p>
          {localStorage.getItem("user_type") == "5"
            ? "Admin"
            : localStorage.getItem("user_type") == "1"
            ? "Purchase Manager"
            : localStorage.getItem("user_type") == "2"
            ? "Purchase Manager"
            : localStorage.getItem("user_type") == "3"
            ? "Warehouse Manager"
            : localStorage.getItem("user_type") == "4"
            ? "Floor Manager":"General User"}
        </p>
      ),
    },
    {
      key: "7",
      label: "Location",
      children: (
        <p>
          {localStorage.getItem("user_location")}
        </p>
      ),
    },
  ];
  const setImage=(e)=>{
    setImg(e.target.files[0])
    setImgPath(URL.createObjectURL(e.target.files[0]));

  }
  return (
    <div className="flex-col justify-center items-center">
      <input
        type="file"
        id="file"
        onChange={(e) => {setImage(e)}}
        accept={"image/*"}
        ref={inputFile}
        style={{ display: "none" }}
      />
      <div className={!relativePath?"h-32 w-32 relative my-4 mx-auto rounded-full bg-green-700 text-7xl text-white flex justify-center items-center":"h-32 w-32 relative my-4 mx-auto rounded-full bg-white text-7xl text-white flex justify-center items-center"}>
        {!relativePath && <span>
        {localStorage.getItem("user_name").indexOf(" ") > 0
          ? localStorage.getItem("user_name").split(" ")[0] +
            localStorage.getItem("user_name").split(" ")[1]
          : localStorage.getItem("user_name").charAt(0)}
          </span>
}
{relativePath && <img src={imgPath} className="h-32 border-2 border-gray-400 absolute top-50 right-50 w-32 rounded-full"/>}

        <span onClick={() => onButtonClick()}>
          <CameraAltOutlined className="absolute cursor-pointer bg-gray-400 bottom-2 rounded-md p-0.5 right-1" />
        </span>
      </div>

      <Divider />
      <Descriptions
        title="Your profile"
        labelStyle={{ color: "#014737", fontWeight: "bold" }}
        items={items}
      />
       <Spin indicator={<LoadingOutlined spin />} size="large" className="text-green-900 dark:text-gray-400" spinning={loading}>
       <button
        type="submit"
        disabled={!name || !phone}
        onClick={()=>{onUpdate()}}
        className=" disabled:bg-gray-400 mx-auto ml-64 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"

    >
        Update
    </button>
    </Spin>
    </div>
  );
};

export default ProfileInfo;
