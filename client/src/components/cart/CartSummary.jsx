import React from "react";

const CartSummary = ({ subtotal, tax, discount, total }) => (
  <div className="space-y-3 mb-4 pt-4 border-t-2 border-purple-700/50">
    <div className="flex justify-between text-purple-200">
      <span>Subtotal</span>
      <span className="font-semibold">₹{subtotal}</span>
    </div>

    <div className="flex justify-between text-purple-200">
      <span>Tax (5%)</span>
      <span className="font-semibold">₹{tax}</span>
    </div>

    <div className="flex justify-between text-purple-200">
      <span>Discount</span>
      <span className="font-semibold">₹{discount}</span>
    </div>

    <div className="flex justify-between text-white text-xl font-bold pt-3 border-t-2 border-purple-700/50">
      <span>Total</span>
      <span className="text-green-400">₹{total}</span>
    </div>
  </div>
);

export default CartSummary;
