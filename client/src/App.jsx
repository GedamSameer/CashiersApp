import React from "react";
import "./styles/globals.css";


// Pages
import POSPage from "./pages/POSPage";

// Data
import { menuData } from "./data/menuData"; 
// Components
import Header from "./components/layout/Header";

import "./styles/scrollbar.css";

// Hooks
import useCart from "./hooks/useCart";

// Utils
import { calculateCartTotals } from "./utils/calculations";

function App() {
  const {
    cart: cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
  } = useCart();

  const { subtotal, tax, discount, total } = calculateCartTotals(cartItems);
  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <Header totalItems={totalItems} />

      {/* POS Page */}
      <main className="flex-1">
        <POSPage
          menuData={menuData}
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          updateQuantity={updateQuantity}
          total={total}
        />
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-purple-950/40 border-t border-purple-800/40 text-sm text-purple-300">
        © 2025 Rom’s Restaurant POS | Built with ❤️ using React + Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
