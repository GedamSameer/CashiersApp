const mongoose = require("mongoose")
const CashierModel = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    contact: {type: String, required: true},
    gender: {type: String,enum:["male","female","trans"], required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean,default: false},
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true}
},{versionKey: false})
module.exports = mongoose.model("cashiers",CashierModel)