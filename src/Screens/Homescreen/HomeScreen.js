import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import HELLO from "../../Assets/Images/hellooffice.png";
import CIRCLE from "../../Assets/Images/circle.png";
import STAT from "../../Assets/Images/stat.png";
import { motion } from "framer-motion";
import {
  InfoCircleOutlined,
  SettingOutlined,
  CloseOutlined,
  SolutionOutlined,
  ProjectOutlined,
  BellOutlined,
  UserAddOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Flex, Progress } from "antd";
import { WidthFull } from "@mui/icons-material";
function HomeScreen() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["", "", "", "", "", "", ""],
      datasets: [
        {
          label: "1",
          backgroundColor: "#052d27",
          borderColor: "#052d27",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "2",
          backgroundColor: "#347865",
          borderColor: "#347865",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
    const options = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      WidthFull,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          // ticks: {
          //     color: textColorSecondary
          // },
          // grid: {
          //     color: surfaceBorder,
          //     drawBorder: false
          // }
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <main class="px-4 h-auto ">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div
  initial={{ x: -500 }}
  animate={{ x: 0 }}
  transition={{ delay: 0.5, type: "spring", stiffness: 20 }}
  className="relative bg-white rounded-2xl  flex justify-center py-5 dark:border-gray-600 h-48 md:h-80 4 shadow-3xl"
>
  <img
    className="absolute bottom-0  h-full w-full rounded-3xl"
    src={`${HELLO}`}
    alt=""
  />

  <div className="absolute inset-0 bg-black bg-opacity-15 flex  justify-center rounded-2xl">
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, type: "tween", duration: 1.5 }}
      className="text-white text-xl font-bold mt-6 font-serif"
    >
      Welcome {localStorage.getItem("user_name")}
    </motion.h2>
  </div>
