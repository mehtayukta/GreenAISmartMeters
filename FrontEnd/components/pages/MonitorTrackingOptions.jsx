import React from 'react';
import '../../styles/Buttons.css';
import { useState } from 'react';
import { MonitorMeter } from './MonitorMeter';
import { MonitorIOT } from './MonitorIOT';

export const MonitorTrackingOptions = () => {
  const [meter, setMeter] = useState('');

  return (
    <div className="table-wrapper">
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>
      {meter === 'meter' && <MonitorMeter />}
      {meter === 'iot' && <MonitorIOT />}
    </div>
  );
};
