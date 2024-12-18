const { getUser } = require('../service/auth');
const Bill = require('../models/bill');
const Customer = require('../models/customer');
const BillItem = require('../models/billItem');
const { format } = require('date-fns');

async function loadBilling(req, res) {
    try {
        const userId = getUser(req.cookies.uid);
        console.log(userId._id);
        const bills = await Bill.find({ userId })
            .populate('customerId', 'name') 
            .exec();

        const formattedBills = await Promise.all(bills.map(async(bill) => {
            const billItems = await BillItem.find({ billId: bill._id }).exec(); 
            return {
                billId: bill.billId,
                customerName: bill.customerId.name, 
                dateIssued: bill.dateIssued,
                totalAmount: bill.totalAmount,
                items:billItems
                
            }; 
        }));

        res.render('old-bills', { bills: formattedBills });
    } catch (error) {
        console.error("Error loading bills:", error);
        res.status(500).send("An error occurred while loading bills.");
    }
}


async function newBills(req,res) {
    res.render('new-bills');
}

async function addBill(req,res) {
    const userId = getUser(req.cookies.uid);
    const { customerName, customerContact, totalAmount, items } = req.body;
    let customer = await Customer.findOne({ contactNo: customerContact }).exec();
    if(!customer){
        const newCustomer = new Customer({
            name: customerName,
            contactNo: customerContact
        });
        await newCustomer.save();
        customer = await Customer.findOne({ contactNo: customerContact }).exec();
    }
    const currentDateTime = new Date();

    const bill = new Bill({
        userId,
        customerId: customer._id,
        dateIssued: format(currentDateTime, 'dd-MM-yyyy'),
        totalAmount
    });
    await bill.save();
    for (const item of items) {
        const billItem = new BillItem({
            billId: bill._id,
            userId: userId,
            itemName: item.name,
            price: item.price,
            qtySold: item.qty,
            subTotal: item.total,
            type_of_prod: item.type_of_prod
        });
        await billItem.save();
    }

    res.json({ success: true });
    
}

module.exports = {
    loadBilling,
    newBills,
    addBill
};