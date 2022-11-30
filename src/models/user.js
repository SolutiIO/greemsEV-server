const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    token: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    rfid: { type: String },
    manufacture: { type: String },
    model: { type: String },
    year: { type: String },
    batteryType: { type: String },
    premiumService: { type: Boolean },
    greenEnergyManagement: { type: Boolean },
    batteryManagement: { type: Boolean },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
