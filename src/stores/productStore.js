import axios from "axios";
import { create } from "zustand";
const API = import.meta.env.VITE_API_URL


const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  actionGetProduct: async () => {
    const rs = await axios.get(`${API}/product`);
    set({ products: rs.data });
  },
  actionSearch: async (data) => {
    const rs = await axios.post(`${API}/product/search`, data);
    set({ products: rs.data });
  },
  actionGetCategory: async () => {
    const rs = await axios.get(`${API}/product/category`);
    set({ categories: rs.data });
  },
  actionGetNewRelease: async () => {
    const rs = await axios.get(`${API}/product/new-release`);
    return rs.data;
  },
  actionGetBestSeller: async () => {
    const rs = await axios.get(`${API}/product/best-seller`);
    return rs.data;
  },
  actionGetRecommend: async () => {
    const rs = await axios.get(`${API}/product/recommend`);
    return rs.data;
  },
}));
export default useProductStore;
