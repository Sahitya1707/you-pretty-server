const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User  = require('../../models/user_schema')

const userSetActive = (req, res) => {
  const { token } = req.params;
  try {
    if (token) {
      jwt.verify(
        token,
        "signup_secret_key",
        (err, decodedToken) => {
          if (err) {
            return res.status(400).json({ error: "the link has been expired" });
          }
          const { firstName, lastName, email, password } = decodedToken;
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              return res
                .status(400)
                .json({ error: "user with this email already exists" });
            }
            bcrypt
              .hash(password, 12)
              .then((hashedPassword) => {
                const newuser = new User({
                  firstName,
                  lastName,
                  email,
                  password: hashedPassword,
                  resetToken: "",
                });
                newuser.save((err, success) => {
                  if (err) {
                    console.log("error is signing up", err);
                    return res
                      .status(400)
                      .json({ error: "error while activating the user" });
                  }
                  return res
                    .status(200)
                    .json({ message: "user has been saved successfully" });
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = userSetActive
