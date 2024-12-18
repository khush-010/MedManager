const mongoose = require("mongoose")

async function connectMongo(url) {
    mongoose.connect(url).then(()=>{
        console.log("Database connected!!");
    })
}

module.exports = {
    connectMongo
}