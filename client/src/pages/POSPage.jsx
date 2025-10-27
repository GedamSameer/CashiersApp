import React, { useMemo } from "react";
import ProductCard from "../components/menu/ProductCard";
import SearchBar from "../components/menu/SearchBar";
import CategoryTabs from "../components/menu/CategoryTabs";
import Cart from "../components/cart/Cart";
import Payment from "../components/payment/PaymentModal";

function POSPage({ menuData, cartItems, addToCart, removeFromCart, clearCart }) {
  // 🧮 Calculate subtotal, tax, discount, and total
  const { subtotal, tax, discount, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.05; // 5% GST
    const discount = subtotal > 500 ? subtotal * 0.1 : 0; // 10% off if subtotal > ₹500
    const total = subtotal + tax - discount;
    return { subtotal, tax, discount, total };
  }, [cartItems]);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 🟢 Left Section - Menu Products */}
      <div className="lg:col-span-2">
        <SearchBar />
        <CategoryTabs />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {menuData.all.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </div>

      {/* 🟣 Right Section - Cart + Payment */}
      <div>
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          total={total}
        />
        <Payment total={total} clearCart={clearCart} />
      </div>
    </div>
  );
}

export default POSPage;
