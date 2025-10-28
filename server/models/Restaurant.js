const mongoose = require("mongoose")
const RestaurantModel = new mongoose.Schema({
    restaurantName: {type: String, required: true},
    address: {type: String, required: true},
    contact: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    eastablishedYear: {type: Number, required: true},
},{versionKey: false})
module.exports = mongoose.model("cashierRestaurants",RestaurantModel)