const { type } = require("express/lib/response");
const Light = require("../model/light");
const { default: mongoose } = require("mongoose");
const { SimulatedLightServices } = require("./SimulatedLightServices")

class LightServices {

            
        static getLightdetails = async (data) => {
            console.log(data)
                try {
                        const query = {
                                userId : data.userId,                             
                        }
                    let foundLights = await Light.find({"userId": query["userId"] });           
                   // const foundLights =  await Light.findById(id); 
                    if(foundLights != [])
                    {
                        console.log(foundLights);
                        return foundLights;
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

        static updateLightdetails = async (id,data) => {
                console.log(data)
                    try {
                         
                        const query = { 
                                _id: id
                            };
                            
                            const updatedLight = await Light.findOneAndUpdate(query,data);
                    
                            if(updatedLight)
                            {
                                return { updatedLight }
                            }
                                  
                    }
                    catch(err){
                            console.log(err);
                            console.log("Some unexpected error occured while logging in")
                    }
            }


            static deleteLightdetails = async (data) => {
                try {
                    const query = { 
                        _id: data.id
                    };
                    
                    const oldLight = await Light.remove(query);
            
                    console.log(oldLight)
                    return {oldLight};
                                       
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while deleting light")
                }
            }


            static addLightdetails = async (data) => {
                console.log(data)
                    try {
                            const newvalues = { 
                                lightId: data.lightId,
                              lightName: data.lightName,
                              marker: data.marker,
                              model: data.model,
                              location: data.location,
                              illumination: data.illumination,
                              illuminationTime: data.illuminationTime,
                              wattage: data.wattage,
                              design: data.design,
                              deploymentDate: data.deploymentDate,
                              installationDate: data.installationDate,
                              power: data.power,
                              cloudStatus: data.cloudStatus,
                              workingStatus: data.workingStatus,
                              activeStatus: data.activeStatus,
                              userId: data.userId
                        };
                        console.log(data);
                        const newLight = new Light(data);
                        await newLight.save()

                        //adding new simulated data for the same
                        const newSimulatedLight = {
                                light_name: data.lightName,
                                light_id: data.lightId,
                                userId: data.userId,
                                Voltage: "10V",
                                Current: "5A",
                                Luminious_Efficacy: '0',
                                Luminious_Flux: '0',
                                Luminious_Intensity: '0',
                                work_status:"false"
                        }
                        let temp = await SimulatedLightServices.addSimulatedLight(newSimulatedLight);

                        return {newLight};                   
                    }
                    catch(err){
                            console.log(err);
                            console.log("Some unexpected error occured while logging in")
                    }
            }




            static updateLightCloudStatus = async (data,reqbody) => {
                //  console.log(data)
                      try {
                  
                              var query = { id : data.id };
                              var newvalues = {cloudStatus: reqbody.cloudStatus};
  
                              let updatedLight = await Light.findOneAndUpdate(query, newvalues); 
                              console.log(updatedLight);        
   
                                  if(updatedLight)
                                  {
                                      console.log(updatedLight);
                                      return updatedLight;
                                  }
                                  else{
                                          console.log(updatedLight);
                                  }                        
                              }
                      catch(err){
                              console.log(err);
                              console.log("Some unexpected error occured while logging in")
                      }
              }
              static updateWorkingStatus = async (data,reqbody) => {
                      try {
                  
                              var query = { id : data.id };
                              var newvalues = {workingStatus: reqbody.workingStatus};
  
                              let updatedLight = await Light.findOneAndUpdate(query, newvalues); 
                              console.log(updatedLight);        
   
                                  if(updatedLight)
                                  {
                                      console.log(updatedLight);
                                      return updatedLight;
                                  }
                                  else{
                                          console.log(updatedLight);
                                  }                        
                              }
                      catch(err){
                              console.log(err);
                              console.log("Some unexpected error occured while logging in")
                      }
              }
              
              static updateActiveStatus = async (data,reqbody) => {
                //  console.log(data)
                      try {
                  
                              var query = { id : data.id };
                              var newvalues = {activeStatus: reqbody.activeStatus};
  
                              let updatedLight = await Light.findOneAndUpdate(query, newvalues); 
                              console.log(updatedLight);           
                                  if(updatedLight)
                                  {
                                      console.log(updatedLight);
                                      return updatedLight;
                                  }
                                  else{
                                          console.log(updatedLight);
                                  }                        
                              }
                      catch(err){
                              console.log(err);
                              console.log("Some unexpected error occured while logging in")
                      }
              }
}


module.exports.LightServices = LightServices;