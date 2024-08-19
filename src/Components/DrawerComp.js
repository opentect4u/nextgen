import React from 'react'
import { Drawer } from 'antd';
import VendorMaster from './MasterDrawer/VendorMaster';
import ProjectMaster from './MasterDrawer/ProjectMaster';
import ProductMaster from './MasterDrawer/ProductMaster';
import ClientMaster from './MasterDrawer/ClientMaster';
function DrawerComp({open,onClose,flag}) {
  return (
    <Drawer width={900} title={flag==1?"Add Vendor":flag==2?"Add Project":flag==3?"Add Item":"Add Client"} onClose={onClose} open={open}>
    {flag==1 && <VendorMaster onClose={onClose}/>}
    {flag==2 && <ProjectMaster onClose={onClose}/>}
    {flag==3 && <ProductMaster onClose={onClose}/>}
    {flag==4 && <ClientMaster onClose={onClose}/>}
  </Drawer>
  )
}

export default DrawerComp
