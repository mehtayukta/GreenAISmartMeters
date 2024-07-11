// import React, { useEffect, useState, lazy, Suspense } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import Table from 'react-bootstrap/Table';
// import { MultiSelect } from "react-multi-select-component";
// import { parse } from 'papaparse';
// import { Chart } from "react-google-charts";

// import "react-datepicker/dist/react-datepicker.css";
// import '../../styles/deviceMgmt.css';
// import '../../styles/Buttons.css';


// export default function Shortage() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [selectedDevices, setSelectedDevices] = useState([]);
//   const [csvTable, setCsvTable] = useState([]);
//   const [meter_list, setMeterList] = useState([]);
//   const [showGraphs, setShowGraphs] = useState(false);
//   const [loaddata, setloaddata] =  useState(false);
//   const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//   const [graphComp, setgraphComp  ] = useState([]);
//   const [graphData, setGraphData] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [chartDataPred, setChartDataPred] = useState([]);
//   const [graphDataPred, setGraphDataPred] = useState([]);
//   const [minDate, setMinDate] = useState(null);
//   const [maxDate, setMaxDate] = useState(null);

//   const [graphtype, setgraphType  ] = useState([]);
//   const [showLoader, setShowLoader] = useState(false);

//   const [responseData, setResponseData] = useState([]);

// // Style



//   // Handling the changes
//   const handleDropdownChange = (event) => {setSelectedOption(event.target.value); };
//   const handleMultiSelectChange = (selectedOptions) => {setSelectedDevices(selectedOptions); };
//   const handleDateChange = (date, type) => { 
//     if (type === "start") {
//       setStartDate(date);
//     } else {
//       setEndDate(date);
//     }
//     };
//     const getColorForLCLid = (lclid, index) => {
//       const colors = ['red', 'blue', 'green', 'orange', 'purple']; // Add more colors as needed
//       const colorIndex = index % colors.length;
//       return colors[colorIndex];
//     };


//   const callPythonFunction = async (e) => {
//       e.preventDefault();
//       console.log("python function called");
//       // #this is for comparison graph 
//       if (!startDate || !endDate) {
//         alert('Please select all fields before submitting.');
//         //alert(selectedOption);
//       }
//       else{
//         if (showGraphs) {
//           setShowGraphs(false); // If showGraphs is true, set it to false
//         }
//         console.log("in else");
//       try {
//         const response = await axios.post("api/predictionshortage", {
//           startDate: startDate,
//           endDate: endDate,
//         }, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
      
    
    
//         setResponseData(response.data);
//       } catch (error) {
//         console.error("Error calling predictionsolar:", error);
//       }
//     }
//   }
    
    



 

// // For getting the dates and device list
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       console.log("in fetch data");
//       const response = await axios.get("/api/routeshortage");
//       const { startDate, endDate } = response.data;
//       console.log("Start Date from Response:", startDate);
//       console.log("End Date from Response:", endDate);

//       setStartDate(new Date(Date.parse(startDate)));
//       setEndDate(new Date(Date.parse(endDate)));
//       //setMeterList(initialMeterList);

//       console.log(response.data);
//       console.log(startDate);
//       setMinDate(startDate.copy());
//       setMaxDate(endDate.copy());
//     } catch (error) {
//       console.error("Error loading initial data:", error);
//     }
//   };
//   fetchData();
 
// }, []); 


// return (
//   <>
//     <br />
//     <div className="dashboard-container">
//       <div className="date-picker-container shortage_container">
//         <div className="date-picker" >
//           <label> Select Start Date:</label>
//           {
//           <DatePicker
          
//           selected={startDate}
//           onChange={(date) => handleDateChange(date, "start")}
//           minDate={minDate}
//           maxDate={maxDate}
//           dateFormat="yyyy-MM-dd"
//           style={{color : "whitesmoke"}}
//        />
//           }

//         </div>

        
//         <div className="date-picker">
//           <label>Select End Date:</label>
//           {
//           <DatePicker
//           selected={endDate}
//           onChange={(date) => handleDateChange(date, "end")}
//           minDate={minDate} 
//           maxDate={maxDate} 
//           dateFormat="yyyy-MM-dd"
//         />}
//         </div>


      

//         <div className="date-picker">
    
// <button type="button" className="light-grey curved-corners selection-button" onClick={callPythonFunction}>
//   Submit
// </button>

//         </div>

//         <br/>
        
