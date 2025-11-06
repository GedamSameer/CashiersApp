import React, { useState, useEffect } from "react";
import { LogOut, Clock, ChevronDown, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCashierStore from "../zustand-stores/cashierStore";

const CashierDashboard = () => {
  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [orders, setOrders] = useState([]);
  const user = useCashierStore((state) => state.user);
  const logout = useCashierStore((state) => state.logout);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fakeOrders = [
      { id: 101, status: "Pending", timeLeft: 180 },
      { id: 102, status: "Ready", timeLeft: 0 },
      { id: 103, status: "Pending", timeLeft: 120 },
      { id: 104, status: "Completed", timeLeft: 0 },
    ];
    setOrders(fakeOrders);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.status === "Pending" && o.timeLeft > 0
            ? { ...o, timeLeft: o.timeLeft - 1 }
            : o
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: newStatus, timeLeft: 0 } : o
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    logout();
    navigate("/");
  };

  const visibleOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

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
              {visibleOrders.length === 0 ? (
                <p className="text-gray-400 italic text-center">
                  No orders found.
                </p>
              ) : (
                visibleOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center bg-orange-50 p-4 rounded-xl border border-orange-200 hover:bg-orange-100 transition"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        Order #{order.id}
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
                    </div>

                    <div className="flex items-center space-x-2">
                      {order.status === "Pending" && (
                        <>
                          <span className="font-mono text-sm text-orange-600">
                            ⏳ {formatTime(order.timeLeft)}
                          </span>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "Ready")
                            }
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-3 py-1 rounded-md"
                          >
                            Mark Ready
                          </button>
                        </>
                      )}

                      {order.status === "Ready" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "Completed")
                          }
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
      </main>
    </div>
  );
};

export default CashierDashboard;







