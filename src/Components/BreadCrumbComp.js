import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { pathMap } from "../Assets/Data/Paths";
function BreadCrumbComp() {
    let pathnames = [];
    const location = useLocation();
    const paths = location.pathname.split("/");
    paths.forEach(
      (e) => isNaN(e) && pathnames.push({ title: pathMap[e],label:e })
    );
  
  return <Breadcrumb className="ml-6 dark:text-gray-400" separator=">" items={pathnames} />
}

export default BreadCrumbComp;
