const mongoose = require('mongoose');

const simulatedmeterSchema = new mongoose.Schema({
  tstp: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  DayOfWeek: {
    type: Number,
    required: true
  },
  Month: {
    type: Number,
    required: true
  },
  HourOfDay: {
    type: Number,
    required: true
  },
  LCLid: {
    type: String,
    required: true
  },
  energy_kWh_hh: { // Adjusted field name
    type: Number,
    required: true
  },
  Temperature: {
    type: Number,
    required: true
  },
  RelativeHumidity: {
    type: Number,
    required: true
  },
  DewPoint: {
    type: Number,
    required: true
  },
  Precipitation: {
    type: Number,
    required: true
  },
  CloudCover: {
    type: Number,
    required: true
  },
  CloudCoverCategory: {
    type: Number,
    required: true
  },
  WindSpeed: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  quarter: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  hour_minute: {
    type: Number,
    required: true
  }
});
//
// const simulatedmeterSchema = new mongoose.Schema(
//   {
   
//     meter_name: {
//       type: String,
//       required: true,
//     },
//     meter_id: {
//         type: String,
//         required: true,
//     },
//     userId: {
//       type: String,
//       required: true,
//   },
//     Electricity_Capacity: {
//         type: String,
//         required: true,
//     },    
//     Voltage: {
//       type: String,
//     },
//     Current: {
//       type: String,
//     },
//     Todays_Usage: {
//         type: String,
//         required: true,
//     },
//     Last_24hr_Usage: {
//         type: String,
//         required: true,
//     },
//     This_Months_Usage: {
//         type: String,
//         required: true,
//     },
//     This_Weeks_Usage: {
//         type: String,
//         required: true,
//     },
//     This_Years_Usage: {
//       type: String,
//       required: true,
//   },
//   work_status: {
//     type: String,
//     required: true,
// }
//   },

//   { timestamps: true }
// );

module.exports = mongoose.model('Simulated_meter', simulatedmeterSchema);