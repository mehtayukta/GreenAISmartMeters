import React, {useState} from "react";
import axios from "axios";
import "../styles/ToggleSwitch.css";

function ToggleSwitch({activeStatus, meterId, gettoggle, type}) {

 
  const [isToggled, setIsToggled] = useState(activeStatus);
  const onToggle = () => {
    
    let toggleValue =  setIsToggled(!isToggled)
    axios.patch("http://localhost:3001/api/meter/updateMeter?id=" +meterId, toggleValue).
    then(async (res) => {
      if (res.status == 200) {
        if (res) {
        }            
      }
      else {
          console.log(res.status);
      }
    }).catch((err) => {
      console.log(err)
    });
    
  };

  
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" id={type} />
    </label>
  );
}
export default ToggleSwitch;
