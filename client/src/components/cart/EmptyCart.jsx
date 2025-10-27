import React from "react";
import { Package } from "lucide-react";

const EmptyCart = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
    <Package className="w-20 h-20 text-purple-500 mb-4 opacity-50" />
    <p className="text-purple-300 text-lg font-medium">Your cart is empty</p>
    <p className="text-purple-400 text-sm mt-2">Add items from the menu</p>
  </div>
);

export default EmptyCart;
