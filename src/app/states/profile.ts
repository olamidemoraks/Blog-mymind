import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IProfile {
  isAuthenticated: boolean;
  token: string;
  id: string;
  setProfile: (token: string, id: string) => void;
  logoutUser: () => void;
}

export const useProfile = create<IProfile>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: "",
      id: "",
      setProfile: (token, id) => {
        set({ isAuthenticated: true, token, id });
      },
      logoutUser: () => {
        set({ isAuthenticated: false, token: "", id: "" });
      },
    }),
    { name: "auth_store" }
  )
);
