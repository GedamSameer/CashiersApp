import { axiosInstance } from ".";

const makeRequest = async (callback) => {
  try {
    const response = await callback();
    return { data: response.data, error: null };
  } catch (err) {
    const backendError = err.response?.data?.error;
    const errorMessage = backendError || err.message || "Something went wrong";
    return { data: null, error: errorMessage };
  }
};

export const GetAllOrders = async () =>
  makeRequest(() => axiosInstance.get("/api/orders"));
export const SearchOrders = async (search) =>
  makeRequest(() =>
    axiosInstance.get("/api/search-orders", { params: { search } })
  );
export const GetOrderById = async (id) =>
  makeRequest(() => axiosInstance.get(`/api/orders/${id}`));
export const GetOrdersByCashierName = async (cashierName) =>
  makeRequest(() => axiosInstance.get(`/api/orders/cashier/${cashierName}`));
export const CreateOrder = async (payload) =>
  makeRequest(() => axiosInstance.post("/api/orders", payload));
export const UpdateOrderById = async (id, payload) =>
  makeRequest(() => axiosInstance.put(`/api/orders/${id}`, payload));
export const UpdateOrderStatus = async (id, status) =>
  makeRequest(() =>
    axiosInstance.patch(`/api/orders/${id}/status`, { status })
  );
export const DeleteOrderById = async (id) =>
  makeRequest(() => axiosInstance.delete(`/api/orders/${id}`));
