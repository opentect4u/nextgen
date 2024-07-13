import React, { useEffect, useState } from "react";
import IMG from "../Assets/Images/Logo.png";
import IMGINV from "../Assets/Images/inverted.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DialogBox from "./DialogBox";
import { routePaths } from "../Assets/Data/Routes";
import { Button, Dropdown, Space } from "antd";
function Header() {
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = React.useState(false);
  const location = useLocation();
  const paths = location.pathname.split("/");
  const [flag, setFlag] = useState();
  const colors = ["#C2EFB3", "#FAA916"];
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const openProfile = Boolean(anchorElProfile);
  const [theme, setTheme] = useState(0);
  // let theme='#C2EFB3'
  const handleClickProfile = (event) => {
    console.log(event);
    setAnchorElProfile(event.currentTarget);
  };
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  useEffect(()=>{
    console.log(localStorage.getItem('first_login'))
    // axios.post
    if(localStorage.getItem('first_login')=='Y'){
      handleCloseProfile("",3)
    }
  },[])
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st Notification
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd Notification
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd Notification
        </a>
      ),
    },
  ];
  const itemView = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st Notification
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd Notification
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd Notification
        </a>
      ),
    },
  ];
  const itemProfile = [
    {
      key: "1",
      label: (
        <a
          className="text-green-900 hover:text-green-900"
          onClick={() => handleCloseProfile("", 2)}
        >
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          className="text-green-900 hover:text-green-900"
          onClick={() => handleCloseProfile("/", 1)}
        >
          Sign Out
        </a>
      ),
    },
  ];

  const handleCloseProfile = (routeTo, flag) => {
    setAnchorElProfile(null);
    if (flag) {
      setFlag(flag);
      setVisible(true);
    }
  };
  const [anchorElNotif, setAnchorElNotif] = React.useState(null);
  const openNotif = Boolean(anchorElNotif);
  const handleClickNotif = (event) => {
    setAnchorElNotif(event.currentTarget);
  };
  const handleCloseNotif = (flag) => {
    setAnchorElNotif(null);
  };
  var col = "#C2EFB3";
  return (
    <div className="sticky top-0 z-10 ">
      {/* <nav className={localStorage.getItem('col')!=0 && localStorage.getItem('col')?`bg-color-theme-${localStorage.getItem('col')} border-gray-200 px-5 pb-2 dark:bg-gray-800`:`bg-gray-300 border-gray-200 px-5 pb-2 dark:bg-gray-800`}> */}
      <nav className={`bg-gray-700 border-gray-200 px-5 pb-2 dark:bg-gray-800`}>
        <div className="flex flex-wrap justify-between items-center mx-auto min-w-screen-xl p-4">
          <Link
            to={routePaths.HOME}
            className="flex items-center space-x-3"
          >
            <img
              src={!dark ? IMG : IMGINV}
              className="sm:h-14 h-9"
              alt="Flowbite Logo"
            />
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse -mr-3">
           
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <span className="relative inline-flex items-center">
                <NotificationsActiveIcon className="text-green-500 dark:text-gray-400 cursor-pointer" />
              </span>
            </Dropdown>

            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#C05746] rounded-full dark:bg-gray-600 hover:shadow-lg transition duration-0 hover:duration-500 hover:scale-110 ">
              <span
                id="basic-button"
                aria-controls={openProfile ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
                onClick={handleClickProfile}
                className="font-medium text-gray-300  dark:text-gray-300 cursor-pointer"
              >
                PM
              </span>
              <Menu
                id="basic-menu"
                anchorEl={anchorElProfile}
                open={openProfile}
                onClose={() => handleCloseProfile("")}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  className="text-green-900 flex justify-evenly hover:text-green-900"
                  onClick={() => handleCloseProfile("", 0)}
                >
                  <div className="h-6 w-6 bg-gray-300 rounded-full" onClick={()=>{localStorage.setItem('col',0);window.location.reload()}}></div>
                  <div className="h-6 w-6 bg-color-theme-1 rounded-full"  onClick={()=>{localStorage.setItem('col',1);window.location.reload()}}></div>
                  {/* <div className="h-6 w-6 bg-color-theme-2 rounded-full"  onClick={()=>{localStorage.setItem('col',2);window.location.reload()}}></div>
                  <div className="h-6 w-6 bg-color-theme-3 rounded-full"  onClick={()=>{localStorage.setItem('col',3);window.location.reload()}}></div> */}
                  <div className="h-6 w-6 bg-color-theme-4 rounded-full"  onClick={()=>{localStorage.setItem('col',4);window.location.reload()}}></div>
                  <div className="h-6 w-6 bg-color-theme-5 rounded-full"  onClick={()=>{localStorage.setItem('col',5);window.location.reload()}}></div>
                  {/* <div className="h-6 w-6 bg-color-theme-6 rounded-full"  onClick={()=>{localStorage.setItem('col',6);window.location.reload()}}></div>
                  <div className="h-6 w-6 bg-color-theme-7 rounded-full"  onClick={()=>{localStorage.setItem('col',7);window.location.reload()}}></div> */}
                </MenuItem>
                <MenuItem
                  className="text-green-900 hover:text-green-900"
                  onClick={() => handleCloseProfile("", 2)}
                >
                  Profile
                </MenuItem>

                <MenuItem
                  className="text-green-900 hover:text-green-900"
                  onClick={() => handleCloseProfile("/", 1)}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
           
          </div>
        </div>
        {/* <nav className="bg-white rounded-full dark:bg-[#001529] px-5 shadow-lg  hidden sm:block">
          <Menus theme={dark ? "dark" : "light"} mode={"horizontal"} />
          {!(paths.length == 2 && paths[1] == "home") && <Backbtn/>}
        </nav> */}
      </nav>
      <DialogBox
        visible={visible}
        flag={flag}
        onPress={() => setVisible(false)}
      />
    </div>
  );
}

export default Header;
