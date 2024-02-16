import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import GaugeChart from 'react-gauge-chart'
import Thermometer from 'react-thermometer-chart'
import { Line } from 'rc-progress';
import {IoBulbOutline} from 'react-icons/io5';

export const Adminmetrics = () => {
  return (
    <div className='text-left'>
    <Dropdown>
      <Dropdown.Toggle style={{width: "10em", background: "teal", color: "white"}} variant="success" id="dropdown-basic">
        SJSU  buildings
      </Dropdown.Toggle>

      <Dropdown.Menu style={{width: "10em", background: "teal", color: "white"}}>
        <Dropdown.Item style={{width: "10em", background: "teal", color: "white"}} >LIBRARY</Dropdown.Item>
        <Dropdown.Item style={{width: "10em", background: "teal", color: "white"}}>SCIENCE</Dropdown.Item>
        <Dropdown.Item style={{width: "10em", background: "teal", color: "white"}}>ADMINISTRATION</Dropdown.Item>
        <Dropdown.Item style={{width: "10em", background: "teal", color: "white"}}>ENGINEERING</Dropdown.Item>
        <Dropdown.Item style={{width: "10em", background: "teal", color: "white"}}>SPORTS</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <div style={{display: 'flex'}}>
      <div className='guage'>
      <span style={{fontSize:'30px'}}>Humiditity </span>
    <GaugeChart  
          animate={true} 
          nrOfLevels={10} 
          percent={0.50}
          colors={['#008000']} 
          needleColor="#35243" 
          textColor={'black'}
          fontSize = {65} 
        /> </div>
        <div className='guage'>
        <span style={{fontSize:'30px'}}> Temperature </span>
        <Thermometer width="150px" height="300px" steps={10} minValue={10} maxValue={100} currentValue={20}> 
        </Thermometer>
         </div>
        
      </div>
  
      <div style={{display: 'flex'}}>
        
        <div className='guage'>
        <span style={{fontSize:'30px'}}> Light luminosity </span>
        <br/>
        <Line percent={50} strokeWidth={2} strokeColor="orange" /> 
        <IoBulbOutline style={{ fontSize: '220px' }}/></div>
        <div className='guage'>
        <span style={{fontSize:'30px'}}> Fan speed </span>
        <GaugeChart  
          animate={true} 
          nrOfLevels={5} 
          colors={['#FF7F50']}
          arcPadding={0.02} 
          needleColor="#345243" 
          textColor={'black'}
        /> </div>
    </div>
    </div>
  );
}


