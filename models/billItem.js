const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const billItemSchema = new mongoose.Schema({
    billItemId:{
        type:String,
        default:uuidv4,
        required:true,
        unique:true,
    },
    billId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bill',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    type_of_prod:{
        type:String,
        required:true,
    },
    itemName:{
        type:String,
        required:true,
    },
    qtySold:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    subTotal:{
        type:Number,
        required:true,
    }
});

const BillItem = mongoose.model('billItem',billItemSchema);
module.exports = BillItem;