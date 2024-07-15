import React from 'react'
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FloatButton } from 'antd';
import {motion} from 'framer-motion'
function Backbtn() {
  const navigation = useNavigate()
  return (
    <>
      <FloatButton icon={<ArrowBackIcon/>} className='sm:hidden' onClick={() => navigation(-1)} type="primary" style={{ right: 24, bottom: 80 }} />
      <motion.div  initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.3, type:'just'}} className="hidden sm:flex sm:justify-end items-center">
        <Tooltip title="Back">
          <button className=" inline-flex items-center justify-center  text-sm font-medium text-center text-white bg-primary-700 h-9 w-9  bg-gray-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 hover:bg-[#C05746] dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={() => navigation(-1)}><ArrowBackIcon /></button>
        </Tooltip>
      </motion.div>
    </>
  )
}

export default Backbtn
