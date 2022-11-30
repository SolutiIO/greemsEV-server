const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { getTimeStamp } = require("./helpers/charginSession.helpers");
const User = require("./models/user");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;
const dbUrl = "mongodb://greemsev:greemsev1234@localhost:27017/greems";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.log("MongoDb Error: ", err.message));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", require("./routes/user"));
app.use("/vehicle", require("./routes/vehicle"));
app.use("/charginSession", require("./routes/charginSession"));
app.get("/", (req, res) => res.json({ message: "Hello!!, welcome to Greems" }));

// app.get("/test", async (req, res) => {
//   try {
//     const users = await User.find();
//     return res.json({ users });
//   } catch (error) {
//     return res.json({ error });
//   }
// });

app.listen(port, () => {
  console.log(`Server is up and running on ${port}...`);
  const dateObj = getTimeStamp("01092022 10:00");
  console.log(dateObj);
});
