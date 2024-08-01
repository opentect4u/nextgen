import React from "react";
import { Breadcrumb } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { pathMap,routes } from "../Assets/Data/Paths";
import { Segmented } from "antd";

function BreadCrumbComp() {
    let pathnames = [];
    const navigate=useNavigate()
    const location = useLocation();
    const paths = location.pathname.split("/");
    console.log(paths[paths.length-1])
    paths.forEach(
      (e) => isNaN(e) && pathnames.push({ label: pathMap[e],value:e })
      // (e) => isNaN(e) && pathnames.push(pathMap[e])
    );
  
  return (
  
  <>
   {/* <Breadcrumb className="ml-1 dark:text-gray-400 my-2 -mt-5" separator=">" items={pathnames} /> */}

<div className="col-span-4 space-y-2 mb-8">
<Segmented
  itemActiveBg="#08453c"
  value={isNaN(paths[paths.length-1])?paths[paths.length-1]:paths[paths.length-2]}
  options={pathnames}
  onChange={(value) => {
    console.log(value); // string
    if(!value.includes('form') && !value.includes('Comp') )
    navigate(routes[value])
  }}
/>
</div>
  
  </>
 
)
}

export default BreadCrumbComp;
