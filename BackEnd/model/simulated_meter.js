const mongoose = require('mongoose');
const simulatedmeterSchema = new mongoose.Schema(
  {
   
    meter_name: {
      type: String,
      required: true,
    },
    meter_id: {
        type: String,
        required: true,
    },
    userId: {
      type: String,
      required: true,
  },
    Electricity_Capacity: {
        type: String,
        required: true,
    },    
    Voltage: {
      type: String,
    },
    Current: {
      type: String,
    },
    Todays_Usage: {
        type: String,
        required: true,
    },
    Last_24hr_Usage: {
        type: String,
        required: true,
    },
    This_Months_Usage: {
        type: String,
        required: true,
    },
    This_Weeks_Usage: {
        type: String,
        required: true,
    },
    This_Years_Usage: {
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

module.exports = mongoose.model('Simulated_meter', simulatedmeterSchema);