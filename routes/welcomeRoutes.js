const express = require("express")
const router = express.Router()
const {loadWelcomePage,loadAboutPage,loadContactUsPage,loadHowItWorksPage,contactFormSubmission} = require("../controllers/welcomeController")

router.use(express.urlencoded({ extended: false }))

router.get('/',loadWelcomePage)
router.get('/how-it-works',loadHowItWorksPage)
router.get('/about',loadAboutPage)
router.get('/contact-us',loadContactUsPage).post('/contact-us',contactFormSubmission)

module.exports = router