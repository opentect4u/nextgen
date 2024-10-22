import { Checkbox, Col, Row, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../../Address/BaseUrl";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import { Message } from "../../../Components/Message";
import { Divider } from "@mui/material";

function PermissionsForm() {
  const params = useParams();
  const [user_type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [masters, setMasters] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [departments, setDepartments] = useState(false);
  const [categories, setCategories] = useState(false);
  const [vendors, setVendors] = useState(false);
  const [clients, setClients] = useState(false);
  const [products, setProducts] = useState(false);
  const [units, setUnits] = useState(false);
  const [gst, setGst] = useState(false);
  const [users, setUsers] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [client_orders, setOrders] = useState(false);
  const [vendor_orders, setVOrders] = useState(false);
  const [existing, setExisting] = useState(false);
  const [amend, setAmend] = useState(false);
  const [approve, setApprove] = useState(false);
  const [tc, setTc] = useState(false);
  const [mrn, setMrn] = useState(false);
  const [req, setReq] = useState(false);
  const [min, setMin] = useState(false);
  const [reports, setReports] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios.post(url + "/api/user_type", { id: +params.id }).then((res) => {
      console.log(res);
      setLoading(false);
      setType(res?.data?.msg[0].user_type);
      axios
        .post(url + "/api/fetch_permission", { id: +params.id })
        .then((res) => {
          console.log(res);
          setMasters(res?.data?.msg[0]?.masters == "Y" ? true : false);
          setPurchase(res?.data?.msg[0]?.purchase == "Y" ? true : false);
          setDepartments(res?.data?.msg[0]?.department == "Y" ? true : false);
          setCategories(res?.data?.msg[0]?.prod_catg == "Y" ? true : false);
          setProducts(res?.data?.msg[0]?.product == "Y" ? true : false);
          setGst(res?.data?.msg[0]?.gst == "Y" ? true : false);
          setClients(res?.data?.msg[0]?.client == "Y" ? true : false);
          setUnits(res?.data?.msg[0]?.unit == "Y" ? true : false);
          setVendors(res?.data?.msg[0]?.vendor == "Y" ? true : false);
          setPermissions(res?.data?.msg[0]?.permission == "Y" ? true : false);
          setUsers(res?.data?.msg[0]?.comp_user == "Y" ? true : false);
          setOrders(res?.data?.msg[0]?.client_orders == "Y" ? true : false);
          setVOrders(res?.data?.msg[0]?.vendor_orders == "Y" ? true : false);
          setExisting(res?.data?.msg[0]?.existing_po == "Y" ? true : false);
          setAmend(res?.data?.msg[0]?.amend_po == "Y" ? true : false);
          setApprove(res?.data?.msg[0]?.approve_po == "Y" ? true : false);
          setTc(res?.data?.msg[0]?.certificate == "Y" ? true : false);
          setMrn(res?.data?.msg[0]?.mrn == "Y" ? true : false);
          setMin(res?.data?.msg[0]?.min == "Y" ? true : false);
          setReq(res?.data?.msg[0]?.requisition == "Y" ? true : false);
          setReports(res?.data?.msg[0]?.reports == "Y" ? true : false);
        });
    });
  }, []);

  const onUpdate = () => {
    setLoading(true);
    axios
      .post(url + "/api/add_edit_permissions", {
        user_type_id: +params.id,
        masters: masters ? "Y" : "N",
        purchase: purchase ? "Y" : "N",
        department: departments ? "Y" : "N",
        prod_catg: categories ? "Y" : "N",
        unit: units ? "Y" : "N",
        product: products ? "Y" : "N",
        vendor: vendors ? "Y" : "N",
        client: clients ? "Y" : "N",
        gst: gst ? "Y" : "N",
        comp_user: users ? "Y" : "N",
        client_orders: client_orders ? "Y" : "N",
        vendor_orders: vendor_orders ? "Y" : "N",
        existing_po: existing ? "Y" : "N",
        amend_po: amend ? "Y" : "N",
        approve_po: approve ? "Y" : "N",
        certificate: tc ? "Y" : "N",
        mrn: mrn ? "Y" : "N",
        requisition: req ? "Y" : "N",
        min: min ? "Y" : "N",
        reports: reports ? "Y" : "N",
        prm: permissions ? "Y" : "N",
        user: localStorage.getItem("email"),
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res?.data?.suc > 0) {
          Message("success", res?.data?.msg);
        } else {
          Message("error", res?.data?.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  };
  const onChangeMenu = (e) => {
    if (e.target.name == "masters") {
      setMasters(e.target.checked);
      setDepartments(e.target.checked);
      setCategories(e.target.checked);
      setProducts(e.target.checked);
      setUnits(e.target.checked);
      setUsers(e.target.checked);
      setVendors(e.target.checked);
      setClients(e.target.checked);
      setGst(e.target.checked);
      setPermissions(e.target.checked);
    }
    if (e.target.name == "purchase") {
      setPurchase(e.target.checked);
      setVOrders(e.target.checked);
      setExisting(e.target.checked);
      setApprove(e.target.checked);
      setAmend(e.target.checked);
      setTc(e.target.checked);
    }
    console.log(departments,categories,products,units,permissions,gst,vendors,clients,users)
    if(!departments && !categories && !products && !units && !permissions && !gst && !vendors && !clients && !users && e.target.name!='masters'  && e.target.name!='purchase'){
     
      setMasters(true)
    }
    // if(departments && categories && products && units && permissions && gst && vendors && clients && users && e.target.name!='masters' && e.target.name!='purchase'){
    //   setMasters(false)
    // }
    // if(!vendor_orders && !existing && !amend && !approve && e.target.name!='purchase'&& e.target.name!='masters'){
    //   setPurchase(true)
    // }
    // if(vendor_orders && existing && amend && approve && e.target.name!='purchase'&& e.target.name!='masters'){
    //   setPurchase(false)
    // }
  };
  const onChangeIc = (e) => {
    console.log("checked = ", e.target);
    if (e.target.name == "departments") setDepartments(e.target.checked);
    if (e.target.name == "categories") setCategories(e.target.checked);
    if (e.target.name == "products") setProducts(e.target.checked);
    if (e.target.name == "units") setUnits(e.target.checked);
    if (e.target.name == "users") setUsers(e.target.checked);
    if (e.target.name == "vendors") setVendors(e.target.checked);
    if (e.target.name == "clients") setClients(e.target.checked);
    if (e.target.name == "gst") setGst(e.target.checked);
    if (e.target.name == "permissions") setPermissions(e.target.checked);
    if (e.target.name == "client_orders") setOrders(e.target.checked);
    if (e.target.name == "vendor_orders") setVOrders(e.target.checked);
    if (e.target.name == "existing") setExisting(e.target.checked);
    if (e.target.name == "amend") setAmend(e.target.checked);
    if (e.target.name == "approve") setApprove(e.target.checked);
    if (e.target.name == "tc") setTc(e.target.checked);
    if (e.target.name == "mrn") setMrn(e.target.checked);
    if (e.target.name == "req") setReq(e.target.checked);
    if (e.target.name == "min") setMin(e.target.checked);
    if (e.target.name == "reports") setReports(e.target.checked);
    if (e.target.name == "masters") {
      setMasters(e.target.checked);
      setDepartments(e.target.checked);
      setCategories(e.target.checked);
      setProducts(e.target.checked);
      setUnits(e.target.checked);
      setUsers(e.target.checked);
      setVendors(e.target.checked);
      setClients(e.target.checked);
      setGst(e.target.checked);
      setPermissions(e.target.checked);
      setAmend(e.target.checked);
    }
    if (e.target.name == "purchase") {
      setPurchase(e.target.checked);
      setVOrders(e.target.checked);
      setExisting(e.target.checked);
      setApprove(e.target.checked);
      setAmend(e.target.checked);
      setTc(e.target.checked);
    }

    if (
      !departments &&
      !categories &&
      !products &&
      !units &&
      !permissions &&
      !gst &&
      !vendors &&
      !clients &&
      !users
    ) {
      setMasters(false);
    }
    if (
      departments ||
      categories ||
      products ||
      units ||
      permissions ||
      gst ||
      vendors ||
      clients ||
      users
    ) {
      setMasters(true);
    }
    if (!vendor_orders && !existing && !amend && !approve && !tc) {
      setPurchase(false);
    }
    if (vendor_orders || existing|| amend|| approve|| tc) {
      setPurchase(true);
    }
  };
  return (
    <section className="bg-transparent dark:bg-[#001529]">
      {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
      <HeadingTemplate
        text={"Update permissions"}
        mode={1}
        title={"Permissions"}
        //   data={params.id && data?data:''}
      />
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
        <div className="w-full bg-white p-6 rounded-2xl">
          <Tag color="#014737" className="my-2 text-base">
            {user_type}
          </Tag>
          
          <div
            style={{ width: "100%" }}
            className="border-2 bg-[#DDEAE0] rounded-lg p-3  shadow-lg sm:col-span-12 border-gray-300"
          >
            <Row>
              <Col span={24} className="my-2 font-bold">
                <Checkbox
                  checked={masters}
                  name="masters"
                  onChange={onChangeMenu}
                >
                  Masters
                </Checkbox>
              </Col>
            </Row>
            <Divider className="my-1" />
            <Row className="my-1">
              <Col span={8}>
                <Checkbox
                  checked={departments}
                  name="departments"
                  onChange={onChangeIc}
                >
                  Departments
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={categories}
                  name="categories"
                  onChange={onChangeIc}
                >
                  Categories
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox checked={units} name="units" onChange={onChangeIc}>
                  Units
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={products}
                  name="products"
                  onChange={onChangeIc}
                >
                  Products
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={vendors}
                  name="vendors"
                  onChange={onChangeIc}
                >
                  Vendors
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={clients}
                  name="clients"
                  onChange={onChangeIc}
                >
                  Clients
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox checked={gst} name="gst" onChange={onChangeIc}>
                  GST
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox checked={users} name="users" onChange={onChangeIc}>
                  Company Users
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={permissions}
                  name="permissions"
                  onChange={onChangeIc}
                >
                  Permissions
                </Checkbox>
              </Col>
            </Row>
            <Divider className="my-1" />
            <Row className="my-1">
              <Col span={8}>
                <Checkbox
                  checked={client_orders}
                  name="client_orders"
                  onChange={onChangeIc}
                >
                  Client Orders
                </Checkbox>
              </Col>
            </Row>

            <Divider className="my-1" />
            <Row>
              <Col span={24} className="my-2 font-bold">
                <Checkbox
                  checked={purchase}
                  name="purchase"
                  onChange={onChangeMenu}
                >
                  Purchase
                </Checkbox>
              </Col>
            </Row>
            <Divider className="my-1" />
            <Row className="my-1">
              <Col span={8}>
                <Checkbox
                  checked={vendor_orders}
                  name="vendor_orders"
                  onChange={onChangeIc}
                >
                  Vendor Orders
                </Checkbox>
              </Col>

              <Col span={8}>
                <Checkbox
                  checked={existing}
                  name="existing"
                  onChange={onChangeIc}
                >
                  Existing PO
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox checked={amend} name="amend" onChange={onChangeIc}>
                  Amend PO
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={approve}
                  name="approve"
                  onChange={onChangeIc}
                >
                  Approve PO
                </Checkbox>
              </Col>
           
              <Col span={8}>
                <Checkbox checked={tc} name="tc" onChange={onChangeIc}>
                  Test Certificate
                </Checkbox>
              </Col>
              </Row>
            <Divider className="my-1" />
            <Row className="my-1">
              <Col span={8}>
                <Checkbox checked={mrn} name="mrn" onChange={onChangeIc}>
                  MRN
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox checked={req} name="req" onChange={onChangeIc}>
                  Requisition
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox checked={min} name="min" onChange={onChangeIc}>
                  Material Issue Note
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  checked={reports}
                  name="reports"
                  onChange={onChangeIc}
                >
                  Reports
                </Checkbox>
              </Col>
            </Row>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
              onClick={() => onUpdate()}
            >
              <SaveOutlined className="mr-2" />
              Submit
            </button>
          </div>
        </div>
      </Spin>
    </section>
  );
}

export default PermissionsForm;
