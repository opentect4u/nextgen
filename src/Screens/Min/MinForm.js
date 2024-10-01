import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeadingTemplate from "../../Components/HeadingTemplate";
import VError from "../../Components/VError";
import TDInputTemplate from "../../Components/TDInputTemplate";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
import { Divider, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../Components/DialogBox";
import Viewdetails from "../../Components/Viewdetails";
import { Spin } from "antd";
import { Message } from "../../Components/Message";
import { Checkbox, Col, Row } from "antd";
import moment from "moment/moment";

function MinForm() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemForm, setItemForm] = useState([]);
  const navigate = useNavigate();
  const [flag1, setFlag] = useState(4);
  const [id, setId] = useState();
  const [items, setItems] = useState([]);
  const [po_no, setPoNo] = useState("");
  const params = useParams();
  const [delFlag, setDelFlag] = useState();
  const [index, setIndex] = useState();
  const [item, setItem] = useState("");
  const [opn_qty, setOpnQty] = useState(0);
  const [issue_qty, setIssueQty] = useState(0);
  const [issue_qtyCopy, setIssueQtyCopy] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [notes, setnotes] = useState("");

  useEffect(() => {
    getItemInfo(params.po_no);
  }, []);
  const deleteItem = () => {
    setLoading(true);
    if (delFlag == 1) {
      let u = "/api/deletetc";
      axios
        .post(url + u, {
          po_no: params.po_no.toString(),
          user: localStorage.getItem("email"),
          item: +item,
        })
        .then((res) => {
          setLoading(false);
          setVisible(false);
          if (res?.data?.suc > 0) {
            Message("success", res?.data?.msg);
            navigate(-1);
          } else {
            Message("error", res?.data?.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/error" + "/" + err.code + "/" + err.message);
        });
    }
  };
  const getItemInfo = (po_no) => {
    setLoading(true);
    axios
      .post(url + "/api/getpo", { id: 0 })
      .then((resPO) => {
        setId(resPO?.data?.msg?.filter((e) => e.po_no == po_no)[0]?.sl_no);
        axios
          .post(url + "/api/getmindel", {
            id: +params.id,
          })
          .then((resItems) => {
            console.log(resItems);
            setLoading(false);
            setItems(resItems?.data?.msg);
            for (let i of resItems?.data?.msg) {
              itemForm.push({
                sl_no: i.sl_no,
                item_id: i.sl_no,
                name: i.prod_name,
                quantity: i.rc_qty,
                issue_qty: i.issue_qty || 0,
                notes: i.notes || "",
                purpose: i.purpose,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            navigate("/error" + "/" + err.code + "/" + err.message);
          });
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  };

  const handleDtChange = (index, event) => {
    let data = [...itemForm];
    data[index][event.target.name] = event.target.value;

    setItemForm(data);
    console.log(data);
  };

  const onsubmit = () => {
    setLoading(true);
    axios
      .post(url + "/api/addmin", {
        po_no: params.id,
        user: localStorage.getItem("email"),
        min: itemForm,
      })
      .then((res) => {
        setLoading(false);
        if (res?.data?.suc > 0) {
          Message("success", res?.data?.msg);
          // navigate(-1);
        } else {
          Message("error", res?.data?.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  };

  return (
    <section className="bg-transparent dark:bg-[#001529]">
      <HeadingTemplate
        text={"Update MIN"}
        mode={params.id > 0 ? 1 : 0}
        title={"Category"}
        data={""}
      />
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
        <div className="grid grid-cols-12 gap-2">
          <div className={"w-full col-span-12 bg-white p-6 rounded-2xl"}>
            <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-12">
                <TDInputTemplate
                  placeholder="PO No."
                  type="text"
                  label="PO No."
                  name="po_no"
                  formControlName={params.po_no}
                  handleChange={(txt) => setPoNo(txt.target.value)}
                  disabled={params.id > 0}
                  mode={1}
                />
                {params.po_no && (
                  <div className="flex justify-between">
                    <Viewdetails
                      click={() => {
                        setFlag(14);
                        setVisible(true);
                      }}
                    />
                  </div>
                )}
              </div>

              <>
                <div className="relative overflow-x-auto sm:col-span-12">
                     
                  {itemForm?.length > 0 &&
                    itemForm.map((item, index) => (
                      <>
                        <table className="w-full border-separate border border-[#C4F1BE] overflow-x-scroll text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400">
                          <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 w-1/4 font-bold"
                              >
                                Item
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 w-1/4 font-bold"
                              >
                                Opening Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 w-1/4 font-bold"
                              >
                                Issue Quantity
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 w-1/4 font-bold"
                              >
                                Purpose
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-[#DDEAE0] border-b-2 border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                              <th
                                scope="row"
                                className="px-4 w-1/4 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {item.name}
                              </th>
                              <th
                                scope="row"
                                className="px-4 w-1/4 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <TDInputTemplate
                                  placeholder="Opening Quantity"
                                  type="number"
                                  name="opn_qty"
                                  disabled={true}
                                  formControlName={item.quantity}
                                  handleChange={(event) =>
                                    handleDtChange(index, event)
                                  }
                                  mode={1}
                                />
                              </th>

                              <td className="px-6 py-4 w-1/4">
                                <TDInputTemplate
                                  placeholder="Quantity"
                                  type="number"
                                  name="issue_qty"
                                  formControlName={item.issue_qty}
                                  handleChange={(event) =>
                                    handleDtChange(index, event)
                                  }
                                  mode={1}
                                />
                                {item.issue_qty > item.quantity ? (
                                  <VError title={"Invalid value"} />
                                ) : null}
                                 {!item.issue_qty ? (
                                  <VError title={"Required"} />
                                ) : null}
                              </td>
                              <td className="px-6 py-4 w-1/4">
                                <TDInputTemplate
                                  placeholder="Purpose"
                                  type="number"
                                  name="purpose"
                                  formControlName={item.purpose}
                                  handleChange={(event) =>
                                    handleDtChange(index, event)
                                  }
                                  data={[
                                    {
                                      name: "Manufacturing Activity",
                                      code: "M",
                                    },
                                    { name: "Resale", code: "R" },
                                  ]}
                                  mode={2}
                                />
                                {!item.purpose ? (
                                  <VError title={"Required"} />
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="w-full border-separate border border-[#C4F1BE] overflow-x-scroll text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400">
                          <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 w-1/4 font-bold"
                              >
                                Notes
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-[#DDEAE0] border-b-2 border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                              <th
                                scope="row"
                                className="px-4 w-1/4 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <TDInputTemplate
                                  placeholder="Notes"
                                  type="text"
                                  name="notes"
                                  formControlName={item.notes}
                                  handleChange={(event) =>
                                    handleDtChange(index, event)
                                  }
                                  mode={1}
                                />
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      {itemForm.length>1 &&  <Divider
                          style={{ borderColor: "#014737", color: "#A8A29E" }}
                        >
                          Material Issue Note
                        </Divider>}
                      </>
                    ))}
                </div>
              </>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => onsubmit()}
                className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={flag1}
        id={id}
        data={itemForm}
        onPress={() => setVisible(false)}
        onDelete={() => deleteItem()}
      />
    </section>
  );
}

export default MinForm;
