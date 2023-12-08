import { create } from "zustand";

interface CreateTokenModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  token?: string;
  setToken: (token: string) => void;
  resetToken: () => void;
}

const useCreateTokenModal = create<CreateTokenModalStore>((set) => ({
  isOpen: false,
  token: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setToken: (token: string) => set({ token }),
  resetToken: () => set({ token: undefined }),
}));

export default useCreateTokenModal;
