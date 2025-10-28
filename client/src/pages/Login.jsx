import { useState } from "react"
import useCashierStore from "../zustand-stores/cashierStore"
import {Link,useNavigate} from 'react-router-dom'
const Login = () => {
    const [loginData,setLoginData] = useState({email: "", password: ""})
    const loading = useCashierStore((state) => state.loading)
    const error = useCashierStore((state) => state.error)
    const loginCashier = useCashierStore((state) => state.loginCashier)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await  loginCashier(loginData) 
        const loggedCashier = useCashierStore.getState().user
        alert("You are logged in successfully")
        if(loggedCashier?.role) navigate("/admin")
        else navigate("/cashier")
    }
    const handleChange = (e) => {
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>Email: </label>
            <input name="email" type="email" value={loginData.email} onChange={handleChange} required />
            <label>Password: </label>
            <input name="password" type="password" value={loginData.password} onChange={handleChange} required />
            {error && <p>{error}</p>}
            <button type="submit" disabled={loading}>{loading ? "Loggin in...": "Login"}</button>
        </form>
        
        </>
    )
}
export default Login