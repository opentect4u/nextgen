import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import axios from "axios";
import { Message } from "../Message";
import { url } from "../../Address/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollPanel } from "primereact/scrollpanel";
import { Spin } from "antd";
import {
  DeleteOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import TimeLine from "./TimeLine";
import TIME from "../../../src/Assets/Images/time.svg";
import NOTES from "../../../src/Assets/Images/Notes.png";
import DialogBox from "../DialogBox";
function PoLogs({ data }) {
  console.log(data);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(0);
  const [doc, setDoc] = useState(0);
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [visible,setVisible]=useState(false)
  const [id,setId]=useState(0)
  const addcomment = () => {
    if (comment) {
      setLoading(true);
      axios
        .post(url + "/api/addpocomments", {
          id: +params.id,
          comments: localStorage.getItem("po_comments"),
          user: localStorage.getItem("email"),
        })
        .then((res) => {
          console.log(res);

          if (res.data.suc > 0) {
            setCount((prev) => prev + 1);
            Message("success", res?.data?.msg);
            
          }
        });
      setLoading(false);
    }
    console.log(count);
  };
  const deleteDoc=()=>{
    setLoading(true)
    axios.post(url+'/api/del_log_files',{id:fileList[id].sl_no,po_no:params.id,user:localStorage.getItem('email')}).then(res=>{
      console.log(res);
      setLoading(false)
      setVisible(false)
      if(res.data.suc>0){
      fileList.splice(id,1)
      setFileList(fileList)
      Message('success',res.data.msg) 
      }
      else
      Message('error',res.data.msg)
    }
    ).catch(err=>Message('error',err))
   }
  useEffect(() => {
    setTimeline([]);
    setTimeline(timeline);
  }, [count]);
  useEffect(() => {
    setTimeline(data);
  }, []);
  const uploadLogFile = () => {
    const formData = new FormData();
    formData.append("po_sl_no", params.id);
    formData.append("user", localStorage.getItem("email"));
    if (doc) formData.append("docs1", doc);
    setLoading(true);
    axios
      .post(url + "/api/add_log_files", formData)
      .then((resProjFile) => {
        setLoading(false);

        if (resProjFile.data.suc > 0) {
          Message("success", resProjFile.data.msg);
          // onClose()
          // axios.post(url + "/api/getlogdoc", { id: +params.id }).then((res) => {
          //   console.log(res);
          //   setFileList([]);
          //   for (let i of res.data.msg) {
          //     fileList.push({
          //       sl_no: i.sl_no,
          //       doc: i.doc,
          //     });
          //   }
          //   setFileList(fileList);
          // });
        } else {
          Message("error", resProjFile.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error" + "/" + err.code + "/" + err.message);
      });
  };
  useEffect(() => {
    axios.post(url + "/api/getlogdoc", { id: +params.id }).then((res) => {
      console.log(res);
      setFileList([]);
      for (let i of res.data.msg) {
        fileList.push({
          sl_no: i.sl_no,
          doc: i.doc,
        });
      }
      setFileList(fileList);
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .post(url + "/api/getpocomments", { id: +params.id })
      .then((resCom) => {
        setTimeline([]);
        setLoading(false);
        console.log(resCom);
        for (let i = 0; i < resCom?.data?.msg?.length; i++) {
          timeline.push({
            label: resCom?.data?.msg[i].created_at
              .toString()
              .split("T")
              .join(" "),
            children:
              resCom?.data?.msg[i].proj_remarks +
              " by " +
              resCom?.data?.msg[i].created_by.toString(),
          });
        }
        setTimeline(timeline);
      });
    console.log(count);
  }, []);
  return (
    <div className="grid grid-cols-2 gap-10 -ml-20 my-10">
      <div className="sm:col-span-1 rounded-lg shadow-lg -ml-4 bg-[#DDEAE0] p-5">
        {localStorage.getItem("po_status") == "U" ||
        localStorage.getItem("po_status") == "A" ? (
          <>
            <span className="sm:col-span-4">
              <TDInputTemplate
                placeholder="Comments"
                type="text"
                label="Comments"
                name="po_comments"
                formControlName={comment}
                handleChange={(txt) => {
                  setComment(txt.target.value);
                  localStorage.setItem("po_comments", txt.target.value);
                }}
                mode={3}
              />
              <Spin
                indicator={<LoadingOutlined spin />}
                size="large"
                className="text-green-900 dark:text-gray-400"
                spinning={loading}
              >
                <button
                  className="bg-green-900 hover:duration-500 w-full hover:scale-105  text-white p-1 my-3 rounded-full"
                  onClick={() => {
                    setComment("");
                    addcomment();
                  }}
                >
                  {" "}
                  Add comment{" "}
                </button>
              </Spin>
            </span>
            <span className="flex-col justify-between items-center gap-2">
              <TDInputTemplate
                placeholder="Add relevant documents"
                type="file"
                label="Add relevant documents"
                name="doc"
                // formControlName={comment}
                handleChange={(txt) => {
                  setDoc(txt.target.files[0]);
                }}
                mode={1}
              />
              <Spin
                indicator={<LoadingOutlined spin />}
                size="large"
                className="text-green-900 dark:text-gray-400"
                spinning={loading}
              >
                <button
                  className="bg-green-900 hover:duration-500 w-full hover:scale-105  text-white p-1 my-3 rounded-full"
                  onClick={() => {
                    if (doc) {
                      uploadLogFile();
                    }
                  }}
                >
                  {" "}
                  Add file{" "}
                </button>
              </Spin>
            </span>
            {fileList.map((item,index) => (
            <>

           

<a target="_blank" href={url + "/uploads/" + item.doc}>
                  {item.doc.split(".")[1] == "pdf" ? (
                    <FilePdfOutlined className="text-6xl my-7 text-red-600" />
                  ) : item.doc.split(".")[1]?.includes("doc") ? (
                    <FileWordOutlined className="text-6xl my-7 text-blue-900" />
                  ) : item.doc.split(".")[1]?.includes("xls") ||
                    item.doc.split(".")[1]?.includes("csv") ? (
                    <FileExcelOutlined className="text-6xl my-7 text-green-800" />
                  ) : item.doc.split(".")[1]?.includes("png") ||
                    item.doc.split(".")[1]?.includes("jpg") ||
                    item.doc.split(".")[1]?.includes("jpeg") ? (
                    <FileImageOutlined className="text-6xl my-7 text-yellow-500" />
                  ) : (
                    <FileTextOutlined className="text-6xl my-7 text-gray-600" />
                  )}
                </a>
                <DeleteOutlined  className='text-red-800 ' onClick={()=>{setId(index);setVisible(4)}}/>
                </>
            ))}
          </>
        ) : (
          <div className="flex-col ml-24 justify-center items-center">
            <img src={NOTES} className="h-52 w-60" />
            <span className="text-green-900 font-bold">
              Your notes will appear once it's saved.
            </span>
          </div>
        )}
      </div>
      <div className="sm:col-span-1 resize-y -ml-7">
        <ScrollPanel
          className="rounded-lg shadow-lg bg-[#DDEAE0]"
          style={{ width: "100%", height: "300px", padding: "5% 0%" }}
        >
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className="text-green-900 dark:text-gray-400"
            spinning={loading}
          >
            {localStorage.getItem("po_status") == "U" ||
            localStorage.getItem("po_status") == "A" ? (
              // <Timeline mode={"left"} items={timeline} />
              <TimeLine data={timeline} />
            ) : (
              <div className="flex-col ml-24 justify-center items-center">
                <img src={TIME} className="h-52 w-60" />
                <span className="text-green-900 font-bold">
                  Your timeline will come once a log is added
                </span>
              </div>
            )}
          </Spin>
        </ScrollPanel>
      </div>
      <DialogBox
        visible={visible}
        flag={4}
        onPress={() => setVisible(false)}
        onDelete={()=>deleteDoc()}
      />
    </div>
  );
}

export default PoLogs;
