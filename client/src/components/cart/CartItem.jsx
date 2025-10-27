import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="bg-purple-800/30 rounded-xl p-4 mb-3 border border-purple-700/30">
    {/* Top Row — Product + Delete */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{item.emoji}</span>
        <div>
          <h4 className="font-semibold text-white">{item.name}</h4>
          <p className="text-sm text-purple-300">₹{item.price} each</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>

    {/* Bottom Row — Quantity + Total */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 bg-purple-900/50 rounded-lg p-1">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center bg-purple-700 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Minus className="w-4 h-4 text-white" />
        </button>
        <span className="font-bold text-white w-10 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center bg-purple-700 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      <span className="font-bold text-green-400 text-lg">
        ₹{item.price * item.quantity}
      </span>
    </div>
  </div>
);

export default CartItem;
