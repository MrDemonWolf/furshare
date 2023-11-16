import { create } from "zustand";

interface CreateTokenModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateTokenModal = create<CreateTokenModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateTokenModal;
