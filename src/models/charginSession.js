const mongoose = require("mongoose");

const charginSessionSchema = new mongoose.Schema(
  {
    start_date: { type: Date },
    end_date: { type: Date },
    // user_id: { type: mongoose.Schema.Types.ObjectId }, // will add it later if required
    energy: { type: Number },
    session_rfid: { type: String },
    user_rfid: { type: String },
  },
  { timestamps: true }
);

const CharginSession = mongoose.model("CharginSession", charginSessionSchema);

module.exports = CharginSession;
