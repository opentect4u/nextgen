import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Skeleton } from "primereact/skeleton";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./Screens/Auth/Auth";
import Notfound from "./Screens/Notfound/Notfound";
import Details from "./Screens/Homescreen/Details";
import { Democontext } from "./Context/Democontext";
import Loader from "./Components/Loader";
import LinearProgress from "@mui/material/LinearProgress";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const root = ReactDOM.createRoot(document.getElementById("root"));
const Home = lazy(() => import("./Screens/Homescreen/Home"));
const HomeScreen = lazy(() => import("./Screens/Homescreen/HomeScreen"));
const ForgotPass = lazy(() => import("./Screens/Auth/ForgotPass"));
const Signup = lazy(() => import("./Screens/Auth/Signup"));
const Signin = lazy(() => import("./Screens/Auth/Signin"));

const MastersComp = lazy(() => import("./Screens/Masters/MastersComp"));
const UserComp = lazy(() => import("./Screens/Masters/Users/UserComp"));
const UserView = lazy(() => import("./Screens/Masters/Users/UserView"));
const UserAddForm = lazy(() => import("./Screens/Masters/Users/UserAddForm"));

const ClientComp = lazy(() => import("./Screens/Masters/Clients/ClientComp"));
const ClientView = lazy(() => import("./Screens/Masters/Clients/ClientView"));
const ClientForm = lazy(() => import("./Screens/Masters/Clients/ClientForm"));

const ProjectComp = lazy(() =>
  import("./Screens/Masters/Projects/ProjectComp")
);
const ProjectView = lazy(() =>
  import("./Screens/Masters/Projects/ProjectView")
);
const ProjectForm = lazy(() =>
  import("./Screens/Masters/Projects/ProjectForm")
);

const ProductComp = lazy(() =>
  import("./Screens/Masters/Products/ProductComp")
);
const ProductView = lazy(() =>
  import("./Screens/Masters/Products/ProductView")
);
const ProductForm = lazy(() =>
  import("./Screens/Masters/Products/ProductForm")
);

const VendorComp = lazy(() => import("./Screens/Masters/Vendors/VendorComp"));
const VendorView = lazy(() => import("./Screens/Masters/Vendors/VendorView"));
const VendorForm = lazy(() => import("./Screens/Masters/Vendors/VendorForm"));

const CategoryComp = lazy(() =>
  import("./Screens/Masters/Categories/CategoryComp")
);
const CategoryView = lazy(() =>
  import("./Screens/Masters/Categories/CategoryView")
);
const CategoryForm = lazy(() =>
  import("./Screens/Masters/Categories/CategoryForm")
);

const UnitComp = lazy(() => import("./Screens/Masters/Units/UnitComp"));
const UnitView = lazy(() => import("./Screens/Masters/Units/UnitView"));
const UnitForm = lazy(() => import("./Screens/Masters/Units/UnitForm"));

const DeptComp = lazy(() => import("./Screens/Masters/Department/DeptComp"));
const DeptView = lazy(() => import("./Screens/Masters/Department/DeptView"));
const DeptForm = lazy(() => import("./Screens/Masters/Department/DeptForm"));

const DesignationComp = lazy(() =>
  import("./Screens/Masters/Designation/DesignationComp")
);
const DesignationView = lazy(() =>
  import("./Screens/Masters/Designation/DesignationView")
);
const DesignationForm = lazy(() =>
  import("./Screens/Masters/Designation/DesignationForm")
);

const PurchaseOrderComp = lazy(() =>
  import("./Screens/Purchase Order/PurchaseOrderComp")
);
const PurchaseOrderView = lazy(() =>
  import("./Screens/Purchase Order/PurchaseOrderView")
);
const PurchaseOrderForm = lazy(() =>
  import("./Screens/Purchase Order/PurchaseOrderForm")
);
const OrderView = lazy(() => import("./Screens/Purchase Order/OrderView"));
const OrderForm = lazy(() => import("./Screens/Purchase Order/OrderForm"));

