const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config
const Cashier = require("../models/Cashiers");

// ✅ Register a new cashier
exports.registerCashier = async (req, res) => {
  try {
    const { email, password, ...otherData } = req.body;

    // Check if email already exists
    const existingCashier = await Cashier.findOne({ email });
    if (existingCashier)
      return res.status(400).json({ error: "Cashier already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const cashier = new Cashier({
      ...otherData,
      email,
      password: hashedPassword,
    });

    await cashier.save();
    return res.status(201).json({ message: "Cashier Registration successful", cashier });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Login cashier
exports.loginCashier = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(email === process.env.ADMIN_EMAIL){
      if(password !== process.env.ADMIN_PASSWORD){
        return res.status(400).json({error: "Invalid Admin credentials"})
      }
      const token = jwt.sign({email,role: true},process.env.JWT_SECRET,{expiresIn: "1d"})
      return res.status(200).json({message:"Admin Login successful",token, user: {email, role: true}});
    }
    const cashier = await Cashier.findOne({ email });
    if (!cashier) return res.status(404).json({ error: "Cashier not found" });
    const isMatch = await bcrypt.compare(password, cashier.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Cashier credentials" });
    const token = jwt.sign({id: cashier._id,role: false},process.env.JWT_SECRET,{expiresIn: "1d"})
    return res.status(200).json({message:"Login successful",token,user: { ...cashier._doc, role: false }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
exports.currentUser = async (req,res) => {
    try{
        if(req.user.role){
          return res.status(200).json({email: process.env.ADMIN_EMAIL, role: true})
        }
        const cashier = await Cashier.findById(req.user.id)
        if(!cashier) return res.status(404).json({error: "Cashier not found"})
        return res.status(200).json(cashier)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}
