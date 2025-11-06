import React, { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  DollarSign,
  Package,
  Search,
  X,
} from "lucide-react";

const Menu = () => {
  const [products] = useState([
    { id: 1, name: "Masala Chai", price: 40, category: "Beverages", image: "☕", description: "Spiced Indian tea with milk and aromatic herbs." },
    { id: 2, name: "Veg Sandwich", price: 120, category: "Snacks", image: "🥪", description: "Fresh vegetables layered between soft bread slices." },
    { id: 3, name: "Green Salad", price: 150, category: "Starters", image: "🥗", description: "Crisp lettuce, cucumber, and veggies tossed with dressing." },
    { id: 4, name: "Fresh Juice", price: 80, category: "Beverages", image: "🧃", description: "Seasonal fruit juice served chilled." },
    { id: 5, name: "Pizza", price: 280, category: "Main Course", image: "🍕", description: "Cheesy pizza topped with fresh veggies and herbs." },
    { id: 6, name: "Mineral Water", price: 20, category: "Beverages", image: "💧", description: "Pure and refreshing bottled water." },
    { id: 7, name: "Veg Burger", price: 160, category: "Main Course", image: "🍔", description: "Grilled veggie patty with lettuce and cheese in a bun." },
    { id: 8, name: "Herbal Tea", price: 50, category: "Beverages", image: "🍵", description: "A calming tea infused with herbs and spices." },
    { id: 9, name: "Pasta", price: 220, category: "Main Course", image: "🍝", description: "Creamy Italian-style pasta with herbs and cheese." },
    { id: 10, name: "Smoothie", price: 120, category: "Beverages", image: "🥤", description: "Thick fruit smoothie with a touch of honey." },
    { id: 11, name: "Cookie", price: 60, category: "Dessert", image: "🍪", description: "Crispy and chewy chocolate chip cookie." },
    { id: 12, name: "Cake Slice", price: 140, category: "Dessert", image: "🍰", description: "Soft sponge cake with creamy frosting." },
    { id: 13, name: "Samosa", price: 30, category: "Snacks", image: "🥟", description: "Crispy pastry filled with spiced potatoes and peas." },
    { id: 14, name: "Paneer Tikka", price: 250, category: "Starters", image: "🍢", description: "Grilled paneer cubes marinated in rich Indian spices." },
    { id: 15, name: "Dal Makhani", price: 200, category: "Main Course", image: "🍛", description: "Creamy black lentil curry cooked overnight." },
    { id: 16, name: "Naan", price: 40, category: "Breads", image: "🫓", description: "Soft tandoor-baked flatbread, perfect with curries." },
    { id: 17, name: "Biryani", price: 280, category: "Main Course", image: "🍚", description: "Fragrant basmati rice cooked with spices and vegetables." },
    { id: 18, name: "Gulab Jamun", price: 80, category: "Dessert", image: "🍡", description: "Sweet milk dumplings soaked in sugar syrup." },
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const categories = ["All", "Beverages", "Snacks", "Starters", "Main Course", "Breads", "Dessert"];

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id));

  const updateQuantity = (id, delta) =>
    setCart(
      cart
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setLastReceipt({
      items: [...cart],
      subtotal,
      tax,
      total,
      date: new Date().toLocaleString(),
    });
    setShowReceipt(true);
    setCart([]);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || p.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">🍽️ Rom’s Restaurant POS</h1>
          <div className="flex items-center gap-2 bg-gray-50 border rounded-full px-4 py-1">
            <ShoppingCart size={20} className="text-gray-600" />
            <span className="text-gray-800 font-medium">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-xl shadow p-5">
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="md:flex gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                className="cursor-pointer bg-gray-50 hover:bg-indigo-50 border rounded-xl p-3 text-center transition-all shadow-sm hover:shadow-md"
              >
                <div className="text-4xl mb-2">{p.image}</div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{p.name}</h3>
                <p className="text-xs text-gray-500 italic mb-1">{p.description}</p>
                <p className="text-xs text-gray-500">{p.category}</p>
                <p className="text-indigo-600 font-bold mt-1">₹{p.price}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-white rounded-xl shadow p-5 sticky top-24 h-fit">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
            <ShoppingCart className="mr-2 text-indigo-500" /> Cart
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <Package className="mx-auto mb-2" size={40} />
              <p>No items yet</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-200 rounded p-1 hover:bg-gray-300">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-200 rounded p-1 hover:bg-gray-300">
                        <Plus size={14} />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 ml-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-3 text-sm space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-base">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <DollarSign size={18} /> Checkout
              </button>
            </>
          )}
        </aside>
      </main>

      {showReceipt && lastReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full relative shadow-xl">
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-center mb-4 text-gray-800">
              Payment Successful
            </h2>
            <p className="text-center text-sm text-gray-500 mb-4">{lastReceipt.date}</p>

            <div className="border-t border-b py-3 mb-3">
              {lastReceipt.items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm mb-1">
                  <span>
                    {i.name} x{i.quantity}
                  </span>
                  <span>₹{(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{lastReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>₹{lastReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>₹{lastReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReceipt(false)}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
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
