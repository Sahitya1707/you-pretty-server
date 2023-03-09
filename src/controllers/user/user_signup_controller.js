const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User  = require("../../models/user_schema");

const userSignUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  let errors = [];

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    errors.push({ message: "Please enter all the required fields" });
  }

  if (password != confirmPassword) {
    errors.push({ message: "password do not match" });
  }

  if (password.length < 6) {
    errors.push({ message: "password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    return res.status(201).json({ errors: errors });
  }

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    errors.push({ message: "user already exists" });
    return res.status(201).json({ errors: errors });
  } else {
    const signUpToken = jwt.sign(
      { firstName, lastName, email, password },
      "signup_secret_key",
      { expiresIn: "15m" }
    );
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "chandant142@gmail.com",
        pass: "qezvtafegssrwrne",
      },
      logger: true,
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"chandan thakur" chandant142@gmail.com',
      to: email,
      subject: "Email verification testing",
      text: "please verify your email",
      html: `
                   <p>click on the link to verify the email</p>
                   <a href='http://localhost:3000/activate-user/${signUpToken}'>click here</a>
              `,
      headers: { "x-myheader": "test header" },
    });

    console.log("Message sent: %s", info.response);
    return res.status(200).json({
      signUpToken,
      message: "email has been sent, kindly activate your account",
    });
  }
};

module.exports = userSignUp;