//       </div>
//       <div className="shortage_analysis">
//       <Table className='update_delete shortage_table'>
//             <thead>
//                 <tr>
//                     <th>Date Timestamp</th>
//                     <th>Predicted Shortage</th>
//                     <th>Shoratge Status</th>
//                     <th>Shortage Severity</th>
//                     <th>Shortage Action</th>
//                     <th>Recommendation</th>
//                 </tr>
//             </thead>
//             <tbody>
//     {responseData.map((item, index) => (
//       <tr key={index}>
//         <td>{item.Date_Timestamp}</td>
//         <td>{item.Predicted_Shortage}</td>
//         <td>{item.Shortage_Status}</td>
//         <td>{item.Shortage_Severity}</td>
//         <td style={{ color: item.Action === 'Buy' ? 'red' : 'green' }}>
//           {item.Action}
//         </td>
//         <td>{item.Recommendation}</td>
//       </tr>
//     ))}
//   </tbody>
//         </Table>
//         </div>
//         <br/>

//         <Table className='update_delete'>
//   <thead>
//     <tr>

//     <th> <button className={`buttonStyle_device_update_delete edit_button`} >Buy</button></th>
//     <th><button className={'buttonStyle_device_update_delete update_button'} >Sell</button></th>
//     <th><button className={'buttonStyle_device_update_delete delete_button'} >Store </button> </th> 

//     </tr>
//   </thead>
//   </Table>
//         {showLoader ? (
//         <div id="loader" className="loader"></div>
//       ) : (
//         <div id="loader"></div> 
//       )}

//       {showGraphs && (
        
        
//         <div>   
         
     
//       <h4 className="h4_header"> Selected date range: {startDate && endDate ? `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}` : 'Not selected'} </h4>

//       <br></br>

     
//    </div>
//       )}
     
// </div>



//   </>
   
// );
// };



import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Table from 'react-bootstrap/Table';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import { Chart } from "react-google-charts";
import '../../styles/deviceMgmt.css';
import '../../styles/Buttons.css';

