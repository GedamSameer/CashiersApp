import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CashierDashboard from "./pages/CashierDashboard";
import AddCashier from "./pages/AddCashier";
import Restaurant from "./pages/Restaurant";
import Order from "./pages/Order";
import AdminOrderList from "./pages/AdminOrderList";
import ChangeMenu from "./pages/ChangeMenu";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cashier" element={<CashierDashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/addcashier" element={<AddCashier />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/adminorderlist" element={<AdminOrderList />} />
          <Route path="/ChangeMenu" element={<ChangeMenu />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
