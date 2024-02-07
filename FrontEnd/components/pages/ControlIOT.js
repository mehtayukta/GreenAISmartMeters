import React from 'react'
import '../../styles/Buttons.css'
import '../../styles/Control.css'
import Table from 'react-bootstrap/Table'
import light from '../../assets/images/light-meter-icon.png'
import fan from '../../assets/images/fan-meter-icon.jpg'
import ToggleSwitch from '../ToggleSwitch'
import settings from '../../assets/images/settings-icon.png'
import Box from '@mui/material/Box'
import {FaLightbulb, FaFan} from 'react-icons/fa'
import { useState } from 'react'


function ControlIOT() {
  const [iot, setIOT] = useState('Light');
  const [setting, setSetting] = useState('');
  const [type, setType] = useState('TCP/IP')
  const [data, setData] = useState('30 seconds')
  const [load, setLoad] = useState('AC Loads')
  return (
    
    <div className="table-wrapper">
      <br></br>
      <div style={{display:'flex', justifyContent: "center"}}>
      <button className='light-grey curved-corners selection-button Light' onClick={(e) => setIOT('Light')}>
        Light
      </button>
      <button className='light-grey curved-corners selection-button Fan' onClick={(e) => setIOT('Fan')}>
        Fan
      </button>
      </div>
      <br></br>
      <Box style={{textAlign:'center', backgroundColor:'#323232', color:'white', border:'1px solid white', padding:15, width:'20%', borderRadius:'1vh'}}> <h6>Device List</h6></Box>
      <Table hover className='control-table'>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Device Name</th>
            <th>Active/Deactive</th>
            <th>Start/Stop</th>
            <th>Connect to cloud</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr className='list-tr'>
            <td>{iot==='Light'?<FaLightbulb size={25} color={'black'} alt="light bulb image" />:<FaFan size={25} color={'black'} alt='fan image'/>}&ensp;{iot==='Light'? 'LIOT':'FIOT'}001</td>
            <td>{iot} Meter 1</td>
            <td><ToggleSwitch type='a'/></td>
            <td><ToggleSwitch type='s'/></td>
            <td><ToggleSwitch type='c'/></td>
            <td> <img width="30" src={settings} onClick={(s) => setSetting('setting')}/></td>
          </tr>
          <tr className='list-tr'>
            <td>{iot==='Light'?<FaLightbulb size={25} color={'black'} alt="light bulb image" />:<FaFan size={25} color={'black'} alt='fan image'/>}&ensp;{iot==='Light'? 'LIOT':'FIOT'}002</td>
            <td>{iot} Meter 2</td>
            <td><ToggleSwitch type='a'/></td>
            <td><ToggleSwitch type='s'/></td>
            <td><ToggleSwitch type='c'/></td>
            <td><img width="30" src={settings} onClick={(s) => setSetting('setting')}/></td>
          </tr>
          <tr className='list-tr'>
            <td>{iot==='Light'?<FaLightbulb size={25} color={'black'} alt="light bulb image" />:<FaFan size={25} color={'black'} alt='fan image'/>}&ensp;{iot==='Light'? 'LIOT':'FIOT'}003</td>
            <td>{iot} Meter 3</td>
            <td><ToggleSwitch type='a'/></td>
            <td><ToggleSwitch type='s'/></td>
            <td><ToggleSwitch type='c'/></td>
            <td><img width="30" src={settings} onClick={(s) => setSetting('setting')}/></td>
          </tr>
          <tr className='list-tr'>
            <td>{iot==='Light'?<FaLightbulb size={25} color={'black'} alt="light bulb image" />:<FaFan size={25} color={'black'} alt='fan image'/>}&ensp;{iot==='Light'? 'LIOT':'FIOT'}004</td>
            <td>{iot} Meter 4</td>
            <td><ToggleSwitch type='a'/></td>
            <td><ToggleSwitch type='s'/></td>
            <td><ToggleSwitch type='c'/></td>
            <td><img width="30" src={settings} onClick={(s) => setSetting('setting')}/></td>
          </tr>
          <tr className='list-tr'>
            <td>{iot==='Light'?<FaLightbulb size={25} color={'black'} alt="light bulb image" />:<FaFan size={25} color={'black'} alt='fan image'/>}&ensp;{iot==='Light'? 'LIOT':'FIOT'}005</td>
            <td>{iot} Meter 5</td>
            <td><ToggleSwitch type='a'/></td>
            <td><ToggleSwitch type='s'/></td>
            <td><ToggleSwitch type='c'/></td>
            <td><img width="30" src={settings} onClick={(s) => setSetting('setting')}/></td>
          </tr>
          <tr className='list-tr'>
            <td>{iot==='Light'?<FaLightbulb size={25} color={'black'} alt="light bulb image" />:<FaFan size={25} color={'black'} alt='fan image'/>}&ensp;{iot==='Light'? 'LIOT':'FIOT'}006</td>
            <td>{iot} Meter 6</td>
            <td><ToggleSwitch type='a'/></td>
            <td><ToggleSwitch type='s'/></td>
            <td><ToggleSwitch type='c'/></td>
            <td><img width="30" src={settings} onClick={(s) => setSetting('setting')}/></td>
          </tr>
          <tr className='list-tr'>
            <td>{iot==='Light'?<FaLightbulb size={25} color={'black'} alt="light bulb image" />:<FaFan size={25} color={'black'} alt='fan image'/>}&ensp;{iot==='Light'? 'LIOT':'FIOT'}007</td>
            <td>{iot} Meter 7</td>
            <td><ToggleSwitch type='a'/></td>
            <td><ToggleSwitch type='s'/></td>
            <td><ToggleSwitch type='c'/></td>
            <td><img width="30" src={settings} onClick={(s) => setSetting('setting')}/></td>
          </tr>
          </tbody>
      </Table>
      <br></br>
      {setting==='setting'?
      <div className='control-setting'>
        <Box style={{textAlign:'center', backgroundColor:'#323232', border:'1px solid white', borderRadius:10, padding:'10px 10px', width:'20%', marginBottom:10}} > <h6>Configuration</h6></Box>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexShrink:0, width:'80%', margin:'auto'}}>
          <label htmlFor="type">
            Select Communication Protocol
            <br></br>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value = "Empty"></option>
              <option value="TCP">TCP/IP</option>
              <option value="Arrival">UDP</option>
            </select>
          </label>
          <label htmlFor="type">
            Select Data Reporting Intervals
            <br></br>
            <select id="type" value={data} onChange={(e) => setData(e.target.value)}>
              <option value = "Empty"></option>
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
            </select>
          </label>
          <label htmlFor="type">
            Select Electronic Loads
            <br></br>
            <select id="type" value={load} onChange={(e) => setLoad(e.target.value)}>
              <option value = "Empty"></option>
              <option value="AC">AC Loads</option>
              <option value="DC">DC Loads</option>
            </select>
          </label>
        </div>
        <div style={{display:'flex', justifyContent: "center"}}><button className='light-grey curved-corners' style={{border:"1px solid rgba(0, 0, 0, 0.5)",fontSize:"15px" ,width:"100px", color: 'black'}}><h6>Confirm</h6></button></div>
      </div>
      :null}

    </div>
  )
}

export default ControlIOT
