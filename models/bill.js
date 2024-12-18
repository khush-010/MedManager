const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const billSchema = new mongoose.Schema({
    billId:{
        type:String,
        default:uuidv4,
        required:true,
        unique:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer',
        required:true,
    },
    dateIssued:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true,
    }
});

const Bill = mongoose.model('bill',billSchema);
module.exports = Bill;