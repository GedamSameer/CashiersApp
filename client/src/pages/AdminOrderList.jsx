import React from "react";
import { ClipboardList, Receipt } from "lucide-react";

const AdminOrderList = ({ orders = [] }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg w-[700px] h-[600px] flex flex-col items-center justify-start p-6 overflow-y-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <ClipboardList size={36} className="text-purple-400" />
          <h1 className="text-3xl font-bold text-white">All Orders (Admin)</h1>
        </div>

        <div className="flex flex-col space-y-3 w-full mb-4">
          <input
            type="text"
            placeholder="Search by order ID or customer name"
            className="p-4 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <select className="p-4 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black">
            <option value="">Filter by Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <button className="bg-purple-900 hover:bg-black transition-colors duration-200 p-4 rounded-lg mt-2 text-lg shadow-lg font-bold text-white">
            Apply Filter
          </button>
        </div>

        <div className="flex flex-col space-y-4 w-full overflow-y-auto pr-2">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Receipt size={48} className="mb-4 text-purple-400" />
              <p className="text-lg">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-purple-900 bg-opacity-40 rounded-lg p-4 border border-purple-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-white">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-300">{order.date}</p>
                </div>

                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-purple-300">
                    Customer:
                  </span>{" "}
                  {order.customer || "Walk-in"}
                </p>

                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-gray-200 bg-black bg-opacity-40 rounded-md p-2"
                    >
                      <p>
                        {item.emoji} {item.name} × {item.quantity}
                      </p>
                      <p>₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="text-right mt-3 border-t border-purple-700 pt-2">
                  <p className="text-gray-300 text-sm">Total</p>
                  <p className="text-xl font-bold text-green-400">
                    ₹{order.total}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderList;
