// src/utils/calculation.js

// 🔹 Calculate all cart totals: subtotal, tax, discount, and total
export const calculateCartTotals = (cartItems = []) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const tax = Math.round(subtotal * 0.05); // 5% tax
  const discount = 0; // placeholder (can be dynamic later)
  const total = subtotal + tax - discount;

  return { subtotal, tax, discount, total };
};

// 🔹 Calculate balance/change for cash payments
export const calculateChange = (receivedAmount, total) => {
  const amount = parseFloat(receivedAmount);
  const totalAmount = parseFloat(total);
  return !isNaN(amount) && !isNaN(totalAmount)
    ? Math.max(0, amount - totalAmount)
    : 0;
};
