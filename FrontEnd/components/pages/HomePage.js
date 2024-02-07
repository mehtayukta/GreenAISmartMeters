import React from 'react'
import Table from 'react-bootstrap/Table';
import { Chart } from "react-google-charts";

import '../../styles/Buttons.css'

export default function HomePage() {

    const options = {
        chart: {
          title: "30 days ",
          subtitle: "7 days",
        },
      };
    const data = [
        [
          "Day",
          " Meter Usage 1",
          "Meter Usage 2",
          "Meter Usage 3",
        ],
        [1, 37.8, 10.8, 41.8],
        [2, 30.9, 33.5, 50.4],
        [3, 25.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 11.9, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 20.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
        [13, 4.8, 6.3, 3.6],
        [14, 50.2, 44.2, 3.4],
      ];

    return (
        <>
        <div className="text-left" style={{width: '80%', marginLeft: '17em'}} >
            <h5>Today's Usage</h5>
            <Table table borderless>
                <thead>
                <tr>
                <th></th>
                    <th className='light-grey curved-corners'>Todays's Usage <p>24 KWh</p></th>
                    <th></th>
                    <th className='light-grey curved-corners'>last 24hr Usage <p>34 KWh</p> </th>       
                    <th></th>     
                    <th className='light-grey curved-corners'>Last Update <p>2022-12-05T03:26:34.527+00:00</p> </th>
                    <th></th>
                </tr>
                </thead>
               </Table> 
            <h5>This Week's Usage</h5>
            <Table table borderless>
                <thead>
                <tr>
                <th></th>
                    <th className='light-grey curved-corners'>Total daily Usage <p>572 KWh</p> </th>
                    <th></th>
                    <th className='light-grey curved-corners'>Avg Daily  Usage <p>86 KWh</p> </th>       
                    <th></th>     
                    <th className='light-grey curved-corners'>Max Usage<p>77 KWh</p> </th>
                    <th></th>
                </tr>
                </thead>
               </Table> 
            <h5>This Month's Usage</h5>
            <Table table borderless>
                <thead>
                <tr>
                <th></th>
                <th className='light-grey curved-corners'>Total daily Usage <p>2350 KWh</p> </th>
                    <th></th>
                    <th className='light-grey curved-corners'>Avg Daily Usage <p>65 KWh</p> </th>       
                    <th></th>     
                    <th className='light-grey curved-corners'>Max Usage <p>102 KWh</p> </th>
                    <th></th>
                </tr>
                </thead>
               </Table>  <br/>
               <div>
                <Chart
                    chartType="Line"
                    width="80%"
                    height="300px"
                    style={{position: 'relative'}}
                    data={data}
                    options={options}
                    />
               </div>

       
        </div>
        </>
    )
}
