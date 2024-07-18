import React from 'react'
import { Alert } from 'antd';
import {motion} from 'framer-motion'
import { Opacity } from '@mui/icons-material';
function VError({title}) {
  return (
    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}  transition={{delay:0.1,type:'tween',stiffness:500}} className='text-[#92140C] text-sm font-semibold py-2 px-2'>{title}!</motion.div>
    // <Alert message={title} type="error" showIcon className='my-2'/>
  )
}

export default VError
