import React from "react";


const categories = [
  "All",
  "Burgers",
  "Pizzas",
  "Drinks",
  "Desserts",
  "Snacks",
];

const CategoryTabs = ({ selected, onSelect }) => (
  <div className="flex gap-2 overflow-x-auto pb-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        className={`px-6 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
          selected === category
            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
            : "bg-purple-800/40 text-purple-200 hover:bg-purple-700/50"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
