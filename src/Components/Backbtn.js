import React from 'react'
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FloatButton } from 'antd';
function Backbtn() {
  const navigation = useNavigate()
  return (
    <>
      <FloatButton icon={<ArrowBackIcon/>} className='sm:hidden' onClick={() => navigation(-1)} type="primary" style={{ right: 24, bottom: 80 }} />
      <div className="hidden sm:flex sm:justify-end items-center sm:-mt-[44px]">
        <Tooltip title="Back">
          <button className=" inline-flex items-center justify-center  text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-gray-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={() => navigation(-1)}><ArrowBackIcon /></button>
        </Tooltip>
      </div>
    </>
  )
}

export default Backbtn
