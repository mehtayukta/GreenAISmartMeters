
// import React from 'react'
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'


// import '../../App.css'
// import '../../styles/LandingPage.css'
// import BackgroundImage from '../../assets/images/bg.png'


// export const LandingPage = () => {
//     const navigate = useNavigate();

//     const handleLoginpage = (event) => {
//         navigate("/home");
//       };
//       return (
//         <div style={{textAlign:'center'}}>
//         <header style={ HeaderStyle }>
//             <h1 className="main-title text-center">login / register page</h1>
//             <p className="main-para text-center">join us now and don't waste time</p>
//             <div className="buttons text-center">
//                 <Link to="/home">
//                     <button className="primary-button">log in</button>
//                 </Link>
//                 <Link to="/register">
//                     <button className="primary-button" id="reg_btn"><span>register </span></button>
//                 </Link>
//             </div>
//         </header>
//         </div>
//     )

    
// }

// const HeaderStyle = {
//     width: "100%",
//     height: "150vh",
//     background: `url(${BackgroundImage})`,
//     backgroundPosition: "center",
//     // backgroundRepeat: "no-repeat",
//     backgroundSize: "cover"
// }

import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../assets/images/bg.png';

export const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <header style={HeaderStyle}>
        <h1 className="main-title text-center">Data-driven Green AI Models</h1>
        <p className="main-para text-center">Login/Register now!</p>
        <div className="buttons text-center">
          <Link to="/home">
            <button className="primary-button">log in</button>
          </Link>
          <Link to="/register">
            <button className="primary-button" id="reg_btn"><span>register </span></button>
          </Link>
        </div>
      </header>
    </div>
  );
};

const HeaderStyle = {
  width: "100%",
  height: "150vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover"
};