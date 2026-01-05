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

export const GetAllMenuItems = async () =>
  makeRequest(() => axiosInstance.get("/api/menu-items"));
export const SearchMenuItems = async (search) =>
  makeRequest(() =>
    axiosInstance.get("/api/search-menu-items", { params: { search } })
  );
export const GetMenuItemById = async (id) =>
  makeRequest(() => axiosInstance.get(`/api/menu-items/${id}`));
export const CreateMenuItem = async (payload) =>
  makeRequest(() => axiosInstance.post("/api/menu-items", payload));
export const UpdateMenuItemById = async (id, payload) =>
  makeRequest(() => axiosInstance.put(`/api/menu-items/${id}`, payload));
export const DeleteMenuItemById = async (id) =>
  makeRequest(() => axiosInstance.delete(`/api/menu-items/${id}`));



