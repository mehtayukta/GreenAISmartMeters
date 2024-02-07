import React from 'react'
import '../../styles/Buttons.css'
import { useState } from 'react'
import ControlMeter from './ControlMeter'
import ControlIOT from './ControlIOT'


export const ControlConfiguration = () => {
  const [meter, setMeter] = useState('');
  return (
    
    <div className="table-wrapper">
      <br></br>
      <div style={{display:'flex', justifyContent: "center"}}>
      <button className='light-grey curved-corners selection-button' onClick={(e) => setMeter('iot')}>
        IOT
      </button>
      <button className='light-grey curved-corners selection-button' onClick={(e) => setMeter('meter')}>
        Meter
      </button>
      </div>
      {meter === 'meter'?<ControlMeter/>:<ControlIOT/>}
      
    </div>
  )
}
