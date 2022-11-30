const router = require("express").Router();
const reader = require("xlsx");

const _size = require("lodash/size");
const { authenticateToken } = require("../middlewares/user");

const CharginSession = require("../models/charginSession");
const { getTimeStamp } = require("../helpers/charginSession.helpers");
const User = require("../models/user");

router.post("/upload-data", async (req, res) => {
  try {
    const file = reader.readFile("src/Charging Session.xlsx");
    let data = [];
    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach((res) => {
        const useFullData = {
          start_date: getTimeStamp(res.session_start_date),
          end_date: getTimeStamp(res.session_stop_date),
          energy: res.session_total_energy,
          session_rfid: res["להתעלם מ A Session_RFID"],
          user_rfid: res["להתעלם מ A Users_RFID"],
          EVSE_EVSE_id: res.EVSE_EVSE_id,
        };
        data.push(useFullData);
      });
    }
    for (let i = 0; i < _size(data); i++) {
      const charginSession = new CharginSession(data[i]);
      await charginSession.save();
    }

    return res.send("success");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { start_date, end_date } = req?.body;
    const user = await User.findById(req.user_id);
    const { rfid } = user;
    const charginSessions = await CharginSession.find({
      start_date: {
        $gte: start_date,
        $lte: end_date,
      },
      user_rfid: rfid,
    });
    return res.status(200).json({
      message: "Success",
      charginSessions,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
