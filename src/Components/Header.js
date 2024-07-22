import React, { useEffect, useState } from "react";
import IMG from "../Assets/Images/Logo.png";
import IMGINV from "../Assets/Images/inverted.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DialogBox from "./DialogBox";
import { routePaths } from "../Assets/Data/Routes";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Typography from '@mui/material/Typography';
import Cloud from '@mui/icons-material/Cloud';
import { Dropdown } from "antd";
import { Avatar, Button } from 'antd';
import '../Styles/styles.css'
import { Badge } from 'antd';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = React.useState(false);
  const location = useLocation();
  const paths = location.pathname.split("/");
  const [flag, setFlag] = useState();
  const colors = ["#C2EFB3", "#FAA916"];
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const openProfile = Boolean(anchorElProfile);
  const [theme, setTheme] = useState(0);
  const [anchorElnoti, setAnchorElnoti] = React.useState(null);
  const openNoti = Boolean(anchorElnoti);

  // let theme='#C2EFB3'
  const handleClickProfile = (event) => {
    console.log(event);
    setAnchorElProfile(event.currentTarget);
  };
  const handleClickNotification = (event) => {
    console.log(event)
    setAnchorElnoti(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorElnoti(null);
  };
  const handleViewAll = () => {
    handleClose();
    navigate(routePaths.NOTIFICATIONS);
  };

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  useEffect(() => {
    console.log(paths)
    console.log(localStorage.getItem('first_login'))
    // axios.post
    if (localStorage.getItem('first_login') == 'Y') {
      handleCloseProfile("", 3)
    }
  }, [])
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
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          4th Notification
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
        <div
          className="text-green-900 hover:text-green-900"
        // onClick={() => handleCloseProfile("", 2)}
        >
          Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-green-900 hover:text-green-900"
        // onClick={() => handleCloseProfile("/", 1)}
        >
          Sign Out
        </div>
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
  var col = "#C2EFB3";
  return (
    <div className="sticky top-0 z-10">

      <nav className={`bg-gray-200 px-5 pb-2 dark:bg-gray-800`}>

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
          <div className="flex items-center space-x-6 rtl:space-x-reverse mr-4">
            {/* {paths.length!=2 && <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1, y:0}} transition={{type:'spring', delay:0.2, stiffness:500}} className="rounded-l-full rounded-r-full bg-gray-700  text-gray-300 shadow-xl h-10 w-auto p-3 justify-center item-center border-2 text-sm border-green-500">Hello, {localStorage.getItem('user_name')}</motion.div>} */}
            {/* <Dropdown menu={{ items }} placement="bottomLeft" arrow> */}
            <span className="relative inline-flex items-center">
              <Badge count={5} color="orange" >
                <NotificationsActiveIcon className="text-emerald-800 dark:text-gray-400 cursor-pointer" onClick={handleClickNotification} />
              </Badge>
            </span>
            {/* </Dropdown> */}
            <Menu 
            sx={{
              '& .MuiPaper-root': {
                width: '320px', // Adjust the width as needed
                maxWidth: '100%',
              },
            }}
              anchorEl={anchorElnoti}
              open={openNoti}
              onClose={handleClose}
            >
              <MenuList>

                <MenuItem>
                  <CircleNotificationsIcon />
                  <ListItemText className="px-1 text-green-900"> Notification</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Notification 1</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    {/* ⌘X */}
                    07 May 2024
                  </Typography>
                </MenuItem>
                <MenuItem>
                  {/* <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon> */}
                  <ListItemText>Notification 2</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    {/* ⌘C */}
                    05 May 2024
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Notification 3</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    02 May 2024
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleViewAll}>
                  <ListItemText className="text-green-900">View All</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
            <Avatar className="cursor-pointer" onClick={handleClickProfile} style={{ backgroundColor: '#014737', verticalAlign: 'middle' }} size="large">
              PM
            </Avatar>

            {/* <div className="relative inline-flex border-2 border-emerald-800 items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full dark:bg-gray-600 hover:shadow-lg transition duration-0 hover:duration-500 hover:scale-110 "> */}
            {/* <span
                id="basic-button"
                aria-controls={openProfile ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
                onClick={handleClickProfile}
                className="font-medium text-emerald-800  dark:text-gray-300 cursor-pointer"
              >
                PM
              </span> */}
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
            {/* </div> */}

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
