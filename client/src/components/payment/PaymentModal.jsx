import React, { useState } from "react";


const calculateChange = (received, total) => {
  const receivedNum = parseFloat(received);
  if (isNaN(receivedNum) || receivedNum < total) return 0;
  return receivedNum - total;
};

const PaymentModal = ({ isOpen, onClose, total, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receivedAmount, setReceivedAmount] = useState("");

  
  if (!isOpen) return null;

  const change = calculateChange(receivedAmount, total);

  const handleConfirm = () => {
    if (
      paymentMethod === "cash" &&
      (!receivedAmount || parseFloat(receivedAmount) < total)
    ) {
      alert("Please enter amount received (must be greater than or equal to total)");
      return;
    }
    onConfirm(paymentMethod, receivedAmount, change);
  };

  const paymentMethods = [
    { id: "cash", name: "Cash", icon: "💵" },
    { id: "card", name: "Card", icon: "💳" },
    { id: "upi", name: "UPI", icon: "📱" },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-purple-700/50">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Payment</h2>

        {/* Total Amount */}
        <div className="bg-purple-800/50 rounded-xl p-6 mb-6 border border-purple-700/50">
          <p className="text-purple-300 text-sm mb-2">Total Amount</p>
          <p className="text-5xl font-bold text-green-400">₹{total}</p>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-purple-200 font-semibold mb-3">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`py-3 rounded-xl font-semibold transition-all flex flex-col items-center gap-1 ${
                  paymentMethod === method.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "bg-purple-800/40 text-purple-200 hover:bg-purple-700/50"
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="text-xs">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cash Payment Field */}
        {paymentMethod === "cash" && (
          <div className="mb-6">
            <label className="block text-purple-200 font-semibold mb-2">Amount Received</label>
            <input
              type="number"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-purple-800/40 border-2 border-purple-700/50 rounded-xl py-3 px-4 text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
            />
            {receivedAmount && parseFloat(receivedAmount) >= total && (
              <p className="text-green-400 mt-2 font-semibold">
                Change: ₹{change.toFixed(2)}
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
