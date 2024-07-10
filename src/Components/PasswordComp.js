import React from 'react'
import { routePaths } from '../Assets/Data/Routes';
import { useNavigate } from 'react-router-dom';

const PasswordComp = ({mode}) => {
  const navigate=useNavigate()
  return (
      

    <div className="max-w-sm mx-auto" >
      
    
      <div className="mb-5 relative">
        <label for="oldPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old password</label>
        <input id="oldPass" name='oldPass'className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
      </div>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
        <input  id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
              
      </div>
      <div className="mb-5">
        <label for="rPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input id="rPass" name="rPass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input id="remember"   type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
        <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
      </div>
      <div className='flex justify-between'>
     {mode==3 && <button type="submit" onClick={()=>{localStorage.clear();navigate(routePaths.LANDING)}} className="text-white bg-green-900 hover:bg-
      green-800 focus:ring-4 mr-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-blue-400">
        Sign Out
      </button>}
      <button type="submit"  className="text-white bg-green-900 hover:bg-
      green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-blue-400">
        submit
      </button>

      </div>
     
    </div>
    
  )
}

export default PasswordComp