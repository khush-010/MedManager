const express = require('express');
const router = express.Router()
const { loadBilling,newBills,addBill } = require('../controllers/billingController');
const { loadSuggestions } = require('../controllers/inventoryControllers');

router.route('/billing/old').get(loadBilling)
router.route('/billing/new').get(newBills)
router.route('/billing/get-medicine').get(loadSuggestions)
router.route('/billing/add-bill').post(addBill)

module.exports = router