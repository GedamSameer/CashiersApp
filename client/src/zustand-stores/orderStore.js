import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  GetAllOrders,
  SearchOrders,
  GetOrderById,
  GetOrdersByCashierName,
  CreateOrder,
  UpdateOrderById,
  UpdateOrderStatus,
  DeleteOrderById,
} from "../api-calls/Order";

const orderStore = (set) => ({
  orders: [],
  order: null,
  loading: false,
  error: null,
  message: null,

  getAllOrders: async () => {
    set({ loading: true, error: null });
    const { data, error } = await GetAllOrders();
    if (error) {
      set({ loading: false, error, orders: [] });
      return { data: null, error };
    } else {
      // Transform backend data to match frontend structure
      const transformedOrders = (data || []).map((order) => ({
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.orderStatus || "Pending",
        createdAt: order.createdAt,
        totalAmount: order.totalAmount,
        cashierName: order.cashierName,
        items: order.items || [],
        paymentMethod: order.paymentMethod,
        tableNumber: order.tableNumber,
        notes: order.notes,
      }));
      set({ loading: false, orders: transformedOrders, error: null });
      return { data: transformedOrders, error: null };
    }
  },

  searchOrders: async (search) => {
    set({ loading: true, error: null });
    const { data, error } = await SearchOrders(search);
    if (error) {
      set({ loading: false, error, orders: [] });
    } else {
      const transformedOrders = (data || []).map((order) => ({
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.orderStatus || "Pending",
        createdAt: order.createdAt,
        totalAmount: order.totalAmount,
        cashierName: order.cashierName,
        items: order.items || [],
        paymentMethod: order.paymentMethod,
        tableNumber: order.tableNumber,
        notes: order.notes,
      }));
      set({ loading: false, orders: transformedOrders, error: null });
    }
    return { data, error };
  },

  getOrderById: async (id) => {
    set({ loading: true, error: null });
    const { data, error } = await GetOrderById(id);
    if (error) {
      set({ loading: false, error, order: null });
    } else {
      const transformedOrder = data
        ? {
            id: data._id,
            orderNumber: data.orderNumber,
            status: data.orderStatus || "Pending",
            createdAt: data.createdAt,
            totalAmount: data.totalAmount,
            cashierName: data.cashierName,
            items: data.items || [],
            paymentMethod: data.paymentMethod,
            tableNumber: data.tableNumber,
            notes: data.notes,
          }
        : null;
      set({ loading: false, order: transformedOrder, error: null });
    }
    return { data, error };
  },

  getOrdersByCashierName: async (cashierName) => {
    set({ loading: true, error: null });
    const { data, error } = await GetOrdersByCashierName(cashierName);
    if (error) {
      set({ loading: false, error, orders: [] });
    } else {
      const transformedOrders = (data || []).map((order) => ({
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.orderStatus || "Pending",
        createdAt: order.createdAt,
        totalAmount: order.totalAmount,
        cashierName: order.cashierName,
        items: order.items || [],
        paymentMethod: order.paymentMethod,
        tableNumber: order.tableNumber,
        notes: order.notes,
      }));
      set({ loading: false, orders: transformedOrders, error: null });
    }
    return { data, error };
  },

  createOrder: async (payload) => {
    set({ loading: true, error: null });
    const { data, error } = await CreateOrder(payload);
    if (error) {
      set({ loading: false, error });
    } else {
      const transformedOrder = data
        ? {
            id: data._id,
            orderNumber: data.orderNumber,
            status: data.orderStatus || "Pending",
            createdAt: data.createdAt,
            totalAmount: data.totalAmount,
            cashierName: data.cashierName,
            items: data.items || [],
            paymentMethod: data.paymentMethod,
            tableNumber: data.tableNumber,
            notes: data.notes,
          }
        : null;
      // Add the new order to the orders list
      set((state) => ({
        loading: false,
        orders: transformedOrder
          ? [transformedOrder, ...state.orders]
          : state.orders,
        error: null,
        message: "Order created successfully",
      }));
    }
    return { data, error };
  },

  updateOrderStatus: async (id, status) => {
    // Don't set loading to true to avoid UI flickering
    const { data, error } = await UpdateOrderStatus(id, status);
    if (error) {
      set({ error });
    } else {
      // Update the order in the orders list without loading state
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id ? { ...order, status } : order
        ),
        order:
          state.order && state.order.id === id
            ? { ...state.order, status }
            : state.order,
        error: null,
        message: "Order status updated successfully",
      }));
    }
    return { data, error };
  },

  updateOrderById: async (id, payload) => {
    set({ loading: true, error: null });
    const { data, error } = await UpdateOrderById(id, payload);
    if (error) {
      set({ loading: false, error });
    } else {
      const transformedOrder = data
        ? {
            id: data._id,
            orderNumber: data.orderNumber,
            status: data.orderStatus || "Pending",
            createdAt: data.createdAt,
            totalAmount: data.totalAmount,
            cashierName: data.cashierName,
            items: data.items || [],
            paymentMethod: data.paymentMethod,
            tableNumber: data.tableNumber,
            notes: data.notes,
          }
        : null;
      set((state) => ({
        loading: false,
        orders: state.orders.map((order) =>
          order.id === id ? transformedOrder : order
        ),
        order:
          state.order && state.order.id === id ? transformedOrder : state.order,
        error: null,
        message: "Order updated successfully",
      }));
    }
    return { data, error };
  },

  deleteOrderById: async (id) => {
    set({ loading: true, error: null });
    const { data, error } = await DeleteOrderById(id);
    if (error) {
      set({ loading: false, error });
    } else {
      set((state) => ({
        loading: false,
        orders: state.orders.filter((order) => order.id !== id),
        order: state.order && state.order.id === id ? null : state.order,
        error: null,
        message: "Order deleted successfully",
      }));
    }
    return { data, error };
  },

  clearError: () => set({ error: null }),
  clearMessage: () => set({ message: null }),
});

const useOrderStore = create(devtools(orderStore));
export default useOrderStore;
