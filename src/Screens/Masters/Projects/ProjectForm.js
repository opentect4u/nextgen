import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import BtnComp from '../../../Components/BtnComp';
import { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd'
import HeadingTemplate from '../../../Components/HeadingTemplate';
function ProjectForm() {
    const params= useParams()
    console.log(params,'params')
  return (
  
       <section className="bg-white dark:bg-[#001529]">
                <div className="py-8 mx-auto w-5/6 lg:py-16">
                <HeadingTemplate text={params.id>0?'Update project':'Add project'} />

                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label for="projnm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
                                <input type="text" name="projnm" id="projnm" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type project name" required="" />
                            </div>
                           
                            <div className="sm:col-span-2">
                                <label for="clnt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
                                <input type="text" name="clnt" id="clnt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Client Name" required="" />
                            </div>
                            {/* <div>
                                <label for="order_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Order ID</label>
                                <input type="number" name="order_id" id="order_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="001" required="" />
                            </div>
                            <div className="w-full">
                                <label for="order_dt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Order Date </label>
                                <DatePicker  name="order_dt" id="order_dt" size={'large'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 w-full dark:focus:border-primary-500" placeholder="Order date" required=""/>
                      
                            </div> */}
                            <div className="sm:col-span-2">
                                <label for="proj_add" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Address</label>
                                <textarea id="proj_add" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Full Address Here"></textarea>
                            </div>

                        </div>
                       <BtnComp/>
                    </form>
                </div>
            </section>
  )
}

export default ProjectForm
