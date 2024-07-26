import React, { useRef, useState } from "react";
import { theme } from "antd";
import { Timeline } from "antd";
import { Switch } from "antd";
import { Select } from "antd";
import { Popover, DatePicker, Space } from "antd";
import HeadingTemplate from "../../Components/HeadingTemplate";
import { useParams } from "react-router";
import PDF from "../../Assets/Images/po.pdf";
import TDInputTemplate from "../../Components/TDInputTemplate";

import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import OrderType from "../../Components/Steps/OrderType";
import BasicDetails from "../../Components/Steps/BasicDetails";
import Delivery from "../../Components/Steps/Delivery";
import More from "../../Components/Steps/More";
import TermsConditions from "../../Components/Steps/TermsConditions";
function PurchaseOrderForm() {
  const stepperRef = useRef(null);
  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index + 1} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
  const params = useParams();
  console.log(params, "params");
  const [type, setType] = useState("");
  const [deliveryConfirm, setDelivery] = useState(false);
  const [insp, setInsp] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [delivery, setDeliveryAdd] = useState("");
  const [order_type,setOrderType]=useState("")
  // const stepperRef = useRef(null);
  const steps = [
    {
      title: "Order Type",
      content: (
        <form className="max-w-sm mx-auto">
          <HeadingTemplate text={"Order type"} />

          <div className="flex flex-col">
            <label
              for="userper"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <Select
              showSearch
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              placeholder="Select type"
              optionFilterProp="label"
              onChange={(e) => setType(e)}
              size={"large"}
              options={[
                {
                  value: "",
                  label: "Select type",
                },
                {
                  value: "P",
                  label: "Project Specific",
                },
                {
                  value: "G",
                  label: "General",
                },
              ]}
            />
          </div>
        </form>
      ),
    },
    {
      title: "Basic Details",
      content: (
        <section className="bg-white dark:bg-[#001529]">
          <div className="py-2 px-4 mx-auto w-full lg:py-2">
            <HeadingTemplate text={"Basic Details"} />

            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <div className="flex flex-col">
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                    >
                      Date
                    </label>
                    <DatePicker
                      name="order_dt"
                      id="order_dt"
                      size={"large"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 w-full dark:focus:border-primary-500"
                      placeholder="Order date"
                      required=""
                    />
                  </div>
                </div>

                {type == "P" && (
                  <>
                    <div className="sm:col-span-2 flex flex-col">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                      >
                        Order No.
                      </label>

                      <Select
                        showSearch
                        className="w-full"
                        placeholder="Select order no."
                        optionFilterProp="label"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        size={"large"}
                        options={[
                          {
                            value: "",
                            label: "Select order no.",
                          },
                          {
                            value: "P",
                            label: "L&T",
                          },
                          {
                            value: "G",
                            label: "A/C BEUMER_JPPL-",
                          },
                        ]}
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                      >
                        Client Name
                      </label>

                      <Select
                        showSearch
                        className="w-full"
                        placeholder="Select client"
                        optionFilterProp="label"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        size={"large"}
                        options={[
                          {
                            value: "",
                            label: "Select client",
                          },
                          {
                            value: "P",
                            label: "L&T",
                          },
                          {
                            value: "G",
                            label: "A/C BEUMER_JPPL-",
                          },
                        ]}
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                      >
                        Project Name
                      </label>

                      <Select
                        showSearch
                        className="w-full"
                        placeholder="Select project"
                        optionFilterProp="label"
                        // onChange={onChange}
                        // onSearch={onSearch}
                        size={"large"}
                        options={[
                          {
                            value: "",
                            label: "Select client",
                          },
                          {
                            value: "P",
                            label: "L&T",
                          },
                          {
                            value: "G",
                            label: "A/C BEUMER_JPPL-",
                          },
                        ]}
                      />
                    </div>
                  </>
                )}
                <div className="w-full flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Product category
                  </label>

                  <Select
                    showSearch
                    className="w-full"
                    placeholder="Select category"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    size={"large"}
                    options={[
                      {
                        value: "",
                        label: "Select client",
                      },
                      {
                        value: "P",
                        label: "L&T",
                      },
                      {
                        value: "G",
                        label: "A/C BEUMER_JPPL-",
                      },
                    ]}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Vendor
                  </label>

                  <Select
                    showSearch
                    className="w-full"
                    placeholder="Select vendor"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    size={"large"}
                    options={[
                      {
                        value: "",
                        label: "Select vendor",
                      },
                      {
                        value: "P",
                        label: "L&T",
                      },
                      {
                        value: "G",
                        label: "A/C BEUMER_JPPL-",
                      },
                    ]}
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Project Manager
                  </label>

                  <Select
                    showSearch
                    className="w-full"
                    placeholder="Select project manager"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    size={"large"}
                    options={[
                      {
                        value: "",
                        label: "Select project manager",
                      },
                      {
                        value: "P",
                        label: "L&T",
                      },
                      {
                        value: "G",
                        label: "A/C BEUMER_JPPL-",
                      },
                    ]}
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      ),
    },
    {
      title: "Product Details",
      content: (
        <section className="bg-white dark:bg-[#001529]">
          <div className="py-2 px-4 mx-auto w-full lg:py-2">
            <HeadingTemplate text={"Product Details"} />

            <form action="#">
              <div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
                <div className="sm:col-span-6 flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Product name
                  </label>

                  <Select
                    showSearch
                    className="w-full"
                    placeholder="Select product "
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    size={"large"}
                    options={[
                      {
                        value: "",
                        label: "Select product ",
                      },
                      {
                        value: "P",
                        label: "L&T",
                      },
                      {
                        value: "G",
                        label: "A/C BEUMER_JPPL-",
                      },
                    ]}
                  />
                </div>

                {/* <div className="w-full">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Article No.
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Article No."
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Part No.
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Part No."
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Model No.
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Model No."
                    required=""
                  />
                </div> */}
                <div className="sm:col-span-2 flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Quantity
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Quantity"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Rate
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Rate"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Discount
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Discount"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Unit
                  </label>

                  <Select
                    showSearch
                    className="w-full"
                    placeholder="Select unit"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    size={"large"}
                    options={[
                      {
                        value: "",
                        label: "Select unit",
                      },
                      {
                        value: "P",
                        label: "L&T",
                      },
                      {
                        value: "G",
                        label: "A/C BEUMER_JPPL-",
                      },
                    ]}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Unit Price
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Unit Price"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Total
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Total Price"
                    required=""
                  />
                </div>
                <div className="sm:col-span-4">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Packing Type
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Packing Type"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="sm:col-span-1 sm:flex sm:justify-center mt-5">
                    <label
                      for="brand"
                      className="block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                    >
                      Manufacture clearance required?
                    </label>
                    <Switch size="large" defaultChecked />
                  </div>
                </div>
                <div className="sm:col-span-6 flex flex-col">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Delivery date
                  </label>

                  <DatePicker
                    name="order_dt"
                    id="order_dt"
                    size={"large"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 w-full dark:focus:border-primary-500"
                    placeholder="Delivery date"
                    required=""
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
      ),
    },
    {
      title: "Terms & Conditions",
      content: (
        <div className="py-2 px-4 mx-auto w-full lg:py-2">
          <HeadingTemplate text={"Terms & Conditions"} />

          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price Basis
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Packing & Forwarding
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Freight & Insurance
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Payment Terms
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  LD Charges
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Test Certificate
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  O&M Manual
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Guarantee/Waranty certificate
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="catnm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Operation/Installation form
                </label>
                <input
                  type="text"
                  name="catnm"
                  id="catnm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type here..."
                  required=""
                />
              </div>
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Delivery Details",
      content: (
        <section className="bg-white dark:bg-[#001529]">
          <div className="py-2 px-4 mx-auto w-full lg:py-2">
            <HeadingTemplate text={"Delivery Address"} />

            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    for="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Address of NGA
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Your address here"
                    disabled
                  >
                    NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE
                    1/1A, Mahendra Roy Lane Kolkata 700046
                  </textarea>

                  <p
                    className="mt-3 text-sm text-gray-500 font-bold float-right dark:text-gray-300"
                    id="file_input_help"
                  >
                    Delivery to warehouse?{" "}
                    <Switch
                      size="small"
                      value={deliveryConfirm}
                      onClick={(e) => {
                        console.log(e);
                        setDelivery(e);
                        if (deliveryConfirm == false) {
                          console.log(deliveryConfirm);
                          setDeliveryAdd(
                            "NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046"
                          );
                          console.log(delivery);
                        } else {
                          setDeliveryAdd("");
                        }
                      }}
                      defaultChecked
                    />
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                    placeholder="Your address here"
                    disabled={type == "G" || deliveryConfirm}
                  >
                    {/* {delivery} */}
                    {type == "G" || deliveryConfirm
                      ? "NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046"
                      : ""}
                  </textarea>
                </div>
              </div>
            </form>
          </div>
        </section>
      ),
    },
    {
      title: "More",
      content: (
        <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="flex justify-between sm:col-span-1 mt-5">
            <label
              for="brand"
              className="block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
            >
              MDCC
            </label>
            <Switch size="large" defaultChecked />
          </div>
          <div className=" flex justify-between sm:col-span-1 sm:flex sm:justify-center mt-5">
            <label
              for="brand"
              className="block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
            >
              Inspection required?
            </label>
            <Switch
              size="large"
              value={insp}
              onChange={(e) => setInsp(e)}
              defaultChecked
            />
          </div>
          <div className="flex justify-between sm:col-span-1 sm:flex sm:justify-center mt-5">
            <label
              for="brand"
              className="block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
            >
              Drawing/Datasheet?
            </label>
            <Switch
              size="large"
              value={drawing}
              onChange={(e) => setDrawing(e)}
              defaultChecked
            />
          </div>
          <div className="flex justify-between  sm:col-span-1 sm:flex sm:justify-center mt-5">
            <label
              for="brand"
              className="block mr-2 text-sm font-medium text-gray-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300"
            >
              PI for advance?
            </label>
            <Switch size="large" defaultChecked />
          </div>
          {drawing && (
            <div className=" sm:col-span-4 mt-6">
              <label
                for="catnm"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Drawing/Datasheet to be implemented by
              </label>
              <input
                type="text"
                name="catnm"
                id="catnm"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type here..."
                required=""
              />
            </div>
          )}
          {insp && (
            <div className="sm:col-span-4">
              <label
                for="catnm"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Inspection Scope
              </label>
              <input
                type="text"
                name="catnm"
                id="catnm"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type here..."
                required=""
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Preview",
      content: (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <iframe
            className="col-span-2 w-full h-full"
            src={PDF}
            title="W3Schools Free Online Web Tutorials"
          ></iframe>
        </div>
      ),
    },
    {
      title: "Logs",
      content: (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <Timeline
            className="col-span-1 sm:mt-4"
            mode={"left"}
            items={[
              {
                label: "2015-09-01",
                children: "Create a service",
              },
              {
                label: "2015-09-01 09:12:11",
                children: "Solve initial network problems",
              },
              {
                children: "Technical testing",
              },
              {
                label: "2015-09-01 09:12:11",
                children: "Network problems being solved",
              },
            ]}
          />
          <section className="bg-white dark:bg-gray-900 col-span-1">
            <div className="py-2 w-full md:py-2 sm:-mt-5">
              {/* <h2 className="mb-4 text-xl font-bold text-green-900 dark:text-white  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300">
                Add log
              </h2> */}
              <form action="#">
                <label
                  for="description"
                  className="block mb-2 text-sm font-bold text-green-800 dark:text-white  focus:border-green-800 active:border-green-800 focus:ring-green-800 focus:border-1 duration-300"
                >
                  Your log
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-900 focus:border-green-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  factive:border-green-900  focus:border-1 duration-300 dark:focus:ring-green-900 dark:focus:border-green-900"
                  placeholder="Lorem Ipsum Dolor Sit Amet..."
                ></textarea>

                {/* </div> */}

                {/* </div> */}
              </form>
            </div>
          </section>
        </div>
      ),
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    lineHeight: "260px",
    // textAlign: 'center',
    color: "black",
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 70,
  };

  return (
    // <div className="py-8 mx-auto w-5/6 lg:py-16">
    //   <Steps
    //     responsive
    //     current={current}
    //     items={items}
    //     progressDot={customDot}
    //   />
    //   <div style={contentStyle}>{steps[current].content}</div>
    //   <div className="float-right">
    //     {current > 0 && (
    //       <button
    //         style={{ margin: "0 8px" }}
    //         className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-green-800 border border-green-800 bg-white hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600 hover:border-gray-600 hover:text-gray-600  dark:focus:ring-primary-900 "
    //         onClick={() => prev()}
    //       >
    //         Previous
    //       </button>
    //     )}
    //     {current < steps.length - 1 && (
    //       <button
    //         className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-800 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600"
    //         onClick={(e) => {
    //           next();
    //           console.log(e);
    //         }}
    //       >
    //         Next
    //       </button>
    //     )}

    //     {current === steps.length - 1 && (
    //       <button
    //         className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-800 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600"
    //         onClick={() => message.success("Processing complete!")}
    //       >
    //         Done
    //       </button>
    //     )}
    //   </div>

    // </div>
    <div className="card">
      <Stepper ref={stepperRef} style={{ flexBasis: "100%" }} linear>
        <StepperPanel header="Order Type">
        <OrderType pressNext={(values) =>{console.log(values); setOrderType(values.order_type);stepperRef.current.nextCallback()}}/>
      </StepperPanel>
        <StepperPanel header="Basic Details">
         <BasicDetails type={order_type} pressNext={(values) =>{console.log(values); stepperRef.current.nextCallback()}}  pressBack={(values) =>{stepperRef.current.prevCallback()}}/>
       
        </StepperPanel>
        <StepperPanel header="Product Details">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Content III
            </div>
          </div>
          <div className="flex pt-4 justify-content-start">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Terms & Conditions">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
             <TermsConditions/>
            </div>
          </div>
          <div className="flex pt-4 justify-content-start">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Delivery Details">
         <Delivery type={order_type} pressNext={(values) =>{console.log(values); stepperRef.current.nextCallback()}}  pressBack={() =>{stepperRef.current.prevCallback()}}/>
        </StepperPanel>
        <StepperPanel header="More">
         <More pressNext={(values) =>{console.log(values); stepperRef.current.nextCallback()}}  pressBack={() =>{stepperRef.current.prevCallback()}}/>
        </StepperPanel>
        <StepperPanel header="Preview">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Content III
            </div>
          </div>
          <div className="flex pt-4 justify-content-start">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Logs">
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Content III
            </div>
          </div>
          <div className="flex pt-4 justify-content-start">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}

export default PurchaseOrderForm;
