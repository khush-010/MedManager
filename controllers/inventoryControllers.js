const Inventory = require('../models/inventory');
const { getUser } = require('../service/auth');
const { format } = require('date-fns');

async function loadInventory(req,res) {
    const userId = getUser(req.cookies.uid)
    const inventoryItems =await Inventory.find({userId}).exec();
    const formattedItems = inventoryItems.map(item => ({
        id: item._id,
        name: item.name,
        type_of_prod: item.type_of_prod,
        price: item.price,
        qty: item.qty,
        items_per_qty: item.items_per_qty,
        total_qty:item.total_qty,
        exp_date: format(new Date(item.exp_date),'MM/yyyy')
    }));
    res.render('inventory',{inventoryItems: formattedItems})
}

async function addProduct(req,res) {
    const userId = getUser(req.cookies.uid);
    const {name,type_of_prod,price,qty,items_per_qty,exp_date} = req.body;
    const inventoryItem = await Inventory.findOne({userId,name,type_of_prod,exp_date}).exec();
    if(inventoryItem){
        Inventory.updateOne({userId,name,type_of_prod,exp_date},{qty:inventoryItem.qty+parseInt(qty),total_qty:inventoryItem.total_qty+parseInt(qty)*parseInt(items_per_qty)}).exec();
        res.redirect('/inventory');
    }
    if (!name || !type_of_prod || !price || !qty || !items_per_qty || !exp_date) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const parsedPrice = parseFloat(price);
    const parsedQty = parseInt(qty);
    const parsedItemsPerQty = parseInt(items_per_qty);
    
    if (isNaN(parsedPrice) || isNaN(parsedQty) || isNaN(parsedItemsPerQty)) {
        return res.status(400).json({ error: "Invalid number format." });
    }

    const total_qty = parsedQty * parsedItemsPerQty;
    
    await Inventory.create({
        userId,
        name,
        type_of_prod,
        price: parsedPrice,
        qty: parsedQty,
        items_per_qty: parsedItemsPerQty,
        total_qty, 
        exp_date
    });

    res.redirect('/inventory')
}

async function loadSuggestions(req,res) {
    const query =  req.query.query.trim()

    if(query.length > 1){
        const medicines = await Inventory.find({
            name:{ $regex: new RegExp(query,'i')}
        }).select('name type_of_prod price qty items_per_qty exp_date total_qty').limit(10);
        res.json(medicines);
    }
    else{
        res.json([]);
    }
}

module.exports = {
    loadInventory,
    addProduct,
    loadSuggestions
}