const mongoose = require("mongoose")
const MenuModel = new mongoose.Schema({
    menuItemName: {type: String, required: true},
    category: {type: String,enum: ["All", "Beverages", "Snacks", "Starters", "Main Course", "Breads", "Dessert"], required: true},
    price: {type: Number, required: true},
    emoji: {type: String, required: true},
},{versionKey: false})
module.exports = mongoose.model("cashierMenus",MenuModel)