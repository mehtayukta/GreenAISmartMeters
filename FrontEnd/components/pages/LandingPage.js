import React from 'react'
import { useNavigate } from "react-router-dom";

import '../../App.css'
import '../../styles/LandingPage.css'
import BackgroundImage from '../../assets/images/landing-page.jpg'


export const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginpage = (event) => {
        navigate("/login");
      };

    return (
        <header classname="HeaderStyle">
            <div id='background'></div> {/*N change*/}
            <div id='title'>
                <h1> Green Energy Cloud </h1>
            </div>
            <div className="buttons text-center">
                <img src={BackgroundImage} alt="bg" width="90%" />
                    <button className="primary-button buttonStyle" onClick={handleLoginpage}>log in</button>
                {/* <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link> */}
            </div>
        </header>
    )
}