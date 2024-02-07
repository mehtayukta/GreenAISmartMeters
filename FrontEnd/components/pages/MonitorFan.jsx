import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import '../../styles/Monitor.css'
import fan from '../../assets/images/fan.jpg'
import {FaFan} from 'react-icons/fa';

const parameters = [
  {title : "Work Status:",
  paddingTop: ""}, 
  {title : "Fan Speed:",
  paddingTop: ""},
  {title : "Speed Number:",
  paddingTop: "10px"},
  {title : "Rotation Pattern:",
  paddingTop: "23px"},
  {title : "Voltage:",
  paddingTop: "18px"},
  {title : "Current:",
  paddingTop: "18px"},

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

export const MonitorFan = () => {

const [electricMeterUser , setElectricMeterUser] = useState([]);
const userid = localStorage.getItem("id");


useEffect(() => {
  axios.get(`http://localhost:4001/api/simulatedfan/getSimulatedFans?user_id=" + userid`).
  then(async (res) => {
      if (res.status == 200) {
        if (res) {
          setElectricMeterUser(res.data.user);
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

          <table className='monitor-list'>
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
                  <td>{data.fan_name}</td>
                  <td><FaFan size={50} color={'white'} alt='fan image'/></td>
                  <td style={data.work_status === 'true' ? { color: 'green' } : { color: 'red' }}>{data.work_status === 'true' ? 'Working' : 'Failing'}</td>
                  <td>{data.Fan_Speed}</td>
                  <td>{data.Speed_Number}</td>
                  <td>{data.Rotation_Pattern}</td>
                  <td>{data.Voltage}</td>
                  <td>{data.Current}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <Chart
        chartType="Line"
        width="78em"
        height="300px"
        style={{ position: 'relative'}}
        data={data}
        options={options}
      />
    </>
  );
}
