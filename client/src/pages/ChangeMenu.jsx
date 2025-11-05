import React, { useState } from "react";
import { PlusCircle, Trash2, Edit2, X, Check } from "lucide-react";

const ChangeMenu = () => {
  const [menu, setMenu] = useState([
    { id: 1, name: "Masala Chai", price: 40, category: "Beverages", emoji: "☕" },
    { id: 2, name: "Veg Sandwich", price: 120, category: "Snacks", emoji: "🥪" },
    { id: 3, name: "Pizza", price: 280, category: "Main Course", emoji: "🍕" },
    { id: 4, name: "Gulab Jamun", price: 80, category: "Dessert", emoji: "🍡" },
  ]);

  const [newDish, setNewDish] = useState({ name: "", price: "", category: "", emoji: "" });
  const [editingDish, setEditingDish] = useState(null);

  const categories = ["Beverages", "Snacks", "Starters", "Main Course", "Breads", "Dessert"];

  const handleAddDish = () => {
    if (!newDish.name || !newDish.price || !newDish.category) return alert("Please fill all fields!");
    setMenu([
      ...menu,
      { ...newDish, id: Date.now(), price: parseFloat(newDish.price) },
    ]);
    setNewDish({ name: "", price: "", category: "", emoji: "" });
  };

  const handleDeleteDish = (id) => {
    setMenu(menu.filter((dish) => dish.id !== id));
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
  };

  const handleSaveEdit = () => {
    setMenu(
      menu.map((dish) => (dish.id === editingDish.id ? editingDish : dish))
    );
    setEditingDish(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg w-[600px] h-[500px] flex flex-col items-center justify-start p-4 overflow-y-auto">

        
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <PlusCircle className="text-purple-400" /> Manage Menu
        </h1>

        <div className="flex flex-col space-y-3 w-full mb-6">
          <input
            type="text"
            placeholder="Dish Name"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            className="p-2 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="number"
            placeholder="Price"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
            className="p-2 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <select
            value={newDish.category}
            onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
            className="p-2 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Emoji (optional)"
            value={newDish.emoji}
            onChange={(e) => setNewDish({ ...newDish, emoji: e.target.value })}
            className="p-2 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleAddDish}
            className="bg-purple-900 hover:bg-black transition-colors duration-200 p-2 rounded-lg mt-2 text-lg shadow-lg font-bold text-white"
          >
            Add Dish
          </button>
        </div>

      
        <div className="flex flex-col space-y-3 w-full overflow-y-auto">
          {menu.length === 0 ? (
            <p className="text-gray-300 text-center">No dishes added yet.</p>
          ) : (
            menu.map((dish) => (
              <div
                key={dish.id}
                className="bg-purple-900 bg-opacity-40 rounded-lg p-4 border border-purple-700 flex justify-between items-center"
              >
                {editingDish?.id === dish.id ? (
                  <div className="flex flex-col space-y-2 w-full">
                    <input
                      type="text"
                      value={editingDish.name}
                      onChange={(e) =>
                        setEditingDish({ ...editingDish, name: e.target.value })
                      }
                      className="p-2 rounded-lg text-black bg-white border border-purple-900 focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="number"
                      value={editingDish.price}
                      onChange={(e) =>
                        setEditingDish({
                          ...editingDish,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="p-2 rounded-lg text-black bg-white border border-purple-900 focus:ring-2 focus:ring-black"
                    />
                    <select
                      value={editingDish.category}
                      onChange={(e) =>
                        setEditingDish({
                          ...editingDish,
                          category: e.target.value,
                        })
                      }
                      className="p-2 rounded-lg text-black bg-white border border-purple-900 focus:ring-2 focus:ring-black"
                    >
                      {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        <Check size={18} className="inline mr-1" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingDish(null)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        <X size={18} className="inline mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-white font-bold text-lg flex items-center gap-2">
                        {dish.emoji} {dish.name}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {dish.category} • ₹{dish.price}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditDish(dish)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteDish(dish.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeMenu;
