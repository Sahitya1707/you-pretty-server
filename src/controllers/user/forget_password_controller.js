const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../../models/user_schema')

const forgetPassword = async (req, res) => {
  const { userEmail } = req.body;
  try {
    if (!userEmail) {
      return res.status(400).json({ error: "please enter your email" });
    }
    User.findOne({ email: userEmail }, (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ error: "user with this email does not exist." });
      }
      const token = jwt.sign({ _id: user._id }, "secretkey", {
        expiresIn: "20m",
      });

      return User.updateOne(
        { resetToken: token },
        (err, success) => {
          if (err) {
            return res
              .status(400)
              .json({ error: "reset password link error." });
          } else {
            const transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: "chandant142@gmail.com",
                pass: "548552simsim",
              },
              logger: true,
            });
            const info = transporter.sendMail({
              from: '"chandan thakur" chandant142@gmail.com',
              to: userEmail,
              subject: "Password reset link",
              html: `<a href='http://localhost:4200/forget-password/${token}'>Reset Password</a>`,
              headers: { "x-myheader": "test header" },
            });
            return res.status(200).json({
              message:
                "email has been sent successfully, please follow the instructions",
            });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = forgetPassword;
