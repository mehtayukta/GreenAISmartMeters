const simulated_fan = require("../model/simulated_fan");
const simulated_meter = require("../model/simulated_meter");
const { IoTServices } = require("./IoTServices");

class SimulatedFanServices {
    static getSimulatedFans = async (id) => {
        console.log(id)
        try {
            let foundFans = await simulated_fan.find({ "userId": id });
            if (foundFans != []) {
                console.log(foundFans);
                return foundFans;
            }
            else {
                console.log('no user found');
            }

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while logging in")
        }
    }

    static getSimulatedFan = async (id) => {
        console.log(id)
        try {
            let foundLight = await simulated_meter.find({ "_id": id });
            if (foundLight != []) {
                console.log(foundLight);
                return foundLight;
            }
            else {
                console.log('no meter found');
            }

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while logging in")
        }
    }

    static addSimulatedFan = async (data) => {
        console.log(data)
        try {
            const newFan = new simulated_fan(data);
            await newFan.save()
            console.log("userId:", newFan.userId)
            const simulatedFans = await this.getSimulatedFans(newFan.userId);
            console.log(simulatedFans);
            await IoTServices.publishonIoT(simulatedFans, 'fan_device');
            return { newFan };
        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while adding fan")
        }
    }

    static updateSimulatedFan = async (id, data) => {
        try {
            const query = {
                _id: id
            };

            const updatedFan = await simulated_fan.findOneAndUpdate(query, data);

            if (updatedFan) {
                const simulatedFans = this.getSimulatedFans(newFan.userId);
                await IoTServices.publishonIoT(simulatedFans, 'fan_device');
                return { updatedFan }
            }

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while updating fan")
        }
    }
}




module.exports.SimulatedFanServices = SimulatedFanServices;

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