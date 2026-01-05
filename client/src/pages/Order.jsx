import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  Receipt,
  Home,
  ShoppingBag,
  BarChart3,
  Settings,
  X,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../zustand-stores/orderStore";

const Order = () => {
  const navigate = useNavigate();

  // Get orders from orderStore
  const orders = useOrderStore((state) => state.orders);
  const loading = useOrderStore((state) => state.loading);
  const error = useOrderStore((state) => state.error);
  const getAllOrders = useOrderStore((state) => state.getAllOrders);

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Fetch orders on component mount
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const today = new Date().toDateString();

  const todaysOrders = orders
    .filter((order) => {
      const orderDate = new Date(order.createdAt).toDateString();
      return orderDate === today;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalOrders = todaysOrders.length;
  const totalRevenue = todaysOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalItems = todaysOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  );

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      <aside className="w-20 sm:w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center sm:justify-start sm:px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500 hidden sm:block">
              Restaurant POS
            </h1>
            <ClipboardList size={28} className="sm:hidden text-orange-500" />
          </div>

          <nav className="flex flex-col mt-6 space-y-3">
            <button
              onClick={() => navigate("/cashier")}
              className="flex items-center sm:px-6 px-4 py-3 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500 transition w-full text-left"
            >
              <Home size={20} className="text-orange-500" />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Dashboard
              </span>
            </button>

            <button
              onClick={() => navigate("/order")}
              className="flex items-center sm:px-6 px-4 py-3 bg-orange-50 border-l-4 border-orange-500 text-orange-600 font-semibold w-full text-left"
            >
              <ShoppingBag size={20} />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Orders
              </span>
            </button>

            <button
              onClick={() => navigate("/reports")}
              className="flex items-center sm:px-6 px-4 py-3 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500 transition w-full text-left"
            >
              <BarChart3 size={20} className="text-orange-500" />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Reports
              </span>
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="flex items-center sm:px-6 px-4 py-3 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500 transition w-full text-left"
            >
              <Settings size={20} className="text-orange-500" />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Settings
              </span>
            </button>
          </nav>
        </div>

        <div className="sm:px-6 px-4 py-4 border-t border-gray-200 text-sm text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()} Cashier App
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <ClipboardList size={36} className="text-orange-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">Today’s Orders</h1>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-2xl font-bold text-green-500">₹{totalRevenue}</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 border border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Items Sold</p>
            <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Today's Orders
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-lg font-medium mt-4">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 text-red-400">
                <p className="text-lg font-medium">
                  Error loading orders: {error}
                </p>
                <button
                  onClick={getAllOrders}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : todaysOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Receipt size={48} className="mb-4 text-orange-400" />
                <p className="text-lg font-medium">No orders yet today</p>
              </div>
            ) : (
              todaysOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="flex justify-between items-center bg-orange-50 p-4 rounded-xl border border-orange-200 hover:bg-orange-100 transition cursor-pointer h-fit self-start"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {order.orderNumber || `Order #${order.id.slice(-6)}`}
                    </p>
                    <p
                      className={`text-sm ${
                        order.status === "Pending"
                          ? "text-yellow-600"
                          : order.status === "Ready"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {order.status}
                    </p>
                    {order.cashierName && (
                      <p className="text-xs text-gray-500 mt-1">
                        Cashier: {order.cashierName}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Detail Modal */}
        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  Order #
                  {selectedOrder.orderNumber ||
                    `Order #${selectedOrder.id.slice(-6)}`}
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedOrder.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.status === "Ready"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  {selectedOrder.cashierName && (
                    <p className="text-sm text-gray-600">
                      Cashier: {selectedOrder.cashierName}
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji || "🍽️"}</span>
                        <div>
                          <p className="text-gray-800 font-semibold">
                            {item.menuItemName}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-green-600 font-bold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-800">Total Amount</span>
                    <span className="text-green-600">
                      ₹{selectedOrder.totalAmount}
                    </span>
                  </div>
                  {selectedOrder.tableNumber && (
                    <p className="text-sm text-gray-600 mt-2">
                      Table: {selectedOrder.tableNumber}
                    </p>
                  )}
                  {selectedOrder.notes && (
                    <p className="text-sm text-gray-600 mt-1">
                      Notes: {selectedOrder.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Order;
