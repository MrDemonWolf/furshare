import { create } from "zustand";

interface CreateTokenModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  token?: string;
  setToken: (token: string) => void;
}

const useCreateTokenModal = create<CreateTokenModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setToken: (token: string) => set({ token }),
}));

export default useCreateTokenModal;
