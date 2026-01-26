import React, { useState, useEffect } from "react";
import { ClipboardList, Receipt } from "lucide-react";
import useOrderStore from "../zustand-stores/orderStore";

const AdminOrderList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Get orders from orderStore
  const orders = useOrderStore((state) => state.orders);
  const loading = useOrderStore((state) => state.loading);
  const error = useOrderStore((state) => state.error);
  const getAllOrders = useOrderStore((state) => state.getAllOrders);

  // Fetch orders on component mount
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber?.toString().includes(searchTerm.toLowerCase()) ||
      order.cashierName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toString().includes(searchTerm.toLowerCase());
    const matchesStatus =
      !statusFilter ||
      order.orderStatus === statusFilter ||
      statusFilter === "";
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center py-10 px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <ClipboardList size={36} className="text-orange-500" />
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-600">
            All Orders
          </h1>
        </div>
      </div>

      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-md p-6 mb-6 border border-orange-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Search by order ID or customer name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-56 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="w-full max-w-6xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-gray-400 py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="text-lg font-medium mt-4">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-red-400 py-20">
            <p className="text-lg font-medium">Error loading orders: {error}</p>
            <button
              onClick={getAllOrders}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
            {filteredOrders.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-500 mt-10">
                <Receipt size={48} className="text-orange-400 mb-4" />
                <p className="text-lg">No orders found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-orange-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-semibold text-orange-600">
                        Order #{order.orderNumber || order._id?.slice(-6)}
                      </h2>
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          order.orderStatus === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.orderStatus || "Pending"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Customer:</strong>{" "}
                      {order.customer || "Walk-in Customer"}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Date:</strong> {order.date || "—"}
                    </p>

                    <div className="bg-orange-50 rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm text-gray-700"
                        >
                          <span>
                            {item.emoji} {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-orange-100 pt-2 text-right">
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <footer className="text-center text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} Restaurant POS | Powered by{" "}
        <span className="text-orange-500 font-semibold">Cashier App</span>
      </footer>
    </div>
  );
};

export default AdminOrderList;
