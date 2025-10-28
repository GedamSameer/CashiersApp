const Restaurant = require("../models/Restaurant")
exports.getAllRestaurants = async (req,res) => {
    try{
        const restaurant = await Restaurant.find({})
        if(!restaurant) return res.status(404).json({error: "No restaurants found"})
        return res.status(200).json(restaurant)
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.searchRestaurant = async (req,res) => {
    try{
        const search = req.query.search || ""
        const query = search ? {restaurantName: {$regex:search,$options:"i"}}:{}
        const restaurants = await Restaurant.find(query).limit(10)
        if(!restaurants) return res.status(404).json({error: "No restaurants found"})
        return res.status(200).json(restaurants)
    }catch (err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.getRestaurantById = async (req,res) => {
    try{
        const restaurant = await Restaurant.findById(req.params.id);
        if(!restaurant) return res.status(404).json({error: "Restaurant not found"})
        return res.status(200).json(restaurant)
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.createRestaurant = async (req,res) => {
    try{
        const {restaurantName,address,contact,email,eastablishedYear} = req.body
        const restaurant = await Restaurant.create({restaurantName,address,contact,email,eastablishedYear})
        return res.status(201).json(restaurant)    
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.updateRestaurantById = async (req,res) => {
    try{
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        if(!restaurant) return res.status(404).json({error: "Restaurant not found"})
        return res.status(200).json(restaurant)
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.deleteRestaurantById = async (req,res) => {
    try{
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
        if(!restaurant) return res.status(404).json({error: "Restaurant not found"})
        return res.status(200).json({message: "Restaurant deleted successfully"})
        
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}