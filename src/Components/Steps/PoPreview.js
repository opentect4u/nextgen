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
 const [prodInfo,setProdInfo]=useState()
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
        axios.post(url+'/api/getpreviewitems',{id:+localStorage.getItem('id')}).then(resItems=>{
            console.log(resItems)
            setProdInfo(resItems?.data?.msg)
            console.log(prodInfo)
            // "prod_name": "Prod_2",
            // "prod_make": "Make_2",
            // "catg_name": "Misc",
            // "part_no": "Part_2",
            // "model_no": "Model_2",
            // "article_no": "Ar_2",
            // "hsn_code": "444445",
            // "prod_desc": "Desc",
            // "quantity": 10,
            // "item_rt": 7.0,
            // "discount": 4.0,
            // "unit_name": "Gm"
            
            // setLoading(true)
            // console.log(res)
            // setVName(res?.data?.msg?.vendor_name)
            // setVAddress(res?.data?.msg?.vendor_address)
            // setVEmail(res?.data?.msg?.vendor_email)
            // setVPhone(res?.data?.msg?.vendor_phone)
            // setVGST(res?.data?.msg?.vendor_gst)
            // setVPAN(res?.data?.msg?.vendor_pan)
            // setLoading(false)
            setLoading(false)
        
        })
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
      <p className="flex gap-x-44 items-center mb-2">
        <div className="flex flex-col w-1/3">
          <img src={IMG} className="sm:h-14 h-7" alt="Flowbite Logo" />
          <span className="my-5 mx-3 mb-5 text-xs">
           <p>Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata
           700046 </p>
          <p> Ph-033 4068 6032/6450 0535</p> 
          <p> Email: info@ngapl.com</p> 
          </span>
        </div>
        <div className="flex flex-col text-xs gap-3 text-black ">
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
  <Divider/>

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
      <p className="text-sm p-2">   {localStorage.getItem('ship_to')} </p>

  </div>

  </div>
  <Divider/>

      <p className="mb-5">
      <div className="my-2 w-full p-2 text-black font-semibold bg-blue-400 rounded-lg">
          Material Abstract

          </div>

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead  className="text-xs text-nowrap font-bold text-blue-500 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Item-Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Rate
                </th>
                <th scope="col" className="px-6 py-3">
                    Discount
                </th>
                <th scope="col" className="px-6 py-3">
                    Net Rate
                </th>
                <th scope="col" className="px-6 py-3">
                    Total
                </th>
            </tr>
        </thead>
        <tbody>
         {prodInfo?.length>0 && prodInfo?.map(item=>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th  className="px-6 py-4 flex flex-col gap-1 text-nowrap font-medium text-gray-900 whitespace-nowrap dark:text-white" rowSpan={2}>
                    {item.prod_name}
                    <td className="px-6 py-4 text-xs gap-3">
                   <p>Make: {item.prod_make} </p> 
                   <p>Category: {item.catg_name} </p> 
                   <p> UOM: {item.unit_name}</p> 
                   <p>   Part No.: {item.part_no} </p>
                   <p>Model No.: {item.model_no} </p> 
                   <p> Article No.: {item.article_no}</p> 
                    <p>HSN: {item.hsn_code} </p>
                </td>
                </th>
                
                <td className="px-6 py-4">
                    {item.quantity}
                </td>
                <td className="px-6 py-4">
                   {item.item_rt}
                </td>
                <td className="px-6 py-4">
                {item.discount}
                </td>
            </tr>
           
        )}
          
        </tbody>
    </table>
</div>

     
      </p>
      <Divider/>

      <p className="mb-5">
      <div className="my-2 w-full p-2 text-black font-semibold bg-blue-400 rounded-lg">
          Payment Terms
       
          </div>
          <ul className="max-w-md space-y-1 text-gray-700 p-2 list-disc list-inside dark:text-gray-400">
       {JSON.parse(localStorage.getItem('termList')).map(item=> <li>
        {item.stage} - {item.term}
    </li>)}
   
    </ul>
      </p>
      <Divider/>

      <p className="mb-5">
      <div className="my-2 w-full p-2 text-black font-semibold bg-blue-400 rounded-lg">
          Terms & Conditions

          </div>


          <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       
        <tbody>
            <tr className="bg-white border-b text-nowrap dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Price Basis
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).price_basis_flag=='F'?'FOR':'EX-WORKS'}, {JSON.parse(localStorage.getItem('terms')).price_basis_desc}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Packing & Forwarding
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).packing_forwarding_val=='I'?'Inclusive':`Extra  ${JSON.parse(localStorage.getItem('terms')).packing_forwarding_extra}%`}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Freight
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).freight_insurance=='I'?'Inclusive':'Extra'} - {JSON.parse(localStorage.getItem('terms')).freight_insurance_val}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Test Certificate
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).test_certificate=='Y'?JSON.parse(localStorage.getItem('terms')).test_certificate_desc:'No'}
                </td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Warranty/Guarantee
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).warranty_guarantee_flag=='W'?'Warranty':'Guarantee'}
                </td>
            </tr>
            
         
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                O & M Manual
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).om_manual_flag=='A'?JSON.parse(localStorage.getItem('terms')).om_manual_desc:'Not Applicable'}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Operation/Installation
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).oi_flag=='A'?JSON.parse(localStorage.getItem('terms')).oi_desc:'Not Applicable'}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Packing Type
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).packing_type}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Manufacture Clearance
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).manufacture_clearance=='A'?JSON.parse(localStorage.getItem('terms')).manufacture_clearance_desc:'Not Applicable'}
                </td>
            </tr>
        </tbody>
    </table>
</div>
     
      </p>

      <p className="mb-5">
      <div className="my-2 w-full p-2 text-black font-semibold bg-blue-400 rounded-lg">
          Liquidity Damages

          </div>

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-nowrap font-bold text-blue-500 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    LD Applicable date
                </th>
                <th scope="col" className="px-6 py-3">
                    LD applied on
                </th>
                <th scope="col" className="px-6 py-3">
                    Ld value(%)
                </th>
                <th scope="col" className="px-6 py-3">
                    Duration
                </th>
                <th scope="col" className="px-6 py-3">
                    Maximum (%) on PO value
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b text-nowrap dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {JSON.parse(localStorage.getItem('terms')).ld_applicable_date=='O'?`Others - ${JSON.parse(localStorage.getItem('terms')).others_ld}`:JSON.parse(localStorage.getItem('terms')).ld_applicable_date=='M'?'MRN Date':'Dispatch Date'}
                </th>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).ld_applied_on=='O'?`Others - ${JSON.parse(localStorage.getItem('terms')).others_applied}`:JSON.parse(localStorage.getItem('terms')).ld_applicable_date=='P'?'Pending Material Value':'PO Total Value(%)'}
                </td>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).ld_value}
                </td>
                <td className="px-6 py-4">
                    {JSON.parse(localStorage.getItem('terms')).duration_val} {JSON.parse(localStorage.getItem('terms')).duration=='M'?'Month(s)':JSON.parse(localStorage.getItem('terms')).duration_val=='W'?'Week(s)':'Year(s)'}
                </td>
                <td className="px-6 py-4">
                {JSON.parse(localStorage.getItem('terms')).po_min_value}
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
