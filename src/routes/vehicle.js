const router = require("express").Router();
// const reader = require("xlsx");

const _isEmpty = require("lodash/isEmpty");
const _get = require("lodash/get");

const { getFormattedMetadata } = require("../helpers/metadata.helpers");
const Vehicle = require("../models/vehicle");
const { authenticateToken } = require("../middlewares/user");

// router.post("/upload-csv", async (req, res) => {
//   try {
//     const file = reader.readFile("src/Vehicles.xlsx");
//     let data = [];
//     const sheets = file.SheetNames;
//     for (let i = 0; i < sheets.length; i++) {
//       const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
//       temp.forEach((res) => {
//         const useFullData = {
//           make: res.vehicle_make,
//           model: res.vehicle_model,
//           batteryCapacity: res.vehicle_bettery_capacity,
//           batteryCRate: res.vehicle_battery_C_rate,
//         };
//         data.push(useFullData);
//       });
//     }
//     for (let i = 0; i < data.length; i++) {
//       const vehicle = new Vehicle(data[i]);
//       await vehicle.save();
//     }
//     return res.send("success");
//   } catch (error) {}
// });

router.post("/", authenticateToken, async (req, res) => {
  try {
    const body = _get(req, "body", {});
    if (_isEmpty(body)) throw new Error("Request Body not found");
    const vehicle = new Vehicle(body);
    await vehicle.save();
    return res.status(201).json({
      vehicle,
      message: "Vehicle saved succesfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/metadata", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    const metadata = getFormattedMetadata(vehicles);
    return res.status(200).json({
      metadata,
      message: "Metadata fetched successfully!!!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
