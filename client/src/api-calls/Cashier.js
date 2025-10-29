import {axiosInstance} from "."
const makeRequest = async (callback) => {
    try{
        const response = await callback()
        return {data: response.data, error: null}
    }catch(err){
        const backendError = err.response?.data?.error;
        const errorMessage = backendError || err.message || "Something went wrong"
        return {data: null, error: errorMessage}
    }
}
export const RegisterCashier = async (payload) => makeRequest(() => axiosInstance.post("/api/register",payload))
export const LoginCashier = async (payload) => makeRequest(() => axiosInstance.post("/api/login",payload))
export const GetCurrentCashier = async () => makeRequest(() => axiosInstance.get("/api/current-user"))