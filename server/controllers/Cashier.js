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
    const cashier = await Cashier.findOne({ email });

    if (!cashier) return res.status(404).json({ error: "Cashier not found" });

    const isMatch = await bcrypt.compare(password, cashier.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({id: cashier._id,role: cashier.isAdmin},process.env.jwt_secret,{expiresIn: "1d"})
    return res.status(200).json({message:"Login successful",token,cashier});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
