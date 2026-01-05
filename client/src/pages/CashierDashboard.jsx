import React, { useState, useEffect } from "react";
import {
  LogOut,
  Clock,
  ChevronDown,
  CheckCircle2,
  X,
  Utensils,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useCashierStore from "../zustand-stores/cashierStore";
import useOrderStore from "../zustand-stores/orderStore";

const CashierDashboard = () => {
  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const user = useCashierStore((state) => state.user);
  const logout = useCashierStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  // Get orders and methods from orderStore
  const orders = useOrderStore((state) => state.orders);
  const loading = useOrderStore((state) => state.loading);
  const getAllOrders = useOrderStore((state) => state.getAllOrders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch orders from backend
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders, location.pathname]); // Refetch when navigating back to this page

  const handleUpdateOrderStatus = async (id, newStatus) => {
    const { error } = await updateOrderStatus(id, newStatus);
    if (error) {
      console.error("Error updating order status:", error);
      alert(`Failed to update order status: ${error}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    logout();
    navigate("/");
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const visibleOrders =
    filter === "All"
      ? [...orders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : orders
          .filter((o) => o.status === filter)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 text-gray-800 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-md px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600">
          Cashier Dashboard
        </h1>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium shadow-inner">
            <Clock size={16} className="mr-1" />
            {currentTime}
          </div>
          <span className="font-semibold text-gray-700 hidden sm:block">
            Hi, {user.name || "Cashier"} 👋
          </span>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-500 transition"
            title="Logout"
          >
            <LogOut size={26} />
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 transition-transform hover:scale-[1.01] duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
              <h2 className="text-2xl font-semibold text-orange-600">Orders</h2>

              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between bg-orange-500 text-white w-full sm:w-40 px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
                >
                  <span>{filter}</span>
                  <ChevronDown size={18} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-full sm:w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                    {["All", "Pending", "Ready", "Completed"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilter(status);
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100 transition-colors"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2">
              {loading ? (
                <p className="text-gray-400 italic text-center">
                  Loading orders...
                </p>
              ) : visibleOrders.length === 0 ? (
                <p className="text-gray-400 italic text-center">
                  No orders found.
                </p>
              ) : (
                visibleOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="flex justify-between items-center bg-orange-50 p-4 rounded-xl border border-orange-200 hover:bg-orange-100 transition cursor-pointer"
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

                    <div className="flex items-center space-x-2">
                      {order.status === "Pending" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateOrderStatus(order.id, "Ready");
                          }}
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-3 py-1 rounded-md"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === "Ready" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateOrderStatus(order.id, "Completed");
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center space-x-1"
                        >
                          <CheckCircle2 size={16} />
                          <span>Complete</span>
                        </button>
                      )}

                      {order.status === "Completed" && (
                        <span className="text-sm text-gray-500 italic">
                          ✅ Done
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => navigate("/order")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg mt-6 shadow-md transition-all duration-300"
            >
              View All Orders
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col justify-between transition-transform hover:scale-[1.01] duration-300">
            <div>
              <h2 className="text-2xl font-semibold text-orange-600 mb-2">
                Restaurant Info
              </h2>
              <p className="text-lg font-medium text-gray-800">
                🍽️ The Royal Taste
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Serving excellence since 2024
              </p>
            </div>

            <button
              onClick={() => navigate("/menu")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg mt-8 shadow-md transition-all duration-300"
            >
              + New Order
            </button>
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

export default CashierDashboard;
