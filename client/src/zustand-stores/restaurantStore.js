import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  GetAllRestaurants,
  SearchRestaurants,
  GetRestaurantById,
  CreateRestaurant,
  UpdateRestaurantById,
  DeleteRestaurantById,
} from "../api-calls/Restaurant";

const restaurantStore = (set) => ({
  restaurants: [],
  restaurant: null,
  loading: false,
  error: null,
  message: null,

  getAllRestaurants: async () => {
    set({ loading: true, error: null });
    const { data, error } = await GetAllRestaurants();
    if (error) {
      set({ loading: false, error, restaurants: [] });
      return { data: null, error };
    } else {
      // Sort restaurants by creation date (newest first)
      const sortedRestaurants = (data || []).sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      set({ loading: false, restaurants: sortedRestaurants, error: null });
      return { data: sortedRestaurants, error: null };
    }
  },

  searchRestaurants: async (search) => {
    set({ loading: true, error: null });
    const { data, error } = await SearchRestaurants(search);
    if (error) {
      set({ loading: false, error, restaurants: [] });
      return { data: null, error };
    } else {
      set({ loading: false, restaurants: data || [], error: null });
      return { data: data || [], error: null };
    }
  },

  getRestaurantById: async (id) => {
    set({ loading: true, error: null });
    const { data, error } = await GetRestaurantById(id);
    if (error) {
      set({ loading: false, error, restaurant: null });
      return { data: null, error };
    } else {
      set({ loading: false, restaurant: data, error: null });
      return { data, error: null };
    }
  },

  createRestaurant: async (payload) => {
    set({ loading: true, error: null });
    const { data, error } = await CreateRestaurant(payload);
    if (error) {
      set({ loading: false, error });
      return { data: null, error };
    } else {
      // Add the new restaurant to the top of the list
      set((state) => ({
        loading: false,
        restaurants: [data, ...state.restaurants],
        error: null,
        message: "Restaurant created successfully",
      }));
      return { data, error: null };
    }
  },

  updateRestaurantById: async (id, payload) => {
    set({ loading: true, error: null });
    const { data, error } = await UpdateRestaurantById(id, payload);
    if (error) {
      set({ loading: false, error });
      return { data: null, error };
    } else {
      // Update the restaurant in the list
      set((state) => ({
        loading: false,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant._id === id ? data : restaurant
        ),
        restaurant:
          state.restaurant && state.restaurant._id === id
            ? data
            : state.restaurant,
        error: null,
        message: "Restaurant updated successfully",
      }));
      return { data, error: null };
    }
  },

  deleteRestaurantById: async (id) => {
    set({ loading: true, error: null });
    const { data, error } = await DeleteRestaurantById(id);
    if (error) {
      set({ loading: false, error });
      return { data: null, error };
    } else {
      // Remove the restaurant from the list
      set((state) => ({
        loading: false,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant._id !== id
        ),
        error: null,
        message: "Restaurant deleted successfully",
      }));
      return { data, error: null };
    }
  },

  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),
});

const useRestaurantStore = create(
  devtools(restaurantStore, { name: "restaurant" })
);
export default useRestaurantStore;
