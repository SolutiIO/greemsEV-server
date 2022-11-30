const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    make: { type: String },
    model: { type: String },
    year: { type: String },
    batteryCapacity: { type: Number },
    batteryCRate: { type: Number },
    batterySOC: { type: String },
    // user_id: { type: mongoose.Schema.Types.ObjectId },  //will integrate later
    batteryManagement: { type: String },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
