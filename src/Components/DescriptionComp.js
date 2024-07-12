import React from 'react'
import { Descriptions } from 'antd';
function DescriptionComp({printData}) {
    console.log(printData)
   

  return (
    <div>
      <Descriptions title="User Info" items={printData} />
    </div>
  )
}

export default DescriptionComp
