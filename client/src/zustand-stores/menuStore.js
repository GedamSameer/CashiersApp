import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GetAllMenuItems } from "../api-calls/Menu";

const menuStore = (set) => ({
  menuItems: [],
  loading: false,
  error: null,

  getAllMenuItems: async () => {
    set({ loading: true, error: null });
    const { data, error } = await GetAllMenuItems();

    if (error) {
      set({ loading: false, error, menuItems: [] });
      return { data: null, error };
    } else {
      // Transform backend data to match frontend structure if needed
      const transformedMenuItems = (data || []).map((item) => ({
        id: item._id || item.id,
        name: item.menuItemName,
        price: item.price,
        category: item.category,
        image: item.emoji,
      }));

      set({ loading: false, menuItems: transformedMenuItems, error: null });
      return { data: transformedMenuItems, error: null };
    }
  },

  clearError: () => set({ error: null }),
});

const useMenuStore = create(devtools(menuStore, { name: "menu" }));
export default useMenuStore;
