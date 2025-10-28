const express = require("express");
const router = express.Router();
const {
  registerCashier,
  loginCashier,
  currentUser
} = require("../controllers/Cashier");
const verifyToken = require("../middleware/authentication")
router.post("/register", registerCashier);
router.post("/login", loginCashier);
router.get("/current-user",verifyToken,currentUser)

module.exports = router;