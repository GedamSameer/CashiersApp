import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Edit2, X, Check, Search } from "lucide-react";
import useMenuStore from "../zustand-stores/menuStore";
import { CreateMenuItem, DeleteMenuItemById, UpdateMenuItemById } from "../api-calls/Menu";

const ChangeMenu = () => {
  const { menuItems, getAllMenuItems, loading } = useMenuStore();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getAllMenuItems();
  }, [getAllMenuItems]);

  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      setMenu(menuItems);
    }
  }, [menuItems]);

  const [newDish, setNewDish] = useState({ name: "", price: "", category: "", emoji: "" });
  const [editingDish, setEditingDish] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Beverages", "Snacks", "Starters", "Main Course", "Breads", "Dessert"];

  const handleAddDish = async () => {
    if (!newDish.name || !newDish.price || !newDish.category)
      return alert("Please fill all required fields!");
    
    const payload = {
      menuItemName: newDish.name,
      price: parseFloat(newDish.price),
      category: newDish.category,
      emoji: newDish.emoji,
    };

    const { data, error } = await CreateMenuItem(payload);
    if (error) {
      alert("Error adding dish: " + error);
    } else {
      setNewDish({ name: "", price: "", category: "", emoji: "" });
      await getAllMenuItems();
    }
  };

  const handleDeleteDish = async (id) => {
    const { error } = await DeleteMenuItemById(id);
    if (error) {
      alert("Error deleting dish: " + error);
    } else {
      await getAllMenuItems();
    }
  };

  const handleSaveEdit = async () => {
    const payload = {
      menuItemName: editingDish.name,
      price: editingDish.price,
      category: editingDish.category,
      emoji: editingDish.emoji,
    };

    const { error } = await UpdateMenuItemById(editingDish.id, payload);
    if (error) {
      alert("Error updating dish: " + error);
    } else {
      setEditingDish(null);
      await getAllMenuItems();
    }
  };

  const handleEditDish = (dish) => setEditingDish(dish);

  const filteredMenu = menu.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || dish.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row px-4 py-6 md:px-8 md:py-10">
      
      <div className="bg-gradient-to-br from-purple-700 to-purple-900 text-white rounded-2xl shadow-xl p-6 w-full md:w-1/5 mb-6 md:mb-0 md:mr-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <PlusCircle size={26} /> Add New Dish
          </h1>

          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Dish Name"
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              className="p-2 rounded-lg text-black"
            />
            <input
              type="number"
              placeholder="Price"
              value={newDish.price}
              onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
              className="p-2 rounded-lg text-black"
            />
            <select
              value={newDish.category}
              onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
              className="p-2 rounded-lg text-black"
            >
              <option value="">Select Category</option>
              {categories.slice(1).map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Emoji"
              value={newDish.emoji}
              onChange={(e) => setNewDish({ ...newDish, emoji: e.target.value })}
              className="p-2 rounded-lg text-black"
            />

            <button
              onClick={handleAddDish}
              className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 p-2 rounded-lg mt-2 font-bold text-white"
            >
              Add Dish
            </button>
          </div>
        </div>

        <p className="text-sm text-center text-purple-200 mt-6">
          💡 Tip: Add emojis for a more engaging menu.
        </p>
      </div>

      
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Menu</h2>

          
          <div className="relative w-full sm:w-1/2">
            <Search size={18} className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 p-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-purple-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading menu items...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMenu.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">No dishes found.</p>
            ) : (
              filteredMenu.map((dish) => (
              <div
                key={dish.id}
                className="bg-gray-50 hover:bg-purple-50 border border-gray-200 rounded-xl p-4 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                {editingDish?.id === dish.id ? (
                  <>
                    <input
                      type="text"
                      value={editingDish.name}
                      onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                      className="p-2 rounded-lg text-black border"
                    />
                    <input
                      type="number"
                      value={editingDish.price}
                      onChange={(e) => setEditingDish({ ...editingDish, price: parseFloat(e.target.value) })}
                      className="p-2 rounded-lg text-black border mt-2"
                    />

                    <select
                      value={editingDish.category}
                      onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })}
                      className="p-2 rounded-lg text-black border mt-2"
                    >
                      {categories.slice(1).map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editingDish.emoji}
                      onChange={(e) => setEditingDish({ ...editingDish, emoji: e.target.value })}
                      className="p-2 rounded-lg text-black border mt-2"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <Check size={16} /> Save
                      </button>
                      <button
                        onClick={() => setEditingDish(null)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        {dish.emoji} {dish.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {dish.category} • ₹{dish.price}
                      </p>

                    </div>
                    <div className="flex justify-end gap-3 mt-3">
                      <button
                        onClick={() => handleEditDish(dish)}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteDish(dish.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeMenu;
