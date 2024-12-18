const express = require('express')
const { loadStockAlert,loadStockAlertPost }= require('../controllers/salesController')
const router = express.Router()

router.route('/stock-alert').get(loadStockAlert).post(loadStockAlertPost);

module.exports = router