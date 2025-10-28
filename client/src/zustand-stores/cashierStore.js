import {create} from "zustand"
import {devtools,persist} from "zustand/middleware"
import {RegisterCashier,LoginCashier,GetCurrentCashier} from "../api-calls/Cashier"
const cashierStore = (set) => ({
    user: null,
    loading: false,
    error: null,
    token: null,
    message: null,
    registerCashier: async (payload) => {
        set({loading: true})
        const {data,error} = await RegisterCashier(payload)
        set({loading: false,user:data?.cashier||null,error})
    },
    loginCashier: async (payload) => {
        set({loading: true})
        const {data,error} = await LoginCashier(payload)
        console.log(data.cashier)
        set({loading: false,user:data?.cashier||null,token: data?.token || null,error})
    },
    getCurrentCashier: async () => {
        set({loading: true})
        const {data,error} = await GetCurrentCashier()
        set({loading: false,user:data||null,error})
    },
    logout: () => {
        set({user: null,token: null, error: null, message: null}),
        localStorage.removeItem("user")
    }

})
const useCashierStore = create(devtools(persist(cashierStore,{name: "user",partialize: (state) => ({token: state.token, user: state.user})})))
export default useCashierStore