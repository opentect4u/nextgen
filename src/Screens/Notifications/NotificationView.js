import React, { useState } from 'react'
import HeadingTemplate from '../../Components/HeadingTemplate';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
const data = [
    { id: 1, date: '08 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 2, date: '07 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 3, date: '05 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 4, date: '02 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 5, date: '01 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
];
function NotificationView() {
    // const [isChecked, setIsChecked] = useState(false);
    // const handleCheckboxChange = (event) => {
    //     setIsChecked(event.target.checked);
    //   };
    const [checkedState, setCheckedState] = useState(
        new Array(data.length).fill(false)
    );

    const handleCheckboxChange = (index) => {
        const updatedCheckedState = checkedState.map((item, idx) =>
            idx === index ? !item : item
        );
        console.log(updatedCheckedState, 'updatedCheckedState')
        setCheckedState(updatedCheckedState);
    };
    let allChecked = checkedState.every(Boolean);

    const handleDeleteAll = () => {
        console.log('all');
    };
    return (

        <section className="bg-transparent dark:bg-[#001529]">
            <HeadingTemplate
                text={"Notifications"}
            // title={'Project'}
            />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* <th scope="col" class="p-4">
                            <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                    </th> */}
                            <th scope="col">
                                {allChecked &&

                                    (
                                        <>
                                        {/* <Button
                                            className="text-red-800"
                                        >
                                            Read
                                        </Button>
                                        <Button
                                            className="text-red-800"
                                        >
                                            Unread
                                        </Button> */}
                                        <Button
                                            className="text-red-800"
                                            icon={<DeleteFilled />}
                                            onClick={handleDeleteAll}>
                                                Delete All
                                            </Button></>
                                    )

                                }
                            </th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....
                            </th>

                            <td class="px-6 py-4">
                                07 May 2024
                            </td>
                            <td class="flex items-center px-6 py-4">
                            <Button
                                    className=" text-red-800"
                                    icon={<DeleteFilled />}>
                                </Button>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....
                            </th>
                            <td class="px-6 py-4">
                                05 May 2024
                            </td>
                            <td class="flex items-center px-6 py-4">
                            <Button
                                    className=" text-red-800"
                                    icon={<DeleteFilled />}>
                                </Button>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 focus:ring-green-900dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....
                            </th>
                            <td class="px-6 py-4">
                                02 May 2024
                            </td>
                            <td class="flex items-center px-6 py-4">
                            <Button
                                    className=" text-red-800"
                                    icon={<DeleteFilled />}>
                                </Button>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    />
                                    <label for="checkbox-table-search-3" class="sr-only"
                                    >checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....
                            </th>

                            <td class="px-6 py-4">
                                02 May 2024
                            </td>
                            <td class="flex items-center px-6 py-4">
                            {isChecked && (
         <Button
         className=" text-red-800"
         icon={<DeleteFilled />}>
          </Button>)}
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-4 p-4">
                                <div class="flex items-center">
                                    <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....
                            </th>
                            <td class="px-6 py-4">
                                01 May 2024
                            </td>
                            <td class="flex items-center px-6 py-4">
                                <Button
                                    className=" text-red-800"
                                    icon={<DeleteFilled />}>
                                </Button>
                            </td>
                        </tr>
                    </tbody> */}

                    <tbody>
                        {data.map((row, index) => (
                            <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${row.id}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            checked={checkedState[index]}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        <label htmlFor={`checkbox-table-search-${row.id}`} className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {row.text}
                                </th>
                                <td className="px-6 py-4">
                                    {row.date}
                                </td>
                                <td className="flex items-center px-6 py-4">
                                    {checkedState[index] && (
                                        <Button className="text-red-800" icon={<DeleteFilled />}>
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>






        </section>
    )
}

export default NotificationView