import React from 'react'
import { Descriptions } from "antd";
const ProfileInfo = () => {
 
    const items= [
        {
          key: '1',
          label: <div className=' text-green-900 font-bold'>Name</div>,
          children: <p>{localStorage.getItem("user_name")}</p>,
        },
        {
          key: '2',
          label: <div className=' text-green-900 font-bold'>Phone</div>,
          children: <p>{localStorage.getItem("user_phone")}</p>,
        },
        {
          key: '3',
          label: <div className=' text-green-900 font-bold'>Email</div>,
          children: <p>{localStorage.getItem("email")}</p>,
        },
        {
          key: '4',
          label: <div className=' text-green-900 font-bold'>Department</div>,
          children: <p>{localStorage.getItem("dept_name")}</p>,
        },
        {
          key: '5',
          label: <div className=' text-green-900 font-bold'>Designation</div>,
          children: <p>{localStorage.getItem("desig_name")}</p>,
        },
        {
          key: '6',
          label: <div className=' text-green-900 font-bold'>Type</div>,
          children: <p>{localStorage.getItem("user_type")=='AD'?'Admin':(localStorage.getItem("user_type")=='PM'?'Purchase Manager':((localStorage.getItem("user_type")=='PuM'?'Purchase Manager':(localStorage.getItem("user_type")=='WM'?'Warehouse Manager':'General User'))))}</p>,
        },
      ];
  return (
    <>
    <Descriptions title="User Info" items={items} />
    </>
  )
}

export default ProfileInfo