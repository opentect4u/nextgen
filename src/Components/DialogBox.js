import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import ProfileInfo from './ProfileInfo';
import PasswordComp from './PasswordComp';
import { routePaths } from '../Assets/Data/Routes';
import '../Styles/styles.css'
import ClientInfo from './ClientInfo';
import PocInfo from './PocInfo';
import ProjectInfo from './ProjectInfo';
import VendorInfo from './VendorInfo';
import ProdInfo from './ProdInfo';
import PoPreview from './Steps/PoPreview';
import TDInputTemplate from './TDInputTemplate';
import AmendPreview from './AmendPreview';
const DialogBox = ({ visible, flag, onPress,onDelete,data,amendPo,id }) => {
  const navigate = useNavigate();
  const [po_no,setPoNo]=useState('')
  useEffect(()=>{setPoNo('')},[])
  console.log(data)
  const onChange = (key) => {
    console.log(key,'onChange');
  };
  const itemsComp = [
    {
      key: '1',
      label: 'User profile',
      children: <ProfileInfo flag={flag}/>
    },
    {
      key: '2',
      label: 'Change password',
      children: <PasswordComp mode={2} onPress={onPress}/>
    }
  ];
 
  return (
      <Dialog  closable={flag!=3?true:false} header={<div className={flag!=1?'text-green-900  font-bold':'text-green-900  font-bold w-20'}>{flag!=2 && flag!=5  && flag!=6 && flag!=7 && flag!=8 && flag!=9 && flag!=10  && flag!=11?'Warning!':flag!=10?'Information':'Preview'}</div>} visible={visible} maximizable style={{
         width: '50vw',
         background:'black'
         }} onHide={() => {if (!visible) return; onPress() }}>
         {flag==1 && 
             <p className="m-0">Do you want to logout?
             <div className='flex justify-center'>
             <button type="reset" onClick={onPress} className="inline-flex mr-3 bg-[#92140C] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                No
             </button>
             <button type="submit" onClick={()=>{localStorage.clear();navigate(routePaths.LANDING)}}className="inline-flex bg-green-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Yes
             </button>
             </div>
             </p>
        }
        {flag==2 && 
         <Tabs defaultActiveKey="1" size={'large'}  animated centered items={itemsComp} onChange={onChange} />
        }
          {flag==3 && 
          <PasswordComp mode={3} onPress={onPress}/>
        }
        {flag==4 && 
          <p className="m-0">Do you want to delete this item?
          <div className='flex justify-center'>
          <button type="reset" onClick={onPress} className="inline-flex mr-3 bg-[#92140C] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             No
          </button>
          <button type="submit" onClick={onDelete} className="inline-flex bg-green-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             Yes
          </button>
          </div>
          </p>
        }
        {flag==5 && 
        
        <p className="m-0">
          <ClientInfo data={data}/>
        </p>
        
        }
          {flag==6 && 
        
        <p className="m-0">
          <PocInfo data={data}/>
        </p>
        
        }
         {flag==7 && 
        
        <p className="m-0">
          <ProjectInfo data={data}/>
        </p>
        
        }
         {flag==8 && 
        
        <p className="m-0">
          <VendorInfo data={data}/>
        </p>
        
        }
         {flag==9 && 
        
        <p className="m-0">
          <ProdInfo data={data}/>
        </p>
        
        }
         {flag==10 && 
        
        <p className="m-0">
          <PoPreview data={data}/>
        </p>
        
        }
         {flag==11 && 
        
        <p className="m-0">
          <TDInputTemplate 
           placeholder="Select PO"
           type="text"
           label="Select PO"
           name="po_no"
           formControlName={po_no}
           handleChange={(txt)=>{setPoNo(txt.target.value);console.log(txt.target.value)}}
           mode={2} 
          data={data}/>
        {po_no && po_no!='Select PO' && <div className='flex justify-center items-center my-3'>
          <AmendPreview id={po_no}/>
        </div>}
        <div className='flex justify-end'>
        {po_no && po_no!='Select PO' &&  <button
        type="submit"
        className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
        onClick={()=>amendPo(po_no)}
    >
        Proceed
    </button>} </div>
        
        </p>
        
        }
         {flag==12 && 
          <p className="m-0">Do you want to cancel this PO?
          <div className='flex justify-center'>
          <button type="reset" onClick={onPress} className="inline-flex mr-3 bg-[#92140C] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             No
          </button>
          <button type="submit" onClick={onDelete} className="inline-flex bg-green-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             Yes
          </button>
          </div>
          </p>
        }
         {flag==13 && 
          <p className="m-0">Do you want to cancel this PO without citing any reason?
          <div className='flex justify-center'>
          <button type="reset" onClick={onPress} className="inline-flex mr-3 bg-[#92140C] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             No
          </button>
          <button type="submit" onClick={onDelete} className="inline-flex bg-green-900 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             Yes
          </button>
          </div>
          </p>
        }
        {flag==14 && <AmendPreview id={id}/>}
        {flag==15 && 
        
        <>
          {data.length > 0 && (
                    <table className="w-full text-sm text-left rtl:text-right shadow-lg text-gray-500 dark:text-gray-400">
                      <thead className="text-xs bg-[#C4F1BE] font-bold uppercase text-green-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3 font-bold">
                            Item
                          </th>

                          <th scope="col" className="px-6 py-3 font-bold">
                            Quantity To be delivered
                          </th>
                          <th scope="col" className="px-6 py-3 font-bold">
                            Quantity to Client
                          </th>
                          <th scope="col" className="px-6 py-3 font-bold">
                            Quantity to Warehouse
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                        <tr className="bg-[#DDEAE0] border-b-2 border-white my-3 font-bold dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 w-3/12 py-4  text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {item.item}
                            </th>

                            <td className="px-6 py-4 w-3/12">
                            {item.quantity}
                            </td>
                            <td className="px-6 py-4 w-3/12">
                             {item.cust_qty}
                            </td>
                            <td className="px-6 py-4 w-3/12">
                             {item.wh_qty}
                            </td>
                           
                          </tr>
                          
                        ))}
                      </tbody>
                    </table>
                  )}
        
        
        </>}
      </Dialog>
  );
};

export default DialogBox;