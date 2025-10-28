import axios from "axios"
import useCashierStore from "../zustand-stores/cashierStore"
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers:{
        "Content-Type": "application/json",
    }
})
axiosInstance.interceptors.request.use((config) => {
    const token = useCashierStore.getState().token;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config
},(error) => Promise.reject(error))