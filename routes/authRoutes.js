const express = require("express")
const router = express.Router()
const {loadLoginPage,loginUser,loadSignUpPage,signupUser,logoutUser} = require("../controllers/authControllers")
const {alreadyLoggedIn} = require('../middlewares/auth')

router.route('/login').get(alreadyLoggedIn,loadLoginPage).post(loginUser);
router.route('/signup').get(alreadyLoggedIn,loadSignUpPage).post(signupUser)
router.route('/logout').get(logoutUser);

module.exports = router