import React, { useEffect, useState } from "react";
import IMG from "../../Assets/Images/Logo.png";
import Divider from '@mui/material/Divider';
import { Spin } from "antd";
import {
    LoadingOutlined,
    
  } from "@ant-design/icons";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
function PoPreview({ data }) {
 const [loading,setLoading]=useState(false)
 const [v_name,setVName]=useState('')
 const [v_address,setVAddress]=useState('')
 const [v_email,setVEmail]=useState('')
 const [v_phone,setVPhone]=useState('')
 const [v_gst,setVGST]=useState('')
 const [v_pan,setVPAN]=useState('')
  useEffect(()=>{
    axios.post(url+'/api/getvendor',{id:+localStorage.getItem('vendor_name')}).then(res=>{
        setLoading(true)
        console.log(res)
        setVName(res?.data?.msg?.vendor_name)
        setVAddress(res?.data?.msg?.vendor_address)
        setVEmail(res?.data?.msg?.vendor_email)
        setVPhone(res?.data?.msg?.vendor_phone)
        setVGST(res?.data?.msg?.vendor_gst)
        setVPAN(res?.data?.msg?.vendor_pan)
        setLoading(false)
    
    })
  },[])
  return (
   
    <div className="h-full border-2 p-3 border-blue-300">
         <Spin
    indicator={<LoadingOutlined spin />}
    size="large"
    className="text-green-900 dark:text-gray-400"
    spinning={loading}
  >
      <div className="flex justify-center items-center">
        <span className="text-xl text-blue-500 font-extrabold my-3 uppercase">
          Purchase Order
        </span>
      </div>
      <p className="flex gap-36 items-center mb-2">
        <div className="flex flex-col w-1/3">
          <img src={IMG} className="sm:h-14 h-7" alt="Flowbite Logo" />
          <span className="my-5 mx-3 mb-5 text-xs">
           <p>Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata
           700046 </p>
          <p> Ph-033 4068 6032/6450 0535</p> 
          <p> Email: info@ngapl.com</p> 
          </span>
        </div>
        <div className="flex flex-col text-xs gap-1 text-black ">
          <span className="uppercase font-extrabold">PO No:</span>
          <span className="uppercase font-extrabold">PO Date:  {localStorage.getItem('po_issue_date')}</span>
          <span className="uppercase font-extrabold">Latest Amendement No:</span>
          <span className="uppercase font-extrabold">Amendment Date:</span>
          <span className="uppercase font-extrabold">Value:</span>
          <span className="uppercase font-extrabold">Status No:  {localStorage.getItem('po_status')=='P'?'In Progress':localStorage.getItem('po_status')=='U'?'Unapproved':localStorage.getItem('po_status')=='A'?'Approved':localStorage.getItem('po_status')=='D'?'Delivered':'Partial Delivery'}</span>
        </div>
      </p>
      <Divider/>
  
  <div className="grid grid-cols-2 gap-2">
 
  <div className="col-span-2">
  <div className="my-5 w-full p-2 text-black font-semibold bg-blue-400 rounded-lg">
          Vendor Details
      </div>
      <div className="flex flex-col text-xs gap-2 text-black p-2">
          <span className="uppercase font-extrabold gap-4">Name:  {v_name}</span>
          <span className="uppercase font-extrabold">Address:  {v_address}</span>
          <span className="uppercase font-extrabold">Email:  {v_email}</span>
          <span className="uppercase font-extrabold">Phone:  {v_phone}</span>
          <span className="uppercase font-extrabold">GST:  {v_gst}</span>
          <span className="uppercase font-extrabold">PAN:  {v_pan}</span>
        </div>

  </div>

  </div>
  <div className="grid grid-cols-2 gap-2 my-6">
  <div className="col-span-1 border-2 border-blue-300 rounded-lg p-2">
  <div className="w-full p-2  text-black font-semibold bg-blue-400 rounded-lg">
          Bill To
      </div>
     <p className="text-sm p-2"> Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata
      700046</p> <p className="text-sm p-2"> Ph-033 4068 6032/6450 0535</p> <p className="text-sm p-2"> Email: info@ngapl.com
 </p> 
  </div>
  <div className="col-span-1 border-2 border-blue-300 rounded-lg p-2">
  <div className="w-full p-2 text-black font-semibold bg-blue-400 rounded-lg">
          Ship To
      </div>
      {localStorage.getItem('ship_to')}

  </div>

  </div>
      <p className="mb-5">
      <div className="my-2 w-full p-2 font-semibold text-blue-800 rounded-lg">
          Material Abstract

          </div>

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-nowrap text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Item-Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" class="px-6 py-3">
                    Rate
                </th>
                <th scope="col" class="px-6 py-3">
                    Discount
                </th>
                <th scope="col" class="px-6 py-3">
                    Net Rate
                </th>
                <th scope="col" class="px-6 py-3">
                    Total
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>

     
      </p>
      <p className="mb-5">
      <div className="my-2 w-full p-2 font-semibold text-blue-800 rounded-lg">
          Payment Terms
          <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
    <li>
        At least 10 characters (and up to 100 characters)
    </li>
    <li>
        At least one lowercase character
    </li>
    <li>
        Inclusion of at least one special character, e.g., ! @ # ?
    </li>
    </ul>
          </div>
      </p>
      <p className="mb-5">
      <div className="my-2 w-full p-2 font-semibold text-blue-800 rounded-lg">
          Liquidity Damages

          </div>

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-nowrap text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    LD Applicable date
                </th>
                <th scope="col" class="px-6 py-3">
                    LD applied on
                </th>
                <th scope="col" class="px-6 py-3">
                    Ld value(%)
                </th>
                <th scope="col" class="px-6 py-3">
                    Duration
                </th>
                <th scope="col" class="px-6 py-3">
                    Maximum (%) on PO value
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
           
        </tbody>
    </table>
</div>

     
      </p>
      <p className="mb-5">
      <div className="my-2 w-full p-2 font-semibold text-blue-800 rounded-lg">
          Defect Liability Period

          </div>

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-nowrap text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    DLP
                </th>
                <th scope="col" class="px-6 py-3">
                    Duration
                </th>
                <th scope="col" class="px-6 py-3">
                    Events
                </th>
               
                
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
              
            </tr>
           
        </tbody>
    </table>
</div>

     
      </p>
      <p className="mb-5">
      <div className="my-2 w-full p-2 font-semibold text-blue-800 rounded-lg">
          Terms & Conditions

          </div>

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-nowrap text-gray-700 uppercase bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    DLP
                </th>
                <th scope="col" class="px-6 py-3">
                    Duration
                </th>
                <th scope="col" class="px-6 py-3">
                    Events
                </th>
               
                
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
              
            </tr>
           
        </tbody>
    </table>
</div>

     
      </p>
      </Spin>
    </div>
  );
}

export default PoPreview;
