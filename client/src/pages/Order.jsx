import React from "react";
import { ClipboardList, Receipt } from "lucide-react";

const Order = ({ orders = [] }) => {
 
  const today = new Date().toDateString();
  const todaysOrders = orders.filter(order => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg w-[700px] h-[600px] flex flex-col items-center justify-start p-6 overflow-y-auto">
        
        
        <div className="flex items-center gap-3 mb-4">
          <ClipboardList size={36} className="text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Today's Orders</h1>
        </div>

    
        <div className="grid grid-cols-3 gap-4 mb-6 w-full">
          <div className="bg-purple-900 bg-opacity-40 rounded-lg p-4 text-center border border-purple-700">
            <p className="text-gray-300 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-white">{totalOrders}</p>
          </div>
          <div className="bg-purple-900 bg-opacity-40 rounded-lg p-4 text-center border border-purple-700">
            <p className="text-gray-300 text-sm">Revenue</p>
            <p className="text-2xl font-bold text-green-400">₹{totalRevenue}</p>
          </div>
          <div className="bg-purple-900 bg-opacity-40 rounded-lg p-4 text-center border border-purple-700">
            <p className="text-gray-300 text-sm">Items Sold</p>
            <p className="text-2xl font-bold text-white">{totalItems}</p>
          </div>
        </div>

       
        {todaysOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Receipt size={48} className="mb-4 text-purple-400" />
            <p className="text-lg">No orders yet today</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 w-full overflow-y-auto pr-2">
            {todaysOrders.map(order => (
              <div
                key={order.id}
                className="bg-purple-900 bg-opacity-40 rounded-lg p-4 border border-purple-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-white">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-400">{order.time}</p>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-black bg-opacity-40 rounded-md p-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-green-400 font-bold">
                        ₹{item.price * item.quantity}
                      </p>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
