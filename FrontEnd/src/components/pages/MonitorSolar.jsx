import React, { useState,useEffect } from 'react';
import '../../styles/Buttons.css';
import { MonitorTrackSolar } from './MonitorTrackingSolar';

export const MonitorSolar = () => {
  const [solar, setSolar] = useState(null);
  useEffect(() => {
    // This code will run when the component mounts
    setSolar('solar');
  }, []);

  
console.log("In monitorSolar.jsx")

  return (
    <div className="table-wrapper">
            <br></br>
            {/* <div style={{ display: 'flex', justifyContent: "center" }}>
                <button className='light-grey curved-corners selection-button Light' style={{ width: 'auto' }} onClick={(e) => setSolar('solar')}>
                    Solar Montior and Track
                </button>
            </div> */}
            {solar === 'solar' && <MonitorTrackSolar />}
    </div>
  );
};
