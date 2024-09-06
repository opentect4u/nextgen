import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { url } from "../../../Address/BaseUrl";
import { Spin, Tag } from "antd";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DeliveryFormComp from "../../../Components/DeliveryFormComp";

function ToCustomerForm() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log(values);

    if (values.po_no) {
      const formData = new FormData();
      setLoading(true);
      axios
        .post(url + "/api/adddelivery", {
          user: localStorage.getItem("email"),
          id: +params.id,
          comments: values.comments,
          delivery_date:values.delivery_date,
          po_no: values.po_no.toString(),
          status:values.status,
          itemForm: values.itemForm,
        })
        .then((res) => {
          console.log(res);

          formData.append("user", localStorage.getItem("email"));
          formData.append("po_no", values.po_no);

          if (values.doc1) formData.append("docs1", values.doc1);
          if (values.doc2) formData.append("docs2", values.doc2);

          axios
            .post(url + "/api/add_delivery_files", formData)
            .then((resProjFile) => {
              setLoading(false);

              if (resProjFile.data.suc > 0) {
                Message("success", res.data.msg);
                if (+params.id == 0) navigate(-1);
              } else {
                Message("error", res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              navigate("/error" + "/" + err.code + "/" + err.message);
            });
        });
    }
  };
  return (
    <Spin
      indicator={<LoadingOutlined spin />}
      size="large"
      className="text-green-900 dark:text-gray-400"
      spinning={loading}
    >
      <DeliveryFormComp
        flag={"C"}
        title={"Delivery Details"}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      />
    </Spin>
  );
}

export default ToCustomerForm;
