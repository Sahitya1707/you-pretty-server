const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require('../../models/user_schema')

const JWT_SECRET = "user_chandan123";

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(201)
      .json({ message: "please enter all the required fields" });
  }

  try {
    const isUserExists = await User.findOne({ email: email });
    if (!isUserExists) {
      return res.status(201).json({
        message: "email or password may be invalid, please try again",
      });
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (!isPasswordMatched) {
        return res.status(201).json({
          message: "email or password may be invalid, please try again",
        });
      } else {
        const token = jwt.sign(
          {
            _id: isUserExists._id,
            email: isUserExists.email,
            name: isUserExists.firstName + " " + isUserExists.lastName,
          },
          JWT_SECRET
        );

        //store token in session object_
        req.session = {
          user_jwt: token,
        };

        const {firstName, lastName, email } = isUserExists;
        res
          .status(200)
          .json({token, currentUser: {firstName, lastName, email } });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = userSignIn;
