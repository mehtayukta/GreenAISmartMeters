import React, {useEffect} from 'react';
import axios from "axios";
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../../styles/deviceMgmt.css'


const buttonStyle = {
  color: "white",
  background: "teal",
  padding: "8px",
  width:"10em",
}
const formButton = {
  color: "white",
  background: "teal",
  padding: "8px",
  width:"10em",
  textTransform: "uppercase",
  marginTop: "3em",
  position: "relative",
  left: "24em"
}
const textStyle = {
  textTransform: "uppercase",
  width: "10em",
  marginRight: "3em"
}

export const LightDeviceManagement = () => {
    
    let [lightdetails, setLightdetails] = useState([]);
    let [showsubmit, setshowSubmit] = useState(false);
    let [isdisabled, setisDisabled] = useState(true);
    let [hideform, setHideform] = useState(true);
    const noneStyle = {display: 'none'}
    const blockstyle = {
      "display": "grid",
      "grid-template-columns" : "auto auto auto auto auto auto",
      "grid-template-rows" : "auto auto auto auto",
      "max-width": "max-content"
    }
    
    //parameters for viewing device's details
    const [_id,setId] = useState("");
    const [lightId, setLightId] = useState("");
    const [lightName, setLightName] = useState("");
    const [location, setlocation] = useState("");
    const [marker, setmarker] = useState("");
    const [model, setmodel] = useState("");
    const [illumination, setillumination] = useState("");
    const [illuminationTime, setilluminationTime] = useState("");
    const [wattage, setwattage] = useState("");
    const [design, setDesign] = useState("");
    const [deploymentDate, setdeploymentDate] = useState("");
    const [installationDate, setinstallationDate] = useState("");
    const [power, setPower] = useState("");
    const [cloudStatus, setcloudStatus] = useState("");
    const [workingStatus, setworkingStatus] = useState("");
    const [activeStatus, setactiveStatus] = useState("");
    const [userId, setuserId] = useState("637220a2858bb384838f8286");

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        axios.get("http://localhost:3001/api/light/getLightDetails?userId=637220a2858bb384838f8286").
        then(async (res) => {
            console.log("success", res);
            if (res.status == 200) {
              if (res) {
                console.log(res.data.user);
                setLightdetails(res.data.user);
                console.log(lightdetails);
              }            
            }
            else {
                console.log(res.status);
            }
          }).catch((err) => {
            console.log(err)
          });

      }, []);

      const view = (data) => {
        console.log(data);
        setHideform(false);
        setisDisabled(true);
        setshowSubmit(false);
        console.log(data);
        let Light = data;
        setId(Light._id);
        setLightId(Light.lightId);
        setLightName(Light.lightName);
        setlocation(Light.location);
        setmarker(Light.marker);
        setmodel(Light.model);
        setillumination(Light.illumination);
        setilluminationTime(Light.illuminationTime);
        setinstallationDate(Light.installationDate);
        setwattage(Light.wattage);
        setPower(Light.power);
        setDesign(Light.design);
        setdeploymentDate(Light.deploymentDate);
        setinstallationDate(Light.installationDate);
        setcloudStatus(Light.cloudStatus);
        setworkingStatus(Light.workingStatus);
        setactiveStatus(Light.activeStatus);
        setuserId(Light.userId); // need to change later
        
        
      }

      const update = (id,data) => {
        console.log(id);
        view(data);
        setisDisabled(false);
        setHideform(false);
        setshowSubmit(true);
        updatedata(id);        
      }

      const updatedata = (id) =>{
        console.log(id);
      }

      const removedata = (id) => {
    
        console.log(id);
        setHideform(true);

        axios.delete("http://localhost:3001/api/light/deleteLightDetails?id="+id).
        then(async (res) => {
            console.log("success", res);
            if (res.status == 200) {
              if (res) {
                console.log(res.data.user.oldLight.deletedCount);
                window.location.reload(false);
              }            
            }
            else {
                console.log(res.status);
            }
          }).catch((err) => {
            console.log(err)
          });

      }

      const addlight = (e) => {
        setisDisabled(false);
        setHideform(false);
        setshowSubmit(true);
        setLightId("");
        setLightName("");
        setlocation("");
        setmodel("");
        setmarker("");
        setillumination("");
        setilluminationTime("");
        setdeploymentDate("");
        setinstallationDate("");
        setwattage("");
        setPower("");
        setDesign("");
        setcloudStatus("");
        setworkingStatus("");
        setactiveStatus("");
        setuserId("");
       }

       const onsubmitaction = (e) => {

        e.preventDefault();
        console.log(_id);
        if (_id != ""){
          Updatedataindatabase(_id);
        }
        else{
          adddatatodatabase();
        }
        window.location.reload(false);
       }

       const adddatatodatabase = () =>{

        const new_data = {
          "lightId":lightId,
          "lightName":lightName,
          "location":location,
          "marker":marker,
          "model":model,
          "illumination":illumination,
          "illuminationTime":illuminationTime,
          "wattage":wattage,
          "design":design,
          "power":power,
          "deploymentDate":deploymentDate,
          "installationDate":installationDate,
          "cloudStatus":cloudStatus,
          "workingStatus":workingStatus,
          "activeStatus":activeStatus,
          "userId":"637220a2858bb384838f8286"
        }
        console.log(new_data);
        axios.post("http://localhost:3001/api/light/addLightDetails",new_data).then(async (res) => {
            if (res.status === 200) {
              if (res) {                
                console.log(res.data.light.newlight);
            }
          }
          else{
            console.log(res.status);
          }
        }).catch((err) => {
            console.log(err)
          });
      }

      const Updatedataindatabase = (id) => {

        const updated_data = {
          "lightId":lightId,
          "lightName":lightName,
          "location":location,
          "marker":marker,
          "model":model,
          "illumination":illumination,
          "illuminationTime":illuminationTime,
          "wattage":wattage,
          "design":design,
          "power":power,
          "deploymentDate":deploymentDate,
          "installationDate":installationDate,
          "cloudStatus":cloudStatus,
          "workingStatus":workingStatus,
          "activeStatus":activeStatus,
          "userId":userId
        }
        // console.log(updated_data);
        axios.put("http://localhost:3001/api/light/updateLightDetails?id="+id,updated_data).then(async (res) => {
            if (res.status === 200) {
              if (res) {                
                console.log(res.data.light.newlight);
            }
          }
          else{
            console.log(res.status);
          }
        }).catch((err) => {
            console.log(err)
          });
        
      }

    return(
        <>        
        <div className="text-left">
            <h5>Device List</h5>
            <Table table className='list-table'>
                <thead>
                <tr>
                    <th className='light-grey'>Device ID</th>                    
                    <th className='light-grey'>Device Name</th>                       
                    <th className='light-grey'>View</th>
                    <th className='light-grey'>Update</th>
                    <th className='light-grey'>Delete</th>                    
                </tr>
                </thead>
                
                {lightdetails.map((data) => (
                    <tr className='list-tr'>
                        <td>{data.lightId}</td>
                        <td style={textStyle}>{data.lightName}</td>
                        <td><button style ={buttonStyle} onClick={ () => view(data) }>View</button></td>
                        <td><button style ={buttonStyle} onClick={ () => update(data._id, data) }>Update</button></td>
                        <td><button style ={buttonStyle} onClick={ () => removedata(data._id) }>Delete</button></td>
                    </tr>
                ))}                                    
            </Table>
        </div>
        <button className='curved-corners' style = {{width : 'fit-content', color: "white", background: "teal", padding: "10px", marginLeft: "1.5em"}} onClick={addlight}>Add a Device + </button>
        <form className='add-device' style = {hideform ? noneStyle:blockstyle} onSubmit = {onsubmitaction}>
            <input type="hidden" name = "device_id" value = {_id}/>
            <div><label>Device Name:</label></div>
            <div><input type="text" name = "dname" style={textStyle} value = {lightName} onChange = {(e) => (setLightName(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Device ID:</label></div>
            <div><input type="text" name = "did" style={textStyle} value = {lightId} onChange = {(e) => (setLightId(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Marker:</label></div>
            <div><input type="text" name = "dman" style={textStyle} value = {marker} onChange = {(e) => (setmarker(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Location:</label></div>
            <div><input type="text" name = "dloc"style={textStyle}  value = {location} onChange = {(e) => (setlocation(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Model:</label></div>
            <div><input type="text" name = "dmodel" style={textStyle} value = {model} onChange = {(e) => (setmodel(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Illumination:</label></div>
            <div><input type="text" name = "dacap" style={textStyle} value = {illumination} onChange = {(e) => (setillumination(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Illumination Time:</label></div>
            <div><input type="text" name = "dins" style={textStyle} value = {illuminationTime} onChange = {(e) => (setilluminationTime(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Design:</label></div>
            <div><input type="text" name = "dmeaacc" style={textStyle} value = {design} onChange = {(e) => (setDesign(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Wattage:</label></div>
            <div><input type="text" name = "ddime" style={textStyle} value = {wattage} onChange = {(e) => (setwattage(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Installation Date:</label></div>
            <div><input type="text" name = "dins" style={textStyle} value = {installationDate} onChange = {(e) => (setinstallationDate(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Deployment Date:</label></div>
            <div><input type="text" name = "ddep"style={textStyle}  value = {deploymentDate} onChange = {(e) => (setdeploymentDate(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Power:</label></div>
            <div><input type="text" name = "ddep"style={textStyle}  value = {power} onChange = {(e) => (setPower(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Cloud Status:</label></div>
            <div><input type="text" name = "ddep"style={textStyle}  value = {cloudStatus} onChange = {(e) => (setcloudStatus(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Working Status:</label></div>
            <div><input type="text" name = "ddep"style={textStyle}  value = {workingStatus} onChange = {(e) => (setworkingStatus(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Active Status:</label></div>
            <div><input type="text" name = "dpower" style={textStyle} value = {activeStatus} onChange = {(e) => (setactiveStatus(e.target.value))} disabled = {isdisabled}/></div>
            <button className='curved-corners' style={showsubmit? formButton:noneStyle} type='submit'>Submit</button>
        </form>
        </>
    )
}