import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { GlobalContext } from './pages/GlobalContext';


export const SidebarData = [
    {
      title: "Home",
      path: "/home",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
      handleClick: setGlobalVariable => setGlobalVariable("/home")
    },
    {
      title: "Device Management",
      path: "/device-mgmt",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
      handleClick: setGlobalVariable => setGlobalVariable("/device-mgmt")
    },
    {
      title: "Monitor and Tracking",
      path: "/monitor-tracking-options",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
      handleClick: setGlobalVariable => setGlobalVariable("/monitor-tracking-options")
    },
    {
      title: "Control & Configuration",
      path: "/control-config",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
      handleClick: setGlobalVariable => setGlobalVariable("/control-configt")
    },
    {
      title: "Billing-Information",
      path: "/billing-info",
      icon: <FaIcons.FaFileInvoiceDollar/>,
      cName: "nav-text",
      handleClick: setGlobalVariable => setGlobalVariable("/billing-info")
    },
  
    {
      title: "Logout",
      path: "/",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
      handleClick: setGlobalVariable => setGlobalVariable("/")
    },

  
  ];

// import React from 'react';
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import * as IoIcons from "react-icons/io";

// export const SidebarData = [
//     {
//       title: "Home",
//       path: "/home",
//       icon: <AiIcons.AiFillHome />,
//       cName: "nav-text"
//     },
//     {
//       title: "Device Management",
//       path: "/device-mgmt",
//       icon: <IoIcons.IoIosPaper />,
//       cName: "nav-text"
//     },
//     {
//       title: "Monitor and Tracking",
//       path: "/monitor-tracking-options",
//       icon: <FaIcons.FaCartPlus />,
//       cName: "nav-text"
//     },
//     {
//       title: "Control & Configuration",
//       path: "/control-config",
//       icon: <IoIcons.IoMdPeople />,
//       cName: "nav-text"
//     },
//     {
//       title: "Billing-Information",
//       path: "/billing-info",
//       icon: <FaIcons.FaFileInvoiceDollar/>,
//       cName: "nav-text"
//     },
  
//     {
//       title: "Logout",
//       path: "/",
//       icon: <IoIcons.IoMdPeople />,
//       cName: "nav-text"
//     }
//   ];
  
  