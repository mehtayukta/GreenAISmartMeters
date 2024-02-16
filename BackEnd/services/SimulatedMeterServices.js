const simulated_meter = require("../model/simulated_meter");
//const { IoTServices } = require("./IoTServices");

class SimulatedMeterServices {

    static getSimulatedMeters = async(userid) => {
        console.log(userid)
                try {
                    let foundMeters = await simulated_meter.find({"userId": userid });
                    if(foundMeters != [])
                    {
                        console.log(foundMeters);
                        return foundMeters;
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

    static getSimulatedMeter = async(id) => {
        console.log(id)
                try {
                    let foundMeter = await simulated_meter.find({"_id": id });
                    if(foundMeter != [])
                    {
                        console.log(foundMeter);
                        return foundMeter;
                    }
                    else{
                        console.log('no meter found');
                    }
                    
                }
                catch(err){
                        console.log(err);
                        console.log("Some unexpected error occured while logging in")
                }
    }
    
    static updateSimulatedMeter = async (id, data) => {
        try {
            const query = { 
                _id: id
            };
            
            const updatedMeter = await simulated_meter.findOneAndUpdate(query,data);

            if(updatedMeter)
            {
                const simulatedMeter = await this.getSimulatedMeters(newMeter.userId);
               // await IoTServices.publishonIoT(simulatedMeter, 'electricmeter_device');
                return { updatedMeter }
            }
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while updating electric meter")
        }
    }

    static addSimulatedMeter = async (data) => {
        console.log(data)
        try {
            const newMeter = new simulated_meter(data);
            await newMeter.save()
            const simulatedMeter = await this.getSimulatedMeters(newMeter.userId);
           // await IoTServices.publishonIoT(simulatedMeter, 'electricmeter_device');
            return {newMeter};
                               
        }
        catch(err){
                console.log(err);
                console.log("Some unexpected error occured while adding electric meter")
        }
    }


}







module.exports.SimulatedMeterServices = SimulatedMeterServices;
