// const mongoose = require("mongoose")
// const OrderModel = new mongoose.Schema({
//     name: {type: String, required: true},
// },{versionKey: false})
// module.exports = mongoose.model("cashierOrders",OrderModel)

const mongoose = require("mongoose");

const OrderModel = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "cashierMenus",
          required: true,
        },
        menuItemName: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        emoji: { type: String, required: true },

        //menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "cashierMenus", required: true }
      },
    ],
    totalAmount: { type: Number, required: true },
    cashierName: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Digital"],
      required: true,
    },
    tableNumber: { type: String },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// Update the updatedAt field before saving
OrderModel.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("cashierOrders", OrderModel);
