const router = require("express").Router();
const jwt = require("jsonwebtoken");

const _get = require("lodash/get");
const _keys = require("lodash/keys");
const _isEmpty = require("lodash/isEmpty");
const _forEach = require("lodash/forEach");

const { authenticateToken } = require("../middlewares/user");
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const body = _get(req, "body", {});
    const user = new User(body);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN);
    user.token = token;
    await user.save();
    return res.status(201).json({
      message: "User Registerd SuccessFully!!",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.patch("/", authenticateToken, async (req, res) => {
  try {
    const dataToUpdate = _get(req, "body", {});
    if (_isEmpty(dataToUpdate)) {
      throw new Error("Body is empty!!");
    }
    const fieldToUpdate = _keys(dataToUpdate);
    const user_id = req.user_id;
    const user = await User.findById(user_id);
    _forEach(fieldToUpdate, (key) => {
      const value = dataToUpdate[key];
      user[key] = value;
    });
    await user.save();
    return res.status(200).json({
      message: "Success",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req?.user_id;
    const user = await User.findById(user_id);
    return res.status(200).json({
      message: "Success",
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
