import React from 'react'
import '../../../styles/Buttons.css'
import { useState,useEffect } from 'react'
import { SolarDeviceManagement } from './SolarDeviceManagement'

export const SolarButtonOption = () => {
  // const [solar, setSolar] = useState('');
  const [solar, setSolar] = useState(null);

  useEffect(() => {
    // This code will run when the component mounts
    setSolar('solar');
  }, []); // Empty dependency array means this effect runs only once after initial render

  console.log("Solar is generated")
  return (
    
    <div className="table-wrapper">
      <br></br>
      {/* <div style={{ display: 'flex', justifyContent: "center", width: "auto" }}>
        <button className='light-grey curved-corners selection-button Light' style={{width: "auto" }} onClick={(e) => setSolar('solar')}>
         Solar Device Details
        </button>
      </div> */}
      {solar === 'solar' && <SolarDeviceManagement/>}
    </div>
  )
}