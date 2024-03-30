import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import {FaCanadianMapleLeaf} from 'react-icons/fa';
import Avatar from 'react-avatar';
import { SidebarData } from "./SidebarData";
//import { SideMenuBar } from "./SideMenuBar";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa"; 
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './pages/GlobalContext';
import SideMenuBar from './SideMenuBar'




//import '../App.css';
import "../styles/Navbar.css";

export const Navbar = () => {

  const [meterColor, setMeterColor] = useState(0);
  const [solarColor, setSolarColor] = useState(0);
  const [storageColor, setStorageColor] = useState(0);
  const [cameraColor, setCameraColor] = useState(0);
  const [iotColor, setIotColor] = useState(0);
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  //const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const { globalVariable, setGlobalVariable, globalVariable_2, setGlobalVariable_2 } = useContext(GlobalContext);

  console.log("This is selected Page",globalVariable_2)
  console.log("This is selected Page",globalVariable)

  return (
    <>
     <div style={{ height: '5%', color: '#757575', backgroundColor: '#363740', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 30, paddingRight: 30, width: '100%' }}>
     
      {/* ... (your top navigation bar code) */}
      <div style={{ width: '70%', flexDirection: 'row', display: 'flex' }}>
            
            <div
              onClick={() => {
                setSolarColor(1);
                setCameraColor(0);
                setIotColor(0);
                setStorageColor(0);
                setMeterColor(0);
                setGlobalVariable_2('solar')
                navigate(setGlobalVariable, { state: { selectedPage: 'solar' } });
              }}
              style={{ width: '100%',  color: '#757575', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 30, marginRight: 20, fontFamily: '-moz-initial', fontWeight: 'bold', borderBottom: solarColor ? '1px solid white' : null, color: solarColor ? '1px solid white' : 'gray' }}
              className={`navbar-link ${solarColor ? "selectedItemStyle" : ""}`}
              >
              <Link  to="/solar" style = {{ color: '#757575'}}>Solar</Link>
            </div>
            <div
              onClick={() => {
                setSolarColor(0);
                setCameraColor(0);
                setIotColor(0);
                setStorageColor(0);
                setMeterColor(1);
                setGlobalVariable_2('meter')
                navigate(globalVariable);
              }}
              style={{ width: '100%',  color: '#757575', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 30, marginRight: 20, fontFamily: '-moz-initial', fontWeight: 'bold', borderBottom: solarColor ? '1px solid white' : null, color: solarColor ? '1px solid white' : 'gray' }}
              className={`navbar-link ${meterColor ? "selectedItemStyle" : ""}`}
              >
              <Link  style = {{ color: '#757575'}} to={globalVariable}>Meter</Link>
            </div>

            <div
              onClick={() => {
                setSolarColor(0);
                setCameraColor(0);
                setIotColor(1);
                setStorageColor(0);
                setMeterColor(0);
                setGlobalVariable_2('iot')

                navigate(setGlobalVariable, { state: { selectedPage: 'iot' } });

              }}
              style={{ width: '100%', color: '#757575', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 30, marginRight: 20, fontFamily: '-moz-initial', fontWeight: 'bold', borderBottom: solarColor ? '1px solid white' : null, color: solarColor ? '1px solid white' : 'gray' }}

              className={`navbar-link ${iotColor ? "selectedItemStyle" : ""}`}

              >
              <Link style = {{ color: '#757575'}} to={setGlobalVariable}>IoT</Link>

            </div>


          </div>
          <div style={{ width: '40%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
            <input style={{ width: '40%', borderRadius: 3, height: '30%', fontSize: 14 }} placeholder={"Search"} type="text" />
            <FaBell size={15} color={'gray'} style={{ marginLeft: 10 }} />
            <p style={{ marginRight: 10, borderLeft: '1px solid #BCBDC3', marginLeft: 10, paddingLeft: 10, fontFamily: '-moz-initial' }}>Kevin</p>
            <Avatar round={true} size={25} name="Foo Bar" />
          </div>
      
    </div> 
   
   
     <div>
      <div>
    </div>
    </div>

              </>  
  )
}

// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBell } from 'react-icons/fa';
// import Avatar from 'react-avatar';
// import { useNavigate } from 'react-router-dom';
// import { GlobalContext } from './pages/GlobalContext';
// import "../styles/Navbar.css";

// export const Navbar = () => {
//   const [meterColor, setMeterColor] = useState(false);
//   const [solarColor, setSolarColor] = useState(false);
//   const [storageColor, setStorageColor] = useState(false);
//   const [cameraColor, setCameraColor] = useState(false);
//   const [iotColor, setIotColor] = useState(false);
//   const navigate = useNavigate();
//   const { globalVariable, setGlobalVariable, globalVariable_2, setGlobalVariable_2 } = useContext(GlobalContext);

//   return (
//     <>
//       <div className="navbar-container">
//         <div className="navbar-links">
//           <div
//             onClick={() => {
//               setSolarColor(true);
//               setCameraColor(false);
//               setIotColor(false);
//               setStorageColor(false);
//               setMeterColor(false);
//             }}
//             className={`navbar-link ${solarColor ? "selectedItemStyle" : ""}`}
//           >
//             <Link to="/solar">Solar</Link>
//           </div>
//           <div
//             onClick={() => {
//               setSolarColor(false);
//               setCameraColor(false);
//               setIotColor(false);
//               setStorageColor(false);
//               setMeterColor(true);
//               setGlobalVariable_2('meter')
//               navigate(globalVariable);
//             }}
//             className={`navbar-link ${meterColor ? "selectedItemStyle" : ""}`}
//           >
//             <Link to={globalVariable}>Meter</Link>
//           </div>
//           <div
//             onClick={() => {
//               setSolarColor(false);
//               setCameraColor(false);
//               setIotColor(true);
//               setStorageColor(false);
//               setMeterColor(false);
//               setGlobalVariable_2('iot')
//               navigate(setGlobalVariable, { state: { selectedPage: 'iot' } });
//             }}
//             className={`navbar-link ${iotColor ? "selectedItemStyle" : ""}`}
//           >
//             <Link to={setGlobalVariable}>IoT</Link>
//           </div>
//         </div>
//         <div className="navbar-search">
//           <input className="search-input" placeholder="Search" type="text" />
//           <FaBell className="bell-icon" size={15} color={'gray'} />
//           <p className="user-name">Kevin</p>
//           <Avatar round={true} size={25} name="Foo Bar" />
//         </div>
//       </div>
//     </>
//   )
// }

