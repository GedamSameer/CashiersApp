
import React, { useState, useEffect } from "react";
import { LogOut, Clock, ChevronDown, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCashierStore from "../zustand-stores/cashierStore";

const CashierDashboard = () => {
    const [filter, setFilter] = useState("All");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [orders, setOrders] = useState([]);
    const user = useCashierStore(state => state.user)
    const logout = useCashierStore(state => state.logout)
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
            prev.map((o) => (o.id === id ? { ...o, status: newStatus, timeLeft: 0 } : o))
        );
    };


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.clear();
        logout()
        navigate("/");
    };


    const visibleOrders =
        filter === "All" ? orders : orders.filter((o) => o.status === filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 sm:p-8 font-sans relative overflow-hidden">
            <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-purple-800/40 pb-4 relative">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent text-center sm:text-left">
                    Cashier Dashboard
                </h1>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="text-sm sm:text-base text-purple-300 font-mono px-3 py-1 rounded-lg border border-purple-700/40 shadow-sm">
                        <Clock size={16} className="inline mr-1 text-purple-400" />
                        {currentTime}
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-purple-200">
                        Welcome, {user.name} 👑
                    </span>
                    <button
                        onClick={handleLogout}
                        className="hover:text-red-400 transition-transform transform hover:scale-110"
                        title="Logout"
                    >
                        <LogOut size={26} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-700/30 transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-semibold text-purple-300">Orders</h2>

                        <div className="relative w-full sm:w-auto">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center justify-center sm:justify-start space-x-2 bg-purple-700/80 w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                            >
                                <Clock size={18} />
                                <span>{filter}</span>
                                <ChevronDown size={18} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-full sm:w-44 bg-slate-800/90 rounded-xl shadow-xl border border-purple-700/40 z-20">
                                    {["All", "Pending", "Ready", "Completed"].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setFilter(status);
                                                setDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-purple-600/50 transition-colors"
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                        {visibleOrders.length === 0 ? (
                            <p className="text-gray-400 italic text-center">
                                No orders found.
                            </p>
                        ) : (
                            visibleOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-purple-700/20 hover:bg-slate-700/50 transition"
                                >
                                    <div>
                                        <p className="text-lg font-semibold text-purple-200">
                                            Order #{order.id}
                                        </p>
                                        <p
                                            className={`text-sm ${order.status === "Pending"
                                                    ? "text-yellow-400"
                                                    : order.status === "Ready"
                                                        ? "text-green-400"
                                                        : "text-gray-400"
                                                }`}
                                        >
                                            {order.status}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        {order.status === "Pending" && (
                                            <>
                                                <span className="font-mono text-sm text-purple-300">
                                                    ⏳ {formatTime(order.timeLeft)}
                                                </span>
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, "Ready")}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-1 rounded-md transition"
                                                >
                                                    Mark Ready
                                                </button>
                                            </>
                                        )}

                                        {order.status === "Ready" && (
                                            <button
                                                onClick={() => updateOrderStatus(order.id, "Completed")}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md flex items-center space-x-1 transition"
                                            >
                                                <CheckCircle2 size={16} />
                                                <span>Complete</span>
                                            </button>
                                        )}

                                        {order.status === "Completed" && (
                                            <span className="text-sm text-gray-400 italic">
                                                ✅ Done
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


                    <button
                        onClick={() => navigate("/orders")}
                        className="bg-purple-700 hover:bg-purple-800 transition-all duration-300 px-5 py-3 rounded-xl shadow-lg font-semibold tracking-wide w-full mt-6"
                    >
                        View All Orders
                    </button>
                </div>


                <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-700/30 flex flex-col justify-between transition-transform hover:scale-[1.02] duration-300">
                    <div>
                        <h2 className="text-2xl font-semibold text-purple-300 mb-3">
                            Restaurant
                        </h2>
                        <p className="text-xl font-medium text-purple-100">
                            🍽️ The Royal Taste
                        </p>
                        <p className="text-sm text-purple-300/70 mt-2 italic">
                            Serving excellence since 2024
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/project")}
                        className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 transition-all duration-300 px-6 py-4 rounded-xl font-bold text-lg shadow-lg w-full"
                    >
                        + New Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CashierDashboard;







