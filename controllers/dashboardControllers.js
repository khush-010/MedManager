const Inventory = require('../models/inventory')
const Bill = require('../models/bill')
const BillItem = require('../models/billItem')
const {getUser} = require('../service/auth')

async function loadDashboard(req,res) {
    const userId = getUser(req.cookies.uid);
    const inventoryItems =await Inventory.find({userId}).exec();
    const bills = await Bill.find({userId}).exec();
    const billitems = await BillItem.find({userId}).exec();

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

    let totalBillItems = 0;
    let totalTab=0;
    let totalCap=0;
    let totalCream=0;
    let totalSyrup=0;
    for (const billitem of billitems){
        totalBillItems += billitem.qtySold;
        if(billitem.type_of_prod === 'TAB'){
            totalTab += billitem.qtySold;
        }
        else if(billitem.type_of_prod === 'CAP'){
            totalCap += billitem.qtySold;
        }
        else if(billitem.type_of_prod === 'CREAM'){
            totalCream += billitem.qtySold;
        }
        else if(billitem.type_of_prod === 'SYRUP'){
            totalSyrup += billitem.qtySold;
        }
    };

    const data = {
        totalInventory,
        totalQuantity,
        totalBills,
        totalAmount,
        totalBillItems,
        totalTab,
        totalCap,
        totalCream,
        totalSyrup
    }
    res.render('dashboard',data)
}



module.exports = {
    loadDashboard
}