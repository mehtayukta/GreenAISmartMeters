import React, { useState } from 'react';
import '../../styles/Buttons.css';
import { MonitorTrackingElectric } from './MonitorTrackingElectric';
import { MonitorTrackingWater } from './MonitorTrackingWater';

export const MonitorMeter = () => {
  const [meter, setMeter] = useState('');

  return (
    <div className="table-wrapper">
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className={`curved-corners selection-button EMeter ${meter === 'electric' ? 'selected' : 'light-grey'}`}
          onClick={() => setMeter('electric')}
        >
          Electric
        </button>
        <button
          className={`curved-corners selection-button WMeter ${meter === 'water' ? 'selected' : 'light-grey'}`}
          onClick={() => setMeter('water')}
        >
          Water
        </button>
      </div>
      {meter === 'electric' && <MonitorTrackingElectric />}
      {meter === 'water' && <MonitorTrackingWater />}
    </div>
  );
};
