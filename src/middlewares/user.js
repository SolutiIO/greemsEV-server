const jwt = require("jsonwebtoken");

const _isEmpty = require("lodash/isEmpty");

const authenticateToken = (req, res, next) => {
  const token = req.headers["token"];
  if (_isEmpty(token)) {
    return res.status(401).json({
      message: "A token is required for authentication",
    });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, result) => {
    if (!_isEmpty(err) || _isEmpty(result.id)) {
      return res.status(404).json({
        message: "Invalid Token",
      });
    }
    req.user_id = result.id;
    return next();
  });
};

module.exports = {
  authenticateToken,
};
