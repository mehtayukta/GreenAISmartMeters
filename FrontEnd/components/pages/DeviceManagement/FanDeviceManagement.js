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

export const FanDeviceManagement = () => {
    
    let [fandetails, setFandetails] = useState([]);
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
    const [fanId, setFanId] = useState("");
    const [fanName, setfanName] = useState("");
    const [location, setlocation] = useState("");
    const [marker, setmarker] = useState("");
    const [model, setmodel] = useState("");
    const [speed, setSpeed] = useState("");
    const [weight, setWeight] = useState("");
    const [design, setDesign] = useState("");
    const [power, setPower] = useState("");
    const [dimensions, setdimensions] = useState("");
    const [deploymentDate, setdeploymentDate] = useState("");
    const [installationDate, setinstallationDate] = useState("");
    const [cloudStatus, setcloudStatus] = useState(1);
    const [workingStatus, setworkingStatus] = useState(1);
    const [activeStatus, setactiveStatus] = useState(1);
    const [userId, setuserId] = useState("637220a2858bb384838f8286");
    

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        axios.get("http://localhost:3001/api/fan/getFanDetails?userId=637220a2858bb384838f8286").
        then(async (res) => {
            console.log("success", res);
            if (res.status == 200) {
              if (res) {
                console.log(res.data.user);
                setFandetails(res.data.user);
                console.log(fandetails);
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
        let Fan = data;
        setId(Fan._id);
        setFanId(Fan.fanId);
        setfanName(Fan.fanName);
        setSpeed(Fan.speed);
        setlocation(Fan.location);
        setmarker(Fan.marker);
        setmodel(Fan.model);
        setWeight(Fan.weight);
        setPower(Fan.power);
        setDesign(Fan.design);
        setdeploymentDate(Fan.deploymentDate);
        setinstallationDate(Fan.installationDate);
        setdimensions(Fan.dimensions);
        setcloudStatus(Fan.cloudStatus);
        setworkingStatus(Fan.workingStatus);
        setactiveStatus(Fan.activeStatus);
        setuserId(Fan.userId);

               

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

        axios.delete("http://localhost:3001/api/fan/deleteFandetails?id="+id).
        then(async (res) => {
            console.log("success", res);
            if (res.status == 200) {
              if (res) {
                console.log(res.data.user.oldFan.deletedCount);
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

      const addfan = (e) => {
        setisDisabled(false);
        setHideform(false);
        setshowSubmit(true);
        setFanId("");
        setfanName("");
        setSpeed("");
        setlocation("");
        setmarker("");
        setmodel("");
        setWeight("");
        setPower("");
        setDesign("");
        setdeploymentDate("");
        setinstallationDate("");
        setdimensions("");
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
          "fanId":fanId,
          "fanName":fanName,
          "location":location,
          "marker":marker,
          "model":model,
          "speed":speed,
          "weight":weight,
          "design":design,
          "dimensions":dimensions,
          "deploymentDate":deploymentDate,
          "installationDate":installationDate,
          "power":power,
          "cloudStatus": 1,
          "workingStatus": 1,
          "activeStatus" : 1,
          "userId" : "637220a2858bb384838f8286"
        }

        axios.post("http://localhost:3001/api/fan/addFandetails",new_data).then(async (res) => {
            if (res.status === 200) {
              if (res) {                
                console.log(res.data.fan.newfan);
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
          "fanId":fanId,
          "fanName":fanName,
          "location":location,
          "marker":marker,
          "model":model,
          "speed":speed,
          "weight":weight,
          "design":design,
          "dimensions":dimensions,
          "deploymentDate":deploymentDate,
          "installationDate":installationDate,
          "power":power,
          "cloudStatus": cloudStatus,
          "workingStatus": workingStatus,
          "activeStatus" : activeStatus,
          "userId" : userId
        }
        console.log(updated_data);
        axios.put("http://localhost:3001/api/fan/updateFandetails?id="+id,updated_data).then(async (res) => {
            if (res.status === 200) {
              if (res) {                
                console.log(res.data.fan.newfan);
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
                
                {fandetails.map((data) => (
                    <tr className='list-tr'>
                        <td>{data.fanId}</td>
                        <td style={textStyle}>{data.fanName}</td>
                        <td><button style ={buttonStyle} onClick={ () => view(data) }>View</button></td>
                        <td><button style ={buttonStyle} onClick={ () => update(data._id,data) }>Update</button></td>
                        <td><button style ={buttonStyle} onClick={ () => removedata(data._id) }>Delete</button></td>
                    </tr>
                ))}                                    
            </Table>
        </div>
        <button className='curved-corners' style = {{width : 'fit-content', color: "white", background: "teal", padding: "10px", marginLeft: "1.5em"}} onClick={addfan}>Add a Device + </button>
        <form className='add-device' style = {hideform ? noneStyle:blockstyle} onSubmit = {onsubmitaction}>
            <input type="hidden" name = "device_id" value = {_id}/>
            <div><label>Device Name:</label></div>
            <div><input type="text" name = "dname" style={textStyle} value = {fanName} onChange = {(e) => (setfanName(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Device ID:</label></div>
            <div><input type="text" name = "did" style={textStyle} value = {fanId} onChange = {(e) => (setFanId(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Marker:</label></div>
            <div><input type="text" name = "dman" style={textStyle} value = {marker} onChange = {(e) => (setmarker(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Location:</label></div>
            <div><input type="text" name = "dloc"style={textStyle}  value = {location} onChange = {(e) => (setlocation(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Model:</label></div>
            <div><input type="text" name = "dmodel" style={textStyle} value = {model} onChange = {(e) => (setmodel(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Speed:</label></div>
            <div><input type="text" name = "dacap" style={textStyle} value = {speed} onChange = {(e) => (setSpeed(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Weight:</label></div>
            <div><input type="text" name = "dins" style={textStyle} value = {weight} onChange = {(e) => (setWeight(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Design:</label></div>
            <div><input type="text" name = "dmeaacc" style={textStyle} value = {design} onChange = {(e) => (setDesign(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Dimensions:</label></div>
            <div><input type="text" name = "ddime" style={textStyle} value = {dimensions} onChange = {(e) => (setdimensions(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Deployment Date:</label></div>
            <div><input type="text" name = "ddep"style={textStyle}  value = {deploymentDate} onChange = {(e) => (setdeploymentDate(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Installation Date:</label></div>
            <div><input type="text" name = "ddep"style={textStyle}  value = {installationDate} onChange = {(e) => (setinstallationDate(e.target.value))} disabled = {isdisabled}/></div>
            <div><label>Power:</label></div>
            <div><input type="text" name = "dpower" style={textStyle} value = {power} onChange = {(e) => (setPower(e.target.value))} disabled = {isdisabled}/></div>
           <button className='curved-corners' style={showsubmit? formButton:noneStyle} type='submit'>Submit</button>
        </form>
        </>
    )
}