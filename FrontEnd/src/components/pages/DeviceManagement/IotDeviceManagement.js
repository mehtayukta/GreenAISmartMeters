import React from 'react'
import '../../../styles/Buttons.css'
import { useState } from 'react'
import { FanDeviceManagement } from './FanDeviceManagement'
import { LightDeviceManagement } from './LightDeviceManagement'

export const IotButtonOptions = () => {
  const [iot, setiot] = useState('');
  return (

    <div className="table-wrapper">
      <br></br>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <button className='light-grey curved-corners selection-button Light' onClick={(e) => setiot('light')}>
          Light
        </button>
        <button className='light-grey curved-corners selection-button Fan' onClick={(e) => setiot('fan')}>
          Fan
        </button>
      </div>
      {iot === 'fan' && <FanDeviceManagement/>}
      {iot === 'light' && <LightDeviceManagement/>}
    </div>
  )
}
