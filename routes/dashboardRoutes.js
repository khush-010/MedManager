const express = require('express')
const router = express.Router()
const {loadDashboard} = require('../controllers/dashboardControllers')

router.route('/dashboard').get(loadDashboard)

module.exports = router