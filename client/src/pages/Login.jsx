import { useState } from "react"
import useCashierStore from "../zustand-stores/cashierStore"
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const loading = useCashierStore((state) => state.loading)
    const error = useCashierStore((state) => state.error)
    const loginCashier = useCashierStore((state) => state.loginCashier)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await loginCashier(loginData)
        const loggedCashier = useCashierStore.getState().user
        alert("You are logged in successfully")
        if (loggedCashier?.role) navigate("/admin")
        else navigate("/cashier")
    }
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="min-h-screen h-[100px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg w-[700px] h-[600px] flex items-center justify-center  ">
                    <form onSubmit={handleSubmit} className=" p-12 rounded-2xl w-[90%] flex flex-col space-y-6 text-white">
                        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

                        <div className="flex flex-col space-y-3">
                            <label className="text-lg text-white">Email: </label>
                            <input name="email"
                                type="email"
                                value={loginData.email}
                                onChange={handleChange}
                                required className="p-4 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <label className="text-sm text-white">Password: </label>
                            <input name="password"
                             type="password"
                              value={loginData.password} 
                              onChange={handleChange}
                               required className="p-4 rounded-lg text-lg text-black bg-white border border-purple-900 focus:outline-none focus:ring-2 focus:ring-black"/>
                        </div>
                        {error && <p className="text-red-400 text-md text-center">{error}</p>}
                        <button type="submit"
                         disabled={loading} 
                         className="bg-purple-900 hover:bg-black transition-colors duration-200 p-4 rounded-lg mt-4 text-lg shadow-lg font-bold"
                         >{loading ? "Loggin in..." : "Login"}</button>
                    </form>
                </div>
            </div>


        </>
    )
}
export default Login