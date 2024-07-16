import React from 'react'
import LOGO from '../../Assets/Images/inverted.png'
import TDInputTemplate from '../../Components/TDInputTemplate'
import { motion } from "framer-motion"

const ForgotPass = () => {
    return (
        <div className='bg-emerald-50 flex justify-center items-center h-screen w-screen'>
            <motion.div  initial={{opacity:0,scale:1.3}} animate={{opacity:1,scale:1}} transition={{delay:0.5,type:'spring'
      }} className='bg-emerald-800 h-64 w-96 px-6 rounded-3xl shadow-lg'  >
                <div className='flex items-center justify-center'>
                    <img src={LOGO} className="h-20 mt-4" alt="Flowbite Logo" />
                </div>
                <div className='my-3'>          
                <TDInputTemplate
                    placeholder="youremail@gmail.com"
                    type="email"
                    label="Your email"
                    name="email"
                    formControlName=''
                    handleChange=''
                    handleBlur=''
                    mode={1}
                  />
                </div>
                <div className='block text-sm'>
                    <div className='flex justify-center'>
                  <button type="submit" className="bg-emerald-800 hover:duration-500 w-full hover:scale-105 hover:bg-green-800  text-emerald-800 p-3 rounded-full">Submit</button>
                  </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ForgotPass