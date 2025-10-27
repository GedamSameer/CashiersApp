import React from "react";
import { Plus } from "lucide-react"; 

const ProductCard = ({ product, onAdd }) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50 group">
    <div className="text-center mb-4">
      <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform">
        {product.emoji}
      </div>
      <h3 className="font-bold text-lg text-white mb-1">{product.name}</h3>
      <p className="text-sm text-gray-400">{product.category}</p>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-green-400">₹{product.price}</span>
      <button
        onClick={() => onAdd(product)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-2 rounded-lg transition-all shadow-md hover:shadow-lg"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default ProductCard;
