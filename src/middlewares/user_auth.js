const jwt = require("jsonwebtoken");
const User = require("../models/user_schema");
const JWT_SECRET = "userChandan123";

const authenticateUser = (req, res, next) => {
  try {
    const token = req.header("user-token");

    if (!token || token.length == 0)
      return res
        .status(401)
        .json({ message: "please login to visit this resource" });
    const payload = jwt.verify(token, JWT_SECRET);
    const { _id } = payload;
    User.findById(_id)
      .then((userData) => {
        req.user = userData;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return res.status(200).json({
      login: false,
      message: "token doesn't exist or might be wrong.",
    });
  }
};

module.exports = authenticateUser;
