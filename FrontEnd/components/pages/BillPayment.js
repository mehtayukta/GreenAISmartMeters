import React from 'react'
import '../../styles/Buttons.css'
import Table from 'react-bootstrap/Table'
import energy from '../../assets/images/energy-meter-icon.png'
import water from '../../assets/images/water-meter-icon.png'
import ToggleSwitch from '../ToggleSwitch'
import settings from '../../assets/images/settings-icon.png'
import Box from '@mui/material/Box'
import { useState } from 'react'
import ControlMeter from './ControlMeter'
import BillingCard from './BillingCard'

export const BillPayment = () => {
  const [meter, setMeter] = useState('');
  return (
    
    <div className="table-wrapper" >
      <br></br>
      <h2>Billing Information</h2>
      <h3>Bill Payment</h3>
      <BillingCard ></BillingCard>
    </div>
  )
}

