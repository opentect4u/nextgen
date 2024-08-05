import React from 'react'

function Viewdetails({click}) {
  return (
    <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400"><a href="#" class="font-medium text-green-900 hover:underline dark:text-blue-500" onClick={()=>click()}>View details</a>.</p>
  )
}

export default Viewdetails
