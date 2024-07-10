import React from 'react'
function BtnComp({onReset,mode}) {
  return (
    <div className="flex justify-center">
    {mode=='A' &&  <button
        type="submit"
        className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-green-800 border border-green-800 bg-white hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600 hover:border-gray-600 hover:text-gray-600  dark:focus:ring-primary-900 "
        onClick={onReset}
    >    
        Reset
    </button>}
    <button
        type="submit"
        className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-800 hover:duration-500 hover:scale-110  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 hover:bg-gray-600 dark:bg-[#22543d] dark:hover:bg-gray-600"
    >
        Submit
    </button>
</div>
  )
}

export default BtnComp
