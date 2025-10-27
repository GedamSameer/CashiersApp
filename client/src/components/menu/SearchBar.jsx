import React from "react";
import { Search } from "lucide-react"; // ✅ Needed for the icon

const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-purple-800/40 border-2 border-purple-700/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 transition-all"
    />
  </div>
);

export default SearchBar;
