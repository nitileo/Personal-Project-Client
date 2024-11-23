import axios from "axios";
import { create } from "zustand";
const API = import.meta.env.VITE_API_URL


const useOrderStore = create((set, get) => ({
  order: [],
  actionCreateOrder: async (token, data) => {
    const rs = await axios.post(`${API}/order`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return rs.data;
  },
  actionGetOrder: async (token) => {
    const rs = await axios.get(`${API}/order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ order: rs.data });
    return rs.data;
  },
}));

export default useOrderStore;
