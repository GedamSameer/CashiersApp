import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Project from "./pages/Project";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CashierDashboard from "./pages/CashierDashboard";

const App = () => {
  return (<>
  <BrowserRouter>
  <Routes>
    <Route path ="/" element= {<Login />} />
    <Route path ="/admin" element= {<AdminDashboard />} />
    <Route path ="/cashier" element= {<CashierDashboard />} />
  </Routes>
  </BrowserRouter>
  </> )
}
  export default App;