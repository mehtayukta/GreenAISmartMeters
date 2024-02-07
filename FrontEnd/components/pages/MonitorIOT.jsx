import React from 'react'
import '../../styles/Buttons.css'
import { useState } from 'react'
import { MonitorTrackingElectric } from './MonitorTrackingElectric'
import { MonitorTrackingWater } from './MonitorTrackingWater'
import { MonitorFan } from './MonitorFan'
import { MonitorLight } from './MonitorLight'

export const MonitorIOT = () => {
    const [meter, setMeter] = useState('');

    return (

        <div className="table-wrapper">
            <br></br>
            <div style={{ display: 'flex', justifyContent: "center" }}>
                <button className='light-grey curved-corners selection-button Light' onClick={(e) => setMeter('light')}>
                    Light
                </button>
                <button className='light-grey curved-corners selection-button Fan' onClick={(e) => setMeter('fan')} >
                    Fan
                </button>
            </div>
            {meter === 'fan' && <MonitorFan />}
            {meter === 'light' && <MonitorLight />}

        </div>
    )
}