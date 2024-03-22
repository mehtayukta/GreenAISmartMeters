import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom'
import { LandingPage } from './components/pages/LandingPage'
import { LoginPage } from './components/pages/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage'
import { ForgetPasswordPage } from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import { Navbar } from './components/Navbar'
import { DeviceManagement } from './components/pages/DeviceManagement/DeviceManagement'
import { ControlConfiguration } from './components/pages/ControlConfiguration'
import { MonitorTracking } from './components/pages/MonitorTrackingElectric'
import { IoT } from './components/pages/IoT'
import { Meter } from './components/pages/Meter'
import { Admin } from './components/Admin/Admin'
import { BillingInfo } from './components/pages/BillingInfo'
import { BillPayment } from './components/pages/BillPayment'
import { AdminHome } from './components/Admin/AdminHome';
import { Adminmetrics } from './components/Admin/Adminmetrics.js';
import {SideBar} from './components/Admin/Admin.js'
import UserTable from './components/Admin/UserTable';
import { MonitorTrackingOptions} from './components/pages/MonitorTrackingOptions'

import TestComponent from './components/pages/test.js'
import { GlobalProvider } from './components/pages/GlobalContext';



function App() {
  
    return (
        <>
         <GlobalProvider>
            <div>
                {/* {currentPath.length>0  && <Navbar />} */}
            <Routes>
                    <Route exact path="/" element={<LandingPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/forget-password" element={<ForgetPasswordPage/>} />
                    <Route path="/home" element={<><Navbar/><HomePage/></>}/>
                    <Route path="/device-mgmt" element={<><Navbar/><DeviceManagement/> </> } />
                    <Route path="/control-config" element={<><Navbar/><ControlConfiguration/> </> } />
                    <Route path="/monitor-tracking-options" element={<><Navbar/><MonitorTrackingOptions/> </> } />
                    <Route path="/iot" element={<><Navbar/><IoT/> </> }/>
                    <Route path="/meter" element={<><Navbar/><Meter/></>  } />
                    <Route path= "/admin" element={<><SideBar/><Admin/> </>} />
                    <Route path="/billing-info" element={<><Navbar/><BillingInfo/></>} /> 
                    <Route path="/bill-payment" element={<><Navbar/><BillPayment/></>} />
                    <Route path="/addclients" element={<><SideBar/><UserTable/> </>}/>
                    <Route path="/adminmetrics" element={<><SideBar/><Adminmetrics/></>}/>                    
                    <Route path="/adminhome" element={<><SideBar/><AdminHome/></>}/>
                    {/* <Route path="/PageProvider" element={<></>}/> */}
                

                </Routes>
                {/* <Routes> */}
                    {/* <AppRoute exact path="/" component={<LandingPage />} />
                    <AppRoute path="/login" component={<LoginPage />} />
                    <AppRoute path="/register" component={<RegisterPage />} />
                    <AppRoute path="/forget-password" component={<ForgetPasswordPage />} />
                    <AppRoute path="/home" layout={Navbar} component={<HomePage />} />
                    <AppRoute path="/device-mgmt" layout={Navbar} component={<DeviceManagement />} />
                    <AppRoute path="/control-config" layout={Navbar} component={<ControlConfiguration />} />
                    <AppRoute path="/monitor-tracking" layout={Navbar} component={<MonitorTracking />} /> */}
                    {/* </Routes> */}
            </div>
           
    </GlobalProvider>
        </>
    )
}

export default App;

// const Footer = () => {
//     return (
//         <p className="text-center" style={ FooterStyle }>Footer</p>
//     )
// }

// const FooterStyle = {
//     background: "#222",
//     fontSize: ".8rem",
//     color: "#fff",
//     position: "absolute",
//     bottom: 0,
//     padding: "1rem",
//     margin: 0,
//     width: "100%",
//     opacity: ".5"
// }