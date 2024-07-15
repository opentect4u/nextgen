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
  MailOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { routePaths } from "../Assets/Data/Routes";

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
          type: "group",
          children: [
            {
              key: "masters:dept",
              icon: <BankOutlined />,
              label: <Link to={routePaths.DEPARTMENTS}>Department</Link>,
            },
            {
              key: "masters:desig",
              icon: <IdcardOutlined />,
              label: <Link to={routePaths.DESIGNATIONS}>Designation</Link>,
            },
            {
              key: "masters:cat",
              icon: <BlockOutlined />,
              label: <Link to={routePaths.CATEGORIES}>Category</Link>,
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
            // {
            //   key: "masters:user",
            //   icon: <UserAddOutlined />,
            //   label: <Link to={routePaths.USERS}>Company User </Link>,
            // },
          ],
        },
      ],
    },
    {
      label: "Orders",
      key: "sub4",
      icon: <AuditOutlined />,
      children: [
        {
          type: "group",
          children: [
            {
              // key: "client-order",
              // icon: <UserOutlined />,
              // label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
              key: "master:projects",
              icon: <ProjectOutlined />,
              label: <Link to={routePaths.PROJECTS}>Projects</Link>,
            },
            {
              label: <Link to={routePaths.PURCHASEORDER}>Purchase Orders</Link>,
              key: "purchase-order",
              icon: <SolutionOutlined />,
            }
          ],
        },
      ],
    },
    {
      label: "Stock",
      key: "sub5",
      icon: <HddOutlined />,
      // children: [
      //   {
      //     type: "group",
      //     children: [
      //       {
      //         label: <Link to={routePaths.STOCKASSIGNVIEW}>Assign</Link>,
      //         key: "stock-assign",
      //         icon: <ReconciliationOutlined />,
      //       },
      //       {
      //         label: <Link to={routePaths.STOCKINVIEW}>Stock In</Link>,
      //         key: "stock-in",
      //         icon: <ArrowRightOutlined />,
      //       },
      //       {
      //         label: <Link to={routePaths.STOCKOUTVIEW}>Stock Out</Link>,
      //         key: "stock-out",
      //         icon: <ArrowLeftOutlined />,
      //       },
      //       {
      //         label: "Transfer",
      //         key: "stock-trans",
      //         icon: <SwapOutlined />,
      //         children: [
      //           {
      //             type: "group",
      //             children: [
      //               {
      //                 label: <Link to={routePaths.REQUISITIONSENTVIEW}>Requisitions sent</Link>,
      //                 key: "req-mk",
      //                 icon: <NodeExpandOutlined />,
      //               },
      //               {
      //                 label: <Link to={routePaths.REQUISITIONRCVDVIEW}>Requisitions received</Link>,
      //                 key: "req-rec",
      //                 icon: <NodeCollapseOutlined />,
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    },
    ,
    {
      label: "Reports",
      key: "sub6",
      icon: <BarsOutlined />,
    },
  ];

 

  return (
    <div >
      <Menu
        
        // onClick={onClick}
        // selectedKeys={[current]}
        // items={items}

        onClick={onClick}
        // openKeys={['sub1']}
        selectedKeys={[current]}
        // mode="vertical"
        items={items}
      />
    </div>
  );
}

export default Menus;
