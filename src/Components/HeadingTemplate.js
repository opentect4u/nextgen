import React from 'react'
import Backbtn from './Backbtn'

function HeadingTemplate({text}) {
  return (
    <div className="bg-transparent dark:bg-gray-800 relative shadow-md rounded-full overflow-hidden mb-5">
    <div className="flex flex-col bg-green-500 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-1 space-x-2 px-4 py-2">
    <h2 className="text-xl font-bold text-white my-1  dark:text-gray-400 ">{text}</h2>
    <Backbtn/>
    </div>
    </div>
  )
}

export default HeadingTemplate
