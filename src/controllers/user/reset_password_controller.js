const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user_schema");
const _ = require("lodash");

const resetPassword = async (req, res) => {
  const { resetToken, password, confirmPassword } = req.body;
  try {
    if (!password || !confirmPassword) {
      return res.status(400).json({ error: "please enter all the fields" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({ error: "password do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    if (!resetToken) {
      return res.status(401).json({ message: "token not found" });
    }
    if (resetToken) {
      jwt.verify(resetToken, "secretkey", (err, decodedData) => {
        if (err) {
          return res
            .status(401)
            .json({ error: "incorrect token or it is expired" });
        }
        User.findOne({ resetToken }, (err, user) => {
          if (err || !user) {
            return res
              .status(401)
              .json({ error: "user with this token does not exist" });
          }

          const obj = {
            password: hashedPassword,
            resetToken: "",
          };
          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res
                .status(400)
                .json({ error: "reset password link error" });
            } else {
              return res
                .status(200)
                .json({ message: "password has been updated successfully" });
            }
          });
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = resetPassword
