import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import BreadCrumbComp from "../../Components/BreadCrumbComp";
import { ScrollTop } from "primereact/scrolltop";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../Components/Error";

function Home() {
  const location = useLocation();
  const paths = location.pathname.split("/");
  const [theme,setTheme] = useState(localStorage.getItem('col'))
  console.log(paths);
  useState(()=>{
    setTheme(localStorage.getItem('col'))

  },[localStorage.getItem('col')])
  
  return (
    <div>
      <Header />
      <Sidebar />
      <div 
        // className={theme>0?`bg-color-theme-${theme} px-6 py-3 w-auto dark:bg-gray-800 min-h-screen`:`px-6 py-3 w-auto bg-gray-300 dark:bg-gray-800 min-h-screen `}>
        className='px-6  w-auto sm:ml-60 bg-emerald-50 dark:bg-gray-800 min-h-screen '>
        
        <div
          className={
             "p-4 h-auto rounded-3xl bg-transparent dark:border-gray-700 dark:bg-transparent dark:text-white min-w-screen-xl"
          }
        >
          {!(paths.length == 2 && paths[1] == "home") && <BreadCrumbComp/>}
          <ErrorBoundary
            FallbackComponent={Error}
            onError={(error) => {
              console.error(error);
            }}
          >
            <ScrollTop style={{ backgroundColor: "#C05746" }} />
          </ErrorBoundary>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
