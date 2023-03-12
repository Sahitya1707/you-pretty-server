const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user_schema");

const JWT_SECRET = "userChandan123";

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(201)
        .json({ error: "please enter all the required fields" });
    }

    const isUserExists = await User.findOne({ email: email });
    if (!isUserExists) {
      return res.status(201).json({
        error: "email or password may be invalid, please try again",
      });
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (!isPasswordMatched) {
        return res.status(201).json({
          error: "email or password may be invalid, please try again",
        });
      } else {
        const token = jwt.sign(
          {
            _id: isUserExists._id,
          },
          JWT_SECRET
        );

        //store token in session object_
        // req.session = {
        //   user_jwt: token,
        // };

        const { firstName, lastName, email, role } = isUserExists;
        res
          .status(200)
          .json({
            token,
            role,
            user: { firstName, lastName, email },
            message: "login successfull.",
          });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = userSignIn;
