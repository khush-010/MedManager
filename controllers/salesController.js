const mongoose = require('mongoose');
const { getUser } = require('../service/auth')
const BillItem = require('../models/billItem');
const Inventory = require('../models/inventory');
// const Bill = require('../models/bill');
const { format } = require('date-fns');

async function loadSalesreport(req, res) {
    const userId = await getUser(req.cookies.uid);
    const userIdObject = new mongoose.Types.ObjectId(userId._id);
    const saleReports = await BillItem.aggregate([
        {
            $match: {
                userId: userIdObject
            }
        },
        {
            $group: {
                _id: "$itemName",
                totalQty: { $sum: "$qtySold" },
                totalAmount: { $sum: "$subTotal" }
            }
        }
    ]).exec();

    res.render('salesreport', { sales: saleReports });
}

async function loadStockAlert(req, res) {
    const userId = await getUser(req.cookies.uid);
    const stocks = await Inventory.find({ userId: userId._id }).exec();

    const alertStocks = stocks
    .filter(item => item.total_qty < 5) 
    .map(item => ({
        itemName: item.name,       
        quantity: item.total_qty,
        expiryDate: format(new Date(item.exp_date),'MM/yyyy')
    }));
    
    res.render('stockalert', { stock: alertStocks });
}

async function loadStockAlertPost(req, res) {
    const userId = await getUser(req.cookies.uid);
    const { itemCount } = req.body;
    const stocks = await Inventory.find({ userId: userId._id }).exec();

    const alertStocks = stocks
    .filter(item => item.total_qty < itemCount) 
    .map(item => ({
        itemName: item.name,       
        quantity: item.total_qty,
        expiryDate: format(new Date(item.exp_date),'MM/yyyy')
    }));
    
    res.render('stockalert', { stock: alertStocks });
}

module.exports = {
    loadSalesreport,
    loadStockAlert,
    loadStockAlertPost
}