const StockComp = lazy(() => import("./Screens/Stock/StockComp"));
const StockInView = lazy(() => import("./Screens/Stock/StockInView"));
const StockInForm = lazy(() => import("./Screens/Stock/StockInForm"));
const StockOutView = lazy(() => import("./Screens/Stock/StockOutView"));
const StockOutForm = lazy(() => import("./Screens/Stock/StockOutForm"));
const StockAssignView = lazy(() => import("./Screens/Stock/StockAssignView"));
const StockAssignForm = lazy(() => import("./Screens/Stock/StockAssignForm"));
const RequisitionSentView = lazy(() =>
  import("./Screens/Stock/RequisitionSentView")
);
const RequisitionRcvdView = lazy(() =>
  import("./Screens/Stock/RequisitionRcvdView")
);
const ReqSendForm = lazy(() => import("./Screens/Stock/ReqSendForm"));
const ReqRcvdForm = lazy(() => import("./Screens/Stock/ReqRcvdForm"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Auth />,
        children: [
          {
            path: "",
            element: <Signin />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "forgotpassword",
            element: <ForgotPass />,
          },
        ],
      },
      {
        path: "home",
        element: <Home />,
        children: [
          {
            path: "",
            element: <HomeScreen />,
          },
          {
            path: "mastersComp",
            element: <MastersComp />,
            children: [
              {
                path: "users",
                element: <UserComp />,
                children: [
                  {
                    path: "",
                    element: <UserView />,
                  },
                  {
                    path: "useraddform/:id",
                    element: <UserAddForm />,
                  },
                ],
              },
              {
                path: "clients",
                element: <ClientComp />,
                children: [
                  {
                    path: "",
                    element: <ClientView />,
                  },
                  {
                    path: "clientaddform/:id",
                    element: <ClientForm />,
                  },
                ],
              },
              {
                path: "designations",
                element: <DesignationComp />,
                children: [
                  {
                    path: "",
                    element: <DesignationView />,
                  },
                  {
                    path: "designationaddform/:id",
                    element: <DesignationForm />,
                  },
                ],
              },
              {
                path: "projects",
                element: <ProjectComp />,
                children: [
                  {
                    path: "",
                    element: <ProjectView />,
                  },
                  {
                    path: "projectaddform/:id",
                    element: <ProjectForm />,
                  },
                ],
              },
              {
                path: "products",
                element: <ProductComp />,
                children: [
                  {
                    path: "",
                    element: <ProductView />,
                  },
                  {
                    path: "productaddform/:id",
                    element: <ProductForm />,
                  },
                ],
              },
              ,
              {
                path: "units",
                element: <UnitComp />,
                children: [
                  {
                    path: "",
                    element: <UnitView />,
                  },
                  {
                    path: "unitaddform/:id",
                    element: <UnitForm />,
                  },
                ],
              },
              {
                path: "vendors",
                element: <VendorComp />,
                children: [
                  {
                    path: "",
                    element: <VendorView />,
                  },
                  {
                    path: "vendoraddform/:id",
                    element: <VendorForm />,
                  },
                ],
              },
              {
                path: "departments",
                element: <DeptComp />,
                children: [
                  {
                    path: "",
                    element: <DeptView />,
                  },
                  {
                    path: "departmentaddform/:id",
                    element: <DeptForm />,
                  },
                ],
              },
              {
                path: "categories",
                element: <CategoryComp />,
                children: [
                  {
                    path: "",
                    element: <CategoryView />,
                  },
                  {
                    path: "categoryform/:id",
                    element: <CategoryForm />,
                  },
                ],
              },
            ],
          },
          {
            path: "poComp",
            element: <PurchaseOrderComp />,
            children: [
              {
                path: "clientorder",
                element: <OrderView />,
              },
              {
                path: "orderform/:id",
                element: <OrderForm />,
              },
              {
                path: "purchaseorder",
                element: <PurchaseOrderView />,
              },
              {
                path: "purchaseorderform/:id",
                element: <PurchaseOrderForm />,
              },
            ],
          },
          {
            path: "stockComp",
            element: <StockComp />,
            children: [
              {
                path: "stockinview",
                element: <StockInView />,
              },
              {
                path: "stockinform/:id",
                element: <StockInForm />,
              },
              {
                path: "stockoutview",
                element: <StockOutView />,
              },
              {
                path: "stockoutform/:id",
                element: <StockOutForm />,
              },
              ,
              {
                path: "stockassignview",
                element: <StockAssignView />,
              },
              {
                path: "stockassignform/:id",
                element: <StockAssignForm />,
              },
              {
                path: "requisitionssentview",
                element: <RequisitionSentView />,
              },
              {
                path: "requisitionsrcvdview",
                element: <RequisitionRcvdView />,
              },
              {
                path: "requisitionssendform/:id",
                element: <ReqSendForm />,
              },
              {
                path: "requisitionsrcvdform/:id",
                element: <ReqRcvdForm />,
              },
            ],
          },
          {
            path: "details",
            element: <Details />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
root.render(
  <Democontext>
    <Suspense
      fallback={
        <div className="bg-gray-700 h-screen flex justify-center items-center">
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            style={{ color: "#01AB01" }}
          />
        </div>
      }
    >
      <Loader />
      <RouterProvider router={router} />
    </Suspense>
  </Democontext>
);

{
  /* <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode> */
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
