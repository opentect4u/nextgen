import React from 'react'
import { Alert } from 'antd';
function VError({title}) {
  return (
    // <div className='text-red-500 text-sm py-2 px-2'>{title}!</div>
    <Alert message={title} type="error" showIcon className='my-2'/>
  )
}

export default VError
