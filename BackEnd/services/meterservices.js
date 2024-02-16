const { type } = require("express/lib/response");
const electricMeter = require("../model/electricMeter");
const { default: mongoose } = require("mongoose");
const { SimulatedMeterServices } = require("./SimulatedMeterServices");

class MeterServices {

    static addMeterdetails = async (data) => {
        try {
            const query = {
                electricMeterName: data.electricMeterName,
                marker: data.marker,
                marker: data.marker,
                model: data.model,
                location: data.location,
                electricCapacity: data.electricCapacity,
                meausurementAccuracy: data.meausurementAccuracy,
                dimensions: data.dimesions,
                design: data.design,
                deploymentDate: data.deploymentDate,
                installationDate: data.installationDate,
                power: data.power
            };
            const newMeter = new electricMeter(data);
            //    const newMeter = new ElectricMeter(query);
            await newMeter.save()

            const newSimulatedMeter = {
                meter_name: data.fanName,
                meter_id: data.fanId,
                userId: data.userId,
                Voltage: "10V",
                Current: "5A",
                Todays_Usage: "0",
                Last_24hr_Usage: "0",
                This_Months_Usage: "clock-wise",
                This_Weeks_Usage: "0",
                This_Years_Usage: "0",
                work_status: "false"
            }
            let temp = await SimulatedMeterServices.addSimulatedMeter(newSimulatedMeter);
            return { newMeter };

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while adding electric meter")
        }
    }


    static deleteMeter = async (data) => {
        //console.log("In Meterservices,js")
        //console.log(data)
        try {
            const query = {
                _id: data.id
            };

            const oldMeter = await electricMeter.deleteOne(query); // yukta modified remove with deleteOne

            console.log(oldMeter)
            return { oldMeter };

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while deleting electric meter")
        }
    }


    static updateMeter = async (id, data) => {
        console.log("In updatemettet  mererserices,js")
        console.log(data)
        try {
            const query = {
                _id: id
                
            };

            const updatedMeter = await electricMeter.findOneAndUpdate(query, data);

            if (updatedMeter) {
                console.log("inupdate")
                console.log(updatedMeter)
                return { updatedMeter }
            }

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while updating electric meter")
        }
    }

    static getAllMeters = async (id, data) => {
        try {


            const meters = await electricMeter.find();

            if (meters?.length > 0) {
                return meters
            }

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while fetching meters")
        }
    }

    static getMeterById = async (id) => {
        try {
            const meter = await electricMeter.findById(id);
            if (meter) {
                return { meter }
            }
        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while fetching meters")
        }
    }



    static getMeterdetails = async (data) => {
         console.log(data)
         console.log("In meterservices.js getMeterdetails")
        try {

            const query = {
                userId: data.userId,
            };
            // const userId = data.userId;
            console.log("userId:", data.userId);

            let foundMeters = await electricMeter.find({ userId: query.userId });

            // console.log(foundMeters);

            if (foundMeters.length > 0) {
                console.log('Meters found:');
                foundMeters.forEach((meter) => {
                    console.log(`Meter Name: ${meter.electricMeterName}`);
                });
                return foundMeters;
            } else {
                console.log('No meters found for userId:', userId);
                return null; // Return an appropriate response, like an empty array or an error message.
            }
        } catch (err) {
            console.error("Error while retrieving meters:", err);
            throw err; // You can handle the error or throw it to be handled by an error handler.
        }
    }
}

module.exports.MeterServices = MeterServices;