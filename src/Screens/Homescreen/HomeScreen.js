import React, { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';
import HELLO from "../../Assets/Images/hellooffice.png";
import STAT from "../../Assets/Images/stat.png";
import { motion } from "framer-motion"
import {InfoCircleOutlined,SettingOutlined,CloseOutlined,SolutionOutlined,ProjectOutlined, BellOutlined ,UserAddOutlined, SwapOutlined  } from '@ant-design/icons'
import { Flex, Progress } from 'antd';
function HomeScreen() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
            {
                label: '1',
                backgroundColor: '#01AB01',
                borderColor: '#01AB01',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: '2',
                backgroundColor:'#C05746',
                borderColor:'#C05746',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    const options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                // ticks: {
                //     color: textColorSecondary
                // },
                // grid: {
                //     color: surfaceBorder,
                //     drawBorder: false
                // }
            }
        }
    };

    setChartData(data)
    setChartOptions(options);
}, []);

  return (
    
    <main class="px-4 h-auto ">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <motion.div initial={{x:-500}} animate={{x:0}} transition={{delay:0.5, type:'spring',stiffness:20}}
          class="relative bg-gray-300 rounded-lg flex justify-center py-5 dark:border-gray-600 h-32 md:h-64 shadow-2xl"
        >
       <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween',duration:1.5}} className="text-green-500 text-md font-bold">
       Welcome somnath

       </motion.h2>

<img className="absolute bottom-0 h-52 w-full" src={`${HELLO}`} alt="" />

        </motion.div>
       
        <motion.div initial={{y:-500}} animate={{y:0}} transition={{delay:0.5, type:'spring',stiffness:20}}
          class="bg-green-500 relative rounded-lg shadow-lg dark:border-gray-600 h-32 md:h-64 flex justify-center items-center"
        >
 <Progress strokeLinecap="butt" type="circle" strokeColor={'white'} percent={75} />
{/* <img className="absolute bottom-0 right-0 h-24 w-24" src={`${STAT}`} alt="" /> */}

        </motion.div>
         <div 
          class=" flex rounded-lg bg-gray-700 col-span-2 dark:border-gray-600  h-32 md:h-64"
        >
          <div className="flex flex-col">
          <motion.div whileHover={{scale:1.1,backgroundColor:'#C05746'}} initial={{y:-600}} animate={{y:0}} transition={{delay:0.5, type:'spring', stiffness:20}} className="hover:-translate-y-1 hover:scale-110 bg-gray-300 h-40 w-32 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer">
          <SolutionOutlined className="text-5xl mb-2 text-green-500"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-green-500 ">
       Create PO

       </motion.h2>
          </motion.div>
          <motion.div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-green-500 h-20 mt-3 w-32 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <UserAddOutlined className="text-2xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Users

       </motion.h2>
          </motion.div>
          </div>
          <div className="ml-3 flex flex-col">
          <motion.div initial={{opacity:0,x:200}} animate={{opacity:1,x:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-[#C05746] h-20 w-32 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <ProjectOutlined className="text-2xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Open a project

       </motion.h2>
          </motion.div>

          <motion.div initial={{opacity:0,x:-200}} animate={{opacity:1,x:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-green-500 h-40 mt-3 w-32 shadow-lg rounded-lg flex flex-col justify-center items-center">
          <SwapOutlined className="text-5xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Transfer request

       </motion.h2>
          </motion.div>
          </div>
          <div className="ml-3 flex flex-col">
          <motion.div initial={{opacity:0,scale:1.5}} animate={{opacity:1,scale:1}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-green-500 h-32 w-56 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <BellOutlined className="text-5xl mb-2 text-gray-300"/>
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-sm ">
       Unread notifications

       </motion.h2>
          </motion.div>
          <div className="flex mt-3">
          <motion.div initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-gray-300 mr-3 h-28 w-1/2 shadow-lg rounded-lg flex flex-col items-center justify-center">
          <InfoCircleOutlined className="text-2xl mb-2 text-[#C05746]"/>

          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-[#C05746] text-xs ">
       Reset Password

       </motion.h2>
          </motion.div>
          <motion.div initial={{opacity:0,y:100}} animate={{opacity:1,y:0}} transition={{delay:1, type:'spring', stiffness:20}} className="bg-[#C05746] h-28 w-1/2 shadow-lg rounded-lg flex flex-col justify-center items-center">
          <InfoCircleOutlined className="text-2xl mb-2 text-gray-300"/>

<motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'tween'}} className="text-gray-300 text-xs ">
Reset Password

</motion.h2>
          </motion.div>
          </div>
         

          {/* <div className="bg-green-500 h-40 mt-3 w-32 rounded-lg"></div> */}
          </div>
       


        </div>
         <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5,duration:0.5, type:'spring',stiffness:20}}
          class="shadow-xl rounded-lg bg-[#C05746] col-span-2 dark:border-gray-600 p-4 h-32 md:h-64"
        >
         <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, type:'spring',stiffness:10}} className="card flex-col flex-wrap items-center justify-evenly space-y-5 gap-4 overflow-clip max-h-full">
            <div className="px-5 bg-white text-green-500 font-thin h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <SettingOutlined  className="mr-4 rounded-full text-green-500 text-2xl" /> Nut bolts have been delivered
            </div>
             <div className="px-5 bg-white text-[#FF5449] h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <CloseOutlined className="mr-4 bg-white rounded-full text-[#FF5449] text-2xl" /> Delivery date overstepped
            </div>
            <div className="px-5 bg-white text-[#22A0A6] h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <InfoCircleOutlined className="mr-4 bg-white rounded-full text-[#22A0A6] text-2xl" /> New project awaiting review
            </div>
            <div className="px-5 bg-white text-green-500 font-thin h-12 w-full rounded-full flex justify-start items-center shadow-xl">
            <SettingOutlined  className="mr-4 rounded-full text-green-500 text-2xl" /> Nut bolts have been delivered
            </div>
           
            
           
            
           
            
        </motion.div>

        </motion.div>
        <motion.div initial={{opacity:0,x:-100}} animate={{opacity:1,x:0}} transition={{delay:1, type:'spring', stiffness:20}}
          class="bg-gray-300 rounded-lg shadow-lg dark:border-gray-600 h-32 md:h-64"
        >

<Chart type="bar" className="h-64" data={chartData} options={chartOptions} />

        </motion.div>
         <motion.div initial={{opacity:0,x:600}} animate={{opacity:1,x:0}} transition={{delay:1, type:'spring', stiffness:20}}
          class="bg-green-500 flex justify-center items-center shadow-lg rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
        >
 <Progress strokeLinecap="butt" type="circle" strokeColor={'white'} percent={75} />

        </motion.div>
      </div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
      ></div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
      </div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
      ></div>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
        <div
          class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
        ></div>
      </div>
    </main>
  );
}

export default HomeScreen;
