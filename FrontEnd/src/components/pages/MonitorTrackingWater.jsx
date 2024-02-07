import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import '../../styles/Monitor.css'
import energy from '../../assets/images/water-meter-icon.png'
import {FaTint} from 'react-icons/fa'

const parameters = [
  {title : "Work Status:",
  paddingTop: ""}, 
  {title : "ELectricity Capacity:",
  paddingTop: ""},
  {title : "Voltage:",
  paddingTop: "10px"},
  {title : "Current:",
  paddingTop: "23px"},
  {title : "Last 24 hr Usage:",
  paddingTop: "18px"},
  {title : "This Week's Usage:",
  paddingTop: "18px"},
  {title : "This month's Usage:",
  paddingTop: "20px"},
  {title : "This Year's Usage:",
  paddingTop: "20px"},
]

const dummy = [
  {
    "name": "Electricity Meter 1",
    "path": energy,
    "work_Status": "Working",
    "electricity_capacity": "70%",
    "Voltage": "200V",
    "Current": "10A",
    "Today_Usage": "60KWh",
    "Last_24_hr": "70KWh",
    "weekUsage": "470 KWh",
    "monthUsage": "2100 KWh",
    "yearUsage": "21200 KWh"

  },
  {
    "name": "Electricity Meter 2 ",
    "path": energy,
    "work_Status": "Working",
    "electricity_capacity": "60%",
    "Voltage": "200V",
    "Current": "10A",
    "Today_Usage": "65KWh",
    "Last_24_hr": "75KWh",
    "weekUsage": "490 KWh",
    "monthUsage": "2400 KWh",
    "yearUsage": "25200 KWh"

  },
  {
    "name": "Electricity Meter 3",
    "path": energy,
    "work_Status": "Working",
    "electricity_capacity": "40%",
    "Voltage": "100V",
    "Current": "5A",
    "Today_Usage": "62KWh",
    "Last_24_hr": "72KWh",
    "weekUsage": "470 KWh",
    "monthUsage": "2100 KWh",
    "yearUsage": "21200 KWh"

  },
  {
    "name": "Electricity Meter 4",
    "path": energy,
    "work_Status": "Failing"

  },
]


export const data = [
  [
    "Day",
    "MIC- 2-Ststem Apparent Power",
    "Senior DG3- Apparent Power",
    "Senior DG 2 - Apparent Power",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
];

export const options = {
  chart: {
    title: "31 days ",
    subtitle: "7 days",
  },
};

const meterStyle = {

}
const meterListStyle = {
  display: "inline-grid",
  textAlign: "center",
  fontWeight: "600"
}
const detailsWrap = {
  display: "inline-flex",
  marginLeft: "10em"
}
const para = {
  marginTop: '8em'
}

export const MonitorTrackingWater = () => {

const [electricMeterUser , setElectricMeterUser] = useState([]);

useEffect(() => {
  axios.get("http://localhost:3001/api/simulated/getSimulateddetails/?type=WaterMeter").
  then(async (res) => {
      if (res.status == 200) {
        if (res) {
          setElectricMeterUser(res.data.user);
          console.log(electricMeterUser);
        }            
      }
      else {
          console.log(res.status);
      }
    }).catch((err) => {
      console.log(err)
    });

}, []);
  return (

    <>
      <div className="details-wrapper" style={detailsWrap}>

      <table className="monitor-list">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            {parameters.map((data) => (
              <th style={{paddingTop: data.paddingTop, paddingBottom: data.paddingTop, fontWeight: "600"}}>{data.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {electricMeterUser.map((data) => (
            <tr style={meterListStyle}>
              <td>{data.name}</td>
              <td><FaTint size={50} color={'white'} alt='water drop image'/></td>
              <td style={data.work_Status === 'Working' ? { color: 'green' } : { color: 'red' }}>{data.work_Status}</td>
              <td>{data.electricity_capacity}</td>
              <td>{data.Voltage}</td>
              <td>{data.Current}</td>
              <td>{data.Last_24_hr}</td>
              <td>{data.weekUsage}</td>
              <td>{data.monthUsage}</td>
              <td>{data.yearUsage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Chart
        chartType="Line"
        width="78em"
        height="300px"
        style={{ position: 'relative', left: '2em' }}
        data={data}
        options={options}
      />
    </>
  );
}
