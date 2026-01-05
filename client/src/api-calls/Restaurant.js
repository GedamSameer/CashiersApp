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

export const GetAllRestaurants = async () =>
  makeRequest(() => axiosInstance.get("/api/restaurants"));
export const SearchRestaurants = async (search) =>
  makeRequest(() =>
    axiosInstance.get("/api/search-restaurants", { params: { search } })
  );
export const GetRestaurantById = async (id) =>
  makeRequest(() => axiosInstance.get(`/api/restaurants/${id}`));
export const CreateRestaurant = async (payload) =>
  makeRequest(() => axiosInstance.post("/api/restaurants", payload));
export const UpdateRestaurantById = async (id, payload) =>
  makeRequest(() => axiosInstance.put(`/api/restaurants/${id}`, payload));
export const DeleteRestaurantById = async (id) =>
  makeRequest(() => axiosInstance.delete(`/api/restaurants/${id}`));



