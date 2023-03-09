const jwt = require("jsonwebtoken");
const User = require("../models/user_schema");
const JWT_SECRET = "userChandan123";

const authenticateUser = (req, res, next) => {
  try {
    const userToken = req.header("user-token");
    if (!userToken) {
      return res.status(200).json({
        login: false,
        message: "token doesn't exist or might be wrong.",
      });
    }
      const payload = jwt.verify(userToken,JWT_SECRET);
      const { _id } = payload;
      User.findById(_id)
        .then((userData) => {
          req.user = userData; 
          next();
        })
        .catch((err) => {
          console.log(err);
          return res.status(200).json({
            login: false,
            message: "token doesn't exist or might be wrong.",
          });
        });
  } catch (error) {
    return res.status(200).json({
      login: false,
      message: "token doesn't exist or might be wrong.",
    });
  }
};

module.exports = authenticateUser;
