const simulated_light = require("../model/simulated_light");
const { IoTServices } = require("./IoTServices");

class SimulatedLightServices {
    static getSimulatedLights = async(id) => {
        console.log(id)
                try {
                    let foundLights = await simulated_light.find({"userId": id });
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

    static getSimulatedLight = async(id) => {
        console.log(id)
                try {
                    let foundLight = await simulated_light.find({"_id": id });
                    if(foundLight != [])
                    {
                        console.log(foundLight);
                        return foundLight;
                    }
                    else{
                        console.log('no light found');
                    }
                    
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while logging in")
                }
    }

    static addSimulatedLight = async (data) => {
        console.log(data)
        try {
            const newFan = new simulated_light(data);
            await newFan.save()
            const simulatedLights = await this.getSimulatedLights(newFan.userId);
            await IoTServices.publishonIoT(simulatedLights, 'light_device');
            return {newFan};
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while adding electric meter")
        }
    }

    static updateSimulatedLight = async (id, data) => {
        try {
            const query = { 
                _id: id
            };
            
            const updatedLight = await simulated_light.findOneAndUpdate(query,data);

            if(updatedLight)
            {
                const simulatedLights = await this.getSimulatedLights(newFan.userId);
                await IoTServices.publishonIoT(simulatedLights, 'light_device');
                return { updatedLight }
            }
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while updating electric meter")
        }
    }

    static updateWorkingStatus = async (id, data) => {
        try {
            const query = { 
                _id: id
            };
            
            const updatedStatus = await simulated_light.findOneAndUpdate(query,data);

            if(updatedStatus)
            {
                return { updatedStatus }
            }
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while updating working status")
        }
    }


    static updateEfficacy = async (id, data) => {
        try {
            const query = { 
                _id: id
            };
            
            const updatedEfficacy = await simulated_light.findOneAndUpdate(query,data);

            if(updatedEfficacy)
            {
                return { updatedEfficacy }
            }
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while updating luminous efficacy")
        }
    }


    static updateFlux = async (id, data) => {
        try {
            const query = { 
                _id: id
            };
            
            const updatedFlux = await simulated_light.findOneAndUpdate(query,data);

            if(updatedFlux)
            {
                return { updatedFlux }
            }
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while updating luminous flux")
        }
    }


    static updateIntensity = async (id, data) => {
        try {
            const query = { 
                _id: id
            };
            
            const updateIntensity = await simulated_light.findOneAndUpdate(query,data);

            if(updateIntensity)
            {
                return { updateIntensity }
            }
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while updating luminous intensity")
        }
    }

}







module.exports.SimulatedLightServices = SimulatedLightServices;

/**
 * sample 
 * 
 {
    "light_name": "Light 001",
    "light_id": "lig001",
    "Voltage": "5V",
    "Current": "10A",
    "Luminious_Efficacy": "55",
    "Luminious_Flux": "0.9",
    "Luminious_Intensity": 1,
    "work_status": "true"
}
 */