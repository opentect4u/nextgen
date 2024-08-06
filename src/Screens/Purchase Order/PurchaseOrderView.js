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
    return (
        <MasterViewTemplate
      to={routePaths.PURCHASEORDERFORM}
      templateData={templateData}
      template={template}
      _url={"/api/getpo"}
    />
    )
}

export default PurchaseOrderView;
