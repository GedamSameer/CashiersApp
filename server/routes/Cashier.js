const express = require("express");
const router = express.Router();
const {
  registerCashier,
  loginCashier
} = require("../controllers/Cashier");

router.post("/register", registerCashier);
router.post("/login", loginCashier);

module.exports = router;