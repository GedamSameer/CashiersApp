import React, { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Home,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../zustand-stores/orderStore";

const Reports = () => {
  const navigate = useNavigate();
  const { orders, loading, getAllOrders } = useOrderStore();

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    popularItems: [],
    revenueByDay: [],
    ordersByDay: [],
  });

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      calculateAnalytics();
    }
  }, [orders]);

  const calculateAnalytics = () => {
    // Total revenue and orders
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Popular items
    const itemCount = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const key = item.menuItemName;
        if (itemCount[key]) {
          itemCount[key] += item.quantity;
        } else {
          itemCount[key] = item.quantity;
        }
      });
    });

    const popularItems = Object.entries(itemCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Revenue and orders by day (last 7 days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      last7Days.push(dateString);
    }

    const revenueByDay = last7Days.map((day) => {
      const dayOrders = orders.filter(
        (order) => new Date(order.createdAt).toDateString() === day
      );
      return {
        day: day.split(" ").slice(0, 3).join(" "), // Short day name
        revenue: dayOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      };
    });

    const ordersByDay = last7Days.map((day) => {
      const dayOrders = orders.filter(
        (order) => new Date(order.createdAt).toDateString() === day
      );
      return {
        day: day.split(" ").slice(0, 3).join(" "),
        orders: dayOrders.length,
      };
    });

    setAnalytics({
      totalRevenue,
      totalOrders,
      averageOrderValue,
      popularItems,
      revenueByDay,
      ordersByDay,
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      <aside className="w-20 sm:w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center sm:justify-start sm:px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500 hidden sm:block">
              Restaurant POS
            </h1>
            <BarChart3 size={28} className="sm:hidden text-orange-500" />
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
              className="flex items-center sm:px-6 px-4 py-3 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-500 transition w-full text-left"
            >
              <ShoppingCart size={20} className="text-orange-500" />
              <span className="ml-3 text-sm sm:text-base hidden sm:inline">
                Orders
              </span>
            </button>

            <button
              onClick={() => navigate("/reports")}
              className="flex items-center sm:px-6 px-4 py-3 bg-orange-50 border-l-4 border-orange-500 text-orange-600 font-semibold w-full text-left"
            >
              <BarChart3 size={20} />
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
            <BarChart3 size={36} className="text-orange-500" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              Analytics & Reports
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="text-lg font-medium mt-4">Loading analytics...</p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{analytics.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign size={32} className="text-green-500" />
                </div>
              </div>

              <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {analytics.totalOrders}
                    </p>
                  </div>
                  <ShoppingCart size={32} className="text-blue-500" />
                </div>
              </div>

              <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Average Order Value</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{analytics.averageOrderValue.toFixed(0)}
                    </p>
                  </div>
                  <TrendingUp size={32} className="text-purple-500" />
                </div>
              </div>

              <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Popular Item</p>
                    <p className="text-lg font-bold text-orange-600">
                      {analytics.popularItems[0]?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {analytics.popularItems[0]?.count || 0} sold
                    </p>
                  </div>
                  <BarChart3 size={32} className="text-orange-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Items */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Top Selling Items
                </h2>
                <div className="space-y-3">
                  {analytics.popularItems.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {item.count} sold
                      </span>
                    </div>
                  ))}
                  {analytics.popularItems.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No data available
                    </p>
                  )}
                </div>
              </div>

              {/* Revenue Chart (Simple bar representation) */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Revenue Trend (Last 7 Days)
                </h2>
                <div className="space-y-3">
                  {analytics.revenueByDay.map((day, index) => (
                    <div key={day.day} className="flex items-center gap-3">
                      <div className="w-12 text-sm text-gray-600">
                        {day.day}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-green-500 h-4 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              (day.revenue /
                                Math.max(
                                  ...analytics.revenueByDay.map(
                                    (d) => d.revenue
                                  )
                                )) *
                                100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="w-16 text-right text-sm font-medium text-gray-800">
                        ₹{day.revenue.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders by Day */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Orders by Day (Last 7 Days)
                </h2>
                <div className="space-y-3">
                  {analytics.ordersByDay.map((day) => (
                    <div
                      key={day.day}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-800">
                        {day.day}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-blue-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full"
                            style={{
                              width: `${Math.min(
                                (day.orders /
                                  Math.max(
                                    ...analytics.ordersByDay.map(
                                      (d) => d.orders
                                    )
                                  )) *
                                  100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-blue-600 w-8 text-right">
                          {day.orders}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Revenue</span>
                    <span className="font-bold text-green-600">
                      ₹{analytics.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-bold text-blue-600">
                      {analytics.totalOrders}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Order Value</span>
                    <span className="font-bold text-purple-600">
                      ₹{analytics.averageOrderValue.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Items Sold Today</span>
                    <span className="font-bold text-orange-600">
                      {analytics.ordersByDay[analytics.ordersByDay.length - 1]
                        ?.orders || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Reports;
