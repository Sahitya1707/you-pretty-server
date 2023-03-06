const jwt = require("jsonwebtoken");
const User = require("../models/user_schema");
const JWT_SECRET = "userchandant123";

const authenticateUser = (req, res, next) => {
  try {
    const userToken = req.header("user-token");
    if (!userToken || userToken.length == 0) {
      return res.status(401).json({
        login: false,
        message: "token doesn't exist or might be wrong.",
      });
    }
    if (userToken.length > 10) {
      const payload = jwt.verify(userToken, JWT_SECRET);
      const { _id } = payload;
      User.findById(_id)
        .then((userData) => {
          req.user = userData;
          next();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    return res.status(401).json({
      login: false,
      message: "token doesn't exist or might be wrong.",
    });
  }
};

module.exports = authenticateUser;
