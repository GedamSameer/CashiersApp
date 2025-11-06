import React, { useState } from "react";
import {
  LogOut,
  Menu,
  PlusCircle,
  Eye,
  Users,
  Utensils,
  LayoutDashboard,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCashierStore from "../zustand-stores/cashierStore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const logout = useCashierStore((state) => state.logout);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    sessionStorage.clear();
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-900 font-sans">

      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"
          } bg-white shadow-xl border-r border-orange-200 transition-all duration-300 flex flex-col`}
      >

        <div className="flex items-center justify-between px-4 py-5 border-b border-orange-100">
          <div className="flex items-center gap-2">
            <Utensils className="text-orange-500" size={24} />
            {isSidebarOpen && (
              <span className="text-xl font-bold text-orange-600">Admin</span>
            )}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-orange-100 text-orange-600 transition-all"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>


        <nav className="flex-1 px-3 py-6 space-y-3">
          <SidebarButton
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isOpen={isSidebarOpen}
            onClick={() => navigate("/admin")}
          />
          <SidebarButton
            icon={<Utensils size={20} />}
            label="Restaurants"
            isOpen={isSidebarOpen}
            onClick={() => navigate("/restaurant")}
          />
          <SidebarButton
            icon={<Eye size={20} />}
            label="Orders"
            isOpen={isSidebarOpen}
            onClick={() => navigate("/adminorderlist")}
          />
          <SidebarButton
            icon={<Users size={20} />}
            label="Staff"
            isOpen={isSidebarOpen}
            onClick={() => navigate("/addcashier")}
          />
          <SidebarButton
            icon={<PlusCircle size={20} />}
            label="Menu"
            isOpen={isSidebarOpen}
            onClick={() => navigate("/changemenu")}
          />
        </nav>


        <div className="border-t border-orange-100 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full py-2 rounded-lg shadow transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && "Logout"}
          </button>
        </div>
      </aside>


      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-orange-200 pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 text-center sm:text-left">
            Admin Dashboard
          </h1>
          <span className="text-lg font-semibold text-gray-700">
            Welcome, Admin 👑
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-orange-200 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-orange-600 mb-6 flex items-center gap-2">
              <Utensils className="text-orange-500" />
              Restaurant Management
            </h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate("/restaurant")}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200"
              >
                <PlusCircle size={20} />
                Add Restaurant
              </button>
              <button
                onClick={() => navigate("/adminorderlist")}
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200"
              >
                <Eye size={20} />
                View Orders
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-orange-200 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-bold text-orange-600 mb-6 flex items-center gap-2">
              <Users className="text-orange-500" />
              Staff & Menu Management
            </h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate("/addcashier")}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200"
              >
                <Users size={20} />
                Add Cashier
              </button>
              <button
                onClick={() => navigate("/changemenu")}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg shadow transition-all duration-200"
              >
                <Utensils size={20} />
                Change Menu
              </button>
            </div>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-xs sm:text-sm mt-10 sm:mt-14">
          © {new Date().getFullYear()} Restaurant POS | Powered by{" "}
          <span className="text-orange-500 font-semibold">Cashier App</span>
        </footer>
      </main>
    </div>
  );
};


const SidebarButton = ({ icon, label, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full text-left px-3 py-3 rounded-lg hover:bg-orange-100 text-gray-700 font-medium transition-all"
  >
    {icon}
    {isOpen && <span className="truncate">{label}</span>}
  </button>
);

export default AdminDashboard;

