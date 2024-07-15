import React from 'react'
import {SaveOutlined,DeleteOutlined,ReloadOutlined} from '@ant-design/icons'
function BtnComp({onReset,mode,onDelete}) {
  return (
    <div className="flex justify-center">
    {mode=='A' &&  <button
        type="reset"
       className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#C05746] bg-[#C05746] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900"
        onClick={onReset}
    >   
    <ReloadOutlined className='mr-2'/> 
        Reset
    </button>}
    {mode=='E' &&  <button
        type="button"
        className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#C05746] bg-[#C05746] hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900"
        onClick={onDelete}
    >    
    <DeleteOutlined className='mr-2'/>
        Delete
    </button>}
    <button
        type="submit"
        className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-500 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600"
    >
        <SaveOutlined className='mr-2' />
        Submit
    </button>
</div>
  )
}

export default BtnComp
