import React, { useEffect } from "react";
import {
  BarChartOutlined,
  DatabaseOutlined,
  BlockOutlined,
  ToolOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  ShopOutlined,
  BarsOutlined,
  AuditOutlined,
  SolutionOutlined,
  PayCircleOutlined,
  BankOutlined,
  PercentageOutlined,
  CheckCircleOutlined,
  SignatureOutlined,
  DockerOutlined,
  AccountBookOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
  InteractionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { routePaths } from "../Assets/Data/Routes";
import { CheckOutlined, LockOpenOutlined, UploadFileOutlined } from "@mui/icons-material";


function Menus({ theme,data }) {
  const [current, setCurrent] = React.useState("sub1");
 console.log(data)
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
      disabled: data?.masters=='Y'?false:true,
      children: [
        {
          key: "masters:dept",
          icon: <BankOutlined />,
          label: <Link disabled={data?.department=='Y'?false:true} to={routePaths.DEPARTMENTS}>Department</Link>,
          disabled:data?.department=='Y'?false:true

        },
        // {
        //   key: "masters:desig",
        //   icon: <IdcardOutlined />,
        //   label: <Link to={routePaths.DESIGNATIONS}>Designation</Link>,
        // },
        {
          key: "masters:cat",
          icon: <BlockOutlined />,
          label: <Link disabled={data?.prod_catg=='Y'?false:true} to={routePaths.CATEGORIES}>Product Category</Link>,
          disabled:data?.prod_catg=='N'?true:false
        },
        // {
        //   key: "masters:3",
        //   icon: <ProjectOutlined />,
        //   label: <Link to={routePaths.PROJECTS}>Projects</Link>,
        // },

        {
          key: "masters:unit",
          icon: <PayCircleOutlined />,
          label: <Link disabled={data?.unit=='Y'?false:true} to={routePaths.UNITS}>Unit</Link>,
          disabled:data?.unit=='Y'?false:true

        },
        {
          key: "masters:product",
          icon: <ToolOutlined />,
          label: <Link disabled={data?.product=='Y'?false:true} to={routePaths.PRODUCTS}>Product</Link>,
          disabled:data?.product=='Y'?false:true

        },
        {
          key: "masters:vendor",
          icon: <ShopOutlined />,
          label: <Link disabled={data?.vendor=='Y'?false:true} to={routePaths.VENDORS}>Vendor</Link>,
          disabled:data?.vendor=='Y'?false:true

        },
        {
          key: "masters:client",
          icon: <UserSwitchOutlined />,
          label: <Link disabled={data?.client=='Y'?false:true} to={routePaths.CLIENTS}>Client </Link>,
          disabled:data?.client=='Y'?false:true

        },
        {
          key: "masters:gst",
          icon: <PercentageOutlined />,
          label: <Link disabled={data?.gst=='Y'?false:true} to={routePaths.GST}>GST </Link>,
          disabled:data?.gst=='Y'?false:true

        },
        {
          key: "masters:user",
          icon: <UserAddOutlined />,
          label: <Link  disabled={data?.comp_user=='Y'?false:true} to={routePaths.USERS}>Company Users </Link>,
          disabled:data?.comp_user=='Y'?false:true

        },
        {
          key: "masters:permissions",
          icon: <LockOpenOutlined />,
          label: <Link disabled={data?.permission=='Y'?false:true} to={routePaths.PERMISSIONS}>Permissions</Link>,
          disabled:data?.permission=='Y'?false:true

        },
      ],
    },

    {
      label: "Orders",
      key: "sub4",
      icon: <AuditOutlined />,
      disabled:data?.client_orders=='N' && data?.purchase=='N'?true:false,
      children: [
        {
          key: "master:projects",
          icon: <DockerOutlined />,
          label: "Projects",
          disabled:data?.client_orders=='Y'?false:true,

          children: [
            {
              // key: "client-order",
              // icon: <UserOutlined />,
              // label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
              key: "master:client-orders",
              icon: <UserSwitchOutlined />,
              label: <Link disabled={data?.client_orders=='Y'?false:true} to={routePaths.PROJECTS}>Client Orders</Link>,
              disabled:data?.client_orders=='Y'?false:true

            },
          ],
        },
        {
          // key: "client-order",
          // icon: <UserOutlined />,
          // label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
          key: "master:purchase",
          icon: <AccountBookOutlined />,
          label: "Purchase",
          disabled: data?.purchase=='Y'?false:true,

          children: [
            {
              label: (
                <Link disabled={data?.vendor_orders=='Y'?false:true} to={routePaths.PURCHASEORDER + "/P"}>Vendor Orders</Link>
              ),
              key: "purchase-order",
              icon: <SolutionOutlined />,
              disabled:data?.vendor_orders=='Y'?false:true

            },

            {
              label: (
                <Link disabled={data?.existing_po=='Y'?false:true} to={routePaths.EXISTINGORDER}>
                  Existing Purchase Orders
                </Link>
              ),
              key: "existing-order",
              icon: <CheckCircleOutlined />,
          disabled:data?.existing_po=='Y'?false:true

            },
            {
              label: (
                <Link disabled={data?.amend_po=='Y'?false:true} to={routePaths.AMENDORDER}>Amend Purchase Orders</Link>
              ),
              key: "amend-order",
              icon: <SignatureOutlined />,
          disabled:data?.amend_po=='Y'?false:true

            },
            {
              label: (
                <Link disabled={data?.approve_po=='Y'?false:true} to={routePaths.APPROVEORDER}>Approve Vendor Orders</Link>
              ),
              key: "approve-purchase-order",
              icon: <CheckOutlined />,
          disabled:data?.approve_po=='Y'?false:true

            },
            {
              label: (
                <Link disabled={data?.certificate=='Y'?false:true} to={routePaths.TESTCERTHOME}>
                  Upload Test Certificate
                </Link>
              ),
              key: "uploadtc-purchase-order",
              icon: <UploadFileOutlined />,
          disabled:data?.certificate=='Y'?false:true

            },

            // {
            //   label: <Link to={routePaths.CANCELHOME}>Cancel Purchase Orders</Link>,
            //   key: "cancel-purchase-order",
            //   icon: <CloseCircleOutlined />,
          ],
        },
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
      label: <Link disabled={data?.mrn=='Y'?false:true} to={routePaths.DELIVERYCUSTOMERVIEW}> MRN </Link>,
      key: "material-delivery",
      icon: <FileProtectOutlined />,
      disabled:data?.mrn=='Y'?false:true

    },
    {
      label: <Link disabled={data?.requisition=='Y'?false:true} to={routePaths.REQVIEW}> Requisition </Link>,
      key: "material-requisition",
      icon: <InteractionOutlined />,
      disabled:data?.requisition=='Y'?false:true

    },
    {
      label: <Link disabled={data?.min=='Y'?false:true} to={routePaths.MINVIEW}> Material Issue Note </Link>,
      key: "material-issue",
      icon: <FileSyncOutlined />,
      disabled:data?.min=='Y'?false:true

    },
    // {
    //   label: "Stock",
    //   key: "sub5",
    //   icon: <DropboxOutlined />,
    //   children: [
    //     {
    //       label: <Link to={routePaths.STOCKUPDATE}>Open/Update Stock</Link>,
    //       key: "stock-update",
    //       icon: <DropboxOutlined />,
    //     },

    //     {
    //       label: <Link to={routePaths.STOCKASSIGNVIEW}>Assign</Link>,
    //       key: "stock-assign",
    //       icon: <ReconciliationOutlined />,
    //     },
    //     {
    //       label: <Link to={routePaths.STOCKINVIEW}>Stock In</Link>,
    //       key: "stock-in",
    //       icon: <ArrowRightOutlined />,
    //     },
    //     {
    //       label: <Link to={routePaths.STOCKOUTVIEW}>Stock Out</Link>,
    //       key: "stock-out",
    //       icon: <ArrowLeftOutlined />,
    //     },
    //     {
    //       label: "Transfer",
    //       key: "stock-trans",
    //       icon: <SwapOutlined />,
    //       children: [
    //         {
    //           label: (
    //             <Link to={routePaths.REQUISITIONSENTVIEW}>
    //               Requisitions sent
    //             </Link>
    //           ),
    //           key: "req-mk",
    //           icon: <NodeExpandOutlined />,
    //         },
    //         {
    //           label: (
    //             <Link to={routePaths.REQUISITIONRCVDVIEW}>
    //               Requisitions received
    //             </Link>
    //           ),
    //           key: "req-rec",
    //           icon: <NodeCollapseOutlined />,
    //         },
    //       ],
    //     },
    //   ],
    // },

    {
      label: "Reports",
      key: "sub6",
      icon: <BarsOutlined />,
      disabled:data?.reports=='Y'?false:true

    },
  ];

  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} items={items} />
    </div>
  );
}

export default Menus;
