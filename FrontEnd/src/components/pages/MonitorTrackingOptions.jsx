import React from 'react';
import '../../styles/Buttons.css';
import { MonitorMeter } from './MonitorMeter';
import { MonitorIOT } from './MonitorIOT';
import {MonitorSolar} from './MonitorSolar';
import { useLocation } from 'react-router-dom';
import { useState, useEffect,useContext } from 'react';
import { GlobalContext } from './GlobalContext';


export const MonitorTrackingOptions = () => {
  const [meter, setMeter] = useState('');

  const { globalVariable, setGlobalVariable, globalVariable_2, setGlobalVariable_2 } = useContext(GlobalContext);

  console.log("This is selected Page",globalVariable_2)

  useEffect(() => {
    if (globalVariable_2) {
      // Set the meter state based on the selectedPage
      setMeter(globalVariable_2);
    }
  }, [globalVariable_2]);

  console.log(globalVariable_2);



  return (
  
    <div className="table-wrapper">
      <br />
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className={`light-grey curved-corners selection-button ${meter === 'iot' ? 'selected' : ''}`}
          onClick={(e) => setMeter('iot')}
        >
          IOT
        </button>
        <button
          className={`light-grey curved-corners selection-button ${meter === 'meter' ? 'selected' : ''}`}
          onClick={(e) => setMeter('meter')}
        >
          Meter
        </button>
      </div> */}
      {meter === 'meter' && <MonitorMeter />}
      {meter === 'iot' && <MonitorIOT />}
      {meter === 'solar' && <MonitorSolar/>}
    </div>
  );
};
