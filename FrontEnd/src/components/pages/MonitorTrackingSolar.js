import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Table from 'react-bootstrap/Table';
import { MultiSelect } from "react-multi-select-component";
import { parse } from 'papaparse';
//import { Bar } from 'react-chartjs-2';
import { Chart } from "react-google-charts";

import "react-datepicker/dist/react-datepicker.css";
import '../../styles/deviceMgmt.css';
import '../../styles/Buttons.css';


export const MonitorTrackSolar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [csvTable, setCsvTable] = useState([]);
  const [meter_list, setMeterList] = useState([]);
  const [showGraphs, setShowGraphs] = useState(false);
  const filteredOptions = meter_list.map((meter) => ({ label: meter, value: meter }));
  const [loaddata, setloaddata] =  useState(false);
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [graphComp, setgraphComp  ] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDataPred, setChartDataPred] = useState([]);
  const [graphDataPred, setGraphDataPred] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  const [graphtype, setgraphType  ] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  //const [graphtype_pred, setgraphType  ] = useState([]);

// Style



  // Handling the changes
  const handleDropdownChange = (event) => {setSelectedOption(event.target.value); };
  const handleMultiSelectChange = (selectedOptions) => {setSelectedDevices(selectedOptions); };
  const handleDateChange = (date, type) => { 
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    };
    const getColorForLCLid = (lclid, index) => {
      const colors = ['red', 'blue', 'green', 'orange', 'purple']; // Add more colors as needed
      const colorIndex = index % colors.length;
      return colors[colorIndex];
    };


  const callPythonFunction = async (e) => {
      e.preventDefault();
      setShowLoader(true);
      console.log("python function called");
      // #this is for comparison graph 
      if (!startDate || !endDate || !selectedOption || selectedDevices.length === 0) {
        alert('Please select all fields before submitting.');
        //alert(selectedOption);
      }
      else{
        if (showGraphs) {
          setShowGraphs(false); // If showGraphs is true, set it to false
        }
     
        console.log(selectedOption);
        console.log("in else");
      try {
        const response = await axios.post("api/comparegraphssolar", {
          startDate: startDate,
          endDate: endDate,
          frequency: selectedOption,
          selectedDevices: selectedDevices.map((device) => device.value),
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const formattedData = formatChartData(response.data);
        const jsonData = response.data;
    
        if (selectedOption ==="daily" || selectedOption === "weekly" || selectedOption === "hourly" )
        {
        setgraphType("Line");
        }
        else{
          setgraphType("Bar");
        }
       
        // Set the state with the formatted data
        setGraphData(jsonData);
    
    
      // Set the formatted data to the state
      console.log(response.data)
      setChartData(formattedData);
      callPythonFunctionaverage();
    
    
    
    
      } catch (error) {
        console.error("Error calling predictionsolar:", error);
      }
    }
  }
    
  const callPythonFunctionaverage = async () => {
    console.log("python function called");
    
    try {
      const response = await axios.post("api/predictionsolar", {
        startDate: startDate,
        endDate: endDate,
        frequency: selectedOption,
        selectedDevices: selectedDevices.map((device) => device.value),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const formattedDataPred = formatChartDataPred(response.data);
      const jsonDataPred = response.data;
    
      setGraphDataPred(jsonDataPred);
      setChartDataPred(formattedDataPred);
    
    } catch (error) {
      console.error("Error calling prediction:", error);
    }
    setShowLoader(false);
    setShowGraphs(true);
  }
    
    const formatChartDataPred = (rawData) => {
    const formattedDataPred = [['Time', 'Energy', 'Predicted Solar']];
    
    rawData.forEach(item => {
    const time = item[0];
    const energy = parseFloat(item[1]) || 0;
    const predictedLoad = parseFloat(item[2]) || 0;
    
    formattedDataPred.push([time, energy, predictedLoad]);
  });
    
    return formattedDataPred;
};
    
    
  const formatChartData = (rawData) => {
    const formattedData = [['Time', ...new Set(rawData.map(item => item[0]))]];
    
    const timeSet = new Set(rawData.map(item => item[1])); // Unique time values
    
    timeSet.forEach((time) => {
    const row = [time];
    const dataForTime = rawData.filter(item => item[1] === time);
    
    const deviceLoadMap = new Map(dataForTime.map(item => [item[0], parseFloat(item[2])]));
    
    // Populate the row with load values for each device
    formattedData[0].slice(1).forEach((device) => {
      row.push(deviceLoadMap.get(device) || 0);
    });
    
    formattedData.push(row);
  });
    return formattedData;
};



 

// For getting the dates and device list
useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("in fetch data");
      const response = await axios.get("/api/routesolar");
      const { startDate, endDate, meter_list: initialMeterList } = response.data;

      console.log("Start Date from Response:", startDate);
      console.log("End Date from Response:", endDate);

      setStartDate(new Date(Date.parse(startDate)));
      setEndDate(new Date(Date.parse(endDate)));
      setMeterList(initialMeterList);

      console.log(response.data);
      console.log(startDate);
      setMinDate(startDate.copy());
      setMaxDate(endDate.copy());
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };
  fetchData();
 
}, []); 
return (
  <>
    <br />
    <div className="dashboard-container">
      {/* Date Pickers and Dropdown in a Grid Container */}
      <div className="date-picker-container">
      <div className="date-picker">
            <label>Select Frequency:</label>
            <select name="frequency" className="dropdown_button indented-option dropdown" id="selectedOption" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="select" class="indented-option" >Select...</option>
              <option value="hourly" class="indented-option">Hourly</option>
              <option value="daily" class="indented-option">Daily</option>
              <option value="weekly" class="indented-option" >Weekly</option>
            </select>
          </div>
        {/* Start Date */}
        <div className="date-picker" >
          <label> Select Start Date:</label>
          {//<DatePicker selected={startDate} onChange={(date) => handleDateChange(date, "start")} />
          <DatePicker
          
          selected={startDate}
          onChange={(date) => handleDateChange(date, "start")}
          minDate={minDate} // Disable dates prior to the current date
          maxDate={maxDate}
          dateFormat="yyyy-MM-dd"
          style={{color : "whitesmoke"}}
       />
          }

        </div>

        {/* End Date */}
        <div className="date-picker">
          <label>Select End Date:</label>
          {//<DatePicker selected={endDate} onChange={(date) => handleDateChange(date, "end")} />
          <DatePicker
          selected={endDate}
          onChange={(date) => handleDateChange(date, "end")}
          minDate={minDate} // Disable dates prior to startDate
          maxDate={maxDate} // Disable dates later than the current date
          dateFormat="yyyy-MM-dd"
        />}
        </div>
        {/* {console.log("in loaded date")} */}
        {/* Multiselect Dropdown */}
        <div className="date-picker" style ={{ color: 'black'}}>
          <label style ={{ color: 'whitesmoke'}}>Select Device:</label>
            <div>
              <MultiSelect
                options={meter_list.map((meter) => ({ label: meter, value: meter }))}
                value={selectedDevices}
                onChange={handleMultiSelectChange}
                labelledBy="Select Device"
                
              />
              </div>
        </div>

      

        <div className="date-picker">
    
  {/* Form elements */}
  {/* <button type="button" className="light-grey curved-corners selection-button" onClick={callPythonFunction}>
  Submit
</button> */}
<button type="button" className="light-grey curved-corners selection-button" onClick={callPythonFunction}>
  Submit
</button>

        </div>
        
      </div>
        {showLoader ? (
        <div id="loader" className="loader"></div>
      ) : (
        <div id="loader"></div> // Without the loader class
      )}

      {showGraphs && (
        
        
        <div>   
         
      {/*<h4 className="h4_header"> Selected date range :{} to {} </h4>*/}
      <h4 className="h4_header"> Selected date range: {startDate && endDate ? `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}` : 'Not selected'} </h4>
      <h4 className="h4_header"> Device: {selectedDevices.map(device => device.label).join(', ')} </h4>

      <br></br>

       {/* <div className="text-left" >
          <Table  table borderless>
              <thead>
              <tr>
              <th></th>
                  <th className='light-grey curved-corners'>Maximum Usage <p>7.29KWh</p></th>
                  <th></th>
                  <th className='light-grey curved-corners'>Max Average Monthly <p> 1.09KWh</p> </th>       
                  <th></th>     
                  <th className='light-grey curved-corners'>Max Average Weekly <p>1.75KWh</p> </th>
                  <th></th>
                  <th className='light-grey curved-corners'>Max Averag Daily <p> 2.86KWh</p> </th>       
                  <th></th>     
              </tr>
              </thead>
             </Table> 
        </div>
       */}
      <div className="graph-container">
      {/* <div className="image-container" id = 'container'> {/* Graph 2 *
      </div> */ }
      <div>
<Chart
        width={'100%'}
        height={'300px'}
        chartType={graphtype}
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          chart: {
            title: 'Solar Generation',
            subtitle: 'Solar Generation comparison for different devices and times',
          },
        }}
      />
      </div>
      <br></br>
      <div>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType='Line'
        loader={<div>Loading Chart...</div>}
        data={chartDataPred}
        options={{
          chart: {
            title: 'Solar Generation Prediction',
            subtitle: 'Solar Aggregation for different devices and times',
          },
        }}
      />

        </div>
     </div>
     
   </div>
      )}
     
</div>



  </>
   
);
};

    
// ABRSG001 Date = 12/01/2020 07:30
// 01/01/2019 00:30
// 
