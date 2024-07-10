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
  BankOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { routePaths } from "../Assets/Data/Routes";

function Menus({theme,mode}) {
  const [current, setCurrent] = React.useState();

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
              key: "masters:1",
              icon: <UserAddOutlined />,
              label: <Link to={routePaths.USERS}>Company User </Link>,
            },
            {
              key: "masters:2",
              icon: <UserSwitchOutlined />,
              label: <Link to={routePaths.CLIENTS}>Client </Link>,
            },
            {
              key: "masters:5",
              icon: <ShopOutlined />,
              label: <Link to={routePaths.VENDORS}>Vendor</Link>,
            },
            // {
            //   key: "masters:3",
            //   icon: <ProjectOutlined />,
            //   label: <Link to={routePaths.PROJECTS}>Projects</Link>,
            // },

            {
              key: "masters:cat",
              icon: <BlockOutlined />,
              label: <Link to={routePaths.CATEGORIES}>Category</Link>,
            },
            {
              key: "masters:unit",
              icon: <PayCircleOutlined />,
              label: <Link to={routePaths.UNITS}>Unit</Link>,
            },
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
              key: "masters:4",
              icon: <ToolOutlined />,
              label: <Link to={routePaths.PRODUCTS}>Product</Link>,
            },
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
              key: "client-order",
              icon: <UserOutlined />,
              label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
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
      children: [
        {
          type: "group",
          children: [
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
              label:  <Link to={routePaths.STOCKOUTVIEW}>Stock Out</Link>,
              key: "stock-out",
              icon: <ArrowLeftOutlined />,
            },
            {
              label: "Transfer",
              key: "stock-trans",
              icon: <SwapOutlined />,
              children: [
                {
                  type: "group",
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
                },
              ],
            },
          ],
        },
      ],
    },
    ,
    {
      label: "Reports",
      key: "sub6",
      icon: <BarsOutlined />,
    },
  ];

  return (
    <div>
      <Menu
        theme={theme}
        onClick={onClick}
        selectedKeys={[current]}
        mode={mode}
        items={items}
      />
    </div>
  );
}

export default Menus;
