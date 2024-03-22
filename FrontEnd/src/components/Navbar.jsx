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
//import { FaSun,FaBell,FaCloud,FaCamera,FaBatteryFull,FaHouseUser,FaDashcube,FaParagraph,FaCalendar,FaFacebookMessenger,FaEnvelope,FAGear, FaSquare, FaAngular,FaCanadianMapleLeaf } from 'react-icons/fa';
import SideMenuBar from './SideMenuBar'


//import { useDispatch } from 'react-redux';


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
    {/* <IconContext.Provider value={{ color: '#FFF' }}>
          <nav className={`nav-menu ${sidebar ? 'active' : ''}`}>

       
          <div style={{color: 'white'}}>
            <ul className="nav-menu-items">
               <li className="navbar-toggle">
                <Link to="#" className="menu-bars" onClick={showSidebar}>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>   
              {SidebarData.map((item, index) => (
            <div className= "elememt_class" key={index} onClick={() => item.handleClick(setGlobalVariable)}>
              <Link to={item.path}>{item.icon}</Link>
              <span>{item.title}</span>
            </div>
           ))}
            </ul>
         </div>
          </nav>
          
        </IconContext.Provider>   */}
     <div style={{ height: '10%', color: '#757575', backgroundColor: '#363740', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 30, paddingRight: 30, width: '100%' }}>
     
      {/* ... (your top navigation bar code) */}
      <div style={{ width: '70%', flexDirection: 'row', display: 'flex' }}>
            
            <div
              onClick={() => {
                setSolarColor(1);
                setCameraColor(0);
                setIotColor(0);
                setStorageColor(0);
                setMeterColor(0);
              }}
              style={{ width: '100%',  color: '#757575', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 30, marginRight: 20, fontFamily: '-moz-initial', fontWeight: 'bold', borderBottom: solarColor ? '1px solid white' : null, color: solarColor ? '1px solid white' : 'gray' }}>
              <Link  style = {{ color: '#757575'}}to="/solar">Solar</Link>
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
              style={{ width: '100%',  color: '#757575', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 30, marginRight: 20, fontFamily: '-moz-initial', fontWeight: 'bold', borderBottom: solarColor ? '1px solid white' : null, color: solarColor ? '1px solid white' : 'gray' }}>
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
              style={{ width: '100%', color: '#757575', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 30, marginRight: 20, fontFamily: '-moz-initial', fontWeight: 'bold', borderBottom: solarColor ? '1px solid white' : null, color: solarColor ? '1px solid white' : 'gray' }}>
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
   
    {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
     */}
     <div>
      <div>
         {/* <IconContext.Provider value={{ color: '#FFF' }}>
      <nav className={`nav-menu ${sidebar ? 'active' : ''}`}>
      <div style={{height:'10%',flexDirection:'row',display:'flex',justifyContent:'center',paddingTop:'10%'}}>
              <FaCanadianMapleLeaf color={"green"} size={40} style={{paddingTop:'5%'}} />
            <h5 className='greenAI_header'>Green Energy Cloud</h5>
          </div>
      </nav>
    </IconContext.Provider> */}
    </div>
    </div>


    <IconContext.Provider value={{ color: '#FFF' }}>
          <nav className={`nav-menu ${sidebar ? 'active' : ''}`}>

       
          <div style={{color: 'white'}}>
            <ul className="nav-menu-items">
               <li className="navbar-toggle">
                <Link to="#" className="menu-bars" onClick={showSidebar}>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>   
              {SidebarData.map((item, index) => (
            <div className= "elememt_class" key={index} onClick={() => item.handleClick(setGlobalVariable)}>
              <Link to={item.path}>{item.icon}</Link>
              <span>{item.title}</span>
            </div>
           ))}
            </ul>
         </div>
          </nav>
          
        </IconContext.Provider> 
              </>  
  )
}
