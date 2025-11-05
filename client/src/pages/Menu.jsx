import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, DollarSign, Package, Search, X } from 'lucide-react';

const Menu = () => {
  const [products] = useState([
    { id: 1, name: 'Masala Chai', price: 40, category: 'Beverages', image: '☕' },
    { id: 2, name: 'Veg Sandwich', price: 120, category: 'Snacks', image: '🥪' },
    { id: 3, name: 'Green Salad', price: 150, category: 'Starters', image: '🥗' },
    { id: 4, name: 'Fresh Juice', price: 80, category: 'Beverages', image: '🧃' },
    { id: 5, name: 'Pizza', price: 280, category: 'Main Course', image: '🍕' },
    { id: 6, name: 'Mineral Water', price: 20, category: 'Beverages', image: '💧' },
    { id: 7, name: 'Veg Burger', price: 160, category: 'Main Course', image: '🍔' },
    { id: 8, name: 'Herbal Tea', price: 50, category: 'Beverages', image: '🍵' },
    { id: 9, name: 'Pasta', price: 220, category: 'Main Course', image: '🍝' },
    { id: 10, name: 'Smoothie', price: 120, category: 'Beverages', image: '🥤' },
    { id: 11, name: 'Cookie', price: 60, category: 'Dessert', image: '🍪' },
    { id: 12, name: 'Cake Slice', price: 140, category: 'Dessert', image: '🍰' },
    { id: 13, name: 'Samosa', price: 30, category: 'Snacks', image: '🥟' },
    { id: 14, name: 'Paneer Tikka', price: 250, category: 'Starters', image: '�串' },
    { id: 15, name: 'Dal Makhani', price: 200, category: 'Main Course', image: '🍛' },
    { id: 16, name: 'Naan', price: 40, category: 'Breads', image: '🫓' },
    { id: 17, name: 'Biryani', price: 280, category: 'Main Course', image: '🍚' },
    { id: 18, name: 'Gulab Jamun', price: 80, category: 'Dessert', image: '🍡' },
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const categories = ['All', 'Beverages', 'Snacks', 'Starters', 'Main Course', 'Breads', 'Dessert'];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = () => {
    const receipt = {
      items: [...cart],
      subtotal,
      tax,
      total,
      date: new Date().toLocaleString(),
    };
    setLastReceipt(receipt);
    setShowReceipt(true);
    setCart([]);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-purple-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <ShoppingCart className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Rom's Restaurant</h1>
                <p className="text-purple-300 text-sm">Modern POS System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-purple-300 text-sm">Total Items</p>
              <p className="text-3xl font-bold text-white">{cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500 border-opacity-30 p-6">
              {/* Search and Filter */}
              <div className="mb-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 text-purple-300" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-slate-800 bg-opacity-50 text-purple-300 hover:bg-opacity-70'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform shadow-lg border border-purple-500 border-opacity-20 hover:border-opacity-50"
                  >
                    <div className="text-5xl mb-2 text-center">{product.image}</div>
                    <h3 className="text-white font-semibold text-center mb-1">{product.name}</h3>
                    <p className="text-purple-300 text-xs text-center mb-2">{product.category}</p>
                    <p className="text-green-400 font-bold text-center text-lg">₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500 border-opacity-30 p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <ShoppingCart className="mr-2" />
                Cart
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto text-purple-300 mb-3" size={48} />
                  <p className="text-purple-300">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="bg-slate-800 bg-opacity-50 rounded-lg p-3 border border-purple-500 border-opacity-20">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">{item.name}</h3>
                            <p className="text-purple-300 text-sm">₹{item.price} each</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-1 transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-1 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="text-green-400 font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-purple-500 border-opacity-30 pt-4 space-y-2">
                    <div className="flex justify-between text-purple-300">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-purple-300">
                      <span>GST (5%):</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white text-xl font-bold">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <DollarSign className="mr-2" />
                    Complete Purchase
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && lastReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
              <p className="text-gray-600">{lastReceipt.date}</p>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              {lastReceipt.items.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span className="text-gray-700">{item.name} x{item.quantity}</span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>₹{lastReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>GST:</span>
                <span>₹{lastReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span>₹{lastReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReceipt(false)}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;