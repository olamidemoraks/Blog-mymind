import { create } from "zustand";

interface IAuthModal {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useAuthModal = create<IAuthModal>((set) => ({
  isOpen: false,
  setOpen: () => {
    set({ isOpen: true });
  },
  setClose: () => {
    set({ isOpen: false });
  },
}));
