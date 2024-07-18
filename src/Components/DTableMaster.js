import React, { useRef, useState } from 'react'
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import { ContextMenu } from 'primereact/contextmenu';
import {SearchOutlined,PrinterOutlined,MoreOutlined} from '@ant-design/icons'
import { Dropdown, Space } from 'antd';
import { motion } from "framer-motion"

function DTableMaster({ headers,
    data,
    flag,
    onPress,
    title,
    btnText,
    onclick,
    setSearch,
    to
}) {
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const [selectedItem, setSelectedItem] = useState(null);
  const [theme,setTheme] = useState(localStorage.getItem('col'))
  useState(()=>{
    setTheme(localStorage.getItem('col'))

  },[localStorage.getItem('col')])
  const cm = useRef(null);
  const navigate=useNavigate()
  const items= [
    {
      key: '1',
      label: (
        <div onClick={()=>print()} >
           <PrinterOutlined /> Print this table
        </div>
      ),
    }
  ];
  var id;
  const iconTemplate = () => {
    return flag == 1 ? (
      <EditIcon className="text-blue-900" />
    ) : (
      <VisibilityIcon className="text-blue-900" />
    );
  };
 
  const onViewSelect = (event) => {
    id = event;
    navigate(to+id.sl_no)
    console.log(id);
  };

  const onRowSelect = (event) => {
    console.log(event,'event')
    id = event.data;
    navigate(to+id.sl_no)
  };
  
  const menuModel = [
    { label: '  View', icon: <SearchOutlined className='mr-3'/>, command: () => onViewSelect(selectedItem) },
    // { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => console.log(selectedProduct) },
    { label: '  Print', icon: <PrinterOutlined className='mr-3'/>, command: () => console.log('hello') },
];
  const onRowUnselect = (event) => {};
  function print() {

    var divToPrint = document.getElementById('tablePrint');
  
    var WindowObject = window.open('', 'Print-Window');
    WindowObject.document.open();
    WindowObject.document.writeln('<!DOCTYPE html>');
    WindowObject.document.writeln('<html><head><title></title><style type="text/css">');
  
  
    WindowObject.document.writeln('@media print { .center { text-align: center;}' +
        '                                         .inline { display: inline; }' +
        '                                         .underline { text-decoration: underline; }' +
        '                                         .left { margin-left: 315px;} ' +
        '                                         .right { margin-right: 375px; display: inline; }' +
        '                                          table { border-collapse: collapse; font-size: 10px;}' +
        '                                          th, td { border: 1px solid black; border-collapse: collapse; padding: 6px;}' +
        '                                           th, td { }' +
        '                                         .border { border: 1px solid black; } ' +
        '                                         .bottom { bottom: 5px; width: 100%; position: fixed ' +
        '                                       ' +
        '                                   } .p-paginator-bottom.p-paginator.p-component { display: none; } .heading{display: flex; flex-direction: column; justify-content: center; align-items: center;font-weight:800;margin-bottom:15px} } </style>');
    WindowObject.document.writeln('</head><body onload="window.print()">');
    WindowObject.document.writeln(divToPrint.innerHTML);
    WindowObject.document.writeln('</body></html>');
    WindowObject.document.close();
    setTimeout(function () {
        WindowObject.close();
    }, 10);
  
  }
  const renderTooltip = (rowData, field) => {
    return (
      <Tooltip title="Click to view details" arrow>
      <span>{rowData[field]}</span>
    </Tooltip>
    );
  };
  return (
    <motion.section initial={{opacity:0,y:1000}} animate={{opacity:1,y:0}} transition={{delay:0.5,type:'tween',stiffness:100}} className="bg-transparent dark:bg-[#001529] py-3 sm:py-5 w-full -mt-5">
   {title && 
   <div className="bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden">
    {/* <div className="flex flex-col bg-[#C05746] dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-1"> */}
    <div className="flex flex-col bg-emerald-700 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-1">
    {/* <div className="flex flex-col bg-gray-800 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-1"> */}
      <div class="w-full">
        <div class="flex items-center justify-evenly">
          <motion.h2 initial={{opacity:0,y:-50}} animate={{opacity:1,y:0}} transition={{delay:1, type:'just'}} className="text-xl font-bold text-white dark:text-white sm:block hidden mx-5">
          {/* <h2 className="text-xl font-bold text-green-500 dark:text-white sm:block hidden mx-5"> */}
            {title}
          </motion.h2>

          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center md:ml-4 pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <motion.input
              type="text"
              id="simple-search"
              initial={{opacity:0,width:0}} animate={{opacity:1,width:'95%'}} transition={{delay:1.1, type:'just'}}
              className="bg-white border rounded-full border-emerald-500 text-gray-800 text-sm  block w-full md:w-11/12 pl-10 p-2 dark:bg-gray-800 md:ml-4  duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              //  className="bg-gray-800 border rounded-full border-green-500 text-gray-300 text-sm focus:ring-gray-800 focus:border-gray-800 block w-full md:w-11/12 pl-10 p-2 dark:bg-gray-800 md:ml-4 focus:border-1 duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
              required=""
              // value={search}
              onChange={(text) => setSearch(text.target.value)}
            />
          </div>
        {btnText &&  <motion.div  initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:1.3, type:'just'}} class="w-full hidden md:block  md:w-auto sm:flex sm:flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Tooltip title={btnText}>
              <Link to={to+0}
                type="submit"
                // onClick={() => onclick()}
               className="flex items-center justify-center text-emerald-700 bg-white hover:bg-primary-800  font-medium rounded-full hover:scale-110 text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-700 focus:outline-none  transition duration-0 hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800 "
                  // className="flex items-center justify-center text-gray-300 bg-green-500 hover:bg-primary-800  font-medium rounded-full hover:scale-110 text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-700 focus:outline-none  transition duration-0 hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800 "
              >
                <AddIcon /> {btnText}
              </Link>
            </Tooltip>
          </motion.div>}
          <div className='p-1'>
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <MoreOutlined className='flex items-center justify-center  text-white   rounded-full  text-3xl font-bold px-2 h-10 w-10 py-2 dark:text-white focus:outline-none  transition duration-0 hover:duration-500 dark:focus:ring-primary-800' />
          </Dropdown>
         {/* <button className=' className="flex items-center justify-center text-gray-600 bg-white hover:bg-primary-800 focus:ring-green-900 font-medium rounded-full hover:scale-110 text-sm px-2 h-10 w-10 py-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-700 focus:outline-none  transition duration-0 hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800' >
          <PrinterOutlined onClick={()=>print()}/>
          </button> */}
          </div>
        </div>
      </div>
      </div>
      </div>
      }
      <div>
        <div className="card w-full mt-5">
        {/* <ContextMenu className='dark:bg-gray-800 dark:text-white hover:text-green-900' model={menuModel} ref={cm} onHide={() => setSelectedItem(null)} /> */}
          <DataTable
            value={data}
            // onContextMenu={(e) => cm.current.show(e.originalEvent)} 
            // contextMenuSelection={selectedItem} 
            // onContextMenuSelectionChange={(e) => setSelectedItem(e.value)} 
            showGridlines={true}
            stripedRows
            stickyHeader="true"
            scrollable
            paginator
            rows={10}
            
            rowsPerPageOptions={[5, 10, 25, 50, 100, data?.length]}
            rowClassName='bg-white text-gray-800 border border-b-gray-300 border-r-white border-l-white active:border-0 hover:bg-gray-200 hover:text-gray-900  duration-500 space-y-2 dark:hover:bg-[#1e4834]'
            tableStyle={{ minWidth: "100%",fontSize:'14px' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            paginatorClassName='bg-white text-emerald-500'
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            styleClass="p-datatable-gridlines dark:bg-gray-800 dark:text-gray-300 shadow-lg"
            className='shadow-lg rounded-lg'
            selectionMode="single"
            selection={selectedItem}
            onSelectionChange={(e) => setSelectedItem(e.value)}
            dataKey="id"
            onRowSelect={onRowSelect}
            onRowUnselect={onRowUnselect}
            metaKeySelection={false}
          >
            {headers.map((item, index) => (
              // <>
              
              <Column
                key={index}
                field={item.name}
                header={item.value}
                headerClassName={'text-emerald-700 bg-white border-b-green-500  dark:bg-gray-700 dark:text-white dark:font-bold'}
                style={{ width: "10%" }}
                body={(rowData) => renderTooltip(rowData, item.name)}
              ></Column>
            ))}
            {flag == 1 && (
              <Column
                body={iconTemplate}
                header={"Action"}
                headerClassName="text-blue-900 bg-blue-300"
                style={{ width: "10%" }}
                frozen
              ></Column>
            )}
            {flag == 2 && (
              <Column
                body={iconTemplate}
                header={"Action"}
                headerClassName="text-blue-900 bg-blue-300"
                style={{ width: "10%" }}
                frozen
              ></Column>
            )}
          </DataTable>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{type:'spring',stiffness:400}}>
          
          </motion.div>
        </div>
        <div className='hidden w-full' id='tablePrint'>
        <DataTable
            value={data}
            // onContextMenu={(e) => cm.current.show(e.originalEvent)} 
            // contextMenuSelection={selectedItem} 
            // onContextMenuSelectionChange={(e) => setSelectedItem(e.value)} 
            showGridlines={true}
            stripedRows
            stickyHeader="true"
            scrollable
            paginator
            rows={data?.length}
            
            rowsPerPageOptions={[5, 10, 25, 50, 100, data?.length]}
            rowClassName=' border border-b-gray-300 dark:border-green-900 hover:bg-emerald-500 hover:font-semibold dark:hover:bg-[#1e4834]'
            tableStyle={{ minWidth: "100%",fontSize:'14px' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            paginatorClassName='dark:bg-white dark:text-gray-700'
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            styleClass="p-datatable-gridlines dark:bg-gray-800 dark:text-gray-300"
            selectionMode="single"
            selection={selectedItem}
            onSelectionChange={(e) => setSelectedItem(e.value)}
            dataKey="id"
            onRowSelect={onRowSelect}
            onRowUnselect={onRowUnselect}
            metaKeySelection={false}
          >
            {headers?.map((item, index) => (
              // <>
              <Column
                key={index}
                field={item.name}
                header={item.value}
                headerClassName={theme>0?`bg-color-theme-${theme} text-green-800 dark:bg-gray-700 dark:text-white dark:font-bold`:'text-green-800 bg-gray-300 dark:bg-gray-700 dark:text-white dark:font-bold'}
                style={{ width: "10%" }}
              ></Column>
            ))}
            {flag == 1 && (
              <Column
                body={iconTemplate}
                header={"Action"}
                headerClassName="text-blue-900 bg-blue-300"
                style={{ width: "10%" }}
                frozen
              ></Column>
            )}
            {flag == 2 && (
              <Column
                body={iconTemplate}
                header={"Action"}
                headerClassName="text-blue-900 bg-blue-300"
                style={{ width: "10%" }}
                frozen
              ></Column>
            )}
          </DataTable>
        </div>
      </div>
    </motion.section>
  );
}

export default DTableMaster
