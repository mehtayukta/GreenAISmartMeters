const { type } = require("express/lib/response");
const solarMeter = require("../model/solarMeter");
const { default: mongoose } = require("mongoose");
//const { SimulatedMeterServices } = require("./SimulatedMeterServices");

class SolarServices {

    static addsolarMeterdetails = async (data) => {
        try {
            const query = {
                solarMeterName: data.solarMeterName,
                marker: data.marker,
                marker: data.marker,
                model: data.model,
                location: data.location,
                solarCapacity: data.solarCapacity,
                meausurementAccuracy: data.meausurementAccuracy,
                dimensions: data.dimesions,
                design: data.design,
                deploymentDate: data.deploymentDate,
                installationDate: data.installationDate,
                power: data.power
            };
            const newMeter = new solarMeter(data);
            //    const newMeter = new solarMeter(query);
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
            console.log("Some unexpected error occured while adding solar meter")
        }
    }


    static deletesolarMeter = async (data) => {
        //console.log("In Meterservices,js")
        //console.log(data)
        try {
            const query = {
                _id: data.id
            };

            const oldMeter = await solarMeter.deleteOne(query);

            console.log(oldMeter)
            return { oldMeter };

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while deleting solar meter")
        }
    }


    static updatesolarMeter = async (id, data) => {
        console.log("In updatemeter  solarserices.js")
        console.log(data)
        try {
            const query = {
                _id: id
                
            };

            const updatedMeter = await solarMeter.findOneAndUpdate(query, data);

            if (updatedMeter) {
                console.log("inupdate")
                console.log(updatedMeter)
                return { updatedMeter }
            }

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while updating solar meter")
        }
    }

    static getsolarAllMeters = async (id, data) => {
        try {


            const meters = await solarMeter.find();

            if (meters?.length > 0) {
                return meters
            }

        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while fetching meters")
        }
    }

    static getsolarMeterById = async (id) => {
        try {
            const meter = await solarMeter.findById(id);
            if (meter) {
                return { meter }
            }
        }
        catch (err) {
            console.log(err);
            console.log("Some unexpected error occured while fetching meters")
        }
    }



    static getsolarMeterdetails = async (data) => {
         console.log(data)
         console.log("In meterservices.js getMeterdetails")
        try {

            const query = {
                userId: data.userId,
            };
            // const userId = data.userId;
            console.log("userId:", data.userId);

            let foundMeters = await solarMeter.find({ userId: query.userId });

            // console.log(foundMeters);

            if (foundMeters.length > 0) {
                console.log('Meters found:');
                foundMeters.forEach((meter) => {
                    console.log(`Meter Name: ${meter.solarMeterName}`);
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

module.exports.SolarServices = SolarServices;