import React from "react";
import { LogOut, PlusCircle, Eye, Users, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCashierStore from "../zustand-stores/cashierStore";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = useCashierStore(state => state.user)
  console.log(user)
  const logout = useCashierStore(state => state.logout)
  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    sessionStorage.clear();
    logout()
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white p-6 sm:p-8 font-sans relative overflow-hidden">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-purple-800/40 pb-4 relative">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent text-center sm:text-left">
          Admin Dashboard
        </h1>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="text-base sm:text-lg font-semibold text-purple-200">
            Welcome, Admin 👑
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
       
        <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-700/30 transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-2xl font-semibold text-purple-300 mb-6">
            Restaurant Management
          </h2>

          <div className="flex flex-col space-y-5">
            <button
              onClick={() => navigate("/add-restaurant")}
              className="bg-gradient-to-r from-purple-500 to-pink-800 hover:from-purple-800 hover:to-pink-700 transition-all duration-300 px-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
            >
              <PlusCircle size={22} />
              <span>Add Restaurant</span>
            </button>

            <button
              onClick={() => navigate("/orders")}
              className="bg-gradient-to-r from-indigo-400 to-blue-600 hover:from-indigo-800 hover:to-blue-600 transition-all duration-300 px-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
            >
              <Eye size={22} />
              <span>View Order List</span>
            </button>
          </div>
        </div>

        
        <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-700/30 transition-transform hover:scale-[1.02] duration-300">
          <h2 className="text-2xl font-semibold text-purple-300 mb-6">
            Staff & Menu Management
          </h2>

          <div className="flex flex-col space-y-5">
            <button
              onClick={() => navigate("/add-cashier")}
              className="bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-800 hover:to-emerald-600 transition-all duration-300 px-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
            >
              <Users size={22} />
              <span>Add Cashier</span>
            </button>

            <button
              onClick={() => navigate("/project")}
              className="bg-gradient-to-r from-yellow-200 to-orange-600 hover:from-yellow-600 hover:to-orange-500 transition-all duration-300 px-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
            >
              <Utensils size={22} />
              <span>Change Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
