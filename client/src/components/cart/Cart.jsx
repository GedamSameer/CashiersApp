import React from "react";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import { calculateCartTotals } from "../../utils/calculations";

const Cart = ({ items = [], onUpdateQuantity, onRemove, onCheckout, onClear }) => {
  if (!Array.isArray(items)) {
    console.error("Cart received invalid items:", items);
    return <div className="text-red-500 p-4">Error: Invalid cart data</div>;
  }

  const { subtotal, tax, discount, total } = calculateCartTotals(items);

  return (
    <div className="p-4 bg-purple-900/40 rounded-2xl shadow-lg">
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-purple-800/30 p-2 rounded-lg">
                <span>{item.name}</span>
                <span className="text-sm text-purple-200">
                  {item.quantity} × ₹{item.price}
                </span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <CartSummary subtotal={subtotal} tax={tax} discount={discount} total={total} />
          <div className="mt-4 flex justify-between">
            <button onClick={onClear} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
              Clear Cart
            </button>
            <button onClick={onCheckout} className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
