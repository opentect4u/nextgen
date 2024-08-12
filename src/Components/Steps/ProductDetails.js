import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import { Formik, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusOutlined,InfoOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
import Viewdetails from "../Viewdetails";
import DialogBox from "../DialogBox";
function ProductDetails({ pressBack, pressNext,data }) {
  console.log(data)
  const [products, setProducts] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [productInfo, setProdInfo] = useState([]);
  const [units, setUnits] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [cgstList, setcGstList] = useState([]);
  const [sgstList, setsGstList] = useState([]);
  const [igstList, setiGstList] = useState([]);
  const [visible,setVisible]=useState(false)
  const [loading,setLoading]=useState(false)
  const [grand_total,setGrandTotal]=useState(0)
  var tot=0
  const [itemList,setItemList]=useState(data?.itemList?.length?data?.itemList:[
    {
      sl_no: 0,
      item_name: "",
      qty: "",
      rate:"",
      disc: "",
      unit: "",
      unit_price: "",
      total: "",
      CGST: "",
      SGST: "",
      IGST:"",
      delivery_date:""
  }
])
useEffect(()=>{
  if(data?.itemList?.length){
    for(let i=0;i<itemList.length;i++){
      tot+=itemList[i].total
    }
    setGrandTotal(tot)
    tot=0
  }
},[])
  
  const handleDtChange=(index,event)=>{
    console.log(event.target.value)
    // if(data[index]['IGST'])
    //  { data[index]['CGST']=0
    // data[index]['SGST']=0}
    // if(data[index]['CGST'] ||data[index]['CGST'] ){
    //   data[index]['IGST']=0
    // }
    if(event.target.name=='item_name')
    setProdInfo(products.filter(e=>e.sl_no==+event.target.value))
    let data = [...itemList];
    data[index][event.target.name] = event.target.value;
    data[index]['unit_price']=+(data[index]['rate']-data[index]['disc'])
    
    if(!data[index]['IGST'])
    data[index]['total']=+(data[index]['unit_price']*data[index]['qty']*(data[index]['CGST']/100)+data[index]['unit_price']*data[index]['qty']*(data[index]['SGST']/100))
    else
    data[index]['total']=+(data[index]['unit_price']*data[index]['qty']*(data[index]['IGST']/100))
    for(let i=0;i<itemList.length;i++){
      tot+=itemList[i].total
    }
    setGrandTotal(tot)
    tot=0
    setItemList(data)
    console.log(itemList)
    localStorage.removeItem('itemList')
    localStorage.setItem('itemList',JSON.stringify(data))
  }
  const addDt=(dt)=>{
    setItemList([...itemList,dt
  //     {
  //     sl_no: 0,
  //     item_name: "",
  //     qty: "",
  //     rate:"",
  //     disc: "",
  //     unit: "",
  //     unit_price: "",
  //     total: "",
  //     CGST: "",
  //     SGST: "",
  //     IGST: "",
  //     delivery_date: ""
  // }
])

    console.log(itemList)
    localStorage.removeItem('itemList')
    localStorage.setItem('itemList',JSON.stringify(itemList))
  }
  const removeDt = (index) => {
    let data = [...itemList];
    data.splice(index, 1)
    setItemList(data)
    tot=0
    for(let i=0;i<data.length;i++){
      tot+=data[i].total
    }
    setGrandTotal(tot)
    tot=0
    localStorage.removeItem('itemList')
    localStorage.setItem('itemList',JSON.stringify(data))
}
  useEffect(() => {
    axios.post(url + "/api/getproduct", { id: 0 }).then((resProd) => {
      setProducts(resProd?.data?.msg);
      setLoading(true)
      for (let i = 0; i < resProd?.data?.msg?.length; i++) {
        prodList.push({
          name: resProd?.data?.msg[i]?.prod_name,
          code: resProd?.data?.msg[i]?.sl_no,
        });
      }
      axios.post(url + "/api/getunit", { id: 0 }).then((resUnit) => {
        setUnits(resUnit?.data?.msg);
        for (let i = 0; i < resUnit?.data?.msg?.length; i++) {
          unitList.push({
            name: resUnit?.data?.msg[i]?.unit_name,
            code: resUnit?.data?.msg[i]?.sl_no,
          });
        }
        axios.post(url+'/api/getgst',{id:0}).then(resGst=>{
          setGstList(resGst?.data?.msg)
          for(let i=0;i<resGst?.data?.msg?.length;i++){
            if(resGst?.data?.msg[i].gst_type=='CGST')
              cgstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
            if(resGst?.data?.msg[i].gst_type=='IGST')
              igstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
            if(resGst?.data?.msg[i].gst_type=='SGST')
              sgstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
          }
      setLoading(false)

        })
      });
      // setProdList(prodList)
    });
  }, []);
  const params = useParams();

  const [formValues, setValues] = useState({
    dynamicFields: [
      {
        sl_no: 0,
        item_name: "",
        qty: "",
        disc: "",
        unit: "",
        unit_price: "",
        total: "",
        GST: "",
        delivery_date: "",
        // poc_address: "",
      },
    ],
  });


  return (
    <section className="bg-white dark:bg-[#001529]">
       <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
      <div className="py-2 px-4 mx-auto w-full lg:py-2">
        <h2 className="text-2xl text-green-900 font-bold my-3">Item Details</h2>

        {itemList.map((input,index)=>
                      <React.Fragment key={index}>
                        <div className="sm:col-span-2 flex gap-2 justify-end items-center my-3">
                          {itemList.length > 1 && (
                            <Button
                              className="rounded-full text-white bg-red-800 border-red-800"
                              onClick={() => removeDt(index)}
                              icon={<MinusOutlined />}
                            ></Button>
                          )}

                          <Button
                            className="rounded-full bg-green-900 text-white"
                            onClick={() =>{
                              console.log(itemList[index])
                              addDt({
                                sl_no: 0,
                                item_name: "",
                                qty: "",
                                rate:"",
                                disc: "",
                                unit: "",
                                unit_price: "",
                                total: "",
                                CGST: "",
                                SGST: "",
                                IGST: "",
                                delivery_date:itemList[index].delivery_date
                                // poc_address: "",
                              })
                            }
                            }
                            icon={<PlusOutlined />}
                          ></Button>
                           {itemList[index]?.item_name &&  <button
                            className=" inline-flex items-center justify-center text-sm font-medium text-center text-white bg-primary-700 h-8 w-8 bg-blue-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={()=>
                            {  console.log(itemList[index])
                            //  setFlag(6)
                             setProdInfo(products.filter(e=>e.sl_no==+itemList[index]?.item_name))
                             setVisible(true)
                            }
                            
                            }
                          >
                            <InfoOutlined/>
                          </button>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Item name"
                              type="text"
                              label="Item name"
                              data={prodList}
                              formControlName={
                              input.item_name
                              }
                              name='item_name'
                              handleChange={(event)=>{handleDtChange(index,event);}}
                              // handleBlur={handleBlur}
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              mode={2}
                            />
                            {/* {formik.errors.price_basis_flag && formik.touched.price_basis_flag && (
                      <VError title={formik.errors.price_basis_flag} />
                    )} */}
                          </div>

                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Quantity"
                              type="number"
                              label="Quantity"
                              formControlName={
                                input.qty
                              }
                              name='qty'
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}
                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Rate"
                              type="number"
                              label="Rate"
                              formControlName={
                                input.rate
                              }
                              name='rate'
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                          <VError title={formik.errors.price_basis_desc} />
                        )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Discount"
                              type="number"
                              label="Discount"
                              formControlName={
                                input.disc
                              }
                              name='disc'
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Unit"
                              type="text"
                              label="Unit"
                              data={unitList}
                              formControlName={
                               input.unit
                              }
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              name='unit'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={2}
                            />
                            {/* {formik.errors.price_basis_flag && formik.touched.price_basis_flag && (
                      <VError title={formik.errors.price_basis_flag} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2">
                            <TDInputTemplate
                              placeholder="Unit price"
                              type="number"
                              label="Unit price"
                              formControlName={
                                input.unit_price
                              }
                              name='unit_price'
                              
                              handleChange={(event)=>handleDtChange(index,event)}
                              disabled={true}
                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>

                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="CGST"
                              type="number"
                              label="CGST"
                              formControlName={
                               input.CGST
                              }
                              name='CGST'
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              data={cgstList}
                              mode={2}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="SGST"
                              type="number"
                              label="SGST"
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              formControlName={
                                input.SGST
                              }
                              name='SGST'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              data={sgstList}
                              mode={2}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="IGST"
                              type="number"
                              label="IGST"
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              formControlName={
                                input.IGST
                              }
                              name='IGST'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              data={igstList}
                              mode={2}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2">
                            <TDInputTemplate
                              placeholder="Total"
                              type="number"
                              label="Total"
                              formControlName={
                                input.total
                              }
                              name='total'
                              handleChange={(event)=>handleDtChange(index,event)}
                              disabled={true}
                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Delivery Date"
                              type="date"
                              label="Delivery Date"
                              formControlName={
                                input.delivery_date
                              }
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              name='delivery_date'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              // formControlName={formik.values.price_basis_desc}
                              // handleChange={formik.handleChange}
                              // handleBlur={formik.handleBlur}
                              mode={1}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                       {index==itemList.length-1 &&   <div className="sm:col-span-2 font-bold flex flex-col justify-center items-start">
                            Grand Total: {grand_total.toFixed(2)}
                          </div>}
                        </div>
                      </React.Fragment>
        )}
              <div className="flex pt-4 justify-between w-full">
                <button
                  className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
                  onClick={pressBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" onClick={()=>{pressNext(itemList)}}
                >
                  Next
                </button>
              </div>
      </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={9}
        data={{info:productInfo[0]}}
        onPress={() => setVisible(false)}
      />
    </section>
  );
}

export default ProductDetails;
