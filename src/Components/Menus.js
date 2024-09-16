import React from "react";
import {
  BarChartOutlined,
  DatabaseOutlined,
  ProjectOutlined,
  BlockOutlined,
  ToolOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  ShopOutlined,
  PicRightOutlined,
  HddOutlined,
  BarsOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  SwapOutlined,
  NodeExpandOutlined,
  NodeCollapseOutlined,
  AuditOutlined,
  UserOutlined,
  SolutionOutlined,
  ReconciliationOutlined,
  PayCircleOutlined,
  IdcardOutlined,
  BankOutlined,
  MailOutlined,
  PercentageOutlined,
  DropboxOutlined,
  CheckCircleOutlined,
  IssuesCloseOutlined,
  SignatureOutlined,
  CloseCircleOutlined,
  TruckOutlined,
  DockerOutlined,
  AccountBookOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { routePaths } from "../Assets/Data/Routes";
import { CheckOutlined, UploadFileOutlined } from "@mui/icons-material";

function Menus({ theme}) {
  const [current, setCurrent] = React.useState('sub1');

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    {
      key: "sub1",
      icon: <BarChartOutlined />,
      label: <Link to={""}>Dashboard </Link>,
    },
    {
      label: "Masters",
      key: "sub2",
      icon: <DatabaseOutlined />,
          children: [
            {
              key: "masters:dept",
              icon: <BankOutlined />,
              label: <Link to={routePaths.DEPARTMENTS}>Department</Link>,
            },
            // {
            //   key: "masters:desig",
            //   icon: <IdcardOutlined />,
            //   label: <Link to={routePaths.DESIGNATIONS}>Designation</Link>,
            // },
            {
              key: "masters:cat",
              icon: <BlockOutlined />,
              label: <Link to={routePaths.CATEGORIES}>Product Category</Link>,
            },
            // {
            //   key: "masters:3",
            //   icon: <ProjectOutlined />,
            //   label: <Link to={routePaths.PROJECTS}>Projects</Link>,
            // },

            {
              key: "masters:unit",
              icon: <PayCircleOutlined />,
              label: <Link to={routePaths.UNITS}>Unit</Link>,
            },
            {
              key: "masters:product",
              icon: <ToolOutlined />,
              label: <Link to={routePaths.PRODUCTS}>Product</Link>,

            },
            {
              key: "masters:vendor",
              icon: <ShopOutlined />,
              label: <Link to={routePaths.VENDORS}>Vendor</Link>,

            },
            {
              key: "masters:client",
              icon: <UserSwitchOutlined />,
              label: <Link to={routePaths.CLIENTS}>Client </Link>,
            },
            {
              key: "masters:gst",
              icon: <PercentageOutlined />,
              label: <Link to={routePaths.GST}>GST </Link>,
            },
            // {
            //   key: "masters:user",
            //   icon: <UserAddOutlined />,
            //   label: <Link to={routePaths.USERS}>Company User </Link>,
            // },
          ],
       
    },
   
    {
      label: "Orders",
      key: "sub4",
      icon: <AuditOutlined />,
          children:[
            {
             // key: "client-order",
              // icon: <UserOutlined />,
              // label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
              key: "master:projects",
              icon: <DockerOutlined />,
              label: 'Projects',

              children:[
                
                {
                  // key: "client-order",
                  // icon: <UserOutlined />,
                  // label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
                  key: "master:client-orders",
                  icon: <UserSwitchOutlined />,
                  label: <Link to={routePaths.PROJECTS}>Client Orders</Link>,
              }
            
            
            
            ]
          },
          {
            // key: "client-order",
             // icon: <UserOutlined />,
             // label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
             key: "master:purchase",
             icon: <AccountBookOutlined />,
             label: 'Purchase',

             children:[
              {
                    label: <Link to={routePaths.PURCHASEORDER+'/P'}>Vendor Orders</Link>,
                    key: "purchase-order",
                    icon: <SolutionOutlined />,
                  },
                  
                  
                  {
                    label: <Link to={routePaths.EXISTINGORDER}>Existing Purchase Orders</Link>,
                    key: "existing-order",
                    icon: <CheckCircleOutlined />,
                  },
                  {
                    label: <Link to={routePaths.AMENDORDER}>Amend Purchase Orders</Link>,
                    key: "amend-order",
                    icon: <SignatureOutlined />,
                  },
                  {
                    // label: <Link to={routePaths.PURCHASEORDER+'/A'}>Approve Vendor Orders</Link>,
                    label: <Link to={routePaths.APPROVEORDER}>Approve Vendor Orders</Link>,
                    key: "approve-purchase-order",
                    icon: <CheckOutlined />,
                  },
                  {
                    label: <Link to={routePaths.TESTCERTHOME}>Upload Test Certificate</Link>,
                    key: "uploadtc-purchase-order",
                    icon: <UploadFileOutlined />,
                  },
                  
                  // {
                  //   label: <Link to={routePaths.CANCELHOME}>Cancel Purchase Orders</Link>,
                  //   key: "cancel-purchase-order",
                  //   icon: <CloseCircleOutlined />,
                  
            ]
          }
          
        
        
        ],
          // children: [
          //   {
          //     // key: "client-order",
          //     // icon: <UserOutlined />,
          //     // label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
          //     key: "master:projects",
          //     icon: <UserSwitchOutlined />,
          //     label: <Link to={routePaths.PROJECTS}>Client Orders</Link>,
          //   },
          //   {
          //     label: <Link to={routePaths.PURCHASEORDER+'/P'}>Vendor Orders</Link>,
          //     key: "purchase-order",
          //     icon: <SolutionOutlined />,
          //   },
            
            
          //   {
          //     label: <Link to={routePaths.EXISTINGORDER}>Existing Purchase Orders</Link>,
          //     key: "existing-order",
          //     icon: <CheckCircleOutlined />,
          //   },
          //   {
          //     label: <Link to={routePaths.AMENDORDER}>Amend Purchase Orders</Link>,
          //     key: "amend-order",
          //     icon: <SignatureOutlined />,
          //   },
          //   {
          //     // label: <Link to={routePaths.PURCHASEORDER+'/A'}>Approve Vendor Orders</Link>,
          //     label: <Link to={routePaths.APPROVEORDER}>Approve Vendor Orders</Link>,
          //     key: "approve-purchase-order",
          //     icon: <CheckOutlined />,
          //   },
            
          //   // {
          //   //   label: <Link to={routePaths.CANCELHOME}>Cancel Purchase Orders</Link>,
          //   //   key: "cancel-purchase-order",
          //   //   icon: <CloseCircleOutlined />,
          //   // }
            
          // ],
       
    },
    
    // {
    //   label: <Link to={routePaths.MDCCHOME}>Upload MDCC</Link>,
    //   key: "mdcc-purchase-order",
    //   icon: <UploadFileOutlined />,
    // },
    {
      label:  <Link to={routePaths.DELIVERYCUSTOMERVIEW}> MRN </Link>,
      key: "material-delivery",
      icon: <TruckOutlined />,
      // children: [
           
      //   {
      //     label: <Link to={routePaths.DELIVERYCUSTOMERVIEW}>To Client</Link>,
      //     key: "to-cus",
      //     icon: <UserOutlined />,
      //   },
       
      //   {
      //     label: <Link to={routePaths.STOCKASSIGNVIEW}>To Warehouse</Link>,
      //     key: "to-ware",
      //     icon: <ShopOutlined />,
      //   },
       
      //     ],
    },
    {
      label: "Stock",
      key: "sub5",
      icon: <DropboxOutlined />,
      children: [
           
            {
              label: <Link to={routePaths.STOCKUPDATE}>Open/Update Stock</Link>,
              key: "stock-update",
              icon: <DropboxOutlined />,
            },
           
            {
              label: <Link to={routePaths.STOCKASSIGNVIEW}>Assign</Link>,
              key: "stock-assign",
              icon: <ReconciliationOutlined />,
            },
            {
              label: <Link to={routePaths.STOCKINVIEW}>Stock In</Link>,
              key: "stock-in",
              icon: <ArrowRightOutlined />,
            },
            {
              label: <Link to={routePaths.STOCKOUTVIEW}>Stock Out</Link>,
              key: "stock-out",
              icon: <ArrowLeftOutlined />,
            },
            {
              label: "Transfer",
              key: "stock-trans",
              icon: <SwapOutlined />,
              children: [
                
                    {
                      label: <Link to={routePaths.REQUISITIONSENTVIEW}>Requisitions sent</Link>,
                      key: "req-mk",
                      icon: <NodeExpandOutlined />,
                    },
                    {
                      label: <Link to={routePaths.REQUISITIONRCVDVIEW}>Requisitions received</Link>,
                      key: "req-rec",
                      icon: <NodeCollapseOutlined />,
                    },
                  ],
            }
              ],
    },
         
    {
      label: "Reports",
      key: "sub6",
      icon: <BarsOutlined />,
    },
  ];

 

  return (
    <div >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
      />
    </div>
  );
}

export default Menus;
