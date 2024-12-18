const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const customerSchema = new mongoose.Schema({
    customerId:{
        type:String,
        default:uuidv4,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    contactNo:{
        type:Number,
        required:true,
    }
});

const Customer = mongoose.model('customer',customerSchema);
module.exports = Customer;