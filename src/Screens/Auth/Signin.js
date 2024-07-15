import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import IMG from "../../Assets/Images/sign_in.png";
import LOGO from "../../Assets/Images/inverted.png";
import { routePaths } from "../../Assets/Data/Routes";
import VError from "../../Components/VError";
import TDInputTemplate from "../../Components/TDInputTemplate";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { url } from "../../Address/BaseUrl";
import { Message } from "../../Components/Message";
import { motion } from "framer-motion"
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
        if (res?.data?.suc <= 0) {
          Message("error", "Invalid credentials");
        } else {
          navigate(routePaths.HOME);
          localStorage.setItem(
            "first_login",
            res?.data?.msg[0].first_login_flag
          );
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
    <div className="bg-gray-700 p-20 flex justify-center min-h-screen min-w-screen">
      <motion.div  initial={{opacity:0,scale:1.3}} animate={{opacity:1,scale:1}} transition={{delay:0.5,type:'spring'
      }} className="grid grid-cols-2 gap-0 h-auto shadow-lg w-5/6">
        <div className="hidden bg-gray-800 sm:block rounded-l-3xl">
          <img className="ml-7 h-full w-full" src={`${IMG}`} alt="" />
        </div>
        <div
          className={`p-5 col-span-2 sm:col-span-1 
        bg-gray-800 h-auto space-y-5 w-full
         rounded-r-3xl
        `}
        >
           <Spin
              indicator={<LoadingOutlined spin />}
              size="large"
              className="text-green-600 dark:text-gray-400"
              spinning={loading}
            >
          <div
            className={`max-w-screen px-16
                flex-col items-center justify-center mt-7
                `}
          >
            <div className="flex-col items-center justify-center ml-7 2xl:ml-36 2xl:mt-20">
              <motion.h2 className="text-green-500 text-4xl mt-14 ml-24 font-bold" initial={{opacity:1}} animate={{opacity:0,y:-20}} transition={{delay:4, type:'tween'
              }}>Welcome</motion.h2>
              <motion.img initial={{opacity:0}} animate={{opacity:1}} transition={{delay:4, type:'spring'
              }} src={LOGO} className="h-20 -mt-16 ml-9" alt="Flowbite Logo" />
            </div>
            
           
              <form
                onSubmit={formik.handleSubmit}
                className="w-full py-6 sm:ml-10 2xl:mt-20"
              >
                <div className="pt-1 block ">
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
                    <p className="text-xs text-green-500 hover:underline py-2 cursor-pointer">
                      Forgot password?
                    </p>
                  </Link>
                </div>
                <div className="pt-4 pb-4 flex justify-center text-sm">
                  <button
                    disabled={!formik.isValid}
                    type="submit"
                    className="bg-green-500 hover:duration-500 w-full hover:scale-105 hover:bg-[#C05746]  text-white p-3 rounded-full"
                  >
                    Login to your account
                  </button>
                </div>
              </form>
          </div>
          </Spin>

        </div>
        
      </motion.div>
    </div>
  );
}

export default Signin;
