import React from 'react'
import  '../../../styles/Buttons.css'
import { useState,useEffect,useContext } from 'react'
import { MeterButtonOptions } from './MeterDeviceManagement'
import { IotButtonOptions } from './IotDeviceManagement'
//import { useSelector } from 'react-redux';
//import { usePageContext } from '../../PageContext';
import { GlobalContext } from '../GlobalContext';


export const DeviceManagement = () => {
  const [meter, setMeter] = useState('');
  const { globalVariable, setGlobalVariable, globalVariable_2, setGlobalVariable_2 } = useContext(GlobalContext);

  console.log("This is selected Page",globalVariable)
  //console.log('Selected Page:', selectedPage);
  //console.log('Selected Sidebar Page:', selectedSidebarPage);


  // ... rest of your component 
  useEffect(() => {
    if (globalVariable_2) {
      // Set the meter state based on the selectedPage
      setMeter(globalVariable_2);
    }
  }, [globalVariable_2]);

  console.log(globalVariable_2);

  return (

    <div className="table-wrapper">
      <br></br>
      {/* <div style={{ display: 'flex', justifyContent: "center" }}>
        <button className='light-grey curved-corners selection-button' onClick={(e) => setMeter('iot')} >
          IOT
        </button>
        <button className='light-grey curved-corners selection-button' onClick={(e) => setMeter('meter')}>
          Meter
        </button>
      </div> */}
      {meter === 'meter' && <MeterButtonOptions />}
      {meter === 'iot' && <IotButtonOptions/>}

    </div>
  )
}
