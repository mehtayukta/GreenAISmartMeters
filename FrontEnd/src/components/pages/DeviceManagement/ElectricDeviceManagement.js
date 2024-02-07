import React, { useState, useEffect, useRef} from 'react';
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import '../../../styles/deviceMgmt.css';

const buttonStyle = {
  color: "white",
  background: "teal",
  padding: "8px",
  width: "10em",
};

const textStyle = {
  textTransform: "uppercase",
  width: "10em",
  marginRight: "3em"
};

const noneStyle = { display: 'none' }
  const blockstyle = {
    "display": "grid",
    "grid-template-columns": "auto auto auto auto auto auto",
    "grid-template-rows": "auto auto auto auto",
    "max-width": "max-content"
  }
export const ElectricDeviceManagement = () => {
  console.log("This is the meter page");

  const [meterdetails, setMeterdetails] = useState([]);
 let [showsubmit, setshowSubmit] = useState(false);
  let [isdisabled, setisDisabled] = useState(true);
  let [hideform, setHideform] = useState(true);
  const [_id, setId] = useState("");
  const [electricMeterId, setelectricMeterId] = useState("");
  const [electricMeterName, setelectricMeterName] = useState("");
  const [location, setlocation] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [model, setmodel] = useState("");
  const [electricCapacity, setelectricCapacity] = useState("");
  const [installationMethod, setinstallationMethod] = useState("");
  const [meausurementAccuracy, setmeausurementAccuracy] = useState("");
  const [dimensions, setdimensions] = useState("");
  const [deploymentDate, setdeploymentDate] = useState("");
  const [installationDate, setinstallationDate] = useState("");
  const [power, setPower] = useState("");
  const [cloudStatus, setcloudStatus] = useState("");
  const [workingStatus, setworkingStatus] = useState("");
  const [activeStatus, setactiveStatus] = useState("");
  //const [userId, setuserId] = useState(localStorage.getItem("id"));
 // const [userId, setuserId] = useState("");
  const buttonRef = useRef(null);

  useEffect(() => {
    console.log("Fetching meter details...");

    Axios.get("http://localhost:4001/api/meter/getMeterdetails")
      .then((res) => {
        if (res.data) {
          setMeterdetails(res.data); // Assuming the response data is an array
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array ensures that this useEffect runs once when the component mounts
  const view = (data) => {
    console.log(data);
    setHideform(false);
    setisDisabled(true);
    setshowSubmit(false);
    console.log(data);
    let Meter = data;
    setId(Meter._id);
    setelectricMeterId(Meter.electricMeterId);
    setelectricMeterName(Meter.electricMeterName);
    setelectricCapacity(Meter.electricCapacity);
    setlocation(Meter.location);
    setmanufacturer(Meter.manufacturer);
    setinstallationMethod(Meter.installationMethod);
    setinstallationDate(Meter.installationDate);
    setPower(Meter.power);
    setmeausurementAccuracy(Meter.meausurementAccuracy);
    setdeploymentDate(Meter.deploymentDate);
    setdimensions(Meter.dimensions);
    setmodel(Meter.model);
    setcloudStatus(Meter.cloudStatus);
    setworkingStatus(Meter.workingStatus);
    setactiveStatus(Meter.activeStatus);
    //setuserId(Meter.userId);


  }
  
  const addmeter = (e) => {
    setisDisabled(false);
    setHideform(false);
    setshowSubmit(true);
    setelectricMeterId("");
    setelectricMeterName("");
    setPower("");
    setlocation("");
    setelectricCapacity("");
    setmanufacturer("");
    setdimensions("");
    setinstallationDate("");
    setdeploymentDate("");
    setinstallationMethod("");
    setmeausurementAccuracy("");
    setmodel("");
    setcloudStatus("");
    setworkingStatus("");
    setactiveStatus("");
   // setuserId("");

}
const formButton = {
  color: "white",
  background: "teal",
  padding: "8px",
  width: "10em",
  textTransform: "uppercase",
  marginTop: "3em",
  position: "relative",
  left: "24em"
}

const onsubmitaction = (event) => {
  debugger;
  
  if (_id != "") {
    debugger;
    Updatedataindatabase(_id);
  }
  else {
    //console.log("in else")
    adddatatodatabase();
  }
}

const adddatatodatabase = () => {
  console.log("In adddatatodatabase  ElectricDevice management.js")

  const new_data = {
    "electricMeterId": electricMeterId,
    "electricMeterName": electricMeterName,
    "location": location,
    "manufacturer": manufacturer,
    "model": model,
    "electricCapacity": electricCapacity,
    "installationMethod": installationMethod,
    "meausurementAccuracy": meausurementAccuracy,
    "dimensions": dimensions,
    "deploymentDate": deploymentDate,
    "installationDate": installationDate,
    "power": power,
    "cloudStatus": cloudStatus,
    "workingStatus": workingStatus,
    "activeStatus": activeStatus,
    //"userId": localStorage.getItem("id")
  }

  Axios.post("http://localhost:4001/api/meter/addMeterdetails", new_data).then(async (res) => {
    debugger
    if (res.status === 200) {
      if (res) {

      }
    }
    else {
      console.log(res.status);
    }
  }).catch((err) => {
    console.log(err)
  });
}
const Updatedataindatabase = (id) => {
  const updated_data = {
    "electricMeterId": electricMeterId,
    "electricMeterName": electricMeterName,
    "location": location,
    "manufacturer": manufacturer,
    "model": model,
    "electricCapacity": electricCapacity,
    "installationMethod": installationMethod,
    "meausurementAccuracy": meausurementAccuracy,
    "dimensions": dimensions,
    "deploymentDate": deploymentDate,
    "installationDate": installationDate,
    "power": power,
    "cloudStatus": cloudStatus,
    "workingStatus": workingStatus,
    "activeStatus": activeStatus,
    //"userId": userId
  }
  Axios.put(`http://localhost:4001/api/meter/updateMeter/${id}`, updated_data).then(async (res) => {
  console.log("In ElectricDevice management.js")

    if (res.data) {
      setelectricMeterId(res.data.electricMeterId);
      setelectricMeterName(res.data.electricMeterName);
      setPower(res.data.power);
      setlocation(res.data.location);
      setelectricCapacity(res.data.electricCapacity);
      setmanufacturer(res.data.manufacturer);
      setdimensions(res.data.dimensions);
      setinstallationDate(res.data.installationDate);
      setdeploymentDate(res.data.deploymentDate);
      setinstallationMethod(res.data.installationMethod);
      setmeausurementAccuracy(res.data.meausurementAccuracy);
      setmodel(res.data.model);
      setcloudStatus(res.data.cloudStatus);
      setworkingStatus(res.data.workingStatus);
      setactiveStatus(res.data.activeStatus);
      //setuserId(res.data.userId);
    }

    else {
      console.log(res.status);
    }
  }).catch((err) => {
    console.log(err)
  });
}

const update = (id, data) => {
  console.log(id);
  view(data);
  setisDisabled(false);
  setHideform(false);
  setshowSubmit(true);
  updatedata(id);
}

const updatedata = (id) => {
  console.log(id);
}

const removedata = (id) => {
  console.log("In removedata  ElectricDevice management.js")

  console.log(id);
  setHideform(true);

  //Axios.delete("http://localhost:4001/api/meter/deleteMeter?id=" + id).
  Axios.delete(`http://localhost:4001/api/meter/deleteMeter/${id}`).
    then(async (res) => {
      console.log("success", res);
      window.location.reload();
      //debugger;
      Axios.get("http://localhost:4001/api/meter/getMeterdetails").
        then(async (res) => {
          setMeterdetails(res.data.user.filter(item => item.id !== id))
          console.log("In Meter")
        })
    }).catch((err) => {
      console.log(err)
    });

}

  return (
    <>
    <div className="text-left">
      <h5>Device List</h5>
      <Table className='list-table'>
        <thead>
          <tr>
            <th className='light-grey'>Device ID</th>
            <th className='light-grey'>Device Name</th>
            <th className='light-grey'>View</th>
            <th className='light-grey'>Update</th>
            <th className='light-grey'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {meterdetails.map((data, index) => (
                <tr className='list-tr'>
                <td>{data.electricMeterId}</td>
                <td style={textStyle}>{data.electricMeterName}</td>
                <td><button style={buttonStyle} onClick={() => view(data)}>View</button></td>
                <td><button style={buttonStyle} onClick={() => update(data._id, data)}>Update</button></td>
                <td><button style={buttonStyle} onClick={() => removedata(data._id)}>Delete</button></td>
                </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <button className='curved-corners' style={{ width: 'fit-content', color: "white", background: "teal", padding: "10px", marginLeft: "1.5em" }} onClick={addmeter}>Add a Device + </button>
     <form className='add-device' style={hideform ? noneStyle : blockstyle} onSubmit={onsubmitaction}>
       <input type="hidden" name="device_id" value={_id} />
       <div><label>Device Name:</label></div>
       <div><input type="text" name="dname" style={textStyle} value={electricMeterName} onChange={(e) => (setelectricMeterName(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Device ID:</label></div>
       <div><input type="text" name="did" style={textStyle} value={electricMeterId} onChange={(e) => (setelectricMeterId(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Manufacturer:</label></div>
       <div><input type="text" name="dman" style={textStyle} value={manufacturer} onChange={(e) => (setmanufacturer(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Location:</label></div>
       <div><input type="text" name="dloc" style={textStyle} value={location} onChange={(e) => (setlocation(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Model:</label></div>
       <div><input type="text" name="dmodel" style={textStyle} value={model} onChange={(e) => (setmodel(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Amperage Capacity:</label></div>
       <div><input type="text" name="dacap" style={textStyle} value={electricCapacity} onChange={(e) => (setelectricCapacity(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Installation Method:</label></div>
       <div><input type="text" name="dins" style={textStyle} value={installationMethod} onChange={(e) => (setinstallationMethod(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Measurement Accuracy:</label></div>
       <div><input type="text" name="dmeaacc" style={textStyle} value={meausurementAccuracy} onChange={(e) => (setmeausurementAccuracy(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Installation Date:</label></div>
       <div><input type="text" name="dins" style={textStyle} value={installationDate} onChange={(e) => (setinstallationDate(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Dimensions:</label></div>
       <div><input type="text" name="ddime" style={textStyle} value={dimensions} onChange={(e) => (setdimensions(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Deployment Date:</label></div>
       <div><input type="text" name="ddep" style={textStyle} value={deploymentDate} onChange={(e) => (setdeploymentDate(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Power:</label></div>
       <div><input type="text" name="dpower" style={textStyle} value={power} onChange={(e) => (setPower(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Cloud Status:</label></div>
       <div><input type="text" name="ddep" style={textStyle} value={cloudStatus} onChange={(e) => (setcloudStatus(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Working Status:</label></div>
       <div><input type="text" name="ddep" style={textStyle} value={workingStatus} onChange={(e) => (setworkingStatus(e.target.value))} disabled={isdisabled} /></div>
       <div><label>Active Status:</label></div>
       <div><input type="text" name="dpower" style={textStyle} value={activeStatus} onChange={(e) => (setactiveStatus(e.target.value))} disabled={isdisabled} /></div>
       <button className='curved-corners' style={showsubmit ? formButton : noneStyle} type='submit'>Submit</button>

     </form>
      </>

  )
};
