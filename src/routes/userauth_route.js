const express = require('express');
const userSetActive = require('../controllers/user/user_activation_controller');
const userSignIn = require('../controllers/user/user_signin_controller');
const userSignUp = require('../controllers/user/user_signup_controller');
const router = express.Router();

router.post('/signup',userSignUp)
router.post('/signin',userSignIn)
router.get('/set-active/:token',userSetActive)

module.exports = router