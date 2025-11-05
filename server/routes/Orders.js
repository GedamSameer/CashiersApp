const express = require("express")
const router = express.Router()
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    getOrdersByCashierName,
    searchOrders,
    updateOrderStatus
} = require("../controllers/Order")
const ValidateObjectId = require("../middleware/validation")
const verifyToken = require("../middleware/authentication")
const verifyAdmin = require("../middleware/authorization")


router.get("/orders", verifyToken, getAllOrders)

router.get("/search-orders", verifyToken, searchOrders)

router.get("/orders/:id", ValidateObjectId, verifyToken, getOrderById)

router.get("/orders/cashier/:cashierName", verifyToken, getOrdersByCashierName)

router.post("/orders", verifyToken, createOrder)

router.put("/orders/:id", ValidateObjectId, verifyToken, verifyAdmin, updateOrderById)

router.patch("/orders/:id/status", ValidateObjectId, verifyToken, updateOrderStatus)

router.delete("/orders/:id", ValidateObjectId, verifyToken, verifyAdmin, deleteOrderById)

module.exports = router
