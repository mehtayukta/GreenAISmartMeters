import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun,FaBell,FaCloud,FaCamera,FaBatteryFull,FaHouseUser,FaDashcube,FaParagraph,FaCalendar,FaFacebookMessenger,FaEnvelope,FAGear, FaSquare, FaAngular } from 'react-icons/fa';

import '../../App.css'
//import bg from '../../assets/images/bg.png'
import {Line} from 'react-chartjs-2'
import MyToast from '../MyToast'
import '../../styles/LoginPage.css'

import { Chart as ChartJS,LineController,LineElement,Title,Tooltip,Legend,CategoryScale,LinearScale,PointElement} from 'chart.js' 
ChartJS.register(
    Title,Tooltip,Legend,LineElement,
    CategoryScale,LinearScale,PointElement
)



const LoginPage = () =>  {

    const [overviewColor,setoverviewColor]=useState(0);
    const [solarColor,setsolarColor]=useState(0);
    const [storageColor,setstorageColor]=useState(0);
    const [cameraColor,setcameraColor]=useState(0);
    const [iotColor,setiotColor]=useState(0);
    const [data,setData]=useState({
        labels:[0,1,2,3,4,5,6,7,8,9,10],
        datasets:[
            {
                label:"Data Set",
               
                data:[10,20,30,42,51,82,31,59,61,73,91,40],
               
                borderColor:"blue",
                tension:0.5,
                pointRadius:0
            }
        ]
    })
    var options = {
        scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: true
              }
            }
          }
    }
  
    return (
        
  
        
     <div className='loginStyle' style={{height:'100%',display:'flex',flexDirection:'row'}}>
         <div style={{display:'flex',backgroundColor:'#363740',width:'20%',display:'flex',flexDirection:'column'}}>
             <div style={{height:'15%',flexDirection:'row',display:'flex',justifyContent:'center',paddingTop:'10%'}}>
                 <div style={{height:30,width:30,borderRadius:15,backgroundColor:'green',justifyContent:'center',alignItems:'center',display:'flex',marginRight:5}}>
                   <h4 style={{textAlign:'center',color:'white',paddingTop:10}}>G</h4>
                    


                 </div>
                 <h5 style={{color:'#9FA2B4',paddingTop:5}}>Green Cloud</h5>


             </div>
             <div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaHouseUser size={13} color={'gray'} style={{alignSelf:'center'}}/>
    <h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Home</h7>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaDashcube size={13} color={'gray'} style={{alignSelf:'center'}}/>
    <h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Dashboard</h7>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaAngular size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Analytics</h7>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaSquare size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Services</h7>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaCalendar size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h7 style={{color:"gray",marginLeft:5}}>Calender</h7>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaFacebookMessenger size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Messages</h7>
</div>
<div style={{height:1,backgroundColor:'gray'}}>

</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center',fontSize:14}}>
    <FaSun size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h7 style={{color:"gray",marginLeft:5}}>Settings</h7>
</div>
<div style={{display:'flex',marginLeft:'10%',height:40,alignItems:'center'}}>
    <FaEnvelope size={13} color={'gray'} style={{alignSelf:'center',fontSize:14}}/>
    <h7 style={{color:"gray",marginLeft:5,fontSize:14}}>Subscription</h7>
</div>
             <div>

             </div>
          

         </div>
  <div style={{display:'flex',width:'100%',flexDirection:'column'}}>
  
 {solarColor?
 <div>


          
             <div style={{borderRadius:5,border:'1px solid lightGray',marginTop:'5%',flexDirection:'row',display:'flex',height:300}}>
                 <div style={{width:'70%',borderLeft:'1px solid lightGray',marginTop:10,marginBottom:10}}>
                   
                 <Line 
                 
             options={options}
             data={data}>hello</Line>

                 </div>
                 <div style={{width:'30%',height:500}}>
                 <div style={{borderLeft:'1px solid lightGray'}}>

       
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    449

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    426

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    33

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',borderBottom:'1px solid lightGray',fontWeight:'bold'}}>
    3h 8m

</div>
<div style={{height:60,display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
    94%

</div>
</div>

                     
                     

                 </div>
            

             </div>
             <div style={{display:'flex',flexDirection:'row',marginTop:'5%',}}>
                 <div style={{width:'50%',paddingLeft:10,borderRadius:5,border:'1px solid lightgray',paddingRight:10,paddingTop:10}}>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between'}}>
                     <h6 style={{fontSize:16,fontFamily:'-moz-initial',fontWeight
                    :'bold'}}>Unresolved tickets</h6>
                    <a style={{color:'blue',fontSize:12}}>View details</a>

                     </div>
                     <div style={{fontWeight:'initial',fontSize:12,marginBottom:25}}>
                         Group : Support
                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Waiting on feature request</h6>
                    <a style={{color:'gray',fontSize:12}}>13</a>

                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Awaiting cuteomer response</h6>
                    <a style={{color:'gray',fontSize:12}}>45</a>

                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Awaiting developer fix</h6>
                    <a style={{color:'gray',fontSize:12}}>60</a>

                     </div>
                     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',height:40,alignItems:'center',borderBottom:'1px solid lightgray'}}>
                     <h6 style={{fontSize:13,fontFamily:'-moz-initial',fontWeight
                    :'bold',color:'#252733'}}>Pending</h6>
                    <a style={{color:'gray',fontSize:12}}>281</a>

                     </div>
        
                     

                 </div>
             <div style={{width:'50%'}}>
                

             </div>
         </div>
         </div>:storageColor?<div>Storage</div>:null}
            
            
            
             

         </div>
        
       

     </div>
    )



}
export{LoginPage}