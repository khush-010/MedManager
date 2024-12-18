const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const inventorySchema = new mongoose.Schema({
    inventoryId:{
        type:String,
        default:uuidv4,
        unique:true,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'users',
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    type_of_prod:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    items_per_qty:{
        type:Number,
        required:true,
    },
    total_qty:{
        type:Number,
        required:true,
    },
    exp_date: {
        type: Date,
        required: true,
        set: function(value) {
            const date = new Date(value);
            return new Date(date.getFullYear(), date.getMonth(), 1);
        }
    },
})

const Inventory = mongoose.model('inventory',inventorySchema)

module.exports = Inventory
