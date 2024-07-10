import React from 'react'
import LOGO from '../../Assets/Images/Logo.png'
const ForgotPass = () => {
    return (
        <div className='bg-[#004900] flex justify-center items-center h-screen w-screen'>
            <div className='bg-white h-64 w-96 px-6 rounded-lg shadow-lg'  >
                <div className='flex items-center justify-center'>
                    <img src={LOGO} className="h-20 mt-4" alt="Flowbite Logo" />
                </div>
                <div className='flex justify-center mt-3'>          
                <input type="text" name='email' className="block border-gray-300 text-[13px] pt-2 p-1 rounded-lg  w-full border m-3 focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300" placeholder="name@company.com" />
                </div>
                <div className='block text-sm'>
                    <div className='flex justify-center'>
                  <button type="submit" className='bg-green-900 hover:bg-green-800 m-3 h-10 w-full text-white p-3 rounded-md disabled:bg-green-200'>Submit</button>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass