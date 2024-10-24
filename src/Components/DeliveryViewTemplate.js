import React, { useEffect, useState } from "react";
import { routePaths } from "../Assets/Data/Routes";
import { Link, useNavigate, useParams } from "react-router-dom";
import { url } from "../Address/BaseUrl";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import { motion } from "framer-motion";
import nodata from "../../src/Assets/Images/nodata.png";
import { EditOutlined } from "@ant-design/icons";
import SkeletonLoading from "../Components/SkeletonLoading";

function DeliveryViewTemplate({ flag }) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [delFlag, setDelFlag] = useState();

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const rdBtn = [
    { label: "Uploaded", value: 1 },
    { label: "Yet to upload", value: 2 },
  ];
  const [value, setValue] = useState(0);
  const [po_data, setPoData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [copy, setCopy] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("id");
    localStorage.removeItem("po_issue_date");
    localStorage.removeItem("po_status");
    localStorage.removeItem("po_no");
    localStorage.removeItem("po_comments");
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
    setLoading(true);
    // axios.post(url + "/api/getpo", { id:0 }).then((res) => {
    //   console.log(res);
    //   setLoading(false);
    //   setCopy(res?.data?.msg.filter(e=>e.po_status=='A'));
    //   setPoData(res?.data?.msg.filter(e=>e.po_status=='A'));
    // });
    axios.post(url + "/api/getpo", { id: 0 }).then((res) => {
      console.log(res);
      setLoading(false);
      if(localStorage.getItem('user_type')=='2'){
        setCopy(res?.data?.msg.filter(e=>e.po_status=='A' && e.created_by==localStorage.getItem('email')));
        setPoData(res?.data?.msg.filter(e=>e.po_status=='A' &&  e.created_by==localStorage.getItem('email')));
        }
        if(localStorage.getItem('user_type')=='5'){
          setCopy(res?.data?.msg.filter(e=>e.po_status=='A'));
          setPoData(res?.data?.msg.filter(e=>e.po_status=='A'));
          }
    });
  }, []);

  const search = (value) => {
    setLoading(true);
    if (flag == "C") {
      axios.post(url + "/api/getdelbypo", { po: value }).then((res) => {
        console.log(res);
        setLoading(false);
        setCopy(res?.data?.msg);
        setPoData(res?.data?.msg);
      });
    } else {
      axios.post(url + "/api/getmdccbypo", { po: value }).then((res) => {
        console.log(res);
        setLoading(false);
        setCopy(res?.data?.msg);
        setPoData(res?.data?.msg);
      });
    }
  };
  const setSearch = (word) => {
    setPoData(
      copy?.filter(
        (e) =>
          e?.po_no?.toLowerCase().includes(word?.toLowerCase()) ||
          e?.created_by?.toLowerCase().includes(word?.toLowerCase())
      )
    );
  };
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 30 }}
      >
        <div class="flex flex-col p-1 bg-green-900 rounded-full my-3 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 ">
          <div class="w-full relative flex justify-normal">
            <div class="flex items-center justify-between w-11/12">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, type: "just" }}
                class="text-xl w-48 capitalize text-nowrap font-bold text-white dark:text-white sm:block hidden mx-5"
              >
                {flag == "C" ? "MRN Details" : "DeliveryDetails"}
              </motion.h2>

              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full -right-6 2xl:-right-12">
                <div class="absolute inset-y-0 left-0 flex items-center md:ml-4 pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <motion.input
                  type="text"
                  id="simple-search"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ delay: 1.1, type: "just" }}
                  class="bg-white border rounded-full border-emerald-500 text-gray-800 text-sm  block w-full  pl-10 dark:bg-gray-800 md:ml-4  duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  required=""
                  onChange={(text) => setSearch(text.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {loading && <SkeletonLoading />}

      {copy.length == 0 && loading == false && (
        <div class="flex-col ml-72 mx-auto justify-center items-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            src={nodata}
            class="h-96 w-96 2xl:ml-48 2xl:h-full"
            alt="Flowbite Logo"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            class="h-12 text-green-900 -mt-16  2xl:ml-48 2xl:h-24 font-bold"
          >
            You can either create or search to view any record here!
          </motion.h2>
        </div>
      )}
      <div class="relative overflow-x-auto">
        {!loading && copy.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 30 }}
          >
            <table class="w-full text-sm text-left rtl:text-right shadow-lg text-green-900dark:text-gray-400">
              <thead class=" text-md  text-gray-700 capitalize   bg-[#C4F1BE] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    #
                  </th>
                  <th scope="col" class="p-4">
                    PO No.
                  </th>
                  <th scope="col" class="p-4">
                    Created By
                  </th>
                  <th scope="col" class="p-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {po_data &&
                  po_data?.slice(first, rows + first).map((item) => (
                    <tr class="bg-white text-nowrap border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.sl_no}
                      </th>
                      <td class="px-6 py-4">{item.po_no}</td>
                      <td class="px-6 py-4">{item.created_by}</td>
                      <td class="px-3 py-4 flex gap-3">
                        <Link
                          to={
                            flag == "C"
                              ? routePaths.DELIVERYCUSTOMERFORM +
                                item.sl_no +
                                "/" +
                                item.po_no
                              : routePaths.TESTCERTFORM + item.sl_no
                          }
                        >
                          <EditOutlined class="text-md text-green-900" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={po_data?.length}
              rowsPerPageOptions={[3, 5, 10, 15, 20, 30, po_data?.length]}
              onPageChange={onPageChange}
            />
          </motion.section>
        )}
      </div>
    </>
  );
}

export default DeliveryViewTemplate;
