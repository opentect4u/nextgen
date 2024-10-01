import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import { PlusOutlined, MinusOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
import DialogBox from "../DialogBox";
import DrawerComp from "../DrawerComp";
import moment from "moment";

function ProductDetails({ pressBack, pressNext, data }) {
  console.log(data);
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [productInfo, setProdInfo] = useState([]);
  const [units, setUnits] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [cgstList, setcGstList] = useState([]);
  const [sgstList, setsGstList] = useState([]);
  const [igstList, setiGstList] = useState([]);
  const [cgstval, setCgst] = useState();
  const [sgstval, setSgst] = useState();
  const [igstval, setIgst] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grand_total, setGrandTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    if (mode == 3) {
      setLoading(true);

      prodList.length = 0;
      setProdList([]);
      axios.post(url + "/api/getproduct", { id: 0 }).then((resProd) => {
        setProducts(resProd?.data?.msg);
        setLoading(true);
        for (let i = 0; i < resProd?.data?.msg?.length; i++) {
          prodList.push({
            name: resProd?.data?.msg[i]?.prod_name,
            code: resProd?.data?.msg[i]?.sl_no,
          });
          setProdList(prodList);
          setLoading(false);
        }
      });
    }
    if (mode == 5) {
      setUnits([]);
      setLoading(true);
      unitList.length = 0;
      axios.post(url + "/api/getunit", { id: 0 }).then((resUnit) => {
        setUnits(resUnit?.data?.msg);
        for (let i = 0; i < resUnit?.data?.msg?.length; i++) {
          unitList.push({
            name: resUnit?.data?.msg[i]?.unit_name,
            code: resUnit?.data?.msg[i]?.sl_no,
          });
        }
        setLoading(false);
      });
    }
    if (mode == 6) {
      setLoading(true);
      cgstList.length = 0;
      sgstList.length = 0;
      igstList.length = 0;
      setGstList([]);
      axios.post(url + "/api/getgst", { id: 0 }).then((resGst) => {
        setGstList(resGst?.data?.msg);
        for (let i = 0; i < resGst?.data?.msg?.length; i++) {
          if (
            resGst?.data?.msg[i].gst_type == "CGST" ||
            resGst?.data?.msg[i].gst_type == "cgst" ||
            resGst?.data?.msg[i].gst_type.toString().toLowerCase() == "cgst"
          )
            cgstList.push({
              name: resGst?.data?.msg[i].gst_rate,
              code: resGst?.data?.msg[i].gst_rate,
            });
          if (
            resGst?.data?.msg[i].gst_type == "IGST" ||
            resGst?.data?.msg[i].gst_type == "igst" ||
            resGst?.data?.msg[i].gst_type.toString().toLowerCase() == "igst"
          )
            igstList.push({
              name: resGst?.data?.msg[i].gst_rate,
              code: resGst?.data?.msg[i].gst_rate,
            });
          if (
            resGst?.data?.msg[i].gst_type == "SGST" ||
            resGst?.data?.msg[i].gst_type == "sgst" ||
            resGst?.data?.msg[i].gst_type.toString().toLowerCase() == "sgst"
          )
            sgstList.push({
              name: resGst?.data?.msg[i].gst_rate,
              code: resGst?.data?.msg[i].gst_rate,
            });
        }
        setLoading(false);
      });
    }
  };
  var tot = 0;
  const [itemList, setItemList] = useState(
    data?.itemList?.length
      ? data?.itemList
      : [
          {
            sl_no: 0,
            item_name: "",
            qty: "",
            rate: "",
            currency:"",
            disc_prtg: "",
            disc: "",
            unit: "",
            unit_price: "",
            total: "",
            CGST: "",
            SGST: "",
            IGST: "",
            delivery_date: "",
            delivery_to: "",
          },
        ]
  );
  useEffect(() => {
    console.log(data.itemList);
    if (data?.itemList?.length) {
      for (let i = 0; i < itemList.length; i++) {
        tot += itemList[i].total;
      }
      setGrandTotal(tot);
      tot = 0;
    }
  }, []);

  const handleDtChange = (index, event) => {
    console.log(
      event.target.value,
      event.target.name,
      typeof event.target.value
    );
    
    
    console.log(grand_total);
    if (event.target.name == "item_name")
      setProdInfo(products.filter((e) => e.sl_no == +event.target.value));

    let data = [...itemList];
    if(event.target.name=='currency'){
    if(event.target.value!='I'){
      data[index]["IGST"]=''
      data[index]["CGST"]=''
      data[index]["SGST"]=''
    }
  }
    if (event.target.name == "disc_prtg") {
      console.log(+((data[index]["rate"] * +event.target.value) / 100));

      data[index]["disc"] = +(
        data[index]["rate"] *
        (+event.target.value / 100)
      );
    }
    if (event.target.name == "disc") {

      data[index]["disc_prtg"] =  +(
        +event.target.value *100
        /data[index]["rate"]
      );;
    }
    data[index][event.target.name] = event.target.value;
    data[index]["unit_price"] = +(data[index]["rate"] - data[index]["disc"]);

    if (data[index]["IGST"] != "" && data[index]["IGST"] != "IGST") {
      data[index]["total"] =
        +(
          data[index]["unit_price"] *
          data[index]["qty"] *
          (data[index]["IGST"] / 100)
        ) +
        data[index]["unit_price"] * data[index]["qty"];
      setIgst(
        +(
          data[index]["unit_price"] *
          data[index]["qty"] *
          (data[index]["IGST"] / 100)
        )
      );
    } else {
      data[index]["total"] =
        +(
          data[index]["unit_price"] *
            data[index]["qty"] *
            (data[index]["CGST"] / 100) +
          data[index]["unit_price"] *
            data[index]["qty"] *
            (data[index]["SGST"] / 100)
        ) +
        data[index]["unit_price"] * data[index]["qty"];
      setSgst(
        data[index]["unit_price"] *
          data[index]["qty"] *
          (data[index]["SGST"] / 100)
      );
      setCgst(
        data[index]["unit_price"] *
          data[index]["qty"] *
          (data[index]["CGST"] / 100)
      );
    }
    for (let i = 0; i < itemList.length; i++) {
      tot += itemList[i].total;
    }
    setGrandTotal(tot);
    tot = 0;
    setItemList(data);
    console.log(itemList);
    localStorage.removeItem("itemList");
    localStorage.setItem("itemList", JSON.stringify(data));
  };
  const addDt = (dt) => {
    setItemList([
      ...itemList,
      dt,
    ]);

    console.log(itemList);
    localStorage.removeItem("itemList");
    localStorage.setItem("itemList", JSON.stringify(itemList));
  };
  const removeDt = (index) => {
    let data = [...itemList];
    data.splice(index, 1);
    setItemList(data);
    tot = 0;
    for (let i = 0; i < data.length; i++) {
      tot += data[i].total;
    }
    setGrandTotal(tot);
    tot = 0;
    localStorage.removeItem("itemList");
    localStorage.setItem("itemList", JSON.stringify(data));
  };
  useEffect(() => {
    axios.post(url + "/api/getproduct", { id: 0 }).then((resProd) => {
      setProducts(resProd?.data?.msg);
      setLoading(true);
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
        axios.post(url + "/api/getgst", { id: 0 }).then((resGst) => {
          setGstList(resGst?.data?.msg);
          for (let i = 0; i < resGst?.data?.msg?.length; i++) {
            if (
              resGst?.data?.msg[i].gst_type == "CGST" ||
              resGst?.data?.msg[i].gst_type == "cgst" ||
              resGst?.data?.msg[i].gst_type.toString().toLowerCase() == "cgst"
            )
              cgstList.push({
                name: resGst?.data?.msg[i].gst_rate,
                code: resGst?.data?.msg[i].gst_rate,
              });
            if (
              resGst?.data?.msg[i].gst_type == "IGST" ||
              resGst?.data?.msg[i].gst_type == "igst" ||
              resGst?.data?.msg[i].gst_type.toString().toLowerCase() == "igst"
            )
              igstList.push({
                name: resGst?.data?.msg[i].gst_rate,
                code: resGst?.data?.msg[i].gst_rate,
              });
            if (
              resGst?.data?.msg[i].gst_type == "SGST" ||
              resGst?.data?.msg[i].gst_type == "sgst" ||
              resGst?.data?.msg[i].gst_type.toString().toLowerCase() == "sgst"
            )
              sgstList.push({
                name: resGst?.data?.msg[i].gst_rate,
                code: resGst?.data?.msg[i].gst_rate,
              });
          }
          setLoading(false);
        });
      });
      // setProdList(prodList)
    });
  }, []);

  const [formValues, setValues] = useState({
    dynamicFields: [
      {
        sl_no: 0,
        item_name: "",
        qty: "",
        disc_prtg: "",
        currency:"",
        disc: "",
        unit: "",
        unit_price: "",
        total: "",
        GST: "",
        delivery_date: "",
        delivery_to:""
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
          <h2 className="text-2xl text-green-900 font-bold my-3">
            Item Details
          </h2>

          {itemList.map((input, index) => (
            <React.Fragment key={index}>
              <div className="sm:col-span-2 flex gap-2 justify-end items-center my-3">
                {localStorage.getItem("po_status") != "A" &&
                  localStorage.getItem("po_status") != "D" &&
                  localStorage.getItem("po_status") != "L" && (
                    <>
                      {itemList.length > 1 && (
                        <Button
                          className="rounded-full text-white bg-red-800 border-red-800"
                          onClick={() => removeDt(index)}
                          icon={<MinusOutlined />}
                        ></Button>
                      )}

                      <Button
                        className="rounded-full bg-green-900 text-white"
                        onClick={() => {
                          console.log(itemList[index]);
                          addDt({
                            sl_no: 0,
                            item_name: "",
                            qty: "",
                            rate: "",
                            currency:"",
                            disc_prtg: "",
                            disc: "",
                            unit: "",
                            unit_price: "",
                            total: "",
                            CGST: "",
                            SGST: "",
                            IGST: "",
                            delivery_date: itemList[index].delivery_date,
                            delivery_to: itemList[index].delivery_to,
                            // poc_address: "",
                          });
                        }}
                        icon={<PlusOutlined />}
                      ></Button>
                    </>
                  )}

                {itemList[index]?.item_name &&
                  itemList[index]?.item_name != "Item name" && (
                    <button
                      className=" inline-flex items-center justify-center text-sm font-medium text-center text-white bg-primary-700 h-8 w-8 bg-green-500 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800"
                      onClick={() => {
                        console.log(itemList[index]);
                        //  setFlag(6)
                        setProdInfo(
                          products.filter(
                            (e) => e.sl_no == +itemList[index]?.item_name
                          )
                        );
                        setVisible(true);
                      }}
                    >
                      <InfoOutlined />
                    </button>
                  )}
              </div>

              <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                <div className="sm:col-span-2 flex flex-col">
                  <TDInputTemplate
                    placeholder="Item name"
                    type="text"
                    label="Item name"
                    data={prodList}
                    formControlName={input.item_name}
                    name="item_name"
                    handleChange={(event) => {
                      handleDtChange(index, event);
                      console.log(event.target.value);
                    }}
                    // handleBlur={handleBlur}
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    mode={2}
                  />
                  {(input.item_name == "Item name" ||
                    input.item_name == "") && (
                    <VError title={"Name is required!"} />
                  )}
                  {localStorage.getItem("po_status") != "A" &&
                    localStorage.getItem("po_status") != "D" &&
                    localStorage.getItem("po_status") != "L" && (
                      <a
                        className="my-2"
                        onClick={() => {
                          setMode(3);
                          setOpen(true);
                        }}
                      >
                        <Tag color="#4FB477">Not in list?</Tag>
                      </a>
                    )}
                </div>

                <div className="sm:col-span-2 flex flex-col">
                  <TDInputTemplate
                    placeholder="Quantity"
                    type="number"
                    label="Quantity"
                    formControlName={input.qty}
                    name="qty"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    mode={1}
                  />
                  {(input.qty <= 0 || !input.qty) && (
                    <VError title={"Should be >0!"} />
                  )}
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <TDInputTemplate
                    placeholder="Rate"
                    type="number"
                    label="Rate"
                    formControlName={input.rate}
                    name="rate"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    mode={1}
                  />
                  {(input.rate <= 0 || !input.rate) && (
                    <VError title={"Should be >0!"} />
                  )}
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  {/* {input.currency} */}
                  <TDInputTemplate
                    placeholder="Currency"
                    type="number"
                    label="Currency"
                    formControlName={input.currency}
                    name="currency"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    handleChange={(event) => handleDtChange(index, event)}
                   
                    data={[{code:'I',name:'INR'},{code:'U',name:'USD'},{code:'E',name:'Euro'}]}
                    mode={2}
                  />
                  {(!input.currency || input.currency=='Currency')  && (
                    <VError title={"Required"} />
                  )}
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <TDInputTemplate
                    placeholder="Discount(%)"
                    type="number"
                    label="Discount(%)"
                    formControlName={input.disc_prtg}
                    name="disc_prtg"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    mode={1}
                  />
                  {input.disc_prtg < 0 && (
                    <VError title={"Cannot be negative!"} />
                  )}
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <TDInputTemplate
                    placeholder={input.currency=='I'?'Discount (INR)':input.currency=='U'?'Discount (USD)':input.currency=='E'?'Discount (Euro)':'Discount'}
                    type="number"
                    label={input.currency=='I'?'Discount (INR)':input.currency=='U'?'Discount (USD)':input.currency=='E'?'Discount (Euro)':'Discount'}
                    formControlName={input.disc}
                    name="disc"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    mode={1}
                  />
                  {input.disc < 0 && <VError title={"Cannot be negative!"} />}
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <TDInputTemplate
                    placeholder="Unit"
                    type="text"
                    label="Unit"
                    data={unitList}
                    formControlName={input.unit}
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    name="unit"
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    mode={2}
                  />
                  {(input.unit == "Unit" || input.unit == "") && (
                    <VError title={"Required!"} />
                  )}
                  {localStorage.getItem("po_status") != "A" &&
                    localStorage.getItem("po_status") != "D" &&
                    localStorage.getItem("po_status") != "L" && (
                      <a
                        className="my-2"
                        onClick={() => {
                          setMode(5);
                          setOpen(true);
                        }}
                      >
                        <Tag color="#4FB477">Not in list?</Tag>
                      </a>
                    )}
                </div>
                <div className="sm:col-span-2">
                  <TDInputTemplate
                    placeholder="Unit price"
                    type="number"
                    label="Unit price"
                    formControlName={input.unit_price}
                    name="unit_price"
                    handleChange={(event) => handleDtChange(index, event)}
                    disabled={true}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    mode={1}
                  />
                  {input.unit_price <= 0 && (
                    <VError title={"Should be >0"} />
                  )}
                </div>

                <div className="sm:col-span-2 flex flex-col">
                 

                  <TDInputTemplate
                    placeholder="CGST"
                    type="number"
                    label="CGST"
                    formControlName={input.CGST}
                    name="CGST"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L" ||
                      itemList[index]["IGST"] > 0 || itemList[index]['currency']!='I'
                        ? true
                        : false
                    }
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    data={cgstList}
                    mode={2}
                  />
                   <div className="flex justify-between items-center">

                  {input.unit_price * input.qty * (input.CGST / 100)>0 && <Tag className=" flex justify-center  w-1/2 px-2 my-2.5" color="#eb8d00">
                    &#8377; {(input.unit_price * input.qty * (input.CGST / 100)).toFixed(2)}
                  </Tag>
}
                  {localStorage.getItem("po_status") != "A" &&
                    localStorage.getItem("po_status") != "D" &&
                    localStorage.getItem("po_status") != "L" && (
                      <a
                        className="my-2"
                        onClick={() => {
                          setMode(6);
                          setOpen(true);
                        }}
                      >
                        <Tag color="#4FB477">Not in list?</Tag>
                      </a>
                    )}
                  
                  </div>
                  {(input.CGST == "CGST" ||
                    input.CGST == "" ||
                    input.SGST == "SGST" ||
                    input.SGST == "") &&
                    (input.IGST == "IGST" || input.IGST == "") && (input.currency=='I') && (
                      <VError title={"Either input IGST or SGST, CGST both!"} />
                    )}
                  {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                </div>
                <div className="sm:col-span-2 flex flex-col">
                
                  <TDInputTemplate
                    placeholder="SGST"
                    type="number"
                    label="SGST"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L" ||
                      itemList[index]["IGST"] > 0 || itemList[index]['currency']!='I'
                        ? true
                        : false
                    }
                    formControlName={input.SGST}
                    name="SGST"
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    data={sgstList}
                    mode={2}
                  />
                   <div className="flex justify-between items-center">
                   {input.unit_price * input.qty * (input.SGST / 100)>0 && <Tag className=" flex justify-center  w-1/2 px-2 my-2.5" color="#eb8d00">
                    &#8377; {(input.unit_price * input.qty * (input.SGST / 100)).toFixed(2)}
                  </Tag>}
                  {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                     {localStorage.getItem("po_status") != "A" &&
                    localStorage.getItem("po_status") != "D" &&
                    localStorage.getItem("po_status") != "L" && (
                      <a
                        className="my-2"
                        onClick={() => {
                          setMode(6);
                          setOpen(true);
                        }}
                      >
                        <Tag color="#4FB477">Not in list?</Tag>
                      </a>
                    )}
                    </div>
                </div>
                <div className="sm:col-span-2 flex flex-col">
                 
                  <TDInputTemplate
                    placeholder="IGST"
                    type="number"
                    label="IGST"
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L" ||
                      itemList[index]['currency']!='I' ||
                      (itemList[index]["CGST"] > 0 || itemList[index]["SGST"]) >
                        0
                        ? true
                        : false
                    }
                    formControlName={input.IGST}
                    name="IGST"
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    data={igstList}
                    mode={2}
                  />
                  <div className="flex justify-between items-center">
                  {input.unit_price * input.qty * (input.IGST / 100) >0 &&  <Tag className=" flex justify-center w-1/2 my-1" color="#eb8d00">
                    &#8377; {((input.unit_price * input.qty * (input.IGST / 100))).toFixed(2)}
                  </Tag>}
                  {localStorage.getItem("po_status") != "A" &&
                    localStorage.getItem("po_status") != "D" &&
                    localStorage.getItem("po_status") != "L" && (
                      <a
                        className="my-2"
                        onClick={() => {
                          setMode(6);
                          setOpen(true);
                        }}
                      >
                        <Tag color="#4FB477">Not in list?</Tag>
                      </a>
                    )}

                  </div>
                
                  
                </div>
                <div className="sm:col-span-2">
                  <TDInputTemplate
                    placeholder="Total"
                    type="number"
                    label="Total"
                    formControlName={input.total}
                    name="total"
                    handleChange={(event) => handleDtChange(index, event)}
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
                    label="Delivery From"
                    min={localStorage.getItem("po_issue_date")}
                    formControlName={input.delivery_date}
                    disabled={
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    name="delivery_date"
                    max={moment(new Date(new Date().setFullYear(new Date().getFullYear() + 3))).format('yyyy-MM-DD')} //may need to change

                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    // formControlName={formik.values.price_basis_desc}
                    // handleChange={formik.handleChange}
                    // handleBlur={formik.handleBlur}
                    mode={1}
                  />
                  {!input.delivery_date && (
                    <VError title={"Date is required!"} />
                  )}
                  
                  {input.delivery_date<localStorage.getItem('po_issue_date') && (
                    <VError title={"Delivery date must be>=PO Date"} />
                  )}
                  {/* <RangePicker onChange={(e)=>console.log(e)}/> */}
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <TDInputTemplate
                    placeholder="Delivery Date"
                    type="date"
                    label="Delivery To"
                    min={input.delivery_date}
                    max={moment(new Date(new Date().setFullYear(new Date().getFullYear() + 3))).format('yyyy-MM-DD')} //may need to change

                    formControlName={input.delivery_to}
                    disabled={
                      !input.delivery_date||
                      localStorage.getItem("po_status") == "A" ||
                      localStorage.getItem("po_status") == "D" ||
                      localStorage.getItem("po_status") == "L"
                        ? true
                        : false
                    }
                    name="delivery_to"
                    handleChange={(event) => handleDtChange(index, event)}
                    // handleChange={handleChange}
                    // handleBlur={handleBlur}
                    // formControlName={formik.values.price_basis_desc}
                    // handleChange={formik.handleChange}
                    // handleBlur={formik.handleBlur}
                    mode={1}
                  />
                  {!input.delivery_to && (
                    <VError title={"Date is required!"} />
                  )}
                   {input.delivery_to<input.delivery_date && (
                    <VError title={"Invalid date range!"} />
                  )}

                  {/* <RangePicker onChange={(e)=>console.log(e)}/> */}
                </div>
                {index == itemList.length - 1 && (
                  <div className="sm:col-span-6 font-bold flex justify-start items-end mt-4">
                    {/* <Tag className="text-lg" color="#014737">
                      {cgstval}
                    </Tag>
                    <Tag className="text-lg" color="#014737">
                      {sgstval}
                    </Tag>
                    <Tag className="text-lg" color="#014737">
                      {igstval}
                    </Tag> */}
                   {grand_total>0 && <Tag className="text-lg" color="#014737">
                      Grand Total:{" "}
                      &#8377;  {grand_total > 0
                        ? parseFloat(grand_total)?.toFixed(2)
                        : 0.0}
                    </Tag>}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
          <div className="flex pt-4 justify-between w-full">
            <button
              className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
              onClick={pressBack}
            >
              Back
            </button>
            <button
              type="submit"
              className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
              onClick={() => {
                var flag = 0;
                console.log(itemList);
                for (let i of itemList) {
                  if (
                    i.item_name != "Item name" &&
                    i.item_name != "" &&
                    i.qty > 0 &&
                    i.rate > 0 &&
                    i.unit != "Unit" &&
                    i.delivery_date<=i.delivery_to && i.delivery_date>=localStorage.getItem('po_issue_date') &&
                    i.unit != "" &&
                    i.delivery_date &&
                    i.delivery_to &&
                    i.unit_price > 0 &&
                    (i.disc >= 0 || i.disc == "") &&
                    (i.disc_prtg >= 0 || i.disc_prtg == "") &&
                    (((i.SGST != "SGST" &&
                      i.SGST != "" &&
                      i.CGST != "CGST" &&
                      i.CGST != "") ||
                      (i.IGST != "IGST" && i.IGST != "") && i.currency=='I') || (i.currency=='U'||i.currency=='E')) && i.currency!='Currency' && i.currency!=''
                  )
                    flag = 0;
                  else {
                    flag = 1;
                    break;
                  }
                }
                if (flag == 0) pressNext(itemList);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={9}
        data={{ info: productInfo[0] }}
        onPress={() => setVisible(false)}
      />
      <DrawerComp open={open} flag={mode} onClose={() => onClose()} />
    </section>
  );
}

export default ProductDetails;
