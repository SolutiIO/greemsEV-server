const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { getTimeStamp } = require("./helpers/charginSession.helpers");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;
const dbUrl =
  "mongodb+srv://admin:admin1010@cluster0.elgplxy.mongodb.net/greems?retryWrites=true&w=majority";

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

app.listen(port, () => {
  console.log(`Server is up and running on ${port}...`);
  const dateObj = getTimeStamp("01092022 10:00");
  console.log(dateObj);
});
