const express = require('express')
const { loadSalesreport } = require('../controllers/salesController')
const router = express.Router()

router.route('/sales').get(loadSalesreport);

module.exports = router