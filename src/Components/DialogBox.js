import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useNavigate, useParams } from 'react-router-dom';
import { Popconfirm, Popover, Tabs, Tooltip } from 'antd';
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
import { Timeline } from 'antd';
import { ClockCircleOutlined, DeleteOutlined, InfoCircleOutlined, InfoOutlined } from '@ant-design/icons';
import axios from 'axios';
import { PanoramaSharp } from '@mui/icons-material';
import { Message } from './Message';
import { url } from '../Address/BaseUrl';
const DialogBox = ({ visible, flag, onPress,onDelete,data,amendPo,id,confirm }) => {
  const navigate = useNavigate();
  const [po_no,setPoNo]=useState('')
  const [item_nm,setItemNm]=useState('')
  const [item_qty,setItemQty]=useState('')
  const [item_sl,setItemSl]=useState('')
  const [item_remarks,setItemRemarks]=useState('')
  useEffect(()=>{setPoNo('')},[])
  const params=useParams()
  console.log(data)
  const content = (
    <div>
      <p>{item_sl}</p>
      <p>{item_remarks}</p>
    </div>
  );
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
  const timeLineItems=[]
 if(flag==15){
  for(let i=0; i<data.length;i++){
    timeLineItems.push({
      children:
      <>
      <span>Received {data[i].rc_qty} unit(s) by {data[i].rc_by}</span>
      <div className='my-2 p-2 bg-gray-200 rounded-lg flex-col justify-center items-center'>
      <span>Remarks: {data[i].remarks}</span> <br/>
      <span>Serial No.: {data[i].sl}</span>
      </div>
      </>
       ,
      // label:'Received on '+i.rc_at?.split('T')[0]+' at '+i.rc_at?.split('T')[1]
      label:<span>Received on {data[i].rc_at?.split('T')[0]+' at '+data[i].rc_at?.split('T')[1] } 
       <Popconfirm
    title="Delete the item"
    description="Are you sure to delete this item?"
    zIndex={50000}
    okText="Yes"
    cancelText="No"
    onConfirm={()=>{
      {
        axios.post(url+'/api/deleteitemdel',{po_no:params.po_no,user:localStorage.getItem('email'),item:data[i].item_sl}).then(res=>{
          if(res?.data?.suc>0)
            {
              Message('success',res?.data?.msg)
            
              // timeLineItems.splice(i,1)
              confirm(1)
              
            }
          else{
            Message('error',res?.data?.msg)
            confirm(0)


          }
        })
      }

    }}
  >
    {/* <Button danger>Delete</Button> */}
    <Tooltip title={'Delete'}>
      <DeleteOutlined className='mx-2 font-bold text-red-900'/>
      </Tooltip>
      
  </Popconfirm>

      </span>
    })
  }
 }
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
          {/* {data.length > 0 &&
           data.map((item)=>(
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
                          Ordered Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 w-1/4 font-bold"
                        >
                          Received Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 w-1/4 font-bold"
                        >
                          SL No.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 w-1/4 font-bold"
                        >
                          Remarks
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
                         {item.quantity}

                        </th>

                        <td className="px-6 py-4 w-1/4">
                          {item.rc_qty}
                           
                        
                        </td>
                        <td className="px-6 py-4 w-1/4">
                          {item.sl}
                           
                        </td>
                        <td className="px-6 py-4 w-1/4">
                         {item.remarks}
                           
                        </td>
                      </tr>
                    </tbody>
                  </table>
          )
                  )
                  
                  
                  }
         */}
          <Timeline
          className='my-2'
    mode="right"
    items={timeLineItems}
  />
        
        </>}
      </Dialog>
  );
};

export default DialogBox;