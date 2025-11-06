import React from "react";
import {
  ClipboardList,
  Receipt,
  Home,
  ShoppingBag,
  BarChart3,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Order = ({ orders = [] }) => {
  const navigate = useNavigate();

  const today = new Date().toDateString();

  const todaysOrders = orders.filter((order) => {
    const orderDate = new Date(order.timestamp).toDateString();
    return orderDate === today;
  });

  const totalOrders = todaysOrders.length;
  const totalRevenue = todaysOrders.reduce((sum, o) => sum + o.total, 0);
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
              onClick={() => navigate("/cashierDashboard")}
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

      
        <div className="space-y-4">
          {todaysOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Receipt size={48} className="mb-4 text-orange-400" />
              <p className="text-lg font-medium">No orders yet today</p>
            </div>
          ) : (
            todaysOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition p-5"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">{order.time}</p>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        <div>
                          <p className="text-gray-800 font-semibold text-sm sm:text-base">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-green-600 font-bold text-sm sm:text-base">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-right mt-3 border-t border-gray-200 pt-2">
                  <p className="text-gray-500 text-sm">Total</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">
                    ₹{order.total}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Order;
