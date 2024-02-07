const mongoose = require('mongoose');
const simulatedfanSchema = new mongoose.Schema(
  {
   
    fan_name: {
      type: String,
      required: true,
    },
    fan_id: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },    
    Voltage: {
      type: String,
    },
    Current: {
      type: String,
    },
    Fan_Speed: {
        type: String,
        required: true,
    },
    Speed_Number: {
        type: String,
        required: true,
    },
    Rotation_Pattern: {
        type: String,
        required: true,
    },
    work_status: {
        type: String,
        required: true,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model('Simulated_fan', simulatedfanSchema);