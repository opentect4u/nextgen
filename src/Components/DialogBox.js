import React from 'react';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import ProfileInfo from './ProfileInfo';
import PasswordComp from './PasswordComp';
import { routePaths } from '../Assets/Data/Routes';
import '../Styles/styles.css'
const DialogBox = ({ visible, flag, onPress,onDelete }) => {
  const navigate = useNavigate();
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
      <Dialog  closable={flag!=3?true:false} header={<div className={flag!=1?'text-green-500  font-bold':'text-green-500  font-bold w-20'}>{flag!=2?'Warning!':'Information!'}</div>} visible={visible} maximizable style={{
         width: '50vw',
         background:'black'
         }} onHide={() => {if (!visible) return; onPress() }}>
         {flag==1 && 
             <p className="m-0">Do you want to logout?
             <div className='flex justify-center'>
             <button type="reset" onClick={onPress} className="inline-flex mr-3 bg-[#f37373] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-[#f37373] bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                No
             </button>
             <button type="submit" onClick={()=>{localStorage.clear();navigate(routePaths.LANDING)}}className="inline-flex bg-emerald-500 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
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
          <button type="reset" onClick={onPress} className="inline-flex mr-3 bg-[#f37373] items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white border border-[#f37373] bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             No
          </button>
          <button type="submit" onClick={onDelete} className="inline-flex bg-emerald-500 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
             Yes
          </button>
          </div>
          </p>
        }
      </Dialog>
  );
};

export default DialogBox;