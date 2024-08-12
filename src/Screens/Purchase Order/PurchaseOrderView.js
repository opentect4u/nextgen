import React, { useEffect } from 'react';
import { routePaths } from '../../Assets/Data/Routes'
import { useLocation } from 'react-router-dom'
import MasterViewTemplate from '../../Components/MasterViewTemplate';
import { masterheaders } from '../../Assets/Data/ColumnData';
function PurchaseOrderView() {
  const locationpath = useLocation();
  
  var template =
    locationpath.pathname.split("/")[
      locationpath.pathname.split("/").length - 1
    ];
  var templateData = masterheaders[template];
  // console.log(locationpath.pathname.split("/")[
  //   locationpath.pathname.split("/").length - 1
  // ])
  useEffect(()=>{
    localStorage.removeItem('id')
    localStorage.removeItem('po_issue_date')
    localStorage.removeItem('po_status')

     localStorage.removeItem("order_id")
     localStorage.removeItem("order_date")
     localStorage.removeItem("order_type")
     localStorage.removeItem("proj_name")
     localStorage.removeItem("vendor_name")
    localStorage.removeItem("itemList")
     localStorage.removeItem("terms")
     localStorage.removeItem('termList')
     localStorage.removeItem("ship_to")
     localStorage.removeItem("bill_to")
      localStorage.removeItem('ware_house_flag')
      localStorage.removeItem("notes")
      localStorage.removeItem("mdcc_flag")
      localStorage.removeItem("mdcc")
      localStorage.removeItem("insp_flag")
      localStorage.removeItem("insp")
      localStorage.removeItem("drawing_flag")
      localStorage.removeItem("drawing")
      localStorage.removeItem("dt")
  },[ locationpath.pathname.split("/")[
    locationpath.pathname.split("/").length - 1
  ]])
    return (
      locationpath.pathname.split("/")[
        locationpath.pathname.split("/").length - 1
      ]=='P' ?  <MasterViewTemplate
      to={routePaths.PURCHASEORDERFORM}
      templateData={templateData}
      template={template}
      _url={"/api/getpopending"}
    />: <MasterViewTemplate
    to={routePaths.PURCHASEORDERFORM}
    templateData={templateData}
    template={template}
    _url={"/api/getpoapproved"}
  />
    )
}

export default PurchaseOrderView;
