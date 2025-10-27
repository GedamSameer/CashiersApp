import React from "react";
import { ShoppingCart } from "lucide-react"; 

const Header = ({ totalItems }) => (
  <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-4 px-6 shadow-2xl">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg">
          <ShoppingCart className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rom's Restaurant</h1>
          <p className="text-sm text-purple-200">Modern POS System</p>
        </div>
      </div>
      <div className="bg-purple-700/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-purple-500/30">
        <p className="text-sm text-purple-200">Total Items</p>
        <p className="text-3xl font-bold">{totalItems}</p>
      </div>
    </div>
  </header>
);

export default Header;  
