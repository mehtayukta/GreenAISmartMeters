import React, { useState, useContext } from 'react';
import '../../styles/device.css';
import { AiFillHome } from 'react-icons/ai';
import { GrUserSettings } from 'react-icons/gr';
import { GoGraph } from 'react-icons/go';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { RiLeafFill } from 'react-icons/ri';
import { GlobalContext } from '../pages/GlobalContext';

export const SideBar = () => {
  const { globalVariable, setGlobalVariable, globalVariable_2, setGlobalVariable_2 } = useContext(GlobalContext);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (destination) => {
    setGlobalVariable(destination);
    setSelectedItem(destination);
  };

  return (
    <div className='sidebar'>
      <div>
        <h3 style={{ fontSize: '20px', color: "white" }}> <RiLeafFill style={{ fontSize: '24px', color: "green" }} />Green Energy Cloud </h3>
      </div>
      <br />
      <div>
        <Link
          to="/home"
          style={{ fontSize: '20px', color: "rgb(117, 117, 117)" }}
          className={selectedItem === "/home" ? "sidebar-item selected" : "sidebar-item"}
          onClick={() => handleClick("/home")}
        >
          <AiFillHome style={{ fontSize: '20px', color: "rgb(117, 117, 117)" }} /> Home
        </Link>
      </div>
      <br />
      <div>
        <Link
          to="/device-mgmt"
          style={{ fontSize: '20px', color: "rgb(117, 117, 117)" }}
          className={selectedItem === "/device-mgmt" ? "sidebar-item selected" : "sidebar-item"}
          onClick={() => handleClick("/device-mgmt")}
        >
          <GoGraph style={{ fontSize: '20px', color: "rgb(117, 117, 117)" }} /> Device Management
        </Link>
      </div>
      <br />
      <div>
        <Link
          to="/monitor-tracking-options"
          style={{ fontSize: '20px', color: "rgb(117, 117, 117)" }}
          className={selectedItem === "/monitor-tracking-options" ? "sidebar-item selected" : "sidebar-item"}
          onClick={() => handleClick("/monitor-tracking-options")}
        >
          <GrUserSettings style={{ fontSize: '20px', color: "rgb(117, 117, 117)" }} /> Monitoring-Tracking
        </Link>
      </div>
      <div> <br />
        <Link to="/" style={{ fontSize: '20px', color: "rgb(117, 117, 117)" }}> <FaSignOutAlt style={{ fontSize: 'rgb(117, 117, 117)' }} /> Logout </Link>
      </div>
    </div>
  );
};

export const Admin = () => {
  return (
    <div style={{ display: 'flex' }}></div>
  );
};

