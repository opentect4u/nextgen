import React from 'react'
import { Drawer } from 'antd';
import VendorMaster from './MasterDrawer/VendorMaster';
import ProjectMaster from './MasterDrawer/ProjectMaster';
import ProductMaster from './MasterDrawer/ProductMaster';
import ClientMaster from './MasterDrawer/ClientMaster';
import UnitMaster from './MasterDrawer/UnitMaster';
import GSTMaster from './MasterDrawer/GSTMaster';
import Docs from './MasterDrawer/Docs';
import VendorMDCC from './MasterDrawer/VendorMDCC';
function DrawerComp({open,onClose,flag,data}) {
  console.log(data)
  return (
    <Drawer width={flag!=7 && flag!=8?900:300} title={flag==1?"Add Vendor":flag==2?"Add Project":flag==3?"Add Item":flag==4?"Add Client":flag==5?"Add Unit":flag==6?"Add GST":flag==7?'Upload/View Vendor Receipt (PO: '+data.po+')':flag==8?'Upload/View Vendor MDCC (PO: '+data.po+')':''} onClose={onClose} open={open}>
    {flag==1 && <VendorMaster onClose={onClose}/>}
    {flag==2 && <ProjectMaster onClose={onClose}/>}
    {flag==3 && <ProductMaster onClose={onClose}/>}
    {flag==4 && <ClientMaster onClose={onClose}/>}
    {flag==5 && <UnitMaster onClose={onClose}/>}
    {flag==6 && <GSTMaster onClose={onClose}/>}
    {flag==7 && <Docs onClose={onClose} data={data}/>}
    {flag==8 && <VendorMDCC onClose={onClose} data={data}/>}
  </Drawer>
  )
}

export default DrawerComp
