import axios from "axios";
import { create } from "zustand";
const API = import.meta.env.VITE_API_URL

const useAdminStore = create((set, get) => ({
  members: [],
  orders: [],
  products: [],
  refresh: false,
  actionGetMember: async (token) => {
    const rs = await axios.get(`${API}/admin/member`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ members: rs.data });
  },
  actionUpdateMember: async (token, id, role) => {
    const rs = await axios.patch(
      `${API}/admin/member/${id}`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  actionBannedMember: async (token, id) => {
    await axios.delete(`${API}/admin/member/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  actionUnbannedMember: async (token, id) => {
    await axios.patch(
      `${API}/admin/member/unbanned/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  actionGetProduct: async (token) => {
    const rs = await axios.get(`${API}/admin/product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(rs, "check product");
    set({ products: rs.data });
  },
  actionCreateProduct: async (token, data) => {
    const rs = await axios.post(`${API}/admin/product`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  actionDeleteProduct: async (token, id) => {
    await axios.delete(`${API}/admin/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  actionReactiveProduct: async (token, id) => {
    const rs = await axios.patch(
      `${API}/admin/product/reactive/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  actionUpdateProduct: async (token, id, data) => {
    const rs = await axios.put(
      `${API}/admin/product/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  actionGetAllOrder: async (token) => {
    const rs = await axios.get(`${API}/admin/order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ orders: rs.data });
    return rs.data;
  },
  actionUpdateOrder: async (token, status, id) => {
    const rs = await axios.patch(
      `${API}/admin/order/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return rs.data;
  },
  actionCancelOrder: async (token, id) => {
    const rs = await axios.delete(`${API}/admin/order/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  actionRefresh: () => {
    set({ refresh: !refresh });
  },
}));

export default useAdminStore;
