const express = require('express')
const { loadInventory,addProduct, loadSuggestions } = require('../controllers/inventoryControllers')
const router = express.Router()

router.route('/inventory').get(loadInventory).post(addProduct)
router.route('/get-medicine').get(loadSuggestions)


module.exports = router