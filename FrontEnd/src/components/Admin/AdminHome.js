import React from 'react'
import Map from './Map'
import SjsuMap from '../../assets/images/SjsuMap.png'
import '../../styles/device.css'

export const AdminHome = () => {

   return (
    <div>
      <div className='sjsu'>
      <img src = {SjsuMap} width="800px" height="600px"  alt="SJSU"></img> <br/>
      </div> 
      <div>     
      <h3>Active IoT Stations</h3><br/>     
      <ul style={{position:"relative  ", width: "64%", left: "22em"}}>
        <li> <span>LIB</span></li>
        <li><span>SCI</span> </li>
        <li> <span>ENG</span></li>
        <li> <span>SPT</span></li>
        <li> <span>PKG</span></li>
        <li> <span>SVC</span></li>
        </ul> 
      <Map/>
      </div>
    </div>
  )
}
