const mongoose = require('mongoose');
const simulatedlightSchema = new mongoose.Schema(
  {
   
    light_name: {
      type: String,
      required: true,
    },
    light_id: {
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
    Luminious_Efficacy: {
        type: String,
        required: true,
    },
    Luminious_Flux: {
        type: String,
        required: true,
    },
    Luminious_Intensity: {
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

module.exports = mongoose.model('Simulated_light', simulatedlightSchema);