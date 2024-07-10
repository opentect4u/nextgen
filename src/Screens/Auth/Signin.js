import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import IMG from "../../Assets/Images/sign_in.gif";
import LOGO from "../../Assets/Images/Logo.png";
import { routePaths } from "../../Assets/Data/Routes";
import VError from "../../Components/VError";
import TDInputTemplate from "../../Components/TDInputTemplate";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { url } from "../../Address/BaseUrl";
import { Message } from "../../Components/Message";
function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    axios
      .post(url + "/api/login", { id: values.email, password: values.password })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res?.data?.msg?.length <= 0) {
          Message("error", "Invalid credentials");
        } else {
          navigate(routePaths.HOME);
          localStorage.setItem("first_login", res?.data?.msg[0].first_login_flag);
          localStorage.setItem("dept_name", res?.data?.msg[0].dept_name);
          localStorage.setItem("desig_name", res?.data?.msg[0].desig_name);
          localStorage.setItem("email", values.email);
          localStorage.setItem("user_name", res?.data?.msg[0].user_name);
          localStorage.setItem("user_phone", res?.data?.msg[0].user_phone);
          localStorage.setItem("user_type", res?.data?.msg[0].user_type);
        }
      });
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Not a correct a email format"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div
      className="bg-green-800 flex justify-center min-h-screen min-w-screen 
    items-center
    p-2 shadow-lg
    "
    >
      <div
        className="
      grid 
      grid-cols-2 
      gap-0 h-auto shadow-lg"
      >
        <div
          className="hidden 
        sm:block rounded-l-3xl border-0 border-r border-r-slate-100"
        >
          <img className="w-full h-full rounded-l-3xl" src={`${IMG}`} alt="" />
        </div>
        <div
          className={`p-5 
        col-span-2 sm:col-span-1 
        bg-white h-full space-y-5 w-full
        rounded-r-3xl rounded-l-3xl lg:rounded-l-none
       
        `}
        >
          <div>
            <div
              className={`max-w-sm 
                
                flex-col items-center justify-center  mt-7
                `}
            >
              <div className="flex items-center justify-center">
                <img src={LOGO} className="h-20" alt="Flowbite Logo" />
              </div>
              <Spin
                indicator={<LoadingOutlined spin />}
                size="large"
                className="text-green-900 dark:text-gray-400"
                spinning={loading}
              >
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full py-6 sm:ml-10"
                >
                  <div className="pt-6 block ">
                    <TDInputTemplate
                      placeholder="youremail@gmail.com"
                      type="email"
                      label="Your email"
                      name="email"
                      formControlName={formik.values.email}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      mode={1}
                    />

                    {formik.errors.email && formik.touched.email ? (
                      <VError title={formik.errors.email} />
                    ) : null}
                  </div>
                  <div className="pt-6 block">
                    <TDInputTemplate
                      placeholder="*****"
                      type="password"
                      label="Your password"
                      name="password"
                      formControlName={formik.values.password}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      mode={1}
                    />

                    {formik.errors.password && formik.touched.password ? (
                      <VError title={formik.errors.password} />
                    ) : null}
                  </div>
                  <div className="pt-2">
                    <Link to={routePaths.FORGOTPASS}>
                      <p className="text-xs text-gray-500 hover:underline cursor-pointer">
                        Forgot password?
                      </p>
                    </Link>
                  </div>
                  <div className="pt-5 pb-4 block text-sm">
                    <button
                      disabled={!formik.isValid}
                      type="submit"
                      className="bg-green-900 hover:duration-500 hover:scale-105 hover:bg-green-800 w-full text-white p-3 rounded-md disabled:bg-green-200"
                    >
                      Login to your account
                    </button>
                  </div>
                </form>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
