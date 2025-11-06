import { useState } from "react";
import useCashierStore from "../zustand-stores/cashierStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const loading = useCashierStore((state) => state.loading);
  const error = useCashierStore((state) => state.error);
  const loginCashier = useCashierStore((state) => state.loginCashier);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginCashier(loginData);
    if (!user) return;
    if (user?.role) {
      navigate("/admin");
    } else {
      navigate("/cashier");
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-white px-4 sm:px-6 md:px-0">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-200">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Restaurant Logo"
            className="w-16 h-16 mb-3"
          />
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to your restaurant dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800 text-sm sm:text-base"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800 text-sm sm:text-base"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md w-full text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-8">
          © {new Date().getFullYear()} Restaurant POS | Powered by{" "}
          <span className="text-orange-500 font-semibold">Cashier App</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
