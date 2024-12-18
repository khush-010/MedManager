const mongoose = require('mongoose');
const {getUser} = require('../service/auth')
const BillItem = require('../models/billItem');
// const Bill = require('../models/bill');

async function loadSalesreport(req,res) {
    const userId = await getUser(req.cookies.uid);
    const userIdObject =new mongoose.Types.ObjectId(userId._id);
    const saleReports = await BillItem.aggregate([
        {
            $match:{
                userId:userIdObject
            }
        },
        {
            $group:{
                _id:"$itemName",
                totalQty:{$sum:"$qtySold"},
                totalAmount:{$sum:"$subTotal"}
            }
        }
    ]).exec();
    
    res.render('salesreport',{sales:saleReports});
}

// async function loadStockAlert(req,res) {
//     const alert = await viewStockAlert();
//     const userId = await getUser(req.cookies.uid);
//     const alertStocks = alert
//     .filter(item => item.userId === userId._id )
//     .map(item => ({
//         itemName: item.item_name,
//         quantity: item.available_quantity,
//         expiryDate: item.expiry_date
//     }));
//     res.render('stockalert',{stock:alertStocks});
// }

module.exports = {
    loadSalesreport,
    // loadStockAlert
}