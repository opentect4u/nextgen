import React, { useState } from "react";
import { Select } from "antd";
import { Dropdown } from 'primereact/dropdown';
function TDInputTemplate(props) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <>
      {/* <label className="block mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100"> */}
      <label className="block mb-2 text-sm font-semibold text-gray-300 dark:text-gray-100">
        {" "}
        {props.label}
      </label>
      {props.mode == 1 && (
        <input
          type={props.type}
          name={props.name}
          value={props.formControlName}
          // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          className="bg-gray-700 border-1 border-green-500 text-white text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={props.placeholder}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          disabled={props.disabled}
        />
      )}
      {props.mode == 2 && (
        // <Select
        //   showSearch
        //   className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
        //   name={props.name}
        //   value={props.formControlName}
        //   placeholder={props.placeholder}
        //   onChange={(value,key) => {console.log(value,key);props.handleChange({ target: { name: props.name,value } })}}
        //   onBlur={() => props.handleBlur({ target: { name: props.name } })}
        //   optionFilterProp="label"
        //   size={"large"}
        //   options={props.data}
        // />
        // <Dropdown 
        // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        // filter
        // value={props.formControlName} 
        // onChange={props.handleChange}
        // name={props.name}
        // placeholder={props.placeholder}
        // options={props?.data} 
        // optionLabel="name"
        // onBlur={props.handleBlur}
        // />

    <select id="countries" className="bg-gray-700 border-1 border-green-500 text-white text-sm rounded-full  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    value={props.formControlName} 
    onChange={props.handleChange}
    name={props.name}
    placeholder={props.placeholder}
    options={props?.data} 
    onBlur={props.handleBlur}
    disabled={props.disabled}
    >
    <option selected>{props.placeholder}</option>
    {props?.data?.map((item, index) => ( 
    <option value={item.code}>{item.name}</option>
    
    ))}
  </select>
      )}
      {props.mode == 3 && (
        <textarea
          rows="8"
          className="bg-gray-700 border-1 border-green-500 text-white text-sm rounded-lg  focus:border-green-500 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          name={props.name}
          value={props.formControlName}
          placeholder={props.placeholder}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      )}
    </>
  );
}

export default TDInputTemplate;