export default function Shortage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [shortageRange, setShortageRange] = useState([-2000, 2000]);
  const [timeRange, setTimeRange] = useState(["00:00", "23:59"]);
  const [showLoader, setShowLoader] = useState(true);
  const loaderStyle = {
    alignSelf: 'center',
    // marginTop: '2%',
    marginLeft: '-8%',
    border: '16px solid #f3f3f3',
    borderRadius: '25%',
    borderTop: '16px solid #566caf',
    borderRight: '16px solid #197e81',
    borderBottom: '16px solid red',
    width: '100px',
    height: '100px',
    animation: 'spin 2s linear infinite',
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/routeshortage");
        const { startDate, endDate, data } = response.data;

        const parsedStartDate = new Date(Date.parse(startDate));
        const parsedEndDate = new Date(Date.parse(endDate));
 
        setShowLoader(true);
        setStartDate(parsedStartDate);
        setEndDate(parsedEndDate);
        setResponseData(data);
        setFilteredData(data);
      

      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      callPythonFunction();
    }
  }, [startDate, endDate]);

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    filterData(date, type, selectedAction, activeFilters);
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    setSelectedAction(action);
    filterData(startDate, endDate, action, activeFilters);
    updateActiveFilters('Action', action);
  };

  const filterData = (start, end, action, filters) => {
    let filtered = responseData;

    if (start && end) {
      filtered = filtered.filter(item => {
        const date = new Date(item.Date_Timestamp);
        return date >= start && date <= end;
      });
    }

    if (action) {
      const actionLower = action.toLowerCase();
      filtered = filtered.filter(item => item.Action.toLowerCase().includes(actionLower));
    }

    Object.keys(filters).forEach(filterKey => {
      const filterValue = filters[filterKey];
      if (filterValue) {
        filtered = filtered.filter(item => {
          if (filterKey === 'Date') return item.Date_Timestamp.toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Day') return formatDate(item.Date_Timestamp).day.toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Time') return formatDate(item.Date_Timestamp).time.toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Seasonality') return formatDate(item.Date_Timestamp).seasonality.toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Predicted_Shortage') return item.Predicted_Shortage.toString().toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Shortage_Status') return item.Shortage_Status.toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Shortage_Severity') return item.Shortage_Severity.toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Recommendation') return item.Recommendation.toLowerCase().includes(filterValue.toLowerCase());
          if (filterKey === 'Action') return item.Action.toLowerCase().includes(filterValue.toLowerCase());

          return false;
        });
      }
    });

    // Apply range filters
    filtered = filtered.filter(item => {
      const time = formatDate(item.Date_Timestamp).time;
      const shortage = item.Predicted_Shortage;
      return (
        shortage >= shortageRange[0] && shortage <= shortageRange[1] &&
        time >= timeRange[0] && time <= timeRange[1]
      );
    });

    setFilteredData(filtered);
  };

  const updateActiveFilters = (type, value) => {
    setActiveFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (value) {
        newFilters[type] = value;
      } else {
        delete newFilters[type];
      }
      return newFilters;
    });
  };

  const removeFilter = (type) => {
    if (type === 'Action') setSelectedAction("");
    updateActiveFilters(type, "");
    filterData(startDate, endDate, selectedAction, activeFilters);
  };

  const callPythonFunction = async () => {
    if (!startDate || !endDate) {
      alert('Please select all fields before submitting.');
      return;
    }

    try {
      const response = await axios.post("api/predictionshortage", {
        startDate,
        endDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      setResponseData(data);
      setFilteredData(data);
      setIsDataLoaded(true);

      const minTime = "00:00";
      const maxTime = "23:59";
      setTimeRange([minTime, maxTime]);
      setShowLoader(false);
    } catch (error) {
      console.error("Error calling predictionshortage:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const time = date.toTimeString().split(' ')[0];
    const seasonality = getSeasonality(date);
    return { day, date: date.toLocaleDateString(), time, seasonality };
  };

  const getSeasonality = (date) => {
    const month = date.getMonth();
    if (month < 2 || month === 11) return 'Winter';
    if (month < 5) return 'Spring';
    if (month < 8) return 'Summer';
    return 'Autumn';
  };

  const handleColumnFilterChange = (event, column) => {
    const value = event.target.value;
    updateActiveFilters(column, value);
    filterData(startDate, endDate, selectedAction, { ...activeFilters, [column]: value });
  };

  const handleShortageRangeChange = (values) => {
    setShortageRange(values);
    filterData(startDate, endDate, selectedAction, activeFilters);
  };

  const handleTimeRangeChange = (values) => {
    const [start, end] = values.map(val => {
      const hours = Math.floor(val / 60).toString().padStart(2, '0');
      const minutes = (val % 60).toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });
    setTimeRange([start, end]);
    filterData(startDate, endDate, selectedAction, activeFilters);
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const prepareChartData = () => {
    const chartData = [
      [
        { type: 'date', label: 'Date' },
        { type: 'number', label: 'Predicted Shortage' },
        { type: 'string', role: 'style' },
        { type: 'string', role: 'tooltip', p: { html: true } },
      ],
      ...filteredData.map(item => {
        const date = new Date(item.Date_Timestamp);
        const shortage = item.Predicted_Shortage;
        const color = shortage < 0 ? 'green' : 'red';
        const tooltip = `
          <div style="padding:5px; color: black !important;">
            <strong style="color: 'black' !important;">Date:</strong> ${date.toLocaleDateString()}<br/>
            <strong>Predicted Shortage:</strong> ${shortage}<br/>
            <strong>Status:</strong> ${shortage < 0 ? 'Abundance' : 'Shortage'}
          </div>
        `;
        return [date, shortage, `color: ${color}`, tooltip];
      }),
    ];
    return chartData;
  };
  return (
    <>
    
      <div className="dashboard-container">
        <title> Shortage Analaysis </title>
        <h2 style={{ textAlign: 'center', marginBottom: '-2%' , fontWeight: 'bolder'}}>Hourly Shortage Analysis</h2>
        <div id="loader"></div>
        {showLoader && <div className="loader" style={loaderStyle}></div>}

{isDataLoaded && !showLoader && (
        // {isDataLoaded && (
          <>
            <div className="active-filters">
              {Object.entries(activeFilters).map(([filterType, filterValue]) => (
                <div key={filterType} className="active-filter">
                  <span>{filterType}: {filterValue}</span>
                  <button className="remove-filter-button" onClick={() => removeFilter(filterType)}>x</button>
                </div>
              ))}
            </div>

            <div className="shortage_analysis">
              {/* <Table className='update_delete shortage_table' style={{ maxHeight: '400px', overflowY: 'auto' }} > */}
              <Table className='update_delete shortage_table' >

                <thead className="shortage_table_thead">
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Seasonality</th>
                    <th>Predicted Shortage</th>
                    <th>Shortage Status</th>
                    <th>Shortage Severity</th>
                    {/* <th>Recommendation</th> */}
                    <th>Action</th>
                  </tr>
                  <tr>
                    <th>
                      {/* <input
                        className="short_input"
                        type="text"
                        value={activeFilters.Date || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Date")}
                        placeholder="Search"
                      />
                      <br></br> */}
                       {/* <input
                        className="short_input"
                        type="text"
                        value={activeFilters.Date || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Date")}
                        placeholder="Search"
                      /> */}
                    
                    <label className=".datepicker-input-label">Start Date:</label>
                      <DatePicker
              selected={startDate}
              onChange={(date) => handleDateChange(date, "start")}
              dateFormat="yyyy-MM-dd"
              className="datepicker-input-in"
             
            />
            <br></br>
            <label  className=".datepicker-input-label" >End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChange(date, "end")}
              dateFormat="yyyy-MM-dd"
              className="datepicker-input-in"
            />
                    </th>
                    <th>
                      <input
                        type="text"
                        className="short_input"
                        value={activeFilters.Day || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Day")}
                        placeholder="Search"
                      />
                    </th>
                    <th>
                      <Slider
                        range
                        min={0}
                        max={1439}
                        step={1}
                        value={[timeToMinutes(timeRange[0]), timeToMinutes(timeRange[1])]}
                        onChange={handleTimeRangeChange}
                      />
                      <div>{timeRange[0]} - {timeRange[1]}</div>
                    </th>
                    <th>
                      <input
                        type="text"
                        className="short_input"
                        value={activeFilters.Seasonality || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Seasonality")}
                        placeholder="Search"
                      />
                    </th>
                    <th>
                      <Slider
                        range
                        min={-2000}
                        max={2000}
                        step={1}
                        value={shortageRange}
                        onChange={handleShortageRangeChange}
                      />
                      <div>{shortageRange[0]} - {shortageRange[1]}</div>
                    </th>
                    <th>
                      <input
                        className="short_input"
                        type="text"
                        value={activeFilters.Shortage_Status || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Shortage_Status")}
                        placeholder="Search"
                      />
                    </th>
                    <th>
                      <input
                        className="short_input"
                        type="text"
                        value={activeFilters.Shortage_Severity || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Shortage_Severity")}
                        placeholder="Search"
                      />
                    </th>
                    {/* <th>
                      <input
                        className="short_input"
                        type="text"
                        value={activeFilters.Recommendation || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Recommendation")}
                        placeholder="Search"
                      />
                    </th> */}
                    <th>
                      <input
                        className="short_input"
                        type="text"
                        value={activeFilters.Action || ""}
                        onChange={(e) => handleColumnFilterChange(e, "Action")}
                        placeholder="Search"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                  {Array.isArray(filteredData) && filteredData.map((item, index) => {
                    const { day, date, time, seasonality } = formatDate(item.Date_Timestamp);
                    return (
                      <tr key={index}>
                        <td>{date}</td>
                        <td>{day}</td>
                        <td>{time}</td>
                        <td>{seasonality}</td>
                        <td>{item.Predicted_Shortage}</td>
                        <td>{item.Shortage_Status}</td>
                        <td>{item.Shortage_Severity}</td>
                        {/* <td>{item.Recommendation}</td> */}
                        <td style={{ color: item.Action === 'Buy' ? 'red' : 'green' }}>
                          {item.Action}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div className="legend">
                <div><span style={{ color: 'red' }}>--■--</span> Buy/Shortage</div>
                <div><span style={{ color: 'green' }}>--■--</span> Sell/Abundance</div>
              </div>

              <Chart
  chartType="LineChart"
  data={prepareChartData()}
  width="100%"
  height="400px"
  options={{
    hAxis: { title: 'Date' },
    vAxis: { title: 'Predicted Shortage' },
    title: 'Shortage Prediction',
    legend: {
      position: 'top',
      alignment: 'center',
      textStyle: { color: 'black', fontSize: 14 },
    },
    tooltip: { isHtml: true }, // Ensure HTML tooltips are enabled
    series: {
      0: { 
        lineWidth: 2,
        pointSize: 5,
      }
    }
  }}
/>

          </>
        )}
      </div>
    </>
  );
}
