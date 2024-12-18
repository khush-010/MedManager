const Inventory = require('../models/inventory')
const Bill = require('../models/bill')
const {getUser} = require('../service/auth')

async function loadDashboard(req,res) {
    const userId = getUser(req.cookies.uid);
    const inventoryItems =await Inventory.find({userId}).exec();
    const bills = await Bill.find({userId}).exec();
    let totalInventory = 0;
    let totalQuantity = 0;
    for (const inventoryItem of inventoryItems){
        totalInventory++;
        totalQuantity += inventoryItem.total_qty;
    };
    let totalBills = 0;
    let totalAmount = 0;
    for (const bill of bills){
        totalBills++;
        totalAmount += bill.totalAmount;
    };

    const data = {
        totalInventory,
        totalQuantity,
        totalBills,
        totalAmount
    }
    res.render('dashboard',data)
}



module.exports = {
    loadDashboard
}