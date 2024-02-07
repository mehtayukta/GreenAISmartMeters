const mongoose = require('mongoose');
const electricMeterSchema = new mongoose.Schema(
  {
     electricMeterId: {
       type: String,
     },
    electricMeterName: {
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
    electricCapacity: {
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

module.exports = mongoose.model('electricMeter', electricMeterSchema, 'electricMeter');
