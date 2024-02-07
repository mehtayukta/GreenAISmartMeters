import React from 'react'
import  '../../../styles/Buttons.css'
import { useState } from 'react'
import { MeterButtonOptions } from './MeterDeviceManagement'
import { IotButtonOptions } from './IotDeviceManagement'

export const DeviceManagement = () => {
  const [meter, setMeter] = useState('');
  return (

    <div className="table-wrapper">
      <br></br>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <button className='light-grey curved-corners selection-button' onClick={(e) => setMeter('iot')} >
          IOT
        </button>
        <button className='light-grey curved-corners selection-button' onClick={(e) => setMeter('meter')}>
          Meter
        </button>
      </div>
      {meter === 'meter' && <MeterButtonOptions />}
      {meter === 'iot' && <IotButtonOptions/>}

    </div>
  )
}
