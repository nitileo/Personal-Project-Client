import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const API = import.meta.env.VITE_API_URL

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      address: [],
      actionLogin: async (input) => {
        const rs = await axios.post(`${API}/auth/login`, input);
        set({ token: rs.data.token, user: rs.data.user });
        return rs.data;
      },
      actionRegister: async (input) => {
        const rs = await axios.post(
          `${API}/auth/register`,
          input
        );
        return rs.data;
      },
      actionLogout: () => {
        set({ token: "", user: null, address: [] });
      },
      actionGetData: async (token) => {
        const rs = await axios.get(`${API}/user/info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
      actionUpdateData: async (token, data) => {
        const rs = await axios.patch(`${API}/user/info`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
      actionGetAddress: async (token) => {
        const rs = await axios.get(`${API}/user/address`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ address: rs.data });
        return rs.data;
      },
      actionUpdateAddress: async (token, data) => {
        const rs = await axios.put(`${API}/user/address`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return rs.data;
      },
    }),
    {
      name: "state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
