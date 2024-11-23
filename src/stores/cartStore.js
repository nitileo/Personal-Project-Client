import axios from "axios";
import { create } from "zustand";
const API = import.meta.env.VITE_API_URL


const useCartStore = create((set, get) => ({
  cart: [],
  currentCart: null,
  totalPrice: null,
  actionGetCart: async (token) => {
    const rs = await axios.get(`${API}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ cart: rs.data });
    return rs.data;
  },
  actionAddProductCart: async (token, data) => {
    const rs = await axios.post(`${API}/cart`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({ cart: [...state.cart, rs.data] }));
    return rs.data;
  },
  actionDeleteCart: async (token, id) => {
    const rs = await axios.delete(`${API}/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  actionEditCart: async (token, id, data) => {
    const rs = await axios.patch(`${API}/cart/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  actionSetTotalPrice: (price) => {
    set({ totalPrice: price });
  },
  actionClearCart: () => {
    set({ cart: [] });
  },
}));

export default useCartStore;
