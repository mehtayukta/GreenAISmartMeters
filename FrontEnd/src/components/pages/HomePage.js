import React, { useState, useEffect } from 'react';
import axios from "axios";

import Table from 'react-bootstrap/Table';
import { Chart } from "react-google-charts";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';




export default function HomePage() {
  const [meters, setMeters] = useState([]);
  const [workingCount, setWorkingCount] = useState(0);
  const [nonWorkingCount, setNonWorkingCount] = useState(0);
  const [meterData, setMeterData] = useState([]);
  const [solarData, setSolarData] = useState([]);
  const chartData = [['Date', ...new Set(meterData.map(item => item.LCLid))]];
  const [maxMeterEnergy, setMaxMeterEnergy] = useState(0);
const [maxSolarEnergy, setMaxSolarEnergy] = useState(0);
const romaniaCoordinates = [45.9432, 24.9668]; // Coordinates for Romania
const workingMeterCount = 100; // Example working meter count
  const solarMeterCount = 50; // Example solar meter count
  const [mapLoaded, setMapLoaded] = useState(false); // State variable to track map loading

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const groupedData = meterData.reduce((acc, item) => {
    acc[item.tstp] = acc[item.tstp] || {};
    acc[item.tstp][item.LCLid] = item.energy;
    return acc;
  }, {});
  
  // Iterate over grouped data to create rows for the chart
  Object.entries(groupedData).forEach(([tstp, energyByLCLid]) => {
    const row = [tstp];
    chartData[0].slice(1).forEach(LCLid => {
      row.push(energyByLCLid[LCLid] || null);
    });
    chartData.push(row);
  });
  

  useEffect(() => {
    fetchMeterDetails();    // Fetch meter details when component mounts

    last30_daysdata_meter();
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=&v=weekly`;
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);


    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const fetchMeterDetails = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/meter/getMeterdetails")
      if (!response.ok) {
        throw new Error('Failed to fetch meter details');
      }
      const data = await response.json();
      setMeters(data);

      // Count working and non-working meters
      const workingMeters = data.filter(meter => meter.workingStatus === 1);
      setWorkingCount(workingMeters.length);

      const nonWorkingMeters = data.filter(meter => meter.workingStatus === 0);
      setNonWorkingCount(nonWorkingMeters.length);
    } catch (error) {
      console.error('Error fetching meter details:', error);
    }
  };

  const fetchMeterDetailssolar = async () => { // right is fecthing meter details only later need to be migrated to solar
    try {
      const response = await fetch("http://localhost:4001/api/meter/getMeterdetails")
      if (!response.ok) {
        throw new Error('Failed to fetch meter details');
      }
      const data = await response.json();
      setMeters(data);

      // Count working and non-working meters
      const workingMeters = data.filter(meter => meter.workingStatus === 1);
      setWorkingCount(workingMeters.length);

      const nonWorkingMeters = data.filter(meter => meter.workingStatus === 0);
      setNonWorkingCount(nonWorkingMeters.length);
    } catch (error) {
      console.error('Error fetching meter details:', error);
    }
  };
 
  const [selectedMarker, setSelectedMarker] = useState(null);
  const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });


const last30_daysdata_meter = async () => {
    try {
        const response = await axios.post("api/last30daysdata");

        if (!response.data) {
            throw new Error('Failed to fetch data');
        }
        const data = response.data;
        console.log(data);

        // Separate meter and solar data
        const meter = data.filter(item => item.device === 'Meter');
        const solar = data.filter(item => item.device === 'Solar');

        // Find maximum energy value for meter data
        const maxMeterEnergy = meter.reduce((max, item) => Math.max(max, parseFloat(item.energy)), -Infinity);
        const maxMeterEnergy1 = parseFloat(maxMeterEnergy.toFixed(2));

        console.log('Maximum energy value for Meter data:', maxMeterEnergy);

        setMeterData(meter);
        setMaxMeterEnergy(maxMeterEnergy1);
        // setSolarData(solar);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


//

      
  return (
    <>
   
    
<div style={{ display: 'flex', alignItems: 'flex-start' }}>
  {/* Left side components */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft:'2%', marginTop:'5%', marginRight: '2%' }}>
    {/* Electric Meter */}
    <div style={{
      width: '300px',
      background: 'rgba(242, 242, 242, 1)',
      opacity: 1,
      borderRadius: '10px',
      overflow: 'hidden',
      padding: '20px',
      boxSizing: 'border-box',
      marginBottom: '20px',
    }}>
      <h3 style={{ backgroundColor: 'rgb(255 255 255)', color: '#757575', padding: '10px', margin: 0 }}>Electric Meter</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <td style={{ padding: '10px' }}><div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%' }}></div></td>
            <td style={{ padding: '10px' }}>Working Meters:</td>
            <td style={{ padding: '10px' }}>{workingCount}</td>
          </tr>
          <tr style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '10px' }}><div style={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%' }}></div></td>
            <td style={{ padding: '10px' }}>Non-Working Meters:</td>
            <td style={{ padding: '10px' }}>{nonWorkingCount}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Solar Meter */}
    <div style={{
      width: '300px',
      background: 'rgba(242, 242, 242, 1)',
      opacity: 1,
      borderRadius: '10px',
      overflow: 'hidden',
      padding: '20px',
      boxSizing: 'border-box',
      marginBottom: '20px',
    }}>
      <h3 style={{ backgroundColor: 'rgb(255 255 255)', color: '#757575', padding: '10px', margin: 0 }}>Solar Meter</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <td style={{ padding: '10px' }}><div style={{ width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%' }}></div></td>
            <td style={{ padding: '10px' }}>Working Meters:</td>
            <td style={{ padding: '10px' }}>{workingCount}</td>
          </tr>
          <tr style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '10px' }}><div style={{ width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%' }}></div></td>
            <td style={{ padding: '10px' }}>Non-Working Meters:</td>
            <td style={{ padding: '10px' }}>{nonWorkingCount}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Max Usage */}
    <div style={{
      width: '300px',
      background: 'rgba(242, 242, 242, 1)',
      opacity: 1,
      borderRadius: '10px',
      overflow: 'hidden',
      padding: '20px',
      boxSizing: 'border-box',
      marginBottom: '20px',
    }}>
      <h3 style={{ backgroundColor: 'rgb(255 255 255)', color: '#757575', padding: '10px', margin: 0 }}>Max Usage in last 30 days</h3>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <td style={{ padding: '10px' }}>Meter:</td>
            <td style={{ padding: '10px' }}>{maxMeterEnergy}kW</td>
          </tr>
          <tr style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '10px' }}>Solar:</td>
            <td style={{ padding: '10px' }}>{maxMeterEnergy}kW</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div style={{ flex: 1, marginTop: '60px', width: '800px', height: '260px' }}>
  {/* Meter Graph */}
  <Chart
    chartType="LineChart"
    loader={<div>Loading Chart...</div>}
    data={chartData}
    options={{
      title: 'Load Consumption for Last 30 days',
      hAxis: { title: 'Date', slantedText: true }, // Set slantedText to true to display the dates at an angle
      vAxis: { title: 'Load' },
      chartArea: { width: '70%', height: '45%' } // Adjust the chart area to leave space for axis labels
    }}
    // Set chart width and height directly
    width={'800px'}
    height={'255px'}
  />
<br></br>
<Chart
    chartType="LineChart"
    loader={<div>Loading Chart...</div>}
    data={chartData}
    options={{
      title: 'Solar Consumption for Last 30 days',
      hAxis: { title: 'Date', slantedText: true }, // Set slantedText to true to display the dates at an angle
      vAxis: { title: 'Load' },
      chartArea: { width: '70%', height: '45%' } // Adjust the chart area to leave space for axis labels
    }}
    // Set chart width and height directly
    width={'800px'}
    height={'260px'}
  />
</div>
</div>

{/*  Map */}
<div style={{ width: '1000px', marginTop: '30px', marginLeft: '2%' }}>
  <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', background: 'whitesmoke',
    color: '#757575',marginLeft :'10%', width: '100%'}}>
    <h3>Meter Details Map</h3>
    <div style={{ width: '100%', height: '400px' }}>
      <MapContainer center={romaniaCoordinates} zoom={6} style={{ height: "100%", width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={romaniaCoordinates} icon={customMarkerIcon}>
          <Popup>
            <div style={{ width: '100px', height: '100px'}}>
              <h4>Romania</h4>
              <h6>Working Electric Meters: {workingCount}</h6>
              <h6>Working Solar Meters: {workingCount}</h6>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
</div>
    </>
  );
}
