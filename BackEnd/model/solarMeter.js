const mongoose = require('mongoose');
const solarMeterSchema = new mongoose.Schema(
  {
    solarMeterId: {
       type: String,
     },
    solarMeterName: {
      type: String,
    },
    location: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    model: {
      type: String,
    },
    solarCapacity: {
      type: String,
    },
    installationMethod: {
      type: String,
    },
    userId: {
      type: String,
      required: false, // Initially, it was True, but it has been changed to false so that insertion has been successful
    },
    cloudStatus: {
      type: Number,
      required: false, // Initially, it was True, but it has been changed to false so that insertion has been successful
    },
    workingStatus: {
      type: Number,
      required: false, // Initially, it was True, but it has been changed to false so that insertion has been successful
    },
    activeStatus: {
      type: Number,
      required: false, // Initially, it was True, but it has been changed to false so that insertion has been successful
    },
    measurementAccuracy: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    deploymentDate: {
      type: String,
    },
    installationDate: {
      type: String,
    },
    power: {
      type: String,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model('solarMeter', solarMeterSchema, 'solarMeter');