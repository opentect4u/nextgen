import React, { useEffect, useState } from "react";
import { routePaths } from "../../Assets/Data/Routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { url } from "../../Address/BaseUrl";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import nodata from "../../../src/Assets/Images/nodata.png";

import { PrinterOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import SkeletonLoading from "../../Components/SkeletonLoading";
import Radiobtn from "../../Components/Radiobtn";
import CompositeSearch from "../../Components/CompositeSearch";
import POTableView from "../../Components/POTableView";

function ExistingPoView() {
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const rdBtn = [
    { label: "Approved", value: 1 },
    { label: "In Progress", value: 2 },
    // { label: "Others", value: 3 },
  ];
  const locationpath = useLocation();
  const [value, setValue] = useState(2);
  const [po_data, setPoData] = useState([]);
  const [copy, setCopy] = useState([]);
  const navigate = useNavigate();
 
  const onChange = (e) => {
    console.log("radio checked", e);
    setValue(e);
    if (e == 1)
      setPoData(
        copy.filter(
          (e) =>
            (e.po_status == "A" || e.po_status == "U") && e.fresh_flag == "N"
        )
      );
    else if(e==2)
      setPoData(
        copy.filter(
          (e) => e.po_status =='P' && e.fresh_flag == "N"
        )
      );
    else{
      setPoData(
        copy.filter(
          (e) => (e.po_status =='D' || e.po_status=='L') && e.fresh_flag == "N"
        )
      );
    }
  };
  useState(() => {
    axios
      .post(url + "/api/getvendor", { id: 0 })
      .then((res) => {
        console.log(res);
        setVendors(res?.data.msg);
        vendorList.length = 0;
        setVendorList([]);
        for (let i of res?.data?.msg) {
          vendorList.push({
            name: i.vendor_name,
            code: i.sl_no,
          });
        }
        setVendorList(vendorList);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
    axios.post(url + "/api/getproject", { id: 0 }).then((res) => {
      console.log(res);
      setProjects(res?.data.msg);
      setProjectList([]);
      projectList.length = 0;
      for (let i of res?.data?.msg) {
        projectList.push({
          name: i.proj_name,
          code: i.sl_no,
        });
      }
      setProjectList(projectList);
    });
  }, []);
  useEffect(() => {
    setLoading(true);

    axios
      .post(url + "/api/getpo", { id: 0 })
      .then((res) => {
        console.log(res);
        setPoData(res?.data?.msg);
        setCopy(res?.data?.msg.filter((e) => e.fresh_flag == "N"));
        setPoData(
          res?.data?.msg.filter(
            (e) => e.fresh_flag == "N" && e.po_status == "P"
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  }, [
    locationpath.pathname.split("/")[
      locationpath.pathname.split("/").length - 1
    ],
  ]);
  useEffect(
    () => {
      localStorage.removeItem("id");
      localStorage.removeItem("po_issue_date");
      localStorage.removeItem("po_status");
      localStorage.removeItem("po_comments");
      localStorage.removeItem("po_no");
      localStorage.removeItem("order_id");
      localStorage.removeItem("order_date");
      localStorage.removeItem("order_type");
      localStorage.removeItem("proj_name");
      localStorage.removeItem("vendor_name");
      localStorage.removeItem("itemList");
      localStorage.removeItem("terms");
      localStorage.removeItem("termList");
      localStorage.removeItem("ship_to");
      localStorage.removeItem("bill_to");
      localStorage.removeItem("ware_house_flag");
      localStorage.removeItem("notes");
      localStorage.removeItem("mdcc_flag");
      localStorage.removeItem("mdcc");
      localStorage.removeItem("insp_flag");
      localStorage.removeItem("insp");
      localStorage.removeItem("drawing_flag");
      localStorage.removeItem("drawing");
      localStorage.removeItem("dt");
    },
    [
     
    ]
  );

  const setSearch = (word) => {
    setPoData(
      copy?.filter(
        (e) =>
          e?.po_no?.toLowerCase().includes(word?.toLowerCase()) ||
          e?.vendor_name?.toLowerCase().includes(word?.toLowerCase()) ||
          e?.proj_name?.toLowerCase().includes(word?.toLowerCase()) ||
          e?.po_issue_date?.toLowerCase().includes(word?.toLowerCase()) ||
          e?.created_by?.toLowerCase().includes(word?.toLowerCase())
      )
    );
  };
  const onAdvSearch = (val1, val2) => {
    console.log(val1, val2);
    setValue(0);
    setPoData(
      copy?.filter(
        (e) =>
          e?.vendor_name?.toLowerCase().includes(val1?.toLowerCase()) &&
          e?.proj_name?.toLowerCase().includes(val2?.toLowerCase())
      )
    );
  };
  return (
   
    <>
      <div className="flex items-center  justify-end h-14 -mt-[72px] w-auto dark:bg-[#22543d] md:flex-row space-y-3 md:space-y-0 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: "just" }}
          className="w-full hidden md:block  md:w-auto sm:flex sm:flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
        >
          <Tooltip title={"Add Existing Order"}>
           
            <Link
              to={routePaths.PURCHASEORDERFORM + "E/" + 0}
              type="submit"
              className="flex items-center justify-center border-2 border-white border-r-0 text-white bg-green-900 hover:bg-primary-800 text-nowrap rounded-l-md transition ease-in-out  active:scale-90 text-sm p-1 px-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-700 focus:outline-none shadow-lg  hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800 ml-2 capitalize"
            >
              <AddIcon className="text-sm" /> {"Add Existing Orders"}
            </Link>
          </Tooltip>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, type: "just" }}
          className={
            "bg-white border-2 border-l-0 text-green-900 font-semibold text-lg rounded-r-full p-0.5 shadow-lg"
          }
        >
          <Tooltip title="Print this table" arrow>
            <PrinterOutlined />
          </Tooltip>
        </motion.button>
      </div>
     
      <div className="flex justify-between items-center">
        <Radiobtn
          data={rdBtn}
          val={value}
          onChangeVal={(value) => {
            console.log(value);
            onChange(value);
          }}
        />
        <CompositeSearch
          data={{
            set_one: vendorList,
            set_two: projectList,
            set_one_lbl: "Vendors",
            set_two_lbl: "Projects",
          }}
          onReset={() => {
            setPoData(copy);
            setValue(0);
          }}
          onSubmit={(values) => {
            console.log(values);
            onAdvSearch(values.val_one, values.val_two);
          }}
        />
      </div>
      {loading && <SkeletonLoading />}

      {copy.length > 0 && !loading && (
        <POTableView
          po_data={po_data}
          title={"Existing Orders"}
          setSearch={(values) => setSearch(values)}
        />
      )}
      {copy.length == 0 && (
        <div className="flex-col ml-72 mx-auto justify-center items-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            src={nodata}
            className="h-96 w-96 2xl:ml-48 2xl:h-full"
            alt="Flowbite Logo"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="h-12 text-green-900 -mt-16 ml-9 2xl:ml-48 2xl:h-24 font-bold"
          >
            Please create something to view data here!!
          </motion.h2>
        </div>
      )}
    </>
  );
}

export default ExistingPoView;