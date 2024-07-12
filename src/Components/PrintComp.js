import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import {PrinterOutlined} from '@ant-design/icons'
import { FloatButton } from 'antd';
import DescriptionComp from './DescriptionComp';
import { printMap } from '../Assets/Data/PrintColumns';

function PrintComp({toPrint}) {
    console.log(toPrint)
    var items=[]
    for(let i of Object.keys(toPrint)){
        if(i!='serial_number')
        items.push({key:i,label:printMap[i]+' ',children:toPrint[i]})
    }

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
  return (
    <>
      <FloatButton icon={<PrinterOutlined />} onClick={()=>print()} className='sm:hidden' type="primary" style={{ right: 24, bottom: 80 }} />
      <div className="hidden sm:flex sm:justify-end items-center sm:-mt-5 ">
        <Tooltip title="Print">
          <button onClick={()=>print()} className="mt-5 inline-flex items-center justify-center mr-4 sm:mr-1 mb-1 sm:mt-[4px] text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-green-800 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" ><PrinterOutlined /></button>
        </Tooltip>
        <div className='hidden' id='tablePrint'>
            <DescriptionComp printData={items}/>
        </div>
      </div>
    </>
  )
}

export default PrintComp
