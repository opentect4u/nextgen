import React from 'react';
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
const DialogBox = ({ visible, flag, onPress,onDelete,data }) => {
  const navigate = useNavigate();
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
      <Dialog  closable={flag!=3?true:false} header={<div className={flag!=1?'text-green-900  font-bold':'text-green-900  font-bold w-20'}>{flag!=2 && flag!=5  && flag!=6 && flag!=7 && flag!=8 && flag!=9?'Warning!':'Information'}</div>} visible={visible} maximizable style={{
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
      </Dialog>
  );
};

export default DialogBox;