const express = require("express");
const userSetActive = require("../controllers/user/user_activation_controller");
const userSignIn = require("../controllers/user/user_signin_controller");
const userSignUp = require("../controllers/user/user_signup_controller");
const authenticateUser = require("../middlewares/user_auth");
const User = require('../models/user_schema')
const router = express.Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/set-active/:token", userSetActive);
router.get("/check-user-auth", authenticateUser, (req, res) => {
  if (req.user) {
    return res.status(200).json({
      login: true,
    });
  } else {
    return res.status(200).json({
      login: false,
    });
  }
});
router.get("/check-admin-auth", authenticateUser, (req, res) => {
  if (req.admin) {
    return res.status(200).json({
      login: true,
    });
  } else {
    return res.status(200).json({
      login: false,
    });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(req.user);
});


// Update a user by ID
router.patch('/:id', authenticateUser, async (req, res) => {
  if (req.body.firstName != null) {
    req.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    req.user.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    req.user.email = req.body.email;
  }
  if (req.body.password != null) {
    req.user.password = req.body.password;
  }
  if (req.body.role != null) {
    req.user.role = req.body.role;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user by ID
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;

module.exports = router;
