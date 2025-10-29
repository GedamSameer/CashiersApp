const Menu = require("../models/Menu")
exports.getAllMenuItems = async (req,res) => {
    try{
        const menuItems = await Menu.find({})
        if(!menuItems || menuItems.length === 0) return res.status(404).json({error: "No menu items found"})
        return res.status(200).json(menuItems)
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.searchMenuItem = async (req,res) => {
    try{
        const search = req.query.search || ""
        const query = search ? {menuItemName: {$regex:search,$options:"i"}}:{}
        const menuItems = await Menu.find(query).limit(10)
        if(menuItems.length === 0) return res.status(404).json({error: "No menu item found"})
        return res.status(200).json(menuItems)
    }catch (err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.getMenuItemById = async (req,res) => {
    try{
        const menuItem = await Menu.findById(req.params.id);
        if(!menuItem) return res.status(404).json({error: "Menu Item not found"})
        return res.status(200).json(menuItem)
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.createMenuItem = async (req,res) => {
    try{
        const {menuItemName,category,price,emoji} = req.body
        const menuItem = await Menu.create({menuItemName,category,price,emoji})
        return res.status(201).json(menuItem)    
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.updateMenuItemById = async (req,res) => {
    try{
        const menuItem = await Menu.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        if(!menuItem) return res.status(404).json({error: "Menu Item not found"})
        return res.status(200).json(menuItem)
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}
exports.deleteMenuItemById = async (req,res) => {
    try{
        const menuItem = await Menu.findByIdAndDelete(req.params.id)
        if(!menuItem ) return res.status(404).json({error: "Menu Item not found"})
        return res.status(200).json({message: "Menu Item deleted successfully"})
        
    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Server error"})
    }
}