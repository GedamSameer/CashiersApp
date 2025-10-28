const express = require("express");
const router = express.Router();
const {
  registerCashier,
  loginCashier,
  currentUser
} = require("../controllers/Cashier");
const verifyToken = require("../middleware/authentication")
const verifyAdmin = require("../middleware/authorization")
router.post("/register",verifyToken, verifyAdmin, registerCashier);
router.post("/login", loginCashier);
router.get("/current-user",verifyToken,currentUser)

module.exports = router;