</div>

        <div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            type: "spring",
            stiffness: 20,
          }}
          class=" rounded-xl bg-transparent col-span-1 dark:border-gray-600 p-4 h-48 md:h-80"
        >

          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 10 }}
            className="card flex-col text-xs flex-wrap items-center justify-evenly space-y-3 gap-4 overflow-clip max-h-full -mt-2"
          >
            <div className="px-5 bg-white text-emerald-800 font-thin text-sm h-14 w-full rounded-xl flex justify-start items-center shadow-xl">
              <img src={CIRCLE} alt="Circle"/>
              <span className="ml-2">Materials delivered</span>
            </div>
            <div className="px-5 bg-white text-emerald-800 h-14 w-full rounded-xl text-sm flex justify-start items-center shadow-xl">
              <CloseOutlined className="mr-4 bg-white rounded-xl text-emerald-800 text-sm" />{" "}
              Delivery date nearing
            </div>
            <div className="px-5 bg-white text-emerald-800 h-14 w-full rounded-xl flex justify-start items-center shadow-xl">
              <InfoCircleOutlined className="mr-4 bg-white rounded-lg text-emerald-800 text-sm" />{" "}
              New project awaiting review
            </div>
            <div className="px-5 bg-white text-emerald-800 font-thin h-14 w-full rounded-lg flex justify-start items-center shadow-xl">
              <SettingOutlined className="mr-4 rounded-lg text-emerald-800 text-sm" />{" "}
              Nut bolts have been delivered
            </div>
          </div>
        </div>
        <div class=" flex rounded-lg col-span-2 bg-white dark:border-gray-600  h-32 md:h-64">
          {/* <div className="flex flex-col">
          <div whileHover={{scale:1.1,backgroundColor:'#C05746'}} initial={{y:-600}} animate={{y:0}} transition={{delay:0.5, type:'spring', stiffness:20}} className="hover:-translate-y-1 hover:scale-110 bg-white h-40 sm:w-32 2xl:w-56 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer">
          <SolutionOutlined className="text-5xl mb-2 text-[#052d27]"/>
         <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-[#052d27] ">

          <div className="flex flex-col">
          <div whileHover={{scale:1.1,backgroundColor:'#C05746'}} initial={{y:-600}} animate={{y:0}} transition={{delay:0.5, type:'spring', stiffness:20}} className="hover:-translate-y-1 hover:scale-110 bg-gray-300 h-40 sm:w-32 xl:w-48 2xl:w-56 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer">
          <SolutionOutlined className="text-5xl mb-2 text-green-500"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-green-500 ">

       Create PO

       </motion.h2>
          </div>

        
          <div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-green-500 h-20 mt-3 xl:w-48  w-32 2xl:w-56 rounded-lg shadow-lg flex flex-col items-center justify-center">

          <UserAddOutlined className="text-2xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Users

       </motion.h2>
          </div>
          </div>
          <div className="ml-3 flex flex-col">
          <div initial={{opacity:0,x:200}} animate={{opacity:1,x:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-[#C05746] h-20 w-32 2xl:w-56 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <ProjectOutlined className="text-2xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Open a project

       </motion.h2>
          </div>

          <div initial={{opacity:0,x:-200}} animate={{opacity:1,x:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-[#052d27] h-40 mt-3 w-32 2xl:w-56 shadow-lg rounded-lg flex flex-col justify-center items-center">
          <SwapOutlined className="text-5xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Transfer request

       </motion.h2>
          </div>
          </div>
          <div className="ml-3 flex flex-col">
          <div initial={{opacity:0,scale:1.5}} animate={{opacity:1,scale:1}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-[#052d27] h-32 w-56 2xl:w-60 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <BellOutlined className="text-5xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Unread notifications

       </motion.h2>
          </div>
          <div className="flex mt-3">
          <div initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-gray-300 mr-3 h-28 w-1/2 2xl:w-3/4 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <InfoCircleOutlined className="text-2xl mb-2 text-[#C05746]"/>

          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-[#C05746] text-xs ">
       Reset Password

       </motion.h2>
          </div>
          <div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-[#C05746] h-28 w-1/2 2xl:w-3/4 shadow-lg rounded-lg flex flex-col justify-center items-center">
          <InfoCircleOutlined className="text-2xl mb-2 text-gray-300"/>

<motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-xs ">
Reset Password

</motion.h2>
          </div>
          </div>
         

         
          </div>
        */}
          {/* <div initial={{opacity:0,x:-100}} animate={{opacity:1,x:0}} transition={{delay:1, type:'spring', stiffness:20}}
          class="bg-white col-span-2 rounded-lg shadow-lg dark:border-gray-600 h-32 md:h-64"
        > */}

          <Chart
            type="bar"
            className="h-64"
            data={chartData}
            options={chartOptions}
          />

          {/* </div> */}
        </div>
        {/* <div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5,duration:0.5, type:'spring',stiffness:20}}
          class="shadow-xl rounded-lg bg-[#C05746] col-span-2 dark:border-gray-600 p-4 h-32 md:h-64"
        >
         <div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'spring',stiffness:10}} className="card flex-col flex-wrap items-center justify-evenly space-y-5 gap-4 overflow-clip max-h-full">
            <div className="px-5 bg-white text-[#052d27] font-thin h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <SettingOutlined  className="mr-4 rounded-full text-[#052d27] text-2xl" /> Nut bolts have been delivered
            </div>
             <div className="px-5 bg-white text-[#FF5449] h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <CloseOutlined className="mr-4 bg-white rounded-full text-[#FF5449] text-2xl" /> Delivery date overstepped
            </div>
            <div className="px-5 bg-white text-[#22A0A6] h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <InfoCircleOutlined className="mr-4 bg-white rounded-full text-[#22A0A6] text-2xl" /> New project awaiting review
            </div>
            <div className="px-5 bg-white text-[#052d27] font-thin h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <SettingOutlined  className="mr-4 rounded-full text-[#052d27] text-2xl" /> Nut bolts have been delivered
            </div>
           
            
           
            
           
            
        </div>

        </div> */}
        <div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 20 }}
          class="bg-white rounded-lg shadow-lg dark:border-gray-600 h-32 md:h-64"
        >
          <Chart
            type="bar"
            className="h-64"
            data={chartData}
            options={chartOptions}
          />
        </div>
        <div
          initial={{ opacity: 0, x: 600 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 20 }}
          class="bg-white flex justify-center col-span-1 items-center shadow-lg rounded-lg border-white dark:border-gray-600 h-32 md:h-64"
        >
          <Progress
            strokeLinecap="butt"
            type="circle"
            strokeColor={"#347865"}
            percent={75}
          />
        </div>
        <div class="col-span-2 overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-emerald-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 text-emerald-500">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3 text-emerald-500">
                  Color
                </th>
                <th scope="col" class="px-6 py-3 text-emerald-500">
                  Category
                </th>
                <th scope="col" class="px-6 py-3 text-emerald-500">
                  Price
                </th>
                <th scope="col" class="px-6 py-3 text-emerald-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">Silver</td>
                <td class="px-6 py-4">Laptop</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">White</td>
                <td class="px-6 py-4">Laptop PC</td>
                <td class="px-6 py-4">$1999</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td class="px-6 py-4">Black</td>
                <td class="px-6 py-4">Accessories</td>
                <td class="px-6 py-4">$99</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Google Pixel Phone
                </th>
                <td class="px-6 py-4">Gray</td>
                <td class="px-6 py-4">Phone</td>
                <td class="px-6 py-4">$799</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>
      <div class="border-2 grid-cols-1 border-dashed rounded-lg border-white dark:border-gray-600 h-96 mb-4">
        
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
      </div>
      <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-96 mb-4"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
        <div class="border-2 border-dashed rounded-lg border-white dark:border-gray-600 h-48 md:h-72"></div>
      </div>
    </main>
  );
}

export default HomeScreen;
