// export const menuData = {
//   all: [
//     { id: 1, name: "Masala Chai", category: "Beverages", price: 40, emoji: "☕" },
//     { id: 2, name: "Veg Sandwich", category: "Snacks", price: 120, emoji: "🍔" },
//     { id: 3, name: "Green Salad", category: "Starters", price: 150, emoji: "🥗" },
//     { id: 4, name: "Fresh Juice", category: "Beverages", price: 80, emoji: "🧃" },
//     { id: 5, name: "Pizza", category: "Main Course", price: 280, emoji: "🍕" },
//     { id: 6, name: "Mineral Water", category: "Beverages", price: 20, emoji: "💧" },
//     { id: 7, name: "Veg Burger", category: "Main Course", price: 180, emoji: "🍔" },
//     { id: 8, name: "Herbal Tea", category: "Beverages", price: 50, emoji: "🍵" },
//     { id: 9, name: "Pasta", category: "Main Course", price: 220, emoji: "🍝" },
//     { id: 10, name: "French Fries", category: "Snacks", price: 100, emoji: "🍟" },
//     { id: 11, name: "Ice Cream", category: "Dessert", price: 90, emoji: "🍨" },
//     { id: 12, name: "Garlic Bread", category: "Breads", price: 110, emoji: "🍞" },
//     { id: 13, name: "Cold Coffee", category: "Beverages", price: 120, emoji: "🥤" },
//     { id: 14, name: "Spring Rolls", category: "Starters", price: 140, emoji: "🥟" },
//     { id: 15, name: "Chocolate Cake", category: "Dessert", price: 160, emoji: "🍰" },
//     { id: 16, name: "Naan", category: "Breads", price: 40, emoji: "🫓" },
//     { id: 17, name: "Paneer Tikka", category: "Starters", price: 200, emoji: "🧆" },
//     { id: 18, name: "Biryani", category: "Main Course", price: 250, emoji: "🍛" },
//   ],
// };

// export const categories = [
//   "All",
//   "Beverages",
//   "Snacks",
//   "Starters",
//   "Main Course",
//   "Breads",
//   "Dessert",
// ];


import React, { useState } from 'react';
import { Plus, Minus, Trash2, Edit2, Save, X, ShoppingCart, Receipt, Search, Package, ClipboardList } from 'lucide-react';

const initialMenuData = [
  { id: 1, name: "Masala Chai", category: "Beverages", price: 40, emoji: "☕" },
  { id: 2, name: "Veg Sandwich", category: "Snacks", price: 120, emoji: "🍔" },
  { id: 3, name: "Green Salad", category: "Starters", price: 150, emoji: "🥗" },
  { id: 4, name: "Fresh Juice", category: "Beverages", price: 80, emoji: "🧃" },
  { id: 5, name: "Pizza", category: "Main Course", price: 280, emoji: "🍕" },
  { id: 6, name: "Mineral Water", category: "Beverages", price: 20, emoji: "💧" },
  { id: 7, name: "Veg Burger", category: "Main Course", price: 180, emoji: "🍔" },
  { id: 8, name: "Herbal Tea", category: "Beverages", price: 50, emoji: "🍵" },
  { id: 9, name: "Pasta", category: "Main Course", price: 220, emoji: "🍝" },
  { id: 10, name: "French Fries", category: "Snacks", price: 100, emoji: "🍟" },
  { id: 11, name: "Ice Cream", category: "Dessert", price: 90, emoji: "🍨" },
  { id: 12, name: "Garlic Bread", category: "Breads", price: 110, emoji: "🍞" },
  { id: 13, name: "Cold Coffee", category: "Beverages", price: 120, emoji: "🥤" },
  { id: 14, name: "Spring Rolls", category: "Starters", price: 140, emoji: "🥟" },
  { id: 15, name: "Chocolate Cake", category: "Dessert", price: 160, emoji: "🍰" },
  { id: 16, name: "Naan", category: "Breads", price: 40, emoji: "🫓" },
  { id: 17, name: "Paneer Tikka", category: "Starters", price: 200, emoji: "🧆" },
  { id: 18, name: "Biryani", category: "Main Course", price: 250, emoji: "🍛" },
];

