import React from 'react'
import '../../../styles/Buttons.css'
import { useState } from 'react'
import { ElectricDeviceManagement } from './ElectricDeviceManagement'
import { WaterDeviceManagement } from './WaterDeviceManagement'

export const MeterButtonOptions = () => {
  const [meter, setMeter] = useState('');
  return (

    <div className="table-wrapper">
      <br></br>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <button className='light-grey curved-corners selection-button EMeter' onClick={(e) => setMeter('electric')}>
          Electric
        </button>
        <button className='light-grey curved-corners selection-button WMeter' onClick={(e) => setMeter('water')}>
          Water
        </button>
      </div>
      {meter === 'electric' && <ElectricDeviceManagement/>}
      {meter === 'water' && <WaterDeviceManagement/>}
    </div>
  )
}
