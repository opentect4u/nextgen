import React from 'react'
import { routePaths } from '../../../Assets/Data/Routes'
import { PrinterOutlined, TruckOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import DeliveryViewTemplate from '../../../Components/DeliveryViewTemplate'
function ToCustomerView() {
return ( <DeliveryViewTemplate flag='C' title='Test Certificate'/>)

}

export default ToCustomerView