const categories = [
  "All",
  "Beverages",
  "Snacks",
  "Starters",
  "Main Course",
  "Breads",
  "Dessert",
];

function RestaurantPOS() {
  const [menuData, setMenuData] = useState(initialMenuData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", category: "Beverages", price: "", emoji: "🍽️" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu items by category and search
  const filteredMenu = menuData.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Update cart item quantity
  const updateQuantity = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: orders.length + 1,
      items: [...cart],
      total: calculateTotal(),
      timestamp: new Date().toLocaleString(),
      time: new Date().toLocaleTimeString()
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    alert('Order placed successfully! 🎉');
  };

  // Calculate daily statistics
  const getDailyStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalItems = orders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );
    return { totalOrders, totalRevenue, totalItems };
  };

  // Add new menu item
  const addMenuItem = () => {
    if (newItem.name && newItem.price) {
      const newId = Math.max(...menuData.map(item => item.id), 0) + 1;
      setMenuData([...menuData, { ...newItem, id: newId, price: parseFloat(newItem.price) }]);
      setNewItem({ name: "", category: "Beverages", price: "", emoji: "🍽️" });
      setShowAddForm(false);
    }
  };

  // Edit menu item
  const startEditing = (item) => {
    setEditingItem({ ...item });
  };

  const saveEdit = () => {
    setMenuData(menuData.map(item =>
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  // Delete menu item
  const deleteMenuItem = (id) => {
    setMenuData(menuData.filter(item => item.id !== id));
  };

  const stats = getDailyStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-purple-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
              <ShoppingCart size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Rom's Restaurant</h1>
              <p className="text-sm text-gray-300">Modern POS System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">Total Items</p>
            <p className="text-3xl font-bold">{getTotalItems()}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gradient-to-r from-gray-900 to-purple-900 border-t border-purple-700/50">
        <div className="container mx-auto flex">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "menu"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-gray-300 hover:bg-purple-800/50"
            }`}
          >
            <ShoppingCart size={20} />
            Place Order
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "orders"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-gray-300 hover:bg-purple-800/50"
            }`}
          >
            <ClipboardList size={20} />
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex-1 py-4 px-6 font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "manage"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-gray-300 hover:bg-purple-800/50"
            }`}
          >
            <Edit2 size={20} />
            Manage Menu
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Menu / Orders / Management */}
          <div className="lg:col-span-2">
            {activeTab === "menu" ? (
              <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-purple-600/30">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-purple-900/50 text-white placeholder-gray-400 pl-12 pr-4 py-4 rounded-xl border border-purple-600/50 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none transition-all"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/50"
                          : "bg-purple-900/50 text-gray-300 hover:bg-purple-800/50 border border-purple-600/30"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredMenu.map(item => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 hover:from-purple-800 hover:to-indigo-800 transition-all cursor-pointer transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-pink-500"
                      onClick={() => addToCart(item)}
                    >
                      <div className="text-center">
                        <div className="text-5xl mb-3">{item.emoji}</div>
                        <h3 className="font-bold text-white text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">{item.category}</p>
                        <p className="text-2xl font-bold text-green-400">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === "orders" ? (
              <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-purple-600/30">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Receipt className="text-pink-400" size={28} />
                  Today's Order History
                </h2>

                {/* Daily Statistics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 rounded-xl p-4 border border-blue-500/50">
                    <p className="text-blue-300 text-sm mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/30 to-green-800/30 rounded-xl p-4 border border-green-500/50">
                    <p className="text-green-300 text-sm mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-white">₹{stats.totalRevenue}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/30 rounded-xl p-4 border border-purple-500/50">
                    <p className="text-purple-300 text-sm mb-1">Items Sold</p>
                    <p className="text-3xl font-bold text-white">{stats.totalItems}</p>
                  </div>
                </div>

                {/* Orders List */}
                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <ClipboardList size={64} className="mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400 text-lg">No orders yet today</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
                    {orders.map(order => (
                      <div key={order.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">Order #{order.id}</h3>
                            <p className="text-sm text-gray-400">{order.timestamp}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Total</p>
                            <p className="text-2xl font-bold text-green-400">₹{order.total}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-purple-900/30 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{item.emoji}</span>
                                <div>
                                  <p className="text-white font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-400">₹{item.price} × {item.quantity}</p>
                                </div>
                              </div>
                              <p className="text-white font-bold">₹{item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-purple-600/30">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Manage Menu</h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2 shadow-lg"
                  >
                    <Plus size={20} />
                    Add New Item
                  </button>
                </div>

                {/* Add New Item Form */}
                {showAddForm && (
                  <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold mb-3 text-white">Add New Menu Item</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="bg-purple-900/50 text-white placeholder-gray-400 border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-green-500 outline-none"
                      />
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="bg-purple-900/50 text-white border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-green-500 outline-none"
                      >
                        {categories.filter(c => c !== "All").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        className="bg-purple-900/50 text-white placeholder-gray-400 border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-green-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Emoji"
                        value={newItem.emoji}
                        onChange={(e) => setNewItem({ ...newItem, emoji: e.target.value })}
                        className="bg-purple-900/50 text-white placeholder-gray-400 border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-green-500 outline-none"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={addMenuItem}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                      >
                        Add Item
                      </button>
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Menu Items List */}
                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2">
                  {menuData.map(item => (
                    <div key={item.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                      {editingItem && editingItem.id === item.id ? (
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            className="bg-purple-900/50 text-white border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-pink-500 outline-none"
                          />
                          <select
                            value={editingItem.category}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                            className="bg-purple-900/50 text-white border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-pink-500 outline-none"
                          >
                            {categories.filter(c => c !== "All").map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                            className="bg-purple-900/50 text-white border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-pink-500 outline-none"
                          />
                          <input
                            type="text"
                            value={editingItem.emoji}
                            onChange={(e) => setEditingItem({ ...editingItem, emoji: e.target.value })}
                            className="bg-purple-900/50 text-white border-2 border-purple-600/50 rounded-xl px-3 py-2 focus:border-pink-500 outline-none"
                          />
                          <div className="col-span-2 flex gap-2">
                            <button
                              onClick={saveEdit}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2"
                            >
                              <Save size={18} />
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all flex items-center gap-2"
                            >
                              <X size={18} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{item.emoji}</span>
                            <div>
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              <p className="text-sm text-gray-400">{item.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-lg font-bold text-green-400">₹{item.price}</p>
                            <button
                              onClick={() => startEditing(item)}
                              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Cart */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-800/50 to-indigo-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sticky top-6 border border-purple-600/30">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="text-pink-400" size={28} />
                <h2 className="text-2xl font-bold text-white">Cart</h2>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <Package size={64} className="mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
                    {cart.map(item => (
                      <div key={item.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.emoji}</span>
                            <div>
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              <p className="text-sm text-gray-400">₹{item.price} each</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-purple-900/50 rounded-lg border border-purple-600/50">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-purple-800 rounded-l-lg transition-all text-white"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 font-semibold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-purple-800 rounded-r-lg transition-all text-white"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <p className="font-bold text-green-400 text-lg">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-purple-600/50 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-300">Total:</span>
                      <span className="text-3xl font-bold text-green-400">₹{calculateTotal()}</span>
                    </div>
                    <button 
                      onClick={placeOrder}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-pink-500/50 mb-2"
                    >
                      Place Order
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full bg-red-600/20 border-2 border-red-500 text-red-400 py-3 rounded-xl font-semibold hover:bg-red-600/30 transition-all"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default RestaurantPOS;

