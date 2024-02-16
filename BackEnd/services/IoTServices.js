var awsIot = require('aws-iot-device-sdk');

class IoTServices {
    static publishonIoT = async(DeviceDetails, title) => {

        var device = awsIot.device({
            keyPath: "C:/Users/Home/Desktop/Smart_meter_IoT/awsiot_simulator/certs/449f1430541ae35e8a20dc486e7634faf5099f653c41e565adb2feb576d29181-private.pem.key",
            certPath: "C:/Users/Home/Desktop/Smart_meter_IoT/awsiot_simulator/certs/449f1430541ae35e8a20dc486e7634faf5099f653c41e565adb2feb576d29181-certificate.pem.crt",
              caPath: "C:/Users/Home/Desktop/Smart_meter_IoT/awsiot_simulator/certs/AmazonRootCA1.pem",
            clientId: "Sensor_device_thing",
                host: "a1jczgx78bwigb-ats.iot.us-east-1.amazonaws.com"
         });

        console.log("Device deatils")
        console.log(DeviceDetails);
        DeviceDetails.forEach(Simulated_device => {
            console.log('========== Simulation Started ===========');
            console.log(Simulated_device);
            device.publish(title, JSON.stringify(Simulated_device));
        });

        return DeviceDetails;
        }
    }
module.exports.IoTServices = IoTServices;