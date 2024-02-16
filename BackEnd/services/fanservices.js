const { type } = require("express/lib/response");
const Fan = require("../model/fan");
const SimulatedFan = require("../model/simulated_fan");
const { SimulatedFanServices } = require("./SimulatedFanServices")
const { default: mongoose } = require("mongoose");

class FanServices {


            
        static getFandetails = async (data) => {
            console.log(data)
                try {
                  //  const foundFans = await Fan.findById(id); 
                  //let foundFans = await Fan.find(id.userId);
                  const query = {
                    userId : data.userId,                             
            }
        let foundFans = await Fan.find({"userId": query["userId"] });  

                    if(foundFans != [])
                    {
                        console.log(foundFans);
                        return foundFans;
                    }
                    else{
                        console.log('no user found');
                    }
                    
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while logging in")
                }
        }


        static updateFanDetails = async (id,data) => {
            try {
                const query = { 
                    _id: id
                };
                
                const updatedFan = await Fan.findOneAndUpdate(query,data);
        
                if(updatedFan)
                {
                    return { updatedFan }
                }
                                   
            }
            catch(err){
                    console.log(err);
                    console.log("Some unexpected error occured while updating fan")
            }
        }
            // we dont have a ctrl api for this yet we are confused if we will use post or put or patch....
            static deleteFandetails = async (data) => {
                try {
                    const query = { 
                        _id: data.id
                    };
                    
                    const oldFan = await Fan.remove(query);
            
                    console.log(oldFan)
                    return {oldFan};
                                       
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while deleting electric meter")
                }
            }

            static addFandetails = async (data) => {
                console.log(data)
                    try {
                        //     const newvalues = { 
                        //       fanId : data.fanId,
                        //       fanName: data.fanName,
                        //       marker: data.marker,
                        //       model: data.model,
                        //       location: data.location,
                        //       speed: data.speed,
                        //       weight: data.weight,
                        //       dimensions: data.dimesions,
                        //       design: data.design,
                        //       deploymentDate: data.deploymentDate,
                        //       installationDate: data.installationDate,
                        //       power: data.power,
                        //       cloudStatus: data.cloudStatus,
                        //       workingStatus: data.workingStatus,
                        //       activeStatus: data.activeStatus,
                        //       monthlyUsage: data.monthlyUsage,
                        //       weeklyUsage: data.weeklyUsage,
                        //       userId: data.userId
                        // };
                        const newFan = new Fan(data);
                        await newFan.save()

                        //adding new simulated data for the same
                        const newSimulatedFan = {
                                fan_name: data.fanName,
                                fan_id: data.fanId,
                                userId: data.userId,
                                Voltage: "10V",
                                Current: "5A",
                                Fan_Speed: 0,
                                Speed_Number: 0,
                                Rotation_Pattern: "clock-wise",
                                work_status:"false"
                        }
                        let temp = await SimulatedFanServices.addSimulatedFan(newSimulatedFan);
                        return {newFan};                   
                    }
                    catch(err){
                            console.log(err);
                            console.log("Some unexpected error occured while logging in")
                    }
            }

            static updateFanCloudStatus = async (data,reqbody) => {
                //  console.log(data)
                      try {
                  
                              var query = { id : data.id };
                              var newvalues = {cloudStatus: reqbody.cloudStatus};
  
                              let updatedFan = await Fan.findOneAndUpdate(query, newvalues); 
                              console.log(updatedFan);        
                              console.log("ashly");         
   
                                  if(updatedFan)
                                  {
                                      console.log(updatedFan);
                                      return updatedFan;
                                  }
                                  else{
                                       //   console.log(updatedFan);
                                  }                        
                              }
                      catch(err){
                            //  console.log(err);
                            //  console.log("Some unexpected error occured while logging in")
                      }
              }
              static updateWorkingStatus = async (data,reqbody) => {
                //  console.log(data)
                      try {
                  
                              var query = { id : data.id };
                              var newvalues = {workingStatus: reqbody.workingStatus};
  
                              let updatedFan = await Fan.findOneAndUpdate(query, newvalues); 
                              console.log(updatedFan);        
   
                                  if(updatedFan)
                                  {
                                      console.log(updatedFan);
                                      return updatedFan;
                                  }
                                  else{
                                       //   console.log(updatedFan);
                                  }                        
                              }
                      catch(err){
                            //  console.log(err);
                            //  console.log("Some unexpected error occured while logging in")
                      }
              }
              
              static updateActiveStatus = async (data,reqbody) => {
                //  console.log(data)
                      try {
                  
                              var query = { id : data.id };
                              var newvalues = {activeStatus: reqbody.activeStatus};
  
                              let updatedFan = await Fan.findOneAndUpdate(query, newvalues); 
                              console.log(updatedFan);           
                                  if(updatedFan)
                                  {
                                      console.log(updatedFan);
                                      return updatedFan;
                                  }
                                  else{
                                       //   console.log(updatedFan);
                                  }                        
                              }
                      catch(err){
                            //  console.log(err);
                            //  console.log("Some unexpected error occured while logging in")
                      }
              }
}


module.exports.FanServices = FanServices;