const mongoose = require("mongoose")
const OrderModel = new mongoose.Schema({
    name: {type: String, required: true},
},{versionKey: false})
module.exports = mongoose.model("cashierOrders",OrderModel)