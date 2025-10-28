const mongoose = require("mongoose")
const MenuModel = new mongoose.Schema({
    item: {type: String, required: true},
    price: {type: Number, required: true},
},{versionKey: false})
module.exports = mongoose.model("cashierMenus",MenuModel)