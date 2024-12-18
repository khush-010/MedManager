const express = require('express')
const { loadStockAlert }= require('../controllers/salesController')
const router = express.Router()

router.route('/stock-alert').get(loadStockAlert);

module.exports